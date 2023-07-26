"use client";

import { Item } from "./Item";
import { useEffect, useState } from "react";

type GoalsProps = {
	username: string | null;
	refresh: boolean;
    setRefresh: Function
};

export function Goals({ username, refresh, setRefresh }: GoalsProps) {
	const [list, setList] = useState([]);

	async function getList(username: string | null) {
		if (!username) {
			console.log("Tried to get list without username");
			return;
		}
		let res: any = await fetch("/dashboard/api/goals", {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({ username: username }),
		});
		res = await res.json();
		if (res.outcome === "Success") {
			setList((prev) => res.data);
		} else {
			console.log("Error getting goals list");
		}
		return;
	}

	useEffect(() => {
		getList(username);
	}, [username, refresh]);

	return (
		<div className="bg-gray-50 flex flex-col">
			<div className="w-full h-[5%] font-semibold flex justify-center items-center bg-gray-800 text-gray-50">
				Goals
			</div>
			<ul className="flex-1 px-6 py-6">
				{list.map((el, index) => (
                    <Item text={el} index={index} username={username} refresh={refresh} setRefresh={setRefresh}></Item>
				))}
			</ul>
		</div>
	);
}
