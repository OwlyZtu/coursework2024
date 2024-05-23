import {Access, CollectionConfig} from "payload/types";
import {PRODUCT_CATEGORIES, PRODUCT_TYPES} from "../../config";
import {Product, User} from "../../payload-types";
import {BeforeChangeHook} from "payload/dist/collections/config/types";
import {stripe} from "../../lib/stripe";

const isAdmin =
    (): Access => async ({req}) => {
        const user = req.user as User

        return user.role === 'admin';
    }
const addUser: BeforeChangeHook<Product> = async ({req, data}) => {
    const user = req.user
    return {...data, user: user.id}
}
export const Products: CollectionConfig = {
    slug: "products",
    admin: {
        useAsTitle: "name"
    },
    access: {
        read: isAdmin(),
        delete: isAdmin(),
        update: isAdmin(),
    },
    hooks: {
        beforeChange: [
            addUser, async (args) => {
                if (args.operation === "create") {
                    const data = args.data as Product

                    const createdProduct = await stripe.products.create({
                        name: data.name,
                        default_price_data: {
                            currency: 'UAH',
                            unit_amount: Math.round(data.price * 100)
                        }
                    })

                    const updated: Product = {
                        ...data,
                        stripeId: createdProduct.id,
                        priceId: createdProduct.default_price as string,
                    }

                    return updated
                } else if (args.operation === "update") {
                    const data = args.data as Product

                    const updatedProduct = await stripe.products.update(
                        data.stripeId!,{
                            name: data.name,
                            default_price: data.priceId!,
                    })

                    const updated: Product = {
                        ...data,
                        stripeId: updatedProduct.id,
                        priceId: updatedProduct.default_price as string,
                    }

                    return updated
                }
            }
        ]
    },
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
            name: 'priceId',
            access: {
                create: () => false,
                read: () => false,
                update: () => false,
            },
            type: 'text',
            admin: {
                hidden: true,
            },
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