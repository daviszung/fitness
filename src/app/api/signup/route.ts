import { connectDB } from '@/db/db';
import { NextResponse } from 'next/server'

export async function POST(req: Request) {

    const db = await connectDB();
    const body = await req.json();
    const { username, password } = body;
    const searchForAccount = await db.collection.findOne({username: username});
    let resBody: {[index: string]: string} = {};
    if (searchForAccount) {
        resBody.outcome = "account already exists"
    } else {
        const newAccount = await db.collection.insertOne({username: username, password: password, goals: []})
        resBody.outcome = "new account created"
    }
    return NextResponse.json(resBody)
}