import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import Loading from "../../components/Loading"
import { Field, Form, Formik } from "formik"

type Detail = {
    id: string
    title: string
    photo: string
    subdescr: string
    detail: string
    oldPrice: number
    price: number
    quantity: number
    classifyName: string
}

const GoodsDetail = () => {
    const location = useLocation()
    const {id} = useParams()
    const [goods, setGoods] = useState<Detail>()

    useEffect(() => {
        loadInitData()
    }, [])

    const loadInitData = () => {
        setGoods({
            'id': 'goods001',
            title: '玄黄不灭甲',
            photo: 'http://172.18.0.5:9000/vacan/1715047588395_wechat-tools-icon.png',
            subdescr: '简介修改后',
            detail: '<p>afjalf</p><p>afaf</p><p><img src="http://172.18.0.5:9000/vacan/1717386609894_wechat-tools-icon.png"></p><p>afdafa</p>',
            oldPrice: 100,
            price: 99.99,
            quantity: 38,
            classifyName: '衣服'
        })
    }

    return(
        <>
        {!goods ? <Loading/> :
        <div className="panel px-60 pt-10" style={{minHeight: 'calc(100vh - 120px)'}}>
            <div className="h-[400px] grid grid-cols-3 gap-6">
                <div className="h-[100%] text-center items-center">
                    <img src={goods.photo} alt="img" className="h-[100%] border border-[#d3d3d3]" />
                </div>
                <div className="h-[100%] col-start-2 col-end-4">
                <Formik
                initialValues={{count: 1}}
                onSubmit={() => {}}
                >
                <Form>
                    <ul className="space-y-5 font-semibold text-white-dark">
                        <li className="text-3xl">
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