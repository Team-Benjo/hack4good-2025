export function usernameToEmail(username: string, isResident: boolean): string {
  const prefix = isResident ? "u" : "a";
  return username + "@" + prefix + ".mwh.muhammadiyah.org.sg"
}