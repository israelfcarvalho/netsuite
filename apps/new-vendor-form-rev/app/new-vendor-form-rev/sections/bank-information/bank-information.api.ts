'use client'

import { useQuery } from "react-query"

import { NetsuiteFieldOption, netsuiteOptionsToFormFieldOptions } from "@workspace/services/api"

async function getAccountTypeOptions(){
    return new Promise<NetsuiteFieldOption[]>((res, rej) => {
        setTimeout(() => {
            res(['Checking', 'Savings'].map((accountType, index) => ({id: index.toString(), name: accountType})))
        }, );
    })
    .then(netsuiteOptionsToFormFieldOptions)
}

export const useAccountTypeOptions = () => {
    const { data = [] } = useQuery({
        queryKey: ['account-type-options'],
        queryFn: getAccountTypeOptions,
    })

    return {
        accountTypeOptions: data
    }
}

async function getWireOrAchOptions(){
    return new Promise<NetsuiteFieldOption[]>((res, rej) => {
        setTimeout(() => {
            res(['Wire', 'ACH'].map((wireOrAch, index) => ({id: index.toString(), name: wireOrAch})))
        }, );
    })
    .then(netsuiteOptionsToFormFieldOptions)
}

export const useWireOrAchOptions = () => {
    const { data = [] } = useQuery({
        queryKey: ['wire-or-ach-options'],
        queryFn: getWireOrAchOptions,
    })

    return {
        wireOrAchOptions: data
    }
}