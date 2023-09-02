"use client";
import React, { useState, useEffect } from "react";
import Typography from '@mui/material/Typography';
import Form from "./components/form";
import SpanningTable from "./components/balanceSheet";

const Page = () => {
  const [balanceSheets, setBalanceSheets] = useState([]);
  const [companyDetails, setCompanyDetails] = useState<any>({});
  const [preAssessment, setPreAssessment] = useState(20);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  function Copyright(props: any) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
          Loan Application Manager 
         {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  useEffect(() => {
    if (balanceSheets.length === 0) return;
    const first12Objects = balanceSheets.slice(0, 12);

    // Calculate the average profitOrLoss
    const totalProfitOrLoss = first12Objects.reduce(
      (acc: any, obj: any) => acc + obj.profitOrLoss,
      0
    );
    const totalAssestsValue = first12Objects.reduce(
      (acc: any, obj: any) => acc + obj.assetsValue,
      0
    );
    let averageAssetsValue = totalAssestsValue / first12Objects.length;

    console.log(totalProfitOrLoss);
    console.log(averageAssetsValue);

    if (totalProfitOrLoss > 0) {
      setPreAssessment(60);
    }

    if (totalProfitOrLoss > 0 && averageAssetsValue > companyDetails?.loan) {
      setPreAssessment(100);
    }
  }, [balanceSheets]);

  

  return (
    <div>
      {!isFormSubmitted &&
        (<Form
        setBalanceSheets={setBalanceSheets}
        setCompanyDetails={setCompanyDetails}
        setIsFormSubmitted={setIsFormSubmitted}
        />
      )}
      
      {balanceSheets.length > 0 && (
        <SpanningTable company={companyDetails?.company} balanceSheet={balanceSheets} provider={companyDetails?.provider} />
      )}
      {balanceSheets.length > 0 && (
        <div className="py-4 px-10 text-2xl bg-gray-300 rounded-md" style={{marginTop: "30px"}}>
          <h1 className="font-bold" style={{textAlign: "center"}}>Pre-Assesment: {preAssessment} </h1>
        </div>
      )}
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </div>
  );
};
export default Page;
