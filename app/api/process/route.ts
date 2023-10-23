import ProcessFlow from "@/lib/models/processflow.model";
import Token from "@/lib/models/token.model";
import { connectDB } from "@/lib/mongoose";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest, response: NextResponse) => {
  try {
    // Database Connection
    connectDB();

    // Destructuring
    const requestBody = await request.json();
    const { processFlow } = requestBody;
    // Check if the request body has the required fields
    if (processFlow) {
      // Saving the patient data to the database
      const pFlow = new ProcessFlow({
        processFlow,
      });
      var flowData = await pFlow.save();
    } else {
      console.log("Missing currentToken or patientType or counterNumber ");
    }

    // Sending response to the frontend
    return Response.json({
      message: "Patient data added successfully",
      currentFlow: processFlow,
      currentFlowId: flowData,
    });
  } catch (error) {
    console.log(error);
    // Sending error response to the frontend
    return Response.json({
      error: "Error",
    });
  }
};

export const GET = async (request: NextRequest, response: NextResponse) => {
  try {
    connectDB();

    const data = await ProcessFlow.findOne()
      .select("_id")
      .sort({ _id: -1 })
      .exec();

    if (!data) throw new Error("No product fetched");
    // Map the data to extract and convert _id values to ObjectId
    return NextResponse.json({
      message: "OK",
      data: data,
    });
  } catch {
    console.log("error in catch");
  }
};

export const PUT = async (request: NextRequest, response: NextResponse) => {
  try {
    // Connect to the database
    connectDB();

    // Find the last Token record and update its processFlowId
    const lastToken = await Token.findOne({}).sort({ _id: -1 });

    if (!lastToken) {
      return Response.json("No Token records found");
    }
    const requestBody = await request.json();
    // Update the processFlowId
    const { processFlowId } = requestBody;
    // Update the lastToken's processFlowId
    lastToken.processFlowId = processFlowId;

    try {
      // Save the updated record
      await lastToken.save();
      // Now you can access the saved document
      return Response.json("Last Token record updated successfully");
    } catch (error) {
      console.error("Error while saving Token:", error);
      // Handle the error appropriately, e.g., sending an error response
    }
  } catch (error) {
    console.error(error);
    // Sending an error response to the frontend
    return Response.json("Error updating the record");
  }
};
