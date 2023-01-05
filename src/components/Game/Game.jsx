import styled from '@emotion/styled'
import { Button, FormControl, Grow, IconButton, InputLabel, MenuItem, Paper, Select, TextField, Tooltip, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext, useState } from 'react'
import AudioPlayContext from '../../context/audio-context'
import { COMMON_WORDS } from '../../utils/commonWords'
import { TextToMorseDict } from '../../utils/morse'
import Autorenew from '@mui/icons-material/Autorenew';
import Send from '@mui/icons-material/Send';
import Whatshot from '@mui/icons-material/Whatshot';
import Info from '@mui/icons-material/Info';
const Game = () => {
    const[reveal,setReveal]=useState({word:false,answer:false})
    const [input,setInput]=useState('')
    const [word,setWord]=useState({})
    const [correct,setCorrect]=useState();
    const audioCtx=useContext(AudioPlayContext)
    const [gameStart,setGameStart]=useState(false)
    const [settings,setSettings]=useState({dot:60,dash:180,pitch:440,symbol_break:60,letter_break:180})
    const [streak,setStreak]=useState(0)

    
    const StyledTypographyTitle = styled(Typography)(({ theme }) => ({
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        fontFamily: `'Righteous', cursive`,
        fontSize:'32px'
       
      }));
      const StyledTypographyStreak= styled(Typography)(({ theme }) => ({

        fontFamily: `'Righteous', cursive`,
        fontSize:'40px'
       
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
       gap:'10px',
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
          setStreak(streak+1)
          setCorrect(true)
          setTimeout(()=>{setCorrect(null)},"3000")
          setTimeout(() => {
            startHandler() ;
          }, "2000")

        }else{
          setCorrect(false)
          setStreak(0)
          setTimeout(()=>{setCorrect(null)},"3000")
        }
      }

      function setDot(e){
        setSettings({...settings,dot:e.target.value})
        audioCtx.setDotTime(e.target.value)
      }
      function setDash(e){
        setSettings({...settings,dash:e.target.value})
        audioCtx.setDashTime(e.target.value)
      }
      function setLetterBreak(e){
        setSettings({...settings,letter_break:e.target.value})
        audioCtx.setLetterBreak(e.target.value)
      }
      function setSymbolBreak(e){
        setSettings({...settings,symbol_break:e.target.value})
        audioCtx.setSymbolBreak(e.target.value)
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
  
<FormControl fullWidth>
  <Tooltip title='The speed of dash characters. The longer the easier'>
  <InputLabel id="demo-simple-select-label" sx={{ fontSize:'14px' }}>Dash speed <Info sx={{fontSize:'12px'}}/> </InputLabel></Tooltip>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={settings.dash}
    label="Dash speed"
    onChange={setDash}
  >
   <MenuItem value={90}>90 - hard</MenuItem>
    <MenuItem value={180}>180 - default</MenuItem>
    <MenuItem value={360}>360 - slightly easier</MenuItem>
    <MenuItem value={540}>540 - easy</MenuItem>
    <MenuItem value={720}>720 - very easy</MenuItem>
  </Select>
</FormControl>

<FormControl fullWidth>
<Tooltip title='The speed of dot characters. The longer the easier'>
  <InputLabel id="demo-simple-select-label" sx={{ fontSize:'14px' }}>Dot speed <Info sx={{fontSize:'12px'}}/> </InputLabel></Tooltip>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={settings.dot}
    label="Dot speed"
    onChange={setDot}
  >
       <MenuItem value={30}>30 - hard</MenuItem>
    <MenuItem value={60}>60 - default</MenuItem>
    <MenuItem value={120}>120 - slightly easier</MenuItem>
    <MenuItem value={180}>180 - easy</MenuItem>
    <MenuItem value={240}>240 - very easy</MenuItem>
  </Select>
</FormControl>

<FormControl fullWidth>
<Tooltip title='The pause between each morse symbol. The longer the easier'>
  <InputLabel id="demo-simple-select-label" sx={{ fontSize:'14px' }}>Symbol Break <Info sx={{fontSize:'12px'}}/> </InputLabel></Tooltip>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={settings.symbol_break}
    label="Symbol Break"
    onChange={setSymbolBreak}
  >
    <MenuItem value={30}>30 - hard</MenuItem>
    <MenuItem value={60}>60 - default</MenuItem>
    <MenuItem value={120}>120 - slightly easier</MenuItem>
    <MenuItem value={180}>180 - easy</MenuItem>
    <MenuItem value={240}>240 - very easy</MenuItem>

  </Select>
</FormControl>

<FormControl fullWidth>
<Tooltip title='The pause between each letter. The longer the easier'>
  <InputLabel id="demo-simple-select-label" sx={{ fontSize:'14px' }}>Letter Break <Info sx={{fontSize:'12px'}}/> </InputLabel></Tooltip>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={settings.letter_break}
    label="Letter break"
    onChange={setLetterBreak}
  >
      <MenuItem value={90}>90 - hard</MenuItem>
    <MenuItem value={180}>180 - default</MenuItem>
    <MenuItem value={360}>360 - slightly easier</MenuItem>
    <MenuItem value={540}>540 - easy</MenuItem>
    <MenuItem value={720}>720 - very easy</MenuItem>
  </Select>
</FormControl>

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
        {gameStart?<Box sx={{ display:'flex',alignItems:'center',justifyContent:{md:'flex-start',xs:'center'} }}>
          <Whatshot sx={{ color: 'red',fontSize:'40px' }}/>
          <StyledTypographyStreak>{streak}</StyledTypographyStreak>
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
          <Send sx={{fontSize:{md:'25px',xs:'16px'}}}/>
        </IconButton>
        <IconButton  sx={{ display:'flex',alignItems:'center',marginTop:'20px' }} onClick={()=>audioCtx.playWord(word.morse)}>
        <Autorenew  sx={{fontSize:{md:'16px',xs:'12px'}}}/>
        <Typography sx={{fontSize:{md:'16px',xs:'12px'}}}>Replay</Typography>
       </IconButton ></>:''}
        </Box>
        <Box sx={{ display:'flex' }}>
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