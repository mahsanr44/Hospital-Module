import ProcessFlow from "@/lib/models/processflow.model";
import Room from "@/lib/models/room.model";
import Token from "@/lib/models/token.model";
import { connectDB } from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest, response: NextResponse) => {
  try {
    // Database Connection
    connectDB();

    // Destructuring
    const requestBody = await request.json();
    const { roomType, totalTime } = requestBody;
    console.log(requestBody);

    // Find the last Token record and update its processFlowId
    const lastToken = await Token.findOne({}).sort({ _id: -1 });

    if (!lastToken) {
      return Response.json("No Token records found");
    }

    const lastTokenId = lastToken._doc._id;
    // Check if the request body has the required fields
    if (roomType && totalTime) {
      // Saving the patient data to the database
      const roomData = new Room({
        tokenId: lastTokenId,
        roomType,
        totalTime,
      });
      var roomDataResponse = await roomData.save();
      
    } else {
      console.log("Missing currentToken or patientType or counterNumber ");
    }

    // Update the lastToken's   RoomId

    try {
      // Save the updated record
      var roomId = await roomDataResponse._id;
      lastToken.roomId = roomId;
      console.log(roomId,'rid')
      const d = await lastToken.save();
      console.log(d);
      // Now you can access the saved document
      return Response.json("Last Token record updated successfully");
    } catch (error) {
      console.error("Error while saving Token:", error);
      // Handle the error appropriately, e.g., sending an error response
    }

    // Sending response to the frontend
    return Response.json({
      message: "Patient data added successfully",
      roomData: roomDataResponse,
    });
  } catch (error) {
    console.log(error);
    // Sending error response to the frontend
    return Response.json({
      error: "Error",
    });
  }
};
