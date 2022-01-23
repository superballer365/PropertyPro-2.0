import { crawlApartments } from "./apartments";

export async function crawlLink(listingUrl: string): Promise<string[]> {
  if (listingUrl.includes("apartments.com")) {
    return crawlApartments(listingUrl);
  } else {
    console.error("No crawler found");
    return [];
  }
}
