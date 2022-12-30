import styled from '@emotion/styled'
import { Button, Grow, IconButton, Paper, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext, useState } from 'react'
import AudioPlayContext from '../../context/audio-context'
import { COMMON_WORDS } from '../../utils/commonWords'
import { TextToMorseDict } from '../../utils/morse'
import Autorenew from '@mui/icons-material/Autorenew';
const Game = () => {
    const[reveal,setReveal]=useState({word:false,answer:false})
    const [input,setInput]=useState('')
    const [word,setWord]=useState({})
    const audioCtx=useContext(AudioPlayContext)
    const [gameStart,setGameStart]=useState(false)

    
    const StyledTypographyTitle = styled(Typography)(({ theme }) => ({
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        fontFamily: `'Righteous', cursive`,
        fontSize:'32px'
       
      }));
    const StyledTypography = styled(Typography)(({ theme }) => ({
        fontFamily:` 'Poppins', sans-serif`,
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
       
      }));


    function startHandler(){
        let random = COMMON_WORDS[Math.floor(Math.random() * COMMON_WORDS.length)];
        setWord({...word,text:random,morse:convertAsciiWordToMorse(random)});
        audioCtx.playWord(convertAsciiWordToMorse(random));
        setGameStart(true)
    }

    function convertAsciiCharToMorse(asciiChar) {
        return TextToMorseDict[asciiChar.toUpperCase()];
      }
      
      function convertAsciiWordToMorse(asciiWord) {
        return asciiWord.split('').map(convertAsciiCharToMorse);
      }

  return (
    <Paper  elevation={24} sx={{ color:'black' }}>
    <Box p={5} sx={{ display:'flex' ,justifyContent:'center',flexDirection:'column' }}>
    <StyledTypographyTitle >The Morse Listening Game</StyledTypographyTitle>
    <StyledTypography>Learn morse code the fun way!</StyledTypography>
        <StyledTypography mt={5} >
            In this game you can listen to random words representations in morse code, your role is to listen carefully to the audio representation and write down
            the word in English language.
        </StyledTypography>
       
        <Box  sx={{ display:'flex',alignItems:'center',justifyContent:'center' }}>
       {!gameStart?<Button onClick={startHandler}>
        Start Game
       </Button>:<TextField
          id="filled-multiline-static"
          label="Input"
          variant="filled"
          sx={{ marginTop:'20px' }}
          value={input}
          onChange={(e)=>{setInput(e.target.value)}}
          fullWidth
          
        />
        
        }
        {gameStart?<IconButton  sx={{ display:'flex',alignItems:'center',marginTop:'20px' }} onClick={()=>audioCtx.playWord(word.morse)}>
        <Autorenew />
        <Typography>Replay</Typography>
       </IconButton >:''}
        </Box>
        <Box>
       {gameStart?<Button onClick={()=>setReveal({...reveal,word:!reveal.word})}>
        Show Word
       </Button>:''}
       {gameStart?<Button onClick={()=>setReveal({...reveal,answer:!reveal.answer,word:reveal.word?false:true})}>
        Show Answer
       </Button>:''}
       </Box>

      <Box sx={{ display: 'flex',justifyContent:'center' }}>
        {word&&word.text&&word.text.split('').map((c)=>(
            <>
        <Grow
          in={reveal.word}
          style={{ transformOrigin: '0 0 0' }}
          {...({ timeout: 1500 })}
        >

<Paper  sx={{ m: 1,width:50,height:50 }} elevation={4}>
          <Typography sx={{ display:'flex',alignItems:'center',justifyContent:'center',fontSize:'35px',textTransform:'uppercase' }}>{c}</Typography>
        </Paper>
        </Grow>
        </>
        ))
}
    </Box>

    <Box sx={{ display: 'flex',justifyContent:'center' }}>
        {word&&word.morse&&word.morse.map((c)=>(
            <>
        <Grow
          in={reveal.answer}
          style={{ transformOrigin: '0 0 0' }}
          {...({ timeout: 1500 })}
        >

<Paper  sx={{ m: 1,width:50,height:50 }} elevation={4}>
          <Typography sx={{ display:'flex',alignItems:'center',justifyContent:'center',fontSize:'35px',textTransform:'uppercase' }}>{c}</Typography>
        </Paper>
        </Grow>
        </>
        ))
}
    </Box>


        {word&&word.morse&&input===word.morse.join(' ')?console.log('true'):console.log('false')}
        </Box>
        </Paper>
  )
}

export default Game