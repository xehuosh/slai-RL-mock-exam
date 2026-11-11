/*
 * Question-bank validator (development only):
 *   node tools/validate.cjs
 * With KaTeX installed you can also trial-render every formula:
 *   NODE_PATH=<workspace>/node_modules node tools/validate.cjs
 */
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
global.window = {};
require(path.join(root, 'exam-data.js'));
const E = global.window.EXAM;
const Q = E.questions;

let errors = 0, warnings = 0;
const fail = (id, msg) => { console.log('ERROR  ' + id + ': ' + msg); errors++; };
const warn = (id, msg) => { console.log('WARN   ' + id + ': ' + msg); warnings++; };

function stringsOf(q) {
  const out = [
    ['en.stem', q.en.stem], ['zh.stem', q.zh.stem],
    ['zh.solution', q.zh.solution], ['key', q.key || '']
  ];
  (q.en.options || []).forEach((o, i) => out.push(['en.opt' + i, o]));
  (q.zh.options || []).forEach((o, i) => out.push(['zh.opt' + i, o]));
  (q.en.sub || []).forEach((o, i) => out.push(['en.sub' + i, o]));
  (q.zh.sub || []).forEach((o, i) => out.push(['zh.sub' + i, o]));
  return out;
}

const ids = new Set();
for (const q of Q) {
  const id = q.id;
  if (ids.has(id)) fail(id, 'duplicate id');
  ids.add(id);
  if (!['A', 'B'].includes(q.set)) fail(id, 'bad set');
  if (!(q.section >= 1 && q.section <= 5)) fail(id, 'bad section');
  if (!['single', 'short', 'calc'].includes(q.type)) fail(id, 'bad type');
  if (!(q.points > 0)) fail(id, 'bad points');
  if (!q.en.stem || !q.zh.stem || !q.zh.solution) fail(id, 'missing stem or Chinese solution');
  if (q.type === 'single') {
    if (!(Number.isInteger(q.answer) && q.answer >= 0 && q.answer <= 3)) fail(id, 'bad answer index');
    if ((q.en.options || []).length !== 4 || (q.zh.options || []).length !== 4) fail(id, 'options must be 4 + 4');
  } else {
    if (!q.en.sub || !q.zh.sub || q.en.sub.length !== q.zh.sub.length) fail(id, 'sub-question count mismatch');
  }
  for (const [name, s] of stringsOf(q)) {
    if (typeof s !== 'string') { fail(id, name + ' is not a string'); continue; }
    if ((s.match(/\$\$/g) || []).length % 2 !== 0) fail(id, 'unbalanced $$ in ' + name);
    if ((s.replace(/\$\$/g, '').match(/\$/g) || []).length % 2 !== 0) fail(id, 'unbalanced $ in ' + name);
    for (const tag of ['b', 'i', 'p', 'ol', 'li', 'ul', 'div', 'span', 'code']) {
      const open = (s.match(new RegExp('<' + tag + '>', 'g')) || []).length;
      const close = (s.match(new RegExp('</' + tag + '>', 'g')) || []).length;
      if (open !== close) fail(id, 'unbalanced <' + tag + '> in ' + name);
    }
    if (/<script|onerror=|javascript:/i.test(s)) fail(id, 'unsafe markup in ' + name);
    if (/[\u4e00-\u9fff]/.test(q.en.stem) && name === 'en.stem') warn(id, 'Chinese character inside English stem');
  }
  if (q.zh.solution.length < 80) warn(id, 'Chinese solution looks short');
}

for (const st of ['A', 'B']) {
  const qs = Q.filter(q => q.set === st);
  if (qs.length !== 21) fail(st, 'expected 21 questions, got ' + qs.length);
  if (qs.reduce((a, q) => a + q.points, 0) !== 100) fail(st, 'expected 100 points');
  for (let s = 1; s <= 5; s++) {
    if (!qs.some(q => q.section === s)) fail(st, 'missing section ' + s);
  }
}
if (Q.length !== 42) fail('bank', 'expected 42 questions, got ' + Q.length);

// Trial-render every math fragment when KaTeX is available.
let katex = null;
try { katex = require('katex'); } catch (_) { /* optional */ }
let mathCount = 0, mathFail = 0;
if (katex) {
  const fragments = new Set();
  function collect(src) {
    const parts = String(src).split('$$');
    parts.forEach((x, i) => {
      if (i % 2 === 1) { fragments.add(x); return; }
      x.split('$').forEach((p, j) => { if (j % 2 === 1) fragments.add(p); });
    });
  }
  for (const q of Q) for (const [, s] of stringsOf(q)) collect(s);
  for (const tex of fragments) {
    mathCount++;
    try { katex.renderToString(tex, { throwOnError: true, strict: 'ignore' }); }
    catch (e) { mathFail++; if (mathFail <= 10) console.log('MATH ERROR: ' + JSON.stringify(tex.slice(0, 140)) + ' => ' + e.message.slice(0, 120)); }
  }
  if (mathFail) fail('math', mathFail + ' fragments failed to render');
}

console.log('---');
console.log('questions: ' + Q.length + ' | A: ' + Q.filter(q => q.set === 'A').length +
  ' | B: ' + Q.filter(q => q.set === 'B').length +
  ' | single: ' + Q.filter(q => q.type === 'single').length +
  ' | short: ' + Q.filter(q => q.type === 'short').length +
  ' | calc: ' + Q.filter(q => q.type === 'calc').length);
console.log('math fragments: ' + mathCount + (katex ? '' : ' (KaTeX not installed, skipped)'));
console.log('errors: ' + errors + ' | warnings: ' + warnings);
process.exit(errors ? 1 : 0);
