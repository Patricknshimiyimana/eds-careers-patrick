/**
 * Header extensions — reference solution for module 13.
 * Save as blocks/header/nav-extras.js and call both functions at the end of
 * decorate() in blocks/header/header.js, once `nav` is built:
 *
 *   import { markCurrentPage, decorateLanguageSwitcher } from './nav-extras.js';
 *   …
 *   markCurrentPage(nav);
 *   decorateLanguageSwitcher(nav);
 *
 * Needs scripts/i18n.js from module 12.
 */
import { LANGUAGES, getLanguage } from '../../scripts/i18n.js';

const normalize = (pathname) => pathname.replace(/\/$/, '') || '/';

/**
 * Marks the navigation link to the current page with aria-current="page",
 * so it can be styled and is announced by screen readers.
 * @param {Element} nav The nav element
 */
export function markCurrentPage(nav) {
  const current = normalize(window.location.pathname);
  nav.querySelectorAll('.nav-sections a[href]').forEach((a) => {
    const { pathname } = new URL(a.href, window.location.href);
    if (normalize(pathname) === current) a.setAttribute('aria-current', 'page');
  });
}

/**
 * Language switcher. Authors put links to the language home pages (/en/, /it/)
 * in the tools section of the nav document. On pages inside a language folder,
 * each link is rewritten to the same page in that language, and the current
 * language is marked.
 * @param {Element} nav The nav element
 */
export function decorateLanguageSwitcher(nav) {
  const { pathname } = window.location;
  const [, first, ...rest] = pathname.split('/');
  const inLanguageFolder = LANGUAGES.includes(first);
  const current = getLanguage();

  nav.querySelectorAll('.nav-tools a[href]').forEach((a) => {
    const url = new URL(a.href, window.location.href);
    const [, lang, ...more] = url.pathname.split('/');
    // only links that point to a language home page, e.g. /it/
    if (!LANGUAGES.includes(lang) || more.join('')) return;

    a.lang = lang;
    a.hreflang = lang;
    if (!inLanguageFolder) return;
    if (lang === current) {
      a.setAttribute('aria-current', 'true');
    } else {
      a.href = `/${lang}/${rest.join('/')}`;
    }
  });
}
