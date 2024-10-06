'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function SelectExample() {
  return (
    <div className="w-full max-w-xs mx-auto">
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="cherry">Cherry</SelectItem>
          <SelectItem value="dragonfruit">Dragonfruit</SelectItem>
          <SelectItem value="elderberry">Elderberry</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}