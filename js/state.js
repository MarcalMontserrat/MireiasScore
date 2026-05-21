/* State: source of truth for the entire app */

const NUM_QUARTERS   = 8;
const MAX_FOULS      = 5;
const QUARTER_LABELS = Array.from({ length: NUM_QUARTERS }, (_, i) => `Q${i + 1}`);

const state = {
  quarterPts: {
    A: Array(NUM_QUARTERS).fill(0),
    B: Array(NUM_QUARTERS).fill(0),
  },
  quarter: 0,    // 0-indexed active quarter
};

function totalScore(team) {
  return state.quarterPts[team].reduce((sum, v) => sum + v, 0);
}

function addScore(team, pts) {
  const q   = state.quarter;
  const cur = state.quarterPts[team][q];
  if (cur + pts < 0) return;
  state.quarterPts[team][q] = cur + pts;
}

function undoLast() {
  return false; // history removed — no-op kept for safety
}

function resetState() {
  state.quarterPts = {
    A: Array(NUM_QUARTERS).fill(0),
    B: Array(NUM_QUARTERS).fill(0),
  };
  state.quarter = 0;
}
