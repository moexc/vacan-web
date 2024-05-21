import { useSelector } from "react-redux";
import { IRootState } from "../store";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import sio, {Socket} from 'socket.io-client'
import { parse, parseDate } from "../util/time";
import { CellStatus } from "../components/DataTableCell";
import { toMoney } from "../util/number";

type Trade = {
    id: string
    name: string
    status: string
    startTime: number
    endTIme: number
    bidIndex: number
    bids: Bid[]
}

type Bid = {
    id: string
    name: string
    status: string
    startTime: number
    endTIme: number
    startPrice: number
    bidPrice: number
    price?: number
    bidStatus: string
    bidUser?: string
}

const Bidding = () => {
    const location = useLocation()
    const tradeId = location.state?.tradeId
    const authStore = useSelector((state: IRootState) => state.authStore);
    const token = authStore.token
    const [socket, setSocket] = useState<Socket>()

    const [trade, setTrade] = useState<Trade>()

    useEffect(() => {
        const socketIns = sio(`ws://localhost:9527?tradeId=${tradeId}&token=${token}`, )
        socketIns.on('TradeInfo', (msg)=>{
            setTrade(msg)
        })
        socketIns.on('Bided', (msg) => {
            console.log("Bided", msg);
        })

        setSocket(socketIns)

        return(() => {
            socketIns.disconnect()
        })
    }, [])


    const items = [
        {
            id: 1,
            title: 'Calendar App Customization',
            quantity: 1,
            price: '120',
            amount: '120',
        },
        {
            id: 2,
            title: 'Chat App Customization',
            quantity: 1,
            price: '230',
            amount: '230',
        },
        {
            id: 3,
            title: 'Laravel Integration',
            quantity: 1,
            price: '405',
            amount: '405',
        },
        {
            id: 4,
            title: 'Backend UI Design',
            quantity: 1,
            price: '2500',
            amount: '2500',
        },
    ];

    const columns = [
        {
            key: 'id',
            label: 'S.NO',
        },
        {
            key: 'title',
            label: 'ITEMS',
        },
        {
            key: 'quantity',
            label: 'QTY',
        },
        {
            key: 'price',
            label: 'PRICE',
            class: 'ltr:text-right rtl:text-left',
        },
        {
            key: 'amount',
            label: 'AMOUNT',
            class: 'ltr:text-right rtl:text-left',
        },
    ];

    const showBid = (bid: Bid) => {
        return (
            <>
                <div className="w-full grid grid-cols-4 gap-2 text-lg">
                    <div className="col-start-1 col-end-6 flex">
                        <div className="text-white-dark w-24">名称:</div>
                        <div>{bid.name}</div>
                    </div>
                    <div className="flex">
                        <div className="text-white-dark w-24">开始时间:</div>
                        <div className="">{parse(bid.startTime)}</div>
                    </div>
                    <div className="col-start-2 col-end-6 flex">
                        <div className="text-white-dark w-24">起拍价:</div>
                        <div className="">{toMoney(bid.startPrice)}</div>
                    </div>
                    <div className="flex">
                        <div className="text-white-dark w-24">竞拍状态:</div>
                        <div className="">{statusBadge(bid.status)}</div>
                    </div>
                    <div className="col-start-2 col-end-6 flex">
                        <div className="text-white-dark w-24">竞价幅度:</div>
                        <div className="">{toMoney(bid.bidPrice)}</div>
                    </div>
                    <div className="flex">
                        <div className="text-white-dark w-24">成交状态:</div>
                        <div className="">{bidStatusBadge(bid.bidStatus)}</div>
                    </div>
                    <div className="col-start-2 col-end-6 flex">
                        <div className="text-white-dark w-24">当前报价:</div>
                        <div className="">{bid.price ? toMoney(bid.price) : '暂无'}</div>
                    </div>
                </div>
            </>
        )
    }

    const statusBadge = (status: string, lg: boolean = false) => {
        const textSize = lg ? 'text-lg' : ''
        if (status === '待开始') return <span className={`badge badge-outline-info ${textSize}`}>待开始</span>
        else if (status === '进行中') return <span className={`badge badge-outline-primary ${textSize}`}>进行中</span>
        else if (status === '已结束') return <span className={`badge badge-outline-danger ${textSize}`}>已结束</span>
    }

    const bidStatusBadge = (status: string) => {
        if(status === '流拍') return <span className={`badge badge-outline-danger`}>流拍</span>
        else if(status === '成交') return <span className={`badge badge-outline-success`}>成交</span>
    }

    return(
        <>
            {!trade ? (
                <div className="px-60 pt-10 text-center text-xl">
                    无数据
                </div>
            ) : (
                <div className="panel px-60 pt-10">
                    <div className="flex justify-between flex-wrap gap-4 px-4">
                        <div className="text-2xl font-semibold uppercase flex items-center gap-2">
                            {trade.name}
                            {statusBadge(trade.status, true)}
                            <span className="text-gray-400">(第{trade.bidIndex + 1}节)</span>
                        </div>
                    </div>

                    <hr className="border-white-light dark:border-[#1b2e4b] my-6" />
                    <div className="flex justify-between lg:flex-row flex-col gap-6 flex-wrap">
                        {trade.bidIndex !== -1 && showBid(trade.bids[trade.bidIndex])}
                    </div>
                    <div className="table-responsive mt-6">
                        <table className="table-striped">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>名称</th>
                                    <th>开始时间</th>
                                    <th>结束时间</th>
                                    <th>起拍价</th>
                                    <th>成交价</th>
                                    <th>竞拍状态</th>
                                    <th>成交状态</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trade.bids.map((item, index) => {
                                    return (
                                        <tr key={item.id}>
                                            <td>{index + 1}</td>
                                            <td>{item.name}</td>
                                            <td>{parse(item.startTime)}</td>
                                            <td>{parse(item.endTIme)}</td>
                                            <td className="text-right">{toMoney(item.startPrice)}</td>
                                            <td className="text-right">{toMoney(item.price)}</td>
                                            <td>{item.status}</td>
                                            <td>{item.bidStatus}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    {/* <div className="grid sm:grid-cols-2 grid-cols-1 px-4 mt-6">
                        <div></div>
                        <div className="ltr:text-right rtl:text-left space-y-2">
                            <div className="flex items-center">
                                <div className="flex-1">Subtotal</div>
                                <div className="w-[37%]">$3255</div>
                            </div>
                            <div className="flex items-center">
                                <div className="flex-1">Tax</div>
                                <div className="w-[37%]">$700</div>
                            </div>
                            <div className="flex items-center">
                                <div className="flex-1">Shipping Rate</div>
                                <div className="w-[37%]">$0</div>
                            </div>
                            <div className="flex items-center">
                                <div className="flex-1">Discount</div>
                                <div className="w-[37%]">$10</div>
                            </div>
                            <div className="flex items-center font-semibold text-lg">
                                <div className="flex-1">Grand Total</div>
                                <div className="w-[37%]">$3945</div>
                            </div>
                        </div>
                    </div> */}
                </div>
            )}
        </>
    )
}

export default Bidding
