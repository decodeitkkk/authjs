import { User } from "@/model/users/register";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { connect } from "@/db/db";
import jwt from "jsonwebtoken";

connect();
export async function POST(request) {
    try {
        let reqBody = await request.json();

        let response = NextResponse.json({
            success: true,
            message: "Logout successfully !!!",
        });
        response.cookies.set("token", "", { httpOnly: true });
        return response;
    } catch (error) {
        return NextResponse.json({ error: error.message });
    }
}
