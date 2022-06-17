import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

  export function ListOfCoffees({
    coffeeList,
    typeOfCoffee,
    onClickItem
  }) {

    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 400 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nome do café</TableCell>
              <TableCell align="right">Tipo</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {coffeeList.map((row) => (
              <TableRow
                key={`${row.title}-${row.id}`}
                sx={{ cursor:"pointer",'&:last-child td, &:last-child th': { border: 0 } }}
                onClick={()=>onClickItem({
                  id: row.id,
                  title: row.title,
                  type: typeOfCoffee
                })}
              >
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell align="right">{typeOfCoffee}</TableCell>
                
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }