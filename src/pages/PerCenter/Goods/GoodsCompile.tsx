import { Field, Form, Formik, FormikErrors } from "formik";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from 'yup'
import { Goods, createGoodsApi, getGoodsDetailApi, updateGoodsApi } from "../../../config/api/shop";
import Loading from "../../../components/Loading";
import QuillEdit from "../../../components/QuillEdit/QuillEdit";
import FileUpload, { Document } from "../../../components/FileUpload";

type GoodsForm = {
    title: string,
    photo: Document[],
    subdescr: string,
    detail: string,
    oldPrice: number,
    price: number,
    quantity: number,
    classify: string,
}

const GoodsCompile = () => {
    const {t} = useTranslation()
    const navigate = useNavigate()
    const location = useLocation()
    const goodsId = location.state && location.state.goodsId
    const [loaded, setLoaded] = useState(false)

    const [initialValues, setInitialValues] = useState<GoodsForm>({
        title: '',
        photo: [],
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
        if(!goodsId) setLoaded(true)
        else getGoodsDetailApi(goodsId, (data: any) => {
            setInitialValues({...data, photo: [{
                id: new Date().getTime(),
                name: data.photo.split('/').pop(),
                url: data.photo,
                status: 'done'
            }]})
            setLoaded(true)
        })
    }

    const required = t('required')
    const integer = t('integer')
    const min = t('min')

    const checkSchema = Yup.object().shape({
        title: Yup.string().required(required),
        photo: Yup.array().of(
            Yup.object().shape({
                url: Yup.string().nullable().required(required),
            })
        ).min(1, required),
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

    const saveGoods = (data: GoodsForm) => {
        const goods: Goods = {...data, photo: data.photo[0].url || ''}
        goodsId ? updateGoodsApi(goods, goodsId, gotoGoodsListPage) : createGoodsApi(goods, gotoGoodsListPage)
    }

    return (
        !loaded ? <Loading height={600}/> :
        <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={checkSchema}
        onSubmit={saveGoods}
        handleChange={(e: any) => console.log("handleChange", e)}
        > 

        {({ values, errors, submitCount, touched }) => (
            <Form>
                <div className="panel px-0 py-6">
                    <div className="grid grid-cols-4 gap-4">
                        <div className="row-span-2 flex items-center">
                            <label htmlFor="photo" className="mr-2 w-20 text-right">
                                图片
                            </label>
                            <Field name="photo">
                            {({field, form: { touched, errors, setFieldValue }, meta }: any) => (
                                <FileUpload
                                name={field.name}
                                values={meta.value}
                                type="img"
                                width="w-[250px]"
                                maxFileCount={1}
                                maxFileSize={1024 * 1024}
                                acceptType={['jpg', 'png', 'jpeg']}
                                onChange={docs => setFieldValue(field.name, docs)}
                                />
                            )}
                            </Field>
                            {errors.photo ? 
                            <div className="text-danger mt-1">
                                {errors.photo instanceof Array ? (errors.photo as FormikErrors<Document>[])[0].url 
                                : errors.photo }
                            </div> 
                            : null}
                        </div>
                        <div className="col-span-3 flex items-center">
                            <label htmlFor="title" className="mr-2 w-20 text-right">
                                名称
                            </label>
                            <Field type="text" name="title" className="form-input lg:w-[250px] w-2/3"/>
                            {touched.title && errors.title ? <div className="text-danger mt-1">{errors.title}</div> : null}
                        </div>
                        <div className="col-span-3 flex items-center">
                            <label htmlFor="subdescr" className="mr-2 w-20 text-right">
                                简介
                            </label>
                            <Field type="text" name="subdescr" className="form-input lg:w-[250px] w-2/3"/>
                            {touched.subdescr && errors.subdescr ? <div className="text-danger mt-1">{errors.subdescr}</div> : null}
                        </div>
                        <div className="flex items-center">
                            <label htmlFor="oldPrice" className="mr-2 w-20 text-right">
                                原单价
                            </label>
                            <Field type="number" name="oldPrice" className="form-input lg:w-[250px] w-2/3"/>
                            {touched.oldPrice && errors.oldPrice ? <div className="text-danger mt-1">{errors.oldPrice}</div> : null}
                        </div>
                        <div className="col-span-3 flex items-center">
                            <label htmlFor="price" className="mr-2 w-20 text-right">
                                单价
                            </label>
                            <Field type="number" name="price" className="form-input lg:w-[250px] w-2/3"/>
                            {touched.price && errors.price ? <div className="text-danger mt-1">{errors.price}</div> : null}
                        </div>
                        <div className="flex items-center">
                            <label htmlFor="quantity" className="mr-2 w-20 text-right">
                                库存
                            </label>
                            <Field type="number" name="quantity" className="form-input lg:w-[250px] w-2/3"/>
                            {touched.quantity && errors.quantity ? <div className="text-danger mt-1">{errors.quantity}</div> : null}
                        </div>
                        <div className="col-span-3 flex items-center">
                            <label htmlFor="classify" className="mr-2 w-20 text-right">
                                分类
                            </label>
                            <Field type="text" name="classify" className="form-input lg:w-[250px] w-2/3"/>
                            {touched.classify && errors.classify ? <div className="text-danger mt-1">{errors.classify}</div> : null}
                        </div>
                        <div className="col-span-4 flex">
                            <label htmlFor="detail" className="mr-2 w-20 text-right">
                                详情
                            </label>
                            <Field name="detail">
                            {({field, form: { touched, errors, setFieldValue }, meta }: any) => (
                                <QuillEdit
                                value={meta.value}
                                onChange={docs => setFieldValue(field.name, docs)}
                                />
                            )}
                            </Field>
                            {touched.detail && errors.detail ? <div className="text-danger mt-1">{errors.detail}</div> : null}
                        </div>
                        <div className="col-span-4 flex">
                            <label className="mr-2 w-20 text-right"></label>
                            <div className="mt-10 flex items-center justify-center gap-10">
                                <button type="submit" className="btn btn-success">
                                    {t('save')}
                                </button>
                                <button className="btn btn-warning" onClick={(e) => {
                                        e.stopPropagation()
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