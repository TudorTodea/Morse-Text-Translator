
import React from 'react';

const AudioPlayContext = React.createContext({
  initializeAudioContext: () => { },
  playLetter:()=>{},
  playWord:()=>{},
  playSentence:()=>{},
  setFrequency:()=>{},
  setDashTime:()=>{},
  setDotTime:()=>{},
  setSymbolBreak:()=>{},
  setLetterBreak:()=>{}
});


export const AudioPlayContextProvider = (props) => {
    let FREQUENCY = 440;
    let DOT_TIME = 60;
    let DASH_TIME = DOT_TIME * 3;
    let SYMBOL_BREAK = DOT_TIME;
    let LETTER_BREAK = DOT_TIME * 3;
    let WORD_BREAK = DOT_TIME * 7;
    let note_context;
    let note_node;
    let gain_node;
    let audioContextInitialized = false;

    function setFrequency(freq){

    }
    function setDotTime(dot){
      DOT_TIME=dot
          }
    function setDashTime(dash){
            DASH_TIME=dash
                }
    function setSymbolBreak(symbol){
      SYMBOL_BREAK=symbol
    }
    function setLetterBreak(letter){
      LETTER_BREAK=letter
    }

    function startNotePlaying() {

        gain_node.gain.setTargetAtTime(0.1, 0, 0.001)
      }
      
      function stopNotePlaying() {
      
        gain_node.gain.setTargetAtTime(0, 0, 0.001)
      }
      
      function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      
      async function playDash() {
        startNotePlaying();
        await sleep(DASH_TIME);
        stopNotePlaying();
      }
      
      async function playDot() {
        startNotePlaying();
        await sleep(DOT_TIME);
        stopNotePlaying();
      }
      
      async function playLetter(letter) {
        if (!audioContextInitialized) {
          initializeAudioContext();
        }
        for (let i = 0; i < letter.length; i++) {
          if (letter[i] == '-') {
            await playDash();
          } else if (letter[i] == '.') {
            await playDot();
          }
          await sleep(SYMBOL_BREAK);
        }
      }
      
      async function playWord(word) {
      
        for (let i = 0; i < word.length; i++) {
          await playLetter(word[i]);
          await sleep(LETTER_BREAK);
        }
      }
      
      async function playSentence(sentence) {
        for (let i = 0; i < sentence.length; i++) {
          await playWord(sentence[i]);
          await sleep(WORD_BREAK);
        }
      }
    function initializeAudioContext(freq) {
    note_context = new AudioContext();
    note_node = note_context.createOscillator();
   gain_node = note_context.createGain();
   if(freq){
   note_node.frequency.value = freq.toFixed(2);}
   else{
    note_node.frequency.value = FREQUENCY.toFixed(2);
   }
   gain_node.gain.value = 0;
   note_node.connect(gain_node);
   gain_node.connect(note_context.destination);
   note_node.start();
   audioContextInitialized = true;
  
  }


  const contextValue = {
   initializeAudioContext: initializeAudioContext,
   playLetter:playLetter,
   playWord:playWord,
   playSentence:playSentence,
   setFrequency:setFrequency,
   setDotTime:setDotTime,
   setDashTime:setDashTime,
   setSymbolBreak:setSymbolBreak,
   setLetterBreak:setLetterBreak
    
  };
  return (
    <AudioPlayContext.Provider value={contextValue}>
      {props.children}
    </AudioPlayContext.Provider>
  );
};

export default AudioPlayContext;
