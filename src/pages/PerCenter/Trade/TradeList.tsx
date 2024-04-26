import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigStore';
import { useTranslation } from 'react-i18next';

import { deleteTradeApi, getTradesApi } from '../../../config/api/trade';
import {parse} from '../../../util/time'
import { useNavigate } from 'react-router-dom';

const Trade = () => {
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

    useEffect(() => {
        reqTradeNotice()
    }, []);

    function reqTradeNotice(){
        setFetching(true)
        getTradesApi({}, page, pageSize, (data: any) => {
            setTotalRecord(data.total)
            setRecordsData(data.data)
            setFetching(false)
        })
    }

    const changePage = (page: number) => {
        setPage(page)
        reqTradeNotice()
    }

    const changePageSize = (pageSize: number) => {
        setPage(1)
        setPageSize(pageSize)
        reqTradeNotice()
    }

    const send = async (id: string) => {
        console.log('send', id);
    }

    const toTradeAddPage = () => {
        navigate('/trade/add')
    }

    const deleteTrade = (tradeId: string) => {
        deleteTradeApi(tradeId, reqTradeNotice)
    }

    return(
        <div>
            <div className="panel">
                <h5 className="font-semibold text-lg dark:text-white-light mb-5">专场列表</h5>
                <div className="mb-4.5 flex md:items-center md:flex-row flex-col gap-5">
                    <div className="ltr:ml-auto rtl:mr-auto">
                        <button type="button" className="btn btn-primary" onClick={toTradeAddPage}>添加</button>
                    </div>
                </div>
                <div className="datatables">
                    <DataTable
                        noRecordsText="无数据"
                        highlightOnHover
                        className="whitespace-nowrap table-hover"
                        records={recordsData}
                        columns={[
                            { accessor: 'id', title: 'ID'},
                            { accessor: 'name', title: '专场名称'},
                            { accessor: 'startTime', title: '开始时间',
                                render: ({ startTime }) => startTime ? parse(startTime) : '',
                            },
                            { accessor: 'endTime', title: '结束时间',
                                render: ({ endTime }) => endTime ? parse(endTime) : '',
                            },
                            { accessor: 'status', title: '专场状态'},
                            { accessor: 'sendStatus', title: '发送引擎状态'},
                            { accessor: 'aution', title: '操作',
                                render: ({ sendStatus, id }) => {
                                    if(sendStatus !== '成功'){
                                        return (
                                            <div className='flex flex-wrap items-center justify-center gap-2'>
                                                <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => send(id)}>发送</button>
                                                <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => deleteTrade(id)}>删除</button>
                                            </div>
                                        )
                                    }else{
                                        return ''
                                    }
                                },
                            },
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