import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: '5n8h847y',
  dataset: 'production',
  useCdn: false, // `false` if you want to ensure fresh data
  apiVersion: '2024-05-08',
})

export const fetchProducts = async () => {
  return await client.fetch(`*[_type == "product"]{
    _id,
    title,
    "slug": slug.current,
    description,
    "imageUrl": image.asset->url,
    actualPrice,
    offerPrice,
    downloadLink
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
