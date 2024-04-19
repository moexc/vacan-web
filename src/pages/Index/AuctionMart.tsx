import { useEffect, useState } from "react"
import { getPushed } from "../../config/api/trade"

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
                    <div key={trade.id}>
                        {trade.name}
                    </div>
                )
            })}
        </div>
    )
}

export default AuctionMart