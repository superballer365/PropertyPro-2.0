import { crawlApartments } from "./apartments";

export async function crawlLink(listingUrl: string): Promise<string[]> {
  return crawlApartments(listingUrl);
  // TODO: cleanup
  if (listingUrl.includes("apartments.com")) {
    return crawlApartments(listingUrl);
  } else {
    console.error("No crawler found");
    return [];
  }
}
