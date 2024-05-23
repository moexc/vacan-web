import { DataTable } from 'mantine-datatable';
import { ReactNode, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigStore';
import { useTranslation } from 'react-i18next';

import { SearchCondit, deleteTradeApi, getTradesApi, sendEngine } from '../../../config/api/trade';
import { useNavigate } from 'react-router-dom';
import { simpleCfm } from '../../../components/Toast';
import { Cell, CellStatus, CellTime } from '../../../components/DataTableCell';
import { DeleteIconBtn, EditIconBtn, ExpandIconBtn, PushIconBtn } from '../../../components/IconBtn';
import AnimateHeight from 'react-animate-height';
import DateInput from '../../../components/DateInput';
import { Field, Form, Formik } from 'formik';

type SearchForm = {
    tradeName: string
    timeRange: string
    tradeStatus: string
    sendStatus: string
}

const Trade = () => {
    const initialValues: SearchForm = {
        tradeName: '',
        timeRange: '',
        tradeStatus: '',
        sendStatus: ''
    }
    const initSearchCondit: SearchCondit = {
        tradeName: '',
        timeRangeBefore: '',
        timeRangeAfter: '',
        tradeStatus: '',
        sendStatus: ''
    }
    const {t} = useTranslation()
    const navigate = useNavigate()
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle(t('page_trade')));
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
        reqTradeNotice()
    }, [page, pageSize, searchCondit]);

    function reqTradeNotice(){
        setFetching(true)
        getTradesApi(searchCondit, page, pageSize, (data: any) => {
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

    const sendTrade = (id: string) => {
        sendEngine(id, reqTradeNotice)
    }

    const toTradeAddPage = () => {
        navigate('/trade/add')
    }

    const deleteTrade = (tradeId: string) => {
        simpleCfm('确认删除吗？', () => deleteTradeApi(tradeId, reqTradeNotice))
    }

    const editTrade = (tradeId: string) => {
        navigate('/trade/edit', {state: {tradeId}})
    }

    const statusArr = [
        {code: '0', name: '未启动', cell: <CellStatus badge='info'>未启动</CellStatus>},
        {code: '1', name: '运行中', cell: <CellStatus badge='primary'>运行中</CellStatus>},
        {code: '2', name: '已结束', cell: <CellStatus badge='success'>已结束</CellStatus>},
    ]

    const sendStatusArr = [
        {code: '0', name: '未发送', cell: <CellStatus badge='info'>未发送</CellStatus>},
        {code: '1', name: '成功', cell: <CellStatus badge='success'>成功</CellStatus>},
        {code: '2', name: '失败', cell: <CellStatus badge='warning'>失败</CellStatus>},
    ]

    const autionChildren = (sendStatus: string, id: string) => {
        if(sendStatus !== '1'){
            return (
                <Cell align='left'>
                    <PushIconBtn onClick={() => sendTrade(id)}/>
                    <EditIconBtn onClick={() => editTrade(id)}/>
                    <DeleteIconBtn onClick={() => deleteTrade(id)}/>
                </Cell>
            )
        }else{
            return ''
        }
    }

    const onChangeSearchCondit = (data: SearchForm) => {
        let timeRangeBefore = '', timeRangeAfter = ''
        if(data.timeRange){
            const timeRangeArr = data.timeRange.split(',')
            timeRangeBefore = timeRangeArr[0] + ' 00:00:00'
            timeRangeAfter = timeRangeArr[1] + ' 23:59:59'
        }
        setSearchCondit({...data, timeRangeBefore, timeRangeAfter})
    }

    return(
        <div>
            <div className="panel">
                <div className="mb-4.5 flex md:items-center md:flex-row flex-col gap-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">专场列表</h5>
                    <div className="ltr:ml-auto rtl:mr-auto">
                        <button type="button" className="btn btn-primary" onClick={toTradeAddPage}>{t('add')}</button>
                    </div>
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
                                        <label htmlFor="tradeName">专场名称:</label>
                                        <Field id="tradeName" name='tradeName' type="text" className="form-input flex-1 ml-2" />
                                    </div>
                                    <div className="flex flex-row flex-grow items-center">
                                        <label htmlFor="tradeStatus">开始日期:</label>
                                        <DateInput 
                                        name='timeRange'
                                        range={true}
                                        options={{
                                            enableTime: false,
                                        }}
                                        className="flex-1 ml-2"
                                        />
                                    </div>
                                    <div className="flex flex-row flex-grow items-center">
                                        <label htmlFor="tradeStatus">专场状态:</label>
                                        <Field as='select' id="tradeStatus" name='tradeStatus' className="form-select flex-1 ml-2">
                                            <option value=''></option>
                                            {statusArr.map(item => {
                                                return <option key={item.code} value={item.code}>{item.name}</option>
                                            })}
                                        </Field>
                                    </div>
                                    <div className="flex flex-row flex-grow items-center">
                                        <label htmlFor="sendStatus">发送引擎状态:</label>
                                        <Field as='select' id="sendStatus" name='sendStatus' className="form-select flex-1 ml-2">
                                            <option value=''></option>
                                            {sendStatusArr.map(item => {
                                                return <option key={item.code} value={item.code}>{item.name}</option>
                                            })}
                                        </Field>
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
                    { accessor: 'name', title: t('trade_name'), textAlignment: 'center', render: ({name}) => <Cell align='left' className='ml-4'>{name}</Cell> },
                    { accessor: 'startTime', title: t('start_time'), width: 200, textAlignment: 'center', render: ({ startTime }) => <CellTime>{startTime}</CellTime>},
                    { accessor: 'endTime', title: '结束时间', width: 200, textAlignment: 'center', render: ({ endTime }) => <CellTime>{endTime}</CellTime>},
                    { accessor: 'status', title: '专场状态', width: 100, textAlignment: 'center', render: ({status}) => statusArr.filter((item) => item.code === status)[0].cell},
                    { accessor: 'sendStatus', title: '发送引擎状态', width: 120, textAlignment: 'center', render: ({sendStatus}) => sendStatusArr.filter((item) => item.code === sendStatus)[0].cell},
                    { accessor: 'aution', title: '操作', width: 130, render: ({ sendStatus, id }) => autionChildren(sendStatus, id)},
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

export default Trade