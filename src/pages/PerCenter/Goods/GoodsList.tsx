import { DataTable } from 'mantine-datatable';
import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigStore';
import { useTranslation } from 'react-i18next';

import { getGoodsApi } from '../../../config/api/shop';
import { useNavigate } from 'react-router-dom';
import { simpleCfm } from '../../../components/Toast';
import {parse} from '../../../util/time'

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
    const canUp = ['00', '02', '04']

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

    const editGoods = (goodsId: string) => {
        navigate('/goods/edit', {state: {goodsId}})
    }

    const UpBtn: FC<{id: string}> = ({id}) => <button type="button" className="btn btn-sm btn-primary">上架</button>
    const DownBtn: FC<{id: string}> = ({id}) => <button type="button" className="btn btn-sm btn-warning">下架</button>
    const ModfiyBtn: FC<{id: string}> = ({id}) => <button type="button" className="btn btn-sm btn-info" onClick={() => editGoods(id)}>修改</button>

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
                            { accessor: 'origPrice', width:120, title: '原单价'},
                            { accessor: 'price', width:120, title: '单价'},
                            { accessor: 'quantity', width:120, title: '库存'},
                            { accessor: 'createTime', width: 180, title: '创建时间', render: ({createTime}) => {
                                return parse(createTime)
                            }},
                            { accessor: 'status', width:120, title: '状态', render: ({status}) => {
                                if (status === '00'){
                                    return <span className="badge badge-outline-info">待审核</span>
                                }else if (status === '01'){
                                    return <span className="badge badge-outline-danger">审核不通过</span>
                                }else if (status === '02'){
                                    return <span className="badge badge-outline-primary">审核通过</span>
                                }else if (status === '03'){
                                    return <span className="badge badge-outline-success">已上架</span>
                                }else if (status === '04'){
                                    return <span className="badge badge-outline-warning">已下架</span>
                                }
                            }},
                            { accessor: 'aution', width: 150, title: '操作',
                                render: ({ status, id }) => {
                                    if (canUp.includes(status)){
                                        return (
                                            <div className='flex flex-wrap gap-2'>
                                                <UpBtn id={id} />
                                                <ModfiyBtn id={id} />
                                            </div>
                                        )
                                    }else if (status === '01'){
                                        return (
                                            <div className='flex flex-wrap gap-2'>
                                                <ModfiyBtn id={id} />
                                            </div>
                                        )
                                    }else if (status === '03'){
                                        return (
                                            <div className='flex flex-wrap gap-2'>
                                                <DownBtn id={id} />
                                            </div>
                                        )
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