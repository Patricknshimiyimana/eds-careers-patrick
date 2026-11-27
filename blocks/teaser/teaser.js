/**
 * Teaser block — reference solution for module 07.
 *
 * Authoring model (one teaser per block):
 * | Teaser (dark)  |                          |
 * | [image]        | **Eyebrow**              |
 * |                | ## Heading               |
 * |                | Short text               |
 * |                | [Call to action](link)   |
 */
export default function decorate(block) {
  const row = block.firstElementChild;
  if (!row) return;

  const [imageCell, contentCell] = [...row.children];
  if (imageCell) imageCell.className = 'teaser-image';
  if (contentCell) {
    contentCell.className = 'teaser-content';

    // first paragraph that contains only <strong> becomes the eyebrow
    const first = contentCell.firstElementChild;
    if (first?.tagName === 'P' && first.children.length === 1
      && first.firstElementChild.tagName === 'STRONG'
      && first.textContent.trim() === first.firstElementChild.textContent.trim()) {
      first.className = 'teaser-eyebrow';
      first.textContent = first.firstElementChild.textContent;
    }
  }

  // move the cells out of the row wrapper instead of re-creating them
  block.replaceChildren(...row.children);
}
