'use client'

import { useQuery } from "react-query"

import { api, netsuiteOptionsToFormFieldOptions } from "@/services"
import { NetsuiteFieldOption } from "@workspace/services/api"
import { environments } from "@/environments"

function getStorageSettingsOptions(){
    return api
        .get<NetsuiteFieldOption[]>(environments.api_storage_settings)
        .then(netsuiteOptionsToFormFieldOptions)
}

export const useStorageSettingsOptions = () => {
    const {data = []} = useQuery({
        queryKey: ['storage-settings-options'],
        queryFn: getStorageSettingsOptions,
    })

    return {
        storageSettingsOptions: data
    }
}