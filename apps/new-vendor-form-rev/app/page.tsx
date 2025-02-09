'use client'

import React, { useState } from "react";
import NextLink from 'next/link'
import { useRouter } from "next/navigation";

import { Button, Form, Link, tableFactory } from "@workspace/ui/components";
import { useSavedSearchSyncSettingsList } from "./new-vendor-form-rev/new-vendor-form-rev.api";
import { SavedSearchSyncSettings } from "./new-vendor-form-rev/new-vendor-form-rev-type";

const savedSearchSettingsPath = ''

const Table = tableFactory<SavedSearchSyncSettings, 'edit'>([
    {
      accessorKey: "edit",
      header: ({column}) => {
          return (
              <div
                  className="px-4 py-2 rounded-none w-full justify-start text-xs"
                  style={{width: column.getSize()}}
              >
                Edit
              </div>
          )
      },
      cell: ({ row }) => (
        <NextLink href={`${savedSearchSettingsPath}&view=management&id=${row.getValue('id')}`} passHref legacyBehavior>
            <Link
                className="px-4 py-2 text-xs"
                label={`Edit Saved Search Setting ${row.getValue('name')}`} 
            >
              Edit
            </Link>
      </NextLink>
      ),
      size: 60
    },
    {
        accessorKey: "id",
        header: ({ column }) => {
          return (
            <Button
                style={{width: column.getSize()}}
                className="rounded-none w-full  justify-start text-xs"
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              ID
            </Button>
          )
        },
        cell: ({ row }) => <div className="px-4 py-2 text-xs">{row.getValue("id")}</div>,
        size: 60
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
              style={{width: column.getSize()}}
              className="rounded-none w-full  justify-start text-xs"
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
          </Button>
        )
      },
      cell: ({ row }) => <div className="px-4 py-2 text-xs">{row.getValue("name")}</div>,
      size: 120
    },
    {
      accessorKey: "savedSearch",
      header: ({ column }) => {
        return (
          <Button
              style={{width: column.getSize()}}
              className="rounded-none w-full justify-start text-xs"
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Saved Search
          </Button>
        )
      },
      cell: ({ row }) => (
          <div className="px-4 py-2 text-left text-xs">
              {row.getValue<SavedSearchSyncSettings['savedSearch']>("savedSearch").name}
          </div>
      ),
      size: 150
    },
    {
      accessorKey: "dateFilterField",
      header: ({ column }) => {
          return (
            <Button
                className="rounded-none w-full  justify-start text-xs"
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Date Filter Field
            </Button>
          )
        },    
        cell: ({ row }) => (
            <div className="px-4 py-2 text-left text-xs">
                {row.getValue<SavedSearchSyncSettings['dateFilterField']>("dateFilterField")}
            </div>
        ),
    },
    {
      accessorKey: "period",
      header: ({ column }) => {
          return (
            <Button
                className="rounded-none w-full  justify-start text-xs"
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Period
            </Button>
          )
        },    
        cell: ({ row }) => (
            <div className="px-4 py-2 text-left text-xs">
                {row.getValue<SavedSearchSyncSettings['period']>("period")?.name || ''}
            </div>
        ),
    },
    {
      accessorKey: "destinyFolderPath",
      header: ({ column }) => {
          return (
            <Button
                className="rounded-none w-full justify-start text-xs"
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Destiny Folder Path
            </Button>
          )
        },    
        cell: ({ row }) => (
            <div className="px-4 py-2 text-left text-xs">
                {row.getValue<SavedSearchSyncSettings['destinyFolderPath']>("destinyFolderPath")}
            </div>
        ),
    },
    {
      accessorKey: "fileNamePrefix",
      header: ({ column }) => {
          return (
            <Button
                className="rounded-none w-full justify-start text-xs"
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              File Name Prefix
            </Button>
          )
        },    
        cell: ({ row }) => (
            <div className="px-4 py-2 text-left text-xs">
                {row.getValue<SavedSearchSyncSettings['fileNamePrefix']>("fileNamePrefix")}
            </div>
        ),
    },
    {
      accessorKey: "appendExecutionDateToFileName",
      header: ({ column }) => {
          return (
            <Button
                className="rounded-none w-full justify-start text-xs"
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Append Execution Date To File Name
            </Button>
          )
        },    
        cell: ({ row }) => (
            <div className="px-4 py-2 text-left text-xs">
                {row.getValue<SavedSearchSyncSettings['appendExecutionDateToFileName']>("appendExecutionDateToFileName") ? 'Yes' : 'No'}
            </div>
        ),
    },
    {
      accessorKey: "createPeriodFolder",
      header: ({ column }) => {
          return (
            <Button
                className="rounded-none w-full justify-start text-xs"
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Create Period Folder
            </Button>
          )
        },    
        cell: ({ row }) => (
            <div className="px-4 py-2 text-left text-xs">
                {row.getValue<SavedSearchSyncSettings['createPeriodFolder']>("createPeriodFolder") ? 'Yes' : 'No'}
            </div>
        ),
    },
    {
      accessorKey: "notificationSettings",
      header: ({ column }) => {
          return (
            <Button
                className="rounded-none w-full justify-start text-xs"
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Notification Settings
            </Button>
          )
        },    
        cell: ({ row }) => (
            <div className="px-4 py-2 text-left font-medium text-xs">
                {row.getValue<SavedSearchSyncSettings['notificationSettings']>("notificationSettings").name}
            </div>
        ),
    },
    {
      accessorKey: "storageSettings",
      header: ({ column }) => {
          return (
            <Button
                className="rounded-none w-full text-xs"
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Storage Settings
            </Button>
          )
        },    
        cell: ({ row }) => (
            <div className="px-4 py-2 text-xs">
                {row.getValue<SavedSearchSyncSettings['storageSettings']>("storageSettings").name}
            </div>
        ),
    },
    {
      accessorKey: "scriptDeploymentLink",
      header: ({column}) => {
        return (
            <div
                className="px-4 py-2 rounded-none w-full justify-start text-xs"
                style={{width: column.getSize()}}
            >
              Script Deployment Link
            </div>
        )
      },
      cell: ({ row }) => {
          return (
            <Link
              href={row.getValue<SavedSearchSyncSettings['scriptDeploymentLink']>('scriptDeploymentLink')}
              className="px-4 py-2 text-xs text-left"
              label={`Script Deployment Link to ${row.getValue('name')}`} 
            >
              Script Deployment
            </Link>
          )
        },    
    }
], {left: ['edit', 'id', 'name', 'savedSearch']})

const SavedSearchSyncSettingsListPage: React.FC = () => {
    const route = useRouter()

    const [page, setPage] = useState(0)
    const { 
        savedSearchSyncSettingsData, 
        savedSearchSyncSettingsSummary,
        pageSize,
        isLoading
    } = useSavedSearchSyncSettingsList(page)

    const addNew = () => {
        route.push(`${savedSearchSettingsPath}&view=management`)
    }

    return (
        <div className="w-dvw h-dvh">
            <Form
                onSubmit={addNew}
                submitLabel="New"
                title="SM | Saved Search Sync Settings List"
            >
                <Table
                    loading={isLoading}
                    pageSize={pageSize}
                    data={savedSearchSyncSettingsData}
                    hasNext={!!savedSearchSyncSettingsSummary && !savedSearchSyncSettingsSummary.page.isLast}
                    hasPrevious={!!savedSearchSyncSettingsSummary && !savedSearchSyncSettingsSummary.page.isFirst}
                    onClickNext={() => setPage(previousPage => previousPage + 1)}
                    onClickPrevious={() => setPage(previousPage => previousPage - 1)}
                />
            </Form>
        </div>
    )
}

export default SavedSearchSyncSettingsListPage