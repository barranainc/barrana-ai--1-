/* Barrana audit-fix prelude. Prepended to the main bundle by _tools/build.mjs. Do not edit the built copy. */
(function () {
  var ORIGIN = "https://barrana.ai";
  var CFG = __SEO_CONFIG__;
  var ORG_REF = { "@type": "Organization", "@id": ORIGIN + "/#organization", name: "Barrana.ai", url: ORIGIN, logo: ORIGIN + "/barrana-logo.png" };
  var INTEGRATIONS = { make: "make-integromat", makeintegromat: "make-integromat", zapier: "zapier", hubspot: "hubspot", jobber: "jobber", quickbooks: "quickbooks", quickbooksonline: "quickbooks", calendly: "calendly", jotform: "jotform", gohighlevel: "gohighlevel", twilio: "twilio", twiliosms: "twilio", googleworkspace: "google-workspace", gmail: "google-workspace", googledrive: "google-workspace" };

  function isPlaceholder(d) {
    d = (d || "").replace(/\s+/g, " ").trim();
    return d.length < 70 || /^[A-Z0-9 &·\-]+$/.test(d) || /^\d+\s*min read/i.test(d);
  }
  function firstGoodParagraph() {
    var root = document.querySelector("#main-content") || document;
    var ps = root.querySelectorAll("p");
    for (var i = 0; i < ps.length; i++) {
      var t = (ps[i].textContent || "").replace(/\s+/g, " ").trim();
      if (t.length >= 80) return t.length > 300 ? t.slice(0, 297).replace(/\s+\S*$/, "") + "…" : t;
    }
    return "";
  }
  function setMeta(k, v) {
    var el = document.querySelector('meta[property="' + k + '"]') || document.querySelector('meta[name="' + k + '"]');
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(/^(og|article):/.test(k) ? "property" : "name", k);
      document.head.appendChild(el);
    }
    el.setAttribute("content", v);
  }

  // Description used by the route-level SEO component (replaces section labels such as "Quick Summary").
  window.__bDesc = function (path, fallback) {
    if (CFG.descriptions[path]) return CFG.descriptions[path];
    return isPlaceholder(fallback) ? firstGoodParagraph() || fallback : fallback;
  };

  // Runs after page-level effects: enforces approved descriptions and adds Article markup to guides that lack it.
  window.__bAfter = function (path) {
    var meta = document.querySelector('meta[name="description"]');
    var cur = meta ? meta.getAttribute("content") || "" : "";
    var d = CFG.descriptions[path] || (isPlaceholder(cur) ? firstGoodParagraph() : "");
    if (d && d !== cur) {
      setMeta("description", d);
      setMeta("og:description", d);
      setMeta("twitter:description", d);
    }
    var old = document.getElementById("b-auto-article");
    if (old) old.remove();
    if (/^\/(resources|insights|playbooks|operator-insights|knowledge)\/[^/]+$/.test(path)) {
      var has = [].some.call(document.querySelectorAll('script[type="application/ld+json"]'), function (s) {
        return /"@type"\s*:\s*"(Article|BlogPosting|TechArticle|HowTo)"/.test(s.textContent);
      });
      if (!has) {
        var h1 = document.querySelector("h1");
        var s = document.createElement("script");
        s.type = "application/ld+json";
        s.id = "b-auto-article";
        s.textContent = JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: (h1 ? h1.textContent.replace(/\s+/g, " ").trim() : document.title).slice(0, 110),
          description: (document.querySelector('meta[name="description"]') || {}).content || undefined,
          mainEntityOfPage: ORIGIN + path,
          url: ORIGIN + path,
          inLanguage: "en-CA",
          author: ORG_REF,
          publisher: ORG_REF
        });
        document.head.appendChild(s);
      }
    }
  };

  // JSON-LD normaliser: one stable Organization entity, clean Service names, no placeholder dates.
  function isBarrana(n) { return typeof n === "string" && /^barrana/i.test(n.trim()); }
  function walk(v, root) {
    if (Array.isArray(v)) return v.map(function (x) { return walk(x, false); });
    if (!v || typeof v !== "object") return v;
    var types = [].concat(v["@type"] || []);
    var isOrg = types.some(function (t) { return t === "Organization" || t === "LocalBusiness" || t === "ProfessionalService"; });
    if (isOrg && isBarrana(v.name)) {
      if (!root && !v.address) return ORG_REF;
      var c = {};
      for (var k in v) c[k] = walk(v[k], false);
      c.name = "Barrana.ai";
      if (!c["@id"]) c["@id"] = v.address ? ORIGIN + "/#localbusiness" : ORG_REF["@id"];
      if (!c.url) c.url = ORIGIN;
      return c;
    }
    var out = {};
    for (var k2 in v) out[k2] = k2 === "@graph" && Array.isArray(v[k2]) ? v[k2].map(function (x) { return walk(x, true); }) : walk(v[k2], false);
    if (types.indexOf("Service") >= 0 && typeof out.name === "string") out.name = out.name.split(" | ")[0].trim();
    if (types.indexOf("Article") >= 0) {
      // Template placeholder dates (e.g. 2025-01-01) are not genuine publication dates.
      if (/-01-01$/.test(out.datePublished || "")) delete out.datePublished;
      if (/-01-01$/.test(out.dateModified || "")) delete out.dateModified;
      if (!out.author) out.author = ORG_REF;
      if (!out.publisher) out.publisher = ORG_REF;
    }
    return out;
  }
  window.__bLd = function (o) { try { return walk(o, true); } catch (e) { return o; } };

  // Retired duplicate URLs: the server sends a 301; this covers client-side navigation and hosts without .htaccess.
  window.__bRedir = function () {
    var p = location.pathname.replace(/\/+$/, "");
    var to = CFG.redirects[p];
    if (to) location.replace(to + location.search + location.hash);
    return null;
  };

  window.__bIntHref = function (name) {
    var slug = INTEGRATIONS[String(name || "").toLowerCase().replace(/[^a-z0-9]/g, "")];
    return slug ? "/integrations/" + slug : null;
  };

  // Conversion events. Pushed to dataLayer (for GTM/GA4 if the owner adds it) and sent to gtag when present.
  window.__bTrack = function (name, params) {
    try {
      window.dataLayer = window.dataLayer || [];
      var ev = { event: name };
      for (var k in params || {}) ev[k] = params[k];
      window.dataLayer.push(ev);
      if (typeof window.gtag === "function") window.gtag("event", name, params || {});
    } catch (e) {}
  };
})();
