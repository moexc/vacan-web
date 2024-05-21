import { FC, PropsWithChildren, ReactNode } from "react";
import { parse } from "../util/time";
import { split, toMoney } from "../util/number";

const Cell = ({ 
    children,
    className,
    title,
    align = 'center',
    ellipsis = true,
}: PropsWithChildren<CellProp>) => {
    let just
    if(align === 'left') just = 'justify-start'
    else if(align === 'center') just = 'justify-center'
    else if(align === 'right') just = 'justify-end'
    else just = 'justify-center'
    return <div className={`${ellipsis && 'overflow-hidden text-ellipsis whitespace-nowrap'} flex gap-2 items-center ${just} ${className}`} title={title}>{children}</div>
}

const CellStatus = (prop: PropsWithChildren<CellStatusProp>) => {
    return <Cell {...prop}><span className={`badge ${badgemap.get(prop.badge)}`}>{prop.children}</span></Cell>
}

const CellTime = (prop: PropsWithChildren<CellProp>) => {
    return <Cell {...prop} children={prop.children && parse(prop.children as number)} />
}

const CellMoney = (prop: PropsWithChildren<CellProp>) => {
    return <Cell {...prop} align={prop.align || 'right'} children={toMoney(prop.children)} />
}

const CellNumber = (prop: PropsWithChildren<CellNumberProp>) => {
    return <Cell {...prop} align={prop.align || 'right'} children={split(prop.children, prop.fixed)} />
}

type CellNumberProp = CellProp & {
    fixed?: number
}

type CellStatusProp = CellProp & {
    badge: 'info' | 'primary' | 'success' | 'warning' | 'danger'
}

const badgemap:Map<string, string> = new Map([
    ['info', 'badge-outline-info'],
    ['primary', 'badge-outline-primary'],
    ['success', 'badge-outline-success'],
    ['warning', 'badge-outline-warning'],
    ['danger', 'badge-outline-danger'],
])

type CellProp = {
    children: ReactNode
    className?: string
    title?: string
    align?: 'center' | 'left' | 'right'
    ellipsis?: boolean
}

export {Cell, CellStatus, CellTime, CellMoney, CellNumber}