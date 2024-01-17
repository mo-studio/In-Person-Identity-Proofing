export function generateRandomCaseNumber(): string {
  const digits = "0123456789";
  let caseNumber = "";

  for (let i = 0; i < 8; i++) {
    const randomIndex: number = Math.floor(Math.random() * digits.length);
    caseNumber += digits.charAt(randomIndex);
  }

  return caseNumber;
}
