import { Command, CommandInput } from "@workspace/ui/components/command"

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Hello World</h1>
        <Command>
          <CommandInput placeholder="Enter your name" />
        </Command>
      </div>
    </div>
  )
}
