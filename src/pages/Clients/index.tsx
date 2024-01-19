import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import DataTable, { TableColumn } from "react-data-table-component";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { ClientsRow } from "../../types/types";
import Loader from "../../components/Loader";
import Button from "../../components/UI/Button";
import Popup from "../../components/Popup";
import { useTranslation } from "react-i18next";
import Form from "../../components/Form";
import emailjs from "@emailjs/browser";
import { ButtonsWrapper, ContentWrapper } from "./styled";

function Clients() {
	const { t } = useTranslation();
	const [clients, setClients] = useState<ClientsRow[]>([]);
	const [editClients, setEditClients] = useState<ClientsRow | undefined>(
		undefined
	);
	const [selectedClients, setSelectedClients] = useState<ClientsRow[]>([]);
	const [openPopup, setOpenPopup] = useState<boolean>(false);
	const theme = useSelector((state: RootState) => state.theme.value);

	const customStyles = {
		headRow: {
			style: {
				fontSize: "16px",
				color: theme.secondary_text_color,
				backgroundColor: theme.secondary_bg_color,
			},
		},
		rows: {
			style: {
				fontSize: "16px",
				color: theme.primary_text_color,
				backgroundColor: theme.primary_bg_color,
				minHeight: "36px",
			},
		},
		pagination: {
			style: {
				fontSize: "16px",
				color: theme.secondary_text_color,
				backgroundColor: theme.secondary_bg_color,
			},
			pageButtonsStyle: {
				color: theme.secondary_text_color,
				fill: theme.secondary_text_color,
				backgroundColor: theme.secondary_bg_color,
				"&:disabled": {
					opacity: "0.4",
					cursor: "unset",
					fill: theme.secondary_text_color,
					backgroundColor: theme.secondary_bg_color,
				},
			},
		},
	};

	// send to email selected Clients
	const sendHandler = async () => {
		const serviceId = "service_501u9mo";
		const templateId = "template_cfgfu5c";
		try {
			await emailjs.send(serviceId, templateId, {
				message: selectedClientsString(selectedClients),
			});
			alert("Email successfully send; Check your inbox");
		} catch (error) {
			console.log(error);
		}
	};

	const selectedClientsString = (selectedClients: ClientsRow[]) => {
		let string = "";
		selectedClients.map((client) => {
			string += `${client.firstName}  ${client.phone}  ${client.email} ${client.address?.city} \n`;
		});
		return string;
	};

	const handleSelect = (row: { selectedRows: ClientsRow[] }) => {
		setSelectedClients(row.selectedRows);
	};

	const columns: TableColumn<ClientsRow>[] = [
		{
			name: t("fields.firstName"),
			selector: (row) => row.firstName,
			sortable: true,
		},
		{
			name: t("fields.email"),
			selector: (row) => row.email,
		},
		{
			name: t("fields.phone"),
			selector: (row) => row.phone,
		},
		{
			name: t("fields.city"),
			selector: (row) => row.address?.city || "Unknown",
			sortable: true,
		},
		{
			name: "",
			cell: (row) => (
				<>
					<Button onClick={() => deleteHandler(row.id)}>
						{t("delete")}
					</Button>
					<Button onClick={() => editHandler(row.id)}>
						{t("update")}
					</Button>
				</>
			),
		},
	];

	const URL = "https://dummyjson.com/users";
	const { response, loading, error, sendData } = useAxios({
		method: "GET",
		baseURL: URL,
	});

	const deleteHandler = async (id: number) => {
		//dummy delete for API
		await fetch(`https://dummyjson.com/users/${id}`, {
			method: "DELETE",
		}).then((res) => res.json());
		// after delete on backend we needed something like
		// loadClients();

		setClients(
			clients?.filter((user: ClientsRow) =>
				user ? user.id !== id : false
			)
		);
	};

	const editHandler = (id: number) => {
		const editContent = clients?.filter((client) => client.id === id);
		if (editContent) {
			setEditClients(editContent[0]);
		}
		setOpenPopup(!openPopup);
	};

	const updateHandler = async (data: ClientsRow) => {
		// dummy update for API
		// updating title of post with id
		await fetch(`https://dummyjson.com/users/${data.id}`, {
			// PUT or PATCH
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				...data,
			}),
		}).then((res) => res.json());
		// after update on backend we needed something like
		// loadClients();

		//if client exist
		if (clients?.filter((client) => client.id === data.id).length) {
			const updatedClients = clients?.map((client) =>
				client.id == data.id ? (client = data) : client
			);
			setClients(updatedClients);
		} else {
			// or it's the new client
			// dummy add new client for API
			fetch("https://dummyjson.com/users/add", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ data }),
			}).then((res) => res.json());
			// after added on backend we needed something like
			// loadClients();
			setClients([...clients, data]);
		}
	};

	const createHandler = () => {
		setEditClients(undefined);
		setOpenPopup(!openPopup);
	};

	const loadClients = () => {
		sendData();
		if (response) {
			setClients(response.data.users);
			console.log("Test reload useEffect function...");
		}
	};

	useEffect(() => {
		loadClients();
		emailjs.init("PwB-TZ8Ror1J1yoRc");
	}, [loading]);

	return (
		<>
			<ContentWrapper>
				<p>{t("Clients")}</p>
				<ButtonsWrapper>
					<Button onClick={() => createHandler()}>{t("add")}</Button>
					{selectedClients.length > 0 && (
						<Button onClick={() => sendHandler()}>
							{t("send to email")}
						</Button>
					)}
				</ButtonsWrapper>
			</ContentWrapper>
			{error}
			{clients && !loading ? (
				<DataTable
					columns={columns}
					data={clients}
					customStyles={customStyles}
					onSelectedRowsChange={handleSelect}
					selectableRows
					pagination
				/>
			) : (
				<Loader />
			)}
			<Popup trigger={openPopup} setTrigger={setOpenPopup}>
				<Form values={editClients} onSubmit={updateHandler} />
			</Popup>
		</>
	);
}

export default Clients;
