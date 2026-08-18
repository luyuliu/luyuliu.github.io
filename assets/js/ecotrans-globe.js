(function () {
  "use strict";

  var RAD = Math.PI / 180;
  var points = [
    { id: "auburn", type: "member", title: "EcoTrans Lab", location: "Auburn, Alabama", lat: 32.6099, lon: -85.4808, detail: "The lab's home base in the Department of Geosciences at Auburn University.", marker: "auburn", image: "/images/lab-group.jpg", members: [
      { name: "Luyu Liu", role: "Lab Director", image: "/images/luyu.jpg", href: "/people/#luyu-liu" },
      { name: "Zam Khattak", role: "Ph.D. Student", image: "/images/muzzamil.jpg", href: "/people/#zam-khattak" },
      { name: "Yonghan An", role: "Ph.D. Student", image: "/images/yonghan.jpg", href: "/people/#yonghan-an" }
    ] },
    { id: "zam", type: "member", title: "Zam Khattak", location: "Pakistan", lat: 33.6844, lon: 73.0479, detail: "Studies AI applications in urban transportation and accessibility analysis; trained in transportation engineering in Pakistan.", role: "Ph.D. Student", interests: ["AI", "Urban transportation", "Accessibility"], image: "/images/muzzamil.jpg" },
    { id: "yonghan", type: "member", title: "Yonghan An", location: "South Korea", lat: 37.5665, lon: 126.978, detail: "Explores spatial statistics, GeoAI, spatiotemporal modeling, and data-driven transportation and urban systems.", role: "Ph.D. Student", interests: ["GeoAI", "Spatial statistics", "Urban systems"], image: "/images/yonghan.jpg" },
    { id: "luyu", type: "member", title: "Luyu Liu", location: "China", lat: 35.8617, lon: 104.1954, detail: "Transportation geographer, mobility data scientist, and GISer working toward sustainable, resilient, and people-centered mobility.", role: "Lab Director · Assistant Professor", interests: ["Public transportation", "Mobility equity", "GIScience"], image: "/images/luyu.jpg" },
    { id: "columbus", type: "case", location: "Ohio", lat: 39.9612, lon: -82.9988, detail: "Public transit accessibility and performance research with large-scale real-time transit data", studies: [
      ["2025", "Impacts of free fare policy on public transit ridership: Case of Columbus, Ohio during COVID-19"],
      ["2025", "Accessibility derivative: Measuring the accessibility contribution of public transit routes"],
      ["2024", "Measuring the impacts of disruptions on public transit accessibility and reliability"],
      ["2024", "Evaluating accessibility benefits and ridership of bike-transit integration through a social equity lens"],
      ["2023", "Realizable accessibility: evaluating the reliability of public transit accessibility using high-resolution real-time data"],
      ["2022", "Measuring the impacts of dockless micro-mobility services on public transit accessibility"],
      ["2021", "Measuring risk of missing transfers in public transit systems using high-resolution schedule and real-time bus location data"],
      ["2020", "Does real-time transit information reduce waiting time? An empirical analysis"],
      ["2020", "Assessing public transit performance using real-time data: spatiotemporal patterns of bus operation delays in Columbus, Ohio, USA"]
    ] },
    { id: "florida", type: "case", location: "Florida", lat: 27.6648, lon: -81.5158, detail: "Hurricane evacuation, public-transit heat exposure, and computer vision for bus-stop environments.", studies: [
      ["2026", "Evacuation destination choices during Hurricane Ian: A direct demand modeling approach"],
      ["2025", "Hurricane evacuation analysis with large-scale mobile device location data during Hurricane Ian"],
      ["2025", "Measuring exposure to extreme heat in public transit systems"],
      ["2025", "Using computer vision and street view images to assess bus stop amenities"]
    ] },
    { id: "vancouver", type: "case", location: "Vancouver, Canada", lat: 49.2827, lon: -123.1207, detail: "Heat exposure and mitigation during the 2021 heatwave.", studies: [
      ["2026", "Measuring transit riders’ heat exposure and mitigation during the 2021 Vancouver heatwave"],
      ["2024", "The cost of climate change: incorporating extreme weather exposure into public transit accessibility"]
    ] },
    { id: "us", type: "case", location: "United States", lat: 38.9072, lon: -77.0369, detail: "National-scale public transit demand during the COVID-19 pandemic.", studies: [
      ["2020", "The impacts of COVID-19 pandemic on public transit demand in the United States"]
    ] }
  ];

  function rotate(lat, lon, yaw, pitch) {
    var phi = lat * RAD;
    var lambda = lon * RAD + yaw;
    var x = Math.cos(phi) * Math.sin(lambda);
    var y = -Math.sin(phi);
    var z = Math.cos(phi) * Math.cos(lambda);
    var cp = Math.cos(pitch);
    var sp = Math.sin(pitch);
    return { x: x, y: y * cp - z * sp, z: y * sp + z * cp };
  }

  function scholar(title) {
    return "https://scholar.google.com/scholar?q=" + encodeURIComponent('"' + title + '"');
  }

  function addText(tag, className, text) {
    var element = document.createElement(tag);
    if (className) element.className = className;
    element.textContent = text;
    return element;
  }

  function init() {
    var canvas = document.getElementById("personal-globe");
    var panel = document.getElementById("personal-globe-panel");
    if (!canvas || !panel || !window.topojson) return;

    Promise.all([
      fetch("/assets/data/countries-50m.json").then(function (r) { return r.json(); }),
      fetch("/assets/data/land-50m.json").then(function (r) { return r.json(); }),
      fetch("/assets/data/states-10m.json").then(function (r) { return r.json(); })
    ]).then(function (maps) {
      var world = maps[0];
      var land = maps[1];
      var us = maps[2];
      var countryBorders = window.topojson.mesh(world, world.objects.countries);
      var shorelines = window.topojson.mesh(land, land.objects.land);
      var nationOutline = window.topojson.mesh(us, us.objects.nation);
      var stateBorders = window.topojson.mesh(us, us.objects.states, function (a, b) { return a !== b; });
      start(canvas, panel, { countries: countryBorders, shorelines: shorelines, nation: nationOutline, states: stateBorders });
    }).catch(function () {
      panel.textContent = "The research atlas could not be loaded.";
    });
  }

  function start(canvas, panel, layers) {
    var ctx = canvas.getContext("2d");
    var state = { yaw: 1.745, pitch: -.62, dragging: false, moved: false, lastX: 0, lastY: 0, hover: null };
    var active = points[0];
    var projected = [];
    var frame = 0;
    var au = new Image();
    au.src = "/images/auburn-tigers-logo.svg";

    function renderPanel(point) {
      panel.innerHTML = "";
      if (point.image) {
        var image = document.createElement("img");
        image.src = point.image;
        image.alt = point.marker === "auburn" ? "EcoTrans Lab group" : point.title;
        image.className = point.marker === "auburn" ? "is-group" : point.id === "luyu" ? "is-luyu" : "";
        panel.appendChild(image);
      }
      panel.appendChild(addText("h3", "", point.type === "member" && !point.marker ? point.title : point.location));
      panel.appendChild(addText("p", "", point.detail));

      if (point.role) {
        var person = document.createElement("div");
        person.className = "personal-atlas__person";
        person.appendChild(addText("strong", "", point.role));
        var tags = document.createElement("div");
        tags.className = "personal-atlas__tags";
        point.interests.forEach(function (interest) { tags.appendChild(addText("span", "", interest)); });
        person.appendChild(tags);
        panel.appendChild(person);
      }

      if (point.members) {
        var members = document.createElement("div");
        members.className = "personal-atlas__members";
        point.members.forEach(function (member) {
          var link = document.createElement("a");
          link.href = member.href;
          var photo = document.createElement("img");
          photo.src = member.image;
          photo.alt = member.name;
          link.appendChild(photo);
          var identity = document.createElement("span");
          identity.appendChild(addText("strong", "", member.name));
          identity.appendChild(addText("small", "", member.role));
          link.appendChild(identity);
          link.appendChild(addText("b", "", "→"));
          members.appendChild(link);
        });
        panel.appendChild(members);
      }

      if (point.studies) {
        var studies = document.createElement("div");
        studies.className = "personal-atlas__studies";
        point.studies.forEach(function (study) {
          var link = document.createElement("a");
          link.href = scholar(study[1]);
          link.target = "_blank";
          link.rel = "noreferrer";
          link.appendChild(addText("time", "", study[0]));
          link.appendChild(addText("span", "", study[1]));
          link.appendChild(addText("b", "", "↗"));
          studies.appendChild(link);
        });
        panel.appendChild(studies);
      }

      var legend = document.createElement("div");
      legend.className = "personal-atlas__legend";
      legend.innerHTML = '<span><i class="member"></i> Lab member / origin</span><span><i class="case"></i> Case study · size reflects number of studies</span>';
      panel.appendChild(legend);
    }

    function drawLine(coords, cx, cy, radius) {
      var drawing = false;
      ctx.beginPath();
      coords.forEach(function (coordinate) {
        var q = rotate(coordinate[1], coordinate[0], state.yaw, state.pitch);
        if (q.z > 0) {
          var x = cx + q.x * radius;
          var y = cy + q.y * radius;
          if (!drawing) { ctx.moveTo(x, y); drawing = true; }
          else ctx.lineTo(x, y);
        } else drawing = false;
      });
      ctx.stroke();
    }

    function drawLayer(layer, cx, cy, radius) {
      layer.coordinates.forEach(function (line) { drawLine(line, cx, cy, radius); });
    }

    function render() {
      var rect = canvas.getBoundingClientRect();
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      var width = rect.width;
      var height = rect.height;
      if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      var radius = Math.min(width, height) * 1.15;
      var cx = width * .5;
      var cy = height * .5;
      var glow = ctx.createRadialGradient(cx - radius * .35, cy - radius * .38, radius * .06, cx, cy, radius * 1.1);
      glow.addColorStop(0, "#3b7c6f");
      glow.addColorStop(.55, "#153c35");
      glow.addColorStop(1, "#071a17");
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = glow;
      ctx.fill();
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.clip();

      ctx.strokeStyle = "rgba(181,224,210,.16)";
      ctx.lineWidth = 1;
      var lat, lon, line;
      for (lat = -60; lat <= 60; lat += 30) {
        line = [];
        for (lon = -180; lon <= 180; lon += 2) line.push([lon, lat]);
        drawLine(line, cx, cy, radius);
      }
      for (lon = -180; lon < 180; lon += 30) {
        line = [];
        for (lat = -80; lat <= 80; lat += 2) line.push([lon, lat]);
        drawLine(line, cx, cy, radius);
      }

      ctx.strokeStyle = "rgba(175,221,211,.5)"; ctx.lineWidth = .9;
      drawLayer(layers.shorelines, cx, cy, radius);
      ctx.strokeStyle = "rgba(225,241,237,.7)"; ctx.lineWidth = 1.05;
      drawLayer(layers.countries, cx, cy, radius);
      ctx.strokeStyle = "rgba(240,248,245,.95)"; ctx.lineWidth = 1.2;
      drawLayer(layers.nation, cx, cy, radius);
      ctx.strokeStyle = "rgba(255,174,126,.62)"; ctx.lineWidth = .85;
      drawLayer(layers.states, cx, cy, radius);

      projected = points.map(function (point) {
        var q = rotate(point.lat, point.lon, state.yaw, state.pitch);
        var count = point.studies ? point.studies.length : 0;
        var markerSize = point.type === "case" ? 4.5 + Math.sqrt(Math.max(count, 1)) * 3.2 : 6.5;
        return Object.assign({}, point, q, { px: cx + q.x * radius, py: cy + q.y * radius, markerSize: markerSize, hitRadius: point.marker === "auburn" ? 18 : markerSize + 7 });
      }).filter(function (point) { return point.z > 0; }).sort(function (a, b) { return a.z - b.z; });

      projected.forEach(function (point) {
        var selected = point.id === active.id || point.id === state.hover;
        if (point.marker === "auburn" && au.complete) {
          var logoSize = selected ? 34 : 29;
          ctx.beginPath();
          ctx.arc(point.px, point.py, logoSize * .58 + (selected ? Math.sin(frame / 12) * 1.5 : 0), 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255,255,255,.94)";
          ctx.fill();
          ctx.drawImage(au, point.px - logoSize / 2, point.py - logoSize / 2, logoSize, logoSize);
          return;
        }
        ctx.beginPath();
        ctx.arc(point.px, point.py, point.markerSize + (selected ? 2 + Math.sin(frame / 12) * 1.5 : 0), 0, Math.PI * 2);
        ctx.fillStyle = point.type === "member" ? "#d7ff5f" : "#ff6b42";
        ctx.fill();
        ctx.strokeStyle = "rgba(255,255,255,.72)";
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      ctx.restore();
      frame += 1;
      window.requestAnimationFrame(render);
    }

    function localPoint(event) {
      var rect = canvas.getBoundingClientRect();
      return { x: event.clientX - rect.left, y: event.clientY - rect.top };
    }

    function pick(x, y) {
      for (var i = projected.length - 1; i >= 0; i -= 1) {
        if (Math.hypot(projected[i].px - x, projected[i].py - y) < projected[i].hitRadius) return projected[i];
      }
      return null;
    }

    canvas.addEventListener("pointerdown", function (event) {
      var p = localPoint(event);
      state.dragging = true;
      state.moved = false;
      state.lastX = p.x;
      state.lastY = p.y;
      canvas.setPointerCapture(event.pointerId);
    });
    canvas.addEventListener("pointermove", function (event) {
      var p = localPoint(event);
      if (state.dragging) {
        var dx = p.x - state.lastX;
        var dy = p.y - state.lastY;
        state.moved = state.moved || Math.abs(dx) + Math.abs(dy) > 2;
        state.yaw += dx * .008;
        state.pitch = Math.max(-1.1, Math.min(1.1, state.pitch - dy * .006));
        state.lastX = p.x;
        state.lastY = p.y;
      }
      var hit = pick(p.x, p.y);
      state.hover = hit ? hit.id : null;
      canvas.style.cursor = hit ? "pointer" : state.dragging ? "grabbing" : "grab";
    });
    canvas.addEventListener("pointerup", function (event) {
      var p = localPoint(event);
      var hit = pick(p.x, p.y);
      state.dragging = false;
      if (hit && !state.moved) { active = hit; renderPanel(active); }
    });
    canvas.addEventListener("pointerleave", function () { state.dragging = false; state.hover = null; });
    canvas.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft") state.yaw -= .12;
      if (event.key === "ArrowRight") state.yaw += .12;
      if (event.key === "ArrowUp") state.pitch -= .1;
      if (event.key === "ArrowDown") state.pitch += .1;
      if (event.key.indexOf("Arrow") === 0) event.preventDefault();
    });

    renderPanel(active);
    render();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
}());
