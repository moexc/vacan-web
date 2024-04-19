import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { setPageTitle } from '../store/themeConfigStore';
import { useDispatch } from 'react-redux';
import IconBox from '../components/Icon/IconBox';
import BlankHeader from '../components/Layouts/BlankHeader'
import { useTranslation } from 'react-i18next';
import IconStar from '../components/Icon/IconStar';
import IconClipboardText from '../components/Icon/IconClipboardText';
import IconTrendingUp from '../components/Icon/IconTrendingUp';
import IconTwitter from '../components/Icon/IconTwitter';

const Index = () => {
    const {t} = useTranslation()
    const dispatch = useDispatch();
    const navigator = useNavigate()
    useEffect(() => {
        dispatch(setPageTitle('首页'));
    });
    const [activeTab, setActiveTabString] = useState<String>('nohas');
    const setActiveTab = (path: string) => {
        setActiveTabString(path)
        navigator('/'+ path)
    }
    const hotsearchs=[
        'Sales', 'Charts', 'Finance', 'Trending', 'Order', 'Item', 'Model', 'Field', 'Form'
    ]

    const [hotsearch, setHotsearch] = useState('')
    useEffect(()=>{
        setHotsearch('夏季男装')
    }, [])

    useEffect(() => {
        setActiveTabString(window.location.pathname.replaceAll("/", ""))
    }, []);

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
                        className={`group flex w-[150px] cursor-pointer flex-col items-center justify-center gap-4 rounded-md px-8 py-2.5 text-center text-[#506690] duration-300 hover:bg-white hover:text-primary dark:hover:bg-[#1B2E4B]
                    ${activeTab === '' ? 'bg-white text-primary dark:bg-[#1B2E4B]' : ''}`}
                        onClick={() => setActiveTab('')}
                    >
                        <IconStar fill={true} className="w-8 h-8"/>
                        <h5 className="font-bold text-black dark:text-white">{t('suggest')}</h5>
                    </li>
                    <li
                        className={`group flex w-[150px] cursor-pointer flex-col items-center justify-center gap-4 rounded-md px-8 py-2.5 text-center text-[#506690] duration-300 hover:bg-white hover:text-primary dark:hover:bg-[#1B2E4B]
                    ${activeTab === 'notice' ? 'bg-white text-primary dark:bg-[#1B2E4B]' : ''}`}
                        onClick={() => setActiveTab('notice')}
                    >
                        <IconClipboardText fill={true} className="w-8 h-8"/>
                        <h5 className="font-bold text-black dark:text-white">{t('notice')}</h5>
                    </li>
                    <li
                        className={`group flex w-[150px] cursor-pointer flex-col items-center justify-center gap-4 rounded-md px-8 py-2.5 text-center text-[#506690] duration-300 hover:bg-white hover:text-primary dark:hover:bg-[#1B2E4B]
                    ${activeTab === 'auction_mart' ? 'bg-white text-primary dark:bg-[#1B2E4B]' : ''}`}
                        onClick={() => setActiveTab('auction_mart')}
                    >
                        <IconBox fill={true} className="w-8 h-8"/>

                        <h5 className="font-bold text-black dark:text-white">{t('auction_mart')}</h5>
                    </li>
                    <li
                        className={`group flex w-[150px] cursor-pointer flex-col items-center justify-center gap-4 rounded-md px-8 py-2.5 text-center text-[#506690] duration-300 hover:bg-white hover:text-primary dark:hover:bg-[#1B2E4B]
                    ${activeTab === 'report' ? 'bg-white text-primary dark:bg-[#1B2E4B]' : ''}`}
                        onClick={() => setActiveTab('report')}
                    >
                        <IconTrendingUp fill={true} className="w-8 h-8"/>

                        <h5 className="font-bold text-black dark:text-white">{t('report')}</h5>
                    </li>
                    <li
                        className={`group flex w-[150px] cursor-pointer flex-col items-center justify-center gap-4 rounded-md px-8 py-2.5 text-center text-[#506690] duration-300 hover:bg-white hover:text-primary dark:hover:bg-[#1B2E4B]
                    ${activeTab === 'contact' ? 'bg-white text-primary dark:bg-[#1B2E4B]' : ''}`}
                        onClick={() => setActiveTab('contact')}
                    >
                        <IconTwitter fill={true} className="w-8 h-8"/>

                        <h5 className="font-bold text-black dark:text-white">{t('contact')}</h5>
                    </li>
                </ul>
            </div>

            <div className='mx-60 min-h-[400px]'>
                <Outlet/>
            </div>

            <div className="text-center dark:text-white-dark my-5">© {new Date().getFullYear()}. Vristo All rights reserved.</div>
        </div>
    );
};

export default Index;
