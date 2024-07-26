import { NextResponse } from "next/server";

import { connectToDB } from "@/utils/database";

import { ProductType } from "@/types/productTypes";
import Product from "@/models/product";

export async function GET(request: Request) {

  try {
    await connectToDB();
    const products : ProductType [] = await Product.find({}); 
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching product from the database:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
