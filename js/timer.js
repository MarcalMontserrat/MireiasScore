/* Timer: countdown per quarter */

const timer = (() => {
  let running  = false;
  let seconds  = 0;
  let interval = null;

  function configuredSeconds() {
    const val = parseInt(document.getElementById('timerMinInput').value, 10);
    return (isNaN(val) || val < 1 ? 8 : val) * 60;
  }

  function format(s) {
    const m   = Math.floor(s / 60).toString().padStart(2, '0');
    const sec = (s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
  }

  function updateDisplay() {
    const el = document.getElementById('timerDisplay');
    el.textContent = format(seconds);
    el.className   = 'timer-display' +
      (running           ? ' running' : '') +
      (seconds <= 30 && seconds > 0 ? ' low' : '');
  }

  function stop() {
    running = false;
    clearInterval(interval);
    document.getElementById('btnStartStop').textContent = '▶';
    updateDisplay();
  }

  function start() {
    if (seconds <= 0) seconds = configuredSeconds();
    running = true;
    document.getElementById('btnStartStop').textContent = '⏸';
    interval = setInterval(() => {
      if (seconds <= 0) { stop(); return; }
      seconds--;
      updateDisplay();
    }, 1000);
  }

  function toggle() { running ? stop() : start(); }

  function reset() {
    stop();
    seconds = configuredSeconds();
    updateDisplay();
  }

  function isRunning() { return running; }

  // expose
  return { start, stop, toggle, reset, isRunning, format, updateDisplay,
           getSeconds: () => seconds,
           setSeconds: (s) => { seconds = s; } };
})();
