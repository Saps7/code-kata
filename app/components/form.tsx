'use client'
import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from 'next/link';
import Box from '@mui/material/Box';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';



function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const defaultTheme = createTheme();

export default function Form() {
  const [company, setCompany] = useState('');
  const [year, setYear] = useState(0);
  const [provider, setProvider] = useState('');
  const [loan, setLoan] = useState(0);




  // const handleSubmit = async (e: any) => {
  //   e.preventDefault();

  //   if (company == '' || year == 0 || !provider || loan == 0) {
  //     alert("Title and description are required.");
  //     return;
  //   }

  //   else{
  //     router.push({
  //       pathcompany: '/accountOverview',
  //       query: { company : company }
  //     });
  //   }
  // }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <AccountBalanceIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Apply for Loan
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="company"
              label="Company Name"
              className="company"
              value={company}
              onChange={(e) => setCompany(e.target.value as string)}
              autoComplete="name"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="Year Established"
              label="Year Established"
              type="number"
              id="Year Established"
              value={year}
              onChange={(e) => setYear(e.target.value as unknown as number)}
              autoComplete="Year Established"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="Loan Amount"
              label="Loan Amount"
              type="number"
              id="Loan Amount"
              value={loan}
              onChange={(e) => setLoan(e.target.value as unknown as number)}
              autoComplete="Year Established"
            />
            <FormControl sx={{ mt: 1, minWidth: 500 }}>
              <InputLabel id="demo-simple-select-autowidth-label" >Accounting Provider</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={provider}
                onChange={(e) => setProvider(e.target.value as string)}
                autoWidth
                label="Accounting Provider"
              >
                <MenuItem value={'Xero'}>Xero</MenuItem>
                <MenuItem value={'MYOB'}>MYOB</MenuItem>
              </Select>
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              <Link href={{
                pathname: '/accountOverview',
                query: { company }
              }}>
                Submit
              </Link>
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}