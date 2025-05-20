if (typeof (globalThis as any).global === 'undefined') {
  (globalThis as any).global = globalThis;
}

if (typeof (global as any).localStorage === 'undefined') {
  let store: Record<string, string> = {};
  (global as any).localStorage = {
    getItem: (key: string) => (key in store ? store[key] : null),
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  } as any;
}
