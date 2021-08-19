import { doSpeechSynth, language, speechVolume, speechVoice, speechSpeed } from './store.js';
import { languageNameCode } from './constants.js';
import { get } from 'svelte/store';

export function speak(text, volume=0) {
  // speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.volume = volume || speechVolume.get();
  utterance.voice = get(speechVoice);
  utterance.rate = speechSpeed.get();
  utterance.lang = languageNameCode[language.get()].tag;
  speechSynthesis.speak(utterance);
}

export function checkAndSpeak(text) {
  if (doSpeechSynth.get()) {
    speak(text);
  }
}

setTimeout(() => {
  let isInitial = true;
  doSpeechSynth.subscribe($doSpeechSynth => {
    if (isInitial || !$doSpeechSynth) {
      isInitial = false;
      return;
    }
    speak('Speech synthesis enabled');
  });
}, 0);
