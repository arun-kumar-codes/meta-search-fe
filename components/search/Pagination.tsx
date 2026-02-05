"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

interface PaginationProps {
  currentPage: number
  totalPages: number
  total: number
  limit: number
}

export default function Pagination({ currentPage, totalPages, total, limit }: PaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const updatePage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return

    const params = new URLSearchParams(searchParams.toString())
    params.set("page", newPage.toString())
    router.push(`/search?${params.toString()}`)
  }

  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)

      if (currentPage <= 3) {
        // Near the start
        for (let i = 2; i <= 4; i++) {
          pages.push(i)
        }
        pages.push("...")
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        // Near the end
        pages.push("...")
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        // In the middle
        pages.push("...")
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push("...")
        pages.push(totalPages)
      }
    }

    return pages
  }

  if (totalPages <= 1) return null

  const startItem = (currentPage - 1) * limit + 1
  const endItem = Math.min(currentPage * limit, total)

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-8 pt-8 border-t border-gray-200">
      <div className="text-sm text-gray-600">
        Showing <span className="font-bold text-gray-900">{startItem}</span> to{" "}
        <span className="font-bold text-gray-900">{endItem}</span> of{" "}
        <span className="font-bold text-gray-900">{total}</span> results
      </div>

      <div className="flex items-center gap-2">
        {/* Previous Button */}
        <button
          onClick={() => updatePage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-[#ED264F] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-300 transition-all flex items-center gap-1 font-semibold text-gray-700 hover:text-[#ED264F]"
        >
          <ChevronLeft size={18} />
          <span className="hidden sm:inline">Previous</span>
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-2">
          {getPageNumbers().map((page, index) => {
            if (page === "...") {
              return (
                <span key={`ellipsis-${index}`} className="px-3 text-gray-400 font-semibold">
                  ...
                </span>
              )
            }

            const pageNum = page as number
            const isActive = pageNum === currentPage

            return (
              <button
                key={pageNum}
                onClick={() => updatePage(pageNum)}
                className={`px-4 py-2 rounded-xl transition-all font-semibold ${
                  isActive
                    ? "bg-gradient-to-r from-[#ED264F] to-[#FF6B9D] text-white shadow-md hover:shadow-lg transform hover:scale-105"
                    : "border-2 border-gray-300 hover:border-[#ED264F] hover:bg-gray-50 text-gray-700 hover:text-[#ED264F]"
                }`}
              >
                {pageNum}
              </button>
            )
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={() => updatePage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 border-2 border-gray-300 rounded-xl hover:bg-gray-50 hover:border-[#ED264F] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:border-gray-300 transition-all flex items-center gap-1 font-semibold text-gray-700 hover:text-[#ED264F]"
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  )
}
