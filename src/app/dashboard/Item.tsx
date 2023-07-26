"use client";

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
	async function deleteItem(input: string) {
		let res: any = await fetch("/dashboard/api/delete", {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({ username: username, data: input }),
		});
		res = await res.json();

		if (res.outcome === "Success") {
            if (refresh) {
                setRefresh(false)
            }
            else {
                setRefresh(true)
            }
		} else {
			console.log("delete item failure", res);
		}
	}

	return (
		<li
			key={index}
			className="font-semibold text-gray-900 flex justify-between items-center p-4 border-gray-300 border-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)] mb-4"
		>
			<p>{text}</p>
			<div>
				<button className="bg-gray-800 text-gray-50 rounded-lg px-4 py-1 mr-3">
					Edit
				</button>
				<button
					onClick={() => {
						deleteItem(text);
					}}
					className="bg-gray-800 text-gray-50 rounded-lg px-3 py-1"
				>
					X
				</button>
			</div>
		</li>
	);
}
