import { useEffect, useState } from "react"
import { getPushed } from "../../config/api/trade"
import {parse} from '../../util/time'

const AuctionMart = () => {
    const [trades, setTrades] = useState([])
    useEffect(() => {
        loadTrades()
    }, [])

    const loadTrades = () => {
        getPushed(setTrades)
    }

    return(
        <div>
            {trades.map((trade: any) => {
                return(

                    <div className="mb-5" key={trade.id}>
                        <div className="flex">
                            <div className="ltr:mr-4 rtl:ml-4">
                                <img src="/assets/images/profile-5.jpeg" alt="img" className="w-16 h-16 rounded" />
                            </div>
                            <div className="flex-1">
                                <div className="mb-2">
                                    <span className="font-semibold text-lg text-primary">{trade.name}</span>
                                    <span className="ml-10 align-middle">{trade.status}</span>
                                </div>
                                <div className="mt-3">
                                    <span className="font-semibold text-blue-500">开始时间 : {parse(trade.startTime)}</span>
                                    {trade.endTime ? <span className="font-semibold ml-10 text-red-500">结束时间 : {parse(trade.endTime)}</span>: ''}
                                </div>
                            </div>
                        </div>
                        <hr/>
                    </div>
                )
            })}
        </div>
    )
}

export default AuctionMart