import Category from "@/models/category";
import { connectToDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectToDB();
        const { name } = await req.json();  
        
        if (!name) {
            return NextResponse.json({ message: "Missing or invalid fields" }, { status: 400 });
        }
        
        await Category.create({ name });
        return NextResponse.json({ message: "Category created successfully" }, { status: 201 });

    } catch (error) {
        console.error(error); 
        return NextResponse.json({ message: "Something went wrong" }, { status: 500 }); 
    }
}
