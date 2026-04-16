// Charli3 Oracle Service
// REST API: https://api.charli3.io/api/v1
// Auth: Authorization: Bearer YOUR_API_KEY
// Falls back to mock data when API key is absent or call fails.

const MOCK_ADA_PRICE = 0.387;
const MOCK_MIN_PRICE = 0.024;
const CACHE_TTL_MS = 30_000;

// ADA/USD Feed — Cardano Preprod Testnet
// Source: docs.charli3.io/oracles/resources/networks/preprod
export const ORACLE_CONTRACT_ADDRESS =
  import.meta.env.VITE_ORACLE_CONTRACT_ADDRESS ??
  "addr_test1wzn5ee2qaqvly3hx7e0nk3vhm240n5muq3plhjcnvx9ppjgf62u6a";

export const ORACLE_FEED_POLICY_ID =
  "1116903479e7320b8e4592207aaebf627898267fcd80e2d9646cbf07";

// MIN token policy ID on Cardano (Minswap governance token)
const MIN_POLICY_ID =
  "29d222ce763455e3d7a09a665ce554f00ac89d2e99a1a83d267170c6";

export interface OraclePrices {
  adaPrice: number;
  minPrice: number;
  isLive: boolean;
  fetchedAt: Date;
}

interface CacheEntry {
  data: OraclePrices;
  expiresAt: number;
}

interface Charli3CurrentResponse {
  s: string;
  d?: { price?: number; close?: number };
  price?: number;
  close?: number;
}

let cache: CacheEntry | null = null;

const BASE_URL =
  import.meta.env.VITE_CHARLI3_BASE_URL ?? "https://api.charli3.io/api/v1";
const API_KEY = import.meta.env.VITE_CHARLI3_API_KEY ?? "";

function hasRealKey(): boolean {
  return Boolean(API_KEY) && API_KEY !== "your_api_key_here";
}

async function fetchWithAuth(url: string): Promise<Response> {
  return fetch(url, {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
  });
}

function extractPrice(data: Charli3CurrentResponse): number | null {
  // Handle multiple possible response shapes
  const raw =
    data?.d?.price ??
    data?.d?.close ??
    data?.price ??
    data?.close ??
    null;
  if (raw === null || raw === undefined) return null;
  const num = Number(raw);
  return isFinite(num) && num > 0 ? num : null;
}

export async function fetchADAPrice(): Promise<number> {
  if (!hasRealKey()) return MOCK_ADA_PRICE;
  try {
    // ADA is Cardano-native; use "ADA" as the symbol identifier
    const res = await fetchWithAuth(`${BASE_URL}/tokens/current?policy=ADA`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data: Charli3CurrentResponse = await res.json();
    if (data.s !== "ok") throw new Error("API returned non-ok status");
    return extractPrice(data) ?? MOCK_ADA_PRICE;
  } catch {
    return MOCK_ADA_PRICE;
  }
}

export async function fetchMINPrice(): Promise<number> {
  if (!hasRealKey()) return MOCK_MIN_PRICE;
  try {
    const res = await fetchWithAuth(
      `${BASE_URL}/tokens/current?policy=${MIN_POLICY_ID}`
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data: Charli3CurrentResponse = await res.json();
    if (data.s !== "ok") throw new Error("API returned non-ok status");
    return extractPrice(data) ?? MOCK_MIN_PRICE;
  } catch {
    return MOCK_MIN_PRICE;
  }
}

export async function fetchAllPrices(): Promise<OraclePrices> {
  const now = Date.now();
  if (cache && cache.expiresAt > now) return cache.data;

  let adaPrice = MOCK_ADA_PRICE;
  let minPrice = MOCK_MIN_PRICE;
  let isLive = false;

  if (hasRealKey()) {
    try {
      [adaPrice, minPrice] = await Promise.all([
        fetchADAPrice(),
        fetchMINPrice(),
      ]);
      isLive = true;
    } catch {
      isLive = false;
    }
  }

  const result: OraclePrices = {
    adaPrice,
    minPrice,
    isLive,
    fetchedAt: new Date(),
  };
  cache = { data: result, expiresAt: now + CACHE_TTL_MS };
  return result;
}
