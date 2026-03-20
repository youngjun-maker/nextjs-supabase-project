"use client"

// 관리자 통계 분석 페이지 — KPI 3개 + Recharts 차트 3개
import { Calendar, Users, Activity } from "lucide-react"
import { StatCard } from "@/components/features/admin/stat-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { EventTrendChart } from "@/components/features/admin/charts/event-trend-chart"
import { StatusPieChart } from "@/components/features/admin/charts/status-pie-chart"
import { UserTrendChart } from "@/components/features/admin/charts/user-trend-chart"
import { getAdminDashboardStats } from "@/lib/dummy"

export default function AdminAnalyticsPage() {
  const stats = getAdminDashboardStats()

  return (
    <div className="p-8 space-y-8">
      {/* 페이지 헤더 */}
      <div>
        <h1 className="text-2xl font-bold">통계 분석</h1>
        <p className="text-muted-foreground mt-1">이벤트 생성 추이와 사용자 증가 추이를 확인합니다</p>
      </div>

      {/* KPI 통계 카드 3개 */}
      <div className="grid grid-cols-3 gap-4">
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
          title="활성 이벤트"
          value={stats.activeEvents}
          description="현재 진행 중"
          icon={Activity}
          iconColor="text-orange-500"
        />
      </div>

      {/* 차트 2열 그리드 */}
      <div className="grid grid-cols-2 gap-6">
        {/* 월별 이벤트 생성 추이 라인 차트 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">월별 이벤트 생성 추이</CardTitle>
          </CardHeader>
          <CardContent>
            <EventTrendChart />
          </CardContent>
        </Card>

        {/* 이벤트 상태 분포 파이 차트 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">이벤트 상태 분포</CardTitle>
          </CardHeader>
          <CardContent>
            <StatusPieChart />
          </CardContent>
        </Card>
      </div>

      {/* 사용자 가입 추이 바 차트 — 전체 너비 */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-base">사용자 가입 추이</CardTitle>
        </CardHeader>
        <CardContent>
          <UserTrendChart />
        </CardContent>
      </Card>
    </div>
  )
}
