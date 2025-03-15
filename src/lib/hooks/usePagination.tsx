import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink } from '@components/ui/pagination'
import LucideIcon from '@lib/provider/LucideIcon'
import { cn } from '@lib/utils/utils'

export interface PaginationInfo {
  elementPerSize: number
  currentPage: number
  totalPages: number
  totalElements: number
}

const MAX_VISIBLE_PAGES = 5 // 표시할 최대 페이지 수

interface UsePaginationProps {
  currentPage: number
  totalPages: number // 전체 페이지 수
}

/**
 * URLParams를 기반으로 페이지네이션을 구현하는 컴포넌트
 * @totalPages 전체 페이지 개수
 * @returns
 */
export function usePagination({ currentPage, totalPages }: UsePaginationProps) {
  const router = useRouter()

  // 잘못된 페이지이면 첫 페이지로 이동
  useEffect(() => {
    if (currentPage <= 0 || currentPage > totalPages) {
      router.replace(`?page=1`)
    }
  }, [])

  const changePage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      router.push(`?page=${page}`)
    }
  }

  /**
   * 렌더링할 페이지네이션 컴포넌트
   */
  const PaginationComponent = () => {
    const getPageNumbers = () => {
      const pages = []

      /** 전체 페이지가 최대 페이지 수보다 작거나 같으면 모두 표시 */
      if (totalPages <= MAX_VISIBLE_PAGES) {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        /** 페이지가 많아서 화살표 표시 */
        if (currentPage <= 3) {
          // 1, 2, 3일 때 앞쪽을 유지
          pages.push(1, 2, 3, '...', totalPages)
        } else if (currentPage >= totalPages - 2) {
          // 마지막 3개 페이지일 때 뒤쪽을 유지
          pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages)
        } else {
          // 중간 페이지일 경우
          pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages)
        }
      }
      return pages
    }

    return (
      <Pagination>
        <PaginationContent>
          {/* 처음(«) 버튼 */}
          <PaginationItem>
            <LucideIcon name='ChevronsLeft' onClick={() => changePage(1)} />
          </PaginationItem>

          {/* 이전(‹) 버튼 */}
          <PaginationItem>
            <LucideIcon name='ChevronLeft' onClick={currentPage !== 1 ? () => changePage(currentPage - 1) : undefined} />
          </PaginationItem>

          {/* 페이지 번호 렌더링 */}
          {getPageNumbers().map((page, index) => (
            <PaginationItem key={index}>
              {page === '...' ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  isActive={page === currentPage}
                  onClick={() => changePage(Number(page))}
                  className={cn(page === currentPage && 'bg-rcKakaoYellow hover:bg-rcKakaoYellowHover', 'rounded-full')}
                >
                  {page}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          {/* 처음(«) 버튼 */}
          <PaginationItem>
            <LucideIcon name='ChevronRight' onClick={() => changePage(currentPage + 1)} />
          </PaginationItem>

          {/* 이전(‹) 버튼 */}
          <PaginationItem>
            <LucideIcon name='ChevronsRight' onClick={currentPage !== totalPages ? () => changePage(totalPages) : undefined} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
  }

  return {
    currentPage,
    totalPages,
    changePage,
    PaginationComponent,
  }
}
