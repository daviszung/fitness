import { connectDB } from "@/db/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	const db = await connectDB();
	const body = await req.json();
	console.log(body);
	let resBody: { [index: string]: string } = {};
	try {
		const dbRes = await db.collection.findOne({ username: body.username });
		console.log(dbRes);
		resBody.outcome = "Success";
		resBody.data = dbRes!.goals;
	} catch (err) {
		console.log(err);
		resBody.outcome = "Failure";
	}
	return NextResponse.json(resBody);
}
