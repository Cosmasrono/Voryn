import type { Product } from "./products";

export type Frequency = "weekly" | "monthly";

export type LoanEstimate = {
  amount: number;
  months: number;
  days: number;
  fee: number;
  total: number;
  installments: number;
  perInstallment: number;
  feePercentOfPrincipal: number;
  frequency: Frequency;
};

/**
 * Indicative repayment estimate using a simple monthly service-fee model.
 * Figures are illustrative only — not an offer of credit or a quotation.
 */
export function estimateLoan(
  product: Product,
  amount: number,
  tenureValue: number,
  frequency: Frequency
): LoanEstimate {
  const days = product.tenureUnit === "months" ? tenureValue * 30 : tenureValue;
  const months = days / 30;

  const fee = amount * product.rateMonthly * months;
  const total = amount + fee;

  const periodPerInstallment = frequency === "weekly" ? 7 : 30;
  const installments = Math.max(1, Math.round(days / periodPerInstallment));
  const perInstallment = total / installments;

  return {
    amount,
    months,
    days,
    fee,
    total,
    installments,
    perInstallment,
    feePercentOfPrincipal: (fee / amount) * 100,
    frequency,
  };
}

/** Which repayment frequencies make sense for a given tenure. */
export function allowedFrequencies(product: Product, tenureValue: number): Frequency[] {
  const days = product.tenureUnit === "months" ? tenureValue * 30 : tenureValue;
  if (days < 21) return ["weekly"];
  if (days <= 45) return ["weekly", "monthly"];
  return ["monthly"];
}
