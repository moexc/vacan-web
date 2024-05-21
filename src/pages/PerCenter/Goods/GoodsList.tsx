import { DataTable } from 'mantine-datatable';
import { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../../store/themeConfigStore';
import { useTranslation } from 'react-i18next';

import { getGoodsApi, updateStatusApi } from '../../../config/api/shop';
import { useNavigate } from 'react-router-dom';
import { simpleCfm } from '../../../components/Toast';
import { Cell, CellMoney, CellNumber, CellStatus, CellTime } from '../../../components/DataTableCell';
import { DeleteIconBtn, EditIconBtn, OffShelfIconBtn, ShelveIconBtn } from '../../../components/IconBtn';

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

    const deleteGoods = (id: string) => {
        simpleCfm('确认删除吗？', () => updateStatusApi(id, '05', reqGoods))
    }

    const editGoods = (goodsId: string) => {
        navigate('/goods/edit', {state: {goodsId}})
    }

    const updateGoogsStatus = (id: string, status: string) => {
        updateStatusApi(id, status, reqGoods)
    }

    const UpBtn: FC<{id: string}> = ({id}) => <ShelveIconBtn onClick={() => updateGoogsStatus(id, "03")}/>
    const DownBtn: FC<{id: string}> = ({id}) => <OffShelfIconBtn onClick={() => updateGoogsStatus(id, "04")} />
    const ModfiyBtn: FC<{id: string}> = ({id}) => <EditIconBtn onClick={() => editGoods(id)}/>
    const DeleteBtn: FC<{id: string}> = ({id}) => <DeleteIconBtn onClick={()=> deleteGoods(id)}/>

    const statusChildren = (status: string) => {
        if (status === '00') return <CellStatus badge='info'>待审核</CellStatus>
        else if (status === '01') return <CellStatus badge='danger'>审核不通过</CellStatus>
        else if (status === '02') return <CellStatus badge='primary'>审核通过</CellStatus>
        else if (status === '03') return <CellStatus badge='success'>已上架</CellStatus>
        else if (status === '04') return <CellStatus badge='warning'>已下架</CellStatus>
    }

    const autionChildren = (status: string, id: string) => {
        if (status === '00') return <Cell align='left'><UpBtn id={id} /><ModfiyBtn id={id} /><DeleteBtn id={id} /></Cell>
        else if (status === '01') return <Cell align='left'><ModfiyBtn id={id} /><DeleteBtn id={id} /></Cell>
        else if (status === '02') return <Cell align='left'><UpBtn id={id} /><ModfiyBtn id={id} /><DeleteBtn id={id} /></Cell>
        else if (status === '03') return <Cell align='left'><DownBtn id={id} /></Cell>
        else if (status === '04') return <Cell align='left'><UpBtn id={id} /><ModfiyBtn id={id} /><DeleteBtn id={id} /></Cell>
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
                    { accessor: 'photo', width: 80, title: '图片', textAlignment:'center', render: ({photo, title}) => <Cell><img src={photo} title={title} className='w-6'/></Cell>},
                    { accessor: 'title', title: '名称', textAlignment: 'center',  render: ({title}) => <Cell align='left'>{title}</Cell>},
                    { accessor: 'origPrice', width:120, title: '原单价', textAlignment: 'right', render: ({origPrice}) => <CellMoney>{origPrice}</CellMoney>},
                    { accessor: 'price', width:120, title: '单价', textAlignment: 'right', render: ({price}) => <CellMoney>{price}</CellMoney>},
                    { accessor: 'quantity', width:120, title: '库存', textAlignment: 'right', render: ({quantity}) => <CellNumber fixed={0}>{quantity}</CellNumber>},
                    { accessor: 'createTime', width: 180, title: '创建时间', textAlignment: 'center', render: ({createTime}) => <CellTime>{createTime}</CellTime>},
                    { accessor: 'status', width:120, title: '状态', textAlignment: 'center', render: ({status}) => statusChildren(status)},
                    { accessor: 'aution', width: 120, title: '操作', render: ({ status, id }) => autionChildren(status, id)},
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