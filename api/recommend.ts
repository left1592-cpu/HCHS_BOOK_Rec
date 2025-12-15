import type { VercelRequest, VercelResponse } from "@vercel/node";
import { GoogleGenerativeAI } from "@google/generative-ai";

// 캐시: 같은 질문은 10분 동안 재사용 (요청 절감)
const cache = new Map<string, { exp: number; data: any }>();

// 간단 레이트리밋: IP당 60초에 3회 (연타/폭주 완화)
const ipHits = new Map<string, { windowStart: number; count: number }>();

function getClientIp(req: VercelRequest) {
  const xf = req.headers["x-forwarded-for"];
  const ip = (Array.isArray(xf) ? xf[0] : xf)?.split(",")[0]?.trim();
  return ip || req.socket.remoteAddress || "unknown";
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method Not Allowed" });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "GEMINI_API_KEY missing on server" });

  const ip = getClientIp(req);
  const now = Date.now();

  // 레이트리밋(초간단)
  const windowMs = 60_000;
  const limit = 3;
  const hit = ipHits.get(ip);
  if (!hit || now - hit.windowStart > windowMs) {
    ipHits.set(ip, { windowStart: now, count: 1 });
  } else {
    hit.count += 1;
    if (hit.count > limit) {
      return res.status(429).json({ error: "요청이 너무 많습니다. 1분 후 다시 시도하세요." });
    }
  }

  const { query, excludeTitles } = req.body || {};
  if (!query || typeof query !== "string") return res.status(400).json({ error: "query is required" });

  // 캐시 키(검색어 + 제외목록)
  const key = JSON.stringify({
    q: query.trim(),
    ex: Array.isArray(excludeTitles) ? excludeTitles : [],
  });

  const cached = cache.get(key);
  if (cached && cached.exp > now) return res.status(200).json(cached.data);

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = [
      `다음 입력에 대해 고등학생 독서활동에 활용 가능한 도서를 추천해줘.`,
      `입력: ${query}`,
      Array.isArray(excludeTitles) && excludeTitles.length
        ? `이미 추천된 도서 제목(중복 금지): ${excludeTitles.join(", ")}`
        : "",
      `출력은 JSON 배열로만. 각 항목은 {"title":"...","author":"...","reason":"...","keywords":["..."]}`,
    ]
      .filter(Boolean)
      .join("\n");

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    let data: any;
    try {
      data = JSON.parse(text);
    } catch {
      return res.status(502).json({ error: "응답 파싱 실패(모델이 JSON만 주지 않음)", raw: text });
    }

    const payload = { ok: true, data };

    // 캐시 TTL 10분
    cache.set(key, { exp: now + 10 * 60_000, data: payload });

    return res.status(200).json(payload);
  } catch (e: any) {
    const msg = String(e?.message ?? e);
    if (msg.includes("429") || msg.includes("RESOURCE_EXHAUSTED")) {
      return res.status(429).json({ error: "Gemini 제한(429)입니다. 잠시 후 다시 시도하세요." });
    }
    return res.status(500).json({ error: "Gemini 호출 실패", detail: msg });
  }
}
