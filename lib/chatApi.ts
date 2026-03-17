/**
 * Chat API client for the Atlas car-search chatbot.
 * Uses the backend POST /chat endpoint, which runs your own LLM via OpenRouter
 * (set OPENROUTER_API_KEY in the backend .env). Request/response shape:
 * POST { message, city?, listingIds?, conversationId? } -> { reply, listings?, listingIds? }.
 */

import type { CarListing } from './api'
import { searchAPI } from './api'

const getChatBaseUrl = (): string => {
  if (typeof window !== 'undefined') {
    return process.env.NEXT_PUBLIC_CHAT_API_URL || process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3377'
  }
  return process.env.NEXT_PUBLIC_CHAT_API_URL || process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3377'
}

const getChatEndpoint = (): string => {
  const base = getChatBaseUrl().replace(/\/$/, '')
  return `${base}/chat`
}

export interface ChatResponse {
  reply: string
  listings?: CarListing[]
  listingIds?: string[]
}

export interface ChatHistoryMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface SendMessageParams {
  message: string
  conversationId?: string
  listingIds?: string[]
  city?: string
  /** Last N messages for context (e.g. up to 20). Sent to backend for LLM continuity. */
  history?: ChatHistoryMessage[]
}

const MOCK_REPLY =
  "Connect your chat API (e.g. clawdbot on VM) to get real answers and car suggestions here. Until then, use **manual search** below to find cars by filters."

/**
 * Sends a user message to the chat API and returns the bot reply plus optional listing data.
 * If NEXT_PUBLIC_CHAT_API_URL (or backend) is not set or the request fails, returns a mock response so UI works.
 * When you deploy your VM: set NEXT_PUBLIC_CHAT_API_URL to the VM chat URL and this will call it.
 */
export async function sendChatMessage(params: SendMessageParams): Promise<ChatResponse> {
  const { message, conversationId, listingIds, city, history } = params
  const url = getChatEndpoint()

  try {
    const body: Record<string, unknown> = { message }
    if (conversationId) body.conversationId = conversationId
    if (listingIds?.length) body.listingIds = listingIds
    if (city) body.city = city
    if (history?.length) body.history = history

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      const text = await res.text()
      throw new Error(text || `Chat API error ${res.status}`)
    }

    const data = (await res.json()) as ChatResponse
    let listings = data.listings ?? []

    if (listings.length === 0 && (data.listingIds?.length ?? 0) > 0) {
      listings = await searchAPI.getListingsByIds(data.listingIds!)
    }

    return {
      reply: data.reply ?? '',
      listings: listings.length > 0 ? listings : undefined,
      listingIds: data.listingIds,
    }
  } catch (_err) {
    return {
      reply: MOCK_REPLY,
      listings: undefined,
    }
  }
}
