export function formatINR(amount: number): string {
  if (isNaN(amount) || amount === null || amount === undefined) return '₹0';
  const rounded = Math.round(amount);
  return '₹' + rounded.toLocaleString('en-IN');
}

export function formatNumber(amount: number): string {
  if (isNaN(amount)) return '0';
  return Math.round(amount).toLocaleString('en-IN');
}

export interface TaxCalculationResult {
  grossIncome: number;
  totalTdsDeducted: number;
  presumptiveExpense: number; // 50% under 44ADA
  netTaxableIncome: number;
  taxPayable: number;
  rebate87A: number;
  netTaxLiability: number;
  refundAmount: number;
  interestOnRefund: number; // ~6% under Sec 244A
  totalCreditExpected: number;
}

export function calculateGigTax(
  grossIncome: number,
  tdsDeducted: number,
  additionalDeductions: number = 0,
  regime: 'new' | 'old' = 'new'
): TaxCalculationResult {
  // 50% presumptive expense under 44ADA for freelance/gig contract services
  const presumptiveExpense = Math.round(grossIncome * 0.5);
  
  let netTaxableIncome = 0;
  let taxPayable = 0;
  let rebate87A = 0;
  
  if (regime === 'new') {
    // New regime for FY 24-25 (AY 25-26):
    // Presumptive income = 50% of gross
    const deemedIncome = grossIncome - presumptiveExpense;
    netTaxableIncome = Math.max(0, deemedIncome);
    
    // In new regime, taxable income up to ₹7,00,000 gets 100% 87A rebate (tax = 0)
    if (netTaxableIncome <= 700000) {
      taxPayable = 0;
      rebate87A = 0;
    } else {
      // Slabs above 7L if any
      const taxableOver7L = netTaxableIncome - 700000;
      taxPayable = Math.round(taxableOver7L * 0.1);
    }
  } else {
    // Old regime: Gross - 50% expense - 80C/80D deductions
    const deemedIncome = grossIncome - presumptiveExpense - additionalDeductions;
    netTaxableIncome = Math.max(0, deemedIncome);
    
    // In old regime, income up to 5L gets 87A rebate
    if (netTaxableIncome <= 500000) {
      taxPayable = 0;
      rebate87A = 0;
    } else {
      const taxableOver5L = netTaxableIncome - 500000;
      taxPayable = Math.round(taxableOver5L * 0.2);
    }
  }

  const netTaxLiability = Math.max(0, taxPayable - rebate87A);
  
  // Refund = TDS deducted - Net tax liability (almost always 100% of TDS for gig riders!)
  const refundAmount = Math.max(0, tdsDeducted - netTaxLiability);
  
  // ITD pays ~0.5% per month interest under Section 244A for refund delays (~₹120-₹350)
  const interestOnRefund = refundAmount > 0 ? Math.round(refundAmount * 0.03) : 0;
  const totalCreditExpected = refundAmount + interestOnRefund;

  return {
    grossIncome,
    totalTdsDeducted: tdsDeducted,
    presumptiveExpense,
    netTaxableIncome,
    taxPayable,
    rebate87A,
    netTaxLiability,
    refundAmount,
    interestOnRefund,
    totalCreditExpected,
  };
}
