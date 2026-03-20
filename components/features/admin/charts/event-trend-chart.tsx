"use client"

// 월별 이벤트 생성 추이 라인 차트 컴포넌트
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { DUMMY_MONTHLY_EVENTS } from "@/lib/dummy"

export function EventTrendChart() {
  return (
    /* 고정 높이 컨테이너 — ResponsiveContainer 사용 요건 */
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={DUMMY_MONTHLY_EVENTS}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#10b981"
            strokeWidth={2}
            dot={{ fill: "#10b981" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
