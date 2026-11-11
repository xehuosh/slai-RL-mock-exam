window.EXAM = {
 "meta": {
  "title_en": "Reinforcement Learning — Midterm Practice Examination",
  "title_zh": "强化学习 · 期中模拟卷",
  "exam_note_en": "Closed book · 2 hours · 100 points · two double-sided note sheets and a basic calculator allowed",
  "exam_note_zh": "闭卷 · 2 小时 · 100 分 · 可带两张双面笔记纸与普通函数计算器",
  "sets": [
   {
    "id": "A",
    "en": "Set A",
    "zh": "A 卷"
   },
   {
    "id": "B",
    "en": "Set B",
    "zh": "B 卷"
   }
  ],
  "sections": [
   {
    "id": 1,
    "en": "Single-choice",
    "zh": "单选题",
    "points": 20,
    "count": 10
   },
   {
    "id": 2,
    "en": "Short answer",
    "zh": "简答题",
    "points": 25,
    "count": 5
   },
   {
    "id": 3,
    "en": "Calculation · MDP",
    "zh": "计算题 · MDP",
    "points": 25,
    "count": 3
   },
   {
    "id": 4,
    "en": "Calculation · Learning",
    "zh": "计算题 · 学习算法",
    "points": 20,
    "count": 2
   },
   {
    "id": 5,
    "en": "Calculation · Optimal policy",
    "zh": "计算题 · 最优策略",
    "points": 10,
    "count": 1
   }
  ]
 },
 "questions": [
  {
   "id": "A-S1-Q1",
   "set": "A",
   "section": 1,
   "type": "single",
   "points": 2,
   "answer": 2,
   "en": {
    "stem": "Which statement about states and the Markov property is <b>correct</b>?",
    "options": [
     "In a POMDP the agent state is identical to the environment state, $S^a_t=S^e_t$.",
     "The full history $H_t$ is the most compact Markov state one can use in practice.",
     "In an MDP the agent observes the environment state directly, so $O_t=S^a_t=S^e_t$.",
     "An information state must retain every detail of the history $H_t$."
    ]
   },
   "zh": {
    "stem": "关于状态与马尔可夫性，下列说法哪一项<b>正确</b>？",
    "options": [
     "在 POMDP 中智能体状态与环境状态完全相同，$S^a_t=S^e_t$。",
     "完整历史 $H_t$ 是实际使用中<b>最紧凑</b>的马尔可夫状态。",
     "在 MDP 中智能体直接观测环境状态，因此 $O_t=S^a_t=S^e_t$。",
     "信息状态必须保留历史 $H_t$ 的每一个细节。"
    ],
    "solution": "<p><b>正确答案 C。</b>在完全可观测的 MDP 里，智能体拿到的观测就是环境状态，于是 $O_t=S^a_t=S^e_t$：智能体状态与环境状态一致，且它本身满足马尔可夫性。</p><p><b>逐项辨析：</b>A 错，POMDP 中智能体只能看到观测 $O_t$（可能只是环境状态的一部分或有噪声），$S^a_t\\ne S^e_t$，这正是\"部分可观测\"的含义。B 错，$H_t=(O_1,A_1,R_1,\\dots,O_t)$ 固然满足马尔可夫性（历史当然包含全部信息），但维度随时间增长，是<b>最不紧凑</b>的状态表示，实际不可用。D 错，信息状态（information state）只需保留历史中<b>对预测未来有用</b>的信息，例如 POMDP 里的信念状态 $b(s)=P(S_t=s\\mid H_t)$，不必保留全部细节。</p><p><b>判定方法：</b>问自己\"给定这个量，未来 $S_{t+1},R_{t+1}$ 的分布是否只依赖它与当前动作\"。是则为马尔可夫状态；再问\"是否还丢得掉信息而不破坏上一条\"，越紧凑越好。</p>"
   },
   "key": "MDP 中 $O_t=S^a_t=S^e_t$；信息状态只需保留对未来有用的信息，历史 $H_t$ 最不紧凑。"
  },
  {
   "id": "A-S1-Q2",
   "set": "A",
   "section": 1,
   "type": "single",
   "points": 2,
   "answer": 3,
   "en": {
    "stem": "Let $G_t=R_{t+1}+\\gamma R_{t+2}+\\gamma^2 R_{t+3}+\\cdots$ be the return. Which statement is <b>false</b>?",
    "options": [
     "$\\gamma$ close to $0$ gives a myopic evaluation, $\\gamma$ close to $1$ a far-sighted one.",
     "One may take $\\gamma=1$ when every episode is guaranteed to terminate.",
     "$G_t$ is an unbiased estimate of $v_\\pi(S_t)$.",
     "A discount factor is required in order to define the return in every episodic MDP."
    ]
   },
   "zh": {
    "stem": "设回报 $G_t=R_{t+1}+\\gamma R_{t+2}+\\gamma^2 R_{t+3}+\\cdots$。下列说法哪一项<b>错误</b>？",
    "options": [
     "$\\gamma$ 接近 0 时评价偏短视，接近 1 时评价更看重长远。",
     "若每一幕都保证终止，可以取 $\\gamma=1$。",
     "$G_t$ 是 $v_\\pi(S_t)$ 的无偏估计。",
     "在<b>任何</b>分幕式 MDP 中，都必须有折扣因子才能定义回报。"
    ],
    "solution": "<p><b>错误选项 D（也就是本题要选的答案）。</b>回报的定义是有限或无限求和 $G_t=\\sum_{k=0}^{\\infty}\\gamma^k R_{t+k+1}$。对分幕任务，只要保证每幕在有限步内终止（且奖励有界），$\\gamma=1$ 时这个和是有限项，回报完全有意义，此时 $G_t$ 就是\"从现在到幕结束的总奖励\"。折扣因子是为了处理<b>持续性任务</b>的无穷求和收敛问题，以及表达\"眼前奖励更值钱\"，并非分幕任务的必要条件。</p><p><b>其余选项都正确：</b>A 描述的是 $\\gamma$ 的语义；B 即上面说的分幕情形；C 由价值函数定义直接得到 $E_\\pi[G_t\\mid S_t=s]=v_\\pi(s)$，所以 $G_t$ 是 $v_\\pi(S_t)$ 的无偏样本——这正是 MC 方法无偏性的来源。</p><p><b>易错点：</b>题目问的是 FALSE，别把\"$\\gamma=1$ 一定发散\"当成常识；持续性任务才必须 $\\gamma<1$。</p>"
   },
   "key": "分幕且保证终止时 $\\gamma=1$ 合法；只有持续性任务才必须 $\\gamma<1$；$E_\\pi[G_t\\mid S_t]=v_\\pi(S_t)$。"
  },
  {
   "id": "A-S1-Q3",
   "set": "A",
   "section": 1,
   "type": "single",
   "points": 2,
   "answer": 0,
   "en": {
    "stem": "The Bellman <b>optimality</b> equation for $v_*$ is",
    "options": [
     "$v_*(s)=\\max_a\\sum_{s',r}p(s',r\\,|\\,s,a)\\big[r+\\gamma v_*(s')\\big]$",
     "$v_*(s)=\\max_a\\sum_{s',r}p(s',r\\,|\\,s,a)\\big[r+\\gamma q_*(s',a)\\big]$",
     "$v_*(s)=\\sum_a\\pi(a\\,|\\,s)\\max_{s'}p(s'\\,|\\,s,a)\\,v_*(s')$",
     "$v_*(s)=\\max_a\\sum_{s'}p(s'\\,|\\,s,a)\\,v_*(s')$"
    ]
   },
   "zh": {
    "stem": "$v_*$ 的贝尔曼<b>最优</b>方程是",
    "options": [
     "$v_*(s)=\\max_a\\sum_{s',r}p(s',r\\,|\\,s,a)\\big[r+\\gamma v_*(s')\\big]$",
     "$v_*(s)=\\max_a\\sum_{s',r}p(s',r\\,|\\,s,a)\\big[r+\\gamma q_*(s',a)\\big]$",
     "$v_*(s)=\\sum_a\\pi(a\\,|\\,s)\\max_{s'}p(s'\\,|\\,s,a)\\,v_*(s')$",
     "$v_*(s)=\\max_a\\sum_{s'}p(s'\\,|\\,s,a)\\,v_*(s')$"
    ],
    "solution": "<p><b>正确答案 A。</b>最优状态价值等于\"选一个动作使期望（即时奖励 + 折扣后的后继最优价值）最大\"：</p><p>$$v_*(s)=\\max_a\\;E\\big[R_{t+1}+\\gamma v_*(S_{t+1})\\mid S_t=s,A_t=a\\big]=\\max_a\\sum_{s',r}p(s',r\\mid s,a)\\big[r+\\gamma v_*(s')\\big].$$</p><p><b>逐项辨析：</b>B 把 $v_*(s')$ 换成了 $q_*(s',a)$，但求和里没有对 $a$ 的定义（$q$ 需要\"状态-动作\"对，此处对的却是后继状态与当前动作），量纲与含义都不对；若要用 $q$，应写 $v_*(s)=\\max_a q_*(s,a)$。C 是对策略 $\\pi$ 求期望、又对 $s'$ 取 $\\max$，既不对应最优算子也没有奖励项，是把贝尔曼期望方程和最优算子拼错了。D 完全漏掉即时奖励 $r$，只剩后继价值的折扣和，只有在所有奖励恒为 0 时才成立。</p><p><b>记忆点：</b>最优方程 = 「$\\max_a$ + 对 $(s',r)$ 的完整期望 + 奖励 $r$ + $\\gamma v_*(s')$」；期望方程 = 「$\\sum_a\\pi(a\\mid s)$」，二者别混。</p>"
   },
   "key": "最优方程含 $\\max_a$ 与奖励项；期望方程含 $\\sum_a\\pi(a\\mid s)$；两者都由 $p(s',r\\mid s,a)$ 加权。"
  },
  {
   "id": "A-S1-Q4",
   "set": "A",
   "section": 1,
   "type": "single",
   "points": 2,
   "answer": 1,
   "en": {
    "stem": "Which statement about dynamic programming is <b>correct</b>?",
    "options": [
     "Value iteration runs policy evaluation to convergence before every policy improvement step.",
     "Policy iteration alternates policy evaluation and policy improvement, and both need the dynamics $p(s',r\\,|\\,s,a)$.",
     "Iterative policy evaluation is guaranteed to converge only when $\\gamma=1$.",
     "Asynchronous DP updates all states simultaneously in every sweep."
    ]
   },
   "zh": {
    "stem": "关于动态规划（DP），下列说法哪一项<b>正确</b>？",
    "options": [
     "值迭代在每次策略改进之前都要把策略评估跑到收敛。",
     "策略迭代在策略评估与策略改进之间交替，二者都需要模型 $p(s',r\\,|\\,s,a)$。",
     "迭代策略评估只有当 $\\gamma=1$ 时才保证收敛。",
     "异步 DP 在每一轮扫描中同时更新所有状态。"
    ],
    "solution": "<p><b>正确答案 B。</b>策略迭代 = 完整的策略评估（解 $v_\\pi$ 的线性方程组，或迭代到收敛）→ 一次贪心策略改进 → 再评估……；两步都要用环境模型 $p(s',r\\mid s,a)$ 求期望，所以 DP 属于<b>基于模型</b>的方法。</p><p><b>逐项辨析：</b>A 描述的是策略迭代，值迭代恰恰把策略评估<b>截断为一次</b>贝尔曼最优备份 $v_{k+1}(s)=\\max_a\\sum_{s',r}p(s',r\\mid s,a)[r+\\gamma v_k(s')]$，没有显式策略。C 反了：迭代策略评估的备份是 $\\gamma$-压缩映射，$\\gamma<1$ 时保证几何收敛；$\\gamma=1$ 只在策略适当（保证终止）时才收敛。D 反了：同步 DP 才用两份副本同时更新全部状态；异步 DP 按任意顺序<b>原地</b>更新，只要每个状态被更新无穷多次仍收敛到同一不动点。</p><p><b>易错点：</b>\"需要模型\"是 DP 与 MC/TD 的分界线；DP 用期望备份（full backup），无模型方法用采样备份（sample backup）。</p>"
   },
   "key": "DP 需要模型；策略迭代评估到收敛，值迭代截断为一次最优备份；$\\gamma<1$ 时压缩映射保证收敛；异步 DP 原地更新。"
  },
  {
   "id": "A-S1-Q5",
   "set": "A",
   "section": 1,
   "type": "single",
   "points": 2,
   "answer": 0,
   "en": {
    "stem": "Which statement about Monte-Carlo (MC) and TD(0) prediction is <b>correct</b>?",
    "options": [
     "TD(0) bootstraps, MC does not.",
     "MC has lower variance than TD(0).",
     "The TD target $R_{t+1}+\\gamma V(S_{t+1})$ is an unbiased estimate of $v_\\pi(S_t)$.",
     "MC can be applied directly to continuing (non-terminating) tasks."
    ]
   },
   "zh": {
    "stem": "关于蒙特卡洛（MC）与 TD(0) 预测，下列说法哪一项<b>正确</b>？",
    "options": [
     "TD(0) 使用自举（bootstrapping），MC 不使用。",
     "MC 的方差比 TD(0) 更小。",
     "TD 目标 $R_{t+1}+\\gamma V(S_{t+1})$ 是 $v_\\pi(S_t)$ 的无偏估计。",
     "MC 可以直接用于持续性（不终止）任务。"
    ],
    "solution": "<p><b>正确答案 A。</b>自举指\"用当前估计值去构造目标\"。TD(0) 的目标 $R_{t+1}+\\gamma V(S_{t+1})$ 里含当前估计 $V(S_{t+1})$，所以自举；MC 的目标 $G_t$ 是真实采样回报，不含任何待估计量，所以不自举。</p><p><b>逐项辨析：</b>B 反了，$G_t$ 依赖一整幕中大量随机动作、转移与奖励，方差大；TD 只依赖一步随机性，方差小。C 错在目标里是 $V$ 而非真实的 $v_\\pi$，因此 TD 目标是<b>有偏</b>的（这正是用低方差换来的代价）；只有当 $V=v_\\pi$ 时才无偏。D 错，MC 必须等到幕结束才能算出 $G_t$，无法直接用于无终止的持续性任务（TD 可以逐步在线更新）。</p><p><b>对照表：</b>MC = 无偏 / 高方差 / 需完整幕 / 不自举；TD(0) = 有偏 / 低方差 / 可在线、可持续任务 / 自举；DP = 无偏（用真值期望）/ 零方差（不采样）/ 需模型。</p>"
   },
   "key": "bootstrapping=目标含当前估计；MC 无偏高方差需完整幕，TD 有偏低方差可在线。"
  },
  {
   "id": "A-S1-Q6",
   "set": "A",
   "section": 1,
   "type": "single",
   "points": 2,
   "answer": 3,
   "en": {
    "stem": "Which statement about TD(λ) is <b>correct</b>?",
    "options": [
     "With λ=1 the online updates of TD(λ) are exactly identical to MC updates at every step.",
     "Eligibility traces are defined for states only and never for state--action pairs.",
     "The eligibility trace is updated as $E_t(s)=\\lambda E_{t-1}(s)+\\mathbf{1}(S_t=s)$.",
     "With λ=0 the backward view reduces to TD(0); with λ=1 its offline total update equals that of MC."
    ]
   },
   "zh": {
    "stem": "关于 TD(λ)，下列说法哪一项<b>正确</b>？",
    "options": [
     "当 λ=1 时，TD(λ) 的<b>在线</b>更新在每一步都与 MC 更新完全相同。",
     "资格迹只定义在状态上，绝不定义在状态-动作对上。",
     "资格迹的更新式为 $E_t(s)=\\lambda E_{t-1}(s)+\\mathbf{1}(S_t=s)$。",
     "λ=0 时后向视图退化为 TD(0)；λ=1 时其<b>离线</b>总更新等于 MC 的更新。"
    ],
    "solution": "<p><b>正确答案 D。</b>λ 是 TD 与 MC 之间的旋钮：前向视图的 λ-回报 $G_t^\\lambda=(1-\\lambda)\\sum_{n=1}^{\\infty}\\lambda^{n-1}G_t^{(n)}$，λ=0 时只剩 $G_t^{(1)}$（一步 TD 目标），λ=1 时（有限幕、权重和为 1）等于完整回报 $G_t$。后向视图在<b>离线累计总更新</b>的意义下与前向视图等价，因此 λ=1 离线等价于 MC。</p><p><b>逐项辨析：</b>A 错在\"在线、每一步\"：TD(1) 的在线更新只是近似 MC，严格相等需要精确的在线 TD(λ) 算法；而且在线更新在幕结束前就能发生，MC 必须等幕结束。B 错，Sarsa(λ) 用的就是状态-动作迹 $E_t(s,a)$。C 错在衰减因子：累积迹应为 $E_t(s)=\\gamma\\lambda E_{t-1}(s)+\\mathbf{1}(S_t=s)$（替换迹形式不同，但同样含 $\\gamma\\lambda$），漏掉 $\\gamma$ 会把折扣算错。</p><p><b>易错点：</b>\"λ=1 等于 MC\"这个结论必须带上<b>离线 / 总更新</b>的限定条件；考场上看到\"每一步都相同\"要立刻警觉。</p>"
   },
   "key": "λ=0 → TD(0)，λ=1 离线总更新 → MC；迹衰减含 $\\gamma\\lambda$；Sarsa(λ) 有状态-动作迹。"
  },
  {
   "id": "A-S1-Q7",
   "set": "A",
   "section": 1,
   "type": "single",
   "points": 2,
   "answer": 1,
   "en": {
    "stem": "Which statement about model-free control is <b>correct</b>?",
    "options": [
     "SARSA is an off-policy algorithm.",
     "Q-learning uses the target $R_{t+1}+\\gamma\\max_a Q(S_{t+1},a)$ and is therefore off-policy.",
     "Q-learning needs importance sampling to correct for the behaviour policy.",
     "$\\varepsilon$-greedy with a fixed $\\varepsilon=0.1$ satisfies the GLIE condition."
    ]
   },
   "zh": {
    "stem": "关于无模型控制，下列说法哪一项<b>正确</b>？",
    "options": [
     "SARSA 是离策略（off-policy）算法。",
     "Q-learning 的目标为 $R_{t+1}+\\gamma\\max_a Q(S_{t+1},a)$，因此是离策略算法。",
     "Q-learning 需要重要性采样来修正行为策略带来的偏差。",
     "固定 $\\varepsilon=0.1$ 的 $\\varepsilon$-贪心策略满足 GLIE 条件。"
    ],
    "solution": "<p><b>正确答案 B。</b>Q-learning 的更新 $Q(S_t,A_t)\\leftarrow Q(S_t,A_t)+\\alpha\\big[R_{t+1}+\\gamma\\max_a Q(S_{t+1},a)-Q(S_t,A_t)\\big]$ 中，目标里的 $\\max$ 对应<b>贪心目标策略</b>，而采样数据来自 $\\varepsilon$-贪心行为策略，两者不同，所以是离策略。</p><p><b>逐项辨析：</b>A 反了，SARSA 的目标用实际选出的下一动作 $A'$（由行为策略产生），是同策略。C 错，Q-learning 的目标是 $\\max$ 而不是\"某策略下的期望\"，不存在需要修正的分布失配，故无需重要性采样；离策略的 <b>MC / TD 预测</b>才需要 $\\rho=\\prod_k \\pi(A_k\\mid S_k)/\\mu(A_k\\mid S_k)$。D 错，GLIE 要求 (1) 所有 $(s,a)$ 被访问无穷多次，(2) 策略在极限下收敛到贪心策略；固定 $\\varepsilon>0$ 永远以 $\\varepsilon$ 的概率随机动作，只能收敛到\"最好的 $\\varepsilon$-贪心策略\"，不是最优策略。</p><p><b>收敛结果：</b>在 Robbins–Monro 步长与 GLIE 探索下，Q-learning 收敛到 $q_*$；SARSA 收敛到行为策略（$\\varepsilon$-贪心）自身的 $q$。</p>"
   },
   "key": "目标含 $\\max$ → 离策略且无需重要性采样；SARSA 用 $A'$ → 同策略；固定 ε 不满足 GLIE。"
  },
  {
   "id": "A-S1-Q8",
   "set": "A",
   "section": 1,
   "type": "single",
   "points": 2,
   "answer": 2,
   "en": {
    "stem": "Which statement about DQN is <b>correct</b>?",
    "options": [
     "The target network is updated at every gradient step, which stabilises training.",
     "In DQN the TD target is computed with the same network that is currently being updated.",
     "Experience replay breaks the correlation of consecutive samples and allows past experience to be reused.",
     "DQN uses Monte-Carlo returns because they have lower variance than TD targets."
    ]
   },
   "zh": {
    "stem": "关于 DQN，下列说法哪一项<b>正确</b>？",
    "options": [
     "目标网络在每次梯度更新时都更新一次，以此稳定训练。",
     "DQN 的 TD 目标由当前正在被更新的同一个网络计算。",
     "经验回放打破了相邻样本之间的相关性，并允许重复利用过去的经验。",
     "DQN 使用蒙特卡洛回报，因为其方差比 TD 目标更低。"
    ],
    "solution": "<p><b>正确答案 C。</b>经验回放把转移 $(S_t,A_t,R_{t+1},S_{t+1})$ 存入缓冲区并随机小批量采样：① 连续帧/连续转移高度相关，随机采样使 SGD 看到近似 i.i.d. 的数据；② 每条转移被重复利用多次，数据效率大幅提高；③ 平滑了近期经验分布，减轻策略变化引起的振荡与灾难性遗忘。</p><p><b>逐项辨析：</b>A 错，目标网络参数 $\\theta^-$ 每 $C$ 步才从在线网络复制一次，正是\"冻结\"才稳定。B 错，TD 目标 $y=r+\\gamma\\max_{a'}\\hat Q(s',a';\\theta^-)$ 用的是<b>目标网络</b>；若用正在更新的网络，目标会随参数一起移动（moving target），形成正反馈振荡。D 反了，DQN 用的是一步 TD 目标（自举），且 MC 回报方差更高、还需完整幕。</p><p><b>配套记忆：</b>DQN 两大稳定化手段 = 经验回放 + 独立目标网络；此外奖励裁剪到 $[-1,1]$、帧堆叠解决部分可观测。</p>"
   },
   "key": "经验回放 = 去相关 + 复用数据；目标网络每 C 步复制，用于计算 TD 目标；DQN 用 TD 目标而非 MC 回报。"
  },
  {
   "id": "A-S1-Q9",
   "set": "A",
   "section": 1,
   "type": "single",
   "points": 2,
   "answer": 0,
   "en": {
    "stem": "Which statement about extensions of DQN is <b>correct</b>?",
    "options": [
     "Double DQN reduces overestimation by decoupling action selection (online network) from action evaluation (target network).",
     "The dueling architecture computes $Q=V+A$ without needing any identifiability constraint.",
     "Prioritised experience replay samples transitions uniformly and then corrects with importance-sampling weights.",
     "Rainbow replaces the target network by $n$-step returns and nothing else."
    ]
   },
   "zh": {
    "stem": "关于 DQN 的改进，下列说法哪一项<b>正确</b>？",
    "options": [
     "Double DQN 通过把动作选择（在线网络）与动作评估（目标网络）解耦来减轻过高估计。",
     "Dueling 架构直接计算 $Q=V+A$，不需要任何可辨识性约束。",
     "优先经验回放先均匀采样转移，再用重要性采样权重修正。",
     "Rainbow 只是用 $n$ 步回报替换了目标网络，没有别的改动。"
    ],
    "solution": "<p><b>正确答案 A。</b>标准 DQN 的目标 $y=r+\\gamma\\max_{a'}\\hat Q(s',a')$ 对<b>同一组带噪声的估计</b>既取最大又取该最大值，\"让某动作看起来最好\"的噪声同时抬高了它的估计，产生系统性向上偏差 $E[\\max_a\\hat Q]\\ge\\max_a E[\\hat Q]$。Double DQN 写为</p><p>$$y^{DDQN}=r+\\gamma\\,\\hat Q\\big(s',\\ \\arg\\max_a Q(s',a;\\theta);\\ \\theta^-\\big),$$</p><p>即在线网络 $\\theta$ 负责<b>选</b>动作，目标网络 $\\theta^-$ 负责<b>评估</b>该动作，从而解耦两个噪声源。</p><p><b>逐项辨析：</b>B 错，$Q=V+A$ 存在不可辨识性（$V+c$ 与 $A-c$ 给出同一个 $Q$），必须加约束，如减去 $\\max_{a'}A(s,a')$ 或减去均值 $\\frac{1}{|\\mathcal A|}\\sum_{a'}A(s,a')$。C 错，PER 按优先级 $p_i=|\\delta_i|^{\\alpha}$ <b>非均匀</b>采样，重要性权重 $w_i=(1/(N P(i)))^{\\beta}$ 是修正这种非均匀性，不是修正均匀采样。D 错，Rainbow 组合了 Double DQN、PER、Dueling、多步回报、分布式 RL（C51）、Noisy Nets 六项，且并未取消目标网络。</p>"
   },
   "key": "Double DQN 解耦选择/评估；Dueling 必须减 max 或均值；PER 非均匀采样 + IS 权重；Rainbow = 六项组合。"
  },
  {
   "id": "A-S1-Q10",
   "set": "A",
   "section": 1,
   "type": "single",
   "points": 2,
   "answer": 1,
   "en": {
    "stem": "Which statement about planning and learning is <b>correct</b>?",
    "options": [
     "Model-based reinforcement learning has only one source of approximation error.",
     "Dyna-Q interleaves learning from real experience with planning steps that use simulated experience from a learned model.",
     "Monte-Carlo tree search builds a search tree but never improves its simulation policy.",
     "Sample-based planning can only be combined with dynamic programming, never with model-free algorithms."
    ]
   },
   "zh": {
    "stem": "关于规划与学习，下列说法哪一项<b>正确</b>？",
    "options": [
     "基于模型的强化学习只有一种近似误差来源。",
     "Dyna-Q 把来自真实经验的学习与来自所学模型的模拟经验的规划步骤交替进行。",
     "蒙特卡洛树搜索会构建搜索树，但从不改进其模拟（rollout）策略。",
     "基于样本的规划只能与动态规划结合，不能与无模型算法结合。"
    ],
    "solution": "<p><b>正确答案 B。</b>Dyna-Q 的三步循环：① 用真实转移做一次直接 RL 更新（如 Q-learning）；② 用同一转移更新所学模型 $\\hat R(s,a)$、$\\hat P(s'\\mid s,a)$；③ 重复 $n$ 次规划：随机取见过的 $(s,a)$，由模型采样出 $s',r$，再对这条<b>模拟</b>转移做同样的 Q-learning 更新。真实经验与规划因此交织进行。</p><p><b>逐项辨析：</b>A 错，基于模型有<b>两个</b>误差源：先从数据近似模型（模型误差），再在近似模型上近似价值函数（价值误差）；直接 RL 只有后者，但后者是在真实 MDP 上衡量的。C 错，MCTS 的树策略（如 UCT/UCB1）随访问统计不断改进，模拟阶段的默认策略也可以被改进；\"从不改进\"与 MCTS 的核心思想相反。D 反了，基于样本的规划恰恰就是\"把无模型 RL 算法用到模型生成的模拟经验上\"，Dyna 正是这种结合。</p><p><b>延伸：</b>Dyna-Q+ 增加探索奖励 $\\kappa\\sqrt{\\tau(s,a)}$（$\\tau$ 为该 $(s,a)$ 距上次被尝试的步数），用于发现环境变化。</p>"
   },
   "key": "Dyna-Q = 直接 RL + 模型学习 + n 次规划；基于模型有模型误差与价值误差两处近似；MCTS 会改进树策略。"
  },
  {
   "id": "A-S2-Q1",
   "set": "A",
   "section": 2,
   "type": "short",
   "points": 5,
   "en": {
    "stem": "<b>Exploration versus exploitation.</b>",
    "sub": [
     "(i) Define exploration and exploitation and give one concrete example of each.",
     "(ii) Write down the action probabilities of the ε-greedy policy over $|\\mathcal{A}|$ actions (distinguish the greedy action from the others).",
     "(iii) State the GLIE condition. Give one example of a schedule $\\varepsilon_k$ that satisfies it.",
     "(iv) Explain in one or two sentences why a <i>constant</i> $\\varepsilon>0$ prevents convergence to the optimal policy, while a GLIE schedule does not."
    ]
   },
   "zh": {
    "stem": "<b>探索与利用。</b>",
    "sub": [
     "（i）分别定义\"探索\"与\"利用\"，并各举一个具体例子。",
     "（ii）写出 $|\\mathcal{A}|$ 个动作下 $\\varepsilon$-贪心策略的动作概率（区分贪心动作与其他动作）。",
     "（iii）叙述 GLIE 条件，并给出一个满足该条件的 $\\varepsilon_k$ 调度例子。",
     "（iv）用一两句话说明：为什么<b>固定</b> $\\varepsilon>0$ 无法收敛到最优策略，而满足 GLIE 的调度可以。"
    ],
    "solution": "<p><b>（i）定义与例子。</b>利用（exploitation）：选择当前估计下最好的动作 $a^*=\\arg\\max_a Q(s,a)$，以最大化当前期望奖励；例如去那家已经确认好吃的餐厅。探索（exploration）：故意选择非贪心动作，以获取\"它到底有多好\"的信息；例如试一家没吃过的新餐厅，或在迷宫里推开一扇没开过的门。二者的矛盾在于：短期看利用更划算，但若不探索就可能永远不知道存在更好的动作。</p><p><b>（ii）$\\varepsilon$-贪心概率。</b>设 $a^*=\\arg\\max_a Q(s,a)$，共 $|\\mathcal A|$ 个动作：</p><p>$$\\pi(a^*\\mid s)=1-\\varepsilon+\\frac{\\varepsilon}{|\\mathcal A|},\\qquad \\pi(a\\mid s)=\\frac{\\varepsilon}{|\\mathcal A|}\\quad (a\\ne a^*).$$</p><p>等价说法：以 $1-\\varepsilon$ 的概率取贪心动作，以 $\\varepsilon$ 的概率在所有动作中均匀随机（随机时也可能抽到 $a^*$，所以要加上 $\\varepsilon/|\\mathcal A|$）。</p><p><b>（iii）GLIE</b> = Greedy in the Limit with Infinite Exploration（无限探索下极限贪心），含两条：① 每个状态-动作对被访问无穷多次，$\\lim_{k\\to\\infty}N_k(s,a)=\\infty$，对所有 $(s,a)$；② 策略在极限下变为贪心，$\\lim_{k\\to\\infty}\\pi_k(a\\mid s)=\\mathbf{1}\\!\\left(a=\\arg\\max_{a'}q(s,a')\\right)$。典型调度 $\\varepsilon_k=1/k$；一般地取任何 $\\varepsilon_k\\to 0$ 且 $\\sum_k\\varepsilon_k=\\infty$ 即可（前者保证极限贪心，后者保证无限探索）。</p><p><b>（iv）为什么固定 $\\varepsilon$ 不行。</b>固定 $\\varepsilon>0$ 时策略永远以 $\\varepsilon$ 的概率随机动作，极限策略不是贪心策略，因此至多收敛到\"最好的 $\\varepsilon$-贪心策略\"（仍会偶尔走进悬崖），不是 $\\pi_*$。GLIE 调度则让探索一直进行（于是所有 $Q$ 值最终都被正确估计），同时 $\\varepsilon_k\\to0$ 使策略在极限变贪心，故 $Q\\to q^*$、策略收敛到最优。</p>"
   },
   "key": "$\\varepsilon$-贪心：贪心动作 $1-\\varepsilon+\\varepsilon/|\\mathcal A|$，其余 $\\varepsilon/|\\mathcal A|$；GLIE = 无限探索 + 极限贪心，$\\varepsilon_k=1/k$。"
  },
  {
   "id": "A-S2-Q2",
   "set": "A",
   "section": 2,
   "type": "short",
   "points": 5,
   "en": {
    "stem": "<b>Monte-Carlo versus TD(0) prediction.</b>",
    "sub": [
     "(i) Write the MC and the TD(0) update rules for $V(S_t)$.",
     "(ii) Which of them bootstraps? Which of them samples? Which requires complete episodes?",
     "(iii) Compare their bias and variance, and explain where the difference comes from.",
     "(iv) In the two-state AB example (8 episodes: $A,0,B,0$ and six times $B,1$, plus $B,0$), batch MC gives $V(A)=0$ while batch TD(0) gives $V(A)=0.75$. Explain what each solution is optimising."
    ]
   },
   "zh": {
    "stem": "<b>蒙特卡洛与 TD(0) 预测。</b>",
    "sub": [
     "（i）写出 $V(S_t)$ 的 MC 更新式与 TD(0) 更新式。",
     "（ii）哪一个使用自举？哪一个使用采样？哪一个需要完整的一幕？",
     "（iii）比较二者的偏差与方差，并说明差异从何而来。",
     "（iv）两状态 AB 例子（8 幕：$A,0,B,0$ 一次、$B,1$ 六次、$B,0$ 一次）中，批量 MC 给出 $V(A)=0$，批量 TD(0) 给出 $V(A)=0.75$。说明二者分别在优化什么。"
    ],
    "solution": "<p><b>（i）更新式。</b></p><p>$$\\text{MC:}\\quad V(S_t)\\leftarrow V(S_t)+\\alpha\\big(G_t-V(S_t)\\big),$$</p><p>$$\\text{TD(0):}\\quad V(S_t)\\leftarrow V(S_t)+\\alpha\\big(R_{t+1}+\\gamma V(S_{t+1})-V(S_t)\\big).$$</p><p><b>（ii）自举 / 采样 / 完整幕。</b>TD 目标含当前估计 $V(S_{t+1})$，故<b>自举</b>；MC 用真实采样回报 $G_t$，<b>不自举</b>。二者都<b>采样</b>（与 DP 的全期望备份相对）。只有 MC 需要完整的一幕（要等 $G_t$ 算出来），TD 只需一步转移，可在线用于持续性任务。</p><p><b>（iii）偏差与方差。</b>MC：<b>零偏差</b>（$E_\\pi[G_t\\mid S_t]=v_\\pi(S_t)$）但<b>高方差</b>，因为 $G_t$ 依赖一整幕里的大量随机动作、转移与奖励。TD：<b>低方差</b>（只含一步随机性）但<b>有偏</b>，因为目标用 $V$ 代替了未知的 $v_\\pi$；这个偏差会随 $V\\to v_\\pi$ 逐渐消失。本质上是\"用有偏的估计量换低方差\"的经典权衡。</p><p><b>（iv）批量情形优化目标不同。</b>批量 MC 最小化对观测回报的均方误差 $\\min\\sum_{k,t}(G_t^k-V(s_t^k))^2$，即对样本回报做最佳拟合；AB 例子中 $A$ 只被访问一次且该次回报为 0，故 $V(A)=0$。批量 TD(0) 得到的是<b>确定性等价</b>（certainty-equivalence）解：先用数据拟合出最大似然马尔可夫模型，再<b>解这个模型对应的 MDP</b>。数据中 $A\\to B$ 恒成立，而 $B$ 在 8 幕里有 6 次得到 1，故 $V(B)=6/8=0.75$，进而 $V(A)=0.75$。也就是说 TD 利用了马尔可夫结构，MC 只拟合观测到的回报。</p>"
   },
   "key": "MC 无偏高方差、拟合观测回报；TD 有偏低方差、自举；批量 TD = 最大似然模型 + 解该 MDP（确定性等价）。"
  },
  {
   "id": "A-S2-Q3",
   "set": "A",
   "section": 2,
   "type": "short",
   "points": 5,
   "en": {
    "stem": "<b>On-policy versus off-policy learning.</b>",
    "sub": [
     "(i) Define behaviour policy and target policy, and say what on-policy and off-policy mean.",
     "(ii) Give the SARSA update and the Q-learning update for $Q(S_t,A_t)$.",
     "(iii) Why does Q-learning need no importance sampling, whereas off-policy MC/TD <i>prediction</i> does? Write the importance-sampling ratio for an $n$-step trajectory.",
     "(iv) What is the main drawback of importance sampling?"
    ]
   },
   "zh": {
    "stem": "<b>同策略与离策略学习。</b>",
    "sub": [
     "（i）定义行为策略与目标策略，并说明同策略、离策略的含义。",
     "（ii）写出 $Q(S_t,A_t)$ 的 SARSA 更新式与 Q-learning 更新式。",
     "（iii）为什么 Q-learning 不需要重要性采样，而离策略的 MC/TD <b>预测</b>需要？写出 $n$ 步轨迹的重要性采样比。",
     "(iv) 重要性采样的主要缺点是什么？"
    ],
    "solution": "<p><b>（i）定义。</b>行为策略 $\\mu$（或 $b$）是<b>生成数据</b>的策略；目标策略 $\\pi$ 是<b>我们想学习/评估</b>的策略。若 $\\pi=\\mu$，即\"边用某策略采样边评估它自己\"，称为同策略（on-policy）；若 $\\pi\\ne\\mu$，\"用一套数据学另一套策略\"，称为离策略（off-policy）。典型例子：行为策略取 $\\varepsilon$-贪心以保证探索，目标策略取贪心策略。</p><p><b>（ii）更新式。</b></p><p>$$\\text{SARSA:}\\quad Q(S,A)\\leftarrow Q(S,A)+\\alpha\\big[R+\\gamma Q(S',A')-Q(S,A)\\big],$$</p><p>$$\\text{Q-learning:}\\quad Q(S,A)\\leftarrow Q(S,A)+\\alpha\\big[R+\\gamma\\max_a Q(S',a)-Q(S,A)\\big].$$</p><p>差别只在目标：SARSA 用<b>实际执行的</b>下一动作 $A'$，Q-learning 用 $\\max$（隐含贪心目标策略）。</p><p><b>（iii）为什么 Q-learning 不用 IS。</b>Q-learning 的目标是一个 $\\max$，不是\"某策略下回报的期望\"，因此不存在\"数据分布与目标分布不一致\"需要修正的问题；它直接把最优动作价值作为备份目标。而离策略<b>预测</b>中，轨迹来自 $\\mu$，我们却要估计 $v_\\pi$ 或 $q_\\pi$，必须用似然比把期望从 $\\mu$ 换测度到 $\\pi$：</p><p>$$\\rho_{t:t+n-1}=\\prod_{k=t}^{t+n-1}\\frac{\\pi(A_k\\mid S_k)}{\\mu(A_k\\mid S_k)}.$$</p><p>不做修正，采样回报估计的是 $V^\\mu$ 而不是 $V^\\pi$。</p><p><b>（iv）缺点。</b>方差极大：多个比值连乘会随 $n$ 指数级膨胀或塌缩到 0，导致估计极不稳定（加权重要性采样可缓解但引入有限样本偏差）。这也是离策略控制中更倾向使用 Q-learning 这类\"无需 IS\"的方法的原因。</p>"
   },
   "key": "行为策略生成数据、目标策略被学习；Q-learning 目标含 $\\max$ 无需 IS；离策略预测需 $\\rho=\\prod\\pi/\\mu$；IS 方差爆炸。"
  },
  {
   "id": "A-S2-Q4",
   "set": "A",
   "section": 2,
   "type": "short",
   "points": 5,
   "en": {
    "stem": "<b>Deep Q-Networks.</b>",
    "sub": [
     "(i) Why does DQN use experience replay? Give two reasons.",
     "(ii) Why does DQN use a separate, periodically updated target network?",
     "(iii) Explain the origin of the overestimation (maximisation) bias in Q-learning in one sentence.",
     "(iv) Write the Double DQN target and explain which network is used for selection and which for evaluation."
    ]
   },
   "zh": {
    "stem": "<b>深度 Q 网络（DQN）。</b>",
    "sub": [
     "（i）DQN 为什么使用经验回放？给出两条理由。",
     "（ii）DQN 为什么使用一个独立的、周期性更新的目标网络？",
     "(iii) 用一句话解释 Q-learning 中过高估计（最大化偏差）的来源。",
     "(iv) 写出 Double DQN 的目标，并说明哪个网络负责动作选择、哪个负责动作评估。"
    ],
    "solution": "<p><b>（i）经验回放的两个理由。</b>① 相邻的转移（连续帧）高度相关，直接用会让 SGD 样本严重偏离 i.i.d.，随机从缓冲区采样可打破时间相关性；② 每条转移可以被重复用于多次更新，数据效率大幅提高，同时平滑近期的经验分布、减轻策略变化带来的振荡与遗忘。（答出这两条即可。）</p><p><b>（ii）目标网络的作用。</b>若 TD 目标 $r+\\gamma\\max_{a'}\\hat Q(s',a')$ 用正在被更新的网络计算，那么每次参数更新都会同时移动目标，形成\"追着自己跑的移动靶\"（moving target）与正反馈，容易振荡甚至发散。把参数副本 $\\theta^-$ 冻结 $C$ 步，目标在这段时间内保持固定，回归问题退化成窗口内的普通监督回归，训练稳定得多。</p><p><b>（iii）过高估计的来源。</b>对<b>带噪声的估计值</b>取最大值会系统性地偏高：$E[\\max_a\\hat Q]\\ge\\max_a E[\\hat Q]=\\max_a q$ —— 让某个动作\"看起来最好\"的那部分正噪声，同时也抬高了它的价值，而自举会把这个偏差一路传播下去。</p><p><b>（iv）Double DQN 目标。</b></p><p>$$y^{DDQN}_t=r_{t+1}+\\gamma\\,\\hat Q\\Big(S_{t+1},\\ \\arg\\max_a Q(S_{t+1},a;\\theta);\\ \\theta^-\\Big).$$</p><p>在线网络 $\\theta$ <b>选择</b>使 $Q$ 最大的动作 $a^*$，目标网络 $\\theta^-$ <b>评估</b>这个 $a^*$ 的价值。两个噪声源被解耦，$\\max$ 不再\"自己抬自己\"，过高估计大幅减轻（标准形式如此，二者角色互换亦可）。</p>"
   },
   "key": "经验回放去相关+复用；目标网络冻结 C 步避免移动靶；$E[\\max\\hat Q]\\ge\\max q$；Double DQN 在线选、目标评。"
  },
  {
   "id": "A-S2-Q5",
   "set": "A",
   "section": 2,
   "type": "short",
   "points": 5,
   "en": {
    "stem": "<b>Policy gradient methods.</b>",
    "sub": [
     "(i) For an episodic MDP, write the objective $J(\\theta)$.",
     "(ii) State the policy gradient theorem (write the gradient formula).",
     "(iii) Write the REINFORCE update for $\\theta$.",
     "(iv) Why is a baseline $b(s)$ subtracted from the return? Does it introduce bias? What is the advantage function, and which quantity is used in practice to estimate it?",
     "(v) A softmax policy over two actions has preferences $\\theta=(\\theta_1,\\theta_2)=(0,0)$. Compute $\\pi(a_1\\,|\\,s)$, $\\pi(a_2\\,|\\,s)$ and the score $\\nabla_\\theta\\log\\pi(a_1\\,|\\,s)$."
    ]
   },
   "zh": {
    "stem": "<b>策略梯度方法。</b>",
    "sub": [
     "（i）对分幕式 MDP，写出目标函数 $J(\\theta)$。",
     "（ii）叙述策略梯度定理（写出梯度公式）。",
     "(iii) 写出 $\\theta$ 的 REINFORCE 更新式。",
     "(iv) 为什么要从回报中减去基线 $b(s)$？会引入偏差吗？什么是优势函数？实践中用什么量来估计它？",
     "(v) 两动作 softmax 策略的偏好为 $\\theta=(\\theta_1,\\theta_2)=(0,0)$，计算 $\\pi(a_1\\,|\\,s)$、$\\pi(a_2\\,|\\,s)$ 与得分函数 $\\nabla_\\theta\\log\\pi(a_1\\,|\\,s)$。"
    ],
    "solution": "<p><b>（i）目标。</b>分幕、固定起始状态 $s_0$ 时 $J(\\theta)=E_{\\pi_\\theta}[G_t]=v_{\\pi_\\theta}(s_0)$，即\"从起始状态出发的期望回报\"。（持续性任务则写 $J(\\theta)=\\sum_s\\mu(s)\\sum_a\\pi(a\\mid s)q_\\pi(s,a)$。）</p><p><b>（ii）策略梯度定理。</b></p><p>$$\\nabla_\\theta J(\\theta)=\\sum_s\\mu(s)\\sum_a\\nabla_\\theta\\pi(a\\mid s)\\,q_\\pi(s,a)=E_\\pi\\!\\left[q_\\pi(S_t,A_t)\\,\\nabla_\\theta\\log\\pi(A_t\\mid S_t,\\theta)\\right],$$</p><p>分幕情形相差一个平均幕长常数。关键在于梯度里只有 $\\nabla_\\theta\\pi$（用对数技巧 $\\nabla\\pi=\\pi\\nabla\\log\\pi$ 转成可采样期望），<b>不含环境动力学 $p(s'\\mid s,a)$ 的梯度</b>，因此无需模型。</p><p><b>（iii）REINFORCE。</b></p><p>$$\\theta\\leftarrow\\theta+\\alpha\\,\\gamma^{t}\\,G_t\\,\\nabla_\\theta\\log\\pi(A_t\\mid S_t,\\theta).$$</p><p>用完整采样回报 $G_t$ 作为 $q_\\pi$ 的无偏样本，属于蒙特卡洛式更新（无偏但方差大）。</p><p><b>（iv）基线与优势。</b>减去只依赖状态的 $b(s)$ <b>不引入偏差</b>，因为</p><p>$$E_\\pi\\!\\left[\\nabla_\\theta\\log\\pi(A\\mid s,\\theta)\\,b(s)\\right]=b(s)\\sum_a\\nabla_\\theta\\pi(a\\mid s)=b(s)\\,\\nabla_\\theta 1=0.$$</p><p>取 $b(s)\\approx v_\\pi(s)$ 可去掉回报的\"绝对水平\"，显著降低方差。剩下的量就是优势函数 $A_\\pi(s,a)=q_\\pi(s,a)-v_\\pi(s)$。实践中 actor–critic 用 critic 近似 $v_\\pi$，并以 TD 误差</p><p>$$\\delta_t=R_{t+1}+\\gamma\\hat v(S_{t+1},w)-\\hat v(S_t,w)$$</p><p>作为 $A_\\pi(S_t,A_t)$ 的低方差（近似无偏）估计：自举带来少量偏差，换来大幅降方差。</p><p><b>（v）softmax 计算。</b>$\\theta=(0,0)$ 时两个分值相同，$\\pi(a_1\\mid s)=\\pi(a_2\\mid s)=\\tfrac12$。softmax 的得分函数为 $\\partial\\log\\pi(a\\mid s)/\\partial\\theta_i=\\mathbf{1}(a=a_i)-\\pi(a_i\\mid s)$，故</p><p>$$\\nabla_\\theta\\log\\pi(a_1\\mid s)=\\Big(1-\\tfrac12,\\ 0-\\tfrac12\\Big)=\\Big(\\tfrac12,\\ -\\tfrac12\\Big).$$</p><p>注意得分向量各分量之和为 0，这正是\"减去基线不改变期望\"的微观体现。</p>"
   },
   "key": "$\\nabla J=E[q_\\pi\\nabla\\log\\pi]$；REINFORCE 用 $G_t$；基线无偏降方差；优势 $q_\\pi-v_\\pi$ 用 TD 误差 $\\delta$ 估计。"
  },
  {
   "id": "A-S3-Q1",
   "set": "A",
   "section": 3,
   "type": "calc",
   "points": 8,
   "en": {
    "stem": "<b>Bellman expectation equation and policy improvement.</b> Consider the MDP $\\mathcal{S}=\\{1,2\\}$ with $\\mathcal{A}=\\{a_1,a_2\\}$ available in both states, $\\gamma=0.5$, and deterministic dynamics</p><p>$$(1,a_1)\\to 1,\\ r=1;\\qquad (1,a_2)\\to 2,\\ r=1;\\qquad (2,a_1)\\to 1,\\ r=2;\\qquad (2,a_2)\\to 2,\\ r=0 .$$</p><p>The policy is $\\pi(a_1\\,|\\,1)=\\pi(a_2\\,|\\,1)=\\tfrac12$, $\\pi(a_1\\,|\\,2)=1$.",
    "sub": [
     "(a) Write the Bellman expectation equations for $v_\\pi(1)$ and $v_\\pi(2)$ under $\\pi$.",
     "(b) Solve them to obtain $v_\\pi(1)$ and $v_\\pi(2)$.",
     "(c) Compute $q_\\pi(1,a_1),\\,q_\\pi(1,a_2),\\,q_\\pi(2,a_1),\\,q_\\pi(2,a_2)$.",
     "(d) Give the greedy policy $\\pi'$ with respect to $v_\\pi$.",
     "(e) Is $\\pi'$ optimal? Justify your answer in one or two lines."
    ]
   },
   "zh": {
    "stem": "<b>贝尔曼期望方程与策略改进。</b>考虑 MDP：状态 $\\mathcal{S}=\\{1,2\\}$，两个状态下均可用动作 $\\mathcal{A}=\\{a_1,a_2\\}$，$\\gamma=0.5$，确定性动力学为</p><p>$$(1,a_1)\\to 1,\\ r=1;\\qquad (1,a_2)\\to 2,\\ r=1;\\qquad (2,a_1)\\to 1,\\ r=2;\\qquad (2,a_2)\\to 2,\\ r=0 .$$</p><p>待评估策略为 $\\pi(a_1\\,|\\,1)=\\pi(a_2\\,|\\,1)=\\tfrac12$，$\\pi(a_1\\,|\\,2)=1$。",
    "sub": [
     "（a）写出策略 $\\pi$ 下 $v_\\pi(1)$ 与 $v_\\pi(2)$ 的贝尔曼期望方程。",
     "（b）解方程求出 $v_\\pi(1)$ 与 $v_\\pi(2)$。",
     "（c）计算 $q_\\pi(1,a_1),\\,q_\\pi(1,a_2),\\,q_\\pi(2,a_1),\\,q_\\pi(2,a_2)$。",
     "(d) 给出关于 $v_\\pi$ 的贪心策略 $\\pi'$。",
     "(e) $\\pi'$ 是否最优？用一两行说明理由。"
    ],
    "solution": "<p><b>（a）列方程。</b>状态 1 下 $\\pi$ 以各 $1/2$ 选 $a_1,a_2$，两个动作的即时奖励都是 1，分别转移到 1 和 2；故 $r_\\pi(1)=1$，$P_\\pi(1\\to1)=P_\\pi(1\\to2)=\\tfrac12$。状态 2 下只选 $a_1$，得 $r_\\pi(2)=2$，$P_\\pi(2\\to1)=1$。于是</p><p>$$v_\\pi(1)=1+\\gamma\\Big[\\tfrac12 v_\\pi(1)+\\tfrac12 v_\\pi(2)\\Big]=1+0.25v_\\pi(1)+0.25v_\\pi(2),$$</p><p>$$v_\\pi(2)=2+\\gamma\\,v_\\pi(1)=2+0.5v_\\pi(1).$$</p><p><b>（b）求解。</b>把第二式代入第一式：$0.75v_\\pi(1)=1+0.25\\big(2+0.5v_\\pi(1)\\big)=1.5+0.125v_\\pi(1)$，即 $0.625v_\\pi(1)=1.5$，所以 $\\boxed{v_\\pi(1)=2.4}$；回代得 $v_\\pi(2)=2+0.5(2.4)=\\boxed{3.2}$。</p><p><b>（c）动作价值。</b>用 $q_\\pi(s,a)=r(s,a)+\\gamma v_\\pi(s')$（本题确定性）：</p><p>$$q_\\pi(1,a_1)=1+0.5(2.4)=2.2,\\qquad q_\\pi(1,a_2)=1+0.5(3.2)=2.6,$$</p><p>$$q_\\pi(2,a_1)=2+0.5(2.4)=3.2,\\qquad q_\\pi(2,a_2)=0+0.5(3.2)=1.6 .$$</p><p>校验：$v_\\pi(1)=\\tfrac12(2.2)+\\tfrac12(2.6)=2.4$ ✓，$v_\\pi(2)=q_\\pi(2,a_1)=3.2$ ✓。</p><p><b>（d）贪心策略。</b>状态 1 处 $2.6>2.2$ 故 $\\pi'(1)=a_2$；状态 2 处 $3.2>1.6$ 故 $\\pi'(2)=a_1$。</p><p><b>（e）是最优的。</b>在 $\\pi'$ 下 $v(1)=1+0.5v(2)$、$v(2)=2+0.5v(1)$，解得 $v(1)=2+0.25v(1)$，故 $v_{\\pi'}=(8/3,\\,10/3)\\approx(2.67,\\,3.33)$。再检查 $\\pi'$ 没有选的两个动作：$q_{\\pi'}(1,a_1)=1+0.5\\cdot\\tfrac83=\\tfrac73<\\tfrac83=v_{\\pi'}(1)$，$q_{\\pi'}(2,a_2)=0.5\\cdot\\tfrac{10}{3}=\\tfrac53<\\tfrac{10}{3}=v_{\\pi'}(2)$，没有任何动作能改进，由策略改进定理 $\\pi'=\\pi_*$，$v_*=(8/3,\\,10/3)$。</p><p><b>答题要点：</b>先写 $r_\\pi,P_\\pi$ → 列线性方程组 → 解 $v_\\pi$ → 由 $v_\\pi$ 算四个 $q$ → 取 $\\max$ 得贪心策略 → 用\"未被选中的动作是否更差\"验证最优性。</p>"
   },
   "key": "期望方程 $v_\\pi(s)=\\sum_a\\pi(a\\mid s)\\big[r+\\gamma v_\\pi(s')\\big]$；判断最优要检查所有未选动作的 $q$。"
  },
  {
   "id": "A-S3-Q2",
   "set": "A",
   "section": 3,
   "type": "calc",
   "points": 9,
   "en": {
    "stem": "<b>Iterative policy evaluation.</b> A chain: states $1,2,3$ are non-terminal, state $4$ is terminal with $v(4)=0$. In every non-terminal state the actions are $L$ (left) and $R$ (right), taken with probability $\\tfrac12$ each; every action from a non-terminal state yields reward $-1$; $\\gamma=1$. Transitions: from $1$, $L\\to1$ (it hits a wall), $R\\to2$; from $2$, $L\\to1$, $R\\to3$; from $3$, $L\\to2$, $R\\to4$.",
    "sub": [
     "(a) Write the iterative policy evaluation update $v_{k+1}(s)$ for $s=1,2,3$.",
     "(b) Starting from $v_0(s)=0$ for all $s$, compute $v_1(1),v_1(2),v_1(3)$.",
     "(c) Compute $v_2(1),v_2(2),v_2(3)$.",
     "(d) Solve the Bellman equations exactly for $v_\\pi$, and give the greedy policy with respect to $v_\\pi$."
    ]
   },
   "zh": {
    "stem": "<b>迭代策略评估。</b>一条链：状态 $1,2,3$ 为非终止状态，状态 $4$ 为终止状态且 $v(4)=0$。每个非终止状态都有动作 $L$（左）与 $R$（右），各以 $\\tfrac12$ 的概率选取；任何非终止状态出发的动作都给出奖励 $-1$；$\\gamma=1$。转移：从 1 出发 $L\\to1$（撞墙留在原地）、$R\\to2$；从 2 出发 $L\\to1$、$R\\to3$；从 3 出发 $L\\to2$、$R\\to4$。",
    "sub": [
     "（a）写出 $s=1,2,3$ 的迭代策略评估更新式 $v_{k+1}(s)$。",
     "（b）从所有 $v_0(s)=0$ 出发，计算 $v_1(1),v_1(2),v_1(3)$。",
     "（c）计算 $v_2(1),v_2(2),v_2(3)$。",
     "(d) 精确求解贝尔曼方程得到 $v_\\pi$，并给出关于 $v_\\pi$ 的贪心策略。"
    ],
    "solution": "<p><b>（a）迭代格式。</b>$\\gamma=1$、每步奖励 $-1$、$v(4)=0$，且两个动作各 $1/2$：</p><p>$$v_{k+1}(1)=-1+\\tfrac12\\big[v_k(1)+v_k(2)\\big],$$</p><p>$$v_{k+1}(2)=-1+\\tfrac12\\big[v_k(1)+v_k(3)\\big],$$</p><p>$$v_{k+1}(3)=-1+\\tfrac12\\big[v_k(2)+0\\big].$$</p><p>同步扫描：右端全部用第 $k$ 轮的旧值，算完再整体替换。</p><p><b>（b）第一次扫描。</b>$v_0=(0,0,0)$，三个式子的括号都为 0，故 $\\boxed{v_1=(-1,\\,-1,\\,-1)}$。</p><p><b>（c）第二次扫描。</b></p><p>$$v_2(1)=-1+\\tfrac12(-1-1)=-2,\\qquad v_2(2)=-1+\\tfrac12(-1-1)=-2,$$</p><p>$$v_2(3)=-1+\\tfrac12(-1+0)=-1.5 .$$</p><p>即 $\\boxed{v_2=(-2,\\,-2,\\,-1.5)}$。注意状态 3 离终止更近，所以衰减更慢。</p><p><b>（d）精确解与贪心策略。</b>令 $k\\to\\infty$，解方程组</p><p>$$v(1)=-1+\\tfrac12[v(1)+v(2)],\\quad v(2)=-1+\\tfrac12[v(1)+v(3)],\\quad v(3)=-1+\\tfrac12v(2).$$</p><p>由第三式 $v(3)=-1+\\tfrac12v(2)$；代入第二式得 $v(2)=-1+\\tfrac12 v(1)-\\tfrac12+\\tfrac14 v(2)$，即 $\\tfrac34 v(2)=-\\tfrac32+\\tfrac12 v(1)$；再与第一式联立解得</p><p>$$\\boxed{v_\\pi=(-12,\\,-10,\\,-6)} .$$</p><p>物理含义：$\\gamma=1$ 时价值就是\"到终止的期望步数的负值\"，状态 1 离终点最远（平均 12 步），状态 3 最近（6 步）。</p><p>贪心检查（$q(s,a)=-1+v(s')$）：状态 1 处 $q(L)=-1-12=-13$ 对 $q(R)=-1-10=-11$，选 $R$；状态 2 处 $-13$ 对 $-1-6=-7$，选 $R$；状态 3 处 $-1-10=-11$ 对 $-1+0=-1$，选 $R$。故 $\\pi'=(R,R,R)$，即一路向右直达终点的最短路径。由于 $\\pi$ 是均匀随机，改进后价值会显著变好，这也体现了策略改进定理。</p>"
   },
   "key": "同步扫描用旧值；$\\gamma=1$ 时价值 = 负的期望剩余步数；贪心方向恒为朝向终止状态。"
  },
  {
   "id": "A-S3-Q3",
   "set": "A",
   "section": 3,
   "type": "calc",
   "points": 8,
   "en": {
    "stem": "<b>Value iteration.</b> Consider $\\mathcal{S}=\\{A,B\\}$, $\\gamma=0.5$, with deterministic dynamics and rewards</p><p>$$(A,a_1)\\to B,\\ r=3;\\quad (A,a_2)\\to A,\\ r=1;\\quad (B,b_1)\\to A,\\ r=2;\\quad (B,b_2)\\to B,\\ r=0 .$$",
    "sub": [
     "(a) Write the Bellman optimality equations for $v_*(A)$ and $v_*(B)$.",
     "(b) Starting from $v_0(A)=v_0(B)=0$, run two sweeps of <i>value iteration</i> and report $v_1$ and $v_2$.",
     "(c) Give the greedy policy after the second sweep, and the optimal policy $\\pi_*$.",
     "(d) Suppose instead $\\gamma=0$. What are $v_*(A)$, $v_*(B)$ and $\\pi_*$?"
    ]
   },
   "zh": {
    "stem": "<b>值迭代。</b>考虑 $\\mathcal{S}=\\{A,B\\}$，$\\gamma=0.5$，确定性动力学与奖励为</p><p>$$(A,a_1)\\to B,\\ r=3;\\quad (A,a_2)\\to A,\\ r=1;\\quad (B,b_1)\\to A,\\ r=2;\\quad (B,b_2)\\to B,\\ r=0 .$$",
    "sub": [
     "（a）写出 $v_*(A)$ 与 $v_*(B)$ 的贝尔曼最优方程。",
     "（b）从 $v_0(A)=v_0(B)=0$ 出发，做两轮<b>值迭代</b>同步扫描，报告 $v_1$ 与 $v_2$。",
     "(c) 给出第二轮扫描后的贪心策略，以及最优策略 $\\pi_*$。",
     "(d) 若改为 $\\gamma=0$，$v_*(A)$、$v_*(B)$ 与 $\\pi_*$ 分别是多少？"
    ],
    "solution": "<p><b>（a）贝尔曼最优方程。</b>对每个状态取两个动作中的最大值：</p><p>$$v_*(A)=\\max\\big\\{3+\\gamma v_*(B),\\ 1+\\gamma v_*(A)\\big\\}=\\max\\big\\{3+0.5v_*(B),\\ 1+0.5v_*(A)\\big\\},$$</p><p>$$v_*(B)=\\max\\big\\{2+\\gamma v_*(A),\\ 0+\\gamma v_*(B)\\big\\}=\\max\\big\\{2+0.5v_*(A),\\ 0.5v_*(B)\\big\\}.$$</p><p><b>（b）两轮值迭代。</b>值迭代的备份是 $v_{k+1}(s)=\\max_a\\big[r(s,a)+\\gamma v_k(s')\\big]$，右端用第 $k$ 轮旧值。</p><p>第 1 轮（$v_0=0$）：$v_1(A)=\\max\\{3+0,\\ 1+0\\}=3$，$v_1(B)=\\max\\{2+0,\\ 0\\}=2$，即 $\\boxed{v_1=(3,\\,2)}$。</p><p>第 2 轮：</p><p>$$v_2(A)=\\max\\{3+0.5(2),\\ 1+0.5(3)\\}=\\max\\{4,\\ 2.5\\}=4,$$</p><p>$$v_2(B)=\\max\\{2+0.5(3),\\ 0.5(2)\\}=\\max\\{3.5,\\ 1\\}=3.5 .$$</p><p>即 $\\boxed{v_2=(4,\\,3.5)}$（后续为 $(4.75,4)$、$(5,4.375)$ …，逐步逼近 $v_*$）。</p><p><b>（c）贪心策略与最优策略。</b>基于 $v_2$ 计算：</p><p>$$q(A,a_1)=3+0.5(3.5)=4.75>q(A,a_2)=1+0.5(4)=3\\ \\Rightarrow\\ a_1,$$</p><p>$$q(B,b_1)=2+0.5(4)=4>q(B,b_2)=0.5(3.5)=1.75\\ \\Rightarrow\\ b_1 .$$</p><p>贪心策略为 $(a_1,b_1)$，此后不再改变，故 $\\pi_*=(a_1,b_1)$；继续迭代解方程可得 $v_*=(16/3,\\,14/3)\\approx(5.33,\\,4.67)$。<b>要点：</b>值虽然还没收敛，但动作的<b>排序</b>已经正确，因此 DP 控制不必等价值收敛。</p><p><b>（d）$\\gamma=0$。</b>此时只看即时奖励：$v_*(A)=\\max\\{3,1\\}=3$，$v_*(B)=\\max\\{2,0\\}=2$，$\\pi_*=(a_1,b_1)$ 不变。这说明 $\\gamma=0$ 是完全短视的评价，后继状态价值被完全忽略；本题中恰好两状态的排序与 $\\gamma=0.5$ 一致，但一般情形未必相同。</p>"
   },
   "key": "值迭代 = 一次最优备份；策略常在价值收敛前就已稳定；$\\gamma=0$ 退化为只比即时奖励。"
  },
  {
   "id": "A-S4-Q1",
   "set": "A",
   "section": 4,
   "type": "calc",
   "points": 10,
   "en": {
    "stem": "<b>MC, TD(0), $n$-step returns and TD(λ).</b> One episode is observed in a Markov chain with states $A,B,C$ and terminal state $T$:</p><p>$$S_0=A,\\ R_1=0;\\qquad S_1=B,\\ R_2=1;\\qquad S_2=C,\\ R_3=2;\\qquad S_3=T .$$</p><p>Initial values are $V(A)=0,\\ V(B)=1,\\ V(C)=0.5,\\ V(T)=0$, and $\\gamma=0.5$, $\\alpha=0.1$.",
    "sub": [
     "(a) Compute the Monte-Carlo returns $G_0,G_1,G_2$.",
     "(b) Compute the TD errors $\\delta_0,\\delta_1,\\delta_2$.",
     "(c) Apply one online pass of TD(0) and give the updated values of $A,B,C$.",
     "(d) Compute the $2$-step return $G^{(2)}_0$ and the $3$-step return $G^{(3)}_0$, and compare $G^{(3)}_0$ with $G_0$.",
     "(e) Take λ=0.5 (accumulating trace $E_t(s)=\\gamma\\lambda E_{t-1}(s)+\\mathbf{1}(S_t=s)$, $E_{-1}(s)=0$). Give the traces $E_t(A),E_t(B),E_t(C)$ for $t=0,1,2$, and compute the total <i>offline</i> update $\\Delta V(A)$ over the episode."
    ]
   },
   "zh": {
    "stem": "<b>蒙特卡洛、TD(0)、$n$ 步回报与 TD(λ)。</b>在状态为 $A,B,C$ 及终止状态 $T$ 的马尔可夫链上观测到一幕：</p><p>$$S_0=A,\\ R_1=0;\\qquad S_1=B,\\ R_2=1;\\qquad S_2=C,\\ R_3=2;\\qquad S_3=T .$$</p><p>初始价值 $V(A)=0,\\ V(B)=1,\\ V(C)=0.5,\\ V(T)=0$，$\\gamma=0.5$，$\\alpha=0.1$。",
    "sub": [
     "（a）计算蒙特卡洛回报 $G_0,G_1,G_2$。",
     "（b）计算 TD 误差 $\\delta_0,\\delta_1,\\delta_2$。",
     "（c）做一次在线 TD(0) 遍历，给出更新后 $A,B,C$ 的价值。",
     "（d）计算 2 步回报 $G^{(2)}_0$ 与 3 步回报 $G^{(3)}_0$，并比较 $G^{(3)}_0$ 与 $G_0$。",
     "（e）取 λ=0.5（累积迹 $E_t(s)=\\gamma\\lambda E_{t-1}(s)+\\mathbf{1}(S_t=s)$，$E_{-1}(s)=0$），给出 $t=0,1,2$ 时 $E_t(A),E_t(B),E_t(C)$，并计算整幕的<b>离线</b>总更新量 $\\Delta V(A)$。"
    ],
    "solution": "<p><b>（a）蒙特卡洛回报。</b>$G_t=\\sum_{k=0}^{T-t-1}\\gamma^k R_{t+k+1}$，本幕奖励依次为 $R_1=0,R_2=1,R_3=2$，$\\gamma=0.5$：</p><p>$$G_0=0+0.5(1)+0.25(2)=\\boxed{1.0},\\qquad G_1=1+0.5(2)=\\boxed{2.0},\\qquad G_2=R_3=\\boxed{2.0}.$$</p><p><b>（b）TD 误差。</b>$\\delta_t=R_{t+1}+\\gamma V(S_{t+1})-V(S_t)$，注意用<b>更新前</b>的 $V$：</p><p>$$\\delta_0=0+0.5(1)-0=\\boxed{0.5},\\qquad \\delta_1=1+0.5(0.5)-1=\\boxed{0.25},\\qquad \\delta_2=2+0.5(0)-0.5=\\boxed{1.5}.$$</p><p><b>（c）一次在线 TD(0) 遍历。</b>$V(S_t)\\leftarrow V(S_t)+\\alpha\\delta_t$：</p><p>$$V(A)=0+0.1(0.5)=\\boxed{0.05},\\quad V(B)=1+0.1(0.25)=\\boxed{1.025},\\quad V(C)=0.5+0.1(1.5)=\\boxed{0.65}.$$</p><p><b>（d）$n$ 步回报。</b>定义为截断 $n$ 步后用 $V(S_{t+n})$ 自举：</p><p>$$G^{(2)}_0=R_1+\\gamma R_2+\\gamma^2 V(S_2)=0+0.5+0.25(0.5)=\\boxed{0.625},$$</p><p>$$G^{(3)}_0=R_1+\\gamma R_2+\\gamma^2R_3+\\gamma^3V(T)=0+0.5+0.5+0=\\boxed{1.0}=G_0 .$$</p><p>当 $n=T-t$（步数到达终止）时，$n$ 步回报恰好等于 MC 回报，因为 $V(T)=0$ 使自举项消失。</p><p><b>（e）资格迹与离线总更新。</b>$\\gamma\\lambda=0.5\\times0.5=0.25$，每步先把旧迹乘以 0.25，再给当前状态加 1：</p><p>$$E_0=(A\\!:\\!1,\\ B\\!:\\!0,\\ C\\!:\\!0),\\qquad E_1=(0.25,\\ 1,\\ 0),\\qquad E_2=(0.0625,\\ 0.25,\\ 1).$$</p><p>离线更新把 $\\alpha\\delta_tE_t(s)$ 逐步累加、幕末一次性施加：</p><p>$$\\Delta V(A)=\\alpha\\sum_{t=0}^{2}\\delta_tE_t(A)=0.1\\big[0.5(1)+0.25(0.25)+1.5(0.0625)\\big]=0.1(0.65625)=\\boxed{0.0656}.$$</p><p>（参考：$\\Delta V(B)=0.1[0.25(1)+1.5(0.25)]=0.0625$，$\\Delta V(C)=0.1(1.5)=0.15$。）</p><p><b>易错点：</b>① 迹的衰减是 $\\gamma\\lambda$ 不是 $\\lambda$；② 离线更新中所有 $\\delta_t$ 都用旧 $V$ 计算，不能边更新边算；③ 2 步回报的自举项是 $\\gamma^2 V(S_2)$ 而不是 $\\gamma^2 R_3$。</p>"
   },
   "key": "$\\delta_t=R_{t+1}+\\gamma V(S_{t+1})-V(S_t)$；$G^{(n)}_t$ 截断 $n$ 步后自举；迹衰减 $\\gamma\\lambda$，离线累加 $\\alpha\\delta_tE_t$。"
  },
  {
   "id": "A-S4-Q2",
   "set": "A",
   "section": 4,
   "type": "calc",
   "points": 10,
   "en": {
    "stem": "<b>SARSA, Q-learning, ε-greedy and DQN targets.</b> The current action-value estimates are</p><p>$$Q(s_1,a_1)=1.0,\\quad Q(s_1,a_2)=2.0,\\quad Q(s_2,a_1)=0.5,\\quad Q(s_2,a_2)=1.5,$$</p><p>and one transition $(s_1,a_2,r=3,s_2)$ is observed. Let $\\alpha=0.1$, $\\gamma=0.9$.",
    "sub": [
     "(a) Suppose the next action is $A'=a_1$. Give the SARSA target and the updated $Q(s_1,a_2)$.",
     "(b) Give the Q-learning target and the updated $Q(s_1,a_2)$.",
     "(c) With $\\varepsilon=0.1$ and two actions, give the ε-greedy probability of each action in $s_1$ and in $s_2$.",
     "(d) For another transition $(s,a,r=1,s')$ (non-terminal, $\\gamma=0.9$), the online network gives $Q(s',\\cdot)=(2.0,3.0)$ and the target network gives $\\hat Q(s',\\cdot)=(4.0,1.0)$. Compute the DQN target and the Double DQN target, and comment on the difference.",
     "(e) Which of SARSA / Q-learning is on-policy and which is off-policy? State what each of them converges to."
    ]
   },
   "zh": {
    "stem": "<b>SARSA、Q-learning、$\\varepsilon$-贪心与 DQN 目标。</b>当前动作价值估计为</p><p>$$Q(s_1,a_1)=1.0,\\quad Q(s_1,a_2)=2.0,\\quad Q(s_2,a_1)=0.5,\\quad Q(s_2,a_2)=1.5,$$</p><p>观测到一条转移 $(s_1,a_2,r=3,s_2)$。设 $\\alpha=0.1$，$\\gamma=0.9$。",
    "sub": [
     "（a）若下一动作是 $A'=a_1$，给出 SARSA 目标与更新后的 $Q(s_1,a_2)$。",
     "(b) 给出 Q-learning 目标与更新后的 $Q(s_1,a_2)$。",
     "(c) 取 $\\varepsilon=0.1$、两个动作，给出 $s_1$ 与 $s_2$ 中各动作的 $\\varepsilon$-贪心概率。",
     "(d) 对另一条转移 $(s,a,r=1,s')$（非终止，$\\gamma=0.9$），在线网络给出 $Q(s',\\cdot)=(2.0,3.0)$，目标网络给出 $\\hat Q(s',\\cdot)=(4.0,1.0)$。计算 DQN 目标与 Double DQN 目标，并说明差异。",
     "(e) SARSA 与 Q-learning 哪个是同策略、哪个是离策略？各自收敛到什么？"
    ],
    "solution": "<p><b>（a）SARSA。</b>目标用<b>实际选取</b>的下一动作 $A'=a_1$：</p><p>$$y^{\\text{SARSA}}=R+\\gamma Q(s_2,A')=3+0.9(0.5)=3.45,$$</p><p>$$Q(s_1,a_2)\\leftarrow 2.0+0.1(3.45-2.0)=\\boxed{2.145}.$$</p><p><b>（b）Q-learning。</b>目标用后继状态所有动作的 $\\max$：</p><p>$$y^{\\text{Q}}=R+\\gamma\\max_a Q(s_2,a)=3+0.9(1.5)=4.35,$$</p><p>$$Q(s_1,a_2)\\leftarrow 2.0+0.1(4.35-2.0)=\\boxed{2.235}.$$</p><p>注意 $a_1$ 与 $a_2$ 的价值差恰好通过目标体现出来：SARSA 因为下一动作恰好是较差的 $a_1$ 而给出更小的目标。</p><p><b>（c）$\\varepsilon$-贪心概率。</b>两个状态里 $a_2$ 的价值都更大（$2.0>1.0$ 与 $1.5>0.5$），所以两处贪心动作都是 $a_2$：$|\\mathcal A|=2$，</p><p>$$P(a_2)=1-\\varepsilon+\\frac{\\varepsilon}{2}=1-0.1+0.05=\\boxed{0.95},\\qquad P(a_1)=\\frac{0.1}{2}=\\boxed{0.05}.$$</p><p><b>（d）DQN 与 Double DQN 目标。</b>普通 DQN 用目标网络取 $\\max$：</p><p>$$y^{\\text{DQN}}=r+\\gamma\\max_{a'}\\hat Q(s',a')=1+0.9(4.0)=\\boxed{4.6}.$$</p><p>Double DQN 先用在线网络<b>选</b>动作 $a^*=\\arg\\max_{a'}Q(s',a')=a_2$（因 $3.0>2.0$），再用目标网络<b>评估</b>这个动作：</p><p>$$y^{\\text{DDQN}}=r+\\gamma\\hat Q(s',a^*)=1+0.9(1.0)=\\boxed{1.9}.$$</p><p>差异说明：目标网络里\"看起来最好\"的动作 $a_1$ 被在线网络判定并非最优，普通 DQN 直接采用了那个偏高的 4.0，目标被明显抬高（4.6）；Double DQN 解耦选择与评估后，过高估计大幅缓解（此处降为 1.9）。这正是最大化偏差的直观例证。</p><p><b>（e）同/离策略与收敛。</b>SARSA 是<b>同策略</b>（目标使用行为策略实际选出的 $A'$），在 Robbins–Monro 步长与 GLIE 下收敛到行为策略（$\\varepsilon$-贪心）自身的 $q$，即\"最好的 $\\varepsilon$-贪心策略\"；Q-learning 是<b>离策略</b>（目标隐含贪心目标策略，采样来自 $\\varepsilon$-贪心），收敛到 $q_*$，从而得到最优策略。</p>"
   },
   "key": "SARSA 目标用 $A'$，Q-learning 用 $\\max_a$；Double DQN 在线选、目标评，可显著降低过高估计。"
  },
  {
   "id": "A-S5-Q1",
   "set": "A",
   "section": 5,
   "type": "calc",
   "points": 10,
   "en": {
    "stem": "An agent faces a choice between a small immediate reward and a larger delayed one. The MDP has states $\\mathcal{S}=\\{1,2,T\\}$ with $T$ terminal ($v(T)=0$) and discount factor $\\gamma$:</p><p>$$\\text{state 1:}\\quad a_1=\\text{invest}\\to 2,\\ r=0;\\qquad a_2=\\text{cash out}\\to T,\\ r=1;$$</p><p>$$\\text{state 2:}\\quad b_1=\\text{collect}\\to T,\\ r=5;\\qquad b_2=\\text{keep waiting}\\to 2,\\ r=0 .$$",
    "sub": [
     "(a) Compute $v_*(2)$ and give the optimal action in state $2$. Justify briefly.",
     "(b) Write the Bellman optimality equation for $v_*(1)$ and give $q_*(1,a_1)$ and $q_*(1,a_2)$ as functions of $\\gamma$.",
     "(c) Take $\\gamma=0.5$: give $v_*(1),v_*(2)$ and $\\pi_*$. Then take $\\gamma=0.1$: give $v_*(1),v_*(2)$ and $\\pi_*$.",
     "(d) Find the critical value $\\gamma^*$ at which the optimal action in state $1$ switches. Explain in one sentence what this says about short-term versus long-term reward."
    ]
   },
   "zh": {
    "stem": "智能体要在\"较小的即时奖励\"与\"较大的延迟奖励\"之间取舍。MDP 状态为 $\\mathcal{S}=\\{1,2,T\\}$，其中 $T$ 为终止状态（$v(T)=0$），折扣因子为 $\\gamma$：</p><p>状态 1：$a_1$（投资）$\\to 2,\\ r=0$；$a_2$（兑现）$\\to T,\\ r=1$；</p><p>状态 2：$b_1$（收取）$\\to T,\\ r=5$；$b_2$（继续等待）$\\to 2,\\ r=0$。",
    "sub": [
     "（a）计算 $v_*(2)$ 并给出状态 2 的最优动作，简要说明理由。",
     "(b) 写出 $v_*(1)$ 的贝尔曼最优方程，并把 $q_*(1,a_1)$、$q_*(1,a_2)$ 写成 $\\gamma$ 的函数。",
     "(c) 取 $\\gamma=0.5$，给出 $v_*(1),v_*(2)$ 与 $\\pi_*$；再取 $\\gamma=0.1$，给出同样的量。",
     "(d) 求状态 1 最优动作发生切换的临界 $\\gamma^*$，并用一句话说明它反映了短期与长期奖励之间的什么关系。"
    ],
    "solution": "<p><b>（a）状态 2 的最优价值。</b>两个动作分别是\"收取 +5 后终止\"与\"原地等待、奖励 0\"：</p><p>$$v_*(2)=\\max\\big\\{5+\\gamma v(T),\\ 0+\\gamma v_*(2)\\big\\}=\\max\\big\\{5,\\ \\gamma v_*(2)\\big\\}.$$</p><p>若假设 $v_*(2)>5$，则只能由第二项给出 $v_*(2)=\\gamma v_*(2)$，在 $\\gamma<1$ 时推出 $v_*(2)=0$，矛盾。故 $\\boxed{v_*(2)=5}$，最优动作是 $b_1$（收取）；因为继续等待只能得到 $0+\\gamma\\cdot5=5\\gamma<5$。</p><p><b>（b）状态 1。</b>投资到状态 2 后按最优行事，兑现立即得 1：</p><p>$$v_*(1)=\\max\\big\\{q_*(1,a_1),\\ q_*(1,a_2)\\big\\},\\qquad q_*(1,a_1)=0+\\gamma v_*(2)=5\\gamma,\\qquad q_*(1,a_2)=1+\\gamma v(T)=1,$$</p><p>即 $\\boxed{v_*(1)=\\max\\{5\\gamma,\\ 1\\}}$。关键点：一旦进入状态 2，后续按 $v_*(2)=5$ 计算，因此投资的价值是 $5\\gamma$ 而不是 0。</p><p><b>（c）两种折扣。</b></p><p>$\\gamma=0.5$：$v_*(1)=\\max\\{2.5,1\\}=\\boxed{2.5}$，$v_*(2)=\\boxed{5}$，$\\pi_*=(\\boxed{a_1},\\,b_1)$ —— 先投资再收取。</p><p>$\\gamma=0.1$：$v_*(1)=\\max\\{0.5,1\\}=\\boxed{1}$，$v_*(2)=\\boxed{5}$，$\\pi_*=(\\boxed{a_2},\\,b_1)$ —— 立即兑现。</p><p><b>（d）临界折扣。</b>切换发生在两个动作价值相等时：$5\\gamma=1$，故 $\\boxed{\\gamma^*=0.2}$；$\\gamma>0.2$ 时投资，$\\gamma<0.2$ 时兑现，$\\gamma=0.2$ 时两者并列最优。一句话解释：$\\gamma$ 决定未来奖励的现值——短视的智能体（$\\gamma$ 小）拿走确定的 $+1$，看得远的智能体（$\\gamma$ 大）愿意多等一步换更大的 $+5$。</p><p><b>评分要点：</b>(a) 自洽地排除自环解；(b) 正确用 $v_*(2)$ 而不是 0；(c) 分别比较 $5\\gamma$ 与 1；(d) 解 $5\\gamma=1$ 并给出解释。</p>"
   },
   "key": "$v_*(2)=5$；$v_*(1)=\\max\\{5\\gamma,1\\}$；临界 $\\gamma^*=0.2$，$\\gamma$ 决定未来奖励的现值。"
  },
  {
   "id": "B-S1-Q1",
   "set": "B",
   "section": 1,
   "type": "single",
   "points": 2,
   "answer": 1,
   "en": {
    "stem": "Which statement about the reinforcement-learning paradigm is <b>correct</b>?",
    "options": [
     "In supervised learning the feedback is evaluative, whereas in reinforcement learning it is instructive.",
     "Supervised learning receives instructive feedback (the correct label), whereas reinforcement learning receives only evaluative feedback, a numerical reward.",
     "The data seen by an RL agent is i.i.d. because the agent itself chooses the actions.",
     "A reward of $0$ always means that the action just taken was wrong."
    ]
   },
   "zh": {
    "stem": "关于强化学习这一范式，下列说法哪一项<b>正确</b>？",
    "options": [
     "监督学习的反馈是评价性的，而强化学习的反馈是指导性的。",
     "监督学习得到<b>指导性</b>反馈（正确标签），而强化学习只得到<b>评价性</b>反馈，即一个数值奖励。",
     "由于动作是智能体自己选的，RL 智能体看到的数据是独立同分布的。",
     "奖励为 $0$ 总意味着刚执行的动作是错的。"
    ],
    "solution": "<p><b>正确答案 B。</b>监督学习里标签直接告诉\"正确答案是什么\"，称为指导性（instructive）反馈；强化学习只有一个标量奖励，它评价\"这个动作有多好\"，却<b>不告诉</b>\"哪个动作才是最好的\"，称为评价性（evaluative）反馈。正因为缺少标准答案，RL 必须通过试错与探索自己找出来。</p><p><b>逐项辨析：</b>A 把两个词对调了。C 错，RL 数据绝非 i.i.d.：当前动作改变下一状态分布，数据随时间高度相关，而且策略本身在不断变化（非平稳），这与监督学习的固定数据集根本不同，也是 DQN 要用经验回放的原因之一。D 错，$0$ 只是奖励刻度上的一个数值，什么也不代表；例如\"没输没赢\"、\"继续游戏\"常常就是 0，不能推断动作对错。</p><p><b>延伸：</b>评价性反馈 + 延迟奖励 + 数据非独立，共同决定了 RL 必须处理\"信用分配\"与\"探索-利用\"两大难题。</p>"
   },
   "key": "监督学习 instructive（给标签），RL evaluative（只给标量奖励）；RL 数据非 i.i.d.；$R=0$ 无特殊含义。"
  },
  {
   "id": "B-S1-Q2",
   "set": "B",
   "section": 1,
   "type": "single",
   "points": 2,
   "answer": 0,
   "en": {
    "stem": "Given the dynamics $p(s',r\\,|\\,s,a)$, which identities are <b>correct</b>?",
    "options": [
     "$p(s'\\,|\\,s,a)=\\sum_r p(s',r\\,|\\,s,a)$ \\;and\\; $r(s,a)=\\sum_{s'}\\sum_r r\\,p(s',r\\,|\\,s,a)$",
     "$p(s'\\,|\\,s,a)=\\sum_{s'}p(s',r\\,|\\,s,a)$ \\;and\\; $r(s,a)=\\sum_r p(s',r\\,|\\,s,a)$",
     "$p(s'\\,|\\,s,a)=\\sum_r r\\,p(s',r\\,|\\,s,a)$ \\;and\\; $r(s,a)=\\sum_{s'}p(s'\\,|\\,s,a)$",
     "$p(s',r\\,|\\,s,a)=p(s'\\,|\\,s,a)\\cdot p(r\\,|\\,s,a)$ \\;for every MDP"
    ]
   },
   "zh": {
    "stem": "给定动力学 $p(s',r\\,|\\,s,a)$，下列恒等式哪一组<b>正确</b>？",
    "options": [
     "$p(s'\\,|\\,s,a)=\\sum_r p(s',r\\,|\\,s,a)$ 且 $r(s,a)=\\sum_{s'}\\sum_r r\\,p(s',r\\,|\\,s,a)$",
     "$p(s'\\,|\\,s,a)=\\sum_{s'}p(s',r\\,|\\,s,a)$ 且 $r(s,a)=\\sum_r p(s',r\\,|\\,s,a)$",
     "$p(s'\\,|\\,s,a)=\\sum_r r\\,p(s',r\\,|\\,s,a)$ 且 $r(s,a)=\\sum_{s'}p(s'\\,|\\,s,a)$",
     "对任意 MDP 都有 $p(s',r\\,|\\,s,a)=p(s'\\,|\\,s,a)\\cdot p(r\\,|\\,s,a)$"
    ],
    "solution": "<p><b>正确答案 A。</b>$p(s',r\\mid s,a)=P(S_{t+1}=s',R_{t+1}=r\\mid S_t=s,A_t=a)$ 是<b>联合</b>分布，满足 $\\sum_{s'}\\sum_r p(s',r\\mid s,a)=1$。对它做边缘化即得到状态转移概率，用 $r$ 加权求和即得到期望奖励：</p><p>$$p(s'\\mid s,a)=\\sum_r p(s',r\\mid s,a),\\qquad r(s,a)=E[R_{t+1}\\mid S_t=s,A_t=a]=\\sum_{s'}\\sum_r r\\,p(s',r\\mid s,a).$$</p><p><b>逐项辨析：</b>B 第一个式子对 $s'$ 求和却仍留下 $s'$（求和指标写错），第二个式子对 $r$ 求和得到的是 1 而不是期望奖励。C 把两者完全写反：对 $r\\,p$ 求 $r$ 的和给出的是期望奖励而非转移概率，而 $\\sum_{s'}p(s'\\mid s,a)=1$。D 一般不成立：后继状态与奖励通常<b>相关</b>（例如不同结局给不同奖励），联合分布不能分解成边缘分布的乘积；只有二者条件独立时才成立。</p><p><b>答题要点：</b>先认清 $p(s',r\\mid s,a)$ 是联合分布，再对\"不需要的变量\"求和；求期望时记得把被积变量 $r$ 乘进去。</p>"
   },
   "key": "$p(s'\\mid s,a)=\\sum_r p(s',r\\mid s,a)$；$r(s,a)=\\sum_{s',r} r\\,p(s',r\\mid s,a)$；$s'$ 与 $r$ 一般不独立。"
  },
  {
   "id": "B-S1-Q3",
   "set": "B",
   "section": 1,
   "type": "single",
   "points": 2,
   "answer": 2,
   "en": {
    "stem": "Which relation between $v_\\pi$ and $q_\\pi$ is <b>correct</b>?",
    "options": [
     "$q_\\pi(s,a)=\\sum_{s'}p(s'\\,|\\,s,a)\\,v_\\pi(s')$",
     "$v_\\pi(s)=\\max_a q_\\pi(s,a)$ for the policy $\\pi$ being evaluated",
     "$q_\\pi(s,a)=\\sum_{s',r}p(s',r\\,|\\,s,a)\\big[r+\\gamma v_\\pi(s')\\big]$ \\;and\\; $v_\\pi(s)=\\sum_a\\pi(a\\,|\\,s)\\,q_\\pi(s,a)$",
     "$q_\\pi(s,a)=r(s,a)+\\gamma\\sum_{s'}v_\\pi(s')$"
    ]
   },
   "zh": {
    "stem": "$v_\\pi$ 与 $q_\\pi$ 之间的关系，哪一项<b>正确</b>？",
    "options": [
     "$q_\\pi(s,a)=\\sum_{s'}p(s'\\,|\\,s,a)\\,v_\\pi(s')$",
     "对被评估的策略 $\\pi$ 有 $v_\\pi(s)=\\max_a q_\\pi(s,a)$",
     "$q_\\pi(s,a)=\\sum_{s',r}p(s',r\\,|\\,s,a)\\big[r+\\gamma v_\\pi(s')\\big]$ 且 $v_\\pi(s)=\\sum_a\\pi(a\\,|\\,s)\\,q_\\pi(s,a)$",
     "$q_\\pi(s,a)=r(s,a)+\\gamma\\sum_{s'}v_\\pi(s')$"
    ],
    "solution": "<p><b>正确答案 C。</b>动作价值是\"先固定执行动作 $a$，看一步，之后按策略 $\\pi$ 行事\"：</p><p>$$q_\\pi(s,a)=E\\big[R_{t+1}+\\gamma v_\\pi(S_{t+1})\\mid S_t=s,A_t=a\\big]=\\sum_{s',r}p(s',r\\mid s,a)\\big[r+\\gamma v_\\pi(s')\\big],$$</p><p>而状态价值是所有动作价值在策略下的加权平均 $v_\\pi(s)=\\sum_a\\pi(a\\mid s)q_\\pi(s,a)$。二者合起来就是贝尔曼期望方程。</p><p><b>逐项辨析：</b>A 漏掉即时奖励 $r$ 与折扣 $\\gamma$。B 只对<b>最优</b>情形成立：应为 $v_*(s)=\\max_a q_*(s,a)$；对一般的（可能是随机的）$\\pi$，$v_\\pi$ 是加权平均而非最大值。D 漏掉转移概率 $p(s'\\mid s,a)$ 的权重，把\"期望\"写成了\"对所有状态直接求和\"，且即时奖励也应与后继状态联合加权。</p><p><b>记忆点：</b>$q$ 向前看一步（含 $r$ 和 $\\gamma$），$v$ 对 $q$ 按 $\\pi$ 求平均；$\\max$ 只在最优策略处出现。</p>"
   },
   "key": "$q_\\pi$ 含即时奖励与 $\\gamma v_\\pi(s')$；$v_\\pi=\\sum_a\\pi q_\\pi$；$\\max_a$ 只属于 $v_*,q_*$。"
  },
  {
   "id": "B-S1-Q4",
   "set": "B",
   "section": 1,
   "type": "single",
   "points": 2,
   "answer": 3,
   "en": {
    "stem": "Which statement about optimal policies in a finite MDP is <b>correct</b>?",
    "options": [
     "The optimal policy is always unique.",
     "A stochastic policy can be strictly better than every deterministic policy.",
     "An optimal policy exists only when $\\gamma<1$.",
     "There is always at least one deterministic stationary optimal policy, but it need not be unique."
    ]
   },
   "zh": {
    "stem": "关于有限 MDP 中的最优策略，下列说法哪一项<b>正确</b>？",
    "options": [
     "最优策略总是唯一的。",
     "随机策略可以严格优于所有确定性策略。",
     "只有 $\\gamma<1$ 时最优策略才存在。",
     "总存在至少一个确定性平稳最优策略，但它未必唯一。"
    ],
    "solution": "<p><b>正确答案 D。</b>有限 MDP 中，贝尔曼最优算子是 $\\gamma$-压缩映射，存在唯一不动点 $v_*$；取任何关于 $v_*$ 贪心的策略 $\\pi_*(s)\\in\\arg\\max_a q_*(s,a)$ 即最优，且这个贪心策略可以选成<b>确定性平稳</b>的。若某状态下多个动作并列取到最大值，就会得到多个不同的最优策略（它们共享同一个 $v_*$）。</p><p><b>逐项辨析：</b>A 错，并列时最优策略不唯一，但最优价值 $v_*$ 唯一。B 错，既然已存在确定性最优策略，随机化至多得到相同的价值，不可能严格更好（把随机策略的价值写成各动作价值的凸组合即可看出）。C 错，$\\gamma=1$ 时对分幕任务或\"适当策略\"仍存在最优策略；$\\gamma<1$ 只是为了在持续性任务中保证回报收敛与压缩性。</p><p><b>易错点：</b>\"最优价值唯一\"与\"最优策略唯一\"是两件事，考试常在这里设陷阱。</p>"
   },
   "key": "$v_*$ 唯一、$\\pi_*$ 可不唯一；总存在确定性平稳最优策略；随机策略不会严格更优。"
  },
  {
   "id": "B-S1-Q5",
   "set": "B",
   "section": 1,
   "type": "single",
   "points": 2,
   "answer": 0,
   "en": {
    "stem": "Which statement about dynamic programming is <b>correct</b>?",
    "options": [
     "Iterative policy evaluation satisfies $\\|v_{k+1}-v_\\pi\\|_\\infty\\le\\gamma\\|v_k-v_\\pi\\|_\\infty$, so the error shrinks by a factor of at least $\\gamma$ per sweep.",
     "For $\\gamma<1$ value iteration reaches $v_*$ exactly after finitely many sweeps.",
     "Asynchronous DP cannot converge unless every sweep updates all states.",
     "Policy iteration is only valid if each policy evaluation is solved exactly."
    ]
   },
   "zh": {
    "stem": "关于动态规划，下列说法哪一项<b>正确</b>？",
    "options": [
     "迭代策略评估满足 $\\|v_{k+1}-v_\\pi\\|_\\infty\\le\\gamma\\|v_k-v_\\pi\\|_\\infty$，故每轮扫描误差至少缩小 $\\gamma$ 倍。",
     "当 $\\gamma<1$ 时，值迭代可在有限轮扫描后精确达到 $v_*$。",
     "异步 DP 除非每轮扫描都更新全部状态，否则无法收敛。",
     "只有当每次策略评估都精确求解时，策略迭代才有效。"
    ],
    "solution": "<p><b>正确答案 A。</b>贝尔曼期望备份算子 $T_\\pi$ 是 $\\gamma$-压缩映射：$\\|T_\\pi u-T_\\pi v\\|_\\infty\\le\\gamma\\|u-v\\|_\\infty$。由于 $v_\\pi$ 是其不动点，令 $u=v_k$、$v=v_\\pi$ 即得 $\\|v_{k+1}-v_\\pi\\|_\\infty\\le\\gamma\\|v_k-v_\\pi\\|_\\infty$，误差按几何速度收敛（值迭代的最优算子同理）。</p><p><b>逐项辨析：</b>B 错，压缩映射只保证<b>渐近</b>收敛，$\\gamma<1$ 时一般不能在有限步精确到达 $v_*$（只在特殊结构下可能）。C 反了：异步 DP 可以原地、按任意顺序更新，只要保证每个状态被更新无穷多次，备份的压缩性仍保证收敛到同一不动点；这是优先扫描（prioritised sweeping）成立的基础。D 错，评估<b>不必</b>精确：把评估截断为一次备份就是值迭代，广义策略迭代（GPI）允许两步都未完全收敛，仍能收敛到最优。</p><p><b>答题要点：</b>把\"收敛性\"统一归到 $\\gamma$-压缩；凡是出现\"必须全部更新 / 必须精确 / 有限步精确\"的绝对化措辞，多半是错的。</p>"
   },
   "key": "贝尔曼算子是 $\\gamma$-压缩；收敛是渐近的；异步 DP 只需每个状态被更新无穷多次；GPI 允许截断评估。"
  },
  {
   "id": "B-S1-Q6",
   "set": "B",
   "section": 1,
   "type": "single",
   "points": 2,
   "answer": 1,
   "en": {
    "stem": "Which statement about the forward view of TD(λ) is <b>correct</b>?",
    "options": [
     "With λ=0 the λ-return equals the infinite-horizon return $G_0$.",
     "$G^\\lambda_t=(1-\\lambda)\\sum_{n=1}^{\\infty}\\lambda^{\\,n-1}G^{(n)}_t$, and the <i>offline</i> TD(λ) update with λ=1 equals the Monte-Carlo update.",
     "For $0<\\lambda<1$ the weight on the $n$-step return increases with $n$.",
     "TD(λ) cannot make any update before the episode terminates."
    ]
   },
   "zh": {
    "stem": "关于 TD(λ) 的<b>前向视图</b>，下列说法哪一项<b>正确</b>？",
    "options": [
     "λ=0 时 λ-回报等于无限 horizon 回报 $G_0$。",
     "$G^\\lambda_t=(1-\\lambda)\\sum_{n=1}^{\\infty}\\lambda^{\\,n-1}G^{(n)}_t$，且 λ=1 时<b>离线</b> TD(λ) 更新等于蒙特卡洛更新。",
     "当 $0<\\lambda<1$ 时，$n$ 步回报的权重随 $n$ 增大而增大。",
     "TD(λ) 在一幕结束之前不能做任何更新。"
    ],
    "solution": "<p><b>正确答案 B。</b>前向视图把 λ-回报定义为所有 $n$ 步回报的几何加权平均：</p><p>$$G^\\lambda_t=(1-\\lambda)\\sum_{n=1}^{\\infty}\\lambda^{n-1}G^{(n)}_t,\\qquad (1-\\lambda)\\sum_{n=1}^{\\infty}\\lambda^{n-1}=1 .$$</p><p>λ=0 时只剩 $n=1$ 项，即一步 TD 目标；λ=1（有限幕）时等价完整回报，故<b>离线累计总更新</b>与 MC 相同。λ 就是 TD 与 MC 之间的旋钮。</p><p><b>逐项辨析：</b>A 错，λ=0 给出的是 $G^{(1)}_t=R_{t+1}+\\gamma V(S_{t+1})$，不是完整回报 $G_t$。C 错，权重 $(1-\\lambda)\\lambda^{n-1}$ 随 $n$ <b>指数递减</b>（$0<\\lambda<1$），越远的 $n$ 步回报权重越小。D 错，后向视图借助资格迹可以在每一步在线更新，不必等幕结束；\"必须等幕结束\"是 MC（以及朴素前向视图）的限制。</p><p><b>易错点：</b>前向视图是理论定义（需要未来的 $n$ 步回报），后向视图是可实现的在线算法（用迹），二者在离线总更新上等价。</p>"
   },
   "key": "λ-回报权重 $(1-\\lambda)\\lambda^{n-1}$ 递减且和为 1；λ=0 → TD，λ=1 离线 → MC；后向视图可在线更新。"
  },
  {
   "id": "B-S1-Q7",
   "set": "B",
   "section": 1,
   "type": "single",
   "points": 2,
   "answer": 2,
   "en": {
    "stem": "Which statement about value-function approximation is <b>correct</b>?",
    "options": [
     "Semi-gradient TD is the exact gradient of the projected Bellman error.",
     "Linear TD(0) diverges for every step size $\\alpha>0$.",
     "The TD update is only a <i>semi</i>-gradient because the target $\\hat v(S_{t+1},w)$ depends on $w$; combining function approximation, bootstrapping and off-policy data can make learning diverge.",
     "Function approximation removes the need for exploration."
    ]
   },
   "zh": {
    "stem": "关于价值函数近似，下列说法哪一项<b>正确</b>？",
    "options": [
     "半梯度 TD 就是投影贝尔曼误差的精确梯度。",
     "线性 TD(0) 对任意步长 $\\alpha>0$ 都会发散。",
     "因为目标 $\\hat v(S_{t+1},w)$ 也依赖 $w$，TD 更新只是<b>半</b>梯度；把函数近似、自举与离策略数据三者结合可能导致发散。",
     "函数近似消除了探索的必要性。"
    ],
    "solution": "<p><b>正确答案 C。</b>以均方误差 $\\frac12\\big(y-\\hat v(S_t,w)\\big)^2$ 为例，真实梯度含目标对 $w$ 的导数 $\\partial y/\\partial w$；TD 目标 $y=R_{t+1}+\\gamma\\hat v(S_{t+1},w)$ 本身含 $w$，半梯度法刻意忽略这一项，只保留 $-\\big(y-\\hat v\\big)\\nabla_w\\hat v(S_t,w)$ 并取负号做更新，故称\"半梯度\"。<b>致命三要素</b>（deadly triad）：函数近似 + 自举 + 离策略数据，三者同时具备时参数可能发散，即使函数类中存在很好的近似。</p><p><b>逐项辨析：</b>A 错，半梯度不是任何目标函数的真正梯度；真正沿投影贝尔曼误差梯度下降的是 GTD/TDC 等\"gradient-TD\"方法。B 错，<b>同策略</b>线性 TD(0) 在足够小的 $\\alpha$（满足 Robbins–Monro）下收敛到投影不动点。D 错，近似只解决泛化/存储问题，探索依然必需；否则数据覆盖不到好的状态-动作对。</p><p><b>延伸：</b>DQN 之所以要经验回放与目标网络，正是为了缓解\"非线性函数近似 + 自举 + 离策略\"带来的不稳定。</p>"
   },
   "key": "半梯度忽略目标对 $w$ 的依赖；deadly triad = 函数近似 + 自举 + 离策略；同策略线性 TD(0) 收敛。"
  },
  {
   "id": "B-S1-Q8",
   "set": "B",
   "section": 1,
   "type": "single",
   "points": 2,
   "answer": 3,
   "en": {
    "stem": "In prioritised experience replay, priorities are usually set to",
    "options": [
     "the reward $R_{t+1}$ of the transition, and sampling is uniform.",
     "the visit count of the state, and the buffer is sampled in order of arrival.",
     "$p_i=\\exp(|\\delta_i|)$ without any correction at the end of learning.",
     "$p_i=|\\delta_i|^{\\alpha}$ with $P(i)=p_i/\\sum_k p_k$, and the update is weighted by $w_i=\\big(1/(N\\,P(i))\\big)^{\\beta}$ with $\\beta$ annealed to $1$."
    ]
   },
   "zh": {
    "stem": "在优先经验回放（PER）中，优先级通常设置为",
    "options": [
     "转移的奖励 $R_{t+1}$，并且采用均匀采样。",
     "状态的访问次数，并按进入缓冲区的先后顺序采样。",
     "$p_i=\\exp(|\\delta_i|)$，且训练结束时不做任何修正。",
     "$p_i=|\\delta_i|^{\\alpha}$，采样概率 $P(i)=p_i/\\sum_k p_k$，更新时乘以权重 $w_i=\\big(1/(N\\,P(i))\\big)^{\\beta}$，其中 $\\beta$ 逐渐退火到 1。"
    ],
    "solution": "<p><b>正确答案 D。</b>PER 的核心思想是\"TD 误差越大的转移越值得学\"：优先级取 $p_i=|\\delta_i|^{\\alpha}$（$\\alpha=0$ 退化为均匀采样），采样概率 $P(i)=p_i/\\sum_k p_k$；比例优先可用 sum-tree 增量维护。由于采样变成非均匀，估计会有偏，必须用重要性权重</p><p>$$w_i=\\Big(\\frac{1}{N\\,P(i)}\\Big)^{\\beta}$$</p><p>修正更新幅度，并在训练过程中把 $\\beta$ 从初始值<b>退火到 1</b>（学习末期完全补偿偏差）。权重通常再除以 $\\max_i w_i$ 以稳定尺度。</p><p><b>逐项辨析：</b>A 错，优先级不是奖励，采样也不是均匀的。B 错，与访问次数/到达顺序无关。C 错，指数形式不是标准定义，更关键的是\"不做任何修正\"会留下严重偏差——IS 权重正是 PER 不可缺少的一半。</p><p><b>易错点：</b>$\\alpha$ 控制\"优先程度\"，$\\beta$ 控制\"纠偏程度\"，两者作用不同；$\\beta\\to1$ 是在训练后期完成的。</p>"
   },
   "key": "PER：$p_i=|\\delta_i|^\\alpha$、$P(i)=p_i/\\sum p_k$、$w_i=(1/(NP(i)))^\\beta$，$\\beta$ 退火到 1；无 IS 修正会有偏。"
  },
  {
   "id": "B-S1-Q9",
   "set": "B",
   "section": 1,
   "type": "single",
   "points": 2,
   "answer": 1,
   "en": {
    "stem": "Which statement about the duelling architecture is <b>correct</b>?",
    "options": [
     "It computes $Q(s,a)=V(s)\\cdot A(s,a)$.",
     "It computes $Q(s,a)=V(s)+A(s,a)-\\frac{1}{|\\mathcal A|}\\sum_{a'}A(s,a')$, which fixes the non-identifiability between the two streams.",
     "It trains a separate network for each action.",
     "It applies only to continuous action spaces."
    ]
   },
   "zh": {
    "stem": "关于 Dueling 架构，下列说法哪一项<b>正确</b>？",
    "options": [
     "它计算 $Q(s,a)=V(s)\\cdot A(s,a)$。",
     "它计算 $Q(s,a)=V(s)+A(s,a)-\\frac{1}{|\\mathcal A|}\\sum_{a'}A(s,a')$，以此消除两条分支之间的不可辨识性。",
     "它为每个动作训练一个独立的网络。",
     "它只适用于连续动作空间。"
    ],
    "solution": "<p><b>正确答案 B。</b>Dueling 网络把共享的卷积特征分成两支：一支估状态价值 $V(s)$（标量），一支估各动作的优势 $A(s,a)$。但直接写 $Q=V+A$ 是<b>不可辨识</b>的：给 $V$ 加任意常数 $c$、给所有 $A$ 减 $c$，$Q$ 完全不变，梯度无法唯一确定两支。解决办法是给优势分支加约束，常用减去均值（或减去最大值）：</p><p>$$Q(s,a)=V(s)+\\Big(A(s,a)-\\frac{1}{|\\mathcal A|}\\sum_{a'}A(s,a')\\Big).$$</p><p>这样优势被强制为零均值，$V$ 被迫承担状态价值，分解唯一；同时优势分支只表达\"动作之间的相对偏好\"，在动作很多而状态价值差别不大的场景下学得更稳、更快。</p><p><b>逐项辨析：</b>A 错，两支是<b>相加</b>不是相乘。C 错，两支共享同一个主干，只是最后分叉；\"每个动作一个网络\"恰好与 Dueling 的动机相反。D 错，Dueling 属于离散动作 DQN 的改进（输出每个动作的 $Q$），并非只用于连续动作空间。</p>"
   },
   "key": "Dueling：$Q=V+(A-\\text{mean}(A))$，减均值解决不可辨识；共享主干 + 两支；离散动作。"
  },
  {
   "id": "B-S1-Q10",
   "set": "B",
   "section": 1,
   "type": "single",
   "points": 2,
   "answer": 2,
   "en": {
    "stem": "Which statement about actor--critic methods is <b>correct</b>?",
    "options": [
     "REINFORCE uses a critic to bootstrap, so it needs no complete episode.",
     "The policy gradient theorem requires differentiating the transition probabilities $p(s'\\,|\\,s,a)$.",
     "One-step actor--critic replaces the return in the actor update by the TD error $\\delta=R_{t+1}+\\gamma\\hat v(S_{t+1},w)-\\hat v(S_t,w)$, which lowers variance but is biased whenever $\\hat v\\ne v_\\pi$.",
     "Adding an entropy bonus to the objective makes the policy less exploratory."
    ]
   },
   "zh": {
    "stem": "关于 actor–critic 方法，下列说法哪一项<b>正确</b>？",
    "options": [
     "REINFORCE 使用 critic 做自举，因此不需要完整的一幕。",
     "策略梯度定理需要对转移概率 $p(s'\\,|\\,s,a)$ 求梯度。",
     "单步 actor–critic 把 actor 更新中的回报换成 TD 误差 $\\delta=R_{t+1}+\\gamma\\hat v(S_{t+1},w)-\\hat v(S_t,w)$，方差更低，但当 $\\hat v\\ne v_\\pi$ 时是有偏的。",
     "在目标函数中加入熵正则项会让策略更不去探索。"
    ],
    "solution": "<p><b>正确答案 C。</b>单步 actor–critic 用 critic 的 TD 误差作为优势估计：</p><p>$$\\delta_t=R_{t+1}+\\gamma\\hat v(S_{t+1},w)-\\hat v(S_t,w),$$</p><p>代入 $\\theta\\leftarrow\\theta+\\alpha\\delta_t\\nabla_\\theta\\log\\pi(A_t\\mid S_t,\\theta)$。因为 $E[\\delta_t\\mid S_t,A_t]=q_\\pi(S_t,A_t)-\\hat v(S_t,w)$，当 $\\hat v=v_\\pi$ 时它就是优势 $A_\\pi$，估计无偏；critic 有误差时则带偏。好处是只需一步转移（自举），方差远低于用完整回报 $G_t$ 的 REINFORCE，且可在线、可用于持续性任务。</p><p><b>逐项辨析：</b>A 反了，REINFORCE 是纯蒙特卡洛策略梯度，用完整 $G_t$、<b>没有</b> critic、必须等幕结束；引入 critic 自举的是 actor–critic。B 错，策略梯度定理中梯度只作用于 $\\nabla_\\theta\\pi(a\\mid s)$，状态分布与转移动力学都不需要对 $\\theta$ 求导（这正是它\"无模型\"的关键）。D 反了，熵正则 $\\beta H(\\pi)$ 鼓励策略保持随机性，是<b>增强</b>探索、防止过早坍缩到确定性策略的常用手段。</p>"
   },
   "key": "单步 actor–critic 用 $\\delta$ 作优势（低方差、critic 不准时有偏）；REINFORCE 无 critic 需完整幕；策略梯度不含 $\\nabla p$。"
  },
  {
   "id": "B-S2-Q1",
   "set": "B",
   "section": 2,
   "type": "short",
   "points": 5,
   "en": {
    "stem": "<b>The MDP formalism and partial observability.</b>",
    "sub": [
     "(i) Write the MDP tuple and the dynamics $p(s',r\\,|\\,s,a)$. State the Markov property as an equation.",
     "(ii) Starting from $p(s',r\\,|\\,s,a)$, define $p(s'\\,|\\,s,a)$ and the expected reward $r(s,a)$.",
     "(iii) Distinguish episodic from continuing tasks. What is the role of $\\gamma$, and what goes wrong if $\\gamma=1$ in a continuing task?",
     "(iv) In a POMDP the agent sees $O_t$ rather than $S_t$. Write the belief state $b(s)$ and the belief update $b'(s')$, and explain in one sentence why the belief is a sufficient statistic."
    ]
   },
   "zh": {
    "stem": "<b>MDP 形式化与部分可观测性。</b>",
    "sub": [
     "（i）写出 MDP 的元组与动力学 $p(s',r\\,|\\,s,a)$，并用等式表述马尔可夫性。",
     "（ii）从 $p(s',r\\,|\\,s,a)$ 出发，定义 $p(s'\\,|\\,s,a)$ 与期望奖励 $r(s,a)$。",
     "(iii) 区分分幕任务与持续性任务；说明 $\\gamma$ 的作用，以及持续性任务中取 $\\gamma=1$ 会出什么问题。",
     "（iv）POMDP 中智能体看到的是 $O_t$ 而非 $S_t$。写出信念状态 $b(s)$ 与信念更新 $b'(s')$，并用一句话说明信念为何是充分统计量。"
    ],
    "solution": "<p><b>（i）MDP 元组与马尔可夫性。</b>$\\mathcal M=\\langle\\mathcal S,\\mathcal A,\\mathcal P,\\mathcal R,\\gamma\\rangle$（也可写 $\\langle\\mathcal S,\\mathcal A,P,R,\\gamma\\rangle$，有状态集、动作集、转移动力学、奖励函数、折扣因子）。动力学为联合分布</p><p>$$p(s',r\\mid s,a)=P\\big[S_{t+1}=s',\\ R_{t+1}=r\\mid S_t=s,\\ A_t=a\\big],\\qquad \\sum_{s'}\\sum_r p(s',r\\mid s,a)=1 .$$</p><p>马尔可夫性即\"现在足以预测未来，与更久的历史无关\"：</p><p>$$P[S_{t+1}\\mid S_t]=P[S_{t+1}\\mid S_1,\\dots,S_t].$$</p><p>严格写法是 $P[S_{t+1},R_{t+1}\\mid S_t,A_t]=P[S_{t+1},R_{t+1}\\mid H_t,A_t]$：给定当前状态与动作，下一状态与奖励的分布与完整历史无关。</p><p><b>（ii）边缘化。</b></p><p>$$p(s'\\mid s,a)=\\sum_r p(s',r\\mid s,a),\\qquad r(s,a)=\\sum_{s'}\\sum_r r\\,p(s',r\\mid s,a)=E\\big[R_{t+1}\\mid S_t=s,A_t=a\\big].$$</p><p><b>（iii）两类任务与 $\\gamma$。</b>分幕任务（episodic）会自然分解成若干幕、每幕在终止状态结束，时间范围有限，因此 $\\gamma=1$ 也合法。持续性任务（continuing）没有终止，交互无限进行，回报 $G_t=\\sum_{k=0}^{\\infty}\\gamma^k R_{t+k+1}$ 是无穷级数，必须 $\\gamma<1$ 且奖励有界才能保证收敛；若取 $\\gamma=1$，累计回报一般发散（例如每步 $+1$），价值函数与贝尔曼方程都失去意义。$\\gamma$ 还表达\"未来奖励的现值\"，控制短视程度。</p><p><b>（iv）信念状态。</b>$b(s)=P[S_t=s\\mid H_t]$ 是给定历史后状态上的后验分布。执行动作 $a$、观测到 $o$ 后由贝叶斯公式更新：</p><p>$$b'(s')=\\eta\\,O(o\\mid s',a)\\sum_{s\\in\\mathcal S}T(s'\\mid s,a)\\,b(s),\\qquad \\eta=\\Big[\\sum_{s'}O(o\\mid s',a)\\sum_s T(s'\\mid s,a)b(s)\\Big]^{-1},$$</p><p>其中 $\\eta$ 是归一化常数。一句话理由：给定 $(b,a)$ 后，下一观测的分布只依赖 $(b,a)$，与更早的历史无关，因此 $b$ 是关于历史的充分统计量，POMDP 可化为以信念为（连续）状态的 MDP。</p>"
   },
   "key": "MDP 元组 + $p(s',r\\mid s,a)$ 归一化；马尔可夫性用条件独立表述；POMDP 的信念 $b(s)=P[S_t=s\\mid H_t]$ 是充分统计量。"
  },
  {
   "id": "B-S2-Q2",
   "set": "B",
   "section": 2,
   "type": "short",
   "points": 5,
   "en": {
    "stem": "<b>Policy improvement and dynamic programming.</b>",
    "sub": [
     "(i) State the policy improvement theorem.",
     "(ii) Give the two-line argument behind it (start from $q_\\pi(s,\\pi'(s))\\ge v_\\pi(s)$).",
     "(iii) Contrast policy iteration with value iteration: what is truncated, and what does each converge to?",
     "(iv) What is the cost of one synchronous sweep, and what is the curse of dimensionality?",
     "(v) Why does asynchronous DP (in-place, prioritised sweeping) still converge?"
    ]
   },
   "zh": {
    "stem": "<b>策略改进与动态规划。</b>",
    "sub": [
     "（i）叙述策略改进定理。",
     "（ii）给出它的两行证明思路（从 $q_\\pi(s,\\pi'(s))\\ge v_\\pi(s)$ 出发）。",
     "(iii) 对比策略迭代与值迭代：被截断的是什么？各自收敛到什么？",
     "(iv) 一次同步扫描的代价是多少？什么是维度灾难？",
     "(v) 为什么异步 DP（原地更新、优先扫描）仍然收敛？"
    ],
    "solution": "<p><b>（i）策略改进定理。</b>若对所有状态 $s$ 都有 $q_\\pi(s,\\pi'(s))\\ge v_\\pi(s)$，则新策略不差：$\\forall s,\\ v_{\\pi'}(s)\\ge v_\\pi(s)$；若某处严格不等，则相应状态的价值严格提升。取 $\\pi'$ 为关于 $q_\\pi$ 的贪心策略即满足前提，因此贪心改进单调提升策略，直到 $\\pi'=\\pi$ 时达到最优。</p><p><b>（ii）两行证明。</b>第一步：</p><p>$$v_{\\pi'}(s)=q_\\pi\\big(s,\\pi'(s)\\big)\\ge v_\\pi(s).$$</p><p>第二步把\"第一步的不等式\"沿时间归纳地套到后继状态上：</p><p>$$v_{\\pi'}(s)=E\\big[R_{t+1}+\\gamma v_{\\pi'}(S_{t+1})\\big]\\ \\ge\\ E\\big[R_{t+1}+\\gamma v_\\pi(S_{t+1})\\big]=v_\\pi(s),$$</p><p>其中 $\\ge$ 用的是 $v_{\\pi'}(S_{t+1})\\ge v_\\pi(S_{t+1})$ 逐点成立，最后一等号是 $v_\\pi$ 的贝尔曼期望方程。</p><p><b>（iii）两种迭代。</b>策略迭代 = <b>完整</b>策略评估（解线性方程组或迭代到收敛）+ 一次贪心改进，反复交替；有限 MDP 下经有限次迭代收敛到 $\\pi_*$。值迭代把策略评估<b>截断为一次</b>贝尔曼最优备份 $v_{k+1}(s)=\\max_a\\sum_{s',r}p(s',r\\mid s,a)[r+\\gamma v_k(s')]$，没有显式策略；它渐近收敛到 $v_*$，而关于 $v_k$ 的贪心策略往往在价值收敛之前就已稳定为 $\\pi_*$（DP 控制只需要动作排序正确）。</p><p><b>（iv）计算代价与维度灾难。</b>一次同步扫描需要对每个 $(s,a)$ 做一次期望备份，每个备份遍历 $|S|$ 个后继状态，共 $|S||A|$ 次备份、每次 $O(|S|)$，总代价 $O(|S|^2|A|)$。维度灾难指状态数随状态变量个数<b>指数增长</b>（$k$ 个二值变量就有 $2^k$ 个状态），全宽扫描在大问题上根本不可行，因此必须用采样/函数近似。</p><p><b>（v）异步 DP 的收敛。</b>贝尔曼备份在 $\\|\\cdot\\|_\\infty$ 下仍是 $\\gamma$-压缩映射；只要保证<b>每个状态被更新无穷多次</b>，任意顺序的备份复合仍收缩到同一不动点 $v_*$。原地（in-place）更新可立即使用新值，优先扫描按 $|$备份误差$|$ 排序、优先更新变化大的状态，两者在实践中单位计算量下收敛更快。</p>"
   },
   "key": "策略改进定理 = 贪心不差；策略迭代评估到收敛，值迭代截断为一次最优备份；一次扫描 $O(|S|^2|A|)$；异步 DP 靠压缩性收敛。"
  },
  {
   "id": "B-S2-Q3",
   "set": "B",
   "section": 2,
   "type": "short",
   "points": 5,
   "en": {
    "stem": "<b>Monte-Carlo control.</b>",
    "sub": [
     "(i) Why can greedy policy improvement over action values fail when the values are estimated by Monte-Carlo?",
     "(ii) Explain the exploring-starts assumption and give one practical drawback.",
     "(iii) Write the ε-greedy policy used in MC control, and explain why every pair $(s,a)$ is visited infinitely often.",
     "(iv) State the GLIE condition and give a schedule $\\varepsilon_k$ that satisfies it.",
     "(v) Distinguish first-visit from every-visit MC. Does every-visit MC control still converge with a GLIE schedule?"
    ]
   },
   "zh": {
    "stem": "<b>蒙特卡洛控制。</b>",
    "sub": [
     "（i）当动作价值由蒙特卡洛估计时，为什么基于贪心的策略改进可能失败？",
     "（ii）解释探索性起始（exploring starts）假设，并指出一个实际缺点。",
     "(iii) 写出 MC 控制中使用的 $\\varepsilon$-贪心策略，并说明为什么每个 $(s,a)$ 都会被访问无穷多次。",
     "(iv) 叙述 GLIE 条件并给出一个满足它的 $\\varepsilon_k$ 调度。",
     "(v) 区分首次访问 MC 与每次访问 MC；在 GLIE 调度下，每次访问 MC 控制仍收敛吗？"
    ],
    "solution": "<p><b>（i）贪心改进为何失败。</b>贪心改进需要知道<b>所有</b>动作的 $q$，但 MC 只用实际采样到的回报更新被尝试过的动作。一个从没被选过的动作会一直保留初始值（常设为乐观值），若它因此被贪心选中倒还好，反之若当前贪心动作的价值估计偏高，这个未试动作就永远不会被评估，策略可能卡在次优策略上——本质上是缺乏持续探索导致的\"自我强化\"。</p><p><b>（ii）探索性起始。</b>假设每一幕的起始状态-动作对 $(S_0,A_0)$ 以某种方式选择，使<b>所有</b> $(s,a)$ 都有非零概率作为起点，从而在无限多幕里每个对都被无限次评估。实际缺点：它要求能把环境重置到任意状态并强制首个动作，这在与真实物理环境/在线系统交互时通常做不到（也不允许），因此只具理论意义。</p><p><b>（iii）$\\varepsilon$-贪心保证覆盖。</b>设 $a^*=\\arg\\max_a Q(s,a)$：</p><p>$$\\pi(a\\mid s)=1-\\varepsilon+\\frac{\\varepsilon}{|\\mathcal A|}\\ (a=a^*),\\qquad \\pi(a\\mid s)=\\frac{\\varepsilon}{|\\mathcal A|}\\ (a\\ne a^*).$$</p><p>于是对任意 $(s,a)$ 都有 $\\pi(a\\mid s)\\ge\\varepsilon/|\\mathcal A|>0$；只要幕数趋于无穷且状态被反复到达，每个 $(s,a)$ 被访问的次数几乎必然趋于无穷，故所有 $q$ 都被一致估计。</p><p><b>（iv）GLIE。</b>① 每个状态-动作对被访问无穷多次 $\\lim_{k\\to\\infty}N_k(s,a)=\\infty$；② 策略在极限下变为贪心 $\\pi_k\\to\\pi_*$。例 $\\varepsilon_k=1/k$；一般取 $\\varepsilon_k\\to0$ 且 $\\sum_k\\varepsilon_k=\\infty$。</p><p><b>（v）首次/每次访问。</b>首次访问 MC 只用一幕中某 $(s,a)$ <b>第一次</b>出现之后的回报，估计无偏；每次访问 MC 用所有出现的回报，有限样本下有偏但一致（随访问次数增加而收敛到 $q_\\pi$），且方差更低、数据利用更充分。在 GLIE 调度下每次访问 MC 控制同样收敛到 $q_*$ 与 $\\pi_*$。</p>"
   },
   "key": "MC 未试动作保留初始值会卡次优；exploring starts 需能重置环境；$\\varepsilon$-贪心使 $\\pi(a\\mid s)\\ge\\varepsilon/|A|$；GLIE 下每次访问 MC 也收敛。"
  },
  {
   "id": "B-S2-Q4",
   "set": "B",
   "section": 2,
   "type": "short",
   "points": 5,
   "en": {
    "stem": "<b>DQN in practice and Rainbow.</b>",
    "sub": [
     "(i) Why does DQN stack the last $4$ frames instead of using a single frame? What does reward clipping to $[-1,1]$ change about the task?",
     "(ii) The target network is copied only every $C$ steps. Give two reasons why this stabilises training.",
     "(iii) Why is the Huber loss (clipping the TD error) preferred to the squared loss?",
     "(iv) List the six components of Rainbow, one line each.",
     "(v) Which component replaces ε-greedy exploration, and what does it learn? Which component predicts a distribution instead of a scalar value?"
    ]
   },
   "zh": {
    "stem": "<b>DQN 实践细节与 Rainbow。</b>",
    "sub": [
     "（i）DQN 为什么堆叠最近 4 帧而不是只用单帧？把奖励裁剪到 $[-1,1]$ 改变了任务的什么？",
     "(ii) 目标网络每 $C$ 步才复制一次，给出两条稳定训练的理由。",
     "(iii) 为什么用 Huber 损失（裁剪 TD 误差）而不用平方损失？",
     "(iv) 逐行列出 Rainbow 的六个组件。",
     "(v) 哪个组件替代了 $\\varepsilon$-贪心探索，它学到的是什么？哪个组件预测的是分布而不是标量价值？"
    ],
    "solution": "<p><b>（i）帧堆叠与奖励裁剪。</b>单帧画面看不出速度、方向、加速度（例如球往哪飞），因此观测不满足马尔可夫性；堆叠最近 4 帧把时间信息带进状态，使状态近似为信息状态（同时 Atari 的逐像素取最大值也消除 sprite 闪烁）。奖励裁剪到 $[-1,1]$ <b>改变了任务本身</b>：智能体最大化的是被裁剪后的（近似只看符号的）奖励，不再是原始分数；好处是不同游戏的 TD 目标与梯度尺度统一，可以用同一套超参数跨游戏训练，代价是丢失了奖励大小的信息（例如\"得 100 分\"和\"得 1 分\"被同等对待）。</p><p><b>（ii）目标网络为何稳定。</b>① 冻结的 $\\theta^-$ 把\"目标随参数一起移动的回归\"变成窗口内的普通监督回归，避免 moving-target；② 目标与正在被更新的参数解耦，切断了\"更新 → 目标变大 → 再更新\"的正反馈回路，显著抑制振荡与发散。（另可答：降低了连续样本间目标的相关性。）</p><p><b>（iii）Huber 损失。</b>训练初期或遇到罕见大奖励时 $|\\delta|$ 可能非常大，平方损失 $\\frac12\\delta^2$ 的梯度 $\\delta$ 会随之爆炸，一步更新就破坏网络。Huber 损失在 $|\\delta|$ 小时是二次的（保留精确梯度），大时变为线性的（梯度被截断为常数），从而给梯度设上限、对离群样本鲁棒。</p><p><b>（iv）Rainbow 六组件。</b></p><p>① <b>Double DQN</b>：解耦动作选择与评估，减轻过高估计。<br>② <b>Prioritised replay</b>：按 $|\\delta|^\\alpha$ 采样并用 IS 权重纠偏。<br>③ <b>Dueling</b>：拆分 $V$ 与 $A$，减均值保证可辨识。<br>④ <b>Multi-step returns</b>：用截断 $n$ 步回报（论文取 $n=3$）替代一步 TD 目标，平衡偏差/方差与传播速度。<br>⑤ <b>Distributional RL (C51)</b>：预测回报的分布（51 个原子上的分类分布），而非单个期望值。<br>⑥ <b>Noisy Nets</b>：给网络权重加可学习的高斯噪声，实现状态相关的探索。</p><p><b>（v）探索与分布。</b><b>Noisy Nets</b> 替代 $\\varepsilon$-贪心：噪声参数由梯度学习，探索随训练自适应地、按状态不同地衰减，不再需要手工调度 $\\varepsilon$。<b>C51</b>（分布式组件）预测的是回报在 51 个原子上的概率分布，而不是标量 $Q$ 值，动作选择仍用其期望。</p>"
   },
   "key": "叠帧恢复马尔可夫性；奖励裁剪改变任务但统一尺度；冻结目标避免移动靶；Huber 限梯度；Rainbow = DDQN+PER+Dueling+n-step+C51+Noisy Nets。"
  },
  {
   "id": "B-S2-Q5",
   "set": "B",
   "section": 2,
   "type": "short",
   "points": 5,
   "en": {
    "stem": "<b>Planning, Dyna and tree search.</b>",
    "sub": [
     "(i) Why does model-based RL have <i>two</i> sources of approximation error, while direct RL has one?",
     "(ii) Describe the Dyna-Q loop (three steps).",
     "(iii) What is Dyna-Q+, and which problem does the extra term solve?",
     "(iv) List the four stages of one Monte-Carlo tree search simulation.",
     "(v) Write the UCB1 rule used by UCT's tree policy and explain the role of the constant $c$."
    ]
   },
   "zh": {
    "stem": "<b>规划、Dyna 与树搜索。</b>",
    "sub": [
     "（i）为什么基于模型的 RL 有<b>两处</b>近似误差，而直接 RL 只有一处？",
     "(ii) 描述 Dyna-Q 循环的三个步骤。",
     "(iii) 什么是 Dyna-Q+？它新增的项解决了什么问题？",
     "(iv) 列出一次蒙特卡洛树搜索（MCTS）模拟的四个阶段。",
     "(v) 写出 UCT 树策略使用的 UCB1 规则，并说明常数 $c$ 的作用。"
    ],
    "solution": "<p><b>（i）两处误差。</b>基于模型的方法先从数据近似环境模型 $p(s',r\\mid s,a)$（<b>模型误差</b>），再在<b>这个近似出来的 MDP</b> 上近似价值函数（<b>价值误差</b>）；第二处误差还是相对于\"错误的 MDP\"衡量的，规划得越精确可能越忠实于错误模型。直接 RL 跳过建模，只有价值函数近似这一处误差，但直接面对真实环境。</p><p><b>（ii）Dyna-Q 三步。</b>① <b>直接 RL</b>：用真实转移 $(S,A,R,S')$ 做一次 Q-learning 更新。② <b>模型学习</b>：用同一转移更新 $\\hat R(S,A)$ 与 $\\hat P(S'\\mid S,A)$（表格情形直接记录）。③ <b>规划</b>：重复 $n$ 次，随机挑一个见过的 $(s,a)$，由模型采样出 $s',r$，把这条<b>模拟</b>转移再喂给同一个 Q-learning 更新。真实经验学习与模拟经验规划由此交织。</p><p><b>（iii）Dyna-Q+。</b>在规划用的模拟奖励上加探索奖励 $\\kappa\\sqrt{\\tau(s,a)}$，其中 $\\tau(s,a)$ 是该状态-动作对距上次被真实尝试以来的步数，$ \\kappa $ 是小系数。长时间没试过的对会被\"鼓励\"重新规划，从而能发现环境变化（例如原本堵住的路通了、奖励位置变了），解决的是<b>非平稳环境 / 探索不足</b>问题，而不是单纯的收敛速度。</p><p><b>（iv）MCTS 一次模拟的四阶段。</b>① <b>选择</b>（Selection）：从根按树策略（如 UCT）走到一个叶节点。② <b>扩展</b>（Expansion）：给该叶节点添加一个或多个新子节点。③ <b>模拟</b>（Simulation / rollout）：用默认（rollout）策略从新节点走到终止或规定深度，得到回报。④ <b>回溯</b>（Backup）：沿路径更新所有节点的访问计数与平均回报。</p><p><b>（v）UCB1 / UCT。</b>树策略在状态 $s$ 选</p><p>$$a^*=\\arg\\max_a\\Big[Q(s,a)+c\\sqrt{\\frac{\\ln N(s)}{N(s,a)}}\\Big].$$</p><p>第一项是利用（当前平均回报），第二项是探索（访问次数少的动作获得更大加成，未访问时视为无穷大）。常数 $c$ 控制探索-利用权衡：$c$ 越大越鼓励尝试少访问的分支、搜索越\"宽\"，$c$ 越小越快变贪心；在合适的 $c$ 下，随 $N(s)\\to\\infty$，UCT 收敛到最优树价值。</p>"
   },
   "key": "模型误差 + 价值误差；Dyna-Q = 直接 RL + 模型学习 + n 次规划；Dyna-Q+ 用 $\\kappa\\sqrt{\\tau}$ 应对环境变化；MCTS 四步；UCB1 的 $c$ 控制探索强度。"
  },
  {
   "id": "B-S3-Q1",
   "set": "B",
   "section": 3,
   "type": "calc",
   "points": 8,
   "en": {
    "stem": "<b>From dynamics to policy evaluation and improvement.</b> A courier moves between two zones; $T$ is terminal with $v(T)=0$ and $\\gamma=0.5$. The dynamics are:</p><p>$(1,F)\\to 2$ with prob. $1.0$, $r=1$; $(1,S)\\to 2$ with prob. $0.5$, $r=0$, and $(1,S)\\to 1$ with prob. $0.5$, $r=-1$; $(2,D)\\to T$ with prob. $0.5$, $r=6$, and $(2,D)\\to 2$ with prob. $0.5$, $r=0$; $(2,R)\\to 1$ with prob. $1.0$, $r=0$.</p><p>The behaviour to be evaluated is $\\pi(F\\,|\\,1)=\\pi(S\\,|\\,1)=0.5$ and $\\pi(D\\,|\\,2)=1$.",
    "sub": [
     "(a) Build the table of $p(s'\\,|\\,s,a)$ and $r(s,a)$ for all four state--action pairs.",
     "(b) Write the Bellman expectation equations for $v_\\pi(1)$ and $v_\\pi(2)$ and solve them.",
     "(c) Compute $q_\\pi(1,F)$, $q_\\pi(1,S)$, $q_\\pi(2,D)$ and $q_\\pi(2,R)$. Check that $v_\\pi(1)=\\sum_a\\pi(a\\,|\\,1)q_\\pi(1,a)$.",
     "(d) Give the greedy policy $\\pi'$ with respect to $v_\\pi$, and evaluate $\\pi'$ (i.e.\\ compute $v_{\\pi'}$).",
     "(e) Show that $\\pi'$ is optimal by evaluating $q_{\\pi'}$ for the two actions that $\\pi'$ does <i>not</i> choose, and state $v_*$."
    ]
   },
   "zh": {
    "stem": "<b>由动力学到策略评估与策略改进。</b>快递员在两个区域间移动；$T$ 为终止状态且 $v(T)=0$，$\\gamma=0.5$。动力学如下：</p><p>$(1,F)\\to 2$（概率 $1.0$，$r=1$）；$(1,S)\\to 2$（概率 $0.5$，$r=0$）与 $(1,S)\\to 1$（概率 $0.5$，$r=-1$）；$(2,D)\\to T$（概率 $0.5$，$r=6$）与 $(2,D)\\to 2$（概率 $0.5$，$r=0$）；$(2,R)\\to 1$（概率 $1.0$，$r=0$）。</p><p>待评估策略为 $\\pi(F\\,|\\,1)=\\pi(S\\,|\\,1)=0.5$，$\\pi(D\\,|\\,2)=1$。",
    "sub": [
     "（a）列出全部四个状态-动作对的 $p(s'\\,|\\,s,a)$ 与 $r(s,a)$。",
     "（b）写出 $v_\\pi(1)$ 与 $v_\\pi(2)$ 的贝尔曼期望方程并求解。",
     "（c）计算 $q_\\pi(1,F)$、$q_\\pi(1,S)$、$q_\\pi(2,D)$、$q_\\pi(2,R)$，并验证 $v_\\pi(1)=\\sum_a\\pi(a\\,|\\,1)q_\\pi(1,a)$。",
     "(d) 给出关于 $v_\\pi$ 的贪心策略 $\\pi'$，并评估 $\\pi'$（即计算 $v_{\\pi'}$）。",
     "(e) 计算 $\\pi'$ <b>未选择</b>的那两个动作的 $q_{\\pi'}$，据此证明 $\\pi'$ 最优，并写出 $v_*$。"
    ],
    "solution": "<p><b>（a）由联合动力学求 $p$ 与 $r$。</b>对 $r$ 求和得转移概率，用 $r$ 加权得期望奖励：</p><p>$(1,F)$：$p(2\\mid 1,F)=1$，$r(1,F)=1$。<br>$(1,S)$：$p(2\\mid 1,S)=0.5,\\ p(1\\mid 1,S)=0.5$，$r(1,S)=0.5(0)+0.5(-1)=-0.5$。<br>$(2,D)$：$p(T\\mid 2,D)=0.5,\\ p(2\\mid 2,D)=0.5$，$r(2,D)=0.5(6)+0.5(0)=3$。<br>$(2,R)$：$p(1\\mid 2,R)=1$，$r(2,R)=0$。</p><p><b>（b）列方程并求解。</b>状态 2 有自环（以 0.5 概率留在 2）：</p><p>$$v_\\pi(2)=0.5\\big(6+\\gamma\\cdot 0\\big)+0.5\\big(0+\\gamma v_\\pi(2)\\big)=3+0.25v_\\pi(2)\\ \\Longrightarrow\\ \\boxed{v_\\pi(2)=4}.$$</p><p>状态 1 用 $q_\\pi(1,F)=1+\\gamma v_\\pi(2)$ 与 $q_\\pi(1,S)=0.5(0+\\gamma v_\\pi(2))+0.5(-1+\\gamma v_\\pi(1))$，且 $\\pi$ 在状态 1 各取一半：</p><p>$$v_\\pi(1)=0.5\\big[1+0.5\\cdot4\\big]+0.5\\big[0.5(0.5\\cdot4)+0.5(-1+0.5v_\\pi(1))\\big]=1.75+0.125v_\\pi(1),$$</p><p>故 $\\boxed{v_\\pi(1)=2}$。综上 $v_\\pi=(2,\\,4)$。</p><p><b>（c）动作价值与校验。</b></p><p>$$q_\\pi(1,F)=1+0.5\\cdot4=3,\\qquad q_\\pi(1,S)=0.5(0.5\\cdot4)+0.5(-1+0.5\\cdot2)=1+0=1,$$</p><p>$$q_\\pi(2,D)=0.5(6)+0.5(0.5\\cdot4)=3+1=4,\\qquad q_\\pi(2,R)=0+0.5\\cdot2=1 .$$</p><p>验证：$0.5\\cdot3+0.5\\cdot1=2=v_\\pi(1)$ ✓，$\\pi(D\\mid2)=1$ 故 $v_\\pi(2)=q_\\pi(2,D)=4$ ✓。</p><p><b>（d）贪心策略及其评估。</b>状态 1 处 $3>1$ 取 $F$，状态 2 处 $4>1$ 取 $D$，即 $\\pi'=(F\\text{ at }1,\\ D\\text{ at }2)$。状态 2 的策略未变，故 $v_{\\pi'}(2)=4$；状态 1 现在必选 $F$：</p><p>$$v_{\\pi'}(1)=1+0.5\\cdot4=3,\\qquad v_{\\pi'}=(3,\\,4) .$$</p><p><b>（e）验证最优性。</b>只需检查 $\\pi'$ 未用的两个动作在 $\\pi'$ 下的价值：</p><p>$$q_{\\pi'}(1,S)=0.5(0+0.5\\cdot4)+0.5(-1+0.5\\cdot3)=1+0.25=1.25<3=v_{\\pi'}(1),$$</p><p>$$q_{\\pi'}(2,R)=0+0.5\\cdot3=1.5<4=v_{\\pi'}(2) .$$</p><p>没有任何动作能改进 $\\pi'$，由策略改进定理 $\\pi'=\\pi_*$，且 $\\boxed{v_*=(3,\\,4)}$。<b>注意：</b>验证时用的是新策略 $\\pi'$ 下的 $v_{\\pi'}$，不能继续用 $v_\\pi$。</p>"
   },
   "key": "先由 $p(s',r\\mid s,a)$ 求 $r(s,a)$；自环要保留 $\\gamma$ 项；验证最优必须用新策略下的 $v_{\\pi'}$ 计算未选动作的 $q$。"
  },
  {
   "id": "B-S3-Q2",
   "set": "B",
   "section": 3,
   "type": "calc",
   "points": 9,
   "en": {
    "stem": "<b>Policy iteration.</b> Consider $\\mathcal S=\\{1,2,3\\}$, $\\mathcal A=\\{L,R\\}$, $\\gamma=0.5$, with deterministic dynamics</p><p>$$(1,L)\\to 1,\\ r=1;\\quad (1,R)\\to 2,\\ r=0;\\quad (2,L)\\to 1,\\ r=0;\\quad (2,R)\\to 3,\\ r=0;\\quad (3,L)\\to 2,\\ r=0;\\quad (3,R)\\to 3,\\ r=3 .$$</p><p>Start from $\\pi_0=(L,\\,L,\\,R)$ (actions in states $1,2,3$).",
    "sub": [
     "(a) Write and solve the evaluation equations for $\\pi_0$. (Hint: state $3$ has a self-loop.)",
     "(b) Compute $q_{\\pi_0}(s,a)$ for all six pairs and give the improved policy $\\pi_1$.",
     "(c) Evaluate $\\pi_1$.",
     "(d) Compute $q_{\\pi_1}(s,a)$ and verify that no action can be improved, i.e.\\ $\\pi_1=\\pi_*$. Give $v_*$.",
     "(e) Now start instead from $v_0=(0,0,0)$ and run <i>two synchronous sweeps of value iteration</i>. What is the greedy policy after these two sweeps? Compare it with $\\pi_*$ and explain why DP control does not need the values to converge."
    ]
   },
   "zh": {
    "stem": "<b>策略迭代。</b>考虑 $\\mathcal S=\\{1,2,3\\}$，$\\mathcal A=\\{L,R\\}$，$\\gamma=0.5$，确定性动力学为</p><p>$$(1,L)\\to 1,\\ r=1;\\quad (1,R)\\to 2,\\ r=0;\\quad (2,L)\\to 1,\\ r=0;\\quad (2,R)\\to 3,\\ r=0;\\quad (3,L)\\to 2,\\ r=0;\\quad (3,R)\\to 3,\\ r=3 .$$</p><p>从 $\\pi_0=(L,\\,L,\\,R)$ 出发（依次是状态 $1,2,3$ 的动作）。",
    "sub": [
     "（a）写出并求解 $\\pi_0$ 的策略评估方程（提示：状态 3 有自环）。",
     "（b）计算全部六个 $q_{\\pi_0}(s,a)$，给出改进后的策略 $\\pi_1$。",
     "(c) 评估 $\\pi_1$。",
     "(d) 计算 $q_{\\pi_1}(s,a)$ 并验证没有动作能改进，即 $\\pi_1=\\pi_*$，写出 $v_*$。",
     "(e) 改为从 $v_0=(0,0,0)$ 出发做<b>两轮同步值迭代</b>扫描。两轮后的贪心策略是什么？与 $\\pi_*$ 比较，并解释为何 DP 控制不需要价值收敛。"
    ],
    "solution": "<p><b>（a）评估 $\\pi_0=(L,L,R)$。</b>状态 3 选 $R$ 是自环，奖励 3：$v(3)=3+0.5v(3)\\Rightarrow v(3)=6$；状态 1 选 $L$ 自环、奖励 1：$v(1)=1+0.5v(1)\\Rightarrow v(1)=2$；状态 2 选 $L$ 到 1、奖励 0：$v(2)=0.5v(1)=1$。故 $\\boxed{v_{\\pi_0}=(2,\\,1,\\,6)}$。</p><p><b>（b）六个动作价值，改进策略。</b>用 $q_{\\pi_0}(s,a)=r+0.5v_{\\pi_0}(s')$：</p><p>状态 1：$q(1,L)=1+0.5(2)=2$，$q(1,R)=0.5(1)=0.5$ → 取 $L$。<br>状态 2：$q(2,L)=0.5(2)=1$，$q(2,R)=0.5(6)=3$ → 取 $R$（改进）。<br>状态 3：$q(3,L)=0.5(1)=0.5$，$q(3,R)=3+0.5(6)=6$ → 取 $R$。</p><p>只有状态 2 改变（$3>1$），故 $\\boxed{\\pi_1=(L,\\,R,\\,R)}$。</p><p><b>（c）评估 $\\pi_1$。</b>状态 3 不变 $v(3)=6$；状态 2 现选 $R$ 到 3：$v(2)=0+0.5(6)=3$；状态 1 不变 $v(1)=1+0.5v(1)=2$。故 $\\boxed{v_{\\pi_1}=(2,\\,3,\\,6)}$，确实 $v_{\\pi_1}\\ge v_{\\pi_0}$。</p><p><b>（d）验证最优。</b></p><p>$$q_{\\pi_1}(1,L)=2,\\ q_{\\pi_1}(1,R)=0.5(3)=1.5;\\qquad q_{\\pi_1}(2,L)=0.5(2)=1,\\ q_{\\pi_1}(2,R)=0.5(6)=3;$$</p><p>$$q_{\\pi_1}(3,L)=0.5(3)=1.5,\\ q_{\\pi_1}(3,R)=3+0.5(6)=6 .$$</p><p>每一行的最大值都恰好落在 $\\pi_1$ 的动作上（$L,R,R$），故无改进空间：$\\pi_1=\\pi_*$，$\\boxed{v_*=(2,\\,3,\\,6)}$。</p><p><b>（e）两轮值迭代对照。</b>$v_{k+1}(s)=\\max_a[r+0.5v_k(s')]$，右端用旧值：</p><p>$$v_1(1)=\\max\\{1,0\\}=1,\\quad v_1(2)=\\max\\{0,0\\}=0,\\quad v_1(3)=\\max\\{0,3\\}=3;$$</p><p>$$v_2(1)=\\max\\{1+0.5(1),\\ 0.5(0)\\}=1.5,\\quad v_2(2)=\\max\\{0.5(1),\\ 0.5(3)\\}=1.5,$$</p><p>$$v_2(3)=\\max\\{0.5(0),\\ 3+0.5(3)\\}=4.5 .$$</p><p>基于 $v_2$：$q(1,L)=1.75>q(1,R)=0.75$；$q(2,L)=0.75<q(2,R)=2.25$；$q(3,L)=0.75<q(3,R)=5.25$，贪心策略已是 $(L,R,R)=\\pi_*$，尽管 $v_2=(1.5,1.5,4.5)\\ne v_*$。原因：DP 控制只需要各状态下动作的<b>相对排序</b>正确，排序往往在价值收敛之前就稳定下来；此后价值仍按几何速度继续逼近 $v_*$。</p>"
   },
   "key": "策略迭代：评估→改进→再评估，直到每行 $\\max$ 等于策略动作；值迭代两轮即可得到 $\\pi_*$，虽然 $v_2\\ne v_*$。"
  },
  {
   "id": "B-S3-Q3",
   "set": "B",
   "section": 3,
   "type": "calc",
   "points": 8,
   "en": {
    "stem": "<b>A risky action: the optimal value in closed form.</b> A single non-terminal state $1$ leads to the terminal state $T$ ($v(T)=0$), with $\\gamma=0.9$ and two actions:</p><p><i>safe</i>: go to $T$ and receive $r=4$; <i>risky</i>: with probability $p$ go to $T$ with $r=5$, with probability $1-p$ stay in state $1$ with $r=0$.",
    "sub": [
     "(a) Write the Bellman optimality equation for $v_*(1)$.",
     "(b) Take $p=0.5$. Compute $v_*(1)$ and give $\\pi_*$, assuming the risky action is used.",
     "(c) Find the critical probability $p^*$ at which the optimal action switches, and state which action is optimal for $p<p^*$ and for $p>p^*$",
     "(d) Interpret the factor $1/(1-\\gamma(1-p))$ that appears in your answer.",
     "(e) Starting from $v_0(1)=0$, compute the first two sweeps of value iteration and the greedy action after each sweep. Does a myopic first step recover $\\pi_*$?"
    ]
   },
   "zh": {
    "stem": "<b>风险动作：最优价值的闭式解。</b>只有一个非终止状态 1，可到终止状态 $T$（$v(T)=0$），$\\gamma=0.9$，两个动作：</p><p><i>safe</i>（稳妥）：到 $T$，得 $r=4$；<i>risky</i>（冒险）：以概率 $p$ 到 $T$ 得 $r=5$，以概率 $1-p$ 留在状态 1 得 $r=0$。",
    "sub": [
     "（a）写出 $v_*(1)$ 的贝尔曼最优方程。",
     "（b）取 $p=0.5$，在\"采用冒险动作\"的假设下计算 $v_*(1)$ 并给出 $\\pi_*$。",
     "(c) 求最优动作发生切换的临界概率 $p^*$，并说明 $p<p^*$ 与 $p>p^*$ 时哪个动作最优。",
     "(d) 解释答案中出现的因子 $1/(1-\\gamma(1-p))$ 的含义。",
     "(e) 从 $v_0(1)=0$ 出发，计算前两轮值迭代及每轮后的贪心动作。短视的第一步能得到 $\\pi_*$ 吗？"
    ],
    "solution": "<p><b>（a）贝尔曼最优方程。</b>稳妥动作立刻给 4；冒险动作的期望即时奖励是 $5p$，并以概率 $1-p$ 回到状态 1：</p><p>$$v_*(1)=\\max\\Big\\{4,\\ \\underbrace{5p+\\gamma(1-p)v_*(1)}_{\\text{risky}}\\Big\\},\\qquad \\gamma=0.9 .$$</p><p><b>（b）$p=0.5$。</b>若冒险，方程为 $v=2.5+0.9(0.5)v=2.5+0.45v$，解得 $v=2.5/0.55=50/11\\approx4.545>4$，与\"冒险更优\"的假设自洽。故 $\\pi_*=\\text{risky}$，$\\boxed{v_*(1)=50/11\\approx4.545}$。</p><p><b>（c）临界概率。</b>由 (a) 中冒险分支的闭式解 $v_{\\text{risky}}=\\dfrac{5p}{1-\\gamma(1-p)}=\\dfrac{5p}{0.1+0.9p}$，切换点满足它等于稳妥的 4：</p><p>$$4=\\frac{5p}{0.1+0.9p}\\ \\Longrightarrow\\ 0.4+3.6p=5p\\ \\Longrightarrow\\ \\boxed{p^*=\\frac{0.4}{1.4}=\\frac{2}{7}\\approx0.286}.$$</p><p>$p<2/7$ 时稳妥（safe）最优，$p>2/7$ 时冒险（risky）最优，$p=2/7$ 时两者并列。</p><p><b>（d）因子含义。</b>$1/(1-\\gamma(1-p))=1/0.55\\approx1.818$ 是<b>对状态 1 的期望访问次数</b>：每次失败（概率 $1-p$）都以折扣 $\\gamma$ 回到同一状态再试一次，形成几何级数 $1+\\gamma(1-p)+[\\gamma(1-p)]^2+\\cdots$。因此价值 =（期望访问次数）×（每次的期望即时奖励 $5p$）；有效折扣为 $\\gamma(1-p)=0.45$，可见\"折扣\"与\"失败概率\"在数值上起相同作用。</p><p><b>（e）值迭代前两轮。</b>$v_{k+1}(1)=\\max\\{4,\\ 2.5+0.45v_k(1)\\}$：</p><p>$$v_1(1)=\\max\\{4,\\ 2.5+0\\}=4\\quad(\\text{贪心：safe}),$$</p><p>$$v_2(1)=\\max\\{4,\\ 2.5+0.45\\cdot4=4.3\\}=4.3\\quad(\\text{贪心：risky}),$$</p><p>$$v_3=2.5+0.45\\cdot4.3=4.435\\to\\cdots\\to4.545 .$$</p><p>第一轮选的是 safe，<b>不能</b>得到 $\\pi_*$。原因：短视的第一步把\"失败后可以再试一次\"的<b>期权价值</b>当成 0（$v_0=0$），低估了冒险动作；只有当价值估计向后传播一步后，贪心动作才纠正过来。这正是自举/迭代把未来价值逐步传回来的作用。</p>"
   },
   "key": "$v_{\\text{risky}}=5p/(1-\\gamma(1-p))$；$1/(1-\\gamma(1-p))$ 是期望访问次数；临界 $p^*=2/7$；首轮短视会选错。"
  },
  {
   "id": "B-S4-Q1",
   "set": "B",
   "section": 4,
   "type": "calc",
   "points": 10,
   "en": {
    "stem": "<b>Off-policy learning and importance sampling.</b> The target policy is $\\pi(a_1\\,|\\,s)=0.75$, $\\pi(a_2\\,|\\,s)=0.25$ in every state; the behaviour policy is uniform, $b(a_1\\,|\\,s)=b(a_2\\,|\\,s)=0.5$. Take $\\gamma=0.5$ and consider the estimate of $V(s_0)$.</p><p><b>Episode 1:</b> $S_0=s_0$, then $(a_1,r_1=1)$, $(a_2,r_2=2)$, $(a_1,r_3=3)$, then termination.<br><b>Episode 2:</b> $S_0=s_0$, then $(a_1,r_1=2)$, $(a_2,r_2=2)$, then termination.",
    "sub": [
     "(a) Write the importance-sampling ratio $\\rho$ for a whole trajectory $S_0,A_0,R_1,\\dots,S_T$, and say precisely what it corrects.",
     "(b) For Episode 1 compute the per-step ratios, the return $G_0$, the ratio $\\rho_1$, and the ordinary importance-sampling estimate of $V(s_0)$.",
     "(c) For Episode 2 compute $G_0$ and $\\rho_2$, and then the <i>weighted</i> importance-sampling estimate of $V(s_0)$ that uses both episodes.",
     "(d) Write the per-decision importance-sampling TD(0) update for $V(S_t)$, give the three per-step ratios of Episode 1, and explain why it can be applied online, before the episode ends.",
     "(e) Which estimator has lower variance, ordinary or weighted importance sampling? Which one is biased, and why is it still preferred in practice?"
    ]
   },
   "zh": {
    "stem": "<b>离策略学习与重要性采样。</b>目标策略在每个状态下为 $\\pi(a_1\\,|\\,s)=0.75$、$\\pi(a_2\\,|\\,s)=0.25$；行为策略为均匀分布 $b(a_1\\,|\\,s)=b(a_2\\,|\\,s)=0.5$。取 $\\gamma=0.5$，要估计 $V(s_0)$。</p><p><b>第 1 幕：</b>$S_0=s_0$，随后 $(a_1,r_1=1)$、$(a_2,r_2=2)$、$(a_1,r_3=3)$，然后终止。<br><b>第 2 幕：</b>$S_0=s_0$，随后 $(a_1,r_1=2)$、$(a_2,r_2=2)$，然后终止。",
    "sub": [
     "（a）写出整条轨迹 $S_0,A_0,R_1,\\dots,S_T$ 的重要性采样比 $\\rho$，并准确说明它修正了什么。",
     "（b）对第 1 幕：计算逐步比值、回报 $G_0$、整条轨迹比 $\\rho_1$，以及 $V(s_0)$ 的<b>普通</b>重要性采样估计。",
     "（c）对第 2 幕：计算 $G_0$ 与 $\\rho_2$，再给出同时使用两幕的<b>加权</b>重要性采样估计。",
     "（d）写出逐决策重要性采样 TD(0) 的 $V(S_t)$ 更新式，给出第 1 幕的三个逐步比值，并说明为何它可以在幕结束前在线使用。",
     "(e) 普通与加权重要性采样哪个方差更低？哪个有偏？为什么实践中仍偏好它？"
    ],
    "solution": "<p><b>（a）重要性采样比。</b>对从 $t$ 开始的轨迹，</p><p>$$\\rho_{t:T-1}=\\prod_{k=t}^{T-1}\\frac{\\pi(A_k\\mid S_k)}{b(A_k\\mid S_k)}.$$</p><p>它是一个<b>换测度</b>（change of measure）因子：把行为策略 $b$ 下采到的轨迹概率比上目标策略 $\\pi$ 下的概率，从而把 $b$ 下的期望修正为 $\\pi$ 下的期望。不做修正，用采样回报平均出来的是 $V^b(s_0)$ 而不是 $V^\\pi(s_0)$。</p><p><b>（b）第 1 幕。</b>逐步比值：选 $a_1$ 时 $0.75/0.5=1.5$，选 $a_2$ 时 $0.25/0.5=0.5$。$\\gamma=0.5$，$|A|=3$ 步：</p><p>$$G_0=1+0.5\\cdot2+0.25\\cdot3=1+1+0.75=\\boxed{2.75},\\qquad \\rho_1=1.5\\times0.5\\times1.5=\\boxed{1.125}.$$</p><p>普通（ordinary）重要性采样估计为 $\\rho_1G_0=1.125\\times2.75=\\boxed{3.09375}$（只有一幕时即为此值；多幕则取 $\\frac1N\\sum\\rho_iG_i$）。</p><p><b>（c）第 2 幕与加权估计。</b>两步：</p><p>$$G_0^{(2)}=2+0.5\\cdot2=\\boxed{3},\\qquad \\rho_2=1.5\\times0.5=\\boxed{0.75}.$$</p><p>加权重要性采样（weighted IS）用比值作归一化权重：</p><p>$$\\hat V(s_0)=\\frac{\\sum_i\\rho_iG_i}{\\sum_i\\rho_i}=\\frac{1.125\\cdot2.75+0.75\\cdot3}{1.125+0.75}=\\frac{3.09375+2.25}{1.875}=\\frac{5.34375}{1.875}=\\boxed{2.85}.$$</p><p><b>（d）逐决策 IS 的 TD(0)。</b></p><p>$$V(S_t)\\leftarrow V(S_t)+\\alpha\\,\\rho_t\\,\\delta_t,\\qquad \\rho_t=\\frac{\\pi(A_t\\mid S_t)}{b(A_t\\mid S_t)},\\qquad \\delta_t=R_{t+1}+\\gamma V(S_{t+1})-V(S_t).$$</p><p>第 1 幕三个逐步比值依次为 $1.5,\\ 0.5,\\ 1.5$。它可以在线使用，是因为每一步只需要 $R_{t+1}$、$S_{t+1}$ 与<b>当前这一步</b>的比值 $\\rho_t$，不需要未来的动作或完整回报；未来的价值由 TD 目标 $V(S_{t+1})$ 自举给出。注意它与 (a) 中\"整条轨迹连乘\"的区别：逐决策版本把比值放进每一步的 TD 误差，而不是乘在最终回报上。</p><p><b>（e）方差与偏差。</b><b>加权</b> IS 方差低得多：权重归一化后和为 1，估计被 $\\max_i|G_i|$ 界定，不会因某个 $\\rho_i$ 爆炸而失控；但它在有限样本下<b>有偏</b>（分母是随机的，相当于比值估计），不过是一致估计（$N\\to\\infty$ 时偏差消失）。<b>普通</b> IS 无偏，但多个比值连乘会指数级膨胀或塌缩到 0，方差可能大到不可用（TD 情形甚至可能无限）。实践中通常偏好加权 IS，用一点可消失的偏差换取数量级更低的方差。</p>"
   },
   "key": "$\\rho=\\prod\\pi/b$ 换测度；普通 IS 无偏高方差，加权 IS 有偏低方差但一致；逐决策 IS 只需 $\\rho_t$ 可在线更新。"
  },
  {
   "id": "B-S4-Q2",
   "set": "B",
   "section": 4,
   "type": "calc",
   "points": 10,
   "en": {
    "stem": "<b>Linear function approximation and prioritised replay.</b> Values are approximated linearly, $\\hat v(s,w)=w^\\top\\phi(s)$, with $w=(0.5,\\,1.0)^\\top$ and features $\\phi(s_1)=(1,2)^\\top$, $\\phi(s_2)=(1,0)^\\top$.</p><p>Also, for action values, $\\hat q(s,a,w)=w^\\top x(s,a)$ with $w=(0.2,\\,-0.5)^\\top$, $x(s,a_1)=(1,0)^\\top$, $x(s,a_2)=(0,1)^\\top$, $x(s_2,b)=(1,1)^\\top$.</p><p>A replay buffer holds $N=4$ transitions with absolute TD errors $4,2,1,1$; priority exponent $\\alpha_{\\mathrm{pri}}=0.6$ and IS exponent $\\beta=0.4$.",
    "sub": [
     "(a) Compute $\\hat v(s_1,w)$ and $\\hat v(s_2,w)$.",
     "(b) One transition $(s_1,\\,r=1,\\,s_2)$ is observed with $\\gamma=0.9$, $\\alpha=0.1$. Compute the TD error and the semi-gradient TD(0) update of $w$. Give $\\hat v(s_1,w')$ and $\\hat v(s_2,w')$ after the update, and explain why $\\hat v(s_2)$ also changed.",
     "(c) Compute $\\hat q$ for the three pairs, then apply one semi-gradient SARSA update with the transition $(s,a_1,r=2,s_2)$ followed by action $b$, using $\\gamma=0.9$ and $\\alpha=0.5$.",
     "(d) Compute $p_i$, $P(i)$ and $w_i$ for the replay buffer. Which transition has the largest weight, and what is $\\sum_i p_i$ used for?",
     "(e) State the deadly triad. Which of its three ingredients are present in (a)--(b), and what happens if all three are present?"
    ]
   },
   "zh": {
    "stem": "<b>线性函数近似与优先回放。</b>价值用线性函数近似 $\\hat v(s,w)=w^\\top\\phi(s)$，其中 $w=(0.5,\\,1.0)^\\top$，特征 $\\phi(s_1)=(1,2)^\\top$、$\\phi(s_2)=(1,0)^\\top$。</p><p>动作价值另取 $\\hat q(s,a,w)=w^\\top x(s,a)$，其中 $w=(0.2,\\,-0.5)^\\top$，$x(s,a_1)=(1,0)^\\top$、$x(s,a_2)=(0,1)^\\top$、$x(s_2,b)=(1,1)^\\top$。</p><p>回放缓冲区有 $N=4$ 条转移，其绝对 TD 误差为 $4,2,1,1$；优先指数 $\\alpha_{\\mathrm{pri}}=0.6$，重要性采样指数 $\\beta=0.4$。",
    "sub": [
     "（a）计算 $\\hat v(s_1,w)$ 与 $\\hat v(s_2,w)$。",
     "（b）观测到一条转移 $(s_1,\\,r=1,\\,s_2)$，$\\gamma=0.9$，$\\alpha=0.1$。计算 TD 误差与 $w$ 的半梯度 TD(0) 更新，给出更新后的 $\\hat v(s_1,w')$ 与 $\\hat v(s_2,w')$，并解释为何 $\\hat v(s_2)$ 也变了。",
     "（c）计算三个状态-动作对的 $\\hat q$，再对转移 $(s,a_1,r=2,s_2)$ 且下一动作为 $b$ 做一次半梯度 SARSA 更新（$\\gamma=0.9$，$\\alpha=0.5$）。",
     "(d) 计算缓冲区各条转移的 $p_i$、$P(i)$ 与 $w_i$。哪条转移的权重最大？$\\sum_i p_i$ 起什么作用？",
     "(e) 叙述致命三要素（deadly triad）：(a)–(b) 中出现了其中哪几项？三者齐备时会怎样？"
    ],
    "solution": "<p><b>（a）线性读数。</b></p><p>$$\\hat v(s_1)=0.5\\cdot1+1.0\\cdot2=\\boxed{2.5},\\qquad \\hat v(s_2)=0.5\\cdot1+1.0\\cdot0=\\boxed{0.5}.$$</p><p><b>（b）TD 误差与半梯度更新。</b></p><p>$$\\delta=R+\\gamma\\hat v(s_2)-\\hat v(s_1)=1+0.9(0.5)-2.5=\\boxed{-1.05}.$$</p><p>半梯度 TD(0) 为 $w'=w+\\alpha\\delta\\phi(s_1)$（目标对 $w$ 的导数被忽略）：</p><p>$$w'=\\binom{0.5}{1.0}+0.1(-1.05)\\binom{1}{2}=\\binom{0.5-0.105}{1.0-0.21}=\\boxed{\\binom{0.395}{0.79}} .$$</p><p>更新后 $\\hat v(s_1)=0.395+0.79\\cdot2=\\boxed{1.975}$，$\\hat v(s_2)=0.395+0=\\boxed{0.395}$。$s_2$ 也变了，是因为两状态共享第一个特征 $\\phi_1=1$，改变 $w_1$ 会同时移动所有状态的估计 —— 这种<b>泛化</b>正是函数近似的目的（也因此它不是逐状态的独立备份）。</p><p><b>（c）动作价值与 SARSA 更新。</b></p><p>$$\\hat q(s,a_1)=0.2,\\qquad \\hat q(s,a_2)=-0.5,\\qquad \\hat q(s_2,b)=0.2-0.5=\\boxed{-0.3}.$$</p><p>SARSA 目标使用实际选取的下一动作 $b$：</p><p>$$\\delta=2+0.9(-0.3)-0.2=2-0.27-0.2=\\boxed{1.53},$$</p><p>$$w'=\\binom{0.2}{-0.5}+0.5(1.53)\\binom{1}{0}=\\boxed{\\binom{0.965}{-0.5}} .$$</p><p>只有 $x(s,a_1)=(1,0)$ 对应的分量被更新，$w_2$ 不变。</p><p><b>（d）优先级、采样概率与 IS 权重。</b>$\\alpha_{\\mathrm{pri}}=0.6$：</p><p>$$p_i=|\\delta_i|^{0.6}:\\quad 4^{0.6}=2.297,\\quad 2^{0.6}=1.516,\\quad 1,\\quad 1,\\qquad \\sum_i p_i=5.813 .$$</p><p>$$P(i)=\\frac{p_i}{\\sum_k p_k}=(0.395,\\ 0.261,\\ 0.172,\\ 0.172).$$</p><p>$\\beta=0.4$ 时</p><p>$$w_i=\\Big(\\frac{1}{N P(i)}\\Big)^{\\beta}=\\Big(\\frac{1}{4P(i)}\\Big)^{0.4}=(0.833,\\ 0.983,\\ 1.161,\\ 1.161).$$</p><p>权重最大的是两条 $|\\delta|=1$ 的转移：它们优先级最低、被采样最少，每次被采到时必须<b>上加权</b>才能保持更新无偏（否则估计会被高 TD 误差样本主导）。$\\sum_i p_i$ 是把优先级归一化为概率分布 $P(i)$ 的分母（实际由 sum-tree 增量维护）。</p><p><b>（e）致命三要素。</b>函数近似 + 自举（bootstrapping）+ 离策略数据。(a)–(b) 中有函数近似与自举，但转移来自当前策略、属同策略，因此线性 TD(0) 在足够小的 $\\alpha$ 下收敛到投影不动点。三者齐备时（例如带经验回放的线性/神经网络 Q-learning），即使函数类里有很好的近似，参数仍可能发散、价值趋于无穷。</p>"
   },
   "key": "半梯度 $w'=w+\\alpha\\delta\\phi(s)$；共享特征导致泛化；PER 的 $\\sum p_i$ 归一化，低优先样本 IS 权重大；deadly triad = FA + 自举 + 离策略。"
  },
  {
   "id": "B-S5-Q1",
   "set": "B",
   "section": 5,
   "type": "calc",
   "points": 10,
   "en": {
    "stem": "<b>Optimal stopping with a deadline.</b> An investor holds one unit of an asset and has three decision epochs, $t=1,2,3$. At each epoch she observes the current price and either <i>sells</i> (receiving that price, after which the process ends) or <i>holds</i> (the price then moves as described below). At $t=3$ she must sell. Prices evolve as follows, each branch with probability $\\tfrac12$:</p><p>$t=1$, price $4$: hold $\\to$ $6$ or $3$ at $t=2$.<br>$t=2$, price $6$: hold $\\to$ $9$ or $4$ at $t=3$.<br>$t=2$, price $3$: hold $\\to$ $5$ or $1$ at $t=3$.<br>$t=3$: must sell at the current price.",
    "sub": [
     "(a) Give the value at $t=3$ for each possible price.",
     "(b) Working backwards, compute the values $V_2(6)$ and $V_2(3)$ together with the optimal action at each price. Comment on the price $3$.",
     "(c) Compute $V_1(4)$ and the optimal action at $t=1$. Hence write down the complete optimal policy, and say whether it is stationary.",
     "(d) Now discount future rewards by $\\gamma=0.9$ per epoch. Redo (b) and (c) and state how the policy changes. Find the critical $\\gamma^*$ at which the decision at $t=2$ with price $6$ switches, and explain in one sentence why the finite-horizon optimal policy can depend on $t$."
    ]
   },
   "zh": {
    "stem": "<b>带截止期的最优停止。</b>投资者持有一单位资产，共有 $t=1,2,3$ 三个决策时刻。每个时刻观察当前价格，选择<b>卖出</b>（获得该价格，过程结束）或<b>持有</b>（价格按下面规律变化）；$t=3$ 必须卖出。价格演化如下，每个分支概率均为 $\\tfrac12$：</p><p>$t=1$、价格 $4$：持有 $\\to$ $t=2$ 价格为 $6$ 或 $3$。<br>$t=2$、价格 $6$：持有 $\\to$ $t=3$ 价格为 $9$ 或 $4$。<br>$t=2$、价格 $3$：持有 $\\to$ $t=3$ 价格为 $5$ 或 $1$。<br>$t=3$：必须按当前价格卖出。",
    "sub": [
     "（a）给出 $t=3$ 时每个可能价格对应的价值。",
     "（b）逆推计算 $V_2(6)$ 与 $V_2(3)$ 及各自的最优动作，并对价格 $3$ 作一点说明。",
     "（c）计算 $V_1(4)$ 与 $t=1$ 的最优动作；由此写出完整的最优策略，并说明它是否平稳。",
     "(d) 现在按每期 $\\gamma=0.9$ 对未来奖励打折。重做 (b)(c)，说明策略如何变化；求 $t=2$、价格 $6$ 处决策发生切换的临界 $\\gamma^*$，并用一句话解释有限时域的最优策略为何会依赖 $t$。"
    ],
    "solution": "<p><b>（a）终止时刻。</b>$t=3$ 必须卖出，价值就等于价格：</p><p>$$V_3(9)=9,\\qquad V_3(4)=4,\\qquad V_3(5)=5,\\qquad V_3(1)=1 .$$</p><p><b>（b）逆推到 $t=2$（无折扣）。</b>每个状态比较\"立即卖\"与\"持有的期望价值\"：</p><p>$$V_2(6)=\\max\\big\\{6,\\ 0.5\\cdot9+0.5\\cdot4=6.5\\big\\}=\\boxed{6.5}\\ \\Rightarrow\\ \\text{持有},$$</p><p>$$V_2(3)=\\max\\big\\{3,\\ 0.5\\cdot5+0.5\\cdot1=3\\big\\}=\\boxed{3}\\ \\Rightarrow\\ \\text{并列：卖或持有}.$$</p><p>价格 $3$ 处持有的期望恰好等于立刻卖出所得 3，两个动作并列最优：<b>价值唯一，但最优动作不唯一</b>。这也是\"最优价值唯一 ≠ 最优策略唯一\"的具体例子。</p><p><b>（c）逆推到 $t=1$ 与完整策略。</b>持有后以各 $1/2$ 到 $t=2$ 的价格 6 或 3，其价值取 (b) 的结果：</p><p>$$V_1(4)=\\max\\big\\{4,\\ 0.5\\cdot6.5+0.5\\cdot3=4.75\\big\\}=\\boxed{4.75}\\ \\Rightarrow\\ \\text{持有}.$$</p><p>完整最优策略：$t=1$（价格 4）持有；$t=2$ 价格 6 持有、价格 3 卖出或持有均可；$t=3$ 一律卖出。它是<b>非平稳</b>的：同一个价格在不同决策时刻可能对应不同动作，因此策略必须按 $t$ 索引（有限时域问题的典型特征）。</p><p><b>（d）加入 $\\gamma=0.9$ 折扣。</b>未来一期的价值要乘 $\\gamma$：</p><p>$$V_2(6)=\\max\\{6,\\ 0.9\\cdot6.5=5.85\\}=\\boxed{6}\\Rightarrow\\text{卖出},\\qquad V_2(3)=\\max\\{3,\\ 0.9\\cdot3=2.7\\}=\\boxed{3}\\Rightarrow\\text{卖出},$$</p><p>$$V_1(4)=\\max\\{4,\\ 0.9\\,(0.5\\cdot6+0.5\\cdot3)=0.9\\cdot4.5=4.05\\}=\\boxed{4.05}\\Rightarrow\\text{持有}.$$</p><p>注意 $t=1$ 的继续价值现在要用 $t=2$ 的\"卖出\"价格 6 与 3（因为折扣后 $t=2$ 已不再持有）。结论：$t=1$ 仍持有，但 $t=2$ 两处都提前一期卖出，价格 3 的并列消失。切换条件来自 $6=\\gamma\\cdot6.5$：</p><p>$$\\gamma^*=\\frac{6}{6.5}=\\frac{12}{13}\\approx0.923,\\qquad \\gamma<\\gamma^*\\ \\text{卖出},\\quad \\gamma>\\gamma^*\\ \\text{持有}.$$</p><p>一句话解释：随着截止期临近，\"继续持有\"的剩余机会越来越少，继续价值随时间 $t$ 下降，所以同一价格在不同时刻的最优动作可以不同；折扣只是进一步压缩未来价值、放大了这一效应。</p>"
   },
   "key": "有限时域用逆推归纳；价值唯一但动作可并列；折扣使提前卖出，临界 $\\gamma^*=12/13$；策略依赖 $t$ 故非平稳。"
  }
 ]
};
