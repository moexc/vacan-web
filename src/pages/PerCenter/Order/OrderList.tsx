import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigStore';
import { useTranslation } from 'react-i18next';

import { useNavigate } from 'react-router-dom';
import { simpleCfm } from '../../../components/Toast';
import { Cell, CellNumber, CellStatus, CellTime } from '../../../components/DataTableCell';
import { ChatDotIconBtn, ConfirmIconBtn, DeleteIconBtn, DollarIconBtn, ExpandIconBtn, PushIconBtn } from '../../../components/IconBtn';
import AnimateHeight from 'react-animate-height';
import DateInput from '../../../components/DateInput';
import { Field, Form, Formik } from 'formik';
import { SearchCondit, acceptOrderApi, deleteOrderApi, deliverOrderApi, getOrderListApi } from '../../../config/api/order';

type SearchForm = {
    title: string
    status: string
    createTimeRange: string
}

const OrderList = () => {
    const initialValues: SearchForm = {
        title: '',
        status: '',
        createTimeRange: ''
    }
    const initSearchCondit: SearchCondit = {
        title: '',
        status: '',
        createTimeRangeBefore: '',
        createTimeRangeAfter: ''
    }
    const {t} = useTranslation()
    const navigate = useNavigate()
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('订单列表'));
    });
    const PAGE_SIZES = [10, 15, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [page, setPage] = useState(1);
    const [totalRecord, setTotalRecord] = useState(0);
    const [recordsData, setRecordsData] = useState([]);
    const [fetching, setFetching] = useState(false)
    const [searchViewOpen, setSearchViewOpen] = useState(false)
    const [searchCondit, setSearchCondit] = useState(initSearchCondit)

    useEffect(() => {
        getOrderList()
    }, [page, pageSize, searchCondit]);

    function getOrderList(){
        setFetching(true)
        getOrderListApi(searchCondit, page, pageSize, (data: any) => {
            setTotalRecord(data.total)
            setRecordsData(data.data)
            setFetching(false)
        })
    }

    const changePage = (page: number) => {
        setPage(page)
    }

    const changePageSize = (pageSize: number) => {
        setPage(1)
        setPageSize(pageSize)
    }

    const statusArr = [
        {code: '00', name: '未付款', cell: <CellStatus badge='warning'>未付款</CellStatus>},
        {code: '01', name: '已付款', cell: <CellStatus badge='info'>已付款</CellStatus>},
        {code: '02', name: '已发货', cell: <CellStatus badge='primary'>已发货</CellStatus>},
        {code: '03', name: '已收货', cell: <CellStatus badge='success'>已收货</CellStatus>},
        {code: '04', name: '已取消', cell: <CellStatus badge='danger'>已取消</CellStatus>},
        {code: '05', name: '超时取消', cell: <CellStatus badge='danger'>超时取消</CellStatus>},
    ]

    const autionChildren = (status: string, orderId: string) => {
        if(status === '00'){
            return <DollarIconBtn onClick={() => gotoPayPage(orderId)} />
        }else if(status === '01'){
            return <PushIconBtn onClick={() => deliverOrder(orderId)} tip='发货'/>
        }else if(status === '02'){
            return <ConfirmIconBtn onClick={() => acceptOrder(orderId)} tip='收货'/>
        }else if(status === '03'){
            return <Cell align='left'>
                <ChatDotIconBtn onClick={() => {}} tip='评价' /> 
                <DeleteIconBtn onClick={() => deleteOrder(orderId)} /> 
            </Cell>
        }else if(status === '04'){
            return <DeleteIconBtn onClick={() => deleteOrder(orderId)} />
        }else if(status === '05'){
            return <DeleteIconBtn onClick={() => deleteOrder(orderId)} />
        }
    }

    const gotoPayPage = (orderId: string) => {
        navigate(`/pay/${orderId}`)
    }

    const deliverOrder = (orderId: string) => {
        simpleCfm('确定发货吗？', () => deliverOrderApi(orderId, getOrderList))
    }

    const acceptOrder = (orderId: string) => {
        simpleCfm('确定收货吗？', () => acceptOrderApi(orderId, getOrderList))
    }

    const deleteOrder = (orderId: string) => {
        simpleCfm('确定删除吗？', () => deleteOrderApi(orderId, getOrderList))
    }


    const onChangeSearchCondit = (data: SearchForm) => {
        let createTimeRangeBefore = '', createTimeRangeAfter = ''
        if(data.createTimeRange){
            const timeRangeArr = data.createTimeRange.split(',')
            createTimeRangeBefore = timeRangeArr[0] + ' 00:00:00'
            createTimeRangeAfter = timeRangeArr[1] + ' 23:59:59'
        }
        setSearchCondit({...data, createTimeRangeBefore, createTimeRangeAfter})
    }

    return(
        <div>
            <div className="panel">
                <div className="mb-4.5 flex md:items-center md:flex-row flex-col gap-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">订单列表</h5>
                </div>
                
                <Formik
                initialValues={initialValues}
                onSubmit={ (data) => onChangeSearchCondit(data) }
                >
                {() => (
                    <Form>
                        <div className="border border-[#d3d3d3] rounded dark:border-[#1b2e4b] mb-4">
                            <div className={`p-4 w-full flex items-center`}>
                                <div className="w-full grid grid-cols-5 gap-6">
                                    <div className="flex flex-row items-center">
                                        <label htmlFor="title" className='search-label'>名称:</label>
                                        <Field id="title" name='title' type="text" className="form-input flex-1 ml-2" />
                                    </div>
                                    <div className="flex flex-row flex-grow items-center">
                                        <label htmlFor="status" className='search-label'>状态:</label>
                                        <Field as='select' id="status" name='status' className="form-select flex-1 ml-2">
                                            <option value=''></option>
                                            {statusArr.map(item => {
                                                return <option key={item.code} value={item.code}>{item.name}</option>
                                            })}
                                        </Field>
                                    </div>
                                    <div className="flex flex-row flex-grow items-center">
                                        <label className='search-label'>下单日期:</label>
                                        <DateInput 
                                        name='createTimeRange'
                                        range={true}
                                        options={{
                                            enableTime: false,
                                        }}
                                        className="flex-1 ml-2"
                                        />
                                    </div>
                                    
                                    <div className="flex flex-row flex-grow items-center">
                                        
                                    </div>
                                    <div className="flex flex-row flex-grow items-center">
                                        <button type="submit" className="btn btn-primary">
                                            {t('search')}
                                        </button>
                                        <ExpandIconBtn className='ml-auto' onClick={() => setSearchViewOpen(!searchViewOpen)} />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <AnimateHeight duration={300} height={searchViewOpen ? 'auto' : 0}>
                                    
                                </AnimateHeight>
                            </div>
                        </div>
                    </Form>
                )}
                
                </Formik>


                <div className="datatables">
                    <DataTable
                    noRecordsText="无数据"
                    highlightOnHover
                    className="whitespace-nowrap table-hover"
                    records={recordsData}
                    columns={[
                    { accessor: 'id', title: 'ID', hidden: true},
                    { accessor: 'photo', width: 80, title: '图片', textAlignment:'center', render: ({photo, title}) => <Cell><img src={photo} title={title} className='w-6'/></Cell>},
                    { accessor: 'title', title: '名称', textAlignment: 'center', render: ({title}) => <Cell align='left' className='ml-4'>{title}</Cell> },
                    { accessor: 'price', title: '单价', width: 100, textAlignment: 'right', render: ({ price }) => <CellNumber>{price}</CellNumber>},
                    { accessor: 'quantity', title: '数量', width: 60, textAlignment: 'right', render: ({ quantity }) => <CellNumber fixed={0}>{quantity}</CellNumber>},
                    { accessor: 'amount', title: '金额', width: 100, textAlignment: 'right', render: ({amount}) => <CellNumber>{amount}</CellNumber>},
                    { accessor: 'address', title: '收货地址', width: 300, render: ({address}) => <Cell align='left'>{address}</Cell>},
                    { accessor: 'createTime', title: '下单时间', width: 200, textAlignment: 'center', render: ({ createTime}) => <CellTime>{createTime}</CellTime>},
                    { accessor: 'status', title: '状态', width: 130, textAlignment: 'center', render: ({ status}) => statusArr.filter(s => s.code === status)[0].cell},
                    { accessor: 'aution', title: '操作', width: 130, textAlignment: 'center', render: ({status, id}) => autionChildren(status, id)},
                    ]}
                    idAccessor="id"
                    fetching={fetching}
                    totalRecords={totalRecord}
                    recordsPerPage={pageSize}
                    page={page}
                    onPageChange={(p) => changePage(p)}
                    recordsPerPageOptions={PAGE_SIZES}
                    onRecordsPerPageChange={changePageSize}
                    minHeight={200}
                    paginationText={({ from, to, totalRecords }) => `共${totalRecords}条, 当前${from}-${to}条`}
                    />
                </div>
            </div>
        </div>
    )
}

export default OrderList