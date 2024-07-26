import Product from "@/models/product";
import { connectToDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
    try {
        await connectToDB();
        const { pId } = await req.json();

        if (!pId) {
            return NextResponse.json({ message: "Missing or invalid fields" }, { status: 400 });
        }

        const result = await Product.deleteOne({ _id: pId });

        if (result.deletedCount === 0) {
            return NextResponse.json({ message: "Product not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Product deleted successfully" }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
    }
}
