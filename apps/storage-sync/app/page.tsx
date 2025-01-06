'use client'

import { Combobox } from "@workspace/ui/components/index"

const options = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
]

export default function Page() {
  const onChange = (value: string) => {
    console.log({value})
  }

  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4 w-96">
        <h1 className="text-2xl font-bold">Hello World</h1>
        <Combobox options={options} onValueChange={onChange}/>
        <Combobox options={options} onValueChange={onChange}/>
      </div>
    </div>
  )
}
