export function generateRandomCaseNumber(): string {
  const digits: string = "0123456789";
  let caseNumber: string = "";

  for (let i: number = 0; i < 8; i++) {
    const randomIndex: number = Math.floor(Math.random() * digits.length);
    caseNumber += digits.charAt(randomIndex);
  }

  return caseNumber;
}
