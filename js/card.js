function querystring() {
  var e = window.location.href,
      r;
  var t = e.slice(e.indexOf("?") + 1).split("&");
  var a = [];
  for (i = 0; i < t.length; i++) {
      r = t[i].split("=");
      a.push(r[0]);
      a[r[0]] = r[1]
  }
  return a
}
var qs = querystring();
(function(l) {
  var r = "https://api.github.com/",
      o;

  function c(e, r) {
      try {
          if (window.localStorage) {
              if (r) {
                  r._timestamp = (new Date).valueOf();
                  localStorage[e] = JSON.stringify(r)
              } else {
                  var t = localStorage[e];
                  if (t) {
                      return JSON.parse(t)
                  }
                  return null
              }
          }
      } catch (e) {}
  }

  function s(e, r) {
      var t = e;
      var a = r.split(".");
      for (var n = 0; n < a.length; n++) {
          if (t) {
              t = t[a[n]]
          } else {
              break
          }
      }
      if (t === undefined || t === null) {
          return ""
      }
      return t
  }

  function u(e, r) {
      var t = l.getElementById(e + "-card");
      var a = /{([^}]+)}/g;
      var n = t.innerHTML;
      var i = n.match(a);
      for (o = 0; o < i.length; o++) {
          n = n.replace(i[o], s(r, i[o].slice(1, -1)))
      }
      return n
  }

  function t(e, r) {
      var t = c(e);
      if (t && t._timestamp) {
          if ((new Date).valueOf() - t._timestamp < 1e4) {
              return r(t)
          }
      }
      if (qs.client_id && qs.client_secret) {
          e += "?client_id=" + qs.client_id + "&client_secret=" + qs.client_secret
      }
      var a = new XMLHttpRequest;
      a.open("GET", e, true);
      a.onload = function() {
          r(JSON.parse(a.response))
      };
      a.send()
  }

  function f(e, r) {
      var t = e.getElementsByTagName("a");
      for (o = 0; o < t.length; o++) {
          (function(e) {
              e.target = "_" + (qs.target || "top")
          })(t[o])
      }
      l.body.appendChild(e);
      l.body.className = "ready";
      if (parent !== self && parent.postMessage) {
          var a = Math.max(l.body.scrollHeight, l.documentElement.scrollHeight, l.body.offsetHeight, l.documentElement.offsetHeight, l.body.clientHeight, l.documentElement.clientHeight);
          parent.postMessage({
              height: a,
              sender: qs.identity || "*"
          }, "*")
      }
  }

  function e(o) {
      var s = r + "users/" + o;
      t(s, function(e) {
          e = e || {};
          var r = e.message;
          var t = "0";
          if (r) {
              e = c(s) || e;
              t = "?"
          } else {
              c(s, e)
          }
          e.login = o;
          e.name = g(e.name || o);
          e.public_repos = p(e.public_repos) || t;
          e.public_gists = p(e.public_gists) || t;
          e.followers = p(e.followers) || t;
          var a = "Not available for hire.";
          if (e.hireable) {
              var n = "";
              if (e.email) {
                  n = "mailto:" + e.email
              } else if (e.blog) {
                  n = e.blog
              } else {
                  n = e.html_url
              }
              a = '<a href="' + n + '">Available for hire.</a>'
          }
          if (r) {
              a = r
          }
          e.job = a;
          var i = l.createElement("div");
          i.className = "github-card user-card";
          i.innerHTML = u("user", e);
          f(i)
      })
  }

  function a(o, e) {
      var s = r + "repos/" + o + "/" + e;
      t(s, function(e) {
          e = e || {};
          var r = e.message;
          var t = "0";
          if (r) {
              e = c(s) || e;
              t = "?"
          } else {
              c(s, e)
          }
          e.login = o;
          e.avatar_url = "";
          if (e.owner && e.owner.avatar_url) {
              e.avatar_url = e.owner.avatar_url
          }
          e.forks_count = p(e.forks_count) || t;
          e.watchers_count = p(e.watchers_count) || t;
          if (e.fork) {
              e.action = "Forked by "
          } else {
              e.action = "Created by "
          }
          var a = e.description;
          if (!a && e.source) {
              a = e.source.description
          }
          if (!a && r) {
              a = r
          }
          e.description = g(a) || "No description";
          var n = e.homepage;
          if (!n && e.source) {
              n = e.source.homepage
          }
          if (n) {
              e.homepage = ' <a href="' + n + '">' + n.replace(/https?:\/\//, "").replace(/\/$/, "") + "</a>"
          } else {
              e.homepage = ""
          }
          var i = l.createElement("div");
          i.className = "github-card repo-card";
          i.innerHTML = u("repo", e);
          f(i)
      })
  }

  function n() {}

  function p(e) {
      if (!e) return null;
      if (e === 1e3) return 1;
      if (e < 1e3) return e;
      e = e / 1e3;
      if (e > 10) return parseInt(e, 10) + "k";
      return e.toFixed(1) + "k"
  }
  if (!qs.user) {
      n()
  } else if (qs.repo) {
      a(qs.user, qs.repo)
  } else {
      e(qs.user)
  }

  function g(e) {
      return e.replace(/</g, "&lt;").replace(/>/g, "&gt;")
  }
})(document);
(function(e, r, t, a, n, i, o) {
  e["GoogleAnalyticsObject"] = n;
  e[n] = e[n] || function() {
      (e[n].q = e[n].q || []).push(arguments)
  }, e[n].l = 1 * new Date;
  i = r.createElement(t), o = r.getElementsByTagName(t)[0];
  i.async = 1;
  i.src = a;
  o.parentNode.insertBefore(i, o)
})(window, document, "script", "//www.google-analytics.com/analytics.js", "ga");
ga("create", "UA-21475122-2", "auto");
var t = qs.user;
if (qs.repo) t += "/" + qs.repo;
ga("send", "pageview", {
  title: t
});