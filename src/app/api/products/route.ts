import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";
import { fetchItemByID, fetchRelatedProductsByTags } from "@/app/utils/sanityQueries";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");
  const tags = url.searchParams.getAll("tags[]");

  try {
    if (id) {
      const product = await fetchItemByID(id);
      return NextResponse.json(product, { status: 200 });
    }
    if (tags) {
      const relatedProducts = await fetchRelatedProductsByTags(tags);
      return NextResponse.json(relatedProducts, { status: 200 });
    }
    // Default to fetching all products if no specific parameters are given
    const data = await client.fetch(`*[_type=="product"]{
      _id,
      title,
      "imageUrl" :productImage.asset -> url,
      price,
      tags,
      discountPercentage,
      description,
      isNew
    }`);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Error in GET handler:", error);
    return new NextResponse("Error fetching data", { status: 500 });
  }
}
