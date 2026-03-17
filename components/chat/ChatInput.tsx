"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Loader2 } from "lucide-react"

interface ChatInputProps {
  onSend: (message: string) => void
  disabled?: boolean
  placeholder?: string
  inlineStyle?: boolean
}

export default function ChatInput({ onSend, disabled, placeholder, inlineStyle }: ChatInputProps) {
  const [value, setValue] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inlineStyle) return
    const el = textareaRef.current
    if (!el) return
    el.style.height = "auto"
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`
  }, [value, inlineStyle])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setValue("")
    if (inlineStyle) inputRef.current?.focus()
    else setTimeout(() => textareaRef.current?.focus(), 0)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey && !inlineStyle) {
      e.preventDefault()
      handleSubmit(e as unknown as React.FormEvent)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (inlineStyle && e.key === "Enter") {
      e.preventDefault()
      handleSubmit(e as unknown as React.FormEvent)
    }
  }

  if (inlineStyle) {
    return (
      <div>
        <form onSubmit={handleSubmit} className="flex gap-3 mb-2">
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={placeholder ?? "Ask Atlas anything about cars..."}
            disabled={disabled}
            className="flex-1 border-2 border-gray-200 focus:border-[var(--atlas-cyan)] focus:outline-none h-12 rounded-lg px-4 text-foreground placeholder:text-muted-foreground disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={disabled || !value.trim()}
            className="bg-[var(--atlas-cyan)] hover:opacity-90 px-6 h-12 rounded-lg text-white flex items-center justify-center disabled:opacity-40 transition-all shrink-0"
            aria-label="Send"
          >
            {disabled ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <Send size={20} />
            )}
          </button>
        </form>
        <p className="text-xs text-center text-gray-500 hidden sm:block">
          💬 Atlas responds in under 2 seconds • Powered by advanced AI
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 items-end">
      <div className="flex-1 flex items-end rounded-2xl border border-border bg-background focus-within:ring-2 focus-within:ring-primary/30 focus-within:border-primary transition-all">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder ?? "e.g. Show me Swift under 5 lakh in Mumbai"}
          disabled={disabled}
          rows={1}
          className="w-full min-h-[48px] max-h-[120px] resize-none rounded-2xl bg-transparent px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none disabled:opacity-50"
        />
      </div>
      <button
        type="submit"
        disabled={disabled || !value.trim()}
        className="shrink-0 h-[48px] w-[48px] rounded-2xl bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 disabled:opacity-40 transition-all shadow-sm"
        aria-label="Send"
      >
        {disabled ? (
          <Loader2 size={22} className="animate-spin" />
        ) : (
          <Send size={22} />
        )}
      </button>
    </form>
  )
}
