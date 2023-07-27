import { connectDB } from '@/db/db';
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    try {

        const db = await connectDB();

    } catch (err) {
        console.log(err);
    }
    return NextResponse.json({outcome: "Login Failure"});

    let resBody: {[index: string]: string} = {};

    try {
        const db = await connectDB();
        const body = await req.json();
        const { username, password } = body;
        const searchForAccount = await db.collection.findOne({username: username, password: password});
        if (searchForAccount) {
            resBody.outcome = "Login Success"
        } else {
            resBody.outcome = "Login Failure"
        }
    } catch(err) {
        console.log(err, "error");
        resBody.outcome = "Login Failure"
    }

    return NextResponse.json(resBody)
}
    // let resBody: {[index: string]: string} = {};

    // try {
    //     const db = await connectDB();
    //     const body = await req.json();
    //     const { username, password } = body;
    //     const searchForAccount = await db.collection.findOne({username: username, password: password});
    //     if (searchForAccount) {
    //         resBody.outcome = "Login Success"
    //     } else {
    //         resBody.outcome = "Login Failure"
    //     }
    // } catch(err) {
    //     console.log(err, "error");
    //     resBody.outcome = "Login Failure"
    // }