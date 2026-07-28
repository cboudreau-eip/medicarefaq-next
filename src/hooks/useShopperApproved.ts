"use client";

import { useState, useEffect } from "react";

interface ShopperApprovedData {
  totalReviews: number;
  averageRating: number;
  stars: { 5: number; 4: number; 3: number; 2: number; 1: number };
}

// Fallback values shown while loading or if the API fails
const FALLBACK: ShopperApprovedData = {
  totalReviews: 3675,
  averageRating: 5.0,
  stars: { 5: 3550, 4: 110, 3: 12, 2: 1, 1: 2 },
};

// Module-level cache so multiple components share the same fetch
let cachedData: ShopperApprovedData | null = null;
let fetchPromise: Promise<ShopperApprovedData> | null = null;

function fetchShopperApproved(): Promise<ShopperApprovedData> {
  if (fetchPromise) return fetchPromise;

  fetchPromise = fetch("/api/shopper-approved")
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then((data: ShopperApprovedData) => {
      cachedData = data;
      return data;
    })
    .catch(() => {
      // On error, use fallback but don't cache it so we retry next time
      fetchPromise = null;
      return FALLBACK;
    });

  return fetchPromise;
}

/**
 * Hook that returns live Shopper Approved aggregate data.
 * Falls back to hardcoded values while loading or on error.
 */
export function useShopperApproved(): ShopperApprovedData {
  const [data, setData] = useState<ShopperApprovedData>(cachedData ?? FALLBACK);

  useEffect(() => {
    if (cachedData) {
      setData(cachedData);
      return;
    }

    fetchShopperApproved().then(setData);
  }, []);

  return data;
}
