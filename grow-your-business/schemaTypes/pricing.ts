import { defineType, defineField, defineArrayMember } from 'sanity'
import { BillIcon } from '@sanity/icons'

export const pricing = defineType({
  name: 'pricing',
  title: 'Pricing Plan',
  type: 'document',
  icon: BillIcon,
  fields: [
    defineField({
      name: 'planName',
      title: 'Plan Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price (INR)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
    defineField({
      name: 'isPopular',
      title: 'Is Popular Plan?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      initialValue: 'Get Started',
    }),
  ],
})
