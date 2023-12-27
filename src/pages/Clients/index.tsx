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

function Clients() {
	const { t } = useTranslation();
	const [clients, setClients] = useState<ClientsRow[] | undefined>(undefined);
	const [editClients, setEditClients] = useState<ClientsRow | undefined>(
		undefined
	);
	const [openPopup, setOpenPopup] = useState<boolean>(false);
	const theme = useSelector((state: RootState) => state.theme.value);
	const customStyles = {
		headRow: {
			style: {
				color: theme.secondary_text_color,
				backgroundColor: theme.secondary_bg_color,
			},
		},
		rows: {
			style: {
				color: theme.primary_text_color,
				backgroundColor: theme.primary_bg_color,
				minHeight: "36px",
			},
		},
	};

	const columns: TableColumn<ClientsRow>[] = [
		{
			name: "Title",
			selector: (row) => row.firstName,
			sortable: true,
		},
		{
			name: "Email",
			selector: (row) => row.email,
		},
		{
			name: "Phone",
			selector: (row) => row.phone,
		},
		{
			name: "City",
			selector: (row) => row.address.city,
			sortable: true,
		},
		{
			name: "Actions",
			cell: (row) => (
				<>
					<Button onClick={() => deleteHandler(row.id)}>
						Delete
					</Button>
					<Button onClick={() => editHandler(row.id)}>Edit</Button>
				</>
			),
		},
	];

	const URL = "https://dummyjson.com/users";
	const { response, loading, error, sendData } = useAxios({
		method: "GET",
		baseURL: URL,
	});

	const deleteHandler = (id: number) => {
		//dummy delete for API
		const deleteClient = fetch(`https://dummyjson.com/users/${id}`, {
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
		fetch(`https://dummyjson.com/posts/${data.id}`, {
			// PUT or PATCH
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				...data,
			}),
		}).then((res) => res.json());
		// after update on backend we needed something like
		// loadClients();

		const updatedClients = clients?.map((client) =>
			client.id == data.id ? (client = data) : client
		);
		setClients(updatedClients);
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
	}, [loading]);

	return (
		<>
			<p>{t("Clients")}</p>
			{error}
			{clients && !loading ? (
				<DataTable
					columns={columns}
					data={clients}
					customStyles={customStyles}
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
