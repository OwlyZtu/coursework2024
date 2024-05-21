import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import React from "react";
import Link from "next/link";
import {Button, buttonVariants} from "@/components/ui/button";
import {ArrowDownToLineIcon, CheckCircleIcon, Leaf} from "lucide-react";
import ProductReel from "@/components/ProductReel";

const perks = [
    {
        name: 'Instant delivery',
        icon: ArrowDownToLineIcon,
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    },
    {
        name: 'Guaranteed quality',
        icon: CheckCircleIcon,
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    },
    {
        name: 'For the Planet',
        icon: Leaf,
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum",
    }
]
export default function Home() {
    return (
        <>
            <MaxWidthWrapper>
                <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
                    <h1 className={'text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'}> Читай книги до
                        <span className="text-blue-600"> душі</span>. </h1>
                    <p className={'mt-6 text-lg max-w-prose text-muted-foreground'}>
                        Вітаємо в HippoBooks. Вибирай електронні книги до смаку
                    </p>
                    <div className={'flex flex-col sn:flex-row gap-4 mt-6'}>
                        <Link href="/products" className={buttonVariants()}>Пошук новенького</Link>
                        <Button variant={'ghost'}>Гарантії &rarr;</Button>
                    </div>
                </div>
                <ProductReel query={{sort:"desc", limit:4}} title={'Новинки'} href={'/products'}/>
            </MaxWidthWrapper>

            <section className={'border-t border-gray-200 bg-gray-50'}>
                <MaxWidthWrapper className={'py-20'}>
                    <div className={'grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3' +
                        'lg:gap-x-8 lg:gap-y-0'}>
                        {perks.map((perk) => (
                            <div key={perk.name}
                                 className={'text-center md:flex md:items-start md:text-left lg:block lg:text-center'}>
                                <div className={'md:flex-shrink-0 flex justify-center'}>
                                    <div
                                        className={'h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-900'}>
                                        {<perk.icon className={'w-1/3 h-1/3'}/>}
                                    </div>
                                </div>
                                <div className={'mt-6 md:nl-4 md:mt-0 lg:ml-0 lg:mt-6'}>
                                    <h3 className={'text-base font-medium text-gray-900'}>{perk.name}</h3>
                                    <p className={'mt-3 text-sm text-muted-foreground'}>{perk.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </MaxWidthWrapper>
            </section>
        </>
    );
}
