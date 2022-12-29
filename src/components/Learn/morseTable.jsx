import React, { useContext} from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/system';
import AudioPlayContext from '../../context/audio-context';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#f4dec6',
    color: theme.palette.common.black,
  },
 
}));

const StyledBoxCell = styled(Box)(({ theme }) => ({
  width:'20px',
  border:'solid',
  display:'flex',
  justifyContent:'center',
  cursor:'pointer',
 
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:last-child td, &:last-child th': {
    border:0 ,
  },
}));

function createData(letter,morse) {
  return { letter,morse};
}

const rows1 = [
  createData('A', '.-'),
  createData('B', '-...'),
  createData('C', '-.-.'),
  createData('D', '-..'),
  createData('E', '.'),
  createData('F', '..-.'),
  createData('G', '--.'),
  createData('H', '....'),
  createData('I', '..'),
  createData('J', '.---'),
  createData('K', '-.-'),
  createData('L', '.-..'),
  createData('M', '--'),
];
const rows2 = [
  createData('N', '-.'),
  createData('O', '---'),
  createData('P', '.--.'),
  createData('Q', '--.-'),
  createData('R', '.-.'),
  createData('S', '...'),
  createData('T', '-'),
  createData('U', '..-'),
  createData('V', '...-'),
  createData('W', '.--'),
  createData('X', '-..-'),
  createData('Y', '-.---'),
  createData('Z', '--..'),
];
const rows3 = [
  createData('0', '-----'),
  createData('1', '.----'),
  createData('2', '..---'),
  createData('3', '...--'),
  createData('4', '....-'),
  createData('5', '.....'),
  createData('6', '-....'),
  createData('7', '--...'),
  createData('8', '---..'),
  createData('9', '----.'),

];

export default function CustomizedTables() {
  const audioCtx=useContext(AudioPlayContext);
  return (
    <TableContainer  component={Paper}>
      <Box p={3} sx={{ display:'flex' ,justifyContent:'center',gap:10,flexDirection:{md:'row',xs:'column'},alignItems:{xs:'center',md:'flex-start'} }}>
      <Table sx={{ width: 200,padding:'20px 20px 20px 20px' }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Letter</StyledTableCell>
            <StyledTableCell align="left">Morse</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows1.map((row) => (
            <StyledTableRow key={row.letter}>
              <StyledTableCell component="th" scope="row" >
                <StyledBoxCell onClick={()=>{audioCtx.playLetter(row.morse)}}>{row.letter}</StyledBoxCell>
              </StyledTableCell>
              <StyledTableCell  sx={{fontSize:'20px', fontWeight:700 }} align="left">{row.morse}</StyledTableCell>
         
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>

      <Table sx={{ width: 200,padding:'20px 20px 20px 20px' }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Letter</StyledTableCell>
            <StyledTableCell align="left">Morse</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows2.map((row) => (
            <StyledTableRow key={row.letter}>
              <StyledTableCell component="th" scope="row">
              <StyledBoxCell onClick={()=>{audioCtx.playLetter(row.morse)}}>{row.letter}</StyledBoxCell>
              </StyledTableCell>
              <StyledTableCell  sx={{fontSize:'20px', fontWeight:700 }} align="left">{row.morse}</StyledTableCell>
         
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <Table sx={{ width: 200,padding:'20px 20px 20px 20px',maxHeight:'600px' }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Digit</StyledTableCell>
            <StyledTableCell align="left">Morse</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows3.map((row) => (
            <StyledTableRow key={row.letter}>
              <StyledTableCell component="th" scope="row">
              <StyledBoxCell onClick={()=>{audioCtx.playLetter(row.morse)}}>{row.letter}</StyledBoxCell>
              </StyledTableCell>
              <StyledTableCell  sx={{fontSize:'20px', fontWeight:700 }} align="left">{row.morse}</StyledTableCell>
         
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      </Box>
    </TableContainer>
    
    
  );
}