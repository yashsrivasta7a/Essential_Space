"use client"
import { Expandable, ExpandableCard, ExpandableContent, ExpandableTrigger } from "../../"
import { cn } from "../../lib/utils"

interface CardProps {
  id: string
  title: string
  type: string
  link: string
  desc: string
  index: number
  refresh?: () => void
  className?: string
}

export function Card({ id, title, type, link, desc, index, refresh, className }: CardProps) {
  return (
    <Expandable transitionDuration={0.4} easeType="easeInOut" className={cn("w-full", className)}>
      <ExpandableCard
        collapsedSize={{ width: 320, height: 180 }}
        expandedSize={{ width: 400, height: 280 }}
        className="mx-auto"
      >
        {/* Always visible header content */}
        <div className="p-4">
          <ExpandableTrigger>
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h3 className="font-semibold text-lg text-gray-900 line-clamp-2">{title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {type}
                  </span>
                  <span className="text-sm text-gray-500">#{index + 1}</span>
                </div>
              </div>
              <div className="ml-2 flex-shrink-0">
                <svg
                  className="w-5 h-5 text-gray-400 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </ExpandableTrigger>

          {/* Expandable content */}
          <ExpandableContent preset="slide-up" className="mt-3">
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                >
                  View Details
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>

                {refresh && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      refresh()
                    }}
                    className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                    Refresh
                  </button>
                )}
              </div>
            </div>
          </ExpandableContent>
        </div>
      </ExpandableCard>
    </Expandable>
  )
}
