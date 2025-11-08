
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  // Ensure amount is a number and not undefined
  if (amount === undefined || amount === null) {
    amount = 0;
  }
  
  // Convert to number if it's not already
  const numAmount = Number(amount);
  
  // Format the currency
  return new Intl.NumberFormat('en-EG', {
    style: 'currency',
    currency: 'EGP',
    minimumFractionDigits: 0
  }).format(numAmount);
}
