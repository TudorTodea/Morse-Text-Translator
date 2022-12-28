
import { Button, Grid, Paper, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import ChangeCircle from '@mui/icons-material/ChangeCircle';
import { morseToTextDict,TextToMorseDict } from '../../utils/morse';
const Morse = () => {

  const [textInput,setTextInput]=useState('');
  const [morseInput,setMorseInput]=useState('');
  const [morseOutput,setMorseOutput]=useState('');
  const [textOutput,setTextOutput]=useState('');
  const [swap,setSwap]=useState(false);
 
  const FREQUENCY = 440;
  let DOT_TIME = 60;
  let DASH_TIME = DOT_TIME * 3;
  let SYMBOL_BREAK = DOT_TIME;
  let LETTER_BREAK = DOT_TIME * 3;
  let WORD_BREAK = DOT_TIME * 7;
  let note_context;
  let note_node;
  let gain_node;
  let audioContextInitialized = false;

const inputChange=(e)=>{
  if(swap){
    setMorseInput(e.target.value)
  }else{
    setTextInput(e.target.value.toLowerCase())
  }
 
}

function convertAsciiCharToMorse(asciiChar) {
  return TextToMorseDict[asciiChar.toUpperCase()];
}


function convertAsciiWordToMorse(asciiWord) {
  return asciiWord.split('').map(convertAsciiCharToMorse);
}

function convertAsciiSentenceToMorse(asciiSentence) {
  let splitSentence = asciiSentence.toUpperCase().split(' ');
  return splitSentence.map(convertAsciiWordToMorse);
}

function initializeAudioContext() {
  note_context = new AudioContext();
  note_node = note_context.createOscillator();
 gain_node = note_context.createGain();
 note_node.frequency.value = FREQUENCY.toFixed(2);
 gain_node.gain.value = 0;
 note_node.connect(gain_node);
 gain_node.connect(note_context.destination);
 note_node.start();
 audioContextInitialized = true;

}
useEffect(()=>{
  
  initializeAudioContext();
},[])

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

useEffect(()=>{
  if(swap){
    const morseCodeArr = morseInput.split(' ');

    let result = '';
    for (const code of morseCodeArr) {
      result += morseToTextDict[code] || '';
    }
    setTextOutput(result)
  }else{
    let result = '';

    for (const char of textInput) {

      result += TextToMorseDict[char.toUpperCase()] || '';
      result += ' '; 
    }

   setMorseOutput(result)}
},[textInput,morseInput])

function inputSwap(){
  setSwap(!swap);
  setMorseInput('');
  setTextInput('');
  setMorseOutput('');
  setTextOutput('');
}
  return (
    <Paper  elevation={24} sx={{ color:'black' }}>
      <Box p={3} sx={{ display:'flex' ,justifyContent:'center',alignItems:'center',flexDirection:'column' }}>
      <TextField
          id="filled-multiline-static"
          label={swap?"Morse Input":"Text Input"}
          multiline
          rows={3}
          variant="filled"
          value={swap?morseInput:textInput}
          onChange={inputChange}
          sx={{ width:'80%' }}
        />

        <ChangeCircle fontSize='large' sx={{ marginTop:3, marginBottom:3,cursor:'pointer' }}onClick={inputSwap}/>

        <TextField
          id="filled-multiline-static"
          label={swap?"Text Output":"Morse Output"}
          multiline
          rows={3}
          variant="filled"
          sx={{ width:'80%' }}
          value={swap?textOutput:morseOutput}
          disabled
        />
        <Box sx={{ display:'flex' }}>
          <Button  onClick={()=>playSentence(convertAsciiSentenceToMorse(textInput))}>
            Play sentence
          </Button>
          </Box>
        <Grid container sx={{ padding:{md:' 75px 120px 75px 120px',xs:'50px 0px 50px 0px' }}}>
          <Grid item md={6}  xs={12} sx={{ display:'flex', alignItems:'flex-start',justifyContent:'flex-start',flexDirection:'column' }}>
            <Typography variant='h6'>
            Text to Morse

            </Typography>
            <Typography>
            Just type letters, numbers and punctuation into the top box and the Morse code will appear in the bottom box. This is not a great tool for learning Morse code as looking at the dots and dashes does not help.
            </Typography>
          </Grid>

          <Grid item md={6}  xs={12} sx={{ display:'flex', alignItems:'flex-start',justifyContent:'flex-start',flexDirection:'column' }}>
            <Typography variant='h6'>
            Morse to Text

            </Typography>
            <Typography>
            You can type Morse code into the top box using "." for a dot and "-" or " " for a space. The text translation will appear in the bottom box.
            </Typography>
          </Grid>

        </Grid>
      </Box>
    </Paper>
  )
}

export default Morse