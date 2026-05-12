import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const client = createClient({
  projectId: '5n8h847y',
  dataset: 'production',
  useCdn: true, // Edge-cached responses — much faster TTFB
  apiVersion: '2024-05-08',
})

// Image URL builder — generates optimised, WebP-auto CDN URLs
const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

/**
 * Returns an optimised image URL from a Sanity image asset URL or reference.
 * Automatically serves WebP/AVIF via `auto=format`.
 */
export function optimisedImageUrl(
  source: string | null | undefined,
  { w = 800, h, q = 80 }: { w?: number; h?: number; q?: number } = {}
): string {
  if (!source) return ''
  // If it's already a full CDN URL (asset->url projection), append params
  if (source.startsWith('https://')) {
    const url = new URL(source)
    url.searchParams.set('auto', 'format')
    url.searchParams.set('w', String(w))
    if (h) url.searchParams.set('h', String(h))
    url.searchParams.set('q', String(q))
    url.searchParams.set('fit', 'max')
    return url.toString()
  }
  return source
}

/**
 * Generates a srcset string for Sanity images for responsive delivery.
 * Example sizes: [400, 600, 800, 1200]
 */
export function getImageSrcSet(
  source: string | null | undefined,
  widths: number[] = [400, 600, 800, 1200]
): string {
  if (!source) return ''
  return widths
    .map(w => `${optimisedImageUrl(source, { w })} ${w}w`)
    .join(', ')
}

export const fetchProducts = async () => {
  return await client.fetch(`*[_type == "product" && disabled != true]{
    _id,
    title,
    "slug": slug.current,
    description,
    "imageUrl": image.asset->url,
    actualPrice,
    offerPrice,
    downloadLink,
    "previewUrls": previewImages[].asset->url
  }`)
}

export const fetchPricing = async () => {
  return await client.fetch(`*[_type == "pricing"] | order(price asc) {
    _id,
    planName,
    price,
    features,
    isPopular,
    buttonText
  }`)
}

export const fetchOffers = async () => {
  return await client.fetch(`*[_type == "offer" && isActive == true]`)
}
