import { debounce } from '@/shared/lib/utils';

const christmasLightsCSS = `
<style>
* {
  margin: 0;
  padding: 0;
}

html, body, .christmasLights {
  background-color: transparent !important;
}

.christmasLights {
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  position: fixed;
  top: 0;
  z-index: 1000000;
  margin: -26px 0 0 0;
  padding: 0;
  pointer-events: none;
  width: 100vw;
  display: flex;
  justify-content: center;
}

.christmasLights li {
  position: relative;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
  list-style: none;
  padding: 0;
  display: block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin: 30px;
  display: inline-block;
  background: #00f7a5;
  box-shadow: 0px 4.66667px 24px 3px #00f7a5;
  -webkit-animation-name: flash-1;
  animation-name: flash-1;
  -webkit-animation-duration: 2s;
  animation-duration: 2s;
}

.christmasLights li:nth-child(2n+1) {
  background: cyan;
  box-shadow: 0px 4.66667px 24px 3px rgba(0, 255, 255, 0.5);
  -webkit-animation-name: flash-2;
  animation-name: flash-2;
  -webkit-animation-duration: 0.4s;
  animation-duration: 0.4s;
}

.christmasLights li:nth-child(4n+2) {
  background: #f70094;
  box-shadow: 0px 4.66667px 24px 3px #f70094;
  -webkit-animation-name: flash-3;
  animation-name: flash-3;
  -webkit-animation-duration: 1.1s;
  animation-duration: 1.1s;
}

.christmasLights li:nth-child(odd) {
  -webkit-animation-duration: 1.8s;
  animation-duration: 1.8s;
}

.christmasLights li:nth-child(3n+1) {
  -webkit-animation-duration: 1.4s;
  animation-duration: 1.4s;
}

.christmasLights li:before {
  content: "";
  position: absolute;
  background: #222;
  width: 10px;
  height: 5px;
  border-radius: 3px;
  top: -4.66667px;
  left: 1px;
}

.christmasLights li:after {
  content: "";
  top: -16px;
  left: 5px;
  position: absolute;
  width: 75px;
  height: 18.66667px;
  border-bottom: solid #222 2px;
  border-radius: 50%;
}

.christmasLights li:last-child:after {
  content: none;
}

.christmasLights li:first-child {
  margin-left: 0;
}
.christmasLights li:last-child {
  margin-right: 0;
}

@-webkit-keyframes flash-1 {
  0%, 100% {
    background: #00f7a5;
    box-shadow: 0px 4.66667px 24px 3px #00f7a5;
  }
  50% {
    background: rgba(0, 247, 165, 0.4);
    box-shadow: 0px 4.66667px 24px 3px rgba(0, 247, 165, 0.2);
  }
}

@keyframes flash-1 {
  0%, 100% {
    background: #00f7a5;
    box-shadow: 0px 4.66667px 24px 3px #00f7a5;
  }
  50% {
    background: rgba(0, 247, 165, 0.4);
    box-shadow: 0px 4.66667px 24px 3px rgba(0, 247, 165, 0.2);
  }
}

@-webkit-keyframes flash-2 {
  0%, 100% {
    background: cyan;
    box-shadow: 0px 4.66667px 24px 3px cyan;
  }
  50% {
    background: rgba(0, 255, 255, 0.4);
    box-shadow: 0px 4.66667px 24px 3px rgba(0, 255, 255, 0.2);
  }
}

@keyframes flash-2 {
  0%, 100% {
    background: cyan;
    box-shadow: 0px 4.66667px 24px 3px cyan;
  }
  50% {
    background: rgba(0, 255, 255, 0.4);
    box-shadow: 0px 4.66667px 24px 3px rgba(0, 255, 255, 0.2);
  }
}

@-webkit-keyframes flash-3 {
  0%, 100% {
    background: #f70094;
    box-shadow: 0px 4.66667px 24px 3px #f70094;
  }
  50% {
    background: rgba(247, 0, 148, 0.4);
    box-shadow: 0px 4.66667px 24px 3px rgba(247, 0, 148, 0.2);
  }
}

@keyframes flash-3 {
  0%, 100% {
    background: #f70094;
    box-shadow: 0px 4.66667px 24px 3px #f70094;
  }
  50% {
    background: rgba(247, 0, 148, 0.4);
    box-shadow: 0px 4.66667px 24px 3px rgba(247, 0, 148, 0.2);
  }
}
</style>
`;

let christmasLightsTurnedOn = false;

// class HTMLChristmasLightsElement extends HTMLElement {
//   connectedCallback() {
//     const shadow = this.attachShadow({ mode: 'open' });
//     shadow.innerHTML = `
//     ${getChristmasLightsCSS()}
//     <ul class="christmasLights">
//     ${Array.from({ length: Math.floor(window.innerWidth / 70) }, () => `<li></li>`).join('')}
//   </ul>`;
//   }
// }

// window.customElements.define('xmas-christmasLights', HTMLChristmasLightsElement);
let christmasLightsElement = document.createElement('iframe');

const updateChristmasLights = debounce(() => {
  christmasLightsElement.remove();
  if (!christmasLightsTurnedOn) {
    return;
  }
  christmasLightsElement = document.createElement('iframe');
  christmasLightsElement.style.display = christmasLightsTurnedOn ? 'block' : 'none';
  christmasLightsElement.srcdoc = `
    ${christmasLightsCSS}
    <ul class="christmasLights">
    ${Array.from({ length: Math.floor(window.innerWidth / 70) }, () => `<li></li>`).join('')}
  </ul>`;
  christmasLightsElement.style.height = '50px';
  christmasLightsElement.style.backgroundColor = 'transparent';
  christmasLightsElement.style.border = 'none';
  christmasLightsElement.style.overflow = 'hidden';
  christmasLightsElement.style.position = 'fixed';
  christmasLightsElement.style.width = `min(100vw, ${window.innerWidth}px)`;
  christmasLightsElement.style.maxWidth = '100%';
  christmasLightsElement.style.top = '0';
  christmasLightsElement.style.left = '0';
  christmasLightsElement.style.zIndex = '10000000';
  christmasLightsElement.style.pointerEvents = 'none';
  christmasLightsElement.style.colorScheme = 'xmas-overlay-iframe' + Date.now();
  document.body?.appendChild(christmasLightsElement);
}, 200);
window.addEventListener('resize', updateChristmasLights);

chrome.storage.sync
  .get<Partial<{ isChristmasLights: boolean }>>(['isChristmasLights'])
  .then(({ isChristmasLights }) => {
    christmasLightsTurnedOn = isChristmasLights ?? false;
    updateChristmasLights();
  });
chrome.storage.onChanged.addListener(({ isChristmasLights }) => {
  if (!isChristmasLights) return;
  christmasLightsTurnedOn = isChristmasLights?.newValue ?? false;
  updateChristmasLights();
});

