# -*- coding: utf-8 -*-
"""
Regenerate exam-data.js from exam_source.py.

    python tools/build_data.py

The data file is plain JSON assigned to window.EXAM, so LaTeX backslashes are
escaped by json.dumps and arrive intact in the browser. No build step, no npm.
"""
import io
import json
import os
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
import exam_source as src  # noqa: E402

META, QUESTIONS = src.META, src.QUESTIONS

# ---------------------------------------------------------------- sanity checks
errors = []
seen = set()
for q in QUESTIONS:
    qid = q.get("id", "?")
    if qid in seen:
        errors.append("duplicate id: " + qid)
    seen.add(qid)
    if q.get("set") not in ("A", "B"):
        errors.append(qid + ": bad set")
    if q.get("section") not in (1, 2, 3, 4, 5):
        errors.append(qid + ": bad section")
    if q.get("type") not in ("single", "short", "calc"):
        errors.append(qid + ": bad type")
    if not isinstance(q.get("points"), int) or q["points"] <= 0:
        errors.append(qid + ": bad points")
    en, zh = q.get("en", {}), q.get("zh", {})
    if not en.get("stem") or not zh.get("stem"):
        errors.append(qid + ": missing stem")
    if not zh.get("solution"):
        errors.append(qid + ": missing Chinese solution")
    if q["type"] == "single":
        if not isinstance(q.get("answer"), int) or not 0 <= q["answer"] <= 3:
            errors.append(qid + ": bad answer index")
        if len(en.get("options", [])) != 4 or len(zh.get("options", [])) != 4:
            errors.append(qid + ": need 4 EN and 4 ZH options")
        if en.get("sub") or zh.get("sub"):
            errors.append(qid + ": single choice should not have sub-questions")
    else:
        if len(en.get("sub", [])) != len(zh.get("sub", [])):
            errors.append(qid + ": EN/ZH sub-question count mismatch")
        if not en.get("sub"):
            errors.append(qid + ": missing sub-questions")
    # every string must have balanced $ / $$ delimiters
    strings = [en.get("stem", ""), zh.get("stem", ""), zh.get("solution", ""), q.get("key", "")]
    strings += list(en.get("options", [])) + list(zh.get("options", []))
    strings += list(en.get("sub", [])) + list(zh.get("sub", []))
    for s in strings:
        if s.count("$$") % 2 != 0:
            errors.append(qid + ": unbalanced $$ near " + s[:50])
        stripped = s.replace("$$", "")
        if stripped.count("$") % 2 != 0:
            errors.append(qid + ": unbalanced $ near " + s[:50])

for st in ("A", "B"):
    qs = [q for q in QUESTIONS if q["set"] == st]
    if len(qs) != 21:
        errors.append("Set " + st + " should have 21 questions, got " + str(len(qs)))
    if sum(q["points"] for q in qs) != 100:
        errors.append("Set " + st + " should total 100 points")

if errors:
    for e in errors:
        print("ERROR:", e)
    sys.exit(1)

data = {"meta": META, "questions": QUESTIONS}
out = os.path.join(HERE, "..", "exam-data.js")
text = "window.EXAM = " + json.dumps(data, ensure_ascii=False, indent=1) + ";\n"
io.open(out, "w", encoding="utf-8").write(text)

print("wrote", os.path.normpath(out))
print("questions:", len(QUESTIONS), "| Set A:", sum(q["points"] for q in QUESTIONS if q["set"] == "A"),
      "pts | Set B:", sum(q["points"] for q in QUESTIONS if q["set"] == "B"), "pts")
print("file size:", os.path.getsize(out), "bytes")
