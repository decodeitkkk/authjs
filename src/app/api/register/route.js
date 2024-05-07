import { connect } from "@/db/db";
import { User } from "@/model/users/register.js";
import bcryptjs from "bcryptjs";
import { sendmail } from "@/helper/mailer";
import { NextRequest, NextResponse } from "next/server";

connect();

// export const POST = async(NextRequest, NextResponse) = {}
export async function POST(request) {
    try {
        // getting values from frontend
        let reqBody = await request.json();
        let { username, email, password } = reqBody;
        console.log(username, email, password);

        // checking if they are not empty
        let arr = [username, email, password];
        let emptyValidation = arr.some((fields) => fields.trim() === "");
        if (emptyValidation) {
            return NextResponse.json(
                { error: "all fields are required !!!" },
                { status: 400 }
            );
        }

        //  checking if user exists already 
        let user = await User.findOne({ username });
        console.log(`user found`);
        // console.log(process.env.NEXT_RUNTIME)
        if (user) {
            return NextResponse.json(
                { error: "User Already exist !!!" },
                { status: 500 }
            );
        }

        // hashing password
        const salt = await bcryptjs.genSalt(10);
        let hashedPassword = await bcryptjs.hash(password, salt);

        let newUser = await User.create({
            username:username,
            email:email,
            password: hashedPassword,
        });
        console.log(newUser._id);

        // send email
        await sendmail({ email, emailType: "VERIFY", userId: newUser._id });

        return NextResponse.json(
            { message: "user saved successfully", success: true, newUser },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
