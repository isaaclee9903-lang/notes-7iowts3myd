// 리포트에 쓰이는 숫자·용어·출처를 한곳에 모은 파일.
// 새 공시가 나오면 이 파일만 고치면 된다. 기준일: 2026-10-27
window.REPORT = {
  asOf: "2026년 10월 27일",

  tabs: [
    { id: "overview", label: "한눈에 보기" },
    { id: "money", label: "회사와 돈" },
    { id: "market", label: "기술과 시장" },
    { id: "korea", label: "한국과 우리 분야" },
    { id: "summary", label: "정리" }
  ],

  // 표시 배지: fact(확인된 사실)는 배지 없음
  tags: {
    claim: { label: "회사 주장", desc: "회사가 스스로 내세우는 수치입니다. 독립적으로 검증되지 않았습니다." },
    rival: { label: "경쟁사 주장", desc: "경쟁 회사가 스스로 내세우는 수치입니다. 독립적으로 검증되지 않았습니다.", cls: "claim" },
    est: { label: "추정", desc: "리서치팀이 공개 수치로 계산하거나 추론한 값입니다." },
    unv: { label: "미검증", desc: "원문이 아니라 검색 요약·재게시로만 확인된 내용입니다." }
  },

  kpis: [
    { label: "매출", value: "6.36", unit: "억 달러", sub: "2023년 · 약 8,700억 원", tag: null, src: "icra2024" },
    { label: "EBITDA 이익률", value: "약 27", unit: "%", sub: "2023년 · 1.72억 달러 ÷ 6.36억 달러", tag: "est", src: "icra2024" },
    { label: "부채", value: "14~15", unit: "억 달러", sub: "1년 EBITDA의 약 8배", tag: "est", src: "icra2024" },
    { label: "신용등급", value: "B2", unit: "", sub: "Moody's · 투기등급 중간 · 전망 안정적", tag: "unv", src: "moodys2025" },
    { label: "보유 기술", value: "170", unit: "개+", sub: "2020년 약 130개에서 늘어남", tag: "claim", src: "lummusAbout" },
    { label: "라이선스 설비", value: "2,700", unit: "기+", sub: "65개국 이상", tag: "claim", src: "lummusAbout" }
  ],

  // 상장 동종사의 매출 구성 (Lummus는 미공개)
  revenueMix: [
    {
      name: "Honeywell PA&T",
      note: "UOP 포함 · 2025년 64.37억 달러",
      parts: [
        { label: "애프터마켓(촉매·서비스)", pct: 58, kind: "recurring" },
        { label: "프로젝트(신규)", pct: 42, kind: "oneoff" }
      ],
      src: "honeywell8k"
    },
    {
      name: "Topsoe",
      note: "2025년 81.97억 크로네",
      parts: [
        { label: "촉매", pct: 75, kind: "recurring" },
        { label: "기술(라이선스)", pct: 23, kind: "oneoff" },
        { label: "기타", pct: 2, kind: "other" }
      ],
      src: "topsoe2025"
    }
  ],

  // 돈이 들어오는 시점 (업계 관행 기준 추정, Lummus 미공시)
  cashflow: [
    { when: "계약", time: "0년", title: "선금", desc: "기술을 고르고 라이선스 계약을 맺을 때 선금을 받습니다.", amount: 2 },
    { when: "설계", time: "6~12개월", title: "설계 패키지 대금", desc: "공정설계패키지(PDP)와 기본설계를 넘기며 중도금을 받습니다.", amount: 3 },
    { when: "투자 확정", time: "1~2년", title: "독자 장비 대금", desc: "발주처가 최종투자결정(FID)을 내리면 분해로 코일·열교환기 같은 장비를 만들어 납품합니다.", amount: 4 },
    { when: "가동", time: "3~5년", title: "잔금 + 첫 촉매", desc: "공장이 돌아가고 성능 보증 시험을 통과하면 잔금을 받습니다. 촉매를 처음 채웁니다.", amount: 3 },
    { when: "그 후", time: "수년마다", title: "촉매 교체", desc: "공장이 돌아가는 한 촉매 교체, 부품, 개조, 기술 지원 매출이 반복됩니다.", amount: 2, repeat: true }
  ],

  analogy: [
    { icon: "license", biz: "라이선스료", plain: "조리법을 쓸 권리", pattern: "한 번", desc: "기술 사용권 값. 계약부터 가동까지 나눠 받습니다." },
    { icon: "book", biz: "공정설계패키지(PDP)", plain: "조리법 책 · 주방 배치도", pattern: "한 번", desc: "건설사가 공장을 지을 수 있도록 넘기는 핵심 설계 문서입니다." },
    { icon: "oven", biz: "독자 장비", plain: "본점만 만드는 특수 오븐", pattern: "한 번", desc: "SRT 분해로 코일, 고압 열교환기처럼 Lummus만 공급하는 장비입니다." },
    { icon: "sauce", biz: "촉매 · 서비스", plain: "계속 사야 하는 비밀 소스", pattern: "반복", desc: "수년마다 갈아야 하는 소모품과 유지보수. 가장 꾸준한 매출입니다." }
  ],

  techs: [
    {
      name: "SRT 분해로",
      field: "에틸렌",
      what: "나프타·에탄을 800℃ 넘는 관에 아주 짧게 통과시켜 에틸렌·프로필렌으로 쪼갭니다.",
      life: "비닐봉지, 랩, 세제통(PE)의 원료",
      fact: "어떤 라이선서보다 많은 분해로를 공급했다고 밝힙니다.",
      tag: "claim"
    },
    {
      name: "CATOFIN",
      field: "프로필렌 (PDH)",
      what: "프로판 가스에서 수소를 떼어 내 프로필렌을 만듭니다. 촉매는 Clariant가 공급합니다.",
      life: "자동차 범퍼, 배달 용기(PP)의 원료",
      fact: "2017년 이후 40건 넘게 수주. 2026년 9월 중국 ZPC 연 120만 톤 수주.",
      tag: null
    },
    {
      name: "Novolen",
      field: "폴리프로필렌 (PP)",
      what: "프로필렌을 이어 붙여 플라스틱 알갱이(PP)로 만드는 기상 중합 공정. BASF에서 가져온 기술입니다.",
      life: "PP 플라스틱 제품 그 자체",
      fact: "2023년 100번째 라이선스 라인. 지글러-나타·메탈로센 촉매도 직접 공급.",
      tag: null
    },
    {
      name: "CLG",
      field: "정유 (수소처리)",
      what: "Chevron과 50:50으로 세운 합작사. 무거운 기름을 경유·윤활기유 같은 고급 제품으로 바꿉니다.",
      life: "경유, 항공유, 엔진오일",
      fact: "2025년 11월부터 수소화분해 촉매를 직접 개발·판매.",
      tag: null
    }
  ],

  // ── 2장: 회사와 돈 ──
  history: [
    { date: "1907", title: "월터 E. 러머스가 보스턴에서 설립", note: "" },
    { date: "1950~60년대", title: "Combustion Engineering이 인수, \"C-E Lummus\"", note: "시점은 출처마다 다름 (1950년대 중반설 vs 1966년설)" },
    { date: "1990", title: "ABB가 C-E를 인수, \"ABB Lummus Crest\"", note: "이후 ABB Lummus Global" },
    { date: "2007.11", title: "CB&I가 인수", price: "9.5억 달러" },
    { date: "2018.5", title: "McDermott이 CB&I를 합병, \"Lummus Technology\" 출범", price: "주식 교환" },
    { date: "2020.6.30", title: "McDermott 파산 중 HPL(TCG)·Rhône 컨소시엄에 매각", price: "27.25억 달러", hl: true },
    { date: "2021.3", title: "McDermott, 옵션 행사로 소수 지분 다시 확보", price: "미공개" },
    { date: "2025.2.13", title: "HPL이 지분 보유 법인의 85%를 ESMA Global에 이전", price: "2.95억 달러", tag: "unv" },
    { date: "2025.8.4", title: "미국 상장 서류 초안 비공개 제출", hl: true }
  ],
  prices: [
    { label: "2007 CB&I 인수", value: 9.5 },
    { label: "2020 TCG·Rhône 인수", value: 27.25 },
    { label: "상장 때 거론되는 가치", value: 50, est: true, text: "50억+" }
  ],
  owners: [
    { label: "TCG 측 (ESMA Global 등)", pct: 52, color: "#11294a" },
    { label: "Rhône Capital", pct: 38, color: "#4f7cc4" },
    { label: "McDermott", pct: 10, color: "#a9bcd8" }
  ],
  ebitda: [
    { label: "2021년", value: 2.1 },
    { label: "2023년", value: 1.72 }
  ],
  leverage: { value: 8, typicalLow: 5, typicalHigh: 7, max: 10 },
  cfos: [
    { name: "존 알바네세", when: "~2022.4" },
    { name: "아타나스 아타나소프", when: "2022.4~" },
    { name: "에도사 오바야그보나", when: "2024.8~", note: "전 Univation CFO" },
    { name: "에리카 타우렐", when: "2025.11~", note: "IR 업무 명시", now: true }
  ],
  ipoSteps: [
    { title: "주관사 선정", when: "2025.2 보도", desc: "Goldman Sachs, 기업가치 50억 달러+ (익명 소식통)", state: "done" },
    { title: "서류 초안 비공개 제출", when: "2025.8.4", desc: "회사가 직접 발표. 주식 수·공모가 미정", state: "done" },
    { title: "공개 상장 신고서(S-1)", when: "아직", desc: "EDGAR에 공개 서류 없음 (2026.10.27 검색)", state: "now" },
    { title: "투자 설명회 · 공모가 결정", when: "미정", desc: "공개 전환 최소 15일 뒤", state: "todo" },
    { title: "상장", when: "미정", desc: "IPOX 추정: 2026년 하반기~2027년", state: "todo" }
  ],

  // ── 3장: 기술과 시장 ──
  catofinPace: [
    { label: "2017~2022.5", value: 6.8, text: "약 6.8건/년", sub: "34건" },
    { label: "2022.6~2026.9", value: 1.5, text: "약 1.5건/년", sub: "6~7건" }
  ],
  deals: [
    { date: "2024.5", title: "Sumitomo Chemical", note: "LDPE/EVA, PMMA 화학적 재활용", kind: "제휴" },
    { date: "2025.1", title: "Versalis (Eni)", note: "페놀 계열 기술 전체 독점 라이선스", kind: "제휴" },
    { date: "2025.6", title: "NAPCON (Neste)", note: "공정 최적화·AI 예측 소프트웨어", kind: "인수" },
    { date: "2025.9", title: "Synthomer", note: "아크릴산 에스테르", kind: "제휴" },
    { date: "2025.11", title: "CLG 촉매 사업", note: "수소화분해·윤활기유 촉매 직접 판매", kind: "CLG" },
    { date: "2026.3", title: "CLG 피셔-트롭시 기술", note: "Chevron 기술 라이선스 권한 이전", kind: "CLG" },
    { date: "2026.8", title: "Shell 환경촉매·시스템", note: "질소산화물 저감 등, 금액 미공개", kind: "인수" }
  ],
  techCount: [
    { label: "2019년", value: 100, text: "100+" },
    { label: "2020년", value: 130, text: "약 120~130" },
    { label: "2026년", value: 170, text: "170+" }
  ],
  greenLadder: [
    { stage: "의향서·협력 발표", items: ["열분해 – Phigenesis(영국)", "암모니아 – Ammobia (2026.8)"] },
    { stage: "데모·파일럿", items: ["SRT-e 전기 분해로 (2025.4 가동)", "그린수소 – Advanced Ionics (2025.12 착공)", "재생 알킬레이트", "PFAS 분해"] },
    { stage: "상업 출시 선언", items: ["PMMA 재활용 – Sumitomo (2026.2)", "마이크로파 열분해 – Resynergi (2025.3)"] },
    { stage: "설계 단계", items: ["폐플라스틱 열분해 – MOL(헝가리)"] },
    { stage: "라이선스 체결", items: ["항공유(SAF) – NTPC(인도)", "바이오 PP – Citroniq", "화석연료 없는 PP – Vioneo"] },
    { stage: "상업 운전", items: [], empty: true }
  ],
  orders: [
    { status: "가동·준공", items: [
      { name: "Haldia 페놀", where: "인도", note: "2026.10.14 준공. 페놀 34.5만 톤" }
    ] },
    { status: "건설·시운전", items: [
      { name: "S-OIL 샤힌", where: "한국", note: "2026.11 시운전, 2027 상반기 가동" },
      { name: "SABIC 푸젠", where: "중국", note: "2026 하반기 시운전 계획" },
      { name: "BPCL 비나", where: "인도", note: "2028.3까지 가동 목표" }
    ] },
    { status: "계약·설계", items: [
      { name: "ZPC PDH", where: "중국", note: "2026.9 수주, 연 120만 톤" },
      { name: "산둥 위룽", where: "중국", note: "마스터 라이선서, 가동 미확인" }
    ] },
    { status: "표류·중단", items: [
      { name: "두큼", where: "오만", note: "FID 없음, 재추진 중" },
      { name: "발틱 화학단지", where: "러시아", note: "제재로 사실상 중단" }
    ] }
  ],
  margins: [
    { label: "Lummus", sub: "EBITDA · 2023", value: 27, est: true, hl: true },
    { label: "Honeywell PA&T", sub: "부문 이익률 · 2025", value: 24.0 },
    { label: "KBR 기술부문", sub: "조정 EBITDA · 2025", value: 22.5 },
    { label: "Technip Energies 기술부문", sub: "EBITDA · 2026 상반기", value: 15.4 },
    { label: "Topsoe", sub: "EBIT · 2025", value: 8.9 }
  ],
  consolidation: [
    { date: "2025.11", title: "Grace, 촉매 합작사 ART 완전 인수" },
    { date: "2026.2", title: "Axens, 촉매 서비스사 Eurecat 100% 인수" },
    { date: "2026.7", title: "Honeywell, Johnson Matthey 촉매사업 인수 (13.25억 파운드)" },
    { date: "2026.8", title: "Lummus, Shell 환경촉매 사업 인수" },
    { date: "2027.1 예정", title: "KBR, 정부 서비스 부문 분사 → 기술 중심 회사로" }
  ],

  // ── 4장: 한국과 우리 분야 ──
  shaheenKpis: [
    { label: "총투자비", value: "9.26", unit: "조 원", sub: "약 70억 달러" },
    { label: "에틸렌", value: "180", unit: "만 톤/년", sub: "프로필렌 77만 톤 등" },
    { label: "석유화학 비중", value: "12→25", unit: "%", sub: "S-OIL 사업 구성 목표" }
  ],
  shaheenGantt: {
    start: 2022.75, end: 2027.6,
    years: [2023, 2024, 2025, 2026, 2027],
    rows: [
      { label: "원래 계획", bars: [{ from: 2023.17, to: 2026.5, text: "건설", kind: "plan" }, { from: 2026.5, to: 2027.0, text: "상업운전", kind: "plan2" }] },
      { label: "실제 진행", legend: true, bars: [
        { from: 2023.17, to: 2026.55, text: "건설", kind: "act", date: "2023.3 착공 ~ 2026.7 기계적 완공" },
        { from: 2026.55, to: 2026.85, text: "점검", kind: "act2", date: "2026.7~10 사전 시운전·준공검사" },
        { from: 2026.85, to: 2027.0, text: "시운전", kind: "act3", date: "2026.11 전체 시운전" },
        { from: 2027.0, to: 2027.5, text: "상업가동", kind: "act4", date: "2027 상반기 예정" }] }
    ],
    marks: [
      { at: 2022.88, text: "2022.11 계약" },
      { at: 2026.49, text: "6.26 사고", warn: true },
      { at: 2026.82, text: "오늘" }
    ]
  },
  epc: [
    { name: "현대건설", role: "Package 1 · 스팀 크래커 + TC2C (주관사)", lummus: true },
    { name: "DL이앤씨", role: "TC2C·기존 공장 연결 공사 · 약 1.41조 원", lummus: true },
    { name: "현대엔지니어링", role: "Package 2 · 폴리에틸렌 공장" },
    { name: "롯데건설", role: "Package 3 · 탱크·배관" }
  ],
  koreaBase: [
    { name: "대한유화", where: "울산 온산", what: "나프타 분해 단지, OCT. 2021년 부타디엔 추출·C4 수소화 추가", since: "약 30년 고객" },
    { name: "SK어드밴스드", where: "울산", what: "PDH 연 60만 톤, CATOFIN 기술. 촉매를 주기적으로 교체", since: "2016년 가동", tag: "unv" },
    { name: "서해그린케미칼", where: "충남 서산", what: "Green Circle 폐플라스틱 열분해 기술 채택", since: "2023년 계약 · 착공 소식 없음" },
    { name: "현대건설 (해외)", where: "사우디 아미랄", what: "SRT 분해 히터 8기를 Lummus에 발주. 한국 EPC가 장비 구매자", since: "2024년 2월" }
  ],
  ncc: {
    targetLow: 270, targetHigh: 370, max: 400,
    done: [
      { label: "대산 (롯데·HD현대)", value: 110 },
      { label: "여수 (여천NCC·롯데)", value: 139 }
    ],
    pending: "울산 (대한유화·SK지오센트릭·S-OIL) 미합의"
  },
  labLevels: {
    same: { label: "같은 분야", color: "#2b6fd6" },
    route: { label: "제품은 같고 경로가 다름", color: "#6b9be0" },
    chain: { label: "원료·제품으로 이어짐", color: "#a7c3ec" },
    none: { label: "공개 자료상 겹치지 않음", color: "#d5dce6" }
  },
  labMatrix: [
    { lab: "메탈로센·지글러-나타 등 올레핀 중합 촉매", lummus: "Novolen PP와 함께 지글러-나타·메탈로센(NOVOCENE) 촉매 공급. 독일 루트비히스하펜 연구소가 PP 촉매 개발. PE는 SCG·Sumitomo 기술 라이선스", level: "same", note: "Lummus 자체 촉매는 PP 중심, 연구실 메탈로센·POE 연구는 PE·엘라스토머 쪽" },
    { lab: "에틸렌 사량화·삼량화 (1-옥텐, 1-헥센)", lummus: "CPT 기술로 1-부텐·1-헥센 생산. 단, 에틸렌 올리고머화가 아니라 C4 원료를 이성화·메타세시스", level: "route", note: "최종 제품(LLDPE용 공단량체)은 같음" },
    { lab: "PBC/PBCT, 지방족 폴리카보네이트", lummus: "Versalis와 함께 포스겐 없는 DMC·DPC 공정 라이선스. 배터리용 고순도 DMC도 있음", level: "chain", note: "DMC는 지방족 폴리카보네이트 원료로 쓰일 수 있음" },
    { lab: "CO2/에폭사이드 공중합, CO2 기반 고분자", lummus: "CO2 관련 활동은 탄소 포집(Toshiba) 위주. CO2를 고분자 원료로 쓰는 라이선스는 확인 안 됨", level: "none" },
    { lab: "생분해성 폴리에스터, 가소제", lummus: "순환경제 쪽은 열분해 재활용, rPMMA, 바이오 PP, 항공유. 생분해성 폴리에스터 라이선스는 확인 안 됨", level: "none" },
    { lab: "SEBS, PO-PS 블록 공중합체, COC, 폴리케톤", lummus: "해당 라이선스 확인 안 됨. Versalis 제휴도 페놀 계열로 한정, 엘라스토머 미포함", level: "none" }
  ],

  // ── 5장: 정리 ──
  strengths: [
    { t: "가치사슬을 통째로 파는 능력", d: "분해로, CATOFIN, Novolen, CLG로 원유에서 플라스틱까지 한 회사가 묶어서 라이선스할 수 있습니다. 대형 단지의 대표 라이선서를 맡을 수 있는 이유입니다." },
    { t: "높은 이익률", d: "2023년 EBITDA 이익률 약 27%로 상장 경쟁사(15~24%)보다 높습니다.", tag: "est" },
    { t: "꾸준한 매출 쌓기", d: "CLG 촉매, Shell 환경촉매, NAPCON 디지털을 잇달아 들여와 한 번 받는 돈을 반복 매출로 바꾸고 있습니다." },
    { t: "숨 돌릴 여유가 생긴 빚", d: "2025년 재융자로 대출 만기가 2029년 말로 늘고 금리도 내려갔습니다." }
  ],
  risks: [
    { t: "중국의 기술 자립", d: "Sinopec·PetroChina는 자체 분해로를 쓰고, 중국 촉매 회사는 CATOFIN과 같은 방식의 촉매를 내놨습니다. 최대 시장이 라이선스와 촉매 양쪽에서 좁아집니다." },
    { t: "업계 불황", d: "경쟁사들의 기술 매출이 줄었고, Johnson Matthey 촉매사업은 26% 깎인 값에 팔렸습니다." },
    { t: "재무 투명성", d: "2024년 이후 실적 비공개, 2021→2023년 이익 감소, 잦은 CFO 교체, 대주주 계열사와의 거래는 상장 때 설명이 필요한 부분입니다." },
    { t: "계약과 가동의 간극", d: "두큼은 표류했고 여러 대형 프로젝트가 아직 가동 전입니다. 친환경 기술은 상업 운전 실적이 없습니다." }
  ],
  watch: [
    { when: "2027년 상반기", t: "샤힌 상업가동과 성적", d: "TC2C 기술이 실제로 제 성능을 내는지. Lummus가 이 기술을 다른 나라에 다시 팔 수 있는지를 가릅니다." },
    { when: "공개 시점 미정", t: "공개 상장 신고서(S-1)", d: "처음으로 2024~2026년 매출·이익과 사업별 구성이 공개됩니다. 2023년보다 이익이 늘었는지가 핵심입니다." },
    { when: "수시", t: "중국 PDH 추가 수주", d: "ZPC 이후 수주가 이어지는지, 중국산 촉매가 CATOFIN 설비의 촉매 교체 시장을 잠식하는지." },
    { when: "2026년 말~", t: "울산 구조조정 결론", d: "샤힌과 대한유화 NCC가 감축 대상에 들어가는지. 한국 내 Lummus 설비 규모가 달라집니다." }
  ],
  fixes: [
    { cat: "소유·재무", item: "지분 이전", before: "HPL Technologies B.V. 85% 매각, 매수자·시점 미공개", after: "매수자 ESMA Global, 2.95억 달러, 2025.2.13 완료", tag: "unv" },
    { cat: "소유·재무", item: "McDermott 지분", before: "약 10%는 1차 출처로 확인 안 됨", after: "2020년 매각 조건에 10% 옵션 명시. 행사 후 정확한 비율만 미공시" },
    { cat: "소유·재무", item: "재무 자료", before: "공개 재무는 ICRA 두 건뿐", after: "Moody's B2, 2025.10 재융자, 대출 SOFR+2.50%·2029.12 만기 추가", tag: "unv" },
    { cat: "소유·재무", item: "CFO", before: "약 2년 만의 세 번째 CFO", after: "2022.4 이후 세 번째, 약 15개월 만의 교체" },
    { cat: "소유·재무", item: "EDGAR", before: "직접 조회 불가", after: "2026.10.27 검색, Lummus 명의 공개 상장 서류 없음" },
    { cat: "소유·재무", item: "IPO 반대 신호", before: "언급 없음", after: "PitchBook \"IPO 취소\" 표기(근거 미확인), AK&M 기사는 옛 보도의 재게재" },
    { cat: "기술·사업", item: "CLG 지분", before: "50:50은 미확인", after: "McDermott 연차보고서에 50% 명시" },
    { cat: "기술·사업", item: "CLG 촉매", before: "UOP 등과 비슷한 구조", after: "일부 촉매만 CLG가 맡고, 신규 고정층·비등층 설비 촉매는 Grace ART가 독점 공급" },
    { cat: "기술·사업", item: "CATOFIN", before: "2017년 상업 출시", after: "2017년은 수주 집계 기준 연도. 60년 넘게 개량된 기술" },
    { cat: "기술·사업", item: "C-E 인수 시점", before: "1950년대(흔히 1957년)", after: "1950년대 중반설과 1966년설 충돌. 1957년은 근거 없음" },
    { cat: "기술·사업", item: "기술 수", before: "본문 120→170, 결론 130→170", after: "CEO 발언과 매각 서류의 기준 차이" },
    { cat: "기술·사업", item: "친환경 기술 단계", before: "SRT-e·수소 \"발표·연구\"", after: "SRT-e 데모 가동(2025.4), 수소 파일럿 착공(2025.12), 일부 \"상업 출시\" 선언. 상업 운전 플랜트 없음은 유지" },
    { cat: "기술·사업", item: "2025~2026 소식", before: "일부 누락", after: "Thermacrack C5, KMG 디지털센터, 2026 시상식 5관왕, CP2 LNG 결선 추가" },
    { cat: "수주", item: "Haldia 페놀", before: "₹4,500크로르, 2026년 1분기 목표", after: "2026.10.14 준공, ₹6,000크로르" },
    { cat: "수주", item: "두큼(오만)", before: "중동 핵심 실적", after: "FID 미달성, SABIC 철수, 재추진 입찰. Lummus 유지 여부 불명" },
    { cat: "수주", item: "수주 현황", before: "수주 나열", after: "계약·건설·가동·표류 단계로 구분" },
    { cat: "경쟁", item: "Honeywell PA&T", before: "UOP 포함 64.37억 달러", after: "UOP+자동화+Sundyne+LNG 합계. 이익률 0.7%p 하락" },
    { cat: "경쟁", item: "JM 촉매사업 인수", before: "가격 인하만 언급", after: "인하 사유(라이선스 프로젝트 연기, 촉매 수익성 악화) 추가" },
    { cat: "경쟁", item: "Topsoe 가이던스", before: "EBIT 마진 0~5%", after: "특별항목 전 기준. 2025년 8.9%에 일회성 이익 포함" },
    { cat: "경쟁", item: "Technip 점유율", before: "에틸렌 시장 40~50%", after: "상장 서류 기준 \"2010년 이후 계약의 약 40%\"" },
    { cat: "경쟁", item: "PDH 시장·업계 재편", before: "–", after: "CATOFIN+Oleflex 90% 이상, Axens의 Eurecat 인수 추가" },
    { cat: "한국", item: "샤힌 EPC", before: "3사", after: "DL이앤씨 포함 4사" },
    { cat: "한국", item: "샤힌 일정", before: "2026년 완공 목표, 가동 미확인", after: "사고로 지연. 2026.11 시운전, 2027 상반기 상업가동" },
    { cat: "한국", item: "한국 설치 기반", before: "다른 국내사 라이선스 확인 안 됨", after: "SK어드밴스드 PDH가 CATOFIN" },
    { cat: "한국", item: "한국 EPC 채널", before: "중동과 인도 프로젝트", after: "확인된 것은 사우디 아미랄 1건" },
    { cat: "한국", item: "한국 구조조정", before: "간략 언급", after: "목표 270만~370만 톤, 승인 249만 톤, 울산 미합의" }
  ],

  glossary: {
    "라이선서": "공정 기술의 특허·노하우를 가진 회사. 공장 주인에게 사용권을 팔고 설계 패키지를 넘깁니다.",
    "EPC": "설계(Engineering)·구매(Procurement)·시공(Construction)을 한꺼번에 맡는 건설사. 현대건설, DL이앤씨 등.",
    "FID": "최종투자결정. 발주처가 \"이 공장을 실제로 짓는다\"고 확정하는 순간입니다. 이 전까지는 계획일 뿐입니다.",
    "PDP": "공정설계패키지. 라이선서가 넘기는 핵심 설계 문서로, \"조리법 책\"에 해당합니다.",
    "EBITDA": "이자·세금·감가상각 전 이익. 본업이 현금을 얼마나 버는지 보는 지표입니다.",
    "이익률": "매출 중 이익이 차지하는 비율. 여기서는 EBITDA를 매출로 나눈 값입니다.",
    "B2": "Moody's 신용등급 중 투기등급의 중간. 사모펀드가 빚을 내 인수한 회사에서 흔한 등급입니다.",
    "애프터마켓": "공장이 지어진 뒤 들어오는 매출. 촉매 교체, 부품, 서비스, 개조 등.",
    "촉매": "화학반응을 빠르게 하는 물질. 수년마다 교체해야 해서 꾸준한 매출원이 됩니다.",
    "PDH": "프로판에서 수소를 떼어 프로필렌을 만드는 공정. Lummus CATOFIN과 Honeywell UOP Oleflex가 대표적입니다.",
    "IPO": "기업공개. 주식시장에 처음 상장해 일반 투자자에게 주식을 파는 것입니다.",
    "나프타": "원유를 정제할 때 나오는 가벼운 기름. 석유화학의 주원료입니다.",
    "NCC": "나프타 분해 설비. 나프타를 고온으로 쪼개 에틸렌·프로필렌을 만드는 석유화학의 심장부입니다.",
    "에틸렌·프로필렌": "플라스틱의 두 기초 원료. 에틸렌은 비닐·필름(PE), 프로필렌은 자동차 범퍼·식품용기(PP)가 됩니다.",
    "SRT": "Lummus의 분해로 기술(Short Residence Time). 800℃ 이상의 관에 원료를 아주 짧게 통과시켜 에틸렌 수율을 높입니다.",
    "OCT": "에틸렌과 부텐을 섞어 프로필렌으로 바꾸는 Lummus 공정.",
    "TC2C": "원유를 연료가 아니라 화학제품 위주로 바로 바꾸는 공정. Lummus·Aramco·CLG의 공동 기술입니다.",
    "마스터 라이선서": "대형 단지 전체의 기술 구성을 총괄하는 대표 라이선서.",
    "FEED": "기본설계. 라이선서의 설계 패키지를 바탕으로 건설사 입찰이 가능할 만큼 설계를 구체화하는 단계.",
    "레버리지": "부채가 1년치 EBITDA의 몇 배인지. 높을수록 빚 부담이 큽니다.",
    "텀론": "은행·기관 투자자에게 정해진 기간 동안 빌린 대출.",
    "SOFR": "미국 달러 기준금리 중 하나. \"SOFR+2.50%\"는 기준금리에 2.5%포인트를 더한 이자를 낸다는 뜻입니다.",
    "S-1": "미국 상장 신고서. 회사의 재무와 사업을 처음으로 상세히 공개하는 서류입니다.",
    "EDGAR": "미국 증권거래위원회(SEC)의 공시 검색 시스템.",
    "특수관계자 거래": "대주주나 그 계열사와의 거래. 상장 후 따로 공시해야 합니다.",
    "크로르": "인도의 숫자 단위로 1,000만. ₹6,000크로르 = 600억 루피.",
    "시운전": "공장을 다 지은 뒤 실제 원료를 넣어 돌려 보는 단계. 이걸 마쳐야 상업가동에 들어갑니다.",
    "메탈로센": "금속 원자를 두 개의 고리 모양 분자가 감싼 촉매. 성질이 균일한 폴리올레핀을 만드는 데 씁니다.",
    "공단량체": "주원료(에틸렌 등)에 조금 섞어 플라스틱의 성질을 조절하는 원료. 1-부텐, 1-헥센, 1-옥텐 등.",
    "DMC": "디메틸카보네이트. 폴리카보네이트 원료, 배터리 전해액 용매 등으로 쓰입니다."
  },

  sources: {
    icra2024: { label: "ICRA, HPL 신용평가 근거, 2024.8.23", url: "https://icra.in/Rating/GetRationalReportFilePdf?id=129528" },
    moodys2025: { label: "Moody's 등급 조치 재게시, 2025.10.28", url: "https://forums.investireoggi.it/threads/high-yield-e-oltre-verso-frontiere-inesplorate-vol-3.107063/page-493" },
    lummusAbout: { label: "Lummus 회사 소개", url: "https://lummustechnology.com/about-lummus" },
    honeywell8k: { label: "Honeywell 8-K, 2026.4.23", url: "https://www.sec.gov/Archives/edgar/data/0000773840/000077384026000058/hon-20260423.htm" },
    topsoe2025: { label: "Topsoe 2025 실적 발표, 2026.3.4", url: "https://www.topsoe.com/financial-releases/topsoe-reports-satisfactory-financial-results-for-2025-in-a-challenging-market" },
    kbr2025: { label: "KBR 2025 실적 발표, 2026.2.26", url: "https://www.kbr.com/en-au/node/11780" },
    technip: { label: "Editions Technip, 공정 라이선싱 실무", url: "https://www.editionstechnip.com/en/catalogue-telecharger-version/1239.html" },
    acq2020: { label: "Lummus, 인수 완료 발표, 2020.6.30", url: "https://www.lummustechnology.com/news/the-chatterjee-group-rhone-capital-complete-joint-acquisition-of-lummus-technology" },
    ipo2025: { label: "PR Newswire, IPO 초안 비공개 제출, 2025.8.4", url: "https://www.prnewswire.com/news-releases/lummus-announces-confidential-submission-of-draft-registration-statement-for-proposed-initial-public-offering-302520352.html" },
    zpc2026: { label: "Hydrocarbon Processing, ZPC PDH, 2026.9", url: "https://hydrocarbonprocessing.com/news/2026/09/clariant-catalysts-wins-catalyst-supply-contract-for-zpcs-12-mmtpy-pdh-unit/" },
    novolen: { label: "Lummus, Novolen 100번째 라인, 2023.8.17", url: "https://www.lummustechnology.com/news/lummus-novolen-technology-celebrates-100-licensed-production-lines" },
    clg2025: { label: "Digital Refining, CLG 촉매 확대, 2025.11.3", url: "https://www.digitalrefining.com/news/1008508/chevron-lummus-global-expands-and-strengthens-catalyst-portfolio" }
  }
};
