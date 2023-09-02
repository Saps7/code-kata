import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getBalanceSheet } from '../../api';

const TAX_RATE = 0.07;

function ccyFormat(num: number) {
  return `${num.toFixed(2)}`;
}

function priceRow(qty: number, unit: number) {
  return qty * unit;
}

function createRow(desc: string, qty: number, unit: number) {
  const price = priceRow(qty, unit);
  return { desc, qty, unit, price };
}

interface Row {
  desc: string;
  qty: number;
  unit: number;
  price: number;
}

function subtotal(items: readonly Row[]) {
  return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
}

const rows = [
  createRow('Paperclips (Box)', 100, 1.15),
  createRow('Paper (Case)', 10, 45.99),
  createRow('Waste Basket', 2, 17.99),
];


const invoiceSubtotal = subtotal(rows);
const invoiceTaxes = TAX_RATE * invoiceSubtotal;
const invoiceTotal = invoiceTaxes + invoiceSubtotal;

export default async function SpanningTable(company: any) {
    
    const balanceSheet = await getBalanceSheet(company);
    console.log(balanceSheet);
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                <TableHead>
                <TableRow>
                    <TableCell align="center">
                            {company} Balance Sheet
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
                {balanceSheet.map((eachMonth) => (
                    <TableRow key={eachMonth.month}>
                    <TableCell>{eachMonth.year}</TableCell>
                    <TableCell align="right">{eachMonth.month}</TableCell>
                    <TableCell align="right">{eachMonth.profitOrLoss}</TableCell>
                    <TableCell align="right">{eachMonth.assetsValue}</TableCell>
                    </TableRow>
                ))}
                <TableRow>
                    <TableCell rowSpan={3} />
                    <TableCell colSpan={2}>Subtotal</TableCell>
                    <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Tax</TableCell>
                    <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
                    <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colSpan={2}>Total</TableCell>
                    <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
                </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    );
}