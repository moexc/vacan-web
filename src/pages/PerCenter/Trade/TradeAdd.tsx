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
import { createTrade } from '../../../config/api/trade';
import * as Yup from 'yup'

const TradeAdd = () => {
    const navigate = useNavigate()
    useEffect(() => {
        
    });

    const defaultItem = {
        name: null,
        price: null,
        addprice: null,
        countdown: null,
        delay: null,
    }

    const [trade, setTrade] = useState({'name': '', 'time': ''});

    const [items, setItems] = useState<any>([
        {...defaultItem, id: 1},
    ]);

    const addItem = () => {
        let maxId = 0;
        maxId = items?.length ? items.reduce((max: number, character: any) => (character.id > max ? character.id : max), items[0].id) : 0;

        setItems([...items, { id: maxId + 1, ...defaultItem }]);
    };

    const removeItem = (item: any = null) => {
        setItems(items.filter((d: any) => d.id !== item.id));
    };

    const changeItemField = (type: string, value: string, id: number) => {
        const list = items;
        const item = list.find((d: any) => d.id === id);
        item[type] = value
        setItems([...list]);
    };

    const tradeSchema = Yup.object().shape({
        tradeName : Yup.string().required('名称必填'),
        startTime: Yup.string().required('开始时间必填'),
        bids: Yup.array().min(1, '至少一个标的')
    })

    const saveTrade = () => {
        const bids : any = []
        items.map((item: any) => {
            bids.push({
                'name': item.name,
                'countDown': item.countdown,
                'resetCd': item.delay,
                'startPrice': item.price,
                'bidPrice': item.addprice
            })
        })
        const postData = {
            'tradeName': trade.name,
            'startTime': trade.time,
            bids: bids
        }

        tradeSchema.validate(postData, {abortEarly: false}).then(() => {
            console.log("校验通过");
            
        }).catch(error => {
            console.log(error.errors);
            
        })
        
        // createTrade(postData, createTraded)
    }

    const createTraded = () => {
        navigate('/trade')
    }

    const changeTime = (date : Date[]) => {        
        setTrade({...trade, time: (date.length > 0 ? parseDate(date[0]) : '') })
    }

    return (
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
                            <label htmlFor="number" className="flex-1 ltr:mr-2 rtl:ml-2 mb-0">
                                Invoice Number
                            </label>
                            <input id="number" type="text" name="inv-num" className="form-input lg:w-[250px] w-2/3" 
                            placeholder="专场名称" onChange={(e) => setTrade({...trade, name: e.target.value})}/>
                        </div>
                        <div className="flex items-center mt-4">
                            <label htmlFor="dueDate" className="flex-1 ltr:mr-2 rtl:ml-2 mb-0">
                                Due Date
                            </label>
                            <DateInput
                            options={{
                                minDate: new Date(),
                            }}
                            className='lg:w-[250px] w-2/3'
                            onChange={changeTime}
                            />
                        </div>
                    </div>
                </div>
                <hr className="border-white-light dark:border-[#1b2e4b] my-6" />
                <div className="mt-8">
                    <div className="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th>名称</th>
                                    <th className="w-1">底价（元）</th>
                                    <th className="w-1">每次加价（元）</th>
                                    <th className="w-1">倒计时（秒）</th>
                                    <th className="w-1">出价延时（秒）</th>
                                    <th className="w-1"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.length <= 0 && (
                                    <tr>
                                        <td colSpan={6} className="!text-center font-semibold">
                                            No Item Available
                                        </td>
                                    </tr>
                                )}
                                {items.map((item: any) => {
                                    return (
                                        <tr className="align-top" key={item.id}>
                                            <td>
                                                <input type="text" className="form-input min-w-[200px]" placeholder="Enter Item Name" 
                                                onChange={(e) => changeItemField('name', e.target.value, item.id)} />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    className="form-input w-32"
                                                    placeholder="Quantity"
                                                    min={0}
                                                    defaultValue={item.quantity}
                                                    onChange={(e) => changeItemField('price', e.target.value, item.id)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    className="form-input w-32"
                                                    placeholder="Price"
                                                    min={0}
                                                    defaultValue={item.amount}
                                                    onChange={(e) => changeItemField('addprice', e.target.value, item.id)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    className="form-input w-32"
                                                    placeholder="Price"
                                                    min={0}
                                                    defaultValue={item.amount}
                                                    onChange={(e) => changeItemField('countdown', e.target.value, item.id)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    className="form-input w-32"
                                                    placeholder="Price"
                                                    min={0}
                                                    defaultValue={item.amount}
                                                    onChange={(e) => changeItemField('delay', e.target.value, item.id)}
                                                />
                                            </td>
                                            <td>
                                                <button type="button" onClick={() => removeItem(item)}>
                                                    <IconX className="w-5 h-5 mt-2.5" />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-between sm:flex-row flex-col mt-6 px-4">
                        <div className="sm:mb-0 mb-6">
                            <button type="button" className="btn btn-primary" onClick={() => addItem()}>
                                Add Item
                            </button>
                        </div>
                        <div className="sm:w-1/5">
                            <div className="flex items-center justify-between mt-4 font-semibold">
                                <div>bid_count</div>
                                <div>{items.length}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="xl:w-96 w-full xl:mt-0 mt-6">
                <div className="panel">
                    <div className="grid xl:grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-4">
                        <button type="button" className="btn btn-success w-full gap-2" onClick={saveTrade}>
                            <IconSave className="ltr:mr-2 rtl:ml-2 shrink-0" />
                            Save
                        </button>

                        <button type="button" className="btn btn-info w-full gap-2">
                            <IconSend className="ltr:mr-2 rtl:ml-2 shrink-0" />
                            Send Invoice
                        </button>

                        <Link to="/apps/invoice/preview" className="btn btn-primary w-full gap-2">
                            <IconEye className="ltr:mr-2 rtl:ml-2 shrink-0" />
                            Preview
                        </Link>

                        <button type="button" className="btn btn-secondary w-full gap-2">
                            <IconDownload className="ltr:mr-2 rtl:ml-2 shrink-0" />
                            Download
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TradeAdd;
