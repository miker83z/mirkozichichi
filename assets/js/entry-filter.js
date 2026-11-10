// Type filters and collapsible lists for the entry lists (Research, Talks, Tutoring, Projects), and the
// posts that unfold on the Blog page.
// A chip bar (.entry-filters) and a "Show all" button (.entry-more) act on the table named in their
// data-target. Without JavaScript the chips and the button stay hidden and every entry is shown.
document.querySelectorAll('table.entries').forEach(function (table) {
  var bar = document.querySelector('.entry-filters[data-target="' + table.id + '"]');
  var more = document.querySelector('.entry-more[data-target="' + table.id + '"]');
  var rows = Array.prototype.slice.call(table.querySelectorAll('tr.entry'));
  var limit = parseInt(table.getAttribute('data-collapse'), 10) || Infinity;
  var type = '';
  var expanded = false;

  function update() {
    var matching = rows.filter(function (row) {
      return !type || row.getAttribute('data-type') === type;
    });
    rows.forEach(function (row) {
      row.hidden = matching.indexOf(row) === -1 || (!expanded && matching.indexOf(row) >= limit);
    });
    if (more) {
      more.hidden = matching.length <= limit;
      more.textContent = expanded ? 'Show fewer' : 'Show all ' + matching.length;
      more.setAttribute('aria-expanded', String(expanded));
    }
  }

  if (bar) {
    bar.hidden = false;
    bar.addEventListener('click', function (event) {
      var chip = event.target.closest('.entry-chip');
      if (!chip) return;
      type = chip.getAttribute('data-filter');
      bar.querySelectorAll('.entry-chip').forEach(function (c) {
        c.setAttribute('aria-pressed', String(c === chip));
      });
      update();
    });
  }

  if (more) {
    more.addEventListener('click', function () {
      expanded = !expanded;
      update();
      if (!expanded) more.scrollIntoView({ block: 'nearest' });
    });
  }

  update();
});

// Blog posts (_includes/post-row.html): "Show more" swaps the excerpt for the whole post, "Show less" back
document.querySelectorAll('.entry-expand').forEach(function (button) {
  var row = button.closest('tr.entry');
  var excerpt = row.querySelector('.entry-desc');
  var full = document.getElementById(button.getAttribute('aria-controls'));
  var expanded = false;

  button.addEventListener('click', function () {
    expanded = !expanded;
    excerpt.hidden = expanded;
    full.hidden = !expanded;
    row.classList.toggle('entry--expanded', expanded);
    button.textContent = expanded ? 'Show less' : 'Show more';
    button.setAttribute('aria-expanded', String(expanded));
    if (!expanded) row.scrollIntoView({ block: 'nearest' });
  });

  button.hidden = false;
});
