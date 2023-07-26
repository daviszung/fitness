import { connectDB } from '@/db/db';
import { NextResponse } from 'next/server'

export async function POST(req: Request) {

    const db = await connectDB();
    console.log(db);
    const body = await req.json();
    console.log(body);
    const { username, password } = body;
    const searchForAccount = await db.collection.findOne({username: username});
    console.log('searchforaccount:', searchForAccount);
    let resBody: {[index: string]: string} = {};
    if (searchForAccount) {
        resBody.outcome = "account already exists"
    } else {
        const newAccount = await db.collection.insertOne({username: username, password: password})
        console.log("create new account: ", newAccount);
        resBody.outcome = "new account created"
    }
    return NextResponse.json(resBody)
}