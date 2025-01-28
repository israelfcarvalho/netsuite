'use client'

import { useQuery } from "react-query"

import { environments } from "@/environments"
import { api, netsuiteOptionsToFormFieldOptions } from "@/services"
import { NetsuiteFieldOption } from "@workspace/services/api"

async function getSavedSerachOptions(){
    return api
        .get<NetsuiteFieldOption[]>(environments.api_saved_search)
        .then(netsuiteOptionsToFormFieldOptions)
}

export const useSavedSearchOptions = () => {
    const {data = []} = useQuery({
        queryKey: ['saved-search-options'],
        queryFn: getSavedSerachOptions
    })

    return {
        savedSearchOptions: data
    }
}

function getPeriodOptions(){
    return api
        .get<NetsuiteFieldOption[]>(environments.api_period)
        .then(netsuiteOptionsToFormFieldOptions)
}

export const usePeriodOptions = () => {
    const { data = [] } = useQuery({
        queryKey: ['period-options'],
        queryFn: getPeriodOptions
    })

    return {
        periodOptions: data
    }
}
