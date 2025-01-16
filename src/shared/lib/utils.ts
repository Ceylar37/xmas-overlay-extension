import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

const debounce = <T extends (...args: unknown[]) => unknown>(fn: T, delay: number) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => fn(...args), delay);
  };
};

const IDLE_EVENTS = ['mousemove', 'mousedown', 'keydown', 'touchstart', 'wheel', 'resize'];
const ONE_MINUTE = 60e3;

const handleIdle = ({
  onIdle,
  onIdleCancel,
  ms = ONE_MINUTE
}: {
  onIdle: () => unknown;
  onIdleCancel: () => unknown;
  ms?: number;
}) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  let isIdle = false;

  const idleStart = () => {
    isIdle = true;
    onIdle();
  };

  const idleCancel = () => {
    isIdle = false;
    onIdleCancel();
  };

  const interruptIdle = () => {
    if (isIdle) {
      idleCancel();
    }

    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => idleStart(), ms);
  };

  IDLE_EVENTS.forEach((event) => {
    document.addEventListener(event, interruptIdle);
  });

  interruptIdle();

  return () => {
    IDLE_EVENTS.forEach((event) => {
      document.removeEventListener(event, interruptIdle);
    });
  };
};

type Pair<M, R> = {
  message: M;
  response: R;
};
type HandlerFromPair<T extends Pair<unknown, unknown>> = (
  message: T['message'],
  sender: chrome.runtime.MessageSender
) => Promise<T['response']>;

export { cn, debounce, handleIdle };
export type { HandlerFromPair, Pair };

