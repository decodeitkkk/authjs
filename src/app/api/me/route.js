import { getDataFromToken } from "@/helper/getDataFromToken"
import { User } from "@/model/users/register"
import { NextResponse } from "next/server"

export async function POST(request){
    try {
    //    extract data from token 
        let userId = await getDataFromToken(request)
        let user = await User.findOne({_id : userId}).select("-password")
        
        console.log(`user found`)
        return NextResponse.json({message:"user found",data:user},{status:201})


    } catch (error) {
        return NextResponse.json({error:error.message})
    }
}