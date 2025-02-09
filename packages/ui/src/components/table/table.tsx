"use client"

import * as React from "react"
import {
  Column,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import * as TablePrimitives from "./components"
import { Button } from "../button"
import { TableFactoryInterface } from "./table.types"
import { Skeleton } from "../skeleton"

const getCommonPinningStyles = (column: Column<any>, isOverflowed: boolean): React.CSSProperties => {
  if(!isOverflowed){
    return {}
  }

  const isPinned = column.getIsPinned()
  const isLastLeftPinnedColumn =
    isPinned === 'left' && column.getIsLastColumn('left')
  const isFirstRightPinnedColumn =
    isPinned === 'right' && column.getIsFirstColumn('right')

  return {
    boxShadow: isLastLeftPinnedColumn
      ? '-4px 0 4px -4px gray inset'
      : isFirstRightPinnedColumn
        ? '4px 0 4px -4px gray inset'
        : undefined,
    left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
    right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
    opacity: 1,
    position: isPinned ? 'sticky' : 'relative',
    width: column.getSize(),
    zIndex: isPinned ? 1 : 0,
  }
}

export const tableFactory: TableFactoryInterface = (columns, columnPinning = {left: []}) => ({
    data,
    hasNext,
    hasPrevious,
    onClickNext,
    onClickPrevious,
    pageSize,
    loading
}) => {
  const tableContainerRef = React.useRef<HTMLDivElement>(null)
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [isOverflowed, setIsOverflowed] = React.useState(false)


  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getRowId(originalRow, index, parent) {
      return originalRow?.id ?? index.toString()
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: {
        pageIndex: 0,
        pageSize
      },
      columnPinning
    },
  })

  React.useEffect(() => {
    function onResize(){
      if(table.getTotalSize() > (tableContainerRef.current?.offsetWidth || 0)){
        setIsOverflowed(true)
      } else {
        setIsOverflowed(false)
      }
    }

    onResize()

    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
    }
  }, [table])

  return (
      <div className="w-full">
        <div ref={tableContainerRef} className="w-full overflow-hidden rounded-sm shadow-[0_0_4px_2px] shadow-light-neutral-50">
          <TablePrimitives.Table className="w-full">
            <TablePrimitives.TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TablePrimitives.TableRow
                    className="p-none"
                    key={headerGroup.id}
                >
                    {headerGroup.headers.map((header) => {
                      return (
                        <TablePrimitives.TableHead
                            key={header.id}
                            style={getCommonPinningStyles(header.column, isOverflowed)}
                            className="bg-light-neutral-30"
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TablePrimitives.TableHead>
                      )
                    })}
              </TablePrimitives.TableRow>
              ))}
            </TablePrimitives.TableHeader>
            <TablePrimitives.TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                <TablePrimitives.TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TablePrimitives.TableCell 
                          className="p-0 bg-light-neutral"
                          key={cell.id}
                          style={getCommonPinningStyles(cell.column, isOverflowed)}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TablePrimitives.TableCell>
                    ))}
                  </TablePrimitives.TableRow>
                ))
              ) : (
                <TablePrimitives.TableRow>
                  {loading ? (
                    <TablePrimitives.TableCell
                      colSpan={columns.length}
                    >
                      <Skeleton className="h-96"/>
                    </TablePrimitives.TableCell>
                  ) : (
                    <TablePrimitives.TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TablePrimitives.TableCell>
                  )}
                </TablePrimitives.TableRow>
              )}
            </TablePrimitives.TableBody>
          </TablePrimitives.Table>
        </div>
        {(hasNext !== undefined && hasPrevious !== undefined) && (
          <div className="flex items-center justify-start space-x-2 py-4">
            <div className="space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={onClickPrevious}
                disabled={!hasPrevious}
              >
                Previous
              </Button>
              <Button
                size="sm"
                onClick={onClickNext}
                disabled={!hasNext}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
  )
}
