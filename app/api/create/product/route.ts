import Product from "@/models/product";
import { connectToDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectToDB();
        const { name, price, category, weight, inStock } = await req.json();
        
        if (!name || !price || !category || !weight || typeof inStock !== 'boolean') {
            return NextResponse.json({ message: "Missing or invalid fields" }, { status: 400 });
        }

        await Product.create({ name, price, category, weight, inStock });
        return NextResponse.json({ message: "Product created successfully" }, { status: 201 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 }); 
    }
}
