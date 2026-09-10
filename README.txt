ELITE ELECTRICAL CONTRACTORS — WEBSITE (restructured, deployable)
=================================================================

WHAT TO UPLOAD
--------------
Everything in this folder, keeping the folder structure intact, into the web
root on Hostinger (public_html). That's it — no build step, no dependencies.

    index.html  ... (17 pages)     the site
    css/                           stylesheets
    js/                            scripts
    images/                        all images, incl. og-preview.jpg (social card)
    videos/                        the two background videos
    send.php                       contact form handler (needs PHP — Hostinger has it)
    robots.txt                     crawl rules + sitemap location
    sitemap.xml                    16 indexable URLs
    .htaccess                      clean URLs, compression, caching, security headers

IMPORTANT: .htaccess begins with a dot, which hides it in most file managers.
In Hostinger's File Manager turn on "Show hidden files" or it will be skipped,
and you will lose clean URLs, gzip and caching.


STRUCTURE
---------
Every page is a plain static HTML file. All paths are relative, so the site
works from the web root, a subfolder, or straight off your desktop.

  css/site.css        Shared across every page: colour and type variables,
                      headings, paragraphs, buttons, forms, header/nav, footer,
                      cards and grids. Change a global style HERE, once.
  css/<page>.css      Only what is unique to that page, plus that page's
                      responsive (@media) rules — those have to load after the
                      rules they override, so they stay with the page.
  css/legal.css       Privacy Policy and Terms of Use.

  js/site.js          Sticky header, mobile menu, scroll reveals, footer year.
  js/<page>.js        Page-specific behaviour (home video, contact form, etc).

The colour palette, fonts and spacing are CSS variables at the top of
site.css (:root). Editing one value there changes it site-wide.


THE CONTACT FORM
----------------
contact.html posts to send.php, which emails the submission to
jennifer@elite1314.com from the server. Nothing opens on the visitor's
computer. Requires PHP (standard on Hostinger). Nothing to configure —
see the notes at the top of send.php if mail ever fails to arrive.


THE FOOTER YEAR
---------------
Set by JavaScript in js/site.js, so the copyright never goes stale.


BEFORE GOING LIVE
-----------------
1. Delete the "under construction" holding page files from the web root
   (index.html, .htaccess, robots.txt from the under-construction folder),
   then upload this folder's contents.
2. Send one test submission through the contact form and confirm it arrives
   (check the spam folder too).
3. CHECK THE DOMAIN. Every canonical URL, the sitemap, and every Open Graph
   tag now says:

       https://eliteelectricswfl.com

   That came from the SEO brief. The legal pages and the contact details use
   elite1314.com, and the current test deployment is on a vercel.app address.
   Whichever domain the site actually goes live on, that one string has to be
   right or Google will index the wrong URLs. It is set in one place per
   script (DOM = ...) — say the word and it can be changed everywhere at once.


THE SEO / AEO PASS
------------------
  * FAQ accordions on 9 pages (home, services hub, and the 7 service pages),
    placed below all existing content and above the footer.
  * Each question is an <h2> with the class .faq-question, styled to 18px so
    the site's own h2 size is untouched. AI answer engines look for that tag.
  * FAQPage / Electrician / Service / ContactPage / AboutPage / CollectionPage
    / JobPosting structured data, as JSON-LD in each page's <head>.
  * The on-page Q&A text and the schema Q&A text are generated from one
    source, so they cannot drift apart — Google requires them to match.
  * Full meta blocks: title, description, canonical, robots, geo, Open Graph,
    Twitter card.

The FAQ styles live at the bottom of css/site.css under the heading
"Reusable Global FAQ Stylesheet" — the same block can be dropped onto any new
page by adding the markup; no per-page CSS is needed.
