'use client'

import {trpc} from '../trpc/client'
import {useRouter} from 'next/navigation'
import {useEffect} from 'react'

interface PaymentStatusProps {
    orderEmail: string | null | undefined
    orderId: string
    isPaid: boolean
}

const PaymentStatus = ({orderEmail, orderId, isPaid}: PaymentStatusProps) => {

    const router = useRouter()
    const {data} = trpc.payment.pollOrderStatus.useQuery({orderId}, {
        enabled: !isPaid,
        refetchInterval: (data) => (data?.isPaid ? false : 1000)
    })

    useEffect(() => {
        if (data?.isPaid) router.refresh()
    }, [data?.isPaid, router])


    return <div className={'mt-16 grid grid-col-2 gap-x-4 text-sm text-gray-600'}>
        <div>
            <p className={'font-medium text-gray-900'}>Надіслано</p>
            <p>{orderEmail}</p>
        </div>

        <div>
            <p className={'font-medium text-gray-900'}>Статус замовлення</p>
            <p>{isPaid ? "Оплачено" : "Обробляємо оплату"}</p>
        </div>
    </div>
}

export default PaymentStatus