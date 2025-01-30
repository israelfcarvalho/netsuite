'use client'

import React, { useEffect, useMemo, useRef } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { FormControl, FormField, FormLabel } from '@radix-ui/react-form'
import { Search } from 'js-search'
import { FixedSizeList as List } from 'react-window'

import { cn } from '@workspace/ui/lib/utils'
import { ComboboxFactoryInterface } from './combobox.types'
import { ScrollableArea } from '../../scrollable-area'
import { CommandInput } from '../../command'
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '../../command/command'

export const ComboboxFactory: ComboboxFactoryInterface = () => ({
    options: incomingOptions, 
    required,
    name,
    label,
    onSelect,
    optionSelected
}) => {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState('')
    const [search, setSearch] = React.useState('')
    const formFieldRef = useRef<React.ElementRef<typeof FormField>>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const searchEngine = useMemo(() => {
        const searchEngine = new Search(name)
        searchEngine.addIndex('label')

        return searchEngine
    }, [name])

    const options = useMemo<typeof incomingOptions>(() => {
      if(search){
        const optionsProspect = searchEngine.search(search) as typeof incomingOptions
        return optionsProspect
      }
    
      const blankOption = {id: `${label}-${name}-blank`, label: 'blank', value: 'blank'} as (typeof incomingOptions)[0] 
    
      return [blankOption, ...incomingOptions]
    }, [incomingOptions, search, required])

    useEffect(() => {
      if(!!incomingOptions.length){
        searchEngine.addDocuments(incomingOptions)
      }
    }, [incomingOptions])

    useEffect(() => {
        if(optionSelected){
            setValue(optionSelected.value)
        }
    }, [optionSelected])

    useEffect(() => {
        if(!open && value && value !== search){
            setSearch(value)
        }
    }, [open, value, search])

    const cancel = () => {
        setTimeout(() => {
            setOpen(false)
        }, 100);
    }

    return (
        <Command shouldFilter={false} className='relative h-auto overflow-visible bg-inherit'>
            <FormField ref={formFieldRef} name={name}>
                <FormLabel
                    className="font-sans text-xs text-input-label font-semibold"
                >
                    {label} {required && <span className="ml-[2px] text-light-danger-120 text-base">*</span>}
                </FormLabel>

                <div className='w-full relative'>
                    <FormControl asChild>
                        <CommandInput
                            ref={inputRef}
                            className='bg-light-neutral'
                            role='combobox'
                            aria-expanded={open} 
                            onValueChange={(value) => {
                                setSearch(value)
                                setOpen(true)
                            }}
                            onFocus={() => setOpen(true)}
                            onBlur={cancel}
                            value={search}
                        />
                    </FormControl>

                    {!open && (<ChevronDown role='button' aria-label={`open ${label}`} onClick={() => inputRef.current?.focus()} className='absolute size-6 pr-2 top-1 right-0 cursor-pointer'/>)}
                </div>
            </FormField>
            <ScrollableArea 
                className={cn(
                    '!absolute max-h-56 mt-px w-full z-10 shadow-[0px_10px_20px_0px] shadow-light-neutral-60 rounded-b-md',
                    !open && 'hidden'
                )}
                style={{top: formFieldRef.current?.offsetHeight}}
            >
                <CommandList>
                    <CommandEmpty>
                        {!!options.length ? 'No results Found' : 'No options available'}
                    </CommandEmpty>
                    <CommandGroup>
                        <List
                            height={options.length > 6 ? 192 : options.length * 32}
                            itemCount={options.length}
                            itemSize={32}
                            width='100%'
                        >
                            {({style, index}) => {
                                const option = options[index]
                                if(!option) return null

                                if(option.value === 'blank'){
                                    return (
                                    <CommandItem
                                        className={cn(
                                            'flex justify-between w-full h-8',
                                        )}
                                        key='blank' 
                                        value='blank' 
                                        onSelect={() => {
                                            onSelect(undefined)
                                            setValue('')
                                            setSearch('')
                                            setOpen(false)
                                        }}
                                    />
                                    )
                                }
                                    
                                return (
                                    <CommandItem
                                        className={cn(
                                            'flex justify-between',
                                        )}
                                        key={option.id} 
                                        value={option.value} 
                                        onSelect={() => {
                                            onSelect(option)
                                            setValue(option.value)
                                            setSearch(option.label)
                                            setOpen(false)
                                        }}
                                        style={style}
                                    >
                                        {option.label}
                                        <Check
                                            className={cn(
                                                "h-4 w-4",
                                                value === option.value ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                )
                            }}
                        </List>
                    </CommandGroup>
                </CommandList>
            </ScrollableArea>
        </Command>
    ) 
}