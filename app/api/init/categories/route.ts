import Category from "@/models/category";
import Product from "@/models/product";

import { ProductType } from "@/types/productTypes";
import { connectToDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await connectToDB();
        const categories: string[] = [];
        const products: ProductType[] = await Product.find({});
        for (const product of products) {
            if (!categories.includes(product.category)) {
                categories.push(product.category);
            }
        };

        for (const category of categories) {
            await Category.create({ name: category });
        }
        return new NextResponse("Successfully initialized categories");

    } catch (error) {
        return NextResponse.json({ message: "Something went wrong" }, { status: 400 }); 
    }
}
