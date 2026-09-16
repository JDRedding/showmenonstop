/* ---------------------------------------------------------
   SHOWME — Modern YouTube Search Engine
   Owns ONLY: querying YouTube Data API v3 + returning IDs.
   queue.js handles playback. player.js handles the player.
--------------------------------------------------------- */

const API_KEY = "";   // <-- insert YouTube Data API v3 key

/* ---------------------------------------------------------
   1. Perform a YouTube search
--------------------------------------------------------- */
export async function searchYouTube(query) {
  const endpoint =
    "https://www.googleapis.com/youtube/v3/search" +
    `?part=snippet&type=video&maxResults=25&q=${encodeURIComponent(query)}` +
    `&key=${API_KEY}`;

  const response = await fetch(endpoint);
  const data = await response.json();

  // Extract video IDs
  const ids = data.items.map(item => item.id.videoId);

  // Feed into nonstop queue
  if (window.queue && typeof window.queue.setQueue === "function") {
    window.queue.setQueue(ids);
  }

  return ids;
}

/* ---------------------------------------------------------
   2. Hook for index.html search form
--------------------------------------------------------- */
export function submitSearchFromUI() {
  const input = document.getElementById("query");
  const q = input.value.trim();

  if (q.length > 0) {
    searchYouTube(q);
  }
}

