import { connectDB } from "@/db/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
	const db = await connectDB();
	const body = await req.json();
	let resBody: { [index: string]: string } = {};
	try {
		const dbRes = await db.collection.updateOne(
			{ username: body.username },
			{ $set: { 'goals.$[elem]': body.newText } },
			{ arrayFilters: [{ 'elem': body.oldText}]}
             
		);
		resBody.outcome = "Success";
	} catch (err) {
		console.log(err);
		resBody.outcome = "Failure";
	}
	return NextResponse.json(resBody);
}
