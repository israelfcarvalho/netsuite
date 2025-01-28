'use client'

import { useMutation, useQuery, useQueryClient } from "react-query"

import { api, netsuiteOptionsToFormFieldOptions } from "@/services"
import { 
    GetDateExecutionSettingsByIdResponse, 
    SaveDateExecutionSettingsBody 
} from "./form.types"
import { NetSuiteError, NetsuiteFieldOption } from "@workspace/services/api"
import { environments } from "@/environments"

async function getHolidaySettingsOptions(){
    return api.get<NetsuiteFieldOption[]>(environments.api_holiday_settings)
        .then(netsuiteOptionsToFormFieldOptions)
}

export const useHolidaySettingsOptions = () => {
    const {data = []} = useQuery({
        queryKey: ['holiday-settings-options'],
        queryFn: getHolidaySettingsOptions,
    })

    return {
        holidaySettingsOptions: data
    }
}

async function getDateExecutionSettingsOptions(){
    return api.get<NetsuiteFieldOption[]>(environments.api_date_execution_settings)
        .then(netsuiteOptionsToFormFieldOptions)
}


export const useDateExecutionSettingsOptions = () => {
    const {data = []} = useQuery({
        queryKey: ['date-execution-settings-options'],
        queryFn: getDateExecutionSettingsOptions,
    })

    return {
        dateExecutionSettingsOptions: data
    }
}

async function getDateExecutionSettingsById(id?: string){
    if(!id){
        return
    }

    return api.get<GetDateExecutionSettingsByIdResponse>(environments.api_date_execution_settings, {
        action: 'by-id',
        id
    })
}

export const useDateExecutionSettings = (id?: string) => {
    const { data } = useQuery({
        queryKey: [`date-execution-settings-${id}`],
        queryFn: () => getDateExecutionSettingsById(id),
    })

    return {
        data
    }
}

async function saveDateExecutionSettings(body: SaveDateExecutionSettingsBody){
    return api.post<GetDateExecutionSettingsByIdResponse>(
        environments.api_date_execution_settings, 
        body
    )
}

export const useSaveDateExecutionSettings = () => {
    const queryClient = useQueryClient()

    const { mutate } = useMutation<GetDateExecutionSettingsByIdResponse, NetSuiteError, SaveDateExecutionSettingsBody>({
        mutationFn: saveDateExecutionSettings,
        mutationKey: ['save-date-execution-settings'],
        onSuccess(){
            queryClient.invalidateQueries({
                queryKey: 'date-execution-settings-options'
            })
        }
    })

    return {
        saveDateExecutionSettings: mutate
    }
}