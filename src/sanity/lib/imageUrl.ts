import imageUrlBuilder from '@sanity/image-url';
import { client } from './client';

interface SanityImageSource {
  asset: {
    _ref: string;
    _type: string;
  };
  
}

const builder = imageUrlBuilder(client);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
