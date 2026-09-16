/* ---------------------------------------------------------
   SHOWME — Modern YouTube Player Core
   This file owns ONLY the player instance + events.
   Queue + search engines plug into this via callbacks.
--------------------------------------------------------- */

let player = null;

/* ---------------------------------------------------------
   1. YouTube IFrame API bootstrap
--------------------------------------------------------- */
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    videoId: "",               // queue.js will load the first video
    playerVars: {
      autoplay: 1,
      controls: 1,
      rel: 0,
      modestbranding: 1,
      iv_load_policy: 3
    },
    events: {
      onReady: handlePlayerReady,
      onStateChange: handlePlayerStateChange
    }
  });
}

/* ---------------------------------------------------------
   2. Player ready → hand control to queue engine
--------------------------------------------------------- */
function handlePlayerReady(event) {
  if (window.queue && typeof window.queue.onPlayerReady === "function") {
    window.queue.onPlayerReady(player);
  }
}

/* ---------------------------------------------------------
   3. Player state changes → notify queue engine
--------------------------------------------------------- */
function handlePlayerStateChange(event) {
  if (window.queue && typeof window.queue.onPlayerStateChange === "function") {
    window.queue.onPlayerStateChange(player, event.data);
  }
}

/* ---------------------------------------------------------
   4. Public API for queue.js + search.js
--------------------------------------------------------- */
export function loadVideo(id) {
  if (player) {
    player.loadVideoById(id);
  }
}

export function cueVideo(id) {
  if (player) {
    player.cueVideoById(id);
  }
}

export function getPlayer() {
  return player;
}

