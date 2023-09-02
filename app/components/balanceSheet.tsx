import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {BalanceSheetDataItem} from '../../types/balanceSheets';
import NavBar from './NavBar';

const months = ["blank", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export default function SpanningTable({company, balanceSheet, provider}: any) {
  function totalProfit(data: readonly BalanceSheetDataItem[]) {
    return data.map(d => d.profitOrLoss).reduce((a, b) => a + b);
  }
  function totalAssetValue(data: readonly BalanceSheetDataItem[]) {
    return data.map(d => d.assetsValue).reduce((a, b) => a + b);
  }

  const profit = totalProfit(balanceSheet);
  const totalAsset = totalAssetValue(balanceSheet);

  return (
      <div>
        <NavBar provider={provider}/>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="spanning table">
              <TableHead>
              <TableRow>
                  <TableCell align="center">
                          {company} Balance Sheet Review
                  </TableCell>   
              </TableRow>
              <TableRow>
                  <TableCell>Year</TableCell>
                  <TableCell >Month</TableCell>
                  <TableCell align="right">Profit or Loss</TableCell>
                  <TableCell align="right">Asset Value</TableCell>
              </TableRow>
              </TableHead>
              <TableBody>
              {balanceSheet.map((eachMonth: any) => (
                  <TableRow key={eachMonth.month}>
                  <TableCell>{eachMonth.year}</TableCell>
                  <TableCell align="right">{months[eachMonth.month]}</TableCell>
                  <TableCell align="right">{eachMonth.profitOrLoss}</TableCell>
                  <TableCell align="right">{eachMonth.assetsValue}</TableCell>
                  </TableRow>
              ))}
              <TableRow>
                  <TableCell rowSpan={3} />
                  <TableCell colSpan={2}>Total Profit or Loss</TableCell>
                  <TableCell align="left">{profit}</TableCell>
              </TableRow>
              <TableRow>
                  <TableCell colSpan={2}>Total Asset Value</TableCell>
                  <TableCell align="right">{totalAsset}</TableCell>
              </TableRow>
              </TableBody>
          </Table>
        </TableContainer>
      </div>
  );
}