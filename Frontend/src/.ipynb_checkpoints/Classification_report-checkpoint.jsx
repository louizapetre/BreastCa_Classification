import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';



const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


function createRow(className, metrics) {
  return { className, ...metrics }
}

export default function ClassificationReport({ report }) {
  const rows = [
    createRow('Benign', report['0']),
    createRow('Malignant', report['1']),
    createRow('Macro avg', report['macro avg']),
    createRow('Weighted avg', report['weighted avg']),
  ]

  return (
    <TableContainer sx={{ borderRadius: '18px', maxWidth: 700, border: '1px solid #F3F6FB', margin: "20px auto 25px" }}>
      <Table sx={{ margin: "auto auto", maxWidth: 600 }} aria-label="classification report">
        <TableHead>
          <TableRow>
            <StyledTableCell align="right">Class</StyledTableCell>
            <StyledTableCell align="right">Precision</StyledTableCell>
            <StyledTableCell align="right">Recall</StyledTableCell>
            <StyledTableCell align="right">F1 score</StyledTableCell>
            <StyledTableCell align="right">Support</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.className}>
              <StyledTableCell align="right">{row.className}</StyledTableCell>
              <StyledTableCell align="right">{row.precision.toFixed(2)}</StyledTableCell>
              <StyledTableCell align="right">{row.recall.toFixed(2)}</StyledTableCell>
              <StyledTableCell align="right">{row['f1-score'].toFixed(2)}</StyledTableCell>
              <StyledTableCell align="right">{row.support}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}