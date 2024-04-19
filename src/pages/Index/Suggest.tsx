import { useEffect, useState } from "react"
import { guessLikesapi } from '../../config/api/shop';
import { useTranslation } from "react-i18next";

const Suggest = () => {
    const {t} = useTranslation()
    const [guessLikes, setGuessLikes] = useState([])

    useEffect(()=>{
        loadGuessLikes()
    }, [])

    const loadGuessLikes = () => {
        guessLikesapi(setGuessLikes)
    }

    return (
        <div>
            {guessLikes.length > 0 ? (
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-5">
                    {guessLikes.map((item: any, i: number) => {
                        return (
                            <div key={item.id} className={`space-y-5 rounded-md border border-white-light bg-white p-5 shadow-[0px_0px_2px_0px_rgba(145,158,171,0.20),0px_12px_24px_-4px_rgba(145,158,171,0.12)] dark:border-[#1B2E4B] dark:bg-black`}>
                                <div className="h-56 overflow-hidden rounded-md">
                                    <img src={item.photo} alt="..." className="w-full object-cover" />
                                </div>
                                <div>
                                    <p className="text-base font-semibold dark:text-white">{item.title}</p>
                                    <p className="dark:text-white mt-2">{item.subdescr}</p>
                                    <p className="dark:text-white mt-4">
                                        <span className='float-left'>{t('sales')} {item.quantity}</span>
                                        <span className='float-right'>{t('price')} <span className="text-primary line-through">{item.origPrice}</span> <span className="text-red-500">{item.price}</span></span>
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            ): ''}
        </div>
    )
}

export default Suggest