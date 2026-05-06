/**
 * Utility to detect user's location based on IP
 */

export async function getUserCountryCode(): Promise<string | null> {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    return data.country_code; // e.g., 'IN' for India
  } catch (error) {
    console.error('Error fetching location:', error);
    return null;
  }
}

export function isUserInIndia(countryCode: string | null): boolean {
  return countryCode === 'IN';
}
