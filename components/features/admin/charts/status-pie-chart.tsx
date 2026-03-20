"use client"

// 이벤트 상태 분포 파이 차트 컴포넌트
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { DUMMY_STATUS_DIST } from "@/lib/dummy"

export function StatusPieChart() {
  return (
    /* 고정 높이 컨테이너 — ResponsiveContainer 사용 요건 */
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={DUMMY_STATUS_DIST}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
          >
            {DUMMY_STATUS_DIST.map((entry, index) => (
              <Cell key={index} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
