"use client"

import type React from "react"

interface CheckboxOptionProps {
  label: string
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function CheckboxOption({ label, checked, onChange }: CheckboxOptionProps) {
  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-5 h-5 rounded border-2 border-gray-400 cursor-pointer accent-blue-600"
      />
      <span className="text-slate-900 font-medium text-sm">{label}</span>
    </label>
  )
}
