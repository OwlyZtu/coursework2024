export const PRODUCT_TYPES = [
    {
        label: 'Електронні книги',
        value: 'electron_books' as const,
        featured: [
            {
                name: 'Обране редакцією',
                href: `/products?category=ui_kits`,
                imageSrc: '/nav/ui-kits/mixed.jpg',
            },
            {
                name: 'Новинки',
                href: '/products?category=ui_kits&sort=desc',
                imageSrc: '/nav/ui-kits/blue.jpg',
            },
            {
                name: 'Бестселлери',
                href: '/products?category=ui_kits',
                imageSrc: '/nav/ui-kits/purple.jpg',
            },
        ],

    },
]

export const PRODUCT_CATEGORIES = [
    {
        label: 'Історична проза',
        value: 'historic' as const,
    },
    {
        label: 'Детективи',
        value: 'detectives' as const,
    },
    {
        label: 'Жахи',
        value: 'horror' as const,
    },
    {
        label: 'Фантастика',
        value: 'fantastic' as const,
    },
    {
        label: 'Фентезі',
        value: 'fantasy' as const,
    },
    {
        label: 'Класична література',
        value: 'classic' as const,
    },
    {
        label: 'Комікси та манга',
        value: 'comics' as const,
    },
]