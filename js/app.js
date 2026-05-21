/* App: event wiring and initialisation */

// ── Score buttons (delegated to each team panel) ──────────────────────────
document.querySelectorAll('.btn-score').forEach(btn => {
  btn.addEventListener('click', () => {
    addScore(btn.dataset.team, parseInt(btn.dataset.pts, 10));
    renderAll();
  });
});

// ── Quarter buttons (delegated to container) ──────────────────────────────
document.getElementById('quarterBtns').addEventListener('click', e => {
  const btn = e.target.closest('.quarter-btn');
  if (!btn) return;
  state.quarter = parseInt(btn.dataset.quarter, 10);
  renderAll();
});

// ── Foul dots (delegated to each foul container) ──────────────────────────
['A', 'B'].forEach(team => {
  document.getElementById('fouls' + team).addEventListener('click', e => {
    const dot = e.target.closest('.foul-dot');
    if (!dot) return;
    const idx = parseInt(dot.dataset.index, 10);
    state.fouls[team] = (idx < state.fouls[team]) ? idx : idx + 1;
    renderFouls(team);
  });

  document.querySelector(`.btn-clear-fouls[data-team="${team}"]`)
    .addEventListener('click', () => {
      state.fouls[team] = 0;
      renderFouls(team);
    });
});

// ── Undo ──────────────────────────────────────────────────────────────────
document.getElementById('btnUndo').addEventListener('click', () => {
  if (undoLast()) renderAll();
});

// ── Timer ─────────────────────────────────────────────────────────────────
document.getElementById('btnStartStop').addEventListener('click', timer.toggle);
document.getElementById('btnResetTimer').addEventListener('click', timer.reset);
document.getElementById('timerDisplay').addEventListener('click', timer.toggle);
document.getElementById('timerMinInput').addEventListener('change', () => {
  if (!timer.isRunning()) timer.reset();
});

// ── Team name → update box score header live ──────────────────────────────
['nameA', 'nameB'].forEach(id =>
  document.getElementById(id).addEventListener('input', renderBoxScore)
);

// ── Reset modal ───────────────────────────────────────────────────────────
const resetModal = document.getElementById('resetModal');

document.getElementById('btnReset').addEventListener('click', () => {
  resetModal.classList.add('open');
});

document.getElementById('btnCancelReset').addEventListener('click', () => {
  resetModal.classList.remove('open');
});

document.getElementById('btnConfirmReset').addEventListener('click', () => {
  resetState();
  timer.reset();
  renderAll();
  resetModal.classList.remove('open');
});

resetModal.addEventListener('click', e => {
  if (e.target === resetModal) resetModal.classList.remove('open');
});

// ── Keyboard shortcuts (desktop) ──────────────────────────────────────────
document.addEventListener('keydown', e => {
  if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
  if (e.code  === 'Space')      { e.preventDefault(); timer.toggle(); }
  if (e.key   === 'z' || e.key === 'Z') { if (undoLast()) renderAll(); }
  if (e.key   === 'ArrowRight') { state.quarter = Math.min(NUM_QUARTERS - 1, state.quarter + 1); renderAll(); }
  if (e.key   === 'ArrowLeft')  { state.quarter = Math.max(0, state.quarter - 1); renderAll(); }
});

// ── Init ─────────────────────────────────────────────────────────────────
timer.reset();
renderAll();
