"use client"
import React, {useEffect, useRef, useState} from "react";
import {PRODUCT_CATEGORIES} from '@/config';
import NavItem from "@/components/NavItem";
import {useOnClickOutside} from "@/hooks/use-on-click-outside";

export const NavItems = () => {
    const [activeIndex, setActiveIndex] = useState<
        null | number
    >(null)

    const isAnyOpen = activeIndex !== null

    {/*Closes navbar on click outside */}
    useEffect(() =>{
        const handler = (e: KeyboardEvent) =>{
           if (e.key === "Escape"){
               setActiveIndex(null)
           }
        }

        document.addEventListener("keydown", (e)=> handler);

        return ()=>{
            document.removeEventListener("keydown", handler);
        }
    }, [])


    const navRef = useRef<HTMLDivElement | null>(null);


    useOnClickOutside(navRef, () => setActiveIndex(null))
    return (
        <div className={'flex gap-4 h-full'} ref={navRef}>
            {PRODUCT_CATEGORIES.map((category, i) => {
                const handleOpen = () => {
                    if (activeIndex === i) {
                        setActiveIndex(null)
                    } else {
                        setActiveIndex(i)
                    }
                }

            const isOpen = i === activeIndex;
            return(
                <NavItem category={category} handleOpen={handleOpen} isOpen={isOpen} key={category.value} isAnyOpen={isAnyOpen}/>
            )
        })}
        </div>
    )
}