// /lib/fetchWithLimit.ts
export async function fetchWithLimit(url: string, options?: RequestInit) {
  const res = await fetch(url, options);

  if (res.status === 429) {
    const data = await res.json();
    if (data.paymentRequired && data.redirectToPricing) {
      window.location.href = data.redirectToPricing;
      return;
    }
  }

  return res.json();
}
