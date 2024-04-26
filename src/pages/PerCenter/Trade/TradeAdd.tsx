import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import DateInput from '../../../components/DateInput';
import IconX from '../../../components/Icon/IconX';
import IconDownload from '../../../components/Icon/IconDownload';
import IconEye from '../../../components/Icon/IconEye';
import IconSend from '../../../components/Icon/IconSend';
import IconSave from '../../../components/Icon/IconSave';
import {parseDate} from '../../../util/time'
import { createTradeApi } from '../../../config/api/trade';
import * as Yup from 'yup'
import { Field, FieldArray, Form, Formik } from 'formik';
import { useTranslation } from 'react-i18next';

const TradeAdd = () => {
    const {t} = useTranslation()
    const navigate = useNavigate()
    useEffect(() => {
        
    });

    const defaultItem = {
        name: '',
        startPrice: 10,
        bidPrice: 10,
        countDown: 60,
        resetCd: 30,
    }

    const required = t('required')
    const integer = t('integer')
    const min = t('min')

    const tradeSchema = Yup.object().shape({
        tradeName : Yup.string().required(required),
        startTime: Yup.string().required(required),
        bids: Yup.array().of(
            Yup.object().shape({
                name: Yup.string().nullable().required(required),
                startPrice: Yup.number().nullable().required(required).integer(integer).min(1, `${min}1`),
                bidPrice: Yup.number().nullable().required(required).integer(integer).min(1, `${min}1`),
                countDown: Yup.number().nullable().required(required).integer(integer).min(1, `${min}1`),
                resetCd: Yup.number().nullable().required(required).integer(integer).min(1, `${min}1`),
            })
        ).min(1, '至少一个标的')
    })

    const saveTrade = (data: any) => {
        createTradeApi(data, createTraded)
    }

    const createTraded = () => {
        navigate('/trade')
    }

    return (
        <Formik
        initialValues={{
            tradeName: '',
            startTime: '',
            bids: [defaultItem],
        }}
        validationSchema={tradeSchema}
        onSubmit={ data => saveTrade(data) }
        >

        {({ values, errors, submitCount, touched }) => (
            <Form>
                <div className="flex xl:flex-row flex-col gap-2.5">
                    <div className="panel px-0 flex-1 py-6 ltr:xl:mr-6 rtl:xl:ml-6">
                        <div className="flex justify-between flex-wrap px-4">
                            <div className="mb-6 lg:w-1/2 w-full">
                                <div className="flex items-center text-black dark:text-white shrink-0">
                                    <img src="/assets/images/logo.svg" alt="img" className="w-14" />
                                </div>
                            </div>
                            <div className="lg:w-1/2 w-full lg:max-w-fit">
                                <div className="flex items-center">
                                    <label htmlFor="tradeName" className="flex-1 ltr:mr-2 rtl:ml-2 mb-0">
                                        {t('trade_name')}
                                    </label>
                                    <Field type="text" name="tradeName" className="form-input lg:w-[250px] w-2/3"/>
                                </div>
                                {touched.tradeName && errors.tradeName ? <div className="text-danger mt-1">{errors.tradeName}</div> : null}
                                <div className="flex items-center mt-4">
                                    <label htmlFor="dueDate" className="flex-1 ltr:mr-2 rtl:ml-2 mb-0">
                                        {t('start_time')}
                                    </label>
                                    <DateInput
                                    name='startTime'
                                    options={{
                                        minDate: new Date(),
                                    }}
                                    className='lg:w-[250px] w-2/3'
                                    />
                                </div>
                                {touched.startTime && errors.startTime ? <div className="text-danger mt-1">{errors.startTime}</div> : null}
                            </div>
                        </div>
                        <hr className="border-white-light dark:border-[#1b2e4b] my-6" />
                        
                        <FieldArray
                        name='bids'
                        render={({insert, remove, push}) => (
                            <div className="mt-8">
                                <div className="table-responsive">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>{t('bid_name')}</th>
                                                <th className="w-1">{t('start_price')}</th>
                                                <th className="w-1">{t('bid_price')}</th>
                                                <th className="w-1">{t('count_down')}</th>
                                                <th className="w-1">{t('reset_cd')}</th>
                                                <th className="w-1"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {values.bids.length > 0 && values.bids.map((bid, index) => 
                                                <tr className="align-top" key={index}>
                                                    <td>
                                                        <Field name={`bids.${index}.name`} type="text" className="form-input min-w-[200px]"/>
                                                        {touched.bids && touched.bids[index] && touched.bids[index].name 
                                                        && errors.bids && errors.bids[index] && errors.bids[index].name ? 
                                                        <div className="text-danger mt-1">{errors.bids[index].name}</div> : null}
                                                    </td>
                                                    <td>
                                                        <Field name={`bids.${index}.startPrice`} type="number" className="form-input w-32" min={1}/>
                                                        {touched.bids && touched.bids[index] && touched.bids[index].startPrice 
                                                        && errors.bids && errors.bids[index] && errors.bids[index].startPrice ? 
                                                        <div className="text-danger mt-1">{errors.bids[index].startPrice}</div> : null}
                                                    </td>
                                                    <td>
                                                        <Field name={`bids.${index}.bidPrice`} type="number" className="form-input w-32" min={1}/>
                                                        {touched.bids && touched.bids[index] && touched.bids[index].bidPrice 
                                                        && errors.bids && errors.bids[index] && errors.bids[index].bidPrice ? 
                                                        <div className="text-danger mt-1">{errors.bids[index].bidPrice}</div> : null}
                                                    </td>
                                                    <td>
                                                        <Field name={`bids.${index}.countDown`} type="number" className="form-input w-32" min={1} />
                                                        {touched.bids && touched.bids[index] && touched.bids[index].countDown 
                                                        && errors.bids && errors.bids[index] && errors.bids[index].countDown ? 
                                                        <div className="text-danger mt-1">{errors.bids[index].countDown}</div> : null}
                                                    </td>
                                                    <td>
                                                        <Field name={`bids.${index}.resetCd`} type="number" className="form-input w-32" min={1} />
                                                        {touched.bids && touched.bids[index] && touched.bids[index].resetCd 
                                                        && errors.bids && errors.bids[index] && errors.bids[index].resetCd ? 
                                                        <div className="text-danger mt-1">{errors.bids[index].resetCd}</div> : null}
                                                    </td>
                                                    <td>
                                                        <button type="button" onClick={() => remove(index)}>
                                                            <IconX className="w-5 h-5 mt-2.5" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            )}
                                            {values.bids.length <= 0 && (
                                                <tr>
                                                    <td colSpan={6} className="!text-center font-semibold">
                                                        No Item Available
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                    </div>
                                    <div className="flex justify-between sm:flex-row flex-col mt-6 px-4">
                                        <div className="sm:mb-0 mb-6">
                                            <button type="button" className="btn btn-primary" onClick={() => push(defaultItem)}>
                                                {t('add_bid')}
                                            </button>
                                        </div>
                                        <div className="sm:w-1/6">
                                            <div className="flex items-center justify-between mt-4 font-semibold">
                                                <div>{t('bid_count')}</div>
                                                <div className='text-blue-500'>{values.bids.length}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        )}
                        />
                    </div>
                    <div className="xl:w-96 w-full xl:mt-0 mt-6">
                        <div className="panel">
                            <div className="grid xl:grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
                                <button type="submit" className="btn btn-success w-full gap-2">
                                    <IconSave className="ltr:mr-2 rtl:ml-2 shrink-0" />
                                    {t('save')}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Form>
        )}
        </Formik>
    );
};

export default TradeAdd;
