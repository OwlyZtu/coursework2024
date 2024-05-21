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
            label: "Назва",
            type: "text",
            required: true
        },
        {
            name: "author",
            label: "Автор",
            type: "text",
            required: true
        },
        {
            name: "description",
            type: "textarea",
            label: "Опис"
        },
        {
            name: "price",
            label: "Ціна",
            type: "number",
            required: true,
            min: 0,
        },
        {
            name: "category",
            label: "Категорія",
            type: "select",
            options: PRODUCT_CATEGORIES.map(({label, value}) => ({label, value})),
            required: true
        },
        {
            name: "type",
            label: "Тип",
            type: "select",
            options: PRODUCT_TYPES.map(({label, value}) => ({label, value})),
            required: true
        },
        {
            name: "product_file",
            label: "Файл продукту",
            type: "relationship",
            required: true,
            relationTo: "product_files",
            hasMany: false
        },
        {
            name: "stripeId",
            access: {
                create: ({req}) => req.user.role === 'admin',
                read: ({req}) => req.user.role === 'admin',
                update: ({req}) => req.user.role === 'admin',
            },
            type: "text",
            admin: {
                hidden: true
            }
        },
        {
            name: "images",
            label: "Фото",
            type: "array",
            required: true,
            minRows: 1,
            maxRows: 4,
            labels: {
                singular: "Image",
                plural: "Images"
            },
            fields: [
                {
                    name: "image",
                    type: "upload",
                    relationTo: 'media',
                    required: true,
                }
            ]
        }
    ]
}