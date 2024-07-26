import Product from "@/models/product";
import { connectToDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
    try {
        await connectToDB();
        const { pId, fields } = await req.json();

        if (!pId || !fields || typeof fields !== 'object') {
            return NextResponse.json({ message: "Missing or invalid fields" }, { status: 400 });
        }

        const result = await Product.updateOne({ _id: pId }, { $set: fields });

        if (result.modifiedCount === 0) {
            return NextResponse.json({ message: "Product not found or no changes made" }, { status: 404 });
        }

        return NextResponse.json({ message: "Product updated successfully" }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}
