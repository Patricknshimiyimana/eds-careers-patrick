import { fetchPlaceholders } from '../../scripts/i18n.js';

/**
 * Jobs block: open positions from a sheet, with a filter by location.
 * Content model: one cell with a link to the sheet, e.g. /en/jobs-data.json
 * Sheet columns: Role, Location, Team, Link.
 * @param {Element} block The jobs block element
 */
export default async function decorate(block) {
  const link = block.querySelector('a');
  const source = link ? link.getAttribute('href') : block.textContent.trim();
  if (!source) return;

  let path;
  try {
    path = new URL(source, window.location.href).pathname;
  } catch {
    return;
  }
  if (!path.endsWith('.json')) return;

  let data = [];
  try {
    const resp = await fetch(path);
    if (resp.ok) ({ data = [] } = await resp.json());
  } catch {
    // no sheet: render an empty list
  }
  const jobs = data.filter((job) => job.Role);

  const ph = await fetchPlaceholders();
  const text = (key, fallback) => ph[key] || fallback;

  // location filter
  const filter = document.createElement('div');
  filter.className = 'jobs-filter';
  const id = `jobs-location-${Math.random().toString(36).slice(2, 8)}`;
  const label = document.createElement('label');
  label.htmlFor = id;
  label.textContent = text('filterLocation', 'Location');
  const select = document.createElement('select');
  select.id = id;
  const all = document.createElement('option');
  all.value = '';
  all.textContent = text('allLocations', 'All locations');
  select.append(all);
  [...new Set(jobs.map((job) => job.Location).filter(Boolean))].sort().forEach((loc) => {
    const option = document.createElement('option');
    option.value = loc;
    option.textContent = loc;
    select.append(option);
  });
  filter.append(label, select);

  // list
  const ul = document.createElement('ul');
  const items = jobs.map((job) => {
    const li = document.createElement('li');
    li.dataset.location = job.Location || '';

    const role = document.createElement('h2');
    if (job.Link) {
      const a = document.createElement('a');
      a.href = job.Link;
      a.textContent = job.Role;
      role.append(a);
    } else {
      role.textContent = job.Role;
    }
    li.append(role);

    const meta = document.createElement('p');
    meta.className = 'jobs-meta';
    [job.Location, job.Team].filter(Boolean).forEach((value) => {
      const tag = document.createElement('span');
      tag.textContent = value;
      meta.append(tag);
    });
    li.append(meta);
    ul.append(li);
    return li;
  });

  const empty = document.createElement('p');
  empty.className = 'jobs-empty';
  empty.textContent = text('noJobs', 'No open positions for this location.');
  empty.hidden = items.length > 0;

  const status = document.createElement('p');
  status.className = 'jobs-status';
  status.setAttribute('aria-live', 'polite');

  select.addEventListener('change', () => {
    let shown = 0;
    items.forEach((li) => {
      const match = !select.value || li.dataset.location === select.value;
      li.hidden = !match;
      if (match) shown += 1;
    });
    empty.hidden = shown > 0;
    status.textContent = `${shown} / ${items.length}`;
  });

  block.replaceChildren(filter, status, ul, empty);
}
