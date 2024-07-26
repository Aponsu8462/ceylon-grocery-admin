import Category from "@/models/category";
import { connectToDB } from "@/utils/database";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectToDB();
    const categories = await Category.find({});
    const modifiedCategories = categories.map((category) => category.name);
    return NextResponse.json(modifiedCategories);
  } catch (error) {
    console.error("Error fetching categories from the database:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
