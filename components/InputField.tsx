"use client"

import type React from "react"

interface InputFieldProps {
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  placeholder?: string
}

export default function InputField({ label, value, onChange, placeholder }: InputFieldProps) {
  return (
    <div className="flex flex-col">
      <label className="text-slate-900 font-semibold text-sm mb-2">{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 transition bg-white text-slate-900 placeholder-gray-400"
      />
    </div>
  )
}
