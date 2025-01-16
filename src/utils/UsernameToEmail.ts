export const staffEmailDomain = "a.mwh.muhammadiyah.org.sg"
export const residentEmailDomain = "u.mwh.muhammadiyah.org.sg"

export function usernameToEmail(username: string, isResident: boolean): string {
  return username + "@" + (isResident ? residentEmailDomain : staffEmailDomain)
}