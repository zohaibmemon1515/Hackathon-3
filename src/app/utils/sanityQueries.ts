import { client } from "@/sanity/lib/client";

export async function fetchItemByID(id: string) {
  try {
    return await client.fetch(
      `*[_type == "product" && _id == $id][0]{
        _id,
        title,
        "imageUrl": productImage.asset->url,
        price,
        tags,
        discountPercentage,
        description,
        isNew
      }`,
      { id }
    );
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw new Error("Error fetching product by ID");
  }
}
export async function fetchRelatedProductsByTags(tags: string[]) {
  if (!tags || tags.length === 0) {
    // Return an empty array instead of throwing an error
    return [];
  }

  const query = `*[_type == "product" && tags in $tags]{
    _id,
    title,
    "imageUrl" :productImage.asset -> url,
    price,
    tags,
    discountPercentage,
    description,
    isNew
  }`;

  return await client.fetch(query, { tags });
}

