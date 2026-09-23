// GA enhanced measurement owns history-change pageviews. Do not also send them
// from a router subscription, which would count each navigation twice.
export const googleAnalyticsScript = `
(function () {
  if (window.location.hostname !== 'valleydesignbuild.com' && window.location.hostname !== 'www.valleydesignbuild.com') return;
  if (window.__valleyAnalyticsLoaded) return;
  window.__valleyAnalyticsLoaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', 'G-1W3LS9RFCB');
  var script = document.createElement('script');
  script.async = true;
  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-1W3LS9RFCB';
  document.head.appendChild(script);
})();
`
