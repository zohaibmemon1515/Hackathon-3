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
   
    return [];
  }

  const query = `*[_type == "product" && count(tags[@ in $tags]) > 0]{
    _id,
    title,
    "imageUrl" : productImage.asset -> url,
    price,
    tags,
    discountPercentage,
    description,
    isNew
  }`;


  return await client.fetch(query, { tags });
}

