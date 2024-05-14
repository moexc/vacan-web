import { Field, Form, Formik, useField } from "formik";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from 'yup'
import { Goods, createGoodsApi, getGoodsDetailApi, updateGoodsApi } from "../../../config/api/shop";
import ImgUpload from "../../../components/ImgUpload";


const GoodsCompile = () => {
    const {t} = useTranslation()
    const navigate = useNavigate()
    const location = useLocation()
    const goodsId = location.state && location.state.goodsId

    const [initialValues, setInitialValues] = useState<Goods>({
        title: '',
        photo: '',
        subdescr: '',
        detail: '',
        oldPrice: 0,
        price: 0,
        quantity: 0,
        classify: '',
    });

    useEffect(() => {
        loadInitData()
    }, [])

    const loadInitData = () => {
        goodsId && getGoodsDetailApi(goodsId, setInitialValues)
    }

    const required = t('required')
    const integer = t('integer')
    const min = t('min')

    const checkSchema = Yup.object().shape({
        title: Yup.string().required(required),
        photo: Yup.string().required(required),
        subdescr: Yup.string().required(required),
        detail: Yup.string().required(required),
        oldPrice: Yup.number().nullable().required(required).integer(integer).min(1, `${min}1`),
        price: Yup.number().nullable().required(required).integer(integer).min(1, `${min}1`),
        quantity: Yup.number().nullable().required(required).integer(integer).min(1, `${min}1`),
        classify: Yup.string().required(required),
    })

    const gotoGoodsListPage = () => {
        navigate('/goods')
    }

    const saveGoods = (data: Goods) => {
        goodsId ? updateGoodsApi(data, goodsId, gotoGoodsListPage) : createGoodsApi(data, gotoGoodsListPage)
    }

    return (
        <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={checkSchema}
        onSubmit={saveGoods}
        >

        {({ values, errors, submitCount, touched }) => (
            <Form>
                <div className="flex xl:flex-row flex-col gap-2.5">
                    <div className="panel px-0 flex-1 py-6 ltr:xl:mr-6 rtl:xl:ml-6">
                        <div className="justify-between flex-wrap px-4">
                            <div className="lg:w-1/2 w-full lg:max-w-fit py-2">
                                <div className="flex items-center">
                                    <label htmlFor="title" className="flex-1 ltr:mr-2 rtl:ml-2 mb-0 w-20 text-right">
                                        名称
                                    </label>
                                    <Field type="text" name="title" className="form-input lg:w-[250px] w-2/3"/>
                                    {touched.title && errors.title ? <div className="text-danger mt-1">{errors.title}</div> : null}
                                </div>
                            </div>
                            <div className="lg:w-1/2 w-full lg:max-w-fit py-2">
                                <div className="flex items-center">
                                    <label htmlFor="subdescr" className="flex-1 ltr:mr-2 rtl:ml-2 mb-0 w-20 text-right">
                                        简介
                                    </label>
                                    <Field type="text" name="subdescr" className="form-input lg:w-[250px] w-2/3"/>
                                    {touched.subdescr && errors.subdescr ? <div className="text-danger mt-1">{errors.subdescr}</div> : null}
                                </div>
                            </div>
                            <div className="lg:w-1/2 w-full lg:max-w-fit py-2">
                                <div className="flex items-center">
                                    <label htmlFor="photo" className="flex-1 ltr:mr-2 rtl:ml-2 mb-0 w-20 text-right">
                                        图片
                                    </label>
                                    <ImgUpload name="photo" maxFileSize={1024*1024} maxFileCount={1} width="lg:w-[250px] w-2/3"/>
                                    {errors.photo ? <div className="text-danger mt-1">{errors.photo}</div> : null}
                                </div>
                            </div>
                            <div className="lg:w-1/2 w-full lg:max-w-fit py-2">
                                <div className="flex items-center">
                                    <label htmlFor="oldPrice" className="flex-1 ltr:mr-2 rtl:ml-2 mb-0 w-20 text-right">
                                        原单价
                                    </label>
                                    <Field type="number" name="oldPrice" className="form-input lg:w-[250px] w-2/3"/>
                                    {touched.oldPrice && errors.oldPrice ? <div className="text-danger mt-1">{errors.oldPrice}</div> : null}
                                </div>
                            </div>
                            <div className="lg:w-1/2 w-full lg:max-w-fit py-2">
                                <div className="flex items-center">
                                    <label htmlFor="price" className="flex-1 ltr:mr-2 rtl:ml-2 mb-0 w-20 text-right">
                                        单价
                                    </label>
                                    <Field type="number" name="price" className="form-input lg:w-[250px] w-2/3"/>
                                    {touched.price && errors.price ? <div className="text-danger mt-1">{errors.price}</div> : null}
                                </div>
                            </div>
                            <div className="lg:w-1/2 w-full lg:max-w-fit py-2">
                                <div className="flex items-center">
                                    <label htmlFor="quantity" className="flex-1 ltr:mr-2 rtl:ml-2 mb-0 w-20 text-right">
                                        库存
                                    </label>
                                    <Field type="number" name="quantity" className="form-input lg:w-[250px] w-2/3"/>
                                    {touched.quantity && errors.quantity ? <div className="text-danger mt-1">{errors.quantity}</div> : null}
                                </div>
                            </div>
                            <div className="lg:w-1/2 w-full lg:max-w-fit py-2">
                                <div className="flex items-center">
                                    <label htmlFor="classify" className="flex-1 ltr:mr-2 rtl:ml-2 mb-0 w-20 text-right">
                                        分类
                                    </label>
                                    <Field type="text" name="classify" className="form-input lg:w-[250px] w-2/3"/>
                                    {touched.classify && errors.classify ? <div className="text-danger mt-1">{errors.classify}</div> : null}
                                </div>
                            </div>
                            <div className="lg:w-[600px] w-full lg:max-w-fit py-2">
                                <div className="flex items-center">
                                    <label htmlFor="detail" className="flex-1 ltr:mr-2 rtl:ml-2 mb-0 w-20 text-right">
                                        详情
                                    </label>
                                    <Field type="text" name="detail" className="form-input lg:w-[250px] w-2/3" />
                                    {touched.detail && errors.detail ? <div className="text-danger mt-1">{errors.detail}</div> : null}
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="xl:w-96 w-full xl:mt-0 mt-6">
                        <div className="panel">
                            <div className="grid xl:grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
                                <button type="submit" className="btn btn-success w-full gap-2">
                                    {t('save')}
                                </button>
                                <button className="btn btn-warning w-full gap-2" onClick={(e) => {
                                        e.stopPropagation
                                        gotoGoodsListPage()
                                    }}>
                                    {t('cancel')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        )}
        </Formik>
    );
}

export default GoodsCompile