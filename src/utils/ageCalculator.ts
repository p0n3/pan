import type { AgeDisplay } from '../types';

export function calculateAge(birthDate: string): AgeDisplay {
  const birth = new Date(birthDate);
  const now = new Date();
  
  // Calculate the difference in milliseconds
  const diffMs = now.getTime() - birth.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  // If less than 7 days, show days
  if (diffDays < 7) {
    return {
      value: diffDays,
      unit: 'days',
      formatted: diffDays === 1 ? '1 day' : `${diffDays} days`
    };
  }
  
  // If less than 4 weeks (28 days), show weeks
  if (diffDays < 28) {
    const weeks = Math.floor(diffDays / 7);
    const remainingDays = diffDays % 7;
    const weeksText = weeks === 1 ? '1 week' : `${weeks} weeks`;
    const daysText = remainingDays > 0 ? ` ${remainingDays}d` : '';
    
    return {
      value: parseFloat((diffDays / 7).toFixed(1)),
      unit: 'weeks',
      formatted: `${weeksText}${daysText}`
    };
  }
  
  // Calculate months and years more precisely
  let years = now.getFullYear() - birth.getFullYear();
  let months = now.getMonth() - birth.getMonth();
  let days = now.getDate() - birth.getDate();
  
  // Adjust for negative days
  if (days < 0) {
    months--;
    const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += lastMonth.getDate();
  }
  
  // Adjust for negative months
  if (months < 0) {
    years--;
    months += 12;
  }
  
  const totalMonths = years * 12 + months;
  
  // If less than 12 months, show months
  if (totalMonths < 12) {
    const monthsText = totalMonths === 1 ? '1 month' : `${totalMonths} months`;
    const daysText = days > 0 ? ` ${days}d` : '';
    
    return {
      value: parseFloat((totalMonths + days / 30).toFixed(1)),
      unit: 'months',
      formatted: `${monthsText}${daysText}`
    };
  }
  
  // Show years with decimal
  const decimalYears = years + months / 12;
  
  return {
    value: parseFloat(decimalYears.toFixed(1)),
    unit: 'years',
    formatted: `${decimalYears.toFixed(1)} years`
  };
}

export function getNextBirthday(birthDate: string): Date {
  const birth = new Date(birthDate);
  const now = new Date();
  const currentYear = now.getFullYear();
  
  // Create this year's birthday
  const thisYearBirthday = new Date(currentYear, birth.getMonth(), birth.getDate());
  
  // If this year's birthday has passed, return next year's
  if (thisYearBirthday < now) {
    return new Date(currentYear + 1, birth.getMonth(), birth.getDate());
  }
  
  return thisYearBirthday;
}

export function getDaysUntilBirthday(birthDate: string): number {
  const nextBirthday = getNextBirthday(birthDate);
  const now = new Date();
  const diffMs = nextBirthday.getTime() - now.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}
