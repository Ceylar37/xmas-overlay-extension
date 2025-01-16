import { field as fieldEntity } from '@/entities';
import { handleIdle } from '@/shared/lib/utils';

let snowflakesTurnedOn = false;

const canvas = document.createElement('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.zIndex = '1000000';
canvas.style.pointerEvents = 'none';
const TRANSITION = 500;
canvas.style.transition = `opacity ${TRANSITION}ms ease-in-out`;
document.body.appendChild(canvas);

const field = new fieldEntity.model.Field(canvas);

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const startSnowflakes = () => {
  field.start();
  canvas.style.opacity = '1';
};

const stopSnowflakes = () => {
  canvas.style.opacity = '0';
  setTimeout(() => {
    field.stop();
  }, TRANSITION);
};

handleIdle({
  onIdle: () => {
    if (snowflakesTurnedOn) {
      startSnowflakes();
    }
  },
  onIdleCancel: stopSnowflakes,
  ms: 30e3
});

chrome.storage.sync.get<Partial<{ isSnowflakes: boolean }>>(['isSnowflakes']).then(({ isSnowflakes }) => {
  snowflakesTurnedOn = isSnowflakes ?? false;
});
chrome.storage.onChanged.addListener(({ isSnowflakes }) => {
  if (!isSnowflakes) return;
  snowflakesTurnedOn = isSnowflakes?.newValue ?? false;
  if (!snowflakesTurnedOn) {
    stopSnowflakes();
  }
});
