import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../store";
import { useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import sio, {Socket} from 'socket.io-client'
import { parse } from "../util/time";
import { toMoney } from "../util/number";
import TimeCountDown from "../components/TimeCountDown";
import { flushTokenapi } from "../config/api/user";
import { gotoLogin } from "../router/routes";
import { flushToken, logout } from "../store/authStore";
import { Field, Form, Formik } from "formik";
import { DataTable } from "mantine-datatable";
import { Cell, CellMoney } from "../components/DataTableCell";
import IconArrowLeft from "../components/Icon/IconArrowLeft";
import { toast } from "../components/Toast";

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
    const dispatch = useDispatch();
    const tradeId = location.state?.tradeId
    const authStore = useSelector((state: IRootState) => state.authStore);
    let token = authStore.token || ''
    const reftoken = authStore.reftoken || ''
    const [trade, setTrade] = useState<Trade>()
    const socket = useRef<Socket>()

    useEffect(() => {
        connectEngine()
        
        return(() => {
            socket.current?.disconnect()
        })
    }, [])

    const connectEngine = () => {
        const socketIns = sio(`ws://localhost:9527?tradeId=${tradeId}&token=${token}`, {
            reconnectionDelay: 1000,
            timeout: 1000
        })
        socketIns.on('trade-info', (msg)=>{
            setTrade(msg)
        })
        socketIns.on('bided', (msg: boolean) => {
            msg ? toast('报价成功', 'success') : toast('报价失败', 'warning')
        })
        socketIns.on('token-exp', async (msg: string) => {
            const token = await tokenExpFlush()            
            socketIns.emit('reset-token', token)
            if(msg === 'connect'){
                console.log("connect", '重新connect');
            }if(msg === 'bidding'){
                console.log("bidding", '重新bidding');
            }
        })
        socket.current = socketIns
    }

    const bidding = (price: number) => {
        socket.current?.emit('bidding', {tradeId, 'bidId': trade?.bids[trade.bidIndex].id, price})
    }

    const tokenExpFlush = async () => {
        let newtoken = '', newreftoken
        await flushTokenapi(reftoken, (res: any)=>{
            newtoken = res?.token
            newreftoken = res?.refToken
        })
        if(!newtoken || !newreftoken){
            dispatch(logout())
            gotoLogin()
            return;
        }
        dispatch(flushToken({'token': newtoken, 'reftoken': newreftoken}))
        return newtoken
    }

    const showBid = (bid: Bid) => {
        return (
            <>
                <div className="w-full grid grid-cols-4 gap-2 text-lg">
                    <div className="col-start-1 col-end-6 flex">
                        <div className="text-white-dark w-20 text-right">名称:</div>
                        <div className="ml-2">{bid.name}</div>
                    </div>

                    <div className="flex">
                        <div className="text-white-dark w-20 text-right">开始时间:</div>
                        <div className="ml-2">{parse(bid.startTime)}</div>
                    </div>
                    <div className="col-start-2 col-end-6 flex">
                        <div className="text-white-dark w-20 text-right">倒计时:</div>
                        <div className="ml-2">
                            <TimeCountDown overTime={bid.endTIme} className="text-red-500 font-bold" />
                        </div>
                    </div>

                    <div className="flex">
                        <div className="text-white-dark w-20 text-right">竞拍状态:</div>
                        <div className="ml-2">{statusBadge(bid.status)}</div>
                    </div>
                    <div className="col-start-2 col-end-6 flex">
                        <div className="text-white-dark w-20 text-right">起拍价:</div>
                        <div className="ml-2">{toMoney(bid.startPrice)}</div>
                    </div>
                    
                    <div className="flex">
                        <div className="text-white-dark w-20 text-right">成交状态:</div>
                        <div className="ml-2">{bidStatusBadge(bid.bidStatus)}</div>
                    </div>
                    <div className="col-start-2 col-end-6 flex">
                        <div className="text-white-dark w-20 text-right">竞价幅度:</div>
                        <div className="ml-2">{toMoney(bid.bidPrice)}</div>
                    </div>
                    
                    <div className="flex">
                        <div className="text-white-dark w-20 text-right">当前报价:</div>
                        <div className="ml-2">{bid.price ? toMoney(bid.price) : '暂无'}</div>
                    </div>
                    
                    <div className="col-start-2 col-end-6 flex">
                        <div className="text-white-dark w-20 text-right">报价:</div>
                        <div className="ml-2">
                            <Formik
                            initialValues={{price: ''}}
                            onSubmit={(data) => bidding(Number(data.price))}
                            >
                                <Form className="flex gap-4">
                                    <Field type="number" name='price' className="form-input w-28 p-1"/>
                                    <button type="submit" className="btn btn-success w-full gap-2">提交</button>
                                </Form>
                            </Formik>
                        </div>
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
                <div className="px-60 pt-10 text-center text-xl" style={{minHeight: 'calc(100vh - 120px)'}}>
                    无数据
                </div>
            ) : (
                <div className="panel px-60 pt-10" style={{minHeight: 'calc(100vh - 120px)'}}>
                    <div className="flex justify-between flex-wrap gap-4 px-4">
                        <div className="text-2xl font-semibold uppercase flex items-center gap-2">
                            {trade.name}
                            {statusBadge(trade.status, true)}
                            <span className="text-gray-400">({trade.bidIndex === -1 ? parse(trade.startTime) : `第${trade.bidIndex + 1}节`})</span>
                        </div>
                    </div>

                    <hr className="border-white-light dark:border-[#1b2e4b] my-6" />
                    <div className="flex justify-between lg:flex-row flex-col gap-6 flex-wrap min-h-[200px]">
                        {trade.bidIndex !== -1 ? showBid(trade.bids[trade.bidIndex]) : <div className="flex-1 pt-[50px] text-center text-lg text-warning font-semibold">未开始</div>}
                    </div>

                    <div className="datatables mt-6">
                        <DataTable
                        noRecordsText="无数据"
                        records={trade.bids}
                        columns={[
                        { accessor: 'id', title: 'ID', hidden: true},
                        { accessor: 'num', width: 60, title: '', textAlignment:'center', render: (item, index) => 
                            <Cell align="right">{trade.bidIndex === index && <IconArrowLeft className="w-6 h-6" />}{index + 1}</Cell>
                        },
                        { accessor: 'name', title: '名称', textAlignment:'center', render: ({name}) => <Cell align="left">{name}</Cell>},
                        { accessor: 'startTime', width: 200, title: '开始时间', textAlignment: 'center',  render: ({startTime}) => <Cell>{parse(startTime)}</Cell>},
                        { accessor: 'endTIme', width:200, title: '结束时间', textAlignment: 'center', render: ({status, endTIme}) => <Cell>{status === '已结束' && parse(endTIme)}</Cell>},
                        { accessor: 'startPrice', width:120, title: '起拍价', textAlignment: 'right', render: ({startPrice}) => <CellMoney>{startPrice}</CellMoney>},
                        { accessor: 'price', width:120, title: '报价', textAlignment: 'right', render: ({price}) => <CellMoney>{price}</CellMoney>},
                        { accessor: 'status', width: 180, title: '竞拍状态', textAlignment: 'center', render: ({status}) => <Cell>{status}</Cell>},
                        { accessor: 'bidStatus', width:120, title: '成交状态', textAlignment: 'center', render: ({bidStatus}) => <Cell>{bidStatus}</Cell>},
                        ]}
                        idAccessor="id"
                        minHeight={200}
                        rowClassName={(item, index) => trade.bidIndex === index ? '!bg-gray-50' : ''}
                        />
                    </div>
                </div>
            )}
        </>
    )
}

export default Bidding
