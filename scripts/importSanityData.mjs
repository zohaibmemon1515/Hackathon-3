import { createClient } from '@sanity/client';

const client = createClient({
  projectId: "fdxy9qun",  
  dataset: "production", 
  useCdn: true,
  apiVersion: '2025-01-13',  
  token: "skfyfW21CBDURAfEpxkgCvZdKVWC1YDnnIo34wBp6d2xGnbjbUoPknA8X3oewhttcpsiRxbti59APzu3gAvapUPiEVUO0CWdY6MOvXYsNvEksXUX4V83A7uzBh7jBUzzZvu4Q8Fh8VnQEJ0yeSOyDThAPn6BuJDTA8d1K8tDBnQBByngcMjs", 
});


async function deleteExistingProducts() {
  try {
    const existingProducts = await client.fetch('*[_type == "product"]{_id}');
    for (const product of existingProducts) {
      await client.delete(product._id);
      console.log(`Deleted product: ${product._id}`);
    }
    console.log("All old products deleted.");
  } catch (error) {
    console.error('Error deleting existing products:', error);
  }
}


async function uploadImageToSanity(imageUrl) {
  try {
    const response = await fetch(imageUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${imageUrl}`);
    }

    console.log(`Image fetched successfully from: ${imageUrl}`);

    const buffer = await response.arrayBuffer();
    const bufferImage = Buffer.from(buffer);

    const asset = await client.assets.upload('image', bufferImage, {
      filename: imageUrl.split('/').pop() ?? 'default-image-name.jpg',
    });

    console.log(`Image uploaded successfully: ${asset._id}`);
    return asset._id; 
  } catch (error) {
    console.error('Failed to upload image:', imageUrl, error);
    return null; 
  }
}


async function uploadProduct(product) {
  try {
    const imageId = await uploadImageToSanity(product.imageUrl);

    if (imageId) {
      const document = {
        _type: 'product',
        title: product.title,
        price: product.price,
        productImage: {
          _type: 'image',
          asset: {
            _ref: imageId, 
          },
        },
        tags: product.tags,
        discountPercentage: product.discountPercentage || 0,  
        description: product.description,
        isNew: product.isNew ? true : false, 
      };

      const createdProduct = await client.create(document);
      console.log(`Product ${product.title} uploaded successfully:`, createdProduct);
    } else {
      console.log(`Product ${product.title} skipped due to image upload failure.`);
    }
  } catch (error) {
    console.error('Error uploading product:', error);
  }
}


async function importData() {
  try {
 
    const response = await fetch('https://template6-six.vercel.app/api/products');
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const products = await response.json();


    await deleteExistingProducts();

    
    for (const product of products) {
      await uploadProduct(product);
    }

    console.log("All new products have been uploaded.");
  } catch (error) {
    console.error('Error importing data:', error);
  }
}

importData();
