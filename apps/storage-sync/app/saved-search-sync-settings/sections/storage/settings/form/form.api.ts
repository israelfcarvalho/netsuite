'use client'

import { useMutation, useQuery, useQueryClient } from "react-query"

import { api, netsuiteOptionsToFormFieldOptions } from "@/services"
import { GetStorageSettingsByIdResponse, SaveStorageSettingsBody } from "./form.types"
import { NetSuiteError, NetsuiteFieldOption } from "@workspace/services/api"
import { environments } from "@/environments"

async function getStorageOptions(){
    return api.get<NetsuiteFieldOption[]>(environments.api_storage)
        .then(netsuiteOptionsToFormFieldOptions)
}


export const useStorageOptions = () => {
    const {data = []} = useQuery({
        queryKey: ['storage-options'],
        queryFn: getStorageOptions,
    })

    return {
        storageOptions: data
    }
}

async function getStorageSettingsById(id?: string){
    if(!id){
        return
    }

    return api.get<GetStorageSettingsByIdResponse>(environments.api_storage_settings, {
        action: 'by-id',
        id
    })
}

export const useStorageSettings = (id?: string) => {
    const { data } = useQuery({
        queryKey: [`storage-settings-${id}`],
        queryFn: () => getStorageSettingsById(id),
    })

    return {
        data
    }
}

async function saveStorageSettings(body: SaveStorageSettingsBody){
    return api.post<GetStorageSettingsByIdResponse>(
        environments.api_storage_settings, 
        body
    )
}

export const useSaveStorage = () => {
    const queryClient = useQueryClient()

    const { mutate } = useMutation<GetStorageSettingsByIdResponse, NetSuiteError, SaveStorageSettingsBody>({
        mutationFn: saveStorageSettings,
        mutationKey: ['save-storage-settings'],
        onSuccess(){
            queryClient.invalidateQueries({
                queryKey: 'storage-settings-options'
            })
        }
    })

    return {
        saveStorageSetting: mutate
    }
}