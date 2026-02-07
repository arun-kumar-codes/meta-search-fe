"use client"

import React, { createContext, useContext, useState, useCallback, useEffect } from "react"
import { userAuthAPI, usersAPI, type UserProfile } from "@/lib/api"

const USER_TOKEN_KEY = "user_token"
const USER_PROFILE_KEY = "user_profile"

type UserContextType = {
  user: UserProfile | null
  isLoading: boolean
  login: (phone: string, otp: string) => Promise<{ success: boolean; error?: string }>
  sendOtp: (phone: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  refreshProfile: () => Promise<void>
}

const UserContext = createContext<UserContextType | null>(null)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const refreshProfile = useCallback(async () => {
    const token = typeof window !== "undefined" ? localStorage.getItem(USER_TOKEN_KEY) : null
    if (!token) {
      setUser(null)
      return
    }
    try {
      const profile = await usersAPI.getPreferences()
      setUser(profile)
      if (typeof window !== "undefined") {
        localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile))
      }
    } catch {
      setUser(null)
      if (typeof window !== "undefined") {
        localStorage.removeItem(USER_TOKEN_KEY)
        localStorage.removeItem(USER_PROFILE_KEY)
      }
    }
  }, [])

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem(USER_TOKEN_KEY) : null
    const stored = typeof window !== "undefined" ? localStorage.getItem(USER_PROFILE_KEY) : null
    if (token && stored) {
      try {
        setUser(JSON.parse(stored))
      } catch {
        setUser(null)
      }
    } else {
      setUser(null)
    }
    setIsLoading(false)
  }, [])

  const sendOtp = useCallback(async (phone: string) => {
    try {
      await userAuthAPI.sendOtp(phone)
      return { success: true }
    } catch (err: any) {
      const message = err.response?.data?.message || err.message || "Failed to send OTP"
      return { success: false, error: message }
    }
  }, [])

  const login = useCallback(async (phone: string, otp: string) => {
    try {
      const { accessToken, user: profile } = await userAuthAPI.verifyOtp(phone, otp)
      if (typeof window !== "undefined") {
        localStorage.setItem(USER_TOKEN_KEY, accessToken)
        localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile))
      }
      setUser(profile)
      return { success: true }
    } catch (err: any) {
      const message = err.response?.data?.message || err.message || "Invalid OTP"
      return { success: false, error: message }
    }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    if (typeof window !== "undefined") {
      localStorage.removeItem(USER_TOKEN_KEY)
      localStorage.removeItem(USER_PROFILE_KEY)
    }
  }, [])

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        login,
        sendOtp,
        logout,
        refreshProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const ctx = useContext(UserContext)
  if (!ctx) {
    throw new Error("useUser must be used within UserProvider")
  }
  return ctx
}
