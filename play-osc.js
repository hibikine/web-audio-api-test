// AudioContextを取得
window.AudioContext = window.webkitAudioContext || window.AudioContext;
const audioCtx = new AudioContext();

let play = false;
let osc;
let gain = 0.5;
let gainCtx;
let attack = 0.5;
let release = 0.5;
let freq = 440;

document.getElementById('gain').onchange = (e) => {
  console.log(e.target.valueAsNumber);
  gain = convertRangeValue(e);
  if (typeof gainCtx !== 'undefined') {
    gainCtx.gain.value = gain;
  }
};

function convertRangeValue(e) {
  return e.target.valueAsNumber / 100;
}

document.getElementById('attack').onchange = (e) => {
  attack = convertRangeValue(e);
}

document.getElementById('release').onchange = (e) => {
  release = convertRangeValue(e);
}

document.getElementById('freq').onchange = (e) => {
  freq = convertRangeValue(e) * 950 + 50; // 20Hz~1000Hzまでマッピングしてみる
  if (typeof osc !== 'undefined') {
    osc.frequency.value = freq;
  }
}

function playOsc(waveformType = 'sine') {
  if (!play) {
    osc = audioCtx.createOscillator();
    gainCtx = audioCtx.createGain();
    osc.connect(gainCtx);
    gainCtx.connect(audioCtx.destination);
    osc.frequency.value = freq;
    gainCtx.gain.value = 0;
    console.log(gainCtx);
    gainCtx.gain.linearRampToValueAtTime(gain, audioCtx.currentTime + attack);
    osc.start();
    play = true;
  }
  osc.type = waveformType;
}

function stopOsc() {
  if (play) {
    gainCtx.gain.linearRampToValueAtTime(0, audioCtx.currentTime + release);
    play = false;
  }
}
