export default function ProgressRing({ percent, size = 96 }) {
  const stroke = 8
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const mid = size / 2

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label={`Yüzde ${percent} tamamlandı`}
    >
      <circle cx={mid} cy={mid} r={r} fill="none" strokeWidth={stroke} className="stroke-line" />
      <circle
        cx={mid}
        cy={mid}
        r={r}
        fill="none"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - percent / 100)}
        transform={`rotate(-90 ${mid} ${mid})`}
        className="stroke-flame transition-all duration-500"
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="central"
        className="fill-fg font-display text-xl font-semibold"
      >
        %{percent}
      </text>
    </svg>
  )
}
