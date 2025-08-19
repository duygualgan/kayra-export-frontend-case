export const fetcher = async <T,>(url: string): Promise<T> => {
  const res = await fetch(url)
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Network error: ${res.status} ${text}`)
  }
  return res.json() as Promise<T>
}
