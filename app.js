/* RL Midterm Practice Exam — interface logic
 * Visual system follows slai-NNtraining-midterm / the chapter practice site.
 * No build step, no CDN: KaTeX is bundled in vendor/katex.
 */
(function () {
  'use strict';

  const EXAM = window.EXAM;
  const Q = EXAM.questions;
  const META = EXAM.meta;
  const FORMAT = 'rl-exam-progress-v1';
  const KEY = 'rl-exam-progress-v1';
  const $ = id => document.getElementById(id);
  const LETTERS = ['A', 'B', 'C', 'D'];

  /* ------------------------------------------------------------ i18n */
  const I18N = {
    zh: {
      eyebrow: 'MIDTERM PRACTICE EXAM · SET A / SET B',
      headline: '强化学习期中模拟卷',
      subtitle: '两套完整试卷（各 100 分 / 2 小时 / 闭卷）。题面保持考试原貌（全英文）；选择题点选即判正误，简答与大题点「我已做完，核对答案」后展开中文完整题目与逐问中文解题过程。',
      totalLabel: '本组题数', doneLabel: '已完成', accuracyLabel: '选择题正确率', wrongLabel: '待复习（答错）',
      chapterTitle: '试卷导航', localNote: '进度自动保存在本浏览器，可导出 JSON 后在别的设备导入。',
      exportLabel: '导出进度', importLabel: '导入进度', resetLabel: '清空全部进度',
      modes: ['顺序练习', '随机练习', '未完成'], modeHint: '顺序 / 随机 / 只看没做完的题',
      typeLabel: '题型', types: { all: '全部题型', single: '单选题', short: '简答题', calc: '计算题' },
      showPalette: '答题卡', hidePalette: '收起答题卡', restartLabel: '回到第一题',
      previous: '上一题', next: '下一题', finish: '完成',
      allLabel: '全部题目', setAll: '本卷全部', pointsUnit: '分', qUnit: '题',
      typeBadge: { single: '单选题', short: '简答题', calc: '计算题' },
      flagTitle: '收藏本题', flagDone: '取消收藏',
      reveal: '我已做完，核对答案', hideAnswer: '隐藏答案', showAnswer: '重新显示答案',
      hintSingle: '点击任一选项立即判分并展开中文解析；可以改选，进度以最后一次为准。',
      hintWritten: '先自行作答（建议在纸上写过程），再点按钮核对完整中文解答。',
      resultRight: '回答正确', resultWrong: '回答错误', resultRevealed: '参考答案与中文解析',
      yourChoice: '你的选择', correctAnswer: '正确答案', selfCheck: '本题为简答 / 计算题，请对照下方小问与评分要点自评。',
      zhTitle: '中文完整题目', solutionTitle: '中文解题过程', keyTitle: '考点速记',
      emptyTitle: '这一组没有题目', emptyText: '切换左侧试卷 / 题型，或改用「顺序练习」。',
      footerNote: '题目为英文原卷 · 答案与解析为中文 · 全部逻辑在浏览器本地运行',
      confirmReset: '确定清空全部作答记录与收藏吗？此操作不可撤销。',
      toastDone: '这一组已做完，可以换一组继续。', toastExported: '进度已导出为 JSON。',
      toastImported: '进度已导入并按时间戳合并。', toastBadFile: '文件格式不正确，已忽略。',
      toastCleared: '进度已清空。', toastRestart: '已回到本组第一题。',
      finishTitle: '本组完成', finishText: '可切换试卷继续练习，或导出进度备份。'
    },
    en: {
      eyebrow: 'MIDTERM PRACTICE EXAM · SET A / SET B',
      headline: 'RL Midterm Practice Exams',
      subtitle: 'Two full papers (100 points / 2 hours / closed book each). Questions stay in the original exam English; single-choice items are graded on click, while written questions reveal the full Chinese question and step-by-step Chinese solution after you confirm you are done.',
      totalLabel: 'Questions', doneLabel: 'Completed', accuracyLabel: 'MC accuracy', wrongLabel: 'To review',
      chapterTitle: 'PAPER NAVIGATION', localNote: 'Progress is saved in this browser; export a JSON file to continue elsewhere.',
      exportLabel: 'Export progress', importLabel: 'Import progress', resetLabel: 'Clear all progress',
      modes: ['Sequential', 'Random', 'Unfinished'], modeHint: 'Sequential / Random / unfinished only',
      typeLabel: 'Type', types: { all: 'All types', single: 'Single choice', short: 'Short answer', calc: 'Calculation' },
      showPalette: 'Answer sheet', hidePalette: 'Hide answer sheet', restartLabel: 'Back to first',
      previous: 'Previous', next: 'Next', finish: 'Finish',
      allLabel: 'All questions', setAll: 'Whole paper', pointsUnit: 'pts', qUnit: 'Q',
      typeBadge: { single: 'Single choice', short: 'Short answer', calc: 'Calculation' },
      flagTitle: 'Flag question', flagDone: 'Remove flag',
      reveal: "I'm done — show answer", hideAnswer: 'Hide answer', showAnswer: 'Show answer again',
      hintSingle: 'Click an option for instant grading and the Chinese explanation; you may change your choice.',
      hintWritten: 'Work it out first, then reveal the full Chinese solution.',
      resultRight: 'Correct', resultWrong: 'Incorrect', resultRevealed: 'Reference answer & Chinese solution',
      yourChoice: 'Your choice', correctAnswer: 'Correct answer', selfCheck: 'Written question: grade yourself against the steps and marking points below.',
      zhTitle: 'Full question in Chinese', solutionTitle: 'Chinese solution', keyTitle: 'Key points',
      emptyTitle: 'No questions here', emptyText: 'Pick another paper / type on the left, or switch to Sequential.',
      footerNote: 'Original English papers · Chinese answers · runs fully in your browser',
      confirmReset: 'Clear all answers and flags? This cannot be undone.',
      toastDone: 'This group is finished. Pick another one.', toastExported: 'Progress exported as JSON.',
      toastImported: 'Progress imported and merged by timestamp.', toastBadFile: 'Invalid file format, ignored.',
      toastCleared: 'All progress cleared.', toastRestart: 'Back to the first question.',
      finishTitle: 'Group complete', finishText: 'Switch papers or export a backup of your progress.'
    }
  };
  let T = I18N.zh;

  /* --------------------------------------------------- math (KaTeX) */
  const TEX_TO_TEXT = [
    [/\\gamma/g, 'γ'], [/\\alpha/g, 'α'], [/\\varepsilon/g, 'ε'], [/\\lambda/g, 'λ'],
    [/\\theta/g, 'θ'], [/\\pi/g, 'π'], [/\\delta/g, 'δ'], [/\\mu/g, 'μ'], [/\\eta/g, 'η'],
    [/\\tau/g, 'τ'], [/\\kappa/g, 'κ'], [/\\beta/g, 'β'], [/\\sigma/g, 'σ'],
    [/\\sum/g, '∑'], [/\\prod/g, '∏'], [/\\infty/g, '∞'], [/\\times/g, '×'],
    [/\\leq/g, '≤'], [/\\geq/g, '≥'], [/\\approx/g, '≈'], [/\\neq/g, '≠'],
    [/\\in/g, '∈'], [/\\to/g, '→'], [/\\leftarrow/g, '←'], [/\\Rightarrow/g, '⇒'],
    [/\\mid/g, '|'], [/\\propto/g, '∝'], [/\\partial/g, '∂'], [/\\nabla/g, '∇'],
    [/\\langle/g, '⟨'], [/\\rangle/g, '⟩'], [/\\operatorname\{argmax\}/g, 'argmax'],
    [/\\(max|min|log|exp|lim|text|mathrm|mathbf|frac|binom|sqrt|hat|bar|top|cdot|quad|sum)/g, '$1'],
    [/\\\|/g, '‖'], [/\\ /g, ' '], [/\\\{/g, '{'], [/\\\}/g, '}'],
    [/\\[a-zA-Z]+/g, ''], [/[{}_^]/g, ''], [/\\/g, '']
  ];
  function texToText(t) {
    let s = String(t);
    for (const pair of TEX_TO_TEXT) s = s.replace(pair[0], pair[1]);
    return s;
  }
  function renderTex(tex, display) {
    if (!window.katex) return '<code>' + texToText(tex) + '</code>';
    try {
      return window.katex.renderToString(tex, { displayMode: !!display, throwOnError: false, strict: 'ignore' });
    } catch (_) { return '<code>' + texToText(tex) + '</code>'; }
  }
  /* Legacy pseudo-LaTeX in prose (R_{t+1}, γ^k) becomes real sub/sup. */
  function prettyMath(s) {
    return String(s).split(/(<[^>]*>)/g).map(seg => {
      if (seg.charAt(0) === '<') return seg;
      return seg
        .replace(/_\{([^{}]*)\}/g, (m, p) => '<sub class="mi">' + p + '</sub>')
        .replace(/\^\{([^{}]*)\}/g, (m, p) => '<sup class="mi">' + p + '</sup>')
        .replace(/_([A-Za-z0-9πγδθαβελμσηωΣ∞′'+−])/g, (m, p) => '<sub class="mi">' + p + '</sub>')
        .replace(/\^([A-Za-z0-9πγδθαβελμσηωΣ∞+−])/g, (m, p) => '<sup class="mi">' + p + '</sup>');
    }).join('');
  }
  function mathHTML(src) {
    let out = '';
    String(src).split('$$').forEach((chunk, i) => {
      if (i % 2 === 1) { out += renderTex(chunk, true); return; }
      chunk.split('$').forEach((part, j) => {
        out += (j % 2 === 1) ? renderTex(part, false) : prettyMath(part);
      });
    });
    return out;
  }
  function el(tag, cls, text) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  }
  function rich(tag, cls, html) { const e = el(tag, cls); e.innerHTML = mathHTML(html); return e; }

  /* ------------------------------------------------------------ state */
  const state = {
    lang: 'zh', view: 'all', mode: 'seq', type: 'all', index: 0,
    paletteOpen: false, history: {}, flags: {}, queue: []
  };
  const sections = {};
  META.sections.forEach(s => { sections[s.id] = s; });
  const labels = {};
  ['A', 'B'].forEach(st => {
    Q.filter(q => q.set === st).forEach((q, i) => { labels[q.id] = st + (i + 1); });
  });

  function load() {
    try {
      const raw = JSON.parse(localStorage.getItem(KEY) || 'null');
      if (raw && raw.format === FORMAT) {
        state.history = raw.history || {};
        state.flags = raw.flags || {};
        if (raw.lang === 'en' || raw.lang === 'zh') state.lang = raw.lang;
      }
    } catch (_) { /* ignore corrupt storage */ }
  }
  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify({
        format: FORMAT, version: 1, lang: state.lang,
        history: state.history, flags: state.flags
      }));
    } catch (_) { /* storage may be disabled */ }
  }
  function isSingle(q) { return q.type === 'single'; }
  function isDone(q) {
    const h = state.history[q.id];
    if (!h) return false;
    return isSingle(q) ? Number.isInteger(h.choice) : !!h.revealed;
  }
  function isCorrect(q) {
    const h = state.history[q.id];
    return isSingle(q) && h && h.choice === q.answer;
  }
  function matchView(q) {
    if (state.view === 'all') return true;
    const parts = state.view.split('-');
    return q.set === parts[0] && (parts.length === 1 || q.section === Number(parts[1]));
  }
  function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function rebuildQueue(keepIndex) {
    let list = Q.filter(q => matchView(q) && (state.type === 'all' || q.type === state.type));
    if (state.mode === 'todo') list = list.filter(q => !isDone(q));
    if (state.mode === 'random') shuffle(list);
    state.queue = list;
    if (!keepIndex) state.index = 0;
    if (state.index >= list.length) state.index = Math.max(0, list.length - 1);
  }

  /* --------------------------------------------------------- chrome */
  function applyI18n() {
    T = I18N[state.lang];
    document.documentElement.lang = state.lang === 'zh' ? 'zh-CN' : 'en';
    $('eyebrow').textContent = T.eyebrow;
    $('headline').textContent = T.headline;
    $('subtitle').textContent = T.subtitle;
    $('totalLabel').textContent = T.totalLabel;
    $('doneLabel').textContent = T.doneLabel;
    $('accuracyLabel').textContent = T.accuracyLabel;
    $('wrongLabel').textContent = T.wrongLabel;
    $('chapterTitle').textContent = T.chapterTitle;
    $('localNote').textContent = T.localNote;
    $('export').textContent = T.exportLabel;
    $('importLabel').textContent = T.importLabel;
    $('reset').textContent = T.resetLabel;
    $('typeLabel').textContent = T.typeLabel;
    $('restart').textContent = T.restartLabel;
    $('previous').textContent = T.previous;
    $('footerNote').textContent = T.footerNote;
    $('language').textContent = state.lang === 'zh' ? '中文 / EN' : 'EN / 中文';
    const sel = $('typeSelect');
    [...sel.options].forEach(o => { o.textContent = T.types[o.value]; });
    [...$('modes').children].forEach((b, i) => { b.textContent = T.modes[i]; b.title = T.modeHint; });
    $('paletteToggle').textContent = state.paletteOpen ? T.hidePalette : T.showPalette;
  }

  function viewName(v) {
    if (v === 'all') return T.allLabel;
    const parts = v.split('-');
    const st = parts[0];
    if (parts.length === 1) return st + ' ' + (state.lang === 'zh' ? '卷 · ' : '· ') + T.setAll;
    const s = sections[Number(parts[1])];
    return st + ' · ' + (state.lang === 'zh' ? s.zh : s.en);
  }
  function navCount(view) {
    let list = Q;
    if (view !== 'all') {
      const parts = view.split('-');
      list = list.filter(q => q.set === parts[0] && (parts.length === 1 || q.section === Number(parts[1])));
    }
    return { total: list.length, done: list.filter(isDone).length, points: list.reduce((a, q) => a + q.points, 0) };
  }
  function navButton(view, num, title, sub) {
    const c = navCount(view);
    const b = el('button', 'chapter' + (state.view === view ? ' active' : ''));
    b.type = 'button';
    b.dataset.view = view;
    b.appendChild(el('span', 'num', num));
    const text = el('span', 'ctext');
    text.appendChild(el('strong', '', title));
    text.appendChild(el('small', '', sub));
    b.appendChild(text);
    const count = el('span', 'count');
    const em = el('em', '', String(c.done));
    count.appendChild(em);
    count.appendChild(document.createTextNode('/' + c.total));
    b.appendChild(count);
    b.addEventListener('click', () => { state.view = view; rebuildQueue(false); render(); });
    return b;
  }
  function renderNav() {
    const nav = $('chapters');
    nav.textContent = '';
    const ca = navCount('all');
    nav.appendChild(navButton('all', '00', T.allLabel,
      ca.total + ' ' + T.qUnit + ' · ' + ca.points + ' ' + T.pointsUnit));
    ['A', 'B'].forEach(st => {
      const group = el('div', 'nav-group');
      group.textContent = st + ' ' + (state.lang === 'zh' ? '卷' : 'SET') + ' · 100 ' + T.pointsUnit;
      nav.appendChild(group);
      const c = navCount(st);
      nav.appendChild(navButton(st, st, T.setAll,
        c.total + ' ' + T.qUnit + ' · ' + c.points + ' ' + T.pointsUnit));
      META.sections.forEach(s => {
        const v = st + '-' + s.id;
        const cc = navCount(v);
        nav.appendChild(navButton(v, st + s.id,
          state.lang === 'zh' ? s.zh : s.en,
          cc.total + ' ' + T.qUnit + ' · ' + cc.points + ' ' + T.pointsUnit));
      });
    });
  }
  function renderModes() {
    const box = $('modes');
    box.textContent = '';
    ['seq', 'random', 'todo'].forEach((m, i) => {
      const b = el('button', state.mode === m ? 'active' : '', T.modes[i]);
      b.type = 'button';
      b.title = T.modeHint;
      b.addEventListener('click', () => { state.mode = m; rebuildQueue(false); render(); });
      box.appendChild(b);
    });
  }
  function renderStats() {
    const list = state.queue;
    const done = list.filter(isDone).length;
    const answered = list.filter(q => isSingle(q) && state.history[q.id] && Number.isInteger(state.history[q.id].choice));
    const right = answered.filter(isCorrect).length;
    $('total').textContent = list.length;
    $('done').textContent = done;
    $('accuracy').textContent = answered.length ? Math.round(right / answered.length * 100) + '%' : '—';
    $('wrong').textContent = answered.length - right;
  }
  function renderPalette() {
    const p = $('palette');
    p.hidden = !state.paletteOpen;
    p.textContent = '';
    state.queue.forEach((q, i) => {
      const b = el('button', '', labels[q.id] || String(i + 1));
      b.type = 'button';
      if (isDone(q)) b.classList.add(isSingle(q) ? (isCorrect(q) ? 'done-right' : 'done-wrong') : 'done-revealed');
      if (i === state.index) b.classList.add('current');
      if (state.flags[q.id]) b.classList.add('flagged');
      b.title = q.id + ' · ' + q.points + ' ' + T.pointsUnit;
      b.addEventListener('click', () => { state.index = i; render(); });
      p.appendChild(b);
    });
  }

  /* ---------------------------------------------------------- card */
  function metaRow(q) {
    const row = el('div', 'question-meta');
    const left = el('div', 'meta-left');
    left.appendChild(el('span', 'badge', q.set + ' ' + (state.lang === 'zh' ? '卷' : 'SET')));
    left.appendChild(el('span', 'badge type-' + q.type, T.typeBadge[q.type]));
    const s = sections[q.section];
    left.appendChild(el('span', '', 'Section ' + q.section + ' · ' + (state.lang === 'zh' ? s.zh : s.en)));
    left.appendChild(el('span', 'badge difficulty', q.points + ' ' + T.pointsUnit));
    row.appendChild(left);
    const flag = el('button', 'flag' + (state.flags[q.id] ? ' on' : ''), state.flags[q.id] ? '★' : '☆');
    flag.type = 'button';
    flag.title = state.flags[q.id] ? T.flagDone : T.flagTitle;
    flag.addEventListener('click', () => {
      if (state.flags[q.id]) delete state.flags[q.id]; else state.flags[q.id] = Date.now();
      save(); render();
    });
    row.appendChild(flag);
    return row;
  }
  function translationBlock(q) {
    const wrap = el('div', 'translation');
    wrap.appendChild(rich('div', 'zh-stem', q.zh.stem));
    if (isSingle(q)) {
      const ul = el('ul', 'zh-options');
      q.zh.options.forEach((o, i) => {
        const li = el('li', i === q.answer ? 'right' : '');
        li.appendChild(el('b', '', LETTERS[i]));
        const span = rich('span', '', o);
        while (span.firstChild) li.appendChild(span.firstChild);
        ul.appendChild(li);
      });
      wrap.appendChild(ul);
    } else {
      const list = el('div', 'zh-sub');
      q.zh.sub.forEach(s => list.appendChild(rich('div', 'zh-sub-item', s)));
      wrap.appendChild(list);
    }
    return wrap;
  }
  function resultBlock(q) {
    const h = state.history[q.id] || {};
    const shown = isSingle(q) ? Number.isInteger(h.choice) : (h.revealed && !h.hidden);
    if (!shown) return null;
    const right = isCorrect(q);
    const res = el('div', 'result' + (isSingle(q) && !right ? ' wrong' : ''));
    res.appendChild(el('h3', '', isSingle(q) ? (right ? T.resultRight : T.resultWrong) : T.resultRevealed));
    if (isSingle(q)) {
      res.appendChild(el('div', 'answer-line',
        T.yourChoice + '：' + LETTERS[h.choice] + '　|　' + T.correctAnswer + '：' + LETTERS[q.answer]));
    } else {
      res.appendChild(el('div', 'answer-line', T.selfCheck));
    }
    const s1 = el('div', 'result-section');
    s1.appendChild(el('h4', '', T.zhTitle));
    s1.appendChild(translationBlock(q));
    res.appendChild(s1);
    const s2 = el('div', 'result-section');
    s2.appendChild(el('h4', '', T.solutionTitle));
    s2.appendChild(rich('div', 'explanation', q.zh.solution));
    res.appendChild(s2);
    if (q.key) {
      const s3 = el('div', 'result-section');
      s3.appendChild(el('h4', '', T.keyTitle));
      s3.appendChild(rich('div', 'key-point', q.key));
      res.appendChild(s3);
    }
    return res;
  }
  function optionButton(q, i, h) {
    const b = el('button', 'option');
    b.type = 'button';
    b.appendChild(el('span', 'letter', LETTERS[i]));
    const txt = rich('span', 'option-text', q.en.options[i]);
    b.appendChild(txt);
    const chosen = Number.isInteger(h.choice);
    if (chosen) {
      if (i === q.answer) b.classList.add('correct');
      else if (i === h.choice) b.classList.add('incorrect');
      if (i === h.choice) b.classList.add('selected');
    }
    b.addEventListener('click', () => choose(q, i));
    return b;
  }
  function renderCard() {
    const card = $('card');
    card.textContent = '';
    const q = state.queue[state.index];
    if (!q) {
      const empty = el('div', 'empty');
      empty.appendChild(el('h2', '', T.emptyTitle));
      empty.appendChild(el('p', '', T.emptyText));
      card.appendChild(empty);
      return;
    }
    const h = state.history[q.id] || {};
    card.appendChild(metaRow(q));
    card.appendChild(rich('div', 'question', q.en.stem));
    if (isSingle(q)) {
      const box = el('div', 'options');
      q.en.options.forEach((_, i) => box.appendChild(optionButton(q, i, h)));
      card.appendChild(box);
      const hint = el('div', 'submit-row');
      hint.appendChild(el('span', 'hint', T.hintSingle));
      card.appendChild(hint);
    } else {
      const list = el('div', 'sub-list');
      q.en.sub.forEach(s => list.appendChild(rich('div', 'sub-item', s)));
      card.appendChild(list);
      const row = el('div', 'reveal-row');
      const btn = el('button', 'primary', h.hidden ? T.showAnswer : (h.revealed ? T.hideAnswer : T.reveal));
      btn.type = 'button';
      btn.addEventListener('click', () => toggleReveal(q));
      row.appendChild(btn);
      row.appendChild(el('span', 'hint', T.hintWritten));
      card.appendChild(row);
    }
    const result = resultBlock(q);
    if (result) card.appendChild(result);
  }

  /* ------------------------------------------------------- actions */
  function choose(q, i) {
    const h = state.history[q.id] || {};
    h.choice = i;
    h.time = Date.now();
    state.history[q.id] = h;
    save(); render();
    const r = $('card').querySelector('.result');
    if (r && r.scrollIntoView) r.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }
  function toggleReveal(q) {
    const h = state.history[q.id] || {};
    if (h.revealed && !h.hidden) h.hidden = true;
    else { h.revealed = true; h.hidden = false; }
    h.time = Date.now();
    state.history[q.id] = h;
    save(); render();
    const r = $('card').querySelector('.result');
    if (r && r.scrollIntoView) r.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }
  function go(delta) {
    const n = state.queue.length;
    if (!n) return;
    const next = state.index + delta;
    if (next < 0 || next >= n) return;
    state.index = next; render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  let toastTimer;
  function toast(msg) {
    const t = $('toast');
    t.textContent = msg;
    t.style.display = 'block';
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { t.style.display = 'none'; }, 2600);
  }
  function exportProgress() {
    const data = {
      format: FORMAT, version: 1, exportedAt: new Date().toISOString(),
      lang: state.lang, history: state.history, flags: state.flags
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rl-exam-progress-' + new Date().toISOString().slice(0, 10) + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast(T.toastExported);
  }
  function mergeRecord(map, id, rec) {
    const cur = map[id];
    const t = rec && (rec.time || 0), ct = cur && (cur.time || 0);
    if (!cur || t > ct) map[id] = rec;
  }
  function importProgress(file) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const d = JSON.parse(String(reader.result));
        if (!d || d.format !== FORMAT || typeof d.history !== 'object' || !d.history) throw new Error('bad');
        Object.keys(d.history).forEach(id => { if (Q.some(q => q.id === id)) mergeRecord(state.history, id, d.history[id]); });
        if (d.flags && typeof d.flags === 'object') {
          Object.keys(d.flags).forEach(id => {
            if (!state.flags[id] || Number(d.flags[id]) > Number(state.flags[id])) state.flags[id] = Number(d.flags[id]);
          });
        }
        if (d.lang === 'en' || d.lang === 'zh') state.lang = d.lang;
        save(); rebuildQueue(true); render();
        toast(T.toastImported);
      } catch (_) { toast(T.toastBadFile); }
    };
    reader.readAsText(file);
  }

  /* --------------------------------------------------------- render */
  function render() {
    applyI18n();
    renderModes();
    renderNav();
    renderStats();
    renderPalette();
    renderCard();
    const n = state.queue.length;
    $('sessionName').textContent = viewName(state.view) + ' · ' + n + ' ' + T.qUnit;
    $('position').textContent = n ? (state.index + 1) + ' / ' + n : '0 / 0';
    $('progress').style.width = (n ? state.queue.filter(isDone).length / n * 100 : 0) + '%';
    $('previous').disabled = !n || state.index === 0;
    $('next').disabled = !n;
    $('next').textContent = n && state.index === n - 1 ? T.finish : T.next;
    $('restart').disabled = !n;
  }

  /* ---------------------------------------------------------- init */
  function init() {
    load();
    $('language').addEventListener('click', () => {
      state.lang = state.lang === 'zh' ? 'en' : 'zh';
      save(); render();
    });
    $('typeSelect').value = state.type;
    $('typeSelect').addEventListener('change', e => {
      state.type = e.target.value; rebuildQueue(false); render();
    });
    $('paletteToggle').addEventListener('click', () => {
      state.paletteOpen = !state.paletteOpen; render();
    });
    $('restart').addEventListener('click', () => {
      state.index = 0; render(); window.scrollTo({ top: 0, behavior: 'smooth' }); toast(T.toastRestart);
    });
    $('previous').addEventListener('click', () => go(-1));
    $('next').addEventListener('click', () => {
      if (state.index === state.queue.length - 1) toast(T.toastDone);
      else go(1);
    });
    $('export').addEventListener('click', exportProgress);
    $('import').addEventListener('change', e => {
      if (e.target.files && e.target.files[0]) importProgress(e.target.files[0]);
      e.target.value = '';
    });
    $('reset').addEventListener('click', () => {
      if (!window.confirm(T.confirmReset)) return;
      state.history = {}; state.flags = {};
      try { localStorage.removeItem(KEY); } catch (_) { /* noop */ }
      rebuildQueue(false); render(); toast(T.toastCleared);
    });
    document.addEventListener('keydown', e => {
      if (e.target && /^(INPUT|SELECT|TEXTAREA)$/.test(e.target.tagName)) return;
      if (e.key === 'Enter' && e.target && e.target.tagName === 'BUTTON') return;
      const q = state.queue[state.index];
      if (!q) return;
      const k = e.key.toUpperCase();
      if (isSingle(q)) {
        let idx = LETTERS.indexOf(k);
        if (idx < 0 && /^[1-4]$/.test(k)) idx = Number(k) - 1;
        if (idx >= 0) { choose(q, idx); e.preventDefault(); return; }
      } else if (e.key === 'Enter') {
        toggleReveal(q); e.preventDefault(); return;
      }
      if (e.key === 'ArrowLeft') { go(-1); e.preventDefault(); }
      if (e.key === 'ArrowRight') { go(1); e.preventDefault(); }
    });
    rebuildQueue(false);
    render();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
