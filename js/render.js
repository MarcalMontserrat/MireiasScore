/* Render: all DOM updates. Called after every state change. */

function renderQuarterBtns() {
  const container = document.getElementById('quarterBtns');
  container.innerHTML = '';
  QUARTER_LABELS.forEach((label, i) => {
    const btn     = document.createElement('button');
    const hasData = state.quarterPts.A[i] > 0 || state.quarterPts.B[i] > 0;
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
    `${QUARTER_LABELS[q]} · ${state.quarterPts.A[q]} pts`;
  document.getElementById('qptsB').textContent  =
    `${QUARTER_LABELS[q]} · ${state.quarterPts.B[q]} pts`;
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
      `<td>${state.quarterPts.A[i]}</td>` +
      `<td>${state.quarterPts.B[i]}</td>`;
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

function renderHistory() {
  const list = document.getElementById('historyList');
  list.innerHTML = '';
  [...state.history].reverse().forEach(e => {
    const li   = document.createElement('li');
    const name = document.getElementById('name' + e.team).value || e.team;
    const sign = e.pts > 0 ? '+' : '';
    li.innerHTML =
      `[${QUARTER_LABELS[e.quarter]}] ` +
      `<strong>${name}</strong> ${sign}${e.pts} → ${e.totalA}–${e.totalB}`;
    list.appendChild(li);
  });
}

function renderAll() {
  renderQuarterBtns();
  renderScores();
  renderBoxScore();
  renderHistory();
}
