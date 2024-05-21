'use client'
import {Button} from "./ui/button";
import {useEffect, useState} from "react";
import {useCart} from "@/hooks/use-cart";
import {Product} from "@/payload-types";

const AddToCartButton = ({product}: { product: Product }) => {
    const {addItem} = useCart()
    const [isSuccess, setIsSuccess] = useState<Boolean>(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsSuccess(false)
        }, 2000)

        return () => clearTimeout(timeout)
    }, [isSuccess])
    return (
        <Button onClick={() => {
            addItem(product)
            setIsSuccess(true)
        }} size="lg" className={'w-full'}>{isSuccess ? "Додано!" : "Додати до кошика"}</Button>
    )
}

export default AddToCartButton