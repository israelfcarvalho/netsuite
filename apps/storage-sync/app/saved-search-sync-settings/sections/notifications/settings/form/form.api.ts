'use client'

import { useMutation, useQuery, useQueryClient } from "react-query"

import { api, netsuiteOptionsToFormFieldOptions } from "@/services"
import { 
    GetNotificationSettingsByIdResponse, 
    SaveNotificationSettingsBody 
} from "./form.types"
import { NetSuiteError, NetsuiteFieldOption } from "@workspace/services/api"
import { environments } from "@/environments"

async function getEmailTemplateOptions(){
    return api.get<NetsuiteFieldOption[]>(environments.api_email_template)
        .then(netsuiteOptionsToFormFieldOptions)
}


export const useEmailTemplateOptions = () => {
    const {data = []} = useQuery({
        queryKey: ['email-template-options'],
        queryFn: getEmailTemplateOptions,
    })

    return {
        emailTemplateOptions: data
    }
}

async function getEmployeeOptions(){
    return api.get<NetsuiteFieldOption[]>(environments.api_employee)
        .then(netsuiteOptionsToFormFieldOptions)
}


export const useEmployeeOptions = () => {
    const {data = []} = useQuery({
        queryKey: ['employee-options'],
        queryFn: getEmployeeOptions,
    })

    return {
        employeeOptions: data
    }
}

async function getNotificationSettingsById(id?: string){
    if(!id){
        return
    }

    return api.get<GetNotificationSettingsByIdResponse>(environments.api_notification_settings, {
        action: 'by-id',
        id
    })
}

export const useNotificationSettings = (id?: string) => {
    const { data } = useQuery({
        queryKey: [`notification-settings-${id}`],
        queryFn: () => getNotificationSettingsById(id),
    })

    return {
        data
    }
}

async function saveNotificationSettings(body: SaveNotificationSettingsBody){
    return api.post<GetNotificationSettingsByIdResponse>(
        environments.api_notification_settings, 
        body
    )
}

export const useSaveNotificationSettings = () => {
    const queryClient = useQueryClient()

    const { mutate } = useMutation<GetNotificationSettingsByIdResponse, NetSuiteError, SaveNotificationSettingsBody>({
        mutationFn: saveNotificationSettings,
        mutationKey: ['save-notification-settings'],
        onSuccess(){
            queryClient.invalidateQueries({
                queryKey: 'notification-settings-options'
            })
        }
    })

    return {
        saveNotificationSettings: mutate
    }
}