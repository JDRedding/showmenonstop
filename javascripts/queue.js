/* ---------------------------------------------------------
   SHOWME — Nonstop Queue Engine
   Owns the list of videos + logic for advancing the queue.
   player.js calls into this via onPlayerReady/onStateChange.
--------------------------------------------------------- */

window.queue = {
  list: [],          // array of video IDs
  index: 0,          // current position
  player: null,      // reference to YT player instance

  /* -------------------------------------------------------
     Called by player.js when the player is ready
  ------------------------------------------------------- */
  onPlayerReady(player) {
    this.player = player;

    // If we already have a queue, start it
    if (this.list.length > 0) {
      this.playCurrent();
    }
  },

  /* -------------------------------------------------------
     Called by player.js when the player state changes
  ------------------------------------------------------- */
  onPlayerStateChange(player, state) {
    // When video ends → advance
    if (state === YT.PlayerState.ENDED) {
      this.next();
    }
  },

  /* -------------------------------------------------------
     Queue management
  ------------------------------------------------------- */
  setQueue(videoIds) {
    this.list = videoIds;
    this.index = 0;

    if (this.player) {
      this.playCurrent();
    }
  },

  add(videoId) {
    this.list.push(videoId);
  },

  clear() {
    this.list = [];
    this.index = 0;
  },

  /* -------------------------------------------------------
     Playback control
  ------------------------------------------------------- */
  playCurrent() {
    if (!this.player) return;
    const id = this.list[this.index];
    if (id) {
      this.player.loadVideoById(id);
    }
  },

  next() {
    this.index++;

    // If we reached the end, loop back to start
    if (this.index >= this.list.length) {
      this.index = 0;
    }

    this.playCurrent();
  },

  previous() {
    this.index--;

    if (this.index < 0) {
      this.index = this.list.length - 1;
    }

    this.playCurrent();
  }
};

