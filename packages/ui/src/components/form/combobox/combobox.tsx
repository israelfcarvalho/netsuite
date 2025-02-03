'use client'

import React, { KeyboardEventHandler, useEffect, useMemo, useRef, useState } from 'react'
import { Check, ChevronDown } from 'lucide-react'
import { FormControl, FormField, FormLabel } from '@radix-ui/react-form'
import { FixedSizeList as List } from 'react-window'

import { cn, searchEngine } from '@workspace/ui/lib/utils'
import { ComboboxFactoryInterface } from './combobox.types'
import { CommandInput } from '../../command'
import { Command, CommandEmpty, CommandGroup, CommandItem, CommandList } from '../../command/command'

export const ComboboxFactory: ComboboxFactoryInterface = () => ({
    options: incomingOptions, 
    required,
    name,
    label,
    onSelect,
    optionSelected,
    disabled,
    viewMode
}) => {
    const [optionSelectedCache, setOptionSelectedCache] = useState<typeof optionSelected>()
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState('')
    const [search, setSearch] = React.useState('')
    const formFieldRef = useRef<React.ElementRef<typeof FormField>>(null)
    const inputRef = useRef<HTMLInputElement>(null)

    const options = useMemo<typeof incomingOptions>(() => {
      if(search){
        const optionsProspect = searchEngine(incomingOptions, ['label'], search)

        return optionsProspect
      }
    
      const blankOption = {id: `${label}-${name}-blank`, label: 'blank', value: 'blank'} as (typeof incomingOptions)[0] 
    
      return [blankOption, ...incomingOptions]
    }, [incomingOptions, search, required])

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
            setOptionSelectedCache(undefined)
        }, 100);
    }

    const onSearchChange = (search: string) => {
        if(!search){
            if(optionSelected){
                setOptionSelectedCache(optionSelected)
            }
            handleSelect(undefined)
        }

        setSearch(search)
        setOpen(true)
    }

    const handleKeyboard: KeyboardEventHandler<HTMLInputElement> = (event) => {
        if(event.key === 'Escape'){
            if(optionSelectedCache){
                onSelect(optionSelectedCache)
            }            
        }
    }

    const handleSelect = (option: typeof optionSelected) => {
        onSelect(option)
        setValue(option?.label ?? '')
        setSearch(option?.label ?? '')
        setOpen(false)
    }

    return (
        <Command shouldFilter={false} className='relative h-auto overflow-visible bg-inherit'>
            <FormField ref={formFieldRef} name={name}>
                <FormLabel
                    className="font-sans text-xs text-input-label font-semibold"
                >
                    {label} 
                    
                    {required && !viewMode && <span className="ml-[2px] text-light-danger-120 text-base">*</span>}
                </FormLabel>

                <div className='w-full relative'>
                    <FormControl asChild>
                        <CommandInput
                            disabled={viewMode || disabled}
                            ref={inputRef}
                            className={cn(
                                'bg-light-neutral border-solid border border-input-border',
                                {'disabled:cursor-default border-0 px-0 rounded-none bg-transparent': viewMode}
                            )}
                            role='combobox'
                            aria-expanded={open} 
                            onValueChange={onSearchChange}
                            onFocus={() => setOpen(true)}
                            onBlur={cancel}
                            value={search}
                            onKeyDown={handleKeyboard}
                        />
                    </FormControl>

                    {!open && !viewMode && (
                        <ChevronDown 
                            role='button' 
                            aria-label={`open ${label}`} 
                            onClick={() => inputRef.current?.focus()} 
                            className='absolute size-6 pr-2 top-1 right-0 cursor-pointer'
                        />
                    )}
                </div>
            </FormField>
                <CommandList 
                    className={cn(
                        '!absolute max-h-56 mt-px w-full z-10 shadow-[0px_10px_20px_0px] shadow-light-neutral-60 rounded-b-md',
                        !open && 'hidden'
                    )}
                    style={{top: formFieldRef.current?.offsetHeight}}
                >
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
                                            'flex justify-between h-8',
                                        )}
                                        key='blank' 
                                        value='blank' 
                                        onSelect={() => handleSelect(undefined)}
                                    />
                                    )
                                }
                                    
                                return (
                                    <CommandItem
                                        className={cn(
                                            'flex justify-between py-0 flex-nowrap',
                                        )}
                                        key={option.id} 
                                        value={option.value} 
                                        onSelect={() => handleSelect(option)}
                                        style={{...style}}
                                    >
                                        <span title={option.label} className='w-full h-full items-center whitespace-nowrap overflow-hidden text-ellipsis'>
                                            {option.label}
                                        </span>
                                        <Check
                                            className={cn(
                                                "size 4",
                                                value === option.value ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                )
                            }}
                        </List>
                    </CommandGroup>
                </CommandList>
        </Command>
    ) 
}