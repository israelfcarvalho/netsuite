import React, { ReactNode } from "react";
import * as TabsPrimitives from '@radix-ui/react-tabs'
import { cn } from "@workspace/ui/lib/utils";
import { Separator } from "../separator";

export interface Tab {
    id: string
    label: string
    content: ReactNode
}

export interface TabsProps {
    tabs: Tab[]
} 

export const Tabs: React.FC<TabsProps> = ({
    tabs
}) => {
    return (
        <TabsPrimitives.Root className="py-4" defaultValue={tabs[0]?.id}>
            <TabsPrimitives.List className="grid grid-cols-[repeat(2,max-content)]">
                {tabs.map((tab, index) => (
                    <TabsPrimitives.TabsTrigger
                        
                        className='py-1 border-b-2 border-transparent data-[state=active]:border-light-brand-120 data-[state=inactive]:hover:bg-light-neutral-30 [&:not(:first-child)]:pl-6 pr-6 last:rounded-se-lg'
                        key={tab.id} 
                        value={tab.id}
                    >
                        {tab.label}
                    </TabsPrimitives.TabsTrigger>
                ))}
            </TabsPrimitives.List>
            <Separator className="mt-0"/>
        
            {tabs.map(tab => (
                <TabsPrimitives.Content className="data-[state=inactive]:hidden" forceMount key={tab.id} value={tab.id}>
                    {tab.content}
                </TabsPrimitives.Content>
            ))}
        </TabsPrimitives.Root>
    )
}