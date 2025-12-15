export async function getBookRecommendations(query: string, excludeTitles: string[] = []) {
  const r = await fetch("/api/recommend", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, excludeTitles }),
  });

  if (!r.ok) {
    const j = await r.json().catch(() => ({}));
    throw new Error(j?.error || `API error ${r.status}`);
  }

  const j = await r.json();
  // 서버가 { ok:true, data: ... } 형태로 줌
  // data가 JSON 배열이면 그대로 반환
  if (Array.isArray(j.data)) return j.data;
  // 파싱 실패로 raw가 왔을 경우
  if (j.data?.raw) throw new Error("모델 응답 파싱 실패(서버 raw 반환)");
  return j.data;
}
