"use client"

// 관리자 사용자 관리 페이지 — 검색/역할 필터 기능 포함
import { useState } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar"
import { searchUsers } from "@/lib/dummy"
import type { AppUser } from "@/lib/types"

// 날짜 포맷 헬퍼 함수
function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("ko-KR", { year: "numeric", month: "short", day: "numeric" })
}

// 역할 한국어 레이블
const roleLabel: Record<string, string> = {
  admin: "관리자",
  user: "일반 사용자",
}

// 역할별 Badge 스타일 클래스
const roleClass: Record<string, string> = {
  admin: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  user: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
}

export default function AdminUsersPage() {
  // 검색어 상태
  const [query, setQuery] = useState("")
  // 역할 필터 상태 (all / user / admin)
  const [roleFilter, setRoleFilter] = useState("all")

  // 현재 검색/필터 조건에 맞는 사용자 목록 계산
  const allUsers: AppUser[] = searchUsers("", "all")
  const filteredUsers = allUsers.filter(u => {
    const matchesQuery =
      !query ||
      u.name.toLowerCase().includes(query.toLowerCase()) ||
      u.email.toLowerCase().includes(query.toLowerCase())
    const matchesRole = roleFilter === "all" || u.role === roleFilter
    return matchesQuery && matchesRole
  })

  return (
    <div className="p-8 space-y-6">
      {/* 페이지 헤더 */}
      <div>
        <h1 className="text-2xl font-bold">사용자 관리</h1>
        <p className="text-muted-foreground mt-1">
          총 <span className="font-semibold text-foreground">{allUsers.length}</span>명 사용자
        </p>
      </div>

      {/* 검색 및 필터 영역 */}
      <div className="flex items-center gap-3">
        {/* 검색 Input — Search 아이콘 포함 */}
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="이름 또는 이메일 검색..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* 역할 필터 Select */}
        <Select value={roleFilter} onValueChange={setRoleFilter}>
          <SelectTrigger className="w-36">
            <SelectValue placeholder="역할 필터" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">전체</SelectItem>
            <SelectItem value="user">일반 사용자</SelectItem>
            <SelectItem value="admin">관리자</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* 사용자 테이블 */}
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr className="border-b text-left text-muted-foreground">
              <th className="px-4 py-3 font-medium">사용자</th>
              <th className="px-4 py-3 font-medium">이메일</th>
              <th className="px-4 py-3 font-medium">역할</th>
              <th className="px-4 py-3 font-medium">가입일</th>
            </tr>
          </thead>
          <tbody className="divide-y bg-background">
            {filteredUsers.length === 0 ? (
              /* 검색 결과 없음 빈 상태 */
              <tr>
                <td colSpan={4} className="px-4 py-12 text-center text-muted-foreground">
                  검색 조건에 맞는 사용자가 없습니다.
                </td>
              </tr>
            ) : (
              filteredUsers.map(user => (
                <tr key={user.id} className="hover:bg-muted/30 transition-colors">
                  {/* 사용자 컬럼 — Avatar + 이름 */}
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar size="default">
                        <AvatarFallback>
                          {/* 이름 첫 글자 표시 */}
                          {user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{user.email}</td>
                  <td className="px-4 py-3">
                    {/* 역할 배지 (span으로 직접 스타일링) */}
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${roleClass[user.role]}`}>
                      {roleLabel[user.role]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">
                    {formatDate(user.createdAt)}
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
