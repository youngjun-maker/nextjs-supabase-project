// 관리자 대시보드 페이지 — KPI 4개 + 최근 이벤트 테이블
import Link from "next/link"
import { Calendar, Users, TrendingUp, Activity } from "lucide-react"
import { StatCard } from "@/components/features/admin/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getAdminDashboardStats, DUMMY_ALL_EVENTS_ADMIN } from "@/lib/dummy"

// 날짜 포맷 헬퍼 함수
function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("ko-KR", { month: "long", day: "numeric" })
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

export default function AdminDashboardPage() {
  const stats = getAdminDashboardStats()
  // 최근 5개 이벤트만 표시
  const recentEvents = DUMMY_ALL_EVENTS_ADMIN.slice(0, 5)

  return (
    <div className="p-8 space-y-8">
      {/* 페이지 헤더 */}
      <div>
        <h1 className="text-2xl font-bold">대시보드</h1>
        <p className="text-muted-foreground mt-1">플랫폼 현황을 한눈에 확인하세요</p>
      </div>

      {/* KPI 통계 카드 4개 */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard
          title="총 이벤트"
          value={stats.totalEvents}
          description="전체 이벤트 수"
          icon={Calendar}
          iconColor="text-emerald-500"
        />
        <StatCard
          title="총 사용자"
          value={stats.totalUsers}
          description="가입된 사용자 수"
          icon={Users}
          iconColor="text-blue-500"
        />
        <StatCard
          title="이번 달 신규"
          value={stats.newThisMonth}
          description="3월 신규 이벤트"
          icon={TrendingUp}
          iconColor="text-purple-500"
        />
        <StatCard
          title="활성 이벤트"
          value={stats.activeEvents}
          description="현재 진행 중"
          icon={Activity}
          iconColor="text-orange-500"
        />
      </div>

      {/* 최근 이벤트 테이블 */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">최근 이벤트</CardTitle>
          <Link href="/admin/events" className="text-sm text-emerald-600 hover:underline">
            전체 보기 →
          </Link>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="pb-3 font-medium">이벤트명</th>
                  <th className="pb-3 font-medium">상태</th>
                  <th className="pb-3 font-medium">날짜</th>
                  <th className="pb-3 font-medium">참여자</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {recentEvents.map(event => (
                  <tr key={event.id} className="hover:bg-muted/50">
                    <td className="py-3 font-medium">{event.title}</td>
                    <td className="py-3">
                      {/* 상태 배지 */}
                      <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${statusClass[event.status]}`}>
                        {statusLabel[event.status]}
                      </span>
                    </td>
                    <td className="py-3 text-muted-foreground">{formatDate(event.eventDate)}</td>
                    <td className="py-3 text-muted-foreground">{event.participantCount}명</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
