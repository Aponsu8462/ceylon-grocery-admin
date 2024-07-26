import { NextResponse } from "next/server";

import { connectToDB } from "@/utils/database";
import Product from "@/models/product";


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pId = searchParams.get("pId");

  if (!pId) {
    return NextResponse.json({ message: "Product ID is required" }, { status: 400 });
  }

  try {
    await connectToDB();
    const product = await Product.findById(pId); 

    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({
    
      data: product,
    });
  } catch (error) {
    console.error("Error fetching product from the database:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
