import { ColumnDef, ColumnPinningState as ColumnPinningStatePrimitive } from "@tanstack/react-table";
import React from "react";

interface TableProps<T> {
    pageSize: number
    data: T[]
    hasNext: boolean,
    hasPrevious: boolean
    onClickNext: VoidFunction
    onClickPrevious: VoidFunction
    loading?: boolean
}

type Keyof<T> = T extends Record<infer K, any> ? K extends string ? K : string : string

type ObjectLiteral = {
    [K: string]: any
}

interface ColumnPinningState<T extends ObjectLiteral, K extends string> extends ColumnPinningStatePrimitive {
    left: (Keyof<T> | K)[]
}

export interface TableFactoryInterface {
    <T extends ObjectLiteral, K extends string>(columns: ColumnDef<T>[], columnPinning?: ColumnPinningState<T, K>): React.FC<TableProps<T>>
}