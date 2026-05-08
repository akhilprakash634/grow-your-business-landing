import { defineType, defineField } from 'sanity'
import { DocumentIcon } from '@sanity/icons'

export const order = defineType({
  name: 'order',
  title: 'Order',
  type: 'document',
  icon: DocumentIcon,
  readOnly: true, // Orders should be managed via API, not manually in Studio
  fields: [
    defineField({
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
    }),
    defineField({
      name: 'customerEmail',
      title: 'Customer Email',
      type: 'string',
    }),
    defineField({
      name: 'productId',
      title: 'Product ID',
      type: 'string',
    }),
    defineField({
      name: 'amount',
      title: 'Amount (INR)',
      type: 'number',
    }),
    defineField({
      name: 'paymentId',
      title: 'Razorpay Payment ID',
      type: 'string',
    }),
    defineField({
      name: 'orderId',
      title: 'Razorpay Order ID',
      type: 'string',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      initialValue: 'completed',
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: (new Date()).toISOString(),
    }),
  ],
})
