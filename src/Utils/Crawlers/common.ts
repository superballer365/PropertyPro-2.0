import { crawlApartments } from "./apartments";

export function crawlLink(linkUrl: string): string[] {
  if (linkUrl.includes("apartments.com")) {
    return crawlApartments(linkUrl);
  } else {
    console.error("No crawler found");
    return [];
  }
}
