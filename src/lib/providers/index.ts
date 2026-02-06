import { EspnSportsProvider } from "./espnSportsProvider";
import { NewsApiAiProvider, NewsApiWorldProvider } from "./newsApiProvider";
import {
  PlaceholderAiNewsProvider,
  PlaceholderSportsProvider,
  PlaceholderWorldNewsProvider
} from "./placeholderProvider";

const usePlaceholder = process.env.USE_PLACEHOLDER_DATA === "true";

export const sportsProvider = usePlaceholder ? new PlaceholderSportsProvider() : new EspnSportsProvider();
export const worldNewsProvider = usePlaceholder ? new PlaceholderWorldNewsProvider() : new NewsApiWorldProvider();
export const aiNewsProvider = usePlaceholder ? new PlaceholderAiNewsProvider() : new NewsApiAiProvider();
