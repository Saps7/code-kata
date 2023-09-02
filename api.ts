const baseUrl = 'http://localhost:3001';
import {BalanceSheetDataItem} from "./types/balanceSheets";

export const getBalanceSheet = async (company: string): Promise<BalanceSheetDataItem[]> => {
  const res = await fetch(`${baseUrl}/Companies?Company=${company}`, { cache: 'no-store' });
  const sheets = await res.json();
  return sheets.sheet;
}

