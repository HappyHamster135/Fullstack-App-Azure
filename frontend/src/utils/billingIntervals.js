export const BILLING_INTERVALS = [
  { value: "Weekly", label: "Varje vecka", suffix: "/ vecka" },
  { value: "Monthly", label: "Varje månad", suffix: "/ mån" },
  { value: "Quarterly", label: "Varje kvartal", suffix: "/ kvartal" },
  { value: "Yearly", label: "Varje år", suffix: "/ år" },
];

export function intervalSuffix(value) {
  return (
    BILLING_INTERVALS.find((interval) => interval.value === value)?.suffix ?? ""
  );
}
