/* State: source of truth for the entire app */

const NUM_QUARTERS   = 8;
const QUARTER_LABELS = Array.from({ length: NUM_QUARTERS }, (_, i) => `Q${i + 1}`);

// shots[team][quarter] = array of point values (1, 2 or 3)
const state = {
  shots: {
    A: Array.from({ length: NUM_QUARTERS }, () => []),
    B: Array.from({ length: NUM_QUARTERS }, () => []),
  },
  quarter: 0,
};

function quarterTotal(team, q) {
  return state.shots[team][q].reduce((s, v) => s + v, 0);
}

function totalScore(team) {
  return state.shots[team].reduce((s, arr) => s + arr.reduce((a, v) => a + v, 0), 0);
}

// Returns { 1: count, 2: count, 3: count } for a given quarter
function quarterBreakdown(team, q) {
  const b = { 1: 0, 2: 0, 3: 0 };
  state.shots[team][q].forEach(v => { if (b[v] !== undefined) b[v]++; });
  return b;
}

// pts = 1 | 2 | 3  (add shot)  or  -1  (subtract 1 pt, min 0)
function addScore(team, pts) {
  const q   = state.quarter;
  const arr = state.shots[team][q];
  if (pts === -1) {
    if (quarterTotal(team, q) > 0) arr.push(-1);  // store as negative adjustment
  } else {
    arr.push(pts);
  }
}

function resetState() {
  state.shots = {
    A: Array.from({ length: NUM_QUARTERS }, () => []),
    B: Array.from({ length: NUM_QUARTERS }, () => []),
  };
  state.quarter = 0;
}
