"use client";

import React, { useState, useEffect } from "react";
import Form from "./components/form";
import SpanningTable from "./components/balanceSheet";
import { Container } from "@mui/material";

const Page = () => {
  const [balanceSheets, setBalanceSheets] = useState([]);
  const [companyDetails, setCompanyDetails] = useState<any>({});
  const [totalProfitOrLoss, setTotalProfitOrLoss] = useState(0);
  const [averageAssetsValue, setAverageAssetsValue] = useState(0);
  const [preAssessment, setPreAssessment] = useState(20);

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
    setTotalProfitOrLoss(totalProfitOrLoss);
    setAverageAssetsValue(averageAssetsValue);

    if (totalProfitOrLoss > 0) {
      setPreAssessment(60);
    }

    if (totalProfitOrLoss > 0 && averageAssetsValue > companyDetails?.loan) {
      setPreAssessment(100);
    }
  }, [balanceSheets]);

  return (
    <div>
      <Form
        setBalanceSheets={setBalanceSheets}
        setCompanyDetails={setCompanyDetails}
      />
      {balanceSheets.length > 0 && (
        <div className="py-4 px-10 text-2xl bg-gray-300 rounded-md">
          <h1 className="font-bold">Pre-Assesment: {preAssessment} </h1>
        </div>
      )}
      {balanceSheets.length > 0 && (
        <SpanningTable company={companyDetails?.company} balanceSheet={balanceSheets} />
      )}
    </div>
  );
};
export default Page;
