import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import DataTable, { TableColumn } from "react-data-table-component";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { ClientsRow } from "../../types/types";

function Clients() {
	const [clients, setClients] = useState<ClientsRow[] | undefined>(undefined);
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
				<button onClick={() => deleteHandler(row.id)}>Delete</button>
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
				user ? user.id != id : false
			)
		);
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
			<p>Clients</p>
			{clients && !error && !loading && (
				<DataTable
					columns={columns}
					data={clients}
					customStyles={customStyles}
				/>
			)}
		</>
	);
}

export default Clients;
