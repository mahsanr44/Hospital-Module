import Room from "@/lib/models/room.model";
import { connectDB } from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest, response: NextResponse) => {
  try {
    await connectDB();

    const { name, checked } = await request.json();

    const room = new Room({
      name,
      checked,
    });
console.log(room)
   const dd= await room.save();
console.log(dd)
    return Response.json({ message: "Room data saved successfully" });
  } catch (error) {
    console.error(error);
    return Response.json({ error: "Something went wrong" });
  }
};
