import { connectDB } from "@/db/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	const db = await connectDB();
	const body = await req.json();
	console.log(body);
	let resBody: { [index: string]: string } = {};
	try {
		const dbRes = await db.collection.findOneAndUpdate(
			{ username: body.username },
			{ $push: { goals: body.data } }
		);
		console.log(dbRes);
		resBody.outcome = "Success";
	} catch (err) {
		console.log(err);
		resBody.outcome = "Failure";
	}
	return NextResponse.json(resBody);
}
