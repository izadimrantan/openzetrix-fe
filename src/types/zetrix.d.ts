interface Zetrix {
  authorize: (
    params: { method: string; param?: any },
    callback: (response: { code: number; data?: any; message?: string }) => void
  ) => void;

  signMessage: (
    params: { message: string },
    callback: (response: { code: number; data?: any; message?: string }) => void
  ) => void;
}

interface Window {
  zetrix: Zetrix;
}

interface SmartContractCode {
  name: string;
  code: string;
}

interface ZtpContractInfo {
  name: string;
  symbol: string;
  description: string;
  decimals?: string;
  version: string;
}