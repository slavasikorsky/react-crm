import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";

function Clients() {
	const [clients, setClients] = useState<any>(false);

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
				<ul>
					{clients.map((client) => (
						<li key={client.id}>
							{client.firstName} {client.lastName} {client.email}
							<br />
							{client.phone}
						</li>
					))}
				</ul>
			)}
		</>
	);
}

export default Clients;
