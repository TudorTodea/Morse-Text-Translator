
import { Paper, TextField } from '@mui/material'
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
 
const inputChange=(e)=>{
  if(swap){
    setMorseInput(e.target.value)
  }else{
    setTextInput(e.target.value.toLowerCase())
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

        <ChangeCircle fontSize='large' sx={{ marginTop:3, marginBottom:3,cursor:'pointer' }}onClick={()=>setSwap(!swap)}/>

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
      </Box>
    </Paper>
  )
}

export default Morse