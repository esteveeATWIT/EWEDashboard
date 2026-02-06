export async function safeFetchJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, { ...init, next: { revalidate: 300 } });
  if (!response.ok) {
    throw new Error(`External API request failed with status ${response.status}`);
  }
  return (await response.json()) as T;
}
