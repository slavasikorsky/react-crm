import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import DataTable, { TableColumn } from "react-data-table-component";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

type DataRow = {
	firstName: string;
	email: string;
	phone: string;
	address: { city: string };
};

function Clients() {
	const [clients, setClients] = useState<any>(false);
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
				color: theme.PRIMARY_TEXT_COLOR,
				backgroundColor: theme.PRIMARY_BG_COLOR,
				minHeight: "36px",
			},
		},
	};

	const columns: TableColumn<DataRow>[] = [
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
			name: "phone",
			selector: (row) => row.phone,
		},
		{
			name: "City",
			selector: (row) => row.address.city,
			sortable: true,
		},
	];

	const URL = "https://dummyjson.com/users";
	const { response, loading, error, sendData } = useAxios({
		method: "GET",
		baseURL: URL,
	});

	useEffect(() => {
		sendData();
		if (response) {
			setClients(response.data.users);
		}
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
