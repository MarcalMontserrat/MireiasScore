/* Render: all DOM updates. Called after every state change. */

function renderQuarterBtns() {
  const container = document.getElementById('quarterBtns');
  container.innerHTML = '';
  QUARTER_LABELS.forEach((label, i) => {
    const btn     = document.createElement('button');
    const hasData = quarterTotal('A', i) > 0 || quarterTotal('B', i) > 0;
    btn.className = 'quarter-btn' +
      (state.quarter === i ? ' active' : '') +
      (hasData && state.quarter !== i ? ' played' : '');
    btn.textContent    = label;
    btn.dataset.quarter = i;
    container.appendChild(btn);
  });
}

function renderScores() {
  const q = state.quarter;
  document.getElementById('totalA').textContent = totalScore('A');
  document.getElementById('totalB').textContent = totalScore('B');
  document.getElementById('qptsA').textContent  =
    `${QUARTER_LABELS[q]} · ${quarterTotal('A', q)} pts`;
  document.getElementById('qptsB').textContent  =
    `${QUARTER_LABELS[q]} · ${quarterTotal('B', q)} pts`;
}

function shotSummary(team, q) {
  const b = quarterBreakdown(team, q);
  const total = quarterTotal(team, q);
  if (total === 0) return '—';
  const parts = [];
  if (b[1]) parts.push(`<span class="shot-type">1×${b[1]}</span>`);
  if (b[2]) parts.push(`<span class="shot-type">2×${b[2]}</span>`);
  if (b[3]) parts.push(`<span class="shot-type">3×${b[3]}</span>`);
  return `<strong>${total}</strong><br><span class="shot-detail">${parts.join(' ')}</span>`;
}

function renderBoxScore() {
  document.getElementById('thA').textContent =
    document.getElementById('nameA').value || 'LOCAL';
  document.getElementById('thB').textContent =
    document.getElementById('nameB').value || 'VISITANTE';

  const tbody = document.getElementById('boxBody');
  tbody.innerHTML = '';

  QUARTER_LABELS.forEach((label, i) => {
    const tr = document.createElement('tr');
    if (i === state.quarter) tr.className = 'current-quarter';
    tr.innerHTML =
      `<td>${label}</td>` +
      `<td>${shotSummary('A', i)}</td>` +
      `<td>${shotSummary('B', i)}</td>`;
    tbody.appendChild(tr);
  });

  const totRow     = document.createElement('tr');
  totRow.className = 'total-row';
  totRow.innerHTML =
    `<td>TOTAL</td>` +
    `<td>${totalScore('A')}</td>` +
    `<td>${totalScore('B')}</td>`;
  tbody.appendChild(totRow);
}

function renderHistory() {} // removed — kept as no-op so app.js doesn't break

function renderAll() {
  renderQuarterBtns();
  renderScores();
  renderBoxScore();
}
