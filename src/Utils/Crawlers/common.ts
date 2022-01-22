import { crawlApartments } from "./apartments";

export async function crawlLink(linkUrl: string): Promise<string[]> {
  if (linkUrl.includes("apartments.com")) {
    return crawlApartments(linkUrl);
  } else {
    console.error("No crawler found");
    return [];
  }
}
