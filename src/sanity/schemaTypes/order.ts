import { defineType } from "sanity";


export const Order = defineType({
  name: 'Order',
  title: 'Order',
  type: 'document',
  fields: [
    {
      name: "orderDate",
      title: "Order Date",
      type: "datetime",
    },
    {
      name: "product_id",
      title: "Product IDs",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "firstName",
      title: "First Name",
      type: "string",
    },
    {
      name: "lastName",
      title: "Last Name",
      type: "string",
    },
    {
      name: "country",
      title: "Country",
      type: "string",
    },
    {
      name: "streetAddress",
      title: "Street Address",
      type: "string",
    },
    {
      name: "city",
      title: "City",
      type: "string",
    },
    {
      name: "state",
      title: "State/Province",
      type: "string",
    },
    {
      name: "zipCode",
      title: "Zip Code",
      type: "string",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.email(),
    },
    {
        name: "phone",
        title: "Phone Number",
        type: "number",
      },
    {
      name: "userId",
      title: "User ID",
      type: "string",
    },
  ],
});