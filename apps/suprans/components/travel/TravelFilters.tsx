"use client"

import type { TravelFilter } from "@/lib/types/travel"

interface TravelFiltersProps {
  activeFilter: TravelFilter
  onFilterChange: (filter: TravelFilter) => void
}

const filters: TravelFilter[] = ['All', 'Canton Fair', 'Market Tours', 'Factory Visits']

export function TravelFilters({ activeFilter, onFilterChange }: TravelFiltersProps) {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-12">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
            activeFilter === filter
              ? 'bg-red-600 text-white shadow-lg'
              : 'bg-white border border-gray-200 text-gray-700 hover:border-red-600/50'
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  )
}


