"use client"

import SearchForm from "@/components/SearchForm"

interface SearchSectionProps {
  activeTab: string
}

export default function SearchSection({ activeTab }: SearchSectionProps) {
  return (
    <section className="bg-[#05203C] px-4 md:px-8 pb-16 pt-4">
      <div className="max-w-7xl mx-auto">
        <SearchForm activeTab={activeTab} />
      </div>
    </section>
  )
}
