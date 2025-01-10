'use client'

import { Form, Separator } from "@workspace/ui/components/index"
import { MainSection } from "./sections/main"

export default function Page() {
  const onChange = (value: string) => {
    console.log({value})
  }

  return (
    <div className="flex items-center justify-center w-dvw h-dvh">
        <Form 
          title="SM | Saved Search Sync Settings"
          subtitle="All Transactions"
        >
          <MainSection />

          <Separator orientation="horizontal"/>
        </Form>
    </div>
  )
}
