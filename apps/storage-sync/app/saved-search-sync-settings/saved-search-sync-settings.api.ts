'use client'

import { useMutation, useQuery } from "react-query"
import { environments } from "@/environments"
import { api } from "@/services"
import { NetSuiteError } from "@workspace/services/api"
import { GetSavedSearchSyncSettingsResponse, ResponseGetSavedSearchSyncSettingsById, SaveSavedSearchSyncSettingsBody } from "./saved-search-sync-settings.types"

const pageSize = 1000

function getSavedSearchSyncSettings(page: number){
    return api.get<GetSavedSearchSyncSettingsResponse>(`${environments.api_saved_search_sync_settings}`, {
        pageIndex: page,
        pageSize: pageSize
    })
}

export const useSavedSearchSyncSettingsList = (page: number) => {
    const { 
        data: {
            data = [],
            summary
        } = {},
        isLoading
    } = useQuery({
        queryKey: [`saved-search-sync-settings-list-${page}`],
        queryFn: () => getSavedSearchSyncSettings(page),
    })

    return {
        savedSearchSyncSettingsData: data,
        savedSearchSyncSettingsSummary: summary,
        pageSize,
        isLoading
    }
}

async function getSavedSearchSyncSettingsById(id: string | null){
    if(!id){
        return
    }

    return api.get<ResponseGetSavedSearchSyncSettingsById>(environments.api_saved_search_sync_settings, {
        action: 'by-id',
        id
    })
}

export const useSavedSearchSyncSettings = (id: string | null) => {
    const { data } = useQuery({
        queryKey: [`saved-search-sync-settings-${id}`],
        queryFn: () => getSavedSearchSyncSettingsById(id),
    })

    return {
        savedSearchSyncSettingsData: data
    }
}

async function saveSavedSearchSyncSettings(body: SaveSavedSearchSyncSettingsBody){
    return api.post<ResponseGetSavedSearchSyncSettingsById, SaveSavedSearchSyncSettingsBody>(
        environments.api_saved_search_sync_settings, 
        body, 
    )
}

export const useSaveSavedSearchSyncSettings = () => {
    const { mutate } = useMutation<ResponseGetSavedSearchSyncSettingsById, NetSuiteError, SaveSavedSearchSyncSettingsBody>({
        mutationFn: saveSavedSearchSyncSettings,
        mutationKey: ['save-saved-search-syn-settings'],
    })
    return {
        mutate
    }
}