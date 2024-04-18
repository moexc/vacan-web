import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { setPageTitle } from '../store/themeConfigStore';
import { useDispatch } from 'react-redux';
import IconDesktop from '../components/Icon/IconDesktop';
import IconUser from '../components/Icon/IconUser';
import IconBox from '../components/Icon/IconBox';
import IconDollarSignCircle from '../components/Icon/IconDollarSignCircle';
import IconRouter from '../components/Icon/IconRouter';
import BlankHeader from '../components/Layouts/BlankHeader'
import { useTranslation } from 'react-i18next';
import { guessLikesapi } from '../config/api/shop';

const Index = () => {
    const {t} = useTranslation()
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('首页'));
    });
    const [activeTab, setActiveTab] = useState<String>('general');
    const hotsearchs=[
        'Sales', 'Charts', 'Finance', 'Trending', 'Order', 'Item', 'Model', 'Field', 'Form'
    ]

    const [hotsearch, setHotsearch] = useState('')
    const [guessLikes, setGuessLikes] = useState([])
    useEffect(()=>{
        setHotsearch('夏季男装')
        loadGuessLikes()
    }, [])

    const loadGuessLikes = async () => {
        const rst: any = await guessLikesapi()
        setGuessLikes(rst)
    }

    return (
        <div>
            <BlankHeader />
            <div className="relative rounded-t-md bg-primary-light bg-[url('/assets/images/knowledge/pattern.png')] bg-contain bg-left-top bg-no-repeat px-5 py-10 dark:bg-black md:px-10">
                <div className="relative">
                    <form action="" method="" className="mb-3">
                        <div className="relative mx-auto max-w-[580px]">
                            <input type="text" placeholder={hotsearch} className="form-input py-3 ltr:pr-[100px] rtl:pl-[100px]" />
                            <button type="button" className="btn btn-primary absolute top-1 shadow-none ltr:right-1 rtl:left-1">
                                {t('search')}
                            </button>
                        </div>
                    </form>
                    <div className="flex flex-wrap items-center justify-center gap-2 font-semibold text-[#2196F3] sm:gap-5">
                        <div className="flex items-center justify-center gap-2 sm:gap-5">
                            {hotsearchs.map(((item, i) => {
                                return (
                                    <Link to={`/search?k=${item}`} className="duration-300 hover:underline" key={i}>
                                        {item}
                                    </Link>
                                )
                            }))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="mb-12 flex items-center rounded-b-md bg-[#DBE7FF] dark:bg-[#141F31]">
                <ul className="mx-auto flex items-center gap-5 overflow-auto whitespace-nowrap px-3 py-4.5 xl:gap-8">
                    <li
                        className={`group flex min-w-[120px] cursor-pointer flex-col items-center justify-center gap-4 rounded-md px-8 py-2.5 text-center text-[#506690] duration-300 hover:bg-white hover:text-primary dark:hover:bg-[#1B2E4B]
                    ${activeTab === 'general' ? 'bg-white text-primary dark:bg-[#1B2E4B]' : ''}`}
                        onClick={() => setActiveTab('general')}
                    >
                        <IconDesktop fill={true} />

                        <h5 className="font-bold text-black dark:text-white">General</h5>
                    </li>
                    <li
                        className={`group flex min-w-[120px] cursor-pointer flex-col items-center justify-center gap-4 rounded-md px-8 py-2.5 text-center text-[#506690] duration-300 hover:bg-white hover:text-primary dark:hover:bg-[#1B2E4B]
                    ${activeTab === 'quick-support' ? 'bg-white text-primary dark:bg-[#1B2E4B]' : ''}`}
                        onClick={() => setActiveTab('quick-support')}
                    >
                        <IconUser fill={true} className="w-8 h-8" />

                        <h5 className="font-bold text-black dark:text-white">Quick Support</h5>
                    </li>
                    <li
                        className={`group flex min-w-[120px] cursor-pointer flex-col items-center justify-center gap-4 rounded-md px-8 py-2.5 text-center text-[#506690] duration-300 hover:bg-white hover:text-primary dark:hover:bg-[#1B2E4B]
                    ${activeTab === 'free-updates' ? 'bg-white text-primary dark:bg-[#1B2E4B]' : ''}`}
                        onClick={() => setActiveTab('free-updates')}
                    >
                        <IconBox fill={true} />

                        <h5 className="font-bold text-black dark:text-white">Free Updates</h5>
                    </li>
                    <li
                        className={`group flex min-w-[120px] cursor-pointer flex-col items-center justify-center gap-4 rounded-md px-8 py-2.5 text-center text-[#506690] duration-300 hover:bg-white hover:text-primary dark:hover:bg-[#1B2E4B]
                    ${activeTab === 'pricing' ? 'bg-white text-primary dark:bg-[#1B2E4B]' : ''}`}
                        onClick={() => setActiveTab('pricing')}
                    >
                        <IconDollarSignCircle fill={true} />

                        <h5 className="font-bold text-black dark:text-white">Pricing</h5>
                    </li>
                    <li
                        className={`group flex min-w-[120px] cursor-pointer flex-col items-center justify-center gap-4 rounded-md px-8 py-2.5 text-center text-[#506690] duration-300 hover:bg-white hover:text-primary dark:hover:bg-[#1B2E4B]
                    ${activeTab === 'hosting' ? 'bg-white text-primary dark:bg-[#1B2E4B]' : ''}`}
                        onClick={() => setActiveTab('hosting')}
                    >
                        <IconRouter fill={true} />

                        <h5 className="font-bold text-black dark:text-white">Hosting</h5>
                    </li>
                </ul>
            </div>
            {guessLikes.length > 0 ? (
                <>
                    <h3 className="text-center text-xl font-semibold md:text-2xl">
                        {t('today_star')}
                    </h3>
                    <div className="panel mt-2 md:mt-5">
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-6">
                            {guessLikes.map((item: any, i: number) => {
                                return (
                                    <div key={item.id} className={`${i%4 === 0 ? 'col-start-2': ''} space-y-5 rounded-md border border-white-light bg-white p-5 shadow-[0px_0px_2px_0px_rgba(145,158,171,0.20),0px_12px_24px_-4px_rgba(145,158,171,0.12)] dark:border-[#1B2E4B] dark:bg-black`}>
                                        <div className="h-56 overflow-hidden rounded-md">
                                            <img src={item.photo} alt="..." className="w-full object-cover" />
                                        </div>
                                        <div>
                                            <p className="text-base font-semibold dark:text-white">{item.title}</p>
                                            <p className="dark:text-white mt-2">{item.subdescr}</p>
                                            <p className="dark:text-white mt-4">
                                                <span className='float-left'>销量 {item.quantity}</span>
                                                <span className='float-right'>价格 <span className="text-primary line-through">{item.origPrice}</span> <span className="text-red-500">{item.price}</span></span>
                                            </p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </>
            ): ''}
            
            <div className="text-center dark:text-white-dark my-5">© {new Date().getFullYear()}. Vristo All rights reserved.</div>
        </div>
    );
};

export default Index;
