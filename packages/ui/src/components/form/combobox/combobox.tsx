'use client'

import React, { useEffect, useRef } from 'react'
import { Command, CommandItem } from '../../command/command'
import { CommandInput } from '../../command/index'
import { CommandEmpty, CommandGroup, CommandList } from 'cmdk'
import { Check } from 'lucide-react'
import { cn } from '@workspace/ui/lib/utils'
import { ComboboxProps } from './combobox.types'
import { FormControl, FormField, FormLabel } from '@radix-ui/react-form'

export const Combobox: React.FC<ComboboxProps> = ({
    options, 
    onValueChange, 
    required,
    name,
    label
}) => {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState('')
    const [search, setSearch] = React.useState('')
    const commandInputRef = useRef<React.ElementRef<typeof CommandInput>>(null)

    const cancel = () => {
        setTimeout(() => {
            setOpen(false)
        }, 100);
    }

    useEffect(() => {
        if(!open && value && value !== search){
            setSearch(value)
        }
    }, [open, value, search])

    return (
        <Command className={cn('relative overflow-visible')}>
            <FormField name="combobox">
                <FormLabel
                    className="font-sans text-xs text-input-label font-semibold"
                >
                    {label} {required && <span className="ml-[2px] text-light-danger-120 text-base">*</span>}
                </FormLabel>

                <FormControl asChild>
                    <CommandInput
                        ref={commandInputRef}
                        role='combobox'
                        aria-expanded={open} 
                        onValueChange={(value) => {
                            setSearch(value)
                            setOpen(true)
                            onValueChange(value)
                        }}
                        onFocus={() => setOpen(true)}
                        onBlur={cancel}
                        value={search}
                    />
                </FormControl>
            </FormField>
            <CommandList className={cn('absolute pt-1 w-full z-10 bg-inherit shadow-lg rounded', !open && 'hidden')} style={{top: commandInputRef.current?.offsetHeight}}>
                <CommandEmpty>No results Found</CommandEmpty>
                <CommandGroup>
                    {options.map((option) => (
                        <CommandItem
                            className={cn(
                                'flex justify-between',
                            )}
                            key={option.value} 
                            value={option.value} 
                            onSelect={(value) => {
                                setValue(value)
                                setSearch(value)
                                setOpen(false)
                            }}
                            
                        >
                            {option.label}
                            <Check
                                className={cn(
                                    "h-4 w-4",
                                    value === option.value ? "opacity-100" : "opacity-0"
                                )}
                            />
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </Command>
    ) 
}