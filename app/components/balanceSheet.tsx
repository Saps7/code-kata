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
  const avgAssetValue = parseInt(totalAssetValue(balanceSheet)/balanceSheet.length);

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
                  <TableCell align="right">Month</TableCell>
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
                  <TableCell></TableCell>
                  <TableCell align="right">Total Profit or Loss</TableCell>
                  <TableCell align="right">{profit}</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
                <TableRow>
                <TableCell></TableCell>
                  <TableCell align="right">Average Asset Value</TableCell>
                  <TableCell align="right"></TableCell>
                  <TableCell align="right">{avgAssetValue}</TableCell>
                </TableRow>
              </TableBody>
          </Table>
        </TableContainer>
      </div>
  );
}