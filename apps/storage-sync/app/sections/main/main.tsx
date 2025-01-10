import React, { useState } from "react";
import { Separator } from '@workspace/ui/components'

import { Collapsible, CollapsibleProps, Combobox, Input } from "@workspace/ui/components";
import { periodOptions, savedSearchOptions } from "./main.mock";

const initialColapseState: CollapsibleProps['initialState'] = 'open'

export const MainSection: React.FC = () => {
    const [name, setName] = useState<string>("");
    const [savedSearch, setSavedSearch] = useState<string>("");
    const [dateFilterField, setDateFilterField] = useState("")
    const [period, setPeriod] = useState<string>("");
    const [periodDelay, setPeriodDelay] = useState("")

    return (
        <Collapsible title="Main" initialState="open">
            <div className="flex gap-10">
                <div>
                    <Input
                      required
                      label="Name"
                      name="name"
                      onChange={setName}
                      value={name}
                    />

                    <Combobox
                      required  
                      name="saved_search"
                      label="Saved Search"
                      options={savedSearchOptions}
                      onValueChange={setSavedSearch}
                    />
                </div>

                <div>
                    <Input
                      label="Date Filter Field"
                      name="date-filter-field"
                      onChange={setDateFilterField}
                      value={dateFilterField}
                    />

                    <Combobox
                      name="period"
                      label="Period"
                      options={periodOptions}
                      onValueChange={setPeriod}
                    />
                </div>

                <div>
                <Input
                      label="Period Delay (Days)"
                      name="period-delay"
                      onChange={setDateFilterField}
                      value={dateFilterField}
                    />
                </div>
            </div>

        </Collapsible>
    )
}

