# 379 Bethesda Road

The public record of the demolition of a house at 379 Bethesda Road, Spartanburg County, South Carolina: the County’s own documents, the affidavit and warrant, the invoices and liens, the officials who were told, and Mr. Smith’s photographs, video and recording.

Live site: https://ericsmith-lgtm.github.io/379-bethesda-road/
Contact: gelds226@gmail.com

## What is in this folder

| Path | Contents |
|---|---|
| `index.html` | The whole site. Pages are sections switched by the address after `#` (for example `#/proof`, `#/p/lawson`, `#/documents`). |
| `css/site.css` | All styles. |
| `js/site.js` | Page switching, photo viewer, document search and filters, share and copy buttons, the “Has this happened to you?” form. |
| `fonts/` | Archivo, Source Serif 4 and IBM Plex Mono, self-hosted (SIL Open Font License; licenses included). |
| `img/` | Photographs, cartoons, portraits, record images. |
| `lib/` | Page images and thumbnails for the document library. |
| `docs/` | The library’s PDF documents (public copies; private names, addresses and account numbers redacted). |
| `audio/` | The Officer Lawson recording clips. |
| `video/` | The August 16, 2024 demolition video. |
| `.nojekyll` | Tells GitHub Pages to serve the files as they are. |

Every link is relative and nothing loads from another website, so the folder works on GitHub Pages, on any other static host, or opened directly from a computer. The only outside links are citations (news reports, the Department of Justice, the South Carolina Code) and the Facebook share button.

## Publishing on GitHub Pages

Repository **Settings → Pages → Build and deployment → Deploy from a branch → `main` / `/ (root)` → Save**.

If the site moves to a different address, change the `og:image` line in `index.html` (link previews need a full address) and the fallback address in `js/site.js`. The share buttons otherwise use whatever address the site is served from.
