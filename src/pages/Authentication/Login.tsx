import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState } from '../../store';
import { useEffect } from 'react';
import { setPageTitle, toggleRTL, toggleLocale } from '../../store/themeConfigStore';
import Dropdown from '../../components/Dropdown';
import i18next from 'i18next';
import IconCaretDown from '../../components/Icon/IconCaretDown';
import IconMail from '../../components/Icon/IconMail';
import IconLockDots from '../../components/Icon/IconLockDots';
import { useTranslation } from 'react-i18next';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { loginapi, LoginData } from '../../config/api/user';
import { login as rdxlogin} from '../../store/authStore';

const LoginBoxed = () => {
    const {t} = useTranslation()
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle(t('sign_in')));
    });
    const navigate = useNavigate();
    const themeConfig = useSelector((state: IRootState) => state.themeConfigStore);
    const setLocale = (flag: string) => {
        dispatch(toggleLocale(flag))
    };

    const SubmittedForm = Yup.object().shape({
        username: Yup.string().required(t('enter_username')),
        password: Yup.string().required(t('enter_password')),
    });

    const toLogin = (formValue: LoginData) => {
        loginapi(formValue, (rst : any) =>{
            dispatch(rdxlogin({
                logined: "1",
                username: formValue.username,
                userimg: rst.img,
                nickname: rst.nickName,
                jwt: rst.token,
            }))
            navigate('/')
        })
    }

    return (
        <div>
            <div className="absolute inset-0">
                <img src="/assets/images/auth/bg-gradient.png" alt="image" className="h-full w-full object-cover" />
            </div>

            <div className="relative flex min-h-screen items-center justify-center bg-[url(/assets/images/auth/map.png)] bg-cover bg-center bg-no-repeat px-6 py-10 dark:bg-[#060818] sm:px-16">
                <img src="/assets/images/auth/coming-soon-object1.png" alt="image" className="absolute left-0 top-1/2 h-full max-h-[893px] -translate-y-1/2" />
                <img src="/assets/images/auth/coming-soon-object2.png" alt="image" className="absolute left-24 top-0 h-40 md:left-[30%]" />
                <img src="/assets/images/auth/coming-soon-object3.png" alt="image" className="absolute right-0 top-0 h-[300px]" />
                <img src="/assets/images/auth/polygon-object.svg" alt="image" className="absolute bottom-0 end-[28%]" />
                <div className="relative w-full max-w-[870px] rounded-md bg-[linear-gradient(45deg,#fff9f9_0%,rgba(255,255,255,0)_25%,rgba(255,255,255,0)_75%,_#fff9f9_100%)] p-2 dark:bg-[linear-gradient(52.22deg,#0E1726_0%,rgba(14,23,38,0)_18.66%,rgba(14,23,38,0)_51.04%,rgba(14,23,38,0)_80.07%,#0E1726_100%)]">
                    <div className="relative flex flex-col justify-center rounded-md bg-white/60 backdrop-blur-lg dark:bg-black/50 px-6 lg:min-h-[758px] py-20">
                        <div className="absolute top-6 end-6">
                            <div className="dropdown">
                                <Dropdown
                                    offset={[0, 8]}
                                    placement='bottom-start'
                                    btnClassName="flex items-center gap-2.5 rounded-lg border border-white-dark/30 bg-white px-2 py-1.5 text-white-dark hover:border-primary hover:text-primary dark:bg-black"
                                    button={
                                        <>
                                            <div>
                                                <img src={`/assets/images/flags/${themeConfig.locale.toUpperCase()}.svg`} alt="image" className="h-5 w-5 rounded-full object-cover" />
                                            </div>
                                            <div className="text-base font-bold uppercase">{themeConfig.locale}</div>
                                            <span className="shrink-0">
                                                <IconCaretDown />
                                            </span>
                                        </>
                                    }
                                >
                                    <ul className="!px-2 text-dark dark:text-white-dark grid grid-cols-2 gap-2 font-semibold dark:text-white-light/90 w-[280px]">
                                        {themeConfig.languageList.map((item: any) => {
                                            return (
                                                <li key={item.code}>
                                                    <button
                                                        type="button"
                                                        className={`flex w-full hover:text-primary rounded-lg ${themeConfig.locale === item.code ? 'bg-primary/10 text-primary' : ''}`}
                                                        onClick={() => {
                                                            i18next.changeLanguage(item.code);
                                                            setLocale(item.code);
                                                        }}
                                                    >
                                                        <img src={`/assets/images/flags/${item.code.toUpperCase()}.svg`} alt="flag" className="w-5 h-5 object-cover rounded-full" />
                                                        <span className="ltr:ml-3 rtl:mr-3">{item.name}</span>
                                                    </button>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </Dropdown>
                            </div>
                        </div>
                        <div className="mx-auto w-full max-w-[440px]">
                            <div className="mb-10">
                                <h1 className="text-3xl font-extrabold uppercase !leading-snug text-primary md:text-4xl">{t('sign_in')}</h1>
                                <p className="text-base font-bold leading-normal text-white-dark">{t('enter_username_pwd2login')}</p>
                            </div>

                            <Formik
                            initialValues={{
                                username: '',
                                password: '',
                                reme: false,
                            }}
                            validationSchema={SubmittedForm}
                            onSubmit={toLogin}
                            >
                                {({ errors, submitCount, touched }) => (
                                    <Form className="space-y-5 dark:text-white">
                                        <div>
                                            <label htmlFor="username">{t('username')}</label>
                                            <div className="relative text-white-dark">
                                                <Field name="username" type="text" id="username"
                                                placeholder={t('enter_username')} 
                                                className="form-input ps-10 placeholder:text-white-dark"/>
                                                <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                                    <IconMail fill={true} />
                                                </span>
                                            </div>
                                            {touched.username && errors.username ? <div className="text-danger mt-1">{errors.username}</div> : null}
                                        </div>

                                        <div>
                                            <label htmlFor="password">{t('password')}</label>
                                            <div className="relative text-white-dark">
                                                <Field name="password" type="password" id="password"
                                                placeholder={t('enter_password')}
                                                className="form-input ps-10 placeholder:text-white-dark"/>
                                                <span className="absolute start-4 top-1/2 -translate-y-1/2">
                                                    <IconLockDots fill={true} />
                                                </span>
                                            </div>
                                            {touched.password && errors.password ? <div className="text-danger mt-1">{errors.password}</div> : null}
                                        </div>

                                        <div>
                                            <label className="flex cursor-pointer items-center">
                                                <Field type="checkbox" className="form-checkbox bg-white dark:bg-black" name="reme"/>
                                                <span className="text-white-dark">{t('remember_me')}</span>
                                            </label>
                                        </div>

                                        <button type="submit" className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]">
                                            {t('sign_in')}
                                        </button>

                                    </Form>
                                )}
                            </Formik>

                            <div className="relative my-7 text-center md:mb-9 dark:text-white">
                                {t('dt_have_account')}&nbsp;
                                <Link to="/auth/register" className="uppercase text-primary underline transition hover:text-black dark:hover:text-white">
                                    {t('sign_up')}
                                </Link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginBoxed;
