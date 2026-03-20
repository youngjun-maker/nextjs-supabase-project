"use client"

// 월별 사용자 가입 추이 바 차트 컴포넌트
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { DUMMY_MONTHLY_USERS } from "@/lib/dummy"

export function UserTrendChart() {
  return (
    /* 고정 높이 컨테이너 — ResponsiveContainer 사용 요건 */
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={DUMMY_MONTHLY_USERS}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
