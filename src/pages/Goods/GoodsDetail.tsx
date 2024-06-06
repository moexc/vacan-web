import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Loading from "../../components/Loading"
import { Field, Form, Formik } from "formik"
import { getGoodsDetailApi } from "../../config/api/shop"
import { createOrderApi } from "../../config/api/order"
import AddressSelect from "../../components/AddressSelect"

type Detail = {
    title: string
    photo: string
    subdescr: string
    detail: string
    oldPrice: number
    price: number
    quantity: number
}

const GoodsDetail = () => {
    const nav = useNavigate()
    const {id = ''} = useParams()
    const [loading, setLoading] = useState(true)
    const [goods, setGoods] = useState<Detail>()
    const [addressDialogShow, setAddressDialogShow] = useState(false)
    const payCount = useRef(1)

    useEffect(() => {
        loadInitData()
    }, [])

    const loadInitData = () => {
        getGoodsDetailApi(id, (data: any) => {
            setGoods(data)
            setLoading(false)
        })
    }

    const selectAddress = (count: number) => {
        payCount.current = count
        setAddressDialogShow(true)
    }

    const createOrder = (address: string) => {
        createOrderApi(id, payCount.current, address, (orderId: string) => {
            if(!orderId) return
            nav(`/pay/${orderId}`)
        })
    }

    return(
        <>
        {loading || !goods ? <Loading/> :
        <div className="panel px-60 pt-10" style={{minHeight: 'calc(100vh - 120px)'}}>
            <div className="grid grid-cols-3 gap-6">
                <div className="h-[400px] text-center items-center">
                    <img src={goods.photo} alt="img" className="h-[100%] border border-[#d3d3d3]" />
                </div>
                <div className="col-start-2 col-end-4">
                <Formik
                initialValues={{count: 1}}
                onSubmit={(data) => selectAddress(data.count)}
                >
                <Form>
                    <ul className="space-y-5 font-semibold text-white-dark">
                        <li className="text-2xl">
                            {goods.title}
                        </li>
                        <li className="min-h-[150px]">
                            {goods.subdescr}
                        </li>
                        <li className="flex items-center gap-2">
                            <span>单价：</span>
                            <span>{goods.price}</span>
                            <span className="line-through">{goods.oldPrice}</span>
                        </li>
                        <li className="flex items-center gap-2">
                            <span>库存：</span>
                            <span>{goods.quantity}</span>
                        </li>
                        <li>
                            <Field type='number' name='count' className='form-input w-28' />
                        </li>
                        <li>
                            <button type="submit" className="btn btn-success">下单</button>
                        </li>
                        <li>
                            <AddressSelect show={addressDialogShow} close={() => setAddressDialogShow(false)} onChange={(data) => {createOrder(data)}} />
                        </li>
                    </ul>
                </Form>
                </Formik>
                </div>
            </div>
            
            <h5 className="mt-6 border-b border-b-gray-200 font-semibold text-lg dark:text-white-light">详细信息</h5>

            <div dangerouslySetInnerHTML={{__html: goods.detail}} className="mt-2"/>
        </div>
        }
        </>
    )

}

export default GoodsDetail