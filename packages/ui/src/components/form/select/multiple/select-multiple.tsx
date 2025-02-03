'use client'

import React, { useState, useRef, useEffect, useMemo} from "react";
import {
  CheckIcon,
  ChevronDown,
  XIcon,
} from "lucide-react";
import { FixedSizeList as List } from 'react-window'

import { 
    Popover, 
    PopoverTrigger, 
    Button, 
    Badge, 
    Separator,
    PopoverContent,
    Command,
    CommandList,
    CommandInput,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    FormFieldOption,
} from "@workspace/ui/components";
import { cn, searchEngine } from "@workspace/ui/lib/utils";

export interface MultiSelectOption extends FormFieldOption {
  id: string
  /** The text to display for the option. */
  label: string;
  /** The unique value associated with the option. */
  value: string;
  /** Optional icon component to display alongside the option. */
  icon?: React.ComponentType<{ className?: string }>;
}

/**
 * Props for MultiSelect component
 */
export interface MultiSelectProps {
  label: {
    id: string
    name: string
  }
  required?: boolean
  /**
   * An array of option objects to be displayed in the multi-select component.
   * Each option object has a label, value, and an optional icon.
   */
  options: MultiSelectOption[];

  /**
   * Callback function triggered when the selected values change.
   * Receives an array of the new selected values.
   */
  onValueChange: (options: MultiSelectOption[]) => void;

  /** The default selected values when the component mounts. */
  defaultValue?: MultiSelectOption[];

  /**
   * Placeholder text to be displayed when no values are selected.
   * Optional, defaults to "Select options".
   */
  placeholder?: string;

  /**
   * Maximum number of items to display. Extra selected items will be summarized.
   * Optional, defaults to 3.
   */
  maxCount?: number;
  /**
   * Additional class names to apply custom styles to the multi-select component.
   * Optional, can be used to add custom styles.
   */
  className?: string;
  selectedOptions: MultiSelectOption[]
}

//TODO: Melhorar algoritmo para itens selecionado e geracao de options. Muitos calculos estao sendo feitos durante search e toggle
export const MultiSelect: React.FC<MultiSelectProps> = ({
      options: incomingOptions,
      onValueChange,
      defaultValue = [],
      placeholder = "Select options",
      maxCount = 3,
      className,
      label,
      required,
      selectedOptions
}) => {
    const triggerRef = useRef<HTMLButtonElement>(null)
    const [selectedValues, setSelectedValues] = useState<MultiSelectOption[]>(defaultValue);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [search, setSearch] = useState('')
    
    const options = useMemo<MultiSelectOption[]>(() => {
      if(search){
        const optionsProspect = searchEngine(incomingOptions, ['label'], search)
        return optionsProspect
      }
    
      return incomingOptions
    }, [incomingOptions, search])

    const optionsWithSelectedFirst = useMemo(() => {
      const {selected, nonSelected} = options.reduce((result, option) => {
        const isSelected = selectedOptions.find(selectedOption => selectedOption.id === option.id)

        if(isSelected){
          result.selected.push(option)
        } else {
          result.nonSelected.push(option)
        }

        return result
      }, {selected: [] as MultiSelectOption[], nonSelected: [] as MultiSelectOption[]})
      
      return [...selected, ...nonSelected]
    }, [options, selectedOptions])

    useEffect(() => {
      if(selectedOptions !== selectedValues) {
        setSelectedValues(selectedOptions)
      }
    }, [selectedOptions])

    const handleInputKeyDown = (
      event: React.KeyboardEvent<HTMLInputElement>
    ) => {
      if (event.key === "Enter") {
        setIsPopoverOpen(true);
      } else if (event.key === "Backspace" && !event.currentTarget.value) {
        const newSelectedValues = [...selectedValues];
        newSelectedValues.pop();
        setSelectedValues(newSelectedValues);
        onValueChange(newSelectedValues);
      }
    };

    const toggleOption = (option: MultiSelectOption) => {
      const newSelectedValues = selectedValues.includes(option)
        ? selectedValues.filter((value) => value !== option)
        : [...selectedValues, option];
      setSelectedValues(newSelectedValues);
      onValueChange(newSelectedValues);
    };

    const handleClear = () => {
      setSelectedValues([]);
      onValueChange([]);
    };

    const handleTogglePopover = () => {
      setIsPopoverOpen((prev) => !prev);
    };

    const clearExtraOptions = () => {
      const newSelectedValues = selectedValues.slice(0, maxCount);
      setSelectedValues(newSelectedValues);
      onValueChange(newSelectedValues);
    };

    const toggleAll = () => {
      if (selectedValues.length === options.length) {
        handleClear();
      } else {
        setSelectedValues(options);
        onValueChange(options);
      }
    };

    return (
      <Popover
        open={isPopoverOpen}
        onOpenChange={setIsPopoverOpen}
      >
        <div className={className}>
        <label
          className="font-sans text-xs text-input-label font-semibold" 
          id={label.id}
        >
          {label.name}

          {required && <span className="ml-[2px] text-light-danger-120 text-base">*</span>}
        </label>
        <PopoverTrigger asChild>
          <Button
            aria-labelledby={label.id}
            ref={triggerRef}
            onClick={handleTogglePopover}
            className={cn(
              "border-light-neutral-100 bg-light-neutral hover:bg-current",
              "h-fit w-full p-1 rounded-md border [&_svg]:pointer-events-auto min-h-8",
            )}
          >
            {selectedValues.length > 0 ? (
              <div className="flex justify-between items-stretch w-full">
                <div className="flex flex-wrap gap-1 items-center">
                  {selectedValues.slice(0, maxCount).map((option) => {
                    const IconComponent = option?.icon;
                    return (
                      <Badge
                        key={option.id}
                        className="px-1 bg-light-neutral-50 hover:bg-light-neutral-60 text-light-neutral-190"
                      >
                        {IconComponent && (
                          <IconComponent className="h-4 w-4 mr-2" />
                        )}
                        {option.label}
                        <XIcon
                          className="ml-2 size-[14px] text-light-neutral-100 cursor-pointer"
                          onClick={(event) => {
                            event.stopPropagation();
                            toggleOption(option);
                          }}
                        />
                      </Badge>
                    );
                  })}
                  {selectedValues.length > maxCount && (
                    <Badge
                      className={cn(
                        "px-1 bg-light-neutral-50 hover:bg-light-neutral-60 text-light-neutral-190",
                      )}
                    >
                      {`+ ${selectedValues.length - maxCount} more`}
                      <XIcon
                        className="ml-2 size-[14px] text-light-neutral-100 cursor-pointer"
                        onClick={(event) => {
                          event.stopPropagation();
                          clearExtraOptions();
                        }}
                      />
                    </Badge>
                  )}
                </div>
                <div className="h-auto flex items-center">
                  <XIcon
                    className="h-4 cursor-pointer text-muted-foreground"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleClear();
                    }}
                  />
                  <Separator
                    orientation="vertical"
                    className="mx-1"
                  />
                  <ChevronDown className="h-4 cursor-pointer text-muted-foreground" />
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between w-full">
                <span className="text-sm text-muted-foreground mx-3">
                  {placeholder}
                </span>
                <ChevronDown className="h-4 cursor-pointer text-muted-foreground" />
              </div>
            )}
          </Button>
        </PopoverTrigger>

        </div>

        <PopoverContent
          className="p-0 w-full"
          align="start"
          onEscapeKeyDown={() => setIsPopoverOpen(false)}
          style={{width: triggerRef.current?.offsetWidth}}
        >
          <Command shouldFilter={false}>
            <CommandInput
              autoFocus
              placeholder="Search..."
              onKeyDown={handleInputKeyDown}
              onValueChange={setSearch}
              value={search}
            />
            <CommandList 
              className="relative flex-col-reverse flex"
            >
              <CommandEmpty>No results found.</CommandEmpty>
                {!!options.length && (
                  <CommandItem
                    key="all"
                    onSelect={toggleAll}
                    className="cursor-pointer sticky top-0"
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        selectedValues.length === options.length
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <CheckIcon className="h-4 w-4" />
                    </div>
                    <span>(Select All)</span>
                  </CommandItem>
                )}
                    <CommandGroup>
                      <List
                        height={options.length > 6 ? 192 : options.length * 32}
                        itemCount={options.length}
                        itemSize={32}
                        width='100%'
                      >
                        {({style, index}) => {
                          const option = optionsWithSelectedFirst[index]
                          if(!option) return null

                          const isSelected = !!selectedValues.find(
                            value => value.id === option.id
                          )

                          return !!option && (
                            <CommandItem
                              key={option.id}
                              onSelect={() => toggleOption(option)}
                              className="cursor-pointer bg-light-neutral rounded-none !hover:bg-light-neutral"
                              style={{...style}}
                            >
                              <div
                                className={cn(
                                  "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                                  isSelected
                                    ? "bg-light-brand-120 text-primary-foreground"
                                    : "opacity-50 [&_svg]:invisible"
                                )}
                              >
                                <CheckIcon className="h-4 w-4" />
                              </div>
                              {option.icon && (
                                <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                              )}
                              <span>{option.label}</span>
                            </CommandItem>
                          )
                        }}
                      </List>
                    </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
}

MultiSelect.displayName = "MultiSelect";