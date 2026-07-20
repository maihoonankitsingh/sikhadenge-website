const STORAGE_PREFIX = "sd_analytics";

const ANONYMOUS_ID_KEY =
  `${STORAGE_PREFIX}_anonymous_id`;

const SESSION_KEY =
  `${STORAGE_PREFIX}_session`;

const SESSION_TIMEOUT_MS =
  30 * 60 * 1000;

interface StoredSession {
  id: string;
  started_at: string;
  last_activity_at: string;
}

export interface BrowserIdentity {
  anonymous_id: string;
  session_id: string;
  session_started_at: string;
}

function browserAvailable(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof window.localStorage !== "undefined" &&
    typeof window.sessionStorage !== "undefined"
  );
}

function randomHex(bytes: number): string {
  const values = new Uint8Array(bytes);

  if (
    typeof globalThis.crypto !== "undefined" &&
    typeof globalThis.crypto.getRandomValues === "function"
  ) {
    globalThis.crypto.getRandomValues(values);
  } else {
    for (let index = 0; index < values.length; index += 1) {
      values[index] =
        Math.floor(Math.random() * 256);
    }
  }

  return Array.from(values)
    .map((value) => value.toString(16).padStart(2, "0"))
    .join("");
}

function createIdentifier(prefix: string): string {
  return `${prefix}_${Date.now()}_${randomHex(12)}`;
}

function readStorage(
  storage: Storage,
  key: string,
): string | null {
  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
}

function writeStorage(
  storage: Storage,
  key: string,
  value: string,
): boolean {
  try {
    storage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

export function getOrCreateAnonymousId(): string {
  if (!browserAvailable()) {
    return createIdentifier("anon");
  }

  const existing = readStorage(
    window.localStorage,
    ANONYMOUS_ID_KEY,
  );

  if (existing) {
    return existing;
  }

  const anonymousId = createIdentifier("anon");

  writeStorage(
    window.localStorage,
    ANONYMOUS_ID_KEY,
    anonymousId,
  );

  return anonymousId;
}

function parseStoredSession(
  value: string | null,
): StoredSession | null {
  if (!value) {
    return null;
  }

  try {
    const parsed = JSON.parse(value) as Partial<StoredSession>;

    if (
      typeof parsed.id !== "string" ||
      typeof parsed.started_at !== "string" ||
      typeof parsed.last_activity_at !== "string"
    ) {
      return null;
    }

    return {
      id: parsed.id,
      started_at: parsed.started_at,
      last_activity_at: parsed.last_activity_at,
    };
  } catch {
    return null;
  }
}

function sessionExpired(
  session: StoredSession,
  now: number,
): boolean {
  const lastActivity =
    Date.parse(session.last_activity_at);

  if (!Number.isFinite(lastActivity)) {
    return true;
  }

  return now - lastActivity > SESSION_TIMEOUT_MS;
}

export function getOrCreateSession(): StoredSession {
  const now = Date.now();
  const nowIso = new Date(now).toISOString();

  if (!browserAvailable()) {
    return {
      id: createIdentifier("ses"),
      started_at: nowIso,
      last_activity_at: nowIso,
    };
  }

  const existing = parseStoredSession(
    readStorage(
      window.sessionStorage,
      SESSION_KEY,
    ),
  );

  if (existing && !sessionExpired(existing, now)) {
    const refreshed: StoredSession = {
      ...existing,
      last_activity_at: nowIso,
    };

    writeStorage(
      window.sessionStorage,
      SESSION_KEY,
      JSON.stringify(refreshed),
    );

    return refreshed;
  }

  const created: StoredSession = {
    id: createIdentifier("ses"),
    started_at: nowIso,
    last_activity_at: nowIso,
  };

  writeStorage(
    window.sessionStorage,
    SESSION_KEY,
    JSON.stringify(created),
  );

  return created;
}

export function getBrowserIdentity(): BrowserIdentity {
  const session = getOrCreateSession();

  return {
    anonymous_id: getOrCreateAnonymousId(),
    session_id: session.id,
    session_started_at: session.started_at,
  };
}

export function refreshBrowserSession(): void {
  getOrCreateSession();
}

export const BROWSER_IDENTITY_CONSTANTS = {
  anonymousIdKey: ANONYMOUS_ID_KEY,
  sessionKey: SESSION_KEY,
  sessionTimeoutMs: SESSION_TIMEOUT_MS,
} as const;
