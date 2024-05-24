export const PRODUCT_TYPES = [
    {
        label: 'Електронні книги',
        value: 'electron_books' as const,
        featured: [
            {
                name: 'Історична проза',
                value: 'historic' as const,
                href: '/products?category=historic',
            },
            {
                name: 'Детективи',
                value: 'detectives' as const,
                href: '/products?category=detectives',
            },
            {
                name: 'Жахи',
                value: 'horror' as const,
                href: '/products?category=horror',
            },
            {
                name: 'Фантастика',
                value: 'fantastic' as const,
                href: '/products?category=fantastic',
            },
            {
                name: 'Фентезі',
                value: 'fantasy' as const,
                href: '/products?category=fantasy',
            },
            {
                name: 'Класична література',
                value: 'classic' as const,
                href: '/products?category=classic',
            },
            {
                name: 'Комікси та манга',
                value: 'comics' as const,
                href: '/products?category=comics',
            },
        ],

    },
]

export const PRODUCT_CATEGORIES = [
    {
        label: 'Історична проза',
        value: 'historic' as const,
        href: '/products?category=historic',
    },
    {
        label: 'Детективи',
        value: 'detectives' as const,
        href: '/products?category=detectives',
    },
    {
        label: 'Жахи',
        value: 'horror' as const,
        href: '/products?category=horror',
    },
    {
        label: 'Фантастика',
        value: 'fantastic' as const,
        href: '/products?category=fantastic',
    },
    {
        label: 'Фентезі',
        value: 'fantasy' as const,
        href: '/products?category=fantasy',
    },
    {
        label: 'Класична література',
        value: 'classic' as const,
        href: '/products?category=classic',
    },
    {
        label: 'Комікси та манга',
        value: 'comics' as const,
        href: '/products?category=comics',
    },
]