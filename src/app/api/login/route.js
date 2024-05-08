import { User } from "@/model/users/register";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { connect } from "@/db/db";
import jwt from "jsonwebtoken";

connect(); 
export async function POST(request) {
    try {
        let reqBody = await request.json();

        let { username, password } = reqBody;

        let user = await User.findOne({ username });
        if (!user) {
            return NextResponse.json(
                { error: "No user found", message:"Invalid username" },
                { status: 404 }
            );
        }

        // password validation
        let validatePassword = await bcryptjs.compare(password, user.password);
        if (!validatePassword) {
            return NextResponse.json(
                { success: false, message: "Invalid password or username" },
                { status: 400 }
            );
        }

        let tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        };
        let jwtToken = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
            expiresIn: "1h",
        });

        let response = NextResponse.json(
            { success: true, message: "login successfull" },
            { status: 200 }
        );
        response.cookies.set("token", jwtToken, { httpOnly: true });
        return response;
    } catch (error) {
        return NextResponse.json({ error: error.message });
    }
}
