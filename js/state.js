/* State: source of truth for the entire app */

const NUM_QUARTERS = 8;
const MAX_FOULS    = 5;
const QUARTER_LABELS = Array.from({ length: NUM_QUARTERS }, (_, i) => `Q${i + 1}`);

const state = {
  quarterPts: {
    A: Array(NUM_QUARTERS).fill(0),
    B: Array(NUM_QUARTERS).fill(0),
  },
  fouls:   { A: 0, B: 0 },
  quarter: 0,    // 0-indexed active quarter
  history: [],   // { team, pts, quarter, time, totalA, totalB }
};

function totalScore(team) {
  return state.quarterPts[team].reduce((sum, v) => sum + v, 0);
}

function addScore(team, pts) {
  const q   = state.quarter;
  const cur = state.quarterPts[team][q];
  if (cur + pts < 0) return;               // can't go negative within a quarter
  state.quarterPts[team][q] = cur + pts;
  state.history.push({
    team, pts, quarter: q,
    time:   document.getElementById('timerDisplay').textContent,
    totalA: totalScore('A'),
    totalB: totalScore('B'),
  });
}

function undoLast() {
  const last = state.history.pop();
  if (!last) return false;
  state.quarterPts[last.team][last.quarter] =
    Math.max(0, state.quarterPts[last.team][last.quarter] - last.pts);
  return true;
}

function resetState() {
  state.quarterPts = {
    A: Array(NUM_QUARTERS).fill(0),
    B: Array(NUM_QUARTERS).fill(0),
  };
  state.fouls   = { A: 0, B: 0 };
  state.quarter = 0;
  state.history = [];
}
