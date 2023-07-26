"use client";

import { useRouter } from "next/navigation";

export function Login() {
	const router = useRouter();

	async function sendUserInfo(mode: "Login" | "Signup") {
		const username = document.getElementById(
			"username"
		) as HTMLInputElement;
		const password = document.getElementById(
			"password"
		) as HTMLInputElement;

		if (mode === "Login") {
			const data = await fetch("/api/login", {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify({
					username: username.value,
					password: password.value,
				}),
			});
			const body = await data.json();
			console.log(body);
			if (body.outcome === "Login Success") {
				sessionStorage.setItem("username", username.value);
				router.push("/dashboard");
			} else {
				alert("Login Attempt Failed");
			}
		} else if (mode === "Signup") {
			const data = await fetch("/api/signup", {
				method: "POST",
				headers: {
					"content-type": "application/json",
				},
				body: JSON.stringify({
					username: username.value,
					password: password.value,
				}),
			});
		}
	}

	return (
		<div className="flex flex-col gap-3 w-full justify-center items-center">
			<input
				id="username"
				className="bg-gray-800 px-4 py-2 text-gray-50 outline-none rounded-sm"
				type="text"
				autoComplete="off"
			/>
			<input
				id="password"
				className="bg-gray-800 px-4 py-2 text-gray-50 outline-none rounded-sm"
				type="password"
			/>
			<button
				className="bg-gray-800 px-6 py-2 rounded-md text-gray-50 font-semibold"
				onClick={() => {
					sendUserInfo("Login");
				}}
			>
				Login
			</button>
			<button
				className="bg-gray-800 px-6 py-2 rounded-md text-gray-50 font-semibold"
				onClick={() => {
					sendUserInfo("Signup");
				}}
			>
				Signup
			</button>
		</div>
	);
}
