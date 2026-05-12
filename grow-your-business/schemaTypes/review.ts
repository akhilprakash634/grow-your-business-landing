import { defineType, defineField } from 'sanity'
import { StarIcon } from '@sanity/icons'

export const review = defineType({
  name: 'review',
  title: 'Customer Review',
  type: 'document',
  icon: StarIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Customer Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating (1-5)',
      type: 'number',
      validation: (Rule) => Rule.required().min(1).max(5),
    }),
    defineField({
      name: 'comment',
      title: 'Comment',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'profession',
      title: 'Profession/Role',
      type: 'string',
      description: 'e.g. Entrepreneur, Digital Marketer, Student',
    }),
    defineField({
      name: 'product',
      title: 'Product',
      type: 'reference',
      to: [{ type: 'product' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'approved',
      title: 'Approved',
      type: 'boolean',
      initialValue: false,
      description: 'Reviews must be approved before they show up on the site.',
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'comment',
      rating: 'rating',
      profession: 'profession',
    },
    prepare(selection) {
      const { title, subtitle, rating, profession } = selection;
      return {
        title: `${title} (${rating} stars)`,
        subtitle: profession ? `${profession} - ${subtitle}` : subtitle,
      };
    },
  },
})
