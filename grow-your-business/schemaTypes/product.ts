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
      name: 'headline',
      title: 'Sales Headline',
      type: 'string',
      description: 'Result-focused headline (e.g., The Daily ₹500 AI Side Hustle)'
    }),
    defineField({
      name: 'subheadline',
      title: 'Subheadline',
      type: 'text',
      description: 'Who it is for + ease/timeline (e.g., For beginners with zero skills. Copy-paste these 44 prompts to start earning today.)'
    }),
    defineField({
      name: 'problemPoints',
      title: 'Problem Points (Pain Points)',
      type: 'array',
      of: [{type: 'string'}],
      description: 'The struggles your audience faces (e.g., "Tired of zero income", "Confused by complex AI tools")'
    }),
    defineField({
      name: 'solutionText',
      title: 'The Solution',
      type: 'text',
      description: 'How this product simply solves the problem.'
    }),
    defineField({
      name: 'deliverables',
      title: 'What You Get (Deliverables)',
      type: 'array',
      of: [{type: 'string'}],
      description: 'List of tangible items (e.g., "44 Ready-to-use Prompts", "Bonus: Monetization Guide")'
    }),
    defineField({
      name: 'benefits',
      title: 'Key Benefits',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Outcome-driven benefits (e.g., "Work from your phone", "Instant Delivery")'
    }),
    defineField({
      name: 'audience',
      title: 'Target Audience',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Who is this perfect for?'
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'question', type: 'string'},
            {name: 'answer', type: 'text'}
          ]
        }
      ]
    }),
    defineField({
      name: 'ctaText',
      title: 'Call to Action Text',
      type: 'string',
      initialValue: 'Get Instant Access Now',
      description: 'Text for the main buy button.'
    }),
    defineField({
      name: 'countdown',
      title: 'Countdown Timer Duration',
      type: 'object',
      description: 'Set the evergreen countdown timer duration. Set all to 0 to hide.',
      fields: [
        {name: 'days', title: 'Days', type: 'number', initialValue: 0},
        {name: 'hours', title: 'Hours', type: 'number', initialValue: 0},
        {name: 'minutes', title: 'Minutes', type: 'number', initialValue: 15},
        {name: 'seconds', title: 'Seconds', type: 'number', initialValue: 0},
      ]
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
    defineField({
      name: 'disabled',
      title: 'Disable Product',
      type: 'boolean',
      initialValue: false,
      description: 'If enabled, this product will be hidden from the store and cannot be purchased.'
    }),
    defineField({
      name: 'authorName',
      title: 'Author Name',
      type: 'string',
      description: 'Name of the creator of this product.'
    }),
    defineField({
      name: 'authorBio',
      title: 'Author Bio',
      type: 'text',
      description: 'Short professional bio of the author.'
    }),
    defineField({
      name: 'authorImage',
      title: 'Author Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'authorSocials',
      title: 'Author Social Links',
      type: 'array',
      of: [
        {
          name: 'socialLink',
          type: 'object',
          fields: [
            { name: 'platform', type: 'string', title: 'Platform (e.g. Instagram, Twitter, LinkedIn)' },
            { name: 'url', type: 'url', title: 'URL' },
          ],
        },
      ],
    }),
  ],
})
