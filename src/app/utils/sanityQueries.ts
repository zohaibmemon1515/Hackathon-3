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
    throw new Error("Tags array is empty");
  }

  try {
    
    return await client.fetch(
      `*[_type == "product" && (tags[0] in $tags || tags[1] in $tags || tags[2] in $tags || tags[3] in $tags)]{
        _id,
        title,
        "imageUrl": productImage.asset->url,
        price,
        tags,
        discountPercentage,
        description,
        isNew
      }`,
      { tags }
    );
  } catch (error) {
    console.error("Error fetching related products:", error);
    throw new Error("Error fetching related products");
  }
}
