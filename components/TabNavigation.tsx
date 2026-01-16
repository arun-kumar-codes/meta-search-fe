"use client"

import { Plane, Hotel, Car } from "lucide-react"

interface TabNavigationProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function TabNavigation({ activeTab, setActiveTab }: TabNavigationProps) {
  const tabs = [
    { id: "cars", label: "Buy Cars", icon: Car },
    { id: "sellcars", label: "Sell Cars", icon: Car },
    { id: "cars", label: "Compare", icon: Car },
  ]

  return (
    <div className="flex gap-3 flex-wrap pb-1">
      {tabs.map((tab) => {
        const Icon = tab.icon
        const isActive = activeTab === tab.id

        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-4xl text-sm font-[500] cursor-pointer flex items-center gap-2 transition-all duration-200 ${
              isActive 
                ? "bg-blue-600 text-white" 
                : "text-white hover:opacity-80"
            }`}
          >
            <Icon size={20} />
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}
