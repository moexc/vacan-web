import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigStore';
import { useTranslation } from 'react-i18next';

import { getGoodsApi } from '../../../config/api/shop';
import { useNavigate } from 'react-router-dom';
import { simpleCfm } from '../../../components/Toast';

const Goods = () => {
    const {t} = useTranslation()
    const navigate = useNavigate()
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle(t('page_goods')));
    });
    const PAGE_SIZES = [10, 15, 30, 50, 100];
    const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
    const [page, setPage] = useState(1);
    const [totalRecord, setTotalRecord] = useState(0);
    const [recordsData, setRecordsData] = useState([]);
    const [fetching, setFetching] = useState(false)

    useEffect(() => {
        reqGoods()
    }, [page, pageSize]);

    function reqGoods(){
        setFetching(true)
        getGoodsApi({}, page, pageSize, (data: any) => {
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

    const toGoodsAddPage = () => {
        navigate('/goods/add')
    }

    const deleteGoods = (tradeId: string) => {
        simpleCfm('确认删除吗？', () => {})
    }

    const editGoods = (tradeId: string) => {
        navigate('/goods/edit', {state: {tradeId}})
    }

    return(
        <div>
            <div className="panel">
                <div className="mb-4.5 flex md:items-center md:flex-row flex-col gap-5">
                <h5 className="font-semibold text-lg dark:text-white-light">商品列表</h5>
                    <div className="ltr:ml-auto rtl:mr-auto">
                        <button type="button" className="btn btn-primary" onClick={toGoodsAddPage}>添加</button>
                    </div>
                </div>
                <div className="datatables">
                    <DataTable
                        noRecordsText="无数据"
                        highlightOnHover
                        className="whitespace-nowrap table-hover"
                        records={recordsData}
                        columns={[
                            { accessor: 'id', title: 'ID', hidden: true},
                            { accessor: 'photo', width: 80, title: '图片', render: ({photo, title}) => {
                                return <img src={photo} title={title} className='w-6'/>
                            }},
                            { accessor: 'title', title: '名称'},
                            { accessor: 'origPrice', title: '原单价'},
                            { accessor: 'price', title: '单价'},
                            { accessor: 'quantity', title: '库存'},
                            { accessor: 'status', title: '状态', render: ({status}) => {
                                if (status === '00'){
                                    return '待审核'
                                }else if (status === '01'){
                                    return '审核不通过'
                                }else if (status === '02'){
                                    return '审核通过'
                                }else if (status === '03'){
                                    return '已上架'
                                }else if (status === '04'){
                                    return '已下架'
                                }
                            }},
                            { accessor: 'aution', title: '操作',
                                render: ({ status, id }) => {
                                    if (status === '00'){
                                        return '审核'
                                    }else if (status === '01'){
                                        return '删除'
                                    }else if (status === '02'){
                                        return '上架'
                                    }else if (status === '03'){
                                        return '下架'
                                    }else if (status === '04'){
                                        return '重新上架'
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

export default Goods