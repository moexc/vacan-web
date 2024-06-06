import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { OrderVO, getOrderDetailApi, getPayQrcodeApi } from "../../config/api/order"
import Loading from "../../components/Loading"
import { toMoney } from "../../util/number"
import { parse } from "../../util/time"
import TimeCountDown from "../../components/TimeCountDown"

const Pay = () => {
    const {orderId = ''} = useParams()
    const [order, setOrder] = useState<OrderVO>()
    const [loading, setLoading] = useState(true)
    const [qrCode, setQrCode] = useState<string>()

    useEffect(() => {
        initData()
    }, [])

    const initData = async () => {
        await getOrderDetailApi(orderId, setOrder)
        setLoading(false)
    }

    const getQrCode = () => {
        if(qrCode) return
        getPayQrcodeApi(orderId, setQrCode)
    }

    return(
        <>
        {loading || !order ? <Loading/> :
        <div className="panel px-60 pt-10" style={{minHeight: 'calc(100vh - 120px)'}}>
            {order.status == '00'? <div className="text-center mt-20 text-3xl">此订单不可支付</div>:
            <div>
                <div className="panel">
                    <div className="flex justify-between flex-wrap gap-4 px-4">
                        <div className="text-2xl font-semibold uppercase">支付订单</div>
                        
                    </div>
                    <div className="flex justify-between flex-wrap gap-4 px-4">
                        
                        <div className="space-y-1 text-white-dark pt-16">
                            <div>收货地址：{order.address}</div>
                            <div>下单时间：{parse(order.createTime)}</div>
                            <div>自动取消：<TimeCountDown overTime={order.createTime + (100000 * 60 * 1000)} className="text-red-500 font-bold inline" /></div>
                        </div>
                        <div className="flex-1 flex gap-3">
                            <div className="w-[125px] text-center">
                                <div className="h-[125px] border border-solid border-gray-500 mb-2" onClick={getQrCode}>
                                    {qrCode ? <img src={`data:image/png;base64,${qrCode}`} className="inline" /> : ''}
                                </div>
                                <a onClick={getQrCode}>支付宝</a>
                            </div>
                            {/* <div className="w-40 text-center">
                                <img src={`data:image/png;base64,${qrCode}`} className="inline"/>
                                <div>支付宝</div>
                            </div>
                            <div className="w-40 text-center">
                                <img src={`data:image/png;base64,${qrCode}`} className="inline"/>
                                <div>支付宝</div>
                            </div>
                            <div className="w-40 text-center">
                                <img src={`data:image/png;base64,${qrCode}`} className="inline"/>
                                <div>支付宝</div>
                            </div>
                            <div className="w-40 text-center">
                                <img src={`data:image/png;base64,${qrCode}`} className="inline"/>
                                <div>支付宝</div>
                            </div>
                            <div className="w-40 text-center">
                                <img src={`data:image/png;base64,${qrCode}`} className="inline"/>
                                <div>支付宝</div>
                            </div>
                            <div className="w-40 text-center">
                                <img src={`data:image/png;base64,${qrCode}`} className="inline"/>
                                <div>支付宝</div>
                            </div>
                            <div className="w-40 text-center">
                                <img src={`data:image/png;base64,${qrCode}`} className="inline"/>
                                <div>支付宝</div>
                            </div> */}
                        </div>
                    </div>

                    <hr className="border-white-light dark:border-[#1b2e4b] my-6" />
                    <div className="table-responsive mt-6">
                        <table className="table-striped">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>项目</th>
                                    <th>数量</th>
                                    <th className="!text-right">单价</th>
                                    <th className="!text-right">小计</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="!text-center"><img src={order.photo} className="h-5"/></td>
                                    <td>{order.title}</td>
                                    <td>{order.quantity}</td>
                                    <td className="!text-right">{toMoney(order.price)}</td>
                                    <td className="!text-right">{toMoney(order.amount)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="grid sm:grid-cols-2 grid-cols-1 px-4 mt-6">
                        <div>
                        </div>
                        <div className="ltr:text-right rtl:text-left space-y-2">
                            <div className="flex items-center">
                                <div className="flex-1">合计</div>
                                <div className="w-[37%]">{toMoney(order.amount)}</div>
                            </div>
                            <div className="flex items-center">
                                <div className="flex-1">税额</div>
                                <div className="w-[37%]">+ 0</div>
                            </div>
                            <div className="flex items-center">
                                <div className="flex-1">服务费</div>
                                <div className="w-[37%]">+ 0</div>
                            </div>
                            <div className="flex items-center">
                                <div className="flex-1">折扣</div>
                                <div className="w-[37%]">- 0</div>
                            </div>
                            <div className="flex items-center font-semibold text-lg">
                                <div className="flex-1">实付</div>
                                <div className="w-[37%]">{toMoney(order.amount)}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            }
        </div>
        }
        </>
    )
}

export default Pay