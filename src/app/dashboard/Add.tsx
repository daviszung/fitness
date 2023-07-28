"use client";

type AddProps = {
	username: string | null;
	logout: Function;
	setRefresh: Function;
	refresh: boolean;
};

export function Add({ username, setRefresh, refresh, logout }: AddProps) {
	async function sendData() {
		if (!username) {
			console.log("Interaction made but no user");
			return;
		}
		const data = document.getElementById("addData") as HTMLInputElement;
		if (data.value.length < 1) {
			alert("Blank value not accepted");
			return;
		}
		let res = await fetch("/dashboard/api/add", {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({
				username: username,
				data: data.value,
			}),
		});

		res = await res.json();

		if (refresh) {
			setRefresh(false);
		} else {
			setRefresh(true);
		}
	}

	return (
		<div className="bg-gray-800 flex flex-col items-center justify-center">
			<div className="absolute top-4 left-4">
				<button
					className="bg-gray-50 text-gray-900 font-semibold px-6 py-2 rounded-md"
					onClick={() => {
						logout();
					}}
				>
					Logout
				</button>
			</div>
			<div className="flex flex-col items-center justify-center gap-4">
				<input
					id="addData"
					className="bg-gray-50 rounded-md border-none outline-none px-2 py-2"
				/>
				<button
					className="bg-gray-50 text-gray-900 font-semibold px-6 py-2 rounded-md hover:bg-gray-600 hover:text-gray-50"
					onClick={() => {
						sendData();
					}}
				>
					Add Goal
				</button>
			</div>
		</div>
	);
}
