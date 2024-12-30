export const formatRegistrationTime = (registrationTimeSeconds: number): string => {
  const registrationDate = new Date(registrationTimeSeconds * 1000);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - registrationDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffYears > 0) return `${diffYears} years`;
  if (diffMonths > 0) return `${diffMonths} months`;
  if (diffWeeks > 0) return `${diffWeeks} weeks`;
  return `${diffDays} days`;
}; 