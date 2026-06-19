"use client";

const CURRENT_ACCOUNT_STORAGE_KEY = "ableton-shop-current-account";
const ACCOUNT_ORDER_STORAGE_PREFIX = "ableton-shop-orders:";

export type LocalOrderLine = {
  title: string;
  option?: string;
  quantity: number;
  lineTotal: number;
};

export type LocalOrder = {
  id: string;
  date: string;
  reference: string;
  products: string;
  hasRentToOwn?: boolean;
  subtotal: number;
  estimated: number;
  taxEstimate: number;
  total: number;
  lines: LocalOrderLine[];
};

const normalizeAccountId = (value: string) => value.trim().toLowerCase();

const accountOrderStorageKey = (accountId: string) =>
  `${ACCOUNT_ORDER_STORAGE_PREFIX}${encodeURIComponent(accountId)}`;

export function setCurrentAccount(accountId: string) {
  if (typeof window === "undefined") return;
  const normalized = normalizeAccountId(accountId);
  if (!normalized) return;
  window.localStorage.setItem(CURRENT_ACCOUNT_STORAGE_KEY, normalized);
}

export function getCurrentAccount() {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(CURRENT_ACCOUNT_STORAGE_KEY) ?? "";
}

export function clearCurrentAccount() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(CURRENT_ACCOUNT_STORAGE_KEY);
}

export function getAccountOrders(accountId = getCurrentAccount()): LocalOrder[] {
  const normalized = normalizeAccountId(accountId);
  if (!normalized) return [];
  if (typeof window === "undefined") return [];

  try {
    const parsed = JSON.parse(
      window.localStorage.getItem(accountOrderStorageKey(normalized)) ?? "[]"
    );
    return Array.isArray(parsed) ? (parsed as LocalOrder[]) : [];
  } catch {
    return [];
  }
}

export function saveOrderForCurrentAccount(order: LocalOrder) {
  if (typeof window === "undefined") return false;
  const accountId = getCurrentAccount();
  if (!accountId) return false;

  const orders = getAccountOrders(accountId);
  window.localStorage.setItem(
    accountOrderStorageKey(accountId),
    JSON.stringify([order, ...orders])
  );
  return true;
}
