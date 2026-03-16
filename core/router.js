/**
 * core/router.js - Hash-based router for the Internet Time Machine
 */
const Router = {
  _navigating: false,

  init() {
    window.addEventListener('hashchange', () => this._onHashChange());
    // Read initial hash
    this._onHashChange();
  },

  navigate(era) {
    const desired = '#/' + era;
    if (window.location.hash === desired) return;
    this._navigating = true;
    window.location.hash = desired;
    this._navigating = false;
  },

  _onHashChange() {
    const hash = window.location.hash; // e.g. "#/1998"
    const match = hash.match(/^#\/(\d+)$/);
    if (match) {
      const era = match[1];
      const valid = ['1998', '2006', '2013', '2050'];
      if (valid.includes(era)) {
        // Avoid re-entrant calls if App.switchEra triggered this
        if (typeof App !== 'undefined' && App.currentEra !== era) {
          App.switchEra(era);
        }
      }
    }
  }
};
