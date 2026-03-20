"use client"

// 관리자 이벤트 관리 페이지 — 검색/필터/삭제 기능 포함
import { useState } from "react"
import { Search, Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { searchEvents } from "@/lib/dummy"
import type { GatherEvent } from "@/lib/types"

// 날짜 포맷 헬퍼 함수
function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("ko-KR", { year: "numeric", month: "short", day: "numeric" })
}

// 이벤트 상태 한국어 레이블
const statusLabel: Record<string, string> = {
  upcoming: "예정",
  ongoing: "진행중",
  ended: "종료",
}

// 이벤트 상태별 Badge 스타일 클래스
const statusClass: Record<string, string> = {
  upcoming: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  ongoing: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  ended: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
}

export default function AdminEventsPage() {
  // 검색어 상태
  const [query, setQuery] = useState("")
  // 상태 필터 상태 (all / upcoming / ongoing / ended)
  const [statusFilter, setStatusFilter] = useState("all")
  // 로컬 삭제를 위한 이벤트 목록 상태
  const [events, setEvents] = useState<GatherEvent[]>(() => searchEvents("", "all"))

  // 현재 검색/필터 조건에 맞는 이벤트 목록 계산
  const filteredEvents = events.filter(e => {
    const matchesQuery =
      !query ||
      e.title.toLowerCase().includes(query.toLowerCase()) ||
      e.location.toLowerCase().includes(query.toLowerCase())
    const matchesStatus = statusFilter === "all" || e.status === statusFilter
    return matchesQuery && matchesStatus
  })

  // TODO: 실제 삭제 API 연동 필요 — 현재는 로컬 state에서 제거
  const handleDelete = (id: string) => {
    setEvents(prev => prev.filter(e => e.id !== id))
  }

  return (
    <div className="p-8 space-y-6">
      {/* 페이지 헤더 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">이벤트 관리</h1>
          <p className="text-muted-foreground mt-1">
            총 <span className="font-semibold text-foreground">{events.length}</span>개 이벤트
          </p>
        </div>
      </div>

      {/* 검색 및 필터 영역 */}
      <div className="flex items-center gap-3">
        {/* 검색 Input — Search 아이콘 포함 */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="이벤트명 또는 장소 검색..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* 상태 필터 Select */}
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="상태 필터" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체 상태</SelectItem>
            <SelectItem value="upcoming">예정</SelectItem>
            <SelectItem value="ongoing">진행중</SelectItem>
            <SelectItem value="ended">종료</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 이벤트 테이블 */}
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr className="border-b text-left text-muted-foreground">
              <th className="px-4 py-3 font-medium">이벤트명</th>
              <th className="px-4 py-3 font-medium">상태</th>
              <th className="px-4 py-3 font-medium">날짜</th>
              <th className="px-4 py-3 font-medium">장소</th>
              <th className="px-4 py-3 font-medium">참여자</th>
              <th className="px-4 py-3 font-medium">액션</th>
            </tr>
          </thead>
          <tbody className="divide-y bg-background">
            {filteredEvents.length === 0 ? (
              /* 검색 결과 없음 빈 상태 */
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-muted-foreground">
                  검색 조건에 맞는 이벤트가 없습니다.
                </td>
              </tr>
            ) : (
              filteredEvents.map(event => (
                <tr key={event.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium max-w-xs truncate">{event.title}</td>
                  <td className="px-4 py-3">
                    {/* 상태 배지 (span으로 직접 스타일링) */}
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${statusClass[event.status]}`}>
                      {statusLabel[event.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                    {formatDate(event.eventDate)}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground max-w-[180px] truncate">
                    {event.location}
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {event.participantCount ?? 0}명
                  </td>
                  <td className="px-4 py-3">
                    {/* 삭제 버튼 — AlertDialog 확인 후 삭제 */}
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          aria-label={`${event.title} 삭제`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>이벤트 삭제</AlertDialogTitle>
                          <AlertDialogDescription>
                            &quot;{event.title}&quot; 이벤트를 삭제하시겠습니까?
                            삭제된 이벤트는 복구할 수 없습니다.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>취소</AlertDialogCancel>
                          <AlertDialogAction
                            variant="destructive"
                            onClick={() => handleDelete(event.id)}
                          >
                            삭제
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
