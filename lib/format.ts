export function formatUah(amount: number): string {
  return new Intl.NumberFormat("uk-UA", {
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPrice(amount: number): string {
  return `${formatUah(amount)} ₴`;
}

export function formatInstallment(total: number, parts: number): string {
  const per = Math.round(total / parts);
  return `${parts} × ${formatUah(per)} ₴`;
}
