
import { Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import CustomizedTables from './morseTable'

const Learn = () => {

  return (
    <Paper  elevation={24} sx={{ color:'black' }}>
      <Box p={5} sx={{ display:'flex' ,justifyContent:'center',alignItems:'center',flexDirection:'column' }}>
      <Typography><b>Morse code</b> is a method used in telecommunication to encode text characters as standardized sequences of two different
         signal durations, called dots and dashes, or dits and dahs.
       Morse code is named after Samuel Morse, one of the inventors of the telegraph.</Typography>
       <br/>
       <Typography >
       <b>International Morse</b> code encodes the 26 basic Latin letters a through z, one accented Latin letter, the Arabic numerals, and a small set of punctuation and procedural signals (prosigns).
        There is no distinction between upper and lower case letters. Each Morse code symbol is formed by a sequence of dits and dahs. The dit duration is the basic unit of time measurement in Morse code transmission.
         The duration of a dah is three times the duration of a dit. Each dit or dah within an encoded character is followed by a period of signal absence, called a space, equal to the dit duration.
        The letters of a word are separated by a space of duration equal to three dits, and words are separated by a space equal to seven dits.
       </Typography>
       <br/>
       <Typography>
        In the tables below you can see the representation of the english alphabet(A-Z) and the ten arabic digits(0-9). Each letter/digit can be clicked 
        and an audio representation of the morse code for the letter/digit will start
       </Typography>
      </Box>

      <CustomizedTables/>
    </Paper>
  )
}

export default Learn