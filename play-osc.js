// AudioContextを取得
window.AudioContext = window.webkitAudioContext || window.AudioContext;
const audioctx = new AudioContext();

let play = false;
let osc;
let gain;

document.getElementById('gain').onchange = (e) => {
  console.log(e.target.valueAsNumber);
  gain.gain.value = e.target.valueAsNumber / 100;
};

function playOsc(waveformType = 'sine') {
  if (!play) {
    osc = audioctx.createOscillator();
    gain = audioctx.createGain();
    osc.connect(gain);
    gain.connect(audioctx.destination);
    osc.frequency.value = 440;
    gain.gain.value = 0.8;
    osc.start();
    play = true;
  }
  osc.type = waveformType;
}

function stopOsc() {
  if (play) {
    osc.stop();
    play = false;
  }
}
