
import { Button, Grid, Paper, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext, useEffect, useState } from 'react'
import ChangeCircle from '@mui/icons-material/ChangeCircle';
import { morseToTextDict,TextToMorseDict } from '../../utils/morse';
import AudioPlayContext from '../../context/audio-context';
const Morse = () => {

  const [textInput,setTextInput]=useState('');
  const [morseInput,setMorseInput]=useState('');
  const [morseOutput,setMorseOutput]=useState('');
  const [textOutput,setTextOutput]=useState('');
  const [swap,setSwap]=useState(false);
const audioCtx=useContext(AudioPlayContext)


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


useEffect(()=>{
  audioCtx.initializeAudioContext();
},[])



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
          <Button  onClick={()=>audioCtx.playSentence(convertAsciiSentenceToMorse(textInput))}>
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