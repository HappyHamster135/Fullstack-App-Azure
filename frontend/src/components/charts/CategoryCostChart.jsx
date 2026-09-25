import {
  Bar,
  BarChart,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatCurrency } from "../../utils/format.js";
import { CHART_THEME } from "./chartTheme.js";

const AXIS_WIDTH = 150;
const ROW_HEIGHT = 44;
const MAX_LABEL_LENGTH = 18;

//---------------
//-----Axis label
//---------------

function CategoryTick({ y, payload, index, rows }) {
  const name = payload.value;
  const label =
    name.length > MAX_LABEL_LENGTH
      ? `${name.slice(0, MAX_LABEL_LENGTH - 1)}…`
      : name;

  return (
    <g>
      <circle cx={6} cy={y} r={5} fill={rows[index]?.color} />
      <text
        x={18}
        y={y}
        dy="0.35em"
        fill={CHART_THEME.text}
        fontSize={CHART_THEME.fontSize}
      >
        {label}
      </text>
    </g>
  );
}

//------------
//-----Tooltip
//------------

function CategoryTooltip({ active, payload }) {
  if (!active || !payload?.length) {
    return null;
  }

  const row = payload[0].payload;

  return (
    <div className="bg-white border rounded shadow-sm px-2 py-1 small">
      <div className="fw-semibold">{formatCurrency(row.monthlyCost)} / mån</div>
      <div className="text-body-secondary">
        {row.name} · {row.count} st
      </div>
    </div>
  );
}

//----------
//-----Chart
//----------

function CategoryCostChart({ data }) {
  const rows = data.map((item) => ({
    name: item.category.name,
    color: item.category.color,
    monthlyCost: item.monthlyCost,
    count: item.subscriptionCount,
  }));

  return (
    <ResponsiveContainer width="100%" height={rows.length * ROW_HEIGHT + 8}>
      <BarChart
        data={rows}
        layout="vertical"
        margin={{ top: 4, right: 80, bottom: 4, left: 0 }}
      >
        <XAxis type="number" hide />
        <YAxis
          type="category"
          dataKey="name"
          width={AXIS_WIDTH}
          axisLine={false}
          tickLine={false}
          tick={<CategoryTick rows={rows} />}
        />
        <Tooltip
          cursor={{ fill: CHART_THEME.hover }}
          content={<CategoryTooltip />}
        />
        <Bar
          dataKey="monthlyCost"
          fill={CHART_THEME.bar}
          barSize={20}
          radius={[0, 4, 4, 0]}
          isAnimationActive={false}
        >
          <LabelList
            dataKey="monthlyCost"
            position="right"
            formatter={formatCurrency}
            fill={CHART_THEME.text}
            fontSize={CHART_THEME.fontSize}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export default CategoryCostChart;
