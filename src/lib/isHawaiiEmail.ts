// src/lib/isHawaiiEmail.ts
export default function isHawaiiEmail(email: string): boolean {
  return /@hawaii\.edu$/i.test(email.trim());
}
