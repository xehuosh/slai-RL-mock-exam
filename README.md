# RL Midterm · Practice Exam (Set A / Set B)

强化学习课程**期中模拟卷刷题网站**。把两份 LaTeX 模拟卷（`exam.tex` / `exam_b.tex` 及对应 `solutions*.tex`）搬到网页上：题面保持考试原貌（全英文），答案区给出**中文完整题目 + 逐问中文解题过程 + 考点速记**。

界面与交互沿用之前的章节刷题站（参考 [Evan2you/slai-NNtraining-midterm](https://github.com/Evan2you/slai-NNtraining-midterm)）：纯 HTML / CSS / JavaScript，无构建步骤、无 CDN、无后端、无登录，直接放 GitHub Pages 即可。

## 试卷与功能

| 卷 | 题数 | 分值 | 结构 |
|---|---:|---:|---|
| A 卷 | 21 | 100 | 单选 10×2 + 简答 5×5 + MDP 计算 3（8/9/8）+ 学习算法计算 2×10 + 最优策略 1×10 |
| B 卷 | 21 | 100 | 同上，题目与数值完全不同 |

- **选择题**：点任一选项**立即判正误**，正确项标绿、错选项标红，同时展开中文题目、中文解析与考点速记；可以改选，进度以最后一次为准。
- **简答题 / 计算大题**：先在纸上作答，再点「**我已做完，核对答案**」，展开中文完整题目（含所有小问）与逐步中文解题过程；可反复隐藏 / 重新显示，方便自测。
- 左侧**竖排导航**：全部题目 + A 卷（本卷全部、S1–S5）+ B 卷（本卷全部、S1–S5），任何窗口宽度都不折叠，每项显示 `已完成/总数`。
- 顺序 / 随机 / 未完成三种模式，题型筛选，答题卡跳题，收藏，中英界面切换，键盘快捷键（`A–D` / `1–4` 选项，`Enter` 核对主观题，`←/→` 翻题）。
- 进度存 `localStorage`（键 `rl-exam-progress-v1`），可导出 / 导入 JSON，按时间戳合并；「清空全部进度」有确认提示。
- 公式用**本地内置 KaTeX**（`vendor/katex/`），独立公式 `$$…$$`、行内公式 `$…$`，求和号上下限、分数、希腊字母、上下标、`\boxed{}` 都是正规数学排版，离线可用。

## 文件

```
index.html          页面结构
style.css           样式
app.js              交互逻辑
exam-data.js        生成的题库数据（window.EXAM）
vendor/katex/       本地 KaTeX（CSS、JS、20 个 woff2 字体）
.nojekyll           GitHub Pages 必需
README.md           本说明
tools/exam_source.py   题库源文件（可读、可编辑；中英文题目与中文解析都在这里）
tools/build_data.py    由源文件生成 exam-data.js
tools/validate.cjs     题库 / 公式校验（开发用）
tools/smoke.cjs        jsdom 全流程冒烟测试（开发用）
```

`tools/` 与 `vendor/` 中，部署**必需**的只有 `vendor/katex/`；`tools/` 可以不上传。

## 编辑题库

改 `tools/exam_source.py` 里的 `QUESTIONS`，然后重新生成数据文件：

```bash
python tools/build_data.py        # 生成 exam-data.js
node tools/validate.cjs           # 字段、答案下标、中英小问数量、$ 配对
node --check app.js && node --check exam-data.js
# 可选：NODE_PATH=<workspace>/node_modules node tools/smoke.cjs
# 可选（装了 katex 时会逐条试渲染所有公式）：
# NODE_PATH=<workspace>/node_modules node tools/validate.cjs
```

源数据用 Python **raw 字符串**（`r'''…'''`），LaTeX 反斜杠保持单份；`build_data.py` 用 `json.dumps` 序列化，所以 JS 里的转义是自动处理的。**不要直接手写 `exam-data.js` 里的 LaTeX 反斜杠**，也不要把它改回 JS 模板字符串（`\sum` 会被吞成 `sum`）。

每题字段：

```python
{
  "id": "A-S1-Q1", "set": "A", "section": 1, "type": "single", "points": 2,
  "answer": 2,                       # 仅单选题，正确选项下标 0–3
  "en": {"stem": "...", "options": ["...", "...", "...", "..."], "sub": ["(a) ..."]},
  "zh": {"stem": "...", "options": ["...", ...], "sub": ["（a）..."], "solution": "...", },
  "key": "考点速记"
}
# type = short / calc 时不写 answer 与 options，改用 sub（英文小问与中文小问数量必须一致）
```

`build_data.py` 会检查：A / B 各 21 题且各 100 分、id 唯一、单选答案下标、选项与小问数量、`$` / `$$` 配对。

## 部署到 GitHub Pages（xehuosh 账号）

> 建议仓库名用 **`slai-RL-midterm-exam`**（不要带 `.github.io` 后缀）。
> 只有仓库名恰好等于 `<用户名>.github.io` 才是用户主页站点；带后缀的仓库仍然是项目站点，网址会变成
> `https://xehuosh.github.io/slai-RL-midterm-exam.github.io/`，又长又容易写错。

**第 1 步：在 GitHub 网页新建仓库**

打开 <https://github.com/new>，Repository name 填 `slai-RL-midterm-exam`，选 **Public**，**不要**勾选 "Add a README file" / .gitignore / license，然后 Create repository。

**第 2 步：推送源码（Git Bash / PowerShell 均可）**

如果直接用本项目文件夹（里面已经 `git init` 并提交过一次）：

```bash
cd "C:/Users/sunzp/WorkBuddy/2026-11-06-11-52-18/rl-exam-site"
git remote add origin https://github.com/xehuosh/slai-RL-midterm-exam.git
git branch -M main
git push -u origin main
```

如果用的是解压出来的 zip（没有 `.git`），改走完整流程：

```bash
cd <解压后的文件夹>
git init
git add -A
git commit -m "Add RL midterm practice exam site"
git branch -M main
git remote add origin https://github.com/xehuosh/slai-RL-midterm-exam.git
git push -u origin main
```

推送时 GitHub 会要求登录：用户名填 `xehuosh`，**密码不能用账号密码**，需要到
<https://github.com/settings/tokens> 生成一个勾了 `repo` 权限的 Personal Access Token 当密码填（Git Credential Manager 也可能直接弹出浏览器登录窗口）。用完可以撤销这个 token。

也可以完全不碰命令行：在仓库页面点 **Add file → Upload files**，把项目里的全部文件（`index.html`、`style.css`、`app.js`、`exam-data.js`、`vendor/katex/` 整个目录、`.nojekyll`、`README.md`）拖进去提交。注意**不要上传 zip 本身**，也不要多套一层文件夹（`index.html` 必须在仓库根目录）。

**第 3 步：开启 Pages（不做这一步网址会一直 404）**

仓库 → **Settings → Pages → Build and deployment** → Source 选 **Deploy from a branch** → Branch 选 `main` + `/(root)` → Save。等 1–2 分钟，访问：

```
https://xehuosh.github.io/slai-RL-midterm-exam/
```

> 已有的刷题站仓库 `xehuosh/slai-RL-midterm-practice.github.io` 是另一个项目；开启 Pages 后它的网址是
> `https://xehuosh.github.io/slai-RL-midterm-practice.github.io/`。

本地也可以直接双击 `index.html`，或起静态服务器：

```bash
python -m http.server 8000
# 浏览器打开 http://localhost:8000
```

## 进度文件格式

```json
{
  "format": "rl-exam-progress-v1",
  "version": 1,
  "exportedAt": "2026-11-11T00:00:00.000Z",
  "lang": "zh",
  "history": {
    "A-S1-Q1": { "choice": 2, "time": 1730000000000 },
    "A-S2-Q1": { "revealed": true, "hidden": false, "time": 1730000000000 }
  },
  "flags": { "B-S3-Q2": 1730000000000 }
}
```

`choice` 是单选题所选下标；`revealed` 表示主观题已核对；`hidden` 只控制当前是否收起答案，不影响「已完成」统计。导入时按 `time` 取更新的一条合并，格式不符的文件会被拒绝。

## 说明

- 题目与解答依据本人课程的两份 LaTeX 模拟卷；英文题面保持原样，中文题目 / 解析为对照学习重新整理，公式与数值以原卷为准。原始 `.tex` / `.pdf` 不随网页发布。
- 页面结构、配色与交互骨架参考 [Evan2you/slai-NNtraining-midterm](https://github.com/Evan2you/slai-NNtraining-midterm)；公式排版使用 [KaTeX](https://katex.org/)（MIT 许可），资源已随站点本地打包。
- 本站不收集任何数据，不上传任何文件，全部逻辑在浏览器本地运行。
