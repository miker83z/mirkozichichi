// Light/dark toggle in the sidebar. The page follows the system setting; a click switches to the
// other mode for the current visit only (sessionStorage, applied early by _includes/head.html).
// Switching back to the system's mode, or a change of the system setting, returns to following it.
(function () {
  var button = document.querySelector('.theme-toggle');
  if (!button) return;
  var root = document.documentElement;
  var system = window.matchMedia('(prefers-color-scheme: dark)');

  function systemMode() {
    return system.matches ? 'dark' : 'light';
  }

  function current() {
    return root.getAttribute('data-theme') || systemMode();
  }

  function followSystem() {
    root.removeAttribute('data-theme');
    try { sessionStorage.removeItem('theme'); } catch (e) {}
  }

  function update() {
    var next = current() === 'dark' ? 'light' : 'dark';
    var label = next === 'dark' ? 'Dark mode' : 'Light mode';
    button.setAttribute('aria-label', 'Switch to ' + label.toLowerCase());
    button.querySelector('.theme-toggle-label').textContent = label;
    button.querySelector('.theme-icon-dark').style.display = next === 'dark' ? '' : 'none';
    button.querySelector('.theme-icon-light').style.display = next === 'light' ? '' : 'none';
  }

  button.addEventListener('click', function () {
    var next = current() === 'dark' ? 'light' : 'dark';
    if (next === systemMode()) {
      followSystem();
    } else {
      root.setAttribute('data-theme', next);
      try { sessionStorage.setItem('theme', next); } catch (e) {}
    }
    update();
  });

  system.addEventListener('change', function () {
    followSystem();
    update();
  });

  button.hidden = false;
  update();
})();
