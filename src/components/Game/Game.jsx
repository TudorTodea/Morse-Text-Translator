import styled from '@emotion/styled'
import { Button, Grow, IconButton, InputLabel, Paper, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext, useState } from 'react'
import AudioPlayContext from '../../context/audio-context'
import { COMMON_WORDS } from '../../utils/commonWords'
import { TextToMorseDict } from '../../utils/morse'
import Autorenew from '@mui/icons-material/Autorenew';
import Send from '@mui/icons-material/Send';
const Game = () => {
    const[reveal,setReveal]=useState({word:false,answer:false})
    const [input,setInput]=useState('')
    const [word,setWord]=useState({})
    const [correct,setCorrect]=useState();
    const audioCtx=useContext(AudioPlayContext)
    const [gameStart,setGameStart]=useState(false)
    const[dotValue,setDotValue]=useState(60)
    const[dashValue,setDashValue]=useState(60)
    
    const StyledTypographyTitle = styled(Typography)(({ theme }) => ({
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        fontFamily: `'Righteous', cursive`,
        fontSize:'32px'
       
      }));
      const CorrectAnswerTypography = styled(Typography)(({ theme }) => ({
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        fontFamily: `'Righteous', cursive`,
        fontSize:'48px',
        color:'green'
       
      }));
      const WrongAnswerTypography = styled(Typography)(({ theme }) => ({
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        fontFamily: `'Righteous', cursive`,
        fontSize:'48px',
        color:'red'
       
      }));
    const StyledTypography = styled(Typography)(({ theme }) => ({
        fontFamily:` 'Poppins', sans-serif`,
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
       
      }));

      const SettingsBox = styled(Box)(({ theme }) => ({
        border: ' solid',
       display:'flex',
       gap:'5px',
       flexDirection:'column',
       
        width:'200px'
       
      }));


    function startHandler(){
      setReveal({word:false,answer:false})
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
      function submitHandler(){
        if(word&&word.morse&&input===word.morse.join(' ')){
          setReveal({word:false,morse:false})
          setInput('')
          setCorrect(true)
          setTimeout(()=>{setCorrect(null)},"3000")
          setTimeout(() => {
            startHandler() ;
          }, "2000")

        }else{
          setCorrect(false)
          setTimeout(()=>{setCorrect(null)},"3000")
        }
      }
      function setDash(e){
        setDashValue(e.target.value)
        audioCtx.setDashTime(e.target.value)
      }
      function setDot(e){
        setDotValue(e.target.value)
        audioCtx.setDotTime(e.target.value)
        
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
        <Box mt={5} sx={{ display:'flex' ,justifyContent:'center' }}>
        <SettingsBox p={1}>
        <InputLabel shrink htmlFor="pitch" sx={{ marginTop:'10px' }}>
          Pitch
        </InputLabel>
<TextField defaultValue={440} type='number' id='pitch' onChange={(e)=>audioCtx.setFrequency(e.target.value)}></TextField>
<InputLabel shrink htmlFor="dot">
          Dot speed
        </InputLabel>
<TextField key="dot"  value={dotValue} onChange={setDot} type='number' id='dot' ></TextField>
<InputLabel shrink htmlFor="dash"  >
          Dash speed
        </InputLabel>

<TextField value={dashValue}  type='number' id='dash'sx={{ marginBottom:'10px' }} onChange={setDash}></TextField>
        </SettingsBox>
        </Box>
        {correct===false? <Box sx={{ display: 'flex',justifyContent:'center' }}>
        <Grow
          in={correct===false}
          style={{ transformOrigin: '0 0 0' }}
        
        >

<Paper  sx={{ m: 1,width:300,height:75 }} elevation={1}>
        {correct===false?<WrongAnswerTypography >Wrong!</WrongAnswerTypography>:''}

        </Paper>
        </Grow>
        </Box>:''}

        {correct===true?<Box sx={{ display: 'flex',justifyContent:'center' }}>
        <Grow
          in={correct===true}
          style={{ transformOrigin: '0 0 0' }}
        
        >

<Paper  sx={{ m: 1,width:300,height:75 }} elevation={1}>

        {correct===true?<CorrectAnswerTypography >Correct!</CorrectAnswerTypography>:''}

        </Paper>
        </Grow>
        </Box>:''}
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
        {gameStart?
        <><IconButton  sx={{ display:'flex',alignItems:'center',marginTop:'20px' }} onClick={submitHandler}>
          <Send/>
        </IconButton>
        <IconButton  sx={{ display:'flex',alignItems:'center',marginTop:'20px' }} onClick={()=>audioCtx.playWord(word.morse)}>
        <Autorenew />
        <Typography>Replay</Typography>
       </IconButton ></>:''}
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
          appear={true}
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


        </Box>
        </Paper>
  )
}

export default Game