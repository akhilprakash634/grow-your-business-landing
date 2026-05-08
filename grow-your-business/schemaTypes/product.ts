import { defineType, defineField } from 'sanity'
import { BasketIcon } from '@sanity/icons'

export const product = defineType({
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: BasketIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'price',
      title: 'Price (Legacy)',
      type: 'number',
    }),
    defineField({
      name: 'actualPrice',
      title: 'Actual Price (INR)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'offerPrice',
      title: 'Offer Price (INR)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'downloadLink',
      title: 'Download Link',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'previewImages',
      title: 'Preview Images (PDF Samples)',
      type: 'array',
      of: [{ type: 'image' }],
      description: 'Upload screenshots of the first few pages of the PDF for the quick preview modal.'
    }),
    defineField({
      name: 'rating',
      title: 'Average Rating (Manual)',
      type: 'number',
      initialValue: 5,
      validation: (Rule) => Rule.min(1).max(5),
      description: 'Used for social proof display if there are no customer reviews.'
    }),
    defineField({
      name: 'totalReviews',
      title: 'Total Reviews (Manual)',
      type: 'number',
      initialValue: 0,
      description: 'Total number of reviews to display for social proof.'
    }),
  ],
})
