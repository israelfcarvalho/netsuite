'use client'

import { useQuery } from "react-query"

import { NetsuiteFieldOption, netsuiteOptionsToFormFieldOptions } from "@workspace/services/api"
import { api } from "@/services"
import { environments } from "@/environments"

function getNotificationSettingsOptions(){
    return api
        .get<NetsuiteFieldOption[]>(environments.api_notification_settings)
        .then(netsuiteOptionsToFormFieldOptions)
}

export const useNotificationSettingsOptions = () => {
    const { data = [] } = useQuery({
        queryKey: ['notification-settings-options'],
        queryFn: getNotificationSettingsOptions,
    })

    return {
        notificationSettingsOptions: data
    }
}