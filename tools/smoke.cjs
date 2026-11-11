/*
 * DOM smoke test (development only). Requires jsdom:
 *   NODE_PATH=<workspace>/node_modules node tools/smoke.cjs
 */
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const root = path.join(__dirname, '..');
let html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
html = html.replace(/<script\s+defer\s+src="[^"]+"><\/script>/g, '');

const dom = new JSDOM(html, { url: 'http://localhost/', runScripts: 'outside-only', pretendToBeVisual: true });
const { window } = dom;
const d = window.document;
window.confirm = () => true;
window.HTMLElement.prototype.scrollIntoView = () => {};
window.scrollTo = () => {};
let downloadedName = null, capturedBlob = null;
window.URL.createObjectURL = b => { capturedBlob = b; return 'blob:mock'; };
window.URL.revokeObjectURL = () => {};
window.HTMLAnchorElement.prototype.click = function () { downloadedName = this.download; };

window.eval(fs.readFileSync(path.join(root, 'exam-data.js'), 'utf8'));
window.eval(fs.readFileSync(path.join(root, 'app.js'), 'utf8'));

let failures = 0;
const ok = (cond, label) => {
  console.log((cond ? '  ok  ' : ' FAIL ') + label);
  if (!cond) failures++;
};
const $ = id => d.getElementById(id);
const click = e => e.dispatchEvent(new window.MouseEvent('click', { bubbles: true }));
const Q = window.EXAM.questions;
const stemText = () => ($('card').querySelector('.question') || {}).textContent || '';
const navButtons = () => $('chapters').querySelectorAll('.chapter');
const setType = v => { $('typeSelect').value = v; $('typeSelect').dispatchEvent(new window.Event('change')); };
const saved = () => JSON.parse(window.localStorage.getItem('rl-exam-progress-v1') || 'null');

(async () => {
  console.log('— initial state —');
  ok(Q.length === 42, 'question bank loaded (42)');
  ok($('total').textContent === '42', 'total stat rendered');
  ok($('done').textContent === '0', 'completed starts at 0');
  ok($('accuracy').textContent === '—', 'accuracy starts empty');
  ok(navButtons().length === 13, 'nav: all + A/A1-5 + B/B1-5 = 13 buttons');
  ok($('chapters').querySelectorAll('.nav-group').length === 2, 'two paper group headers');
  ok($('chapters').querySelectorAll('.chapter').length === 13 &&
    $('chapters').children.length === 15, 'all sections listed vertically on the left');
  ok(stemText().includes('Markov property'), 'first question is the original English item');
  ok(!/[\u4e00-\u9fff]/.test(stemText()), 'question stem contains no Chinese');

  console.log('— single choice: instant grading + Chinese solution —');
  const q0 = Q[0];
  click($('card').querySelectorAll('.option')[q0.answer]);
  ok($('card').querySelector('.result') !== null, 'result panel appears immediately');
  ok($('card').textContent.includes('中文完整题目'), 'full Chinese question shown');
  ok($('card').textContent.includes('中文解题过程'), 'detailed Chinese solution shown');
  ok($('card').textContent.includes('考点速记'), 'key points shown');
  ok($('card').querySelector('.option.correct') !== null, 'correct option highlighted');
  ok($('done').textContent === '1', 'completed count updated');
  ok($('accuracy').textContent === '100%', 'accuracy updated');
  ok(saved() && saved().history[q0.id] !== undefined, 'progress persisted in localStorage');

  console.log('— wrong answer and re-answer —');
  const wrongIdx = (q0.answer + 1) % 4;
  click($('card').querySelectorAll('.option')[wrongIdx]);
  ok($('card').querySelector('.result.wrong') !== null, 'wrong result styled');
  ok($('wrong').textContent === '1', 'wrong count becomes 1');
  ok($('accuracy').textContent === '0%', 'accuracy recomputed');
  click($('card').querySelectorAll('.option')[q0.answer]);
  ok($('wrong').textContent === '0', 're-answering correct clears the wrong mark');

  console.log('— navigation —');
  click($('next'));
  ok(stemText().length > 20, 'next question rendered');
  click($('previous'));
  ok($('card').querySelector('.result') !== null, 'previous question keeps its answer');
  click($('paletteToggle'));
  ok(!$('palette').hidden && $('palette').children.length === 42, 'answer sheet lists all questions');

  console.log('— written question: reveal / hide —');
  click(navButtons()[3]); // A-2 short answer
  ok($('card').querySelectorAll('.sub-list > div').length > 0, 'English sub-questions rendered');
  ok($('card').querySelector('.result') === null, 'answer hidden before confirming');
  const revealBtn = $('card').querySelector('.reveal-row .primary');
  ok(revealBtn.textContent.includes('我已做完'), 'confirm button uses required wording');
  click(revealBtn);
  ok($('card').querySelector('.result') !== null, 'solution revealed after confirming');
  ok($('card').textContent.includes('中文解题过程'), 'Chinese solution shown for written question');
  ok($('card').querySelector('.translation .zh-sub > div') !== null, 'Chinese sub-questions shown');
  const writtenId = Q.find(q => q.set === 'A' && q.section === 2).id;
  ok(saved().history[writtenId] && saved().history[writtenId].revealed === true, 'reveal recorded in progress');
  click($('card').querySelector('.reveal-row .primary'));
  ok($('card').querySelector('.result') === null, 'solution can be hidden again');
  click($('card').querySelector('.reveal-row .primary'));
  ok($('card').querySelector('.result') !== null, 'solution can be shown again');

  console.log('— filters and modes —');
  click(navButtons()[0]);
  setType('single');
  ok($('total').textContent === '20', 'single-choice filter -> 20 questions');
  setType('short');
  ok($('total').textContent === '10', 'short-answer filter -> 10 questions');
  setType('calc');
  ok($('total').textContent === '12', 'calculation filter -> 12 questions');
  setType('all');
  click($('modes').children[1]);
  ok($('total').textContent === '42', 'random mode keeps all questions');
  click($('modes').children[2]);
  ok($('total').textContent === '40', 'unfinished mode hides the 2 completed items');
  click($('modes').children[0]);

  console.log('— language switch —');
  click($('language'));
  ok($('totalLabel').textContent === 'Questions', 'UI switched to English');
  ok(!/[\u4e00-\u9fff]/.test(stemText()), 'question stem stays English');
  click($('language'));

  console.log('— export / import —');
  click($('export'));
  ok(downloadedName && downloadedName.startsWith('rl-exam-progress-'), 'progress JSON downloaded');
  ok(capturedBlob && capturedBlob.type.includes('json'), 'download is JSON');
  const before = saved();
  const target = Q[30];
  const payload = {
    format: 'rl-exam-progress-v1', version: 1, lang: 'zh',
    history: { [target.id]: { choice: target.type === 'single' ? target.answer : undefined, revealed: target.type !== 'single', time: Date.now() + 100000 } },
    flags: { [Q[2].id]: Date.now() + 100000 }
  };
  const file = new window.File([JSON.stringify(payload)], 'progress.json', { type: 'application/json' });
  Object.defineProperty($('import'), 'files', { value: [file], configurable: true });
  $('import').dispatchEvent(new window.Event('change'));
  await new Promise(r => setTimeout(r, 150));
  const after = saved();
  ok(after.history[target.id] !== undefined, 'imported history merged');
  ok(after.history[q0.id] !== undefined, 'existing history preserved');
  ok(after.flags[Q[2].id] !== undefined, 'imported flags merged');
  ok($('toast').textContent.includes('合并'), 'import success toast');

  const bad = new window.File(['{"hello":1}'], 'bad.json', { type: 'application/json' });
  Object.defineProperty($('import'), 'files', { value: [bad], configurable: true });
  $('import').dispatchEvent(new window.Event('change'));
  await new Promise(r => setTimeout(r, 150));
  ok($('toast').textContent.includes('格式'), 'invalid file rejected');

  console.log('— clear progress —');
  click($('reset'));
  ok($('done').textContent === '0', 'clearing progress resets completed count');
  ok(saved() === null || Object.keys(saved().history).length === 0, 'storage cleared');

  console.log('\n' + (failures ? failures + ' FAILURES' : 'All smoke tests passed.'));
  process.exit(failures ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
