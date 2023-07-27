"use client";

import { useState } from "react";

type ItemProps = {
	text: string;
	index: number;
	username: string | null;
	refresh: boolean;
	setRefresh: Function;
};

export function Item({
	text,
	index,
	username,
	refresh,
	setRefresh,
}: ItemProps) {
	const [isEditing, setIsEditing] = useState(false);

	function handleEditClick() {
		setIsEditing(true);
	}

	async function deleteItem(input: string) {
		const res: Response = await fetch("/dashboard/api/delete", {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({ username: username, data: input }),
		});

		const data: {outcome: string} = await res.json();

		if (data.outcome === "Success") {
			if (refresh) {
				setRefresh(false);
			} else {
				setRefresh(true);
			}
		} else {
			console.log("update text failure", res);
		}
	}

	async function updateItem() {
		const newValue = document.getElementById(
			"textUpdate"
		) as HTMLInputElement;

		const res: Response = await fetch("/dashboard/api/update", {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({
				username: username,
				newText: newValue.value,
				oldText: text,
			}),
		});
		const data: {outcome: string} = await res.json();

		if (data.outcome === "Success") {
			if (refresh) {
				setRefresh(false);
			} else {
				setRefresh(true);
			}
		} else {
			console.log("delete item failure", res);
		}

		setIsEditing(false);
	}

	return (
		<li
			key={index}
			className="font-semibold text-gray-900 flex justify-between items-center p-4 border-gray-300 border-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)] mb-4"
		>
			{isEditing ? (
				<>
					<input
						id="textUpdate"
						type="text"
						className="p-1 w-9/12 bg-transparent outline-none"
                        placeholder={text}
					></input>
					<button
						onClick={() => {
							updateItem();
						}}
					>
						Save
					</button>
				</>
			) : (
				<>
					<p>{text}</p>
					<div>
						<button
							onClick={() => {
								handleEditClick();
							}}
							className="rounded-lg px-3 py-1 mr-1"
						>
							Edit
						</button>
						<button
							onClick={() => {
								deleteItem(text);
							}}
							className="rounded-lg px-3 py-1"
						>
							X
						</button>
					</div>
				</>
			)}
		</li>
	);
}
