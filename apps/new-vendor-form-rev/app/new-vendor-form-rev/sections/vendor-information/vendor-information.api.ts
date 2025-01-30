'use client'

import { useQuery } from "react-query"

import { NetsuiteFieldOption, netsuiteOptionsToFormFieldOptions } from "@workspace/services/api"

async function getCountryOptions(){
    return new Promise<NetsuiteFieldOption[]>((res, rej) => {
        setTimeout(() => {
            res(['Brazil', 'United States', 'India'].map((country, index) => ({id: index.toString(), name: country})))
        }, );
    })
    .then(netsuiteOptionsToFormFieldOptions)
}

export const useCountryOptions = () => {
    const { data = [] } = useQuery({
        queryKey: ['country-options'],
        queryFn: getCountryOptions,
    })

    return {
        countryOptions: data
    }
}