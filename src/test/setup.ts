import '@testing-library/jest-dom';
import { afterEach, vi, type Mock } from 'vitest';

// Define minimal test process type
interface TestProcess {
  env: {
    NODE_ENV: string;
    [key: string]: string | undefined;
  };
  stdout: undefined;
  stderr: undefined;
  stdin: undefined;
  argv: string[];
  argv0: string;
  execArgv: string[];
  execPath: string;
  abort(): void;
  chdir(): void;
  cwd(): string;
  exit(): void;
  version: string;
  versions: Record<string, string>;
  config: Record<string, unknown>;
  kill(): boolean;
  pid: number;
  ppid: number;
  title: string;
  arch: string;
  platform: string;
  mainModule: undefined;
  memoryUsage(): { heapTotal: number; heapUsed: number; external: number; arrayBuffers: number };
  nextTick(): void;
  umask(): number;
  uptime(): number;
  hrtime(): [number, number];
}

interface MockMatchMedia {
  matches: boolean;
  media: string;
  onchange: null;
  addListener: Mock;
  removeListener: Mock;
  addEventListener: Mock;
  removeEventListener: Mock;
  dispatchEvent: Mock;
}

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = mockIntersectionObserver;

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(
    (query: string): MockMatchMedia => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })
  ),
});

// Mock ResizeObserver
const mockResizeObserver = vi.fn();
mockResizeObserver.mockReturnValue({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
});
window.ResizeObserver = mockResizeObserver;

// Mock animation-related properties and methods
Object.defineProperty(window, 'requestAnimationFrame', {
  writable: true,
  value: vi.fn().mockImplementation((cb) => setTimeout(cb, 0)),
});

Object.defineProperty(window, 'cancelAnimationFrame', {
  writable: true,
  value: vi.fn().mockImplementation((id) => clearTimeout(id)),
});

// Mock scroll behavior
Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: vi.fn((options?: ScrollToOptions | number, y?: number) => {
    if (typeof options === 'number' && typeof y === 'number') {
      return;
    }
    if (typeof options === 'object') {
      return;
    }
  }),
});

// Type definitions needed for tests
interface ScrollToOptions {
  top?: number;
  left?: number;
  behavior?: 'auto' | 'smooth';
}

// Update Window interface
declare global {
  interface Window {
    readonly scrollY: number;
    process: TestProcess;
  }
}

// Define test environment globals
const globalWindow = {
  scrollY: 0,
  scrollTo: vi.fn((optionsOrX?: ScrollToOptions | number, y?: number) => {
    if (typeof optionsOrX === 'number' && typeof y === 'number') {
      return;
    }
    if (typeof optionsOrX === 'object') {
      return;
    }
  }),
};

// Apply mocks to window
Object.defineProperty(window, 'scrollY', {
  get: () => globalWindow.scrollY,
  set: (value) => {
    globalWindow.scrollY = value;
  },
});

const scrollToMock = vi.fn((optionsOrX?: ScrollToOptions | number, y?: number) => {
  if (typeof optionsOrX === 'number' && typeof y === 'number') {
    return;
  }
  if (typeof optionsOrX === 'object') {
    return;
  }
}) as unknown as typeof window.scrollTo;

window.scrollTo = scrollToMock;

// Replace process initialization using type assertions to avoid type conflicts
if (typeof window.process === 'undefined') {
  const testProcess: TestProcess = {
    env: { NODE_ENV: 'test' },
    stdout: undefined,
    stderr: undefined,
    stdin: undefined,
    argv: [],
    argv0: '',
    execArgv: [],
    execPath: '',
    abort: () => {},
    chdir: () => {},
    cwd: () => '',
    exit: () => {},
    version: '',
    versions: {},
    config: {},
    kill: () => true,
    pid: 0,
    ppid: 0,
    title: '',
    arch: '',
    platform: '',
    mainModule: undefined,
    memoryUsage: () => ({ heapTotal: 0, heapUsed: 0, external: 0, arrayBuffers: 0 }),
    nextTick: () => {},
    umask: () => 0,
    uptime: () => 0,
    hrtime: () => [0, 0],
  };
  (window as any).process = testProcess;
}

// Setup test environment using type assertions
(globalThis as any).process = {
  env: { NODE_ENV: 'test' },
};

// Cleanup after each test
afterEach(() => {
  vi.clearAllMocks();
  globalWindow.scrollY = 0;
});
