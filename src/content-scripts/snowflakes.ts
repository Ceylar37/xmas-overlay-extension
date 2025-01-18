import { field as fieldEntity } from '@/entities';
import { handleIdle } from '@/shared/lib/utils';

const TRANSITION = 500;
const snowflakesCSS = `
* {
  margin: 0;
  padding: 0;
}
html, body, canvas {
  background-color: transparent !important;
}
`;

let snowflakesTurnedOn = false;

let snowflakesElement = document.createElement('iframe');

const field = new fieldEntity.model.Field();

// window.addEventListener('resize', () => {
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;
// });

const removeSnowflakes = (withTransition = true) => {
  snowflakesElement.style.opacity = '0';
  if (withTransition) {
    setTimeout(() => {
      snowflakesElement.remove();
      field.stop();
    }, TRANSITION);
  } else {
    snowflakesElement.remove();
    field.stop();
  }
};

const addSnowflakes = () => {
  removeSnowflakes(false);

  snowflakesElement = document.createElement('iframe');
  snowflakesElement.style.width = window.innerWidth + 'px';
  snowflakesElement.style.height = window.innerHeight + 20 + 'px';
  snowflakesElement.style.position = 'fixed';
  snowflakesElement.style.top = '-10px';
  snowflakesElement.style.zIndex = '1000000';
  snowflakesElement.style.pointerEvents = 'none';
  snowflakesElement.style.border = 'none';
  snowflakesElement.style.backgroundColor = 'transparent';
  snowflakesElement.style.transition = `opacity ${TRANSITION}ms ease-in-out`;
  document.body.appendChild(snowflakesElement);

  const style = snowflakesElement.contentDocument!.createElement('style');
  style.innerHTML = snowflakesCSS;
  snowflakesElement.contentDocument?.head.appendChild(style);
  const canvas = snowflakesElement.contentDocument!.createElement('canvas');
  canvas.width = snowflakesElement.contentWindow!.innerWidth;
  canvas.height = snowflakesElement.contentWindow!.innerHeight;
  snowflakesElement.contentDocument?.body.appendChild(canvas);

  field.start(canvas);
};

handleIdle({
  onIdle: () => {
    if (snowflakesTurnedOn) {
      addSnowflakes();
    }
  },
  onIdleCancel: removeSnowflakes,
  ms: 30e3
});

chrome.storage.sync.get<Partial<{ isSnowflakes: boolean }>>(['isSnowflakes']).then(({ isSnowflakes }) => {
  snowflakesTurnedOn = isSnowflakes ?? false;
});
chrome.storage.onChanged.addListener(({ isSnowflakes }) => {
  if (!isSnowflakes) return;
  snowflakesTurnedOn = isSnowflakes?.newValue ?? false;
  if (!snowflakesTurnedOn) {
    removeSnowflakes();
  }
});
