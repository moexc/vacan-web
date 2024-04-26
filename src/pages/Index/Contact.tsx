import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPageTitle } from "../../store/themeConfigStore";
import { IRootState } from "../../store";
import IconUser from "../../components/Icon/IconUser";
import IconMail from "../../components/Icon/IconMail";
import IconPhoneCall from "../../components/Icon/IconPhoneCall";
import IconPencil from "../../components/Icon/IconPencil";
import IconMessageDots from "../../components/Icon/IconMessageDots";
import { Tab } from '@headlessui/react';
import { Fragment } from 'react';
import { useTranslation } from "react-i18next";

const Contact = () => {
    const {t} = useTranslation()
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('Contact Us Boxed'));
    });

    const submitForm = () => {
        
    };

    const isDark = useSelector((state: IRootState) => state.themeConfigStore.theme === 'dark' || state.themeConfigStore.isDarkMode);
    const themeConfig = useSelector((state: IRootState) => state.themeConfigStore);

    return (
        <div>
            <div className="relative flex items-center justify-center bg-cover bg-center bg-no-repeat px-6 dark:bg-[#060818] sm:px-16">
                <div className="relative w-full max-w-[870px] rounded-md bg-[linear-gradient(45deg,#fff9f9_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#fff9f9_100%)] p-2 dark:bg-[linear-gradient(52.22deg,#0E1726_0%,rgba(14,23,38,0)_18.66%,rgba(14,23,38,0)_51.04%,rgba(14,23,38,0)_80.07%,#0E1726_100%)]">
                    <div className="relative flex flex-col justify-center rounded-md backdrop-blur-lg dark:bg-black/50 px-6">
                        <div className="mx-auto w-full">

                            <div className="mb-5 flex flex-col sm:flex-row">
                                <Tab.Group>
                                    <div className="mx-10 mb-5 sm:mb-0">
                                        <Tab.List className="m-auto flex w-24 flex-col justify-center space-y-3">
                                            <Tab as={Fragment}>
                                                {({ selected }) => (
                                                    <button
                                                        className={`${selected ? '!bg-info text-white !outline-none' : ''} duration-300 flex h-16 w-16 flex-col items-center justify-center rounded-full bg-[#f1f2f3] transition-all hover:!bg-info hover:text-white hover:shadow-[0_5px_15px_0_rgba(0,0,0,0.30)] dark:bg-[#191e3a]`}
                                                    >
                                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6"><circle cx="12" cy="6" r="4" stroke="currentColor" stroke-width="1.5"></circle><path opacity="0.5" d="M20 17.5C20 19.9853 20 22 12 22C4 22 4 19.9853 4 17.5C4 15.0147 7.58172 13 12 13C16.4183 13 20 15.0147 20 17.5Z" stroke="currentColor" stroke-width="1.5"></path></svg>
                                                    </button>
                                                )}
                                            </Tab>
                                            <Tab as={Fragment}>
                                                {({ selected }) => (
                                                    <button
                                                        className={`${selected ? '!bg-info text-white !outline-none' : ''} duration-300 flex h-16 w-16 flex-col items-center justify-center rounded-full bg-[#f1f2f3] transition-all hover:!bg-info hover:text-white hover:shadow-[0_5px_15px_0_rgba(0,0,0,0.30)] dark:bg-[#191e3a]`}
                                                    >
                                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6"><path d="M16.1007 13.359L16.5562 12.9062C17.1858 12.2801 18.1672 12.1515 18.9728 12.5894L20.8833 13.628C22.1102 14.2949 22.3806 15.9295 21.4217 16.883L20.0011 18.2954C19.6399 18.6546 19.1917 18.9171 18.6763 18.9651M4.00289 5.74561C3.96765 5.12559 4.25823 4.56668 4.69185 4.13552L6.26145 2.57483C7.13596 1.70529 8.61028 1.83992 9.37326 2.85908L10.6342 4.54348C11.2507 5.36691 11.1841 6.49484 10.4775 7.19738L10.1907 7.48257" stroke="currentColor" stroke-width="1.5"></path><path opacity="0.5" d="M18.6763 18.9651C17.0469 19.117 13.0622 18.9492 8.8154 14.7266C4.81076 10.7447 4.09308 7.33182 4.00293 5.74561" stroke="currentColor" stroke-width="1.5"></path><path opacity="0.5" d="M16.1007 13.3589C16.1007 13.3589 15.0181 14.4353 12.0631 11.4971C9.10807 8.55886 10.1907 7.48242 10.1907 7.48242" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"></path></svg>
                                                    </button>
                                                )}
                                            </Tab>
                                        </Tab.List>
                                    </div>

                                    <Tab.Panels>
                                        <Tab.Panel>
                                            <div className="flex items-start">
                                                <form className="space-y-5 w-[450px]" onSubmit={submitForm}>
                                                    <div className="relative text-white-dark">
                                                        <input id="Name" type="text" placeholder={t('name')} className="form-input ps-10 placeholder:text-white-dark" />
                                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                                            <IconUser fill={true} />
                                                        </span>
                                                    </div>
                                                    <div className="relative text-white-dark">
                                                        <input id="Email" type="email" placeholder={t('mail')} className="form-input ps-10 placeholder:text-white-dark" />
                                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                                            <IconMail fill={true} />
                                                        </span>
                                                    </div>
                                                    <div className="relative text-white-dark">
                                                        <input id="Phone" type="text" placeholder={t('phone')} className="form-input ps-10 placeholder:text-white-dark" />
                                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                                            <IconPhoneCall fill={true} />
                                                        </span>
                                                    </div>
                                                    <div className="relative text-white-dark">
                                                        <input id="Subject" type="text" placeholder={t('subject')} className="form-input ps-10 placeholder:text-white-dark" />
                                                        <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                                            <IconPencil fill={true} />
                                                        </span>
                                                    </div>
                                                    <div className="relative text-white-dark">
                                                        <textarea id="Textarea" rows={4} className="form-textarea resize-none ps-10 placeholder:text-white-dark" placeholder={t('message')}></textarea>
                                                        <span className="absolute start-4 top-2.5">
                                                            <IconMessageDots fill={true} />
                                                        </span>
                                                    </div>
                                                    <button type="submit" className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                                                        {t('submit')}
                                                    </button>
                                                </form>
                                            </div>
                                        </Tab.Panel>
                                        <Tab.Panel>
                                            <div className="pt-3 text-xl">
                                                <p className="text-xl">
                                                    <span className="font-bold text-blue-500">{t('mail')} : </span><span>123@mail.com</span>
                                                </p>
                                                <p className="pt-3">
                                                    <span className="font-bold text-blue-500">{t('fax')} : </span><span>010-123456</span>
                                                </p>
                                                <p className="pt-3">
                                                    <span className="font-bold text-blue-500">{t('phone')} : </span><span>15110011111</span>
                                                </p>
                                                <p className="pt-3">
                                                    <span className="font-bold text-blue-500">{t('address')} : </span><span>北京市东城区青云路3号</span>
                                                </p>
                                            </div>
                                        </Tab.Panel>
                                    </Tab.Panels>

                                </Tab.Group>
                                
                            </div>

                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact