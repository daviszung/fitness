import { connectDB } from '@/db/db';
import { NextResponse } from 'next/server'

export async function POST(req: Request) {

    const db = await connectDB();
    const body = await req.json();
    const { username, password } = body;
    console.log(body);
    const searchForAccount = await db.collection.findOne({username: username, password: password});
    let resBody: {[index: string]: string} = {};
    if (searchForAccount) {
        resBody.outcome = "Login Success"
    } else {
        resBody.outcome = "Login Failure"
    }
    return NextResponse.json(resBody)
}