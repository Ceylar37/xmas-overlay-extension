import { debounce } from '@/shared/lib/utils';

const getFireworksCSS = () => `
<style>
html, body {
  background-color: transparent !important;
}

.fireworks {
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  position: fixed;
  top: 0;
  z-index: 10000000;
  margin: -25px 0 0 0;
  padding: 0;
  pointer-events: none;
  width: ${window.innerWidth}px;
  display: flex;
  justify-content: center;
}

.fireworks li {
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

.fireworks li:nth-child(2n+1) {
  background: cyan;
  box-shadow: 0px 4.66667px 24px 3px rgba(0, 255, 255, 0.5);
  -webkit-animation-name: flash-2;
  animation-name: flash-2;
  -webkit-animation-duration: 0.4s;
  animation-duration: 0.4s;
}

.fireworks li:nth-child(4n+2) {
  background: #f70094;
  box-shadow: 0px 4.66667px 24px 3px #f70094;
  -webkit-animation-name: flash-3;
  animation-name: flash-3;
  -webkit-animation-duration: 1.1s;
  animation-duration: 1.1s;
}

.fireworks li:nth-child(odd) {
  -webkit-animation-duration: 1.8s;
  animation-duration: 1.8s;
}

.fireworks li:nth-child(3n+1) {
  -webkit-animation-duration: 1.4s;
  animation-duration: 1.4s;
}

.fireworks li:before {
  content: "";
  position: absolute;
  background: #222;
  width: 10px;
  height: 5px;
  border-radius: 3px;
  top: -4.66667px;
  left: 1px;
}

.fireworks li:after {
  content: "";
  top: -18px;
  left: 7px;
  position: absolute;
  width: 75px;
  height: 18.66667px;
  border-bottom: solid #222 2px;
  border-radius: 50%;
}

.fireworks li:last-child:after {
  content: none;
}

.fireworks li:first-child {
  margin-left: 0;
}
.fireworks li:last-child {
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

let fireworksTurnedOn = false;

// class HTMLFireworksElement extends HTMLElement {
//   connectedCallback() {
//     const shadow = this.attachShadow({ mode: 'open' });
//     shadow.innerHTML = `
//     ${getFireworksCSS()}
//     <ul class="fireworks">
//     ${Array.from({ length: Math.floor(window.innerWidth / 70) }, () => `<li></li>`).join('')}
//   </ul>`;
//   }
// }

// window.customElements.define('xmas-fireworks', HTMLFireworksElement);
let fireworksElement = document.createElement('iframe');

const updateFireworks = debounce(() => {
  try {
    document.body.removeChild(fireworksElement);
  } catch {}
  if (!fireworksTurnedOn) {
    return;
  }
  fireworksElement = document.createElement('iframe');
  fireworksElement.style.display = fireworksTurnedOn ? 'block' : 'none';
  fireworksElement.srcdoc = `
    ${getFireworksCSS()}
    <ul class="fireworks">
    ${Array.from({ length: Math.floor(window.innerWidth / 70) }, () => `<li></li>`).join('')}
  </ul>`;
  fireworksElement.style.height = '20px';
  // fireworksElement.allowTransparency = true;
  fireworksElement.style.backgroundColor = 'transparent';
  fireworksElement.style.border = 'none';
  fireworksElement.style.overflow = 'hidden';
  fireworksElement.style.position = 'fixed';
  fireworksElement.style.width = window.innerWidth + 'px';
  fireworksElement.style.top = '0';
  fireworksElement.style.left = '0';
  fireworksElement.style.zIndex = '10000000';
  document.body.appendChild(fireworksElement);
}, 200);
window.addEventListener('resize', updateFireworks);

chrome.storage.sync.get<Partial<{ isFireworks: boolean }>>(['isFireworks']).then(({ isFireworks }) => {
  fireworksTurnedOn = isFireworks ?? false;
  updateFireworks();
});
chrome.storage.onChanged.addListener(({ isFireworks }) => {
  if (!isFireworks) return;
  fireworksTurnedOn = isFireworks?.newValue ?? false;
  updateFireworks();
});
