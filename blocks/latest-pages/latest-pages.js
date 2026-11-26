import { createOptimizedPicture } from '../../scripts/aem.js';
import { getLanguage } from '../../scripts/i18n.js';

/**
 * Latest pages block — reference solution for module 09.
 *
 * Authoring model:
 * | Latest Pages |
 * | 3            |   ← optional: how many pages to show (default 3)
 *
 * Reads the query index of the page's language (/<lang>/query-index.json) with
 * path, title, description, image and lastModified. Skips the current page and
 * the language home page.
 */
export default async function decorate(block) {
  const count = Number.parseInt(block.textContent.trim(), 10) || 3;

  const lang = getLanguage();
  const resp = await fetch(`/${lang}/query-index.json?limit=500`);
  if (!resp.ok) return;
  const { data = [] } = await resp.json();

  const normalize = (path) => path.replace(/\/$/, '') || '/';
  const skip = [normalize(window.location.pathname), `/${lang}`];
  const pages = data
    .filter((page) => page.path && !skip.includes(normalize(page.path)))
    .sort((a, b) => Number(b.lastModified) - Number(a.lastModified))
    .slice(0, count);

  const ul = document.createElement('ul');
  pages.forEach(({
    path, title, description, image,
  }) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = path;

    if (image) {
      const imageWrapper = document.createElement('div');
      imageWrapper.className = 'latest-pages-image';
      imageWrapper.append(createOptimizedPicture(image, title || '', false, [{ width: '750' }]));
      a.append(imageWrapper);
    }

    const body = document.createElement('div');
    body.className = 'latest-pages-body';
    const heading = document.createElement('h3');
    heading.textContent = title || path;
    body.append(heading);
    if (description) {
      const p = document.createElement('p');
      p.textContent = description;
      body.append(p);
    }
    a.append(body);

    li.append(a);
    ul.append(li);
  });

  block.replaceChildren(ul);
}
