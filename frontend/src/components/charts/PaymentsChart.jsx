import {
  Bar,
  BarChart,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { formatCurrency, formatMonth } from "../../utils/format.js";
import { CHART_THEME } from "./chartTheme.js";

//------------
//-----Tooltip
//------------

function PaymentTooltip({ active, payload }) {
  if (!active || !payload?.length) {
    return null;
  }

  const row = payload[0].payload;

  return (
    <div className="bg-white border rounded shadow-sm px-2 py-1 small">
      <div className="fw-semibold">{formatCurrency(row.total)}</div>
      <div className="text-body-secondary">Betalt i {row.label}</div>
    </div>
  );
}

//----------
//-----Chart
//----------

function PaymentsChart({ data }) {
  const rows = data.map((item) => ({
    label: formatMonth(item.year, item.month),
    total: item.total,
  }));

  if (rows.every((row) => row.total === 0)) {
    return (
      <p className="text-body-secondary mb-0">
        Inga registrerade betalningar ännu. Använd ”Markera betald” på en
        prenumeration för att bygga upp historiken.
      </p>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={240}>
      <BarChart data={rows} margin={{ top: 28, right: 8, bottom: 0, left: 8 }}>
        <XAxis
          dataKey="label"
          axisLine={{ stroke: CHART_THEME.axis }}
          tickLine={false}
          tick={{ fill: CHART_THEME.muted, fontSize: CHART_THEME.fontSize }}
        />
        <Tooltip
          cursor={{ fill: CHART_THEME.hover }}
          content={<PaymentTooltip />}
        />
        <Bar
          dataKey="total"
          fill={CHART_THEME.bar}
          barSize={24}
          radius={[4, 4, 0, 0]}
          isAnimationActive={false}
        >
          <LabelList
            dataKey="total"
            position="top"
            formatter={(value) => (value > 0 ? formatCurrency(value) : "")}
            fill={CHART_THEME.text}
            fontSize={12}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export default PaymentsChart;
