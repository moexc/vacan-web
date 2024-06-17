import { useNavigate, useParams } from "react-router-dom"

const PayResult = () => {

    const nav = useNavigate()
    const {orderId = ''} = useParams()

    const gotoOrderPage = () => {
        nav('/order')
    }

    return(
        <div style={{minHeight: 'calc(100vh - 120px)'}} className="px-80 pt-32 prose bg-[#f1f2f3] rounded max-w-full dark:bg-[#1b2e4b] dark:text-white-light w-full">
            <h2 className="text-dark mb-5  mt-4 text-center text-5xl dark:text-white-light">支付成功</h2>
            <p className="lead mt-3 mb-4 dark:text-white-light text-center">
                您已成功支付，请等待卖方发货。
            </p>
            <hr className="my-4 dark:border-[#191e3a]" />
            <p className="mb-5">您已成功支付，请等待卖方发货。</p>
            <p className="lead">
                <button type="button" className="btn btn-dark" onClick={gotoOrderPage}>
                    确定
                </button>
            </p>
        </div>
    )
}

export default PayResult