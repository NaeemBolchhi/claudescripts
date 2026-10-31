// ==UserScript==
// @name         Circle FTP Enhancer
// @namespace    https://naeembolchhi.github.io/
// @version      1.2.3
// @description  Updated UI for Circle FTP. Made with Claude.
// @author       NaeemBolchhi
// @license      MIT
// @icon         http://new.circleftp.net/static/media/logo.fce2c9029060a10687b8.png
// @match        http://new.circleftp.net/*
// @match        https://new.circleftp.net/*
// @run-at       document-start
// @grant        none
// @downloadURL  https://github.com/NaeemBolchhi/claudescripts/raw/refs/heads/main/circleftp-enhancer.user.js
// @updateURL    https://github.com/NaeemBolchhi/claudescripts/raw/refs/heads/main/circleftp-enhancer.user.js
// ==/UserScript==

(function () {
  'use strict';

  /* ------------------------------------------------------------------ *
   *  1. STYLES  (injected immediately to avoid a flash of the old look)
   * ------------------------------------------------------------------ */
  const CSS = `
:root{
  --bg:#0b0d12; --surface:#151922; --surface2:#1d2330; --border:#272e3d;
  --text:#e8eaf0; --muted:#8b93a7; --accent:#e50914; --accent2:#ff4b55;
  --cfx-min:190px; --cfx-cw:190px;
}
@media (max-width:991.98px){:root{--cfx-min:160px;--cfx-cw:160px}}
@media (max-width:575.98px){:root{--cfx-min:140px;--cfx-cw:140px}}

/* ------------- HIDE ADS -------------- */
body > .fade.show {
  display: none !important;
}
html, body {
  overflow: auto !important;
}

html{scroll-behavior:smooth}
body{background:var(--bg)!important;color:var(--text);font-family:Roboto,system-ui,-apple-system,"Segoe UI",sans-serif;
  -webkit-tap-highlight-color:transparent;overflow-x:hidden}
#root{min-height:100vh;display:flex;flex-direction:column}
main{flex:1 0 auto;padding-bottom:2rem}
a{transition:color .15s}

/* ---------- Navbar ---------- */
nav.navbar{position:sticky;top:0;z-index:1030;padding:.35rem 0!important;
  background:rgba(8,10,15,.88)!important;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);
  border-bottom:1px solid var(--border)}
nav.navbar>.container-fluid{padding-inline:clamp(12px,3vw,48px)!important;gap:.25rem}
.navbar-brand{margin:0!important}
.navbar-brand img{height:44px!important;width:auto}
.navbar-toggler{border:1px solid var(--border)!important;border-radius:10px;padding:.35rem .6rem}
.navbar-toggler:focus{box-shadow:0 0 0 3px rgba(229,9,20,.3)}
.navbar .navbar-nav .nav-link{color:#d5d9e4!important;font-weight:500;font-size:.85rem;letter-spacing:.05em;
  padding:.5rem .8rem!important;border-radius:8px}
.navbar .navbar-nav .nav-link:hover,.navbar .navbar-nav .nav-link.show{background:var(--surface2);color:#fff!important}
.navbar .dropdown-menu{background:var(--surface)!important;border:1px solid var(--border)!important;border-radius:14px;
  padding:.4rem;max-height:70vh;overflow-y:auto;box-shadow:0 16px 48px rgba(0,0,0,.55)}
.dropdown-menu .dropdown-item{color:#dfe3ee;border-radius:8px;padding:.5rem .75rem;font-size:.9rem;white-space:normal}
.dropdown-menu .dropdown-item:hover,.dropdown-menu .dropdown-item:focus,.dropdown-menu .dropdown-item.active,
.dropdown-menu .dropdown-item:active{background:rgba(229,9,20,.2)!important;color:#fff!important}
@media (min-width:992px){
  .navbar .dropdown-menu.show{columns:2;column-gap:.5rem;min-width:460px}
  .navbar .dropdown-menu .dropdown-item{break-inside:avoid}
  nav.navbar form{flex:0 1 440px;min-width:260px}
}
@media (max-width:991.98px){
  .navbar-brand img{height:38px!important}
  /* keep the search bar always visible; only the menu links collapse */
  .navbar-collapse{display:flex!important;flex-direction:column;flex-basis:100%;width:100%}
  .navbar-collapse.collapsing{height:auto!important;transition:none!important}
  .navbar-collapse:not(.show):not(.collapsing) .navbar_manu{display:none}
  .navbar-collapse form{order:-1;width:100%;margin:.4rem 0 .2rem}
  .navbar_manu{padding:.4rem 0}
  .navbar .dropdown-menu{position:static!important;transform:none!important;max-height:50vh;margin:.25rem 0}
}

/* ---------- Search box ---------- */
[class*="SearchBox_searchContainer"]{--bs-gutter-x:.5rem;margin:0!important;flex-wrap:nowrap!important;align-items:center;width:100%}
[class*="SearchBox_searchContainer"]>[class*="col-"]:first-child{flex:1 1 auto!important;width:auto!important;max-width:none!important}
[class*="SearchBox_searchContainer"]>[class*="col-"]:last-child{flex:0 0 auto!important;width:auto!important;max-width:none!important;padding-left:0!important}
.rbt-input-main,.rbt-input-hint{background-color:var(--surface2)!important;border:1px solid var(--border)!important;
  border-radius:999px!important;padding:6px 40px 6px 18px!important;font-size:16px!important;height:42px!important;
  line-height:28px!important;box-sizing:border-box!important;font-weight:400!important}
.rbt-input-main{color:#fff!important}
.rbt-input-main::placeholder{color:var(--muted)!important;opacity:1}
.rbt-input-hint{background:transparent!important;border-color:transparent!important;color:rgba(255,255,255,.3)!important}
.rbt-input-main:focus{border-color:var(--accent)!important;box-shadow:0 0 0 3px rgba(229,9,20,.25)!important;outline:none}
[class*="SearchBox_navBar_search_button"]{width:42px;height:42px;padding:0!important;display:flex;align-items:center;justify-content:center;
  background:var(--accent)!important;border:none!important;color:#fff!important;border-radius:50%!important}
[class*="SearchBox_navBar_search_button"]:hover{background:var(--accent2)!important}
.rbt-menu{background:var(--surface)!important;border:1px solid var(--border)!important;border-radius:14px!important;
  max-height:min(60vh,420px)!important;overflow:auto!important;margin-top:6px!important;padding:.3rem!important;
  box-shadow:0 16px 48px rgba(0,0,0,.6)!important;z-index:1100}
.rbt-menu>.dropdown-item{color:#e8eaf0!important}
.rbt-highlight-text{background:none!important;color:var(--accent2)!important;font-weight:700}
.cfx-clear{position:absolute;right:10px;top:50%;transform:translateY(-50%);width:26px;height:26px;border:0;border-radius:50%;
  background:#343c4f;color:#fff;display:none;align-items:center;justify-content:center;cursor:pointer;padding:0;z-index:5}
.cfx-clear.on{display:flex}
.cfx-clear:hover{background:var(--accent)}

/* lock the search box size: no growing on focus/hover */
nav.navbar form,nav.navbar form:focus-within,nav.navbar form:hover,
[class*="SearchBox_searchContainer"],[class*="SearchBox_searchContainer"]:focus-within,[class*="SearchBox_searchContainer"]:hover,
[class*="SearchBox_searchContainer"] .rbt,[class*="SearchBox_searchContainer"] .rbt:focus-within,
[class*="SearchBox_searchContainer"] .rbt>div,
[class*="SearchBox_searchContainer"]>[class*="col-"],[class*="SearchBox_searchContainer"]>[class*="col-"]:focus-within,
.rbt-input-main,.rbt-input-main:focus,.rbt-input-main:hover,.rbt-input-hint{transition:none!important;animation:none!important}
[class*="SearchBox_searchContainer"] .rbt,[class*="SearchBox_searchContainer"] .rbt:focus-within,
.rbt-input-main,.rbt-input-main:focus,.rbt-input-main:hover,.rbt-input-hint{width:100%!important;min-width:0!important;max-width:100%!important;transform:none!important}
@media (min-width:992px){
  nav.navbar form,nav.navbar form:focus-within,nav.navbar form:hover{width:440px!important;max-width:440px!important;flex:0 0 440px!important}
}

/* recent searches dropdown */
.cfx-hist{position:fixed;z-index:2000;background:var(--surface);border:1px solid var(--border);border-radius:14px;
  box-shadow:0 16px 48px rgba(0,0,0,.6);padding:.3rem;display:none;max-height:50vh;overflow:auto}
.cfx-hist.on{display:block}
.cfx-hist .hd{display:flex;justify-content:space-between;align-items:center;font-size:.72rem;color:var(--muted);
  text-transform:uppercase;letter-spacing:.08em;padding:.4rem .6rem}
.cfx-hist .hd button{background:none;border:0;color:var(--muted);font-size:.72rem;cursor:pointer}
.cfx-hist .hd button:hover{color:var(--accent2)}
.cfx-hist .it{display:flex;align-items:center;gap:.5rem;padding:.5rem .6rem;border-radius:8px;color:#e8eaf0;cursor:pointer;font-size:.92rem}
.cfx-hist .it:hover{background:rgba(229,9,20,.18)}
.cfx-hist .it span{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.cfx-hist .it i{font-style:normal;color:var(--muted);padding:0 .3rem;border-radius:6px}
.cfx-hist .it i:hover{color:#fff;background:#343c4f}

/* ---------- Page headings ---------- */
main .container-fluid{padding-inline:clamp(10px,2.5vw,40px)}
main .container-fluid.mt-5{margin-top:1.8rem!important}
main hr{display:none}
main h4.text-white{display:flex;align-items:center;gap:.6rem;font-size:1.05rem;letter-spacing:.02em;margin:0 0 .3rem!important}
main h4.text-white::before{content:"";width:4px;height:1.15em;background:var(--accent);border-radius:3px;flex:none}
[class*="CategoryPage_category_name"]{background:transparent!important;text-align:left!important;font-size:1.5rem;font-weight:700;
  display:flex;align-items:center;gap:.6rem;margin:1rem clamp(10px,2.5vw,40px)!important;padding:0!important}
[class*="CategoryPage_category_name"]::before{content:"";width:5px;height:1.2em;background:var(--accent);border-radius:3px}

/* sub-category pills */
main .row:has(>.col>[class*="SingleSubCategory"]){display:flex!important;flex-wrap:wrap;gap:8px;margin:0!important;
  --bs-gutter-x:0;--bs-gutter-y:0}
main .row:has(>.col>[class*="SingleSubCategory"])>.col{flex:0 0 auto!important;width:auto!important;padding:0!important;margin:0!important}
[class*="SingleSubCategory"]{background:var(--surface)!important;border:1px solid var(--border)!important;color:#dfe3ee!important;
  border-radius:999px!important;padding:.4rem .95rem;font-size:.85rem;transition:all .15s}
[class*="SingleSubCategory"]:hover{background:var(--accent)!important;border-color:var(--accent)!important;color:#fff!important}
main .container.mt-2{max-width:none;padding-inline:clamp(10px,2.5vw,40px)}

/* ---------- Poster grid ---------- */
main .row:has(>[class*="col-"]>[class*="SinglePost_singlePost_card"]){display:grid!important;
  grid-template-columns:repeat(auto-fill,minmax(var(--cfx-min),1fr));gap:14px;margin:.7rem 0 0!important;--bs-gutter-x:0;--bs-gutter-y:0}
@media (max-width:575.98px){
  main .row:has(>[class*="col-"]>[class*="SinglePost_singlePost_card"]){gap:10px}
}
main .row:has(>[class*="col-"]>[class*="SinglePost_singlePost_card"])>[class*="col-"]{
  width:auto!important;max-width:none!important;padding:0!important;margin:0!important;flex:none!important}

[class*="SinglePost_singlePost_card"]{margin:0!important;padding:0!important;border-radius:12px!important;overflow:hidden;
  background:var(--surface);border:1px solid var(--border);position:relative;transition:transform .2s,box-shadow .2s,border-color .2s}
@media (hover:hover){
  [class*="SinglePost_singlePost_card"]:hover{transform:translateY(-4px);border-color:var(--accent);box-shadow:0 12px 30px rgba(0,0,0,.55)}
  [class*="SinglePost_singlePost_card"]:hover img{transform:scale(1.05)}
}
[class*="SinglePost_singlePost_card"] a{display:block;color:inherit}
[class*="SinglePost_singlePost_card"] a>div{position:relative;display:block!important;border-radius:0!important;overflow:hidden}
[class*="SinglePost_singlePost_image"]{width:100%!important;height:auto!important;max-height:none!important;aspect-ratio:2/3;
  object-fit:cover;display:block;border-radius:0!important;background:var(--surface2);transition:transform .35s}
[class*="SinglePost_singlePost_image"][data-cfx-broken]{opacity:0}
[class*="SinglePost_singlePost_text"]{position:absolute!important;left:0!important;right:0!important;bottom:0!important;top:auto!important;
  height:auto!important;opacity:1!important;visibility:visible!important;transform:none!important;display:block!important;
  margin:0!important;padding:2.6rem .6rem .55rem!important;text-align:left!important;
  background:linear-gradient(to top,rgba(0,0,0,.94) 0%,rgba(0,0,0,.72) 55%,transparent 100%)!important}
[class*="SinglePost_singlePost_text"] h3{font-size:.86rem!important;line-height:1.25;font-weight:600;margin:0 0 .2rem!important;
  display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;color:#fff}
[class*="SinglePost_singlePost_text"] h3 span{color:var(--muted);font-weight:400;font-size:.8em}
[class*="SinglePost_singlePost_text"] p{font-size:.7rem;color:#b9c0d0!important;margin:0!important;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
[class*="SinglePost_singlePost_text"] button{display:none!important}
[class*="SinglePost_singlePost_card"][data-cfx-res]::after{content:attr(data-cfx-res);position:absolute;top:8px;right:8px;z-index:2;
  background:rgba(229,9,20,.92);color:#fff;font-size:.65rem;font-weight:700;letter-spacing:.03em;padding:2px 7px;border-radius:6px}

/* ---------- Carousels -> native swipe scrolling ---------- */
.react-multi-carousel-list{overflow-x:auto!important;overflow-y:hidden!important;scroll-snap-type:x proximity;scrollbar-width:none;
  -webkit-overflow-scrolling:touch;margin-top:.5rem}
.react-multi-carousel-list::-webkit-scrollbar{display:none}
.react-multi-carousel-track{transform:none!important;transition:none!important;display:flex!important;width:max-content!important;
  gap:12px;margin:0;padding:0 2px}
.react-multi-carousel-track>li{flex:0 0 auto!important;width:var(--cfx-cw)!important;scroll-snap-align:start}
.react-multiple-carousel__arrow{display:none!important}
[data-cfx-arrows]{position:relative}
.cfx-arrow{position:absolute;z-index:6;width:40px;height:40px;border-radius:50%;border:1px solid var(--border);
  background:rgba(12,14,20,.85);color:#fff;display:none;align-items:center;justify-content:center;cursor:pointer;padding:0;
  backdrop-filter:blur(6px);transition:background .15s,opacity .15s}
.cfx-arrow:hover{background:var(--accent)}
.cfx-arrow.l{left:6px}.cfx-arrow.r{right:6px}
.cfx-arrow.off{opacity:0;pointer-events:none}
@media (hover:hover) and (min-width:768px){.cfx-arrow{display:flex}}

/* ---------- Pagination ---------- */
.pagination{flex-wrap:wrap;gap:6px;margin:1.6rem 0 .5rem!important}
.pagination .page-link{background:var(--surface)!important;border:1px solid var(--border)!important;color:#dfe3ee!important;
  border-radius:10px!important;min-width:40px;text-align:center;padding:.5rem .8rem;cursor:pointer}
.pagination .page-link:hover{border-color:var(--accent)!important;color:#fff!important}
.pagination .page-item.active .page-link{background:var(--accent)!important;border-color:var(--accent)!important;color:#fff!important}
.pagination .page-item.disabled .page-link{opacity:.4;cursor:default}
@media (max-width:575.98px){.pagination .page-link{min-width:36px;padding:.45rem .6rem;font-size:.85rem}}

/* ---------- Footer ---------- */
footer{background:#07080c!important;border-top:1px solid var(--border);color:var(--muted)!important;font-size:.75rem;letter-spacing:.06em}

/* ---------- Content pages (movie + series) ---------- */
/* Layout: content (player / episodes / download) comes first and gets the space.
   The poster is a small side card on desktop (sticky) and drops below the content on mobile. */
main:has([class*="ContentPage_contentPage_title"]){margin-top:1rem!important}
[class*="ContentPage_contentPage_title"]{padding:.55rem clamp(12px,4vw,40px)!important}
[class*="ContentPage_contentPage_title"]+br{display:none}
[class*="ContentPage_contentPage_title"]>div{max-width:1280px;margin:0 auto}
[class*="ContentPage_contentPage_title"] h2{font-size:clamp(1.1rem,4.4vw,1.7rem);font-weight:700;line-height:1.35;
  margin:0;max-width:900px;word-break:break-word}
[class*="ContentPage_contentPage_title"] h2::after{content:"";display:block;width:56px;height:3px;background:var(--accent);
  border-radius:3px;margin:.65rem auto 0}

[class*="ContentPage_contentPage_title"]~.container{max-width:1280px;padding-inline:clamp(10px,3vw,40px);
  display:grid;grid-template-columns:minmax(0,1fr);gap:14px;align-items:start;margin-top:.5rem}
[class*="ContentPage_contentPage_title"]~.container>*{min-width:0;grid-column:1}
[class*="ContentPage_contentPage_title"]~.container>.card{background:var(--surface);border:1px solid var(--border);
  border-radius:16px;padding:10px!important;margin:0!important;align-items:center;overflow:hidden}

/* poster: small, centred, after the content on mobile */
[class*="ContentPage_contentPage_title"]~.container>.card:has(>img){order:3;justify-self:center;width:fit-content;max-width:100%;
  padding:6px!important}
[class*="ContentPage_contentPage_title"]~.container>.card>img{width:auto!important;max-width:100%;height:auto;
  max-height:min(34vh,250px);border-radius:10px;display:block;object-fit:contain}
[class*="ContentPage_contentPage_title"]~.container>.card:has(.plyr){padding:0!important;align-items:stretch;background:#000}

/* video player */
main .plyr{--plyr-color-main:#e50914;--plyr-control-radius:8px;--plyr-font-family:inherit;width:100%;
  border-radius:16px;overflow:hidden;background:#000}
main .plyr__video-wrapper{aspect-ratio:16/9;background:#000;max-height:calc(100vh - 170px)}
main .plyr video{width:100%;height:100%;object-fit:contain}
main .plyr--fullscreen-active{border-radius:0}
main .plyr--fullscreen-active .plyr__video-wrapper{aspect-ratio:auto;max-height:none}
body.plyr--fullscreen-fallback .cfx-fab{display:none}
@media (max-width:575.98px){
  main .plyr{border-radius:12px}
  main .plyr .plyr__volume input[data-plyr="volume"]{display:none}
}

/* movie download button */
[class*="ContentPage_contentPage_title"]~.container>a.btn{display:flex;align-items:center;justify-content:center;gap:.5rem;
  justify-self:center;width:min(100%,360px);padding:.8rem 1.2rem;font-weight:600;letter-spacing:.03em;
  background:var(--accent)!important;border:0!important;color:#fff!important;border-radius:999px!important;
  box-shadow:0 8px 24px rgba(229,9,20,.3)}
[class*="ContentPage_contentPage_title"]~.container>a.btn:hover{background:var(--accent2)!important}
[class*="ContentPage_contentPage_title"]~.container>a.btn::before{content:"";width:18px;height:18px;background:currentColor;
  -webkit-mask:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><path d='M12 3v12m0 0-5-5m5 5 5-5M5 21h14'/></svg>") center/contain no-repeat;
  mask:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><path d='M12 3v12m0 0-5-5m5 5 5-5M5 21h14'/></svg>") center/contain no-repeat}

/* series: season tabs + episode list */
[class*="ContentPage_contentPage_title"]~.container>section{width:100%!important;margin:0!important;padding:12px!important;
  background:var(--surface)!important;border:1px solid var(--border);border-radius:16px!important;text-align:left}
section .nav-tabs{border-bottom:0;gap:6px;flex-wrap:nowrap;overflow-x:auto;scrollbar-width:none;margin-bottom:.8rem!important}
section .nav-tabs::-webkit-scrollbar{display:none}
section .nav-tabs .nav-link{color:var(--muted);background:var(--surface2);border:1px solid var(--border);border-radius:999px;
  padding:.4rem 1rem;font-size:.85rem;white-space:nowrap}
section .nav-tabs .nav-link:hover{color:#fff;border-color:var(--accent)}
section .nav-tabs .nav-link.active{background:var(--accent)!important;border-color:var(--accent)!important;color:#fff!important}
/* Bootstrap's table-striped / table-hover set a dark text colour on odd rows (and on hover) with higher
   specificity than our rules, which made every second row unreadable. Neutralise all of it. */
section .table{--bs-table-color:var(--text);--bs-table-bg:transparent;--bs-table-accent-bg:transparent;
  --bs-table-striped-color:var(--text);--bs-table-striped-bg:transparent;
  --bs-table-hover-color:var(--text);--bs-table-hover-bg:transparent;
  --bs-table-active-color:var(--text);--bs-table-active-bg:transparent;margin:0;color:var(--text);border:0}
section .table,section .table tbody{display:block}
section .table thead{display:none}
section .table tr{display:flex;flex-wrap:wrap;align-items:center;gap:10px;padding:10px 14px;margin-bottom:8px;
  background:var(--surface2)!important;border:1px solid var(--border);border-radius:12px;transition:border-color .15s;color:var(--text)!important}
section .table tr:last-child{margin-bottom:0}
section .table tr:hover{border-color:var(--accent)}
section .table td{padding:0;border:0;background:transparent!important;box-shadow:none!important;color:var(--text)!important}
section .table td:first-child{flex:1 1 160px;min-width:0;font-weight:500;font-size:.95rem;word-break:break-word}
section .table td:not(:first-child){flex:0 0 auto}
section .table .btn{display:inline-flex;align-items:center;justify-content:center;gap:.4rem;padding:.4rem 1rem;font-size:.85rem;
  font-weight:600;border-radius:999px;min-width:104px}
section .table .btn-success{background:transparent;border:1px solid var(--accent2);color:#fff!important}
section .table .btn-success:hover,section .table .btn-success:focus{background:var(--accent);border-color:var(--accent);color:#fff}
section .table .btn-danger{background:var(--accent);border:1px solid var(--accent);color:#fff!important}
section .table .btn-danger:hover,section .table .btn-danger:focus{background:var(--accent2);border-color:var(--accent2)}
@media (max-width:575.98px){
  section .table td:first-child{flex:1 1 100%}
  section .table td:not(:first-child){flex:1 1 calc(50% - 5px)}
  section .table .btn{width:100%;padding:.55rem 1rem}
}

/* series: replace the site's Play buttons with our own (see section 7b of the script) */
section .table .btn-danger{display:none!important}
.cfx-play{display:inline-flex;align-items:center;justify-content:center;gap:.4rem;padding:.4rem 1rem;font-size:.85rem;
  font-weight:600;line-height:1.5;border-radius:999px;min-width:104px;background:var(--accent);border:1px solid var(--accent);
  color:#fff;cursor:pointer;transition:background .15s,border-color .15s}
.cfx-play:hover,.cfx-play:focus{background:var(--accent2);border-color:var(--accent2);color:#fff;outline:none}
.cfx-play svg{width:14px;height:14px;flex:none}
section .table tr.cfx-playing{border-color:var(--accent);box-shadow:inset 3px 0 0 var(--accent)}
.cfx-player{scroll-margin-top:76px}
@media (max-width:575.98px){.cfx-play{width:100%;padding:.55rem 1rem}}

/* ---- Desktop: two-column layout (sticky poster | content) ---- */
@media (min-width:992px){
  main:has([class*="ContentPage_contentPage_title"]){margin-top:1.2rem!important}
  [class*="ContentPage_contentPage_title"]{padding:.8rem clamp(12px,4vw,40px)!important}
  [class*="ContentPage_contentPage_title"]>div{justify-content:flex-start!important}
  [class*="ContentPage_contentPage_title"] h2{text-align:left;max-width:none;font-size:1.6rem}
  [class*="ContentPage_contentPage_title"] h2::after{margin:.6rem 0 0}

  [class*="ContentPage_contentPage_title"]~.container{grid-template-columns:230px minmax(0,1fr);gap:18px 26px;margin-top:1.2rem}
  [class*="ContentPage_contentPage_title"]~.container>*{grid-column:2}
  [class*="ContentPage_contentPage_title"]~.container>.card:has(>img){order:0;grid-column:1;grid-row:1/span 3;
    position:sticky;top:84px;width:auto;justify-self:stretch}
  [class*="ContentPage_contentPage_title"]~.container>.card>img{width:100%!important;max-height:none}
  [class*="ContentPage_contentPage_title"]~.container>a.btn{justify-self:start}
  [class*="ContentPage_contentPage_title"]~.container>section{padding:18px!important}
  section .table td:first-child{font-size:1rem}
  section .table tr{padding:12px 16px}
}
@media (min-width:1400px){
  [class*="ContentPage_contentPage_title"]~.container{grid-template-columns:260px minmax(0,1fr)}
}

/* ---------- Content page title bar ---------- */
main:has([class*="ContentPage_contentPage_title"]){margin-top:0!important}
[class*="ContentPage_contentPage_title"]{
  background:linear-gradient(90deg,rgba(229,9,20,.16),rgba(229,9,20,0) 55%),var(--surface)!important;
  border-top:1px solid var(--border);border-bottom:1px solid var(--border);
  padding:.9rem 0!important;margin:0!important;text-align:left!important;color:var(--text)!important}
[class*="ContentPage_contentPage_title"]>div{
  max-width:1280px;margin:0 auto;padding-inline:clamp(10px,3vw,40px);
  justify-content:flex-start!important}
[class*="ContentPage_contentPage_title"] h2{
  display:flex;align-items:center;gap:.7rem;text-align:left;max-width:none;margin:0;
  font-size:clamp(1.1rem,4.2vw,1.55rem);font-weight:700;line-height:1.3;letter-spacing:.01em;color:#fff}
[class*="ContentPage_contentPage_title"] h2::before{
  content:"";flex:none;width:4px;height:1.3em;background:var(--accent);border-radius:3px}
[class*="ContentPage_contentPage_title"] h2::after{display:none!important}

/* ---------- Floating controls + filter panel ---------- */
[data-cfx-hide]{display:none!important}
.cfx-fab{position:fixed;right:14px;bottom:calc(14px + env(safe-area-inset-bottom,0px));z-index:2147483000;display:flex;flex-direction:column;gap:10px}
.cfx-fab button{width:46px;height:46px;border-radius:50%;border:1px solid var(--border);background:var(--surface);color:#fff;
  display:flex;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 6px 20px rgba(0,0,0,.5);padding:0}
.cfx-fab button:hover,.cfx-fab button.active{background:var(--accent);border-color:var(--accent)}
.cfx-fab .top{opacity:0;pointer-events:none;transition:opacity .2s}
.cfx-fab .top.on{opacity:1;pointer-events:auto}
.cfx-fab .flt{display:none}
.cfx-fab .flt.on{display:flex}
.cfx-panel{position:fixed;z-index:2147483001;left:10px;right:10px;bottom:calc(10px + env(safe-area-inset-bottom,0px));background:var(--surface);
  border:1px solid var(--border);border-radius:16px;padding:12px;box-shadow:0 20px 60px rgba(0,0,0,.7);display:none}
.cfx-panel.on{display:block}
@media (min-width:768px){.cfx-panel{left:auto;right:14px;bottom:74px;width:380px}}
.cfx-panel .row1{display:flex;gap:8px;align-items:center}
.cfx-panel input{flex:1;background:var(--surface2);border:1px solid var(--border);color:#fff;border-radius:999px;padding:8px 16px;font-size:16px;outline:none;min-width:0}
.cfx-panel input:focus{border-color:var(--accent)}
.cfx-panel .reset{background:none;border:0;color:var(--muted);cursor:pointer;font-size:.8rem;padding:6px}
.cfx-panel .reset:hover{color:var(--accent2)}
.cfx-panel .close{flex:none;width:34px;height:34px;border-radius:50%;border:0;background:#343c4f;color:#fff;
  display:flex;align-items:center;justify-content:center;cursor:pointer;padding:0}
.cfx-panel .close:hover{background:var(--accent)}
.cfx-panel .count{font-size:.75rem;color:var(--muted);margin:8px 2px 6px}
.cfx-panel .chips{display:flex;flex-wrap:wrap;gap:6px;max-height:28vh;overflow-y:auto}
.cfx-chip{background:var(--surface2);border:1px solid var(--border);color:#cfd5e3;border-radius:999px;padding:4px 11px;font-size:.78rem;cursor:pointer}
.cfx-chip:hover{border-color:var(--accent)}
.cfx-chip.on{background:var(--accent);border-color:var(--accent);color:#fff}
.cfx-chip small{opacity:.6;margin-left:4px}
`;

  const styleEl = document.createElement('style');
  styleEl.id = 'cfx-style';
  styleEl.textContent = CSS;
  (document.head || document.documentElement).appendChild(styleEl);

  /* ------------------------------------------------------------------ *
   *  2. HELPERS
   * ------------------------------------------------------------------ */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const CARD = '[class*="SinglePost_singlePost_card"]';
  const norm = (s) => (s || '').toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
  const debounce = (fn, ms) => { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; };

  const ICON = {
    x: '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>',
    up: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m18 15-6-6-6 6"/></svg>',
    filter: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 5h18l-7 8v6l-4 2v-8z"/></svg>',
    l: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>',
    r: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>'
  };

  // Set a value on a React-controlled input so React notices it.
  function setNative(el, v) {
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set;
    setter.call(el, v);
    el.dispatchEvent(new Event('input', { bubbles: true }));
  }

  const searchInput = () => $('input.rbt-input-main');
  const searchForm = () => { const i = searchInput(); return i && i.closest('form'); };

  /* ------------------------------------------------------------------ *
   *  3. SEARCH: clear button, recent searches, shortcuts
   * ------------------------------------------------------------------ */
  const HKEY = 'cfx_recent_searches';
  const loadHist = () => { try { return JSON.parse(localStorage.getItem(HKEY)) || []; } catch (e) { return []; } };
  const saveHist = (a) => { try { localStorage.setItem(HKEY, JSON.stringify(a.slice(0, 8))); } catch (e) {} };
  function addHist(q) {
    q = (q || '').trim();
    if (q.length < 2) return;
    saveHist([q, ...loadHist().filter((x) => x.toLowerCase() !== q.toLowerCase())]);
  }

  let histEl;
  function renderHist() {
    const input = searchInput();
    if (!input) return;
    if (!histEl) {
      histEl = document.createElement('div');
      histEl.className = 'cfx-hist';
      histEl.addEventListener('mousedown', (e) => e.preventDefault()); // keep input focused
      histEl.addEventListener('click', (e) => {
        const del = e.target.closest('i');
        const it = e.target.closest('.it');
        if (e.target.closest('.clr')) { saveHist([]); hideHist(); return; }
        if (!it) return;
        const val = it.dataset.q;
        if (del) { saveHist(loadHist().filter((x) => x !== val)); showHist(); return; }
        runSearch(val);
      });
      document.body.appendChild(histEl);
    }
    const h = loadHist();
    if (!h.length) { hideHist(); return; }
    histEl.innerHTML =
      '<div class="hd"><span>Recent searches</span><button class="clr">Clear all</button></div>' +
      h.map((q) => `<div class="it" data-q="${q.replace(/"/g, '&quot;')}"><span></span><i title="Remove">${ICON.x}</i></div>`).join('');
    $$('.it', histEl).forEach((el) => { el.firstChild.textContent = el.dataset.q; });
    const r = input.getBoundingClientRect();
    histEl.style.left = r.left + 'px';
    histEl.style.top = r.bottom + 6 + 'px';
    histEl.style.width = Math.max(r.width, 240) + 'px';
  }
  function showHist() {
    const input = searchInput();
    if (!input || input.value.trim()) return hideHist();
    renderHist();
    if (histEl && histEl.innerHTML) histEl.classList.add('on');
  }
  function hideHist() { if (histEl) histEl.classList.remove('on'); }

  function runSearch(q) {
    const input = searchInput(), form = searchForm();
    if (!input || !form) return;
    setNative(input, q);
    hideHist();
    input.blur();
    setTimeout(() => {
      if (form.requestSubmit) form.requestSubmit();
      else form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    }, 60);
  }

  function ensureSearchUI() {
    const input = searchInput();
    if (!input) return;
    const wrap = input.closest('.rbt');
    if (wrap && !$('.cfx-clear', wrap)) {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'cfx-clear';
      b.title = 'Clear';
      b.setAttribute('aria-label', 'Clear search');
      b.innerHTML = ICON.x;
      b.addEventListener('mousedown', (e) => e.preventDefault());
      b.addEventListener('click', () => { setNative(input, ''); input.focus(); syncClear(); });
      wrap.appendChild(b);
    }
    if (!input.dataset.cfxBound) {
      input.dataset.cfxBound = '1';
      input.setAttribute('enterkeyhint', 'search');
      input.setAttribute('autocapitalize', 'off');
      input.setAttribute('spellcheck', 'false');
      input.addEventListener('focus', () => { showHist(); syncClear(); });
      input.addEventListener('blur', () => setTimeout(hideHist, 120));
      input.addEventListener('input', () => { syncClear(); input.value.trim() ? hideHist() : showHist(); });
    }
    syncClear();
  }
  function syncClear() {
    const input = searchInput();
    const b = input && $('.cfx-clear', input.closest('.rbt') || document);
    if (b) b.classList.toggle('on', !!input.value);
  }

  // Record searches (form submit, or picking a suggestion)
  document.addEventListener('submit', (e) => {
    const input = searchInput();
    if (input && e.target.contains(input)) addHist(input.value);
  }, true);
  document.addEventListener('click', (e) => {
    if (e.target.closest && e.target.closest('.rbt-menu .dropdown-item')) {
      setTimeout(() => { const i = searchInput(); if (i) addHist(i.value); }, 120);
    }
  }, true);

  // Keyboard shortcuts: "/" or Ctrl/Cmd+K focuses search, Esc clears/blurs
  document.addEventListener('keydown', (e) => {
    const t = e.target;
    const typing = t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable);
    const input = searchInput();
    if (!input) return;
    if ((e.key === '/' && !typing && !e.ctrlKey && !e.metaKey) || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k')) {
      e.preventDefault();
      input.focus();
      input.select();
    } else if (e.key === 'Escape' && t === input) {
      if (input.value) { setNative(input, ''); syncClear(); } else input.blur();
    }
  });
  window.addEventListener('resize', () => { if (histEl && histEl.classList.contains('on')) renderHist(); });

  /* ------------------------------------------------------------------ *
   *  4. CARD ENHANCEMENTS: resolution badge, broken-image fallback
   * ------------------------------------------------------------------ */
  const RES = /\b(2160p|4k|1440p|1080p|720p|576p|480p|360p)\b/i;
  const cardInfo = new WeakMap();

  function parseCard(c) {
    const title = c.getAttribute('title') || (c.querySelector('h3') || {}).textContent || '';
    const p = (c.querySelector('p') || {}).textContent || '';
    const q = p.replace(/^\s*quality\s*:/i, '');
    const labels = new Map();
    q.split(/[\s+,/|]+/).forEach((t) => {
      t = t.trim();
      if (t.length < 2 || /^[-&]+$/.test(t)) return;
      const k = t.toLowerCase();
      if (!labels.has(k)) labels.set(k, t);
    });
    const m = q.match(RES);
    return { text: norm(title + ' ' + p), tokens: new Set(labels.keys()), labels, res: m ? m[1] : '' };
  }

  function enhanceCards() {
    $$(CARD).forEach((c) => {
      const info = parseCard(c);
      cardInfo.set(c, info);
      if (info.res) c.setAttribute('data-cfx-res', /^\d+p$/i.test(info.res) ? info.res.toLowerCase() : info.res.toUpperCase());
      else c.removeAttribute('data-cfx-res');
    });
  }

  document.addEventListener('error', (e) => {
    const t = e.target;
    if (t && t.tagName === 'IMG' && t.matches('[class*="SinglePost_singlePost_image"]')) t.setAttribute('data-cfx-broken', '1');
  }, true);

  /* ------------------------------------------------------------------ *
   *  5. CAROUSEL ARROWS (desktop)
   * ------------------------------------------------------------------ */
  function ensureArrows() {
    $$('.react-multi-carousel-list').forEach((list) => {
      const parent = list.parentElement;
      if (!parent || parent.querySelector(':scope > .cfx-arrow')) return;
      parent.setAttribute('data-cfx-arrows', '1');
      const mk = (dir) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'cfx-arrow ' + dir;
        b.setAttribute('aria-label', dir === 'l' ? 'Scroll left' : 'Scroll right');
        b.innerHTML = ICON[dir];
        b.addEventListener('click', () => list.scrollBy({ left: (dir === 'l' ? -1 : 1) * list.clientWidth * 0.85, behavior: 'smooth' }));
        parent.appendChild(b);
        return b;
      };
      const L = mk('l'), R = mk('r');
      const upd = () => {
        const top = list.offsetTop + list.offsetHeight / 2 - 20 + 'px';
        L.style.top = R.style.top = top;
        L.classList.toggle('off', list.scrollLeft < 4);
        R.classList.toggle('off', list.scrollLeft + list.clientWidth >= list.scrollWidth - 4);
      };
      list.addEventListener('scroll', upd, { passive: true });
      window.addEventListener('resize', upd);
      setTimeout(upd, 100); setTimeout(upd, 800);
    });
  }

  /* ------------------------------------------------------------------ *
   *  6. IN-PAGE FILTER (text + quality/language chips) and FAB buttons
   * ------------------------------------------------------------------ */
  const state = { q: '', chips: new Set() };
  let fab, panel, fInput, fCount, fChips, fltBtn, topBtn;

  function closePanel() { if (panel) panel.classList.remove('on'); }

  function buildUI() {
    if (fab) return;
    fab = document.createElement('div');
    fab.className = 'cfx-fab';
    fltBtn = document.createElement('button');
    fltBtn.className = 'flt';
    fltBtn.type = 'button';
    fltBtn.title = 'Filter this page';
    fltBtn.innerHTML = ICON.filter;
    topBtn = document.createElement('button');
    topBtn.className = 'top';
    topBtn.type = 'button';
    topBtn.title = 'Back to top';
    topBtn.innerHTML = ICON.up;
    fab.append(fltBtn, topBtn);

    panel = document.createElement('div');
    panel.className = 'cfx-panel';
    panel.innerHTML =
      '<div class="row1"><input type="search" placeholder="Filter this page (title, 1080p, Hin...)" enterkeyhint="done" autocomplete="off">' +
      '<button class="reset" type="button">Reset</button>' +
      '<button class="close" type="button" title="Close" aria-label="Close filter">' + ICON.x + '</button></div>' +
      '<div class="count"></div><div class="chips"></div>';
    fInput = $('input', panel);
    fCount = $('.count', panel);
    fChips = $('.chips', panel);

    document.body.append(fab, panel);

    fltBtn.addEventListener('click', () => {
      panel.classList.toggle('on');
      if (panel.classList.contains('on')) setTimeout(() => fInput.focus({ preventScroll: true }), 50);
    });
    $('.close', panel).addEventListener('click', closePanel);
    topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    fInput.addEventListener('input', () => { state.q = norm(fInput.value); applyFilter(); });
    $('.reset', panel).addEventListener('click', resetFilter);
    fChips.addEventListener('click', (e) => {
      const c = e.target.closest('.cfx-chip');
      if (!c) return;
      const k = c.dataset.k;
      state.chips.has(k) ? state.chips.delete(k) : state.chips.add(k);
      c.classList.toggle('on');
      applyFilter();
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && panel.classList.contains('on') && panel.contains(e.target)) closePanel(); });
    window.addEventListener('scroll', debounce(() => topBtn.classList.toggle('on', window.scrollY > 600), 80), { passive: true });
  }

  function resetFilter() {
    state.q = ''; state.chips.clear();
    if (fInput) fInput.value = '';
    $$('.cfx-chip.on', fChips || document).forEach((c) => c.classList.remove('on'));
    applyFilter();
  }

  function rebuildChips() {
    const freq = new Map(), labels = new Map();
    $$(CARD).forEach((c) => {
      const info = cardInfo.get(c);
      if (!info) return;
      info.tokens.forEach((t) => { freq.set(t, (freq.get(t) || 0) + 1); if (!labels.has(t)) labels.set(t, info.labels.get(t)); });
    });
    const top = [...freq.entries()].filter(([, n]) => n >= 2).sort((a, b) => b[1] - a[1]).slice(0, 18);
    [...state.chips].forEach((k) => { if (!freq.has(k)) state.chips.delete(k); });
    const sig = top.map(([k]) => k).join('|') + '#' + [...state.chips].join('|');
    if (fChips.dataset.sig === sig) return;
    fChips.dataset.sig = sig;
    fChips.innerHTML = '';
    top.forEach(([k, n]) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'cfx-chip' + (state.chips.has(k) ? ' on' : '');
      b.dataset.k = k;
      b.textContent = labels.get(k);
      const s = document.createElement('small');
      s.textContent = n;
      b.appendChild(s);
      fChips.appendChild(b);
    });
  }

  function applyFilter() {
    const cards = $$(CARD);
    const terms = state.q ? state.q.split(' ') : [];
    let shown = 0;
    cards.forEach((c) => {
      const info = cardInfo.get(c) || parseCard(c);
      const ok = terms.every((t) => info.text.includes(t)) && [...state.chips].every((k) => info.tokens.has(k));
      const w = c.parentElement;
      if (!w) return;
      ok ? w.removeAttribute('data-cfx-hide') : w.setAttribute('data-cfx-hide', '1');
      if (ok) shown++;
    });
    // hide whole home-page sections that end up empty
    $$('main h4').forEach((h) => {
      const sec = h.closest('.container-fluid');
      if (!sec) return;
      const all = $$(CARD, sec);
      if (!all.length) return;
      const any = all.some((c) => c.parentElement && !c.parentElement.hasAttribute('data-cfx-hide'));
      (any || (!terms.length && !state.chips.size)) ? sec.removeAttribute('data-cfx-hide') : sec.setAttribute('data-cfx-hide', '1');
    });
    const active = terms.length || state.chips.size;
    fCount.textContent = cards.length ? (active ? `Showing ${shown} of ${cards.length} items` : `${cards.length} items on this page`) : '';
    fltBtn.classList.toggle('active', !!active);
  }

  /* ------------------------------------------------------------------ *
   *  7b. SERIES: custom Play buttons + a freshly built player per episode
   * ------------------------------------------------------------------ */
  const PLYR_VER = '3.7.8';
  const PLYR_JS = `https://cdn.jsdelivr.net/npm/plyr@${PLYR_VER}/dist/plyr.min.js`;
  const PLYR_CSS = `https://cdn.jsdelivr.net/npm/plyr@${PLYR_VER}/dist/plyr.css`;
  const SECTION = '[class*="ContentPage_contentPage_title"]~.container>section';
  const PLAY_ICON = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5z"/></svg>';

  let cur = null; // { card, player, href }
  let plyrPromise = null;

  function hasPlyrCss() {
    for (const sh of Array.from(document.styleSheets)) {
      try { for (const r of Array.from(sh.cssRules)) if (r.selectorText && r.selectorText.indexOf('.plyr') > -1) return true; } catch (e) {}
    }
    return false;
  }
  function loadPlyr() {
    if (window.Plyr) return Promise.resolve(window.Plyr);
    if (plyrPromise) return plyrPromise;
    if (!hasPlyrCss() && !$('#cfx-plyr-css')) {
      const l = document.createElement('link');
      l.id = 'cfx-plyr-css'; l.rel = 'stylesheet'; l.href = PLYR_CSS;
      document.head.appendChild(l);
    }
    plyrPromise = new Promise((resolve, reject) => {
      const sc = document.createElement('script');
      sc.src = PLYR_JS;
      sc.onload = () => (window.Plyr ? resolve(window.Plyr) : reject(new Error('Plyr missing')));
      sc.onerror = () => reject(new Error('Plyr failed to load'));
      document.head.appendChild(sc);
    }).catch((e) => { plyrPromise = null; throw e; });
    return plyrPromise;
  }

  // Fully tear down the current player (stop the download, destroy Plyr, remove the DOM).
  function removePlayer() {
    const cards = new Set($$('.cfx-player'));
    if (cur && cur.card) cards.add(cur.card);
    cards.forEach((card) => {
      const v = card.querySelector('video');
      if (v) {
        try { v.pause(); } catch (e) {}
        v.removeAttribute('src');
        $$('source', v).forEach((s) => s.remove());
        try { v.load(); } catch (e) {}
      }
      if (cur && cur.card === card && cur.player) { try { cur.player.destroy(); } catch (e) {} }
      card.remove();
    });
    cur = null;
    $$('tr.cfx-playing').forEach((tr) => tr.classList.remove('cfx-playing'));
  }

  function playEpisode(href, tr) {
    const section = (tr && tr.closest('section')) || $(SECTION);
    if (!section || !section.parentElement) return;

    removePlayer(); // always destroy + rebuild, never just swap the src

    const card = document.createElement('div');
    card.className = 'p-2 card cfx-player';
    const video = document.createElement('video');
    video.setAttribute('playsinline', '');
    const source = document.createElement('source');
    source.src = href;
    source.type = 'video/mp4';
    video.appendChild(source);
    card.appendChild(video);
    section.parentElement.insertBefore(card, section);

    cur = { card, player: null, href };
    markPlaying();
    card.scrollIntoView({ behavior: 'smooth', block: 'start' });

    const mine = cur;
    loadPlyr().then((Plyr) => {
      if (cur !== mine) return; // another episode was picked meanwhile
      mine.player = new Plyr(video, {
        controls: ['rewind', 'play', 'fast-forward', 'progress', 'current-time', 'duration', 'mute', 'volume', 'settings', 'fullscreen'],
        settings: ['speed']
      });
    }).catch(() => {
      if (cur !== mine) return;
      video.setAttribute('controls', ''); // fallback: native controls
    });
  }

  function markPlaying() {
    $$(`${SECTION} tbody tr`).forEach((tr) => {
      const a = $('a[href]', tr);
      tr.classList.toggle('cfx-playing', !!(cur && a && a.href === cur.href));
    });
  }

  function ensurePlayButtons() {
    const sections = $$(SECTION);
    if (!sections.length) { if (cur || $('.cfx-player')) removePlayer(); return; }
    sections.forEach((sec) => {
      $$('tbody tr', sec).forEach((tr) => {
        const orig = $('.btn-danger', tr);           // the site's own Play button
        if (!orig) {                                  // no original -> no custom button
          $$('.cfx-play', tr).forEach((b) => b.remove());
          return;
        }
        if ($('.cfx-play', tr)) return;               // already added
        const a = $('a[href]', tr);
        const td = orig.closest('td');
        if (!a || !td) return;
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'cfx-play';
        b.innerHTML = PLAY_ICON + '<span>Play</span>';
        b.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const link = $('a[href]', tr);
          if (link) playEpisode(link.href, tr);
        });
        td.appendChild(b);
      });
    });
    markPlaying();
  }

  /* ------------------------------------------------------------------ *
   *  7. MAIN LOOP: react to the SPA re-rendering
   * ------------------------------------------------------------------ */
  function refresh() {
    ensureSearchUI();
    buildUI();
    enhanceCards();
    ensureArrows();
    ensurePlayButtons();
    fltBtn.classList.toggle('on', $$(CARD).length > 0);
    if (!$$(CARD).length) closePanel();
    rebuildChips();
    applyFilter();
  }
  const refreshSoon = debounce(refresh, 150);

  let lastHref = location.href;
  function onRoute() {
    if (location.href === lastHref) return;
    lastHref = location.href;
    resetFilter();
    closePanel();
    removePlayer();
    refreshSoon();
  }
  ['pushState', 'replaceState'].forEach((fn) => {
    const orig = history[fn];
    history[fn] = function () { const r = orig.apply(this, arguments); setTimeout(onRoute, 0); return r; };
  });
  window.addEventListener('popstate', () => setTimeout(onRoute, 0));

  function start() {
    refresh();
    const root = document.getElementById('root') || document.body;
    new MutationObserver(refreshSoon).observe(root, { childList: true, subtree: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();

  /* ------------------------------------------------------------------ *
   *  8. HIDE AD: Just click the backdrop if it exists
   * ------------------------------------------------------------------ */
  function hideAd() {
    setTimeout(() => {
      if (document.querySelector('.fade.modal-backdrop')) {
        document.querySelector('.fade.modal-backdrop').click();
      }
    }, 100);
  } hideAd();
})();
