import { useEffect, useState } from "react"
import { getPushedApi } from "../../config/api/trade"
import {parse} from '../../util/time'
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"

const AuctionMart = () => {
    const {t} = useTranslation()
    const navigate = useNavigate()
    const [trades, setTrades] = useState([])
    useEffect(() => {
        loadTrades()
    }, [])

    const loadTrades = () => {
        getPushedApi(setTrades)
    }

    const gotoBiddingPage = (tradeId: string) => {
        navigate('/bid', {state: {tradeId}})
    }

    return(
        <div>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-5">
                {trades.map((trade: any) => {
                    return (
                        <div key={trade.id} onClick={() => gotoBiddingPage(trade.id)} className={`space-y-5 rounded-md border border-white-light bg-white p-5 shadow-[0px_0px_2px_0px_rgba(145,158,171,0.20),0px_12px_24px_-4px_rgba(145,158,171,0.12)] dark:border-[#1B2E4B] dark:bg-black`}>
                            <div className="h-56 overflow-hidden rounded-md">
                                <img src='/assets/images/profile-5.jpeg' alt="..." className="w-full object-cover" />
                            </div>
                            <div>
                                <p className="text-base font-semibold dark:text-white">{trade.name}</p>
                                <p className="dark:text-white mt-2">{t('start_time')} : <span className="text-red-500">{parse(trade.startTime)}</span></p>
                                <p className="dark:text-white mt-2">
                                    <span className='float-left'>{t('status')} : <span className={`font-semibold ${trade.status === '运行中' ? 'text-primary' : ''}`}>{trade.status}</span></span>
                                    <span className='float-right'>{t('bid_count')} : <span className="font-semibold text-primary">{trade.bidCount}</span></span>
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default AuctionMart