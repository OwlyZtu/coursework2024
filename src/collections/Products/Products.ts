import {CollectionConfig} from "payload/types";
import {PRODUCT_CATEGORIES, PRODUCT_TYPES} from "../../config";

export const Products: CollectionConfig = {
    slug: "products",
    admin: {
        useAsTitle: "name"
    },
    access: {},
    fields: [
        {
            name: "user",
            type: "relationship",
            relationTo: "users",
            required: true,
            hasMany: false,
            admin: {
                condition: () => false
            }
        },
        {
            name: "name",
            label: "Name",
            type: "text",
            required: true
        },
        {
            name: "description",
            type: "textarea",
            label: "Product details"
        },
        {
            name: "price",
            label: "Price",
            type: "number",
            required: true,
            min: 0,
        },
        {
            name: "category",
            label: "Category",
            type: "select",
            options: PRODUCT_CATEGORIES.map(({label, value}) => ({label, value})),
            required: true
        },
        {
            name: "type",
            label: "Type",
            type: "select",
            options: PRODUCT_TYPES.map(({label, value}) => ({label, value})),
            required: true
        },
        {
            name: "product_file",
            label: "Product file",
            type: "relationship",
            required: true,
            relationTo: "product_files",
            hasMany: false
        },
        {
            name: "stripeId",
            access:{
                create: ({ req }) => req.user.role === 'admin',
                read: ({ req }) => req.user.role === 'admin',
                update: ({ req }) => req.user.role === 'admin',
            },
            type: "text",
            admin:{
                hidden: true
            }
        },
        {
            name: "images",
            label: "Images",
            type:"array",
            required: true,
            minRows:1,
            maxRows:4,
            labels:{
                singular:"Image",
                plural:"Images"
            },
            fields:[
                {
                    name:"image",
                    type:"upload",
                    relationTo:'media',
                    required:true,
                }
            ]
        }
    ]
}