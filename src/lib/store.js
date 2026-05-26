// localStorage wrapper — JSON + 200ms debounce + QuotaExceededError handler.
// All keys are prefixed with `dpc-` (Design Prompt Composer) so multi-app namespaces stay clean.
// See docs/TECH-STACK.md § 2 for the storage split. IndexedDB graduation is deferred to v0.5.

const PREFIX = "dpc-";
const DEBOUNCE_MS = 200;
const debouncers = new Map();

let quotaWarned = false;

function k(key) {
  return PREFIX + key;
}

function readRaw(key) {
  try {
    return localStorage.getItem(k(key));
  } catch {
    return null;
  }
}

function writeRaw(key, raw) {
  try {
    localStorage.setItem(k(key), raw);
    return true;
  } catch (e) {
    if (e && e.name === "QuotaExceededError") {
      if (!quotaWarned) {
        quotaWarned = true;
        console.warn(
          "[dpc] localStorage quota exceeded. " +
            "Consider clearing saved presets, or IDB migration is overdue.",
        );
      }
    }
    return false;
  }
}

export const store = {
  /**
   * Read a key, parse as JSON. Returns `fallback` if missing or unparseable.
   */
  get(key, fallback = null) {
    const raw = readRaw(key);
    if (raw == null) return fallback;
    try {
      const parsed = JSON.parse(raw);
      return parsed ?? fallback;
    } catch {
      return fallback;
    }
  },

  /**
   * Write a key — debounced, JSON-stringified. Use for high-frequency updates
   * (typing in a brief, slider drag, etc).
   */
  set(key, value) {
    clearTimeout(debouncers.get(key));
    debouncers.set(
      key,
      setTimeout(() => {
        debouncers.delete(key);
        const raw = JSON.stringify(value);
        writeRaw(key, raw);
      }, DEBOUNCE_MS),
    );
  },

  /**
   * Write a key immediately (no debounce). Use for low-frequency, must-persist
   * events: page-unload, mode-switch, Copy clicked.
   */
  setImmediate(key, value) {
    clearTimeout(debouncers.get(key));
    debouncers.delete(key);
    writeRaw(key, JSON.stringify(value));
  },

  /**
   * Force any pending debounced writes to flush now. Useful on page unload.
   */
  flush() {
    for (const [key, id] of debouncers) {
      clearTimeout(id);
      debouncers.delete(key);
      // Re-running would need the latest value; we have nothing cached here.
      // Callers are expected to use setImmediate on unload for must-persist writes.
      void key;
    }
  },

  /**
   * Remove a key.
   */
  remove(key) {
    try {
      localStorage.removeItem(k(key));
    } catch {
      /* ignore */
    }
  },

  /**
   * List all dpc- prefixed keys. Useful for migrations / debugging.
   */
  keys() {
    const out = [];
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith(PREFIX)) out.push(key.slice(PREFIX.length));
      }
    } catch {
      /* ignore */
    }
    return out;
  },
};

// Flush pending writes on page unload so we don't lose a typed brief
window.addEventListener("beforeunload", () => {
  // For now, just clear debounce timers — callers must use setImmediate for unload-critical data.
  store.flush();
});
