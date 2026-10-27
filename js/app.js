(function () {
  const R = window.REPORT;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => Array.from(el.querySelectorAll(s));
  const NS = "http://www.w3.org/2000/svg";
  const svgEl = (tag, attrs) => {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  };
  const tagHTML = t => {
    if (!t) return "";
    const def = R.tags[t];
    return `<span class="tag ${def.cls || t}" data-tag="${t}">${def.label}</span>`;
  };
  const fill = (sel, html) => { const el = $(sel); if (el) el.innerHTML = html; return el; };

  // ── 탭 ──
  const page = new URLSearchParams(location.search).get("page") || "overview";
  const current = R.tabs.find(t => t.id === page) || R.tabs[0];
  $("#tabs").innerHTML = R.tabs.map((t, i) =>
    `<a class="tab" role="tab" href="?page=${t.id}" aria-selected="${t.id === current.id}"><span class="n">${i + 1}</span>${t.label}</a>`
  ).join("");
  $$(".page").forEach(p => { p.hidden = p.dataset.page !== current.id; });
  const pageEl = $(`.page[data-page="${current.id}"]`);
  if (current.id !== "overview") document.title = `${current.label} · Lummus Technology 기업 리포트`;
  const tabBar = $("#tabs"), tabOn = $(".tab[aria-selected=true]");
  tabBar.scrollLeft = tabOn.offsetLeft - (tabBar.clientWidth - tabOn.offsetWidth) / 2;

  // 섹션 칩 바는 하나만 두고, 지금 탭의 히어로 아래로 옮긴다
  const subnav = $(".subnav");
  $(".hero", pageEl).after(subnav);

  // ── 글자 크기 ──
  const setSize = size => {
    document.documentElement.dataset.size = size;
    $$(".sizer button").forEach(b => b.setAttribute("aria-pressed", b.dataset.size === size));
    try { localStorage.setItem("fontSize", size); } catch (e) {}
  };
  let saved = "md";
  try { saved = localStorage.getItem("fontSize") || "md"; } catch (e) {}
  setSize(saved);
  $$(".sizer button").forEach(b => b.addEventListener("click", () => setSize(b.dataset.size)));

  // ── 섹션 칩 ──
  const secs = $$("section[data-chip]", pageEl);
  $("#chips").innerHTML = secs.map((s, i) =>
    `<a class="chip" href="#${s.id}"><span class="n">${i + 1}</span>${s.dataset.chip}</a>`
  ).join("");
  const chipBar = $("#chips");
  const chips = $$("#chips .chip");
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const i = secs.indexOf(en.target);
      chips.forEach((c, j) => c.classList.toggle("on", i === j));
      // scrollIntoView는 페이지 세로 스크롤까지 건드려 스크롤이 끊기므로, 칩 줄만 가로로 옮긴다
      const c = chips[i];
      chipBar.scrollTo({ left: c.offsetLeft - (chipBar.clientWidth - c.offsetWidth) / 2, behavior: "smooth" });
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  secs.forEach(s => io.observe(s));

  // ── 공통 부품 ──
  // 막대는 화면에 들어올 때 data-w 너비까지 차오른다
  const grow = new IntersectionObserver(es => es.forEach(en => {
    if (!en.isIntersecting) return;
    $$("[data-w]", en.target).forEach(d => { d.style.width = d.dataset.w + "%"; });
    grow.unobserve(en.target);
  }), { threshold: .25 });

  const kpiHTML = list => list.map(k => `
    <div class="kpi">
      <div class="l">${k.label}${tagHTML(k.tag)}</div>
      <div class="v">${k.value}<small>${k.unit}</small></div>
      <div class="s">${k.sub}</div>
    </div>`).join("");

  // 가로 막대 차트
  const hbars = (sel, rows, { max, fmt = v => v, unit = "" } = {}) => {
    const el = $(sel);
    if (!el) return;
    const top = max || Math.max(...rows.map(r => r.value));
    el.innerHTML = `<div class="hbars">${rows.map(r => `
      <div class="hb ${r.hl ? "hl" : ""}">
        <div class="hb-l"><b>${r.label}</b>${r.sub ? `<span>${r.sub}</span>` : ""}</div>
        <div class="hb-t"><div class="hb-f ${r.est ? "est" : ""}" data-w="${(r.value / top) * 100}"></div></div>
        <div class="hb-v">${r.text || fmt(r.value) + unit}${r.est ? tagHTML("est") : ""}</div>
      </div>`).join("")}</div>`;
    grow.observe(el);
  };

  // 세로 연표
  const timeline = (sel, items) => fill(sel, items.map(it => `
    <li class="${it.hl ? "hl" : ""}">
      <span class="tl-d">${it.date}</span>
      <div class="tl-b"><b>${it.title}</b>${tagHTML(it.tag)}
        ${it.price ? `<span class="price">${it.price}</span>` : ""}
        ${it.kind ? `<span class="kind k-${it.kind}">${it.kind}</span>` : ""}
        ${it.note ? `<p>${it.note}</p>` : ""}</div>
    </li>`).join(""));

  // ════════ 1장 ════════
  if (current.id === "overview") {
    fill("#kpis", kpiHTML(R.kpis));

    const playerText = {
      licensor: "Lummus의 자리입니다. 공정 기술의 사용권을 팔고, 설계 패키지(PDP)를 넘기고, 분해로 코일 같은 독자 장비와 촉매를 공급합니다. 공장을 직접 짓거나 소유하지는 않습니다.",
      owner: "공장에 돈을 대고 소유·운영하는 회사입니다. 어떤 라이선서의 기술을 쓸지 고르고, 기술료와 장비·촉매 대금을 냅니다. 샤힌 프로젝트에서는 S-OIL입니다.",
      epc: "라이선서의 설계 패키지를 받아 상세 설계, 자재 구매, 시공을 맡습니다. 샤힌 프로젝트에서는 현대건설, 현대엔지니어링, DL이앤씨, 롯데건설이 참여했습니다."
    };
    const playerName = { licensor: "라이선서", owner: "발주처", epc: "EPC 건설사" };
    const pickPlayer = who => {
      $$(".players .flow").forEach(f => f.classList.toggle("dim", !f.dataset.who.split(" ").includes(who)));
      $$(".players .node rect").forEach(r => {
        if (r.parentNode.dataset.node === "licensor") return;
        const on = r.parentNode.dataset.node === who;
        r.setAttribute("stroke", on ? "#2b6fd6" : "#d5dce6");
        r.setAttribute("fill", on ? "#e8f0fc" : "#fff");
      });
      $$("#player-seg button").forEach(b => b.setAttribute("aria-pressed", b.dataset.node === who));
      $("#player-badge").textContent = playerName[who];
      $("#player-desc").textContent = playerText[who];
    };
    $$(".players .node, #player-seg button").forEach(el =>
      el.addEventListener("click", () => pickPlayer(el.dataset.node)));
    pickPlayer("licensor");

    const icons = {
      license: '<path d="M7 3h7l5 5v13H7z M14 3v5h5 M10 13h6 M10 17h4" />',
      book: '<path d="M4 5c3-1.5 5-1.5 8 0v15c-3-1.5-5-1.5-8 0z M12 5c3-1.5 5-1.5 8 0v15c-3-1.5-5-1.5-8 0z" />',
      oven: '<path d="M4 4h16v16H4z M4 9h16 M8 6.5h.01 M11 6.5h.01 M8 12h8v5H8z" />',
      sauce: '<path d="M10 3h4v3l2 3v11a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V9l2-3z M8 13h8" />'
    };
    fill("#analogy", R.analogy.map(a => {
      const rep = a.pattern === "반복";
      return `<div class="ana ${rep ? "recurring" : ""}">
        <div class="ic"><svg viewBox="0 0 24 24" fill="none" stroke="${rep ? "#2f9e74" : "#11294a"}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${icons[a.icon]}</svg></div>
        <div class="biz">${a.biz}</div>
        <div class="plain">${a.plain}</div>
        <div class="d">${a.desc}</div>
        <span class="pt ${rep ? "repeat" : "once"}">${rep ? "계속 반복" : "한 번"}</span>
      </div>`;
    }).join(""));

    const mix = fill("#mix", R.revenueMix.map(m => `
      <div class="mix-row">
        <div class="h"><b>${m.name}</b><span>${m.note}</span></div>
        <div class="mix-bar">${m.parts.map(p =>
          `<div class="${p.kind}" data-w="${p.pct}" title="${p.label} ${p.pct}%">${p.pct >= 10 ? `${p.label} ${p.pct}%` : ""}</div>`).join("")}
        </div>
      </div>`).join("") + `
      <div class="mix-row">
        <div class="h"><b>Lummus</b><span>비상장 · 미공개</span></div>
        <div class="mix-lummus">사업별 매출 구성을 공개한 적이 없습니다</div>
      </div>
      <div class="mix-legend"><span><i style="background:var(--green)"></i>공장이 지어진 뒤 계속 들어오는 매출</span><span><i style="background:#9aa8bb"></i>새 공장마다 한 번 들어오는 매출</span></div>`);
    grow.observe(mix);

    // 돈 들어오는 시점
    const cash = $("#cash-svg");
    const steps = R.cashflow;
    const xs = steps.map((_, i) => 90 + i * 145);
    const axisY = 168;
    cash.appendChild(svgEl("line", { x1: 30, y1: axisY, x2: 744, y2: axisY, stroke: "#c9d2de", "stroke-width": 2 }));
    cash.appendChild(svgEl("path", { d: `M744 ${axisY - 5} L752 ${axisY} L744 ${axisY + 5}z`, fill: "#c9d2de" }));
    const groups = steps.map((s, i) => {
      const g = svgEl("g", { class: "step", tabindex: 0, role: "button", "aria-label": `${s.when}: ${s.title}` });
      const bars = s.repeat ? [-34, 0, 34].map(dx => ({ dx, h: s.amount * 22, w: 22 })) : [{ dx: 0, h: s.amount * 28, w: 64 }];
      bars.forEach(b => g.appendChild(svgEl("rect", {
        x: xs[i] + b.dx - b.w / 2, y: axisY - 10 - b.h, width: b.w, height: b.h, rx: 6, class: "bar"
      })));
      g.appendChild(svgEl("circle", { cx: xs[i], cy: axisY, r: 6, class: "pt" }));
      const t1 = svgEl("text", { x: xs[i], y: axisY + 36, "text-anchor": "middle", "font-size": 19, "font-weight": 700, fill: "#16202e" });
      t1.textContent = s.when;
      const t2 = svgEl("text", { x: xs[i], y: axisY + 62, "text-anchor": "middle", "font-size": 16, fill: "#7b8696" });
      t2.textContent = s.time;
      const t3 = svgEl("text", { x: xs[i], y: axisY - 20 - bars[0].h, "text-anchor": "middle", "font-size": 16, "font-weight": 600, class: "lbl" });
      t3.textContent = s.title;
      g.append(t1, t2, t3);
      g.appendChild(svgEl("rect", { x: xs[i] - 70, y: 0, width: 140, height: 250, fill: "transparent" }));
      cash.appendChild(g);
      return g;
    });
    const pickStep = i => {
      groups.forEach((g, j) => {
        const on = i === j, rep = steps[j].repeat;
        $$(".bar", g).forEach(b => b.setAttribute("fill", on ? (rep ? "#2f9e74" : "#11294a") : (rep ? "#bfe3d3" : "#d3dbe6")));
        const pt = $(".pt", g);
        pt.setAttribute("fill", on ? "#2b6fd6" : "#fff");
        pt.setAttribute("stroke", on ? "#2b6fd6" : "#9aa8bb");
        pt.setAttribute("stroke-width", 2);
        $(".lbl", g).setAttribute("fill", on ? "#16202e" : "#9aa8bb");
      });
      $("#cash-badge").textContent = `${steps[i].when} · ${steps[i].time}`;
      $("#cash-desc").innerHTML = `<b>${steps[i].title}.</b> ${steps[i].desc}`;
    };
    groups.forEach((g, i) => {
      g.addEventListener("click", () => pickStep(i));
      g.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pickStep(i); } });
    });
    pickStep(0);

    fill("#techs", R.techs.map(t => `
      <div class="tech">
        <div class="top"><b>${t.name}</b><span>${t.field}</span></div>
        <p>${t.what}</p>
        <div class="life"><i>일상 속</i>${t.life}</div>
        <div class="fact">${t.fact}${tagHTML(t.tag)}</div>
      </div>`).join(""));

    fill("#legend", Object.entries(R.tags).filter(([k]) => k !== "rival").map(([k, t]) =>
      `<div><span class="tag ${k}">${t.label}</span><br>${t.desc}</div>`).join(""));
  }

  // ════════ 2장 ════════
  if (current.id === "money") {
    timeline("#history-tl", R.history);
    hbars("#price-chart", R.prices.map(p => ({ ...p, hl: !p.est })), { fmt: v => v, unit: "억 달러" });

    const ob = fill("#owner-bar", `
      <div class="stack">${R.owners.map(o =>
        `<div data-w="${o.pct}" style="background:${o.color}" title="${o.label} 약 ${o.pct}%">${o.pct >= 15 ? `약 ${o.pct}%` : ""}</div>`).join("")}</div>
      <div class="stack-legend">${R.owners.map(o =>
        `<span><i style="background:${o.color}"></i>${o.label} <b>약 ${o.pct}%</b></span>`).join("")}</div>`);
    grow.observe(ob);

    hbars("#ebitda-chart", R.ebitda, { max: 2.5, unit: "억 달러" });

    const L = R.leverage;
    const pct = v => (v / L.max) * 100;
    fill("#lev-gauge", `
      <div class="gauge">
        <div class="g-track">
          <div class="g-band" style="left:${pct(L.typicalLow)}%;width:${pct(L.typicalHigh - L.typicalLow)}%"><span>B2 회사의 흔한 범위</span></div>
          <div class="g-mark" style="left:${pct(L.value)}%"><b>약 ${L.value}배</b><i></i></div>
        </div>
        <div class="g-scale">${[0, 2, 4, 6, 8, 10].map(v => `<span style="left:${pct(v)}%">${v}배</span>`).join("")}</div>
      </div>`);

    fill("#cfo-line", R.cfos.map(c => `
      <div class="person ${c.now ? "now" : ""}">
        <span class="when">${c.when}</span><b>${c.name}</b>${c.note ? `<span class="note">${c.note}</span>` : ""}
      </div>`).join('<span class="person-arrow">→</span>'));

    fill("#ipo-steps", R.ipoSteps.map((s, i) => `
      <li class="st ${s.state}">
        <span class="st-dot">${s.state === "done" ? "✓" : i + 1}</span>
        <div><b>${s.title}</b><span class="st-when">${s.when}</span><p>${s.desc}</p>
        ${s.state === "now" ? '<span class="here">지금 여기서 대기 중</span>' : ""}</div>
      </li>`).join(""));
  }

  // ════════ 3장 ════════
  if (current.id === "market") {
    hbars("#catofin-chart", R.catofinPace, { max: 8 });
    timeline("#deals-tl", R.deals);
    hbars("#techcount-chart", R.techCount.map(t => ({ ...t, hl: t.label === "2026년" })), { max: 180 });

    fill("#green-ladder", R.greenLadder.map((s, i) => `
      <div class="rung ${s.empty ? "empty" : ""}">
        <div class="rung-h"><span class="n">${i + 1}</span>${s.stage}</div>
        ${s.empty ? '<div class="rung-none">아직 없음</div>' : `<ul>${s.items.map(x => `<li>${x}</li>`).join("")}</ul>`}
      </div>`).join(""));

    fill("#order-board", R.orders.map((col, i) => `
      <div class="col c${i}">
        <div class="col-h">${col.status}<span>${col.items.length}</span></div>
        ${col.items.map(o => `<div class="o"><b>${o.name}</b><span class="where">${o.where}</span><p>${o.note}</p></div>`).join("")}
      </div>`).join(""));

    hbars("#margin-chart", R.margins, { max: 30, unit: "%" });
    timeline("#consol-tl", R.consolidation);
  }

  // ════════ 4장 ════════
  if (current.id === "korea") {
    fill("#shaheen-kpis", kpiHTML(R.shaheenKpis));

    const G = R.shaheenGantt;
    const gx = t => ((t - G.start) / (G.end - G.start)) * 100;
    fill("#shaheen-gantt", `
      <div class="gantt">
        <div class="g-years">${G.years.map(y => `<span style="left:${gx(y)}%">${y}</span>`).join("")}</div>
        ${G.rows.map(r => `
          <div class="g-row">
            <div class="g-label">${r.label}</div>
            <div class="g-lane">${r.bars.map(b =>
              `<div class="g-bar ${b.kind}" style="left:${gx(b.from)}%;width:${gx(b.to) - gx(b.from)}%" title="${b.text}"><span>${b.text}</span></div>`).join("")}</div>
          </div>`).join("")}
        <div class="g-marks">${G.marks.map(m =>
          `<div class="g-m ${m.warn ? "warn" : ""}" style="left:${gx(m.at)}%"><span>${m.text}</span></div>`).join("")}</div>
      </div>
      <div class="g-legend">${G.rows.filter(r => r.legend).flatMap(r => r.bars).map(b =>
        `<span><i class="g-bar ${b.kind}"></i><b>${b.text}</b> ${b.date}</span>`).join("")}</div>`);

    fill("#shaheen-epc", R.epc.map(e => `
      <div class="epc-c ${e.lummus ? "lummus" : ""}"><b>${e.name}</b><p>${e.role}</p>${e.lummus ? '<span class="kind k-제휴">Lummus 기술 구역</span>' : ""}</div>`).join(""));

    fill("#korea-base", R.koreaBase.map(k => `
      <div class="kb"><div class="kb-h"><b>${k.name}</b>${tagHTML(k.tag)}</div><span class="where">${k.where} · ${k.since}</span><p>${k.what}</p></div>`).join(""));

    const N = R.ncc;
    const np = v => (v / N.max) * 100;
    let acc = 0;
    const doneTotal = N.done.reduce((s, d) => s + d.value, 0);
    const nc = fill("#ncc-progress", `
      <div class="ncc">
        <div class="ncc-track">
          ${N.done.map((d, i) => { const left = np(acc); acc += d.value;
            return `<div class="ncc-seg s${i}" style="left:${left}%" data-w="${np(d.value)}"><span>${d.value}</span></div>`; }).join("")}
          <div class="ncc-target" style="left:${np(N.targetLow)}%;width:${np(N.targetHigh - N.targetLow)}%"></div>
        </div>
        <div class="ncc-scale">
          <span style="left:${np(N.targetLow)}%">목표 하한 ${N.targetLow}</span>
          <span style="left:${np(N.targetHigh)}%">상한 ${N.targetHigh}</span>
        </div>
        <div class="stack-legend">
          ${N.done.map((d, i) => `<span><i class="s${i}"></i>${d.label} <b>${d.value}만 톤</b></span>`).join("")}
          <span><i class="tgt"></i>정부 목표 범위</span>
        </div>
        <p class="ncc-sum">승인된 감축 <b>${doneTotal}만 톤</b> · 최소 목표까지 <b>${N.targetLow - doneTotal}만 톤</b> 남음 · ${N.pending}</p>
      </div>`);
    grow.observe(nc);

    fill("#lab-legend", Object.values(R.labLevels).map(l =>
      `<span><i style="background:${l.color}"></i>${l.label}</span>`).join(""));
    fill("#lab-matrix", R.labMatrix.map(r => {
      const lv = R.labLevels[r.level];
      return `<div class="lm lv-${r.level}">
        <div class="lm-lab"><span class="lm-k">연구실 분야</span><b>${r.lab}</b></div>
        <div class="lm-lev" style="--c:${lv.color}"><span>${lv.label}</span></div>
        <div class="lm-lu"><span class="lm-k">Lummus 쪽</span><p>${r.lummus}</p>${r.note ? `<p class="lm-note">${r.note}</p>` : ""}</div>
      </div>`;
    }).join(""));
  }

  // ════════ 5장 ════════
  if (current.id === "summary") {
    const swItem = x => `<li><b>${x.t}</b>${tagHTML(x.tag)}<p>${x.d}</p></li>`;
    fill("#strengths", R.strengths.map(swItem).join(""));
    fill("#risks", R.risks.map(swItem).join(""));

    fill("#watch", R.watch.map((w, i) => `
      <div class="w"><span class="w-n">${i + 1}</span><span class="w-when">${w.when}</span><b>${w.t}</b><p>${w.d}</p></div>`).join(""));

    const terms = Object.entries(R.glossary).sort((a, b) => a[0].localeCompare(b[0], "ko"));
    const drawGloss = q => {
      const qq = q.trim().toLowerCase();
      const hit = terms.filter(([k, v]) => !qq || k.toLowerCase().includes(qq) || v.toLowerCase().includes(qq));
      fill("#gloss", hit.length ? hit.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join("")
        : '<p class="muted">찾는 용어가 없습니다.</p>');
    };
    drawGloss("");
    $("#gl-search").addEventListener("input", e => drawGloss(e.target.value));

    const cats = ["전체", ...new Set(R.fixes.map(f => f.cat))];
    const drawFixes = cat => {
      $$("#fix-filter button").forEach(b => b.setAttribute("aria-pressed", b.dataset.cat === cat));
      fill("#fixes", R.fixes.filter(f => cat === "전체" || f.cat === cat).map(f => `
        <div class="fx"><div class="fx-h"><span class="fx-cat">${f.cat}</span><b>${f.item}</b>${tagHTML(f.tag)}</div>
          <div class="fx-ba"><div class="fx-b"><span>이전</span>${f.before}</div><div class="fx-a"><span>지금</span>${f.after}</div></div></div>`).join(""));
    };
    fill("#fix-filter", cats.map(c => `<button data-cat="${c}">${c}</button>`).join(""));
    $$("#fix-filter button").forEach(b => b.addEventListener("click", () => drawFixes(b.dataset.cat)));
    drawFixes("전체");
  }

  // ── 출처 (1장의 data-src 목록) ──
  $$("ol[data-src]").forEach(ol => {
    ol.innerHTML = ol.dataset.src.split(" ").map(id => {
      const s = R.sources[id];
      return s ? `<li><a href="${s.url}" target="_blank" rel="noopener">${s.label}</a></li>` : "";
    }).join("");
  });

  // ── 용어·배지 설명 팝업 ──
  const pop = document.createElement("div");
  pop.className = "pop";
  pop.hidden = true;
  document.body.appendChild(pop);
  let popFor = null;
  const showPop = el => {
    let title, body;
    if (el.dataset.t) { title = el.dataset.t; body = R.glossary[el.dataset.t]; }
    else { title = R.tags[el.dataset.tag].label; body = R.tags[el.dataset.tag].desc; }
    if (!body) return;
    pop.innerHTML = `<b>${title}</b>${body}`;
    pop.hidden = false;
    const r = el.getBoundingClientRect();
    const w = pop.offsetWidth;
    const left = Math.min(Math.max(8, r.left + window.scrollX + r.width / 2 - w / 2), document.documentElement.clientWidth - w - 8);
    pop.style.left = left + "px";
    pop.style.top = (r.bottom + window.scrollY + 8) + "px";
    popFor = el;
  };
  const hidePop = () => { pop.hidden = true; popFor = null; };
  document.addEventListener("click", e => {
    const el = e.target.closest(".term, .tag[data-tag]");
    if (el) { e.preventDefault(); popFor === el ? hidePop() : showPop(el); }
    else if (!e.target.closest(".pop")) hidePop();
  });
  window.addEventListener("scroll", () => { if (popFor) hidePop(); }, { passive: true });
})();
