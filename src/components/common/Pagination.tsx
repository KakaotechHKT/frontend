import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink } from '@components/ui/pagination'
import LucideIcon from '@lib/provider/LucideIcon'

export type PaginationInfo = {
  elementPerSize: number
  currentPage: number
  totalPages: number
  totalElements: number
}

interface PaginationComponentProps {
  currentPage: number // 현재 페이지 번호 (1부터 시작)
  totalPages: number // 전체 페이지 수
  setPage: (page: number) => void // 페이지 변경 핸들러
}

const MAX_VISIBLE_PAGES = 5 // 표시할 최대 페이지 수
export function PaginationComponent({ currentPage, totalPages, setPage }: PaginationComponentProps) {
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
          <LucideIcon name='ChevronsLeft' onClick={() => setPage(1)} />
        </PaginationItem>

        {/* 이전(‹) 버튼 */}
        <PaginationItem>
          <LucideIcon name='ChevronLeft' onClick={currentPage !== 1 ? () => setPage(currentPage - 1) : undefined} />
        </PaginationItem>

        {/* 페이지 번호 렌더링 */}
        {getPageNumbers().map((page, index) => (
          <PaginationItem key={index}>
            {page === '...' ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink href='#' isActive={page === currentPage} onClick={() => setPage(Number(page))}>
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        {/* 처음(«) 버튼 */}
        <PaginationItem>
          <LucideIcon name='ChevronRight' onClick={() => setPage(currentPage + 1)} />
        </PaginationItem>

        {/* 이전(‹) 버튼 */}
        <PaginationItem>
          <LucideIcon name='ChevronsRight' onClick={currentPage !== totalPages ? () => setPage(totalPages) : undefined} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
