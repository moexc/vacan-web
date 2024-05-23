import { PropsWithChildren, ReactNode, useState } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import IconPencil from './Icon/IconPencil';
import { useTranslation } from 'react-i18next';
import IconTrashLines from './Icon/IconTrashLines';
import IconShelve from './Icon/IconShelve';
import IconOffShelf from './Icon/IconOffShelf';
import IconPush from './Icon/IconPush';
import IconCaretDown from './Icon/IconCaretDown';
import IconXCircle from './Icon/IconXCircle';
import IconRefresh from './Icon/IconRefresh';



const IconBtn = ({children, title, className, onClick}: PropsWithChildren<IconBtnProp>) => {
    return (
        <Tippy content={title}>
            <button type="button" className={className} onClick={(e) => {e.stopPropagation(); onClick()}}>
                {children}
            </button>
        </Tippy>
    )
}

const EditIconBtn = (prop: PropsWithChildren<OperIconProp>) => {
    const {t} =  useTranslation()
    return <IconBtn {...prop} title={t('edit')}> <IconPencil/> </IconBtn>
}

const DeleteIconBtn = (prop: PropsWithChildren<OperIconProp>) => {
    const {t} =  useTranslation()
    return <IconBtn {...prop} title={t('delete')}> <IconTrashLines/> </IconBtn>
}

const ShelveIconBtn = (prop: PropsWithChildren<OperIconProp>) => {
    const {t} =  useTranslation()
    return <IconBtn {...prop} title={t('shelve')}> <IconShelve/> </IconBtn>
}

const OffShelfIconBtn = (prop: PropsWithChildren<OperIconProp>) => {
    const {t} =  useTranslation()
    return <IconBtn {...prop} title={t('off_shelf')}> <IconOffShelf/> </IconBtn>
}

const PushIconBtn = (prop: PropsWithChildren<OperIconProp>) => {
    const {t} =  useTranslation()
    return <IconBtn {...prop} title={t('push')}> <IconPush/> </IconBtn>
}

const ExpandIconBtn = (prop: OperSwitchProp) => {
    const {t} = useTranslation()
    const {onClick, className} = prop
    const onclick = () => {
        onClick()
        setExpand(!expand)
    }
    const [expand, setExpand] = useState(false)
    return <IconBtn className={`${className} ${expand && 'rotate-180'}`} title={expand ? t('折叠') : t('展开')} onClick={onclick} > <IconCaretDown className='w-6 h-6'/> </IconBtn>
}

const XCircleIconBtn = (prop: PropsWithChildren<OperIconProp>) => {
    const {t} =  useTranslation()
    return <IconBtn {...prop} title={t('delete')}> <IconXCircle/> </IconBtn>
}

const RefreshIconBtn = (prop: PropsWithChildren<OperIconProp>) => {
    const {t} =  useTranslation()
    return <IconBtn {...prop} title={t('refresh')}> <IconRefresh/> </IconBtn>
}

type OperSwitchProp = {
    onClick: () => void
    className?: string
}

type OperIconProp = {
    onClick: () => void
    className?: string
}

type IconBtnProp = {
    children: ReactNode
    title: string
    onClick: () => void
    className?: string
}

export{EditIconBtn, DeleteIconBtn, ShelveIconBtn, OffShelfIconBtn, PushIconBtn, ExpandIconBtn, XCircleIconBtn, RefreshIconBtn}