import { ComboboxProps } from "@workspace/ui/components";


export const savedSearchOptions: ComboboxProps['options'] = Array.from({
     length: 10 
}, (_, i) => ({
    value: `search-${i}`,
    label: `Search ${i}`,
}))

export const periodOptions: ComboboxProps['options'] = Array.from({
    length: 10
}, (_, i) => ({
    value: `period-${i}`,
    label: `Period ${i}`
}))