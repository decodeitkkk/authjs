import { connect } from "@/db/db";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import { User } from "@/model/users/register";
connect() 

export const getDataFromToken = async (request) => {
    try {
        let reqBody = await request.json()
        let token = request.cookies.get("token")?.value || ""
        let decodedToken = await jwt.verify(token,process.env.TOKEN_SECRET)
        
        return decodedToken.id

    } catch (error) {
        throw new Error(error.message)
    }
};
