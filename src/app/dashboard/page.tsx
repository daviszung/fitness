"use client";

import { Add } from "./Add";
import { Goals } from "./Goals";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
	const [refresh, setRefresh] = useState<boolean>(false);
	const [username, setUsername] = useState<null | string>(null);
	const router = useRouter();

	function logout() {
		sessionStorage.removeItem("username");
		router.push("/");
	}

	useEffect(() => {
		const data = sessionStorage.getItem("username");
		// if (!data && !username) {
		// 	logout();
		// }
		setUsername(data);
	}, []);

	return (
		<main className="h-screen w-screen">
			<div className="h-full w-full grid grid-cols-2">
				<Add
					username={username}
					logout={logout}
					setRefresh={setRefresh}
					refresh={refresh}
				></Add>
				<Goals username={username} refresh={refresh} setRefresh={setRefresh}></Goals>
			</div>
		</main>
	);
}
