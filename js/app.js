// 才干测评主逻辑
(function () {
    'use strict';

    const THEMES = {
        execution: {
            id: 'execution',
            name: '执行力',
            color: '#2563eb',
            description: '你善于把目标拆解成行动，并推动事情落地。在团队中，你是可靠的执行者。',
            tip: '发展建议：尝试在完成任务的同时记录流程，形成可复用的 SOP；适时放慢节奏，确保质量与速度平衡。',
            questions: [
                '我通常会为自己设定明确的短期目标，并按时完成。',
                '面对复杂任务时，我习惯先列出步骤再开始行动。',
                '当别人还在讨论时，我已经开始动手尝试了。',
                '我认为“做完”比“做到完美”更重要，先完成再优化。'
            ]
        },
        influence: {
            id: 'influence',
            name: '影响力',
            color: '#dc2626',
            description: '你乐于表达观点，能够带动他人情绪，在群体中有一定的号召力。',
            tip: '发展建议：练习倾听他人的反对意见，用数据和故事共同支撑观点，让影响力更有深度。',
            questions: [
                '我在小组讨论中经常主动发言，带动话题方向。',
                '我善于用语言和情绪感染身边的人。',
                '当团队意见不统一时，我愿意站出来协调并推动决策。',
                '我喜欢在公众场合分享自己的想法或作品。'
            ]
        },
        relationship: {
            id: 'relationship',
            name: '关系建立',
            color: '#16a34a',
            description: '你重视人与人之间的连接，善于营造信任、温暖的氛围。',
            tip: '发展建议：在维护关系的同时，学会设定边界；把同理心转化为帮助他人的具体行动。',
            questions: [
                '我很容易察觉别人的情绪变化，并及时关心他们。',
                '我认为良好的人际关系是完成任务的重要基础。',
                '在新环境中，我能较快地与他人建立信任。',
                '当朋友或同事遇到困难时，他们愿意向我倾诉。'
            ]
        },
        strategy: {
            id: 'strategy',
            name: '战略思维',
            color: '#9333ea',
            description: '你善于从全局看问题，能够发现趋势和长期方向。',
            tip: '发展建议：把宏大目标拆成可验证的小阶段；与执行力强的人合作，把愿景变为现实。',
            questions: [
                '我习惯在做决定前思考长期后果，而不只看眼前。',
                '我喜欢研究事物背后的规律和趋势。',
                '面对多个选择时，我能快速判断哪个更符合整体目标。',
                '我常常能提出与众不同的全局视角。'
            ]
        },
        learning: {
            id: 'learning',
            name: '学习力',
            color: '#0891b2',
            description: '你对新知识充满好奇，学习速度快，乐于持续升级自己。',
            tip: '发展建议：建立知识输出机制，比如做笔记、教别人；避免贪多，聚焦几个核心领域深耕。',
            questions: [
                '我对陌生领域充满好奇，愿意主动学习新知识。',
                '我能在较短时间内掌握一项新技能的基础。',
                '遇到失败时，我会把它当作学习机会来复盘。',
                '我经常阅读、听课或参加培训来提升自己。'
            ]
        },
        adaptability: {
            id: 'adaptability',
            name: '适应力',
            color: '#ea580c',
            description: '你能在变化中保持灵活，快速调整状态，是团队中的“稳定器”。',
            tip: '发展建议：在灵活应变的同时，保留一些核心原则和长期目标，避免被变化牵着走。',
            questions: [
                '当计划突然改变时，我能很快调整心态和行动。',
                '我享受充满不确定性的新环境和新挑战。',
                '面对压力时，我通常能保持冷静并找到出路。',
                '我认为“随机应变”比“严格执行计划”更重要。'
            ]
        },
        analytics: {
            id: 'analytics',
            name: '分析力',
            color: '#4f46e5',
            description: '你擅长逻辑推理和数据判断，能把复杂问题拆解清楚。',
            tip: '发展建议：在分析之余关注人的因素；用可视化方式呈现结论，让非专业人士也能理解。',
            questions: [
                '我喜欢用数据和事实来支撑自己的观点。',
                '面对复杂问题，我能快速找到关键变量并理清关系。',
                '我擅长发现别人忽略的细节或潜在风险。',
                '在做决定前，我倾向于收集足够信息再下结论。'
            ]
        },
        creativity: {
            id: 'creativity',
            name: '创造力',
            color: '#db2777',
            description: '你思维活跃，能跳出常规提出新点子，为团队带来新鲜视角。',
            tip: '发展建议：为创意设置可行性检验；与善于执行的人搭档，让好点子真正落地。',
            questions: [
                '我经常能想到别人想不到的解决方案。',
                '我喜欢把不同领域的知识组合起来产生新想法。',
                '我不喜欢墨守成规，总想尝试新的方法。',
                '在头脑风暴中，我通常是点子最多的人之一。'
            ]
        }
    };

    const LIKERT_SCALE = [
        { value: 1, label: '非常不符合' },
        { value: 2, label: '不太符合' },
        { value: 3, label: '一般' },
        { value: 4, label: '比较符合' },
        { value: 5, label: '非常符合' }
    ];

    // 状态
    let quizQuestions = [];
    let currentIndex = 0;
    let answers = [];

    // DOM 元素
    const views = {
        welcome: document.getElementById('welcome-view'),
        quiz: document.getElementById('quiz-view'),
        result: document.getElementById('result-view'),
        about: document.getElementById('about-view')
    };

    const els = {
        startBtn: document.getElementById('start-btn'),
        prevBtn: document.getElementById('prev-btn'),
        nextBtn: document.getElementById('next-btn'),
        restartBtn: document.getElementById('restart-btn'),
        downloadBtn: document.getElementById('download-btn'),
        progressFill: document.getElementById('progress-fill'),
        questionCounter: document.getElementById('question-counter'),
        themeBadge: document.getElementById('theme-badge'),
        questionText: document.getElementById('question-text'),
        optionsContainer: document.getElementById('options-container'),
        topThemesList: document.getElementById('top-themes-list'),
        themeDetails: document.getElementById('theme-details'),
        radarCanvas: document.getElementById('radar-chart')
    };

    // 初始化
    function init() {
        bindEvents();
    }

    function bindEvents() {
        els.startBtn.addEventListener('click', startQuiz);
        els.prevBtn.addEventListener('click', prevQuestion);
        els.nextBtn.addEventListener('click', nextQuestion);
        els.restartBtn.addEventListener('click', startQuiz);
        els.downloadBtn.addEventListener('click', downloadReport);

        document.getElementById('nav-home').addEventListener('click', (e) => {
            e.preventDefault();
            switchView('welcome');
        });
        document.getElementById('nav-report').addEventListener('click', (e) => {
            e.preventDefault();
            if (answers.length === 0) {
                alert('请先完成测评再查看报告。');
                return;
            }
            switchView('result');
        });
        document.getElementById('nav-about').addEventListener('click', (e) => {
            e.preventDefault();
            switchView('about');
        });
        document.querySelector('.about-back').addEventListener('click', () => switchView('welcome'));
    }

    function switchView(viewName) {
        Object.values(views).forEach(v => v.classList.remove('active'));
        views[viewName].classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function generateQuestions() {
        const list = [];
        Object.values(THEMES).forEach(theme => {
            theme.questions.forEach((text, idx) => {
                list.push({
                    id: `${theme.id}-${idx}`,
                    themeId: theme.id,
                    themeName: theme.name,
                    text: text
                });
            });
        });
        // Fisher-Yates 洗牌
        for (let i = list.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [list[i], list[j]] = [list[j], list[i]];
        }
        return list;
    }

    function startQuiz() {
        quizQuestions = generateQuestions();
        currentIndex = 0;
        answers = new Array(quizQuestions.length).fill(null);
        switchView('quiz');
        renderQuestion();
    }

    function renderQuestion() {
        const q = quizQuestions[currentIndex];
        const progress = ((currentIndex + 1) / quizQuestions.length) * 100;

        els.progressFill.style.width = `${progress}%`;
        els.questionCounter.textContent = `第 ${currentIndex + 1} / ${quizQuestions.length} 题`;
        els.themeBadge.textContent = q.themeName;
        els.questionText.textContent = q.text;
        els.optionsContainer.innerHTML = '';

        LIKERT_SCALE.forEach(opt => {
            const optionEl = document.createElement('div');
            optionEl.className = 'option';
            if (answers[currentIndex] === opt.value) {
                optionEl.classList.add('selected');
            }
            optionEl.innerHTML = `
                <span class="option-radio"></span>
                <span class="option-text">${opt.label}</span>
            `;
            optionEl.addEventListener('click', () => selectOption(opt.value));
            els.optionsContainer.appendChild(optionEl);
        });

        els.prevBtn.disabled = currentIndex === 0;
        updateNextButton();
    }

    function selectOption(value) {
        answers[currentIndex] = value;
        const options = els.optionsContainer.querySelectorAll('.option');
        options.forEach((el, idx) => {
            el.classList.toggle('selected', LIKERT_SCALE[idx].value === value);
        });
        updateNextButton();

        // 自动前进，提升体验（最后一题除外）
        if (currentIndex < quizQuestions.length - 1) {
            setTimeout(nextQuestion, 250);
        }
    }

    function updateNextButton() {
        const hasAnswer = answers[currentIndex] !== null;
        if (currentIndex === quizQuestions.length - 1) {
            els.nextBtn.textContent = hasAnswer ? '查看报告' : '下一题';
        } else {
            els.nextBtn.textContent = '下一题';
        }
        els.nextBtn.disabled = !hasAnswer;
    }

    function nextQuestion() {
        if (currentIndex < quizQuestions.length - 1) {
            currentIndex++;
            renderQuestion();
        } else {
            showResults();
        }
    }

    function prevQuestion() {
        if (currentIndex > 0) {
            currentIndex--;
            renderQuestion();
        }
    }

    function calculateScores() {
        const scores = {};
        Object.values(THEMES).forEach(t => {
            scores[t.id] = { theme: t, total: 0, count: 0, max: t.questions.length * 5 };
        });

        quizQuestions.forEach((q, idx) => {
            const val = answers[idx] || 0;
            scores[q.themeId].total += val;
            scores[q.themeId].count++;
        });

        return Object.values(scores).map(s => ({
            ...s.theme,
            rawScore: s.total,
            percentage: Math.round((s.total / s.max) * 100)
        })).sort((a, b) => b.percentage - a.percentage);
    }

    function showResults() {
        const results = calculateScores();
        renderTopThemes(results);
        renderThemeDetails(results);
        drawRadarChart(results);
        switchView('result');
    }

    function renderTopThemes(results) {
        els.topThemesList.innerHTML = '';
        results.slice(0, 5).forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="theme-name">${item.name}</span>
                <span class="theme-score">${item.percentage}%</span>
            `;
            els.topThemesList.appendChild(li);
        });
    }

    function renderThemeDetails(results) {
        els.themeDetails.innerHTML = '';
        results.forEach(item => {
            const div = document.createElement('div');
            div.className = 'theme-detail';
            div.innerHTML = `
                <h4>${item.name}</h4>
                <div class="score-bar">
                    <div class="score-fill" style="width: ${item.percentage}%;"></div>
                </div>
                <p>${item.description}</p>
                <div class="tip">${item.tip}</div>
            `;
            els.themeDetails.appendChild(div);
        });
    }

    function drawRadarChart(results) {
        const canvas = els.radarCanvas;
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        const width = rect.width;
        const height = rect.height;
        const centerX = width / 2;
        const centerY = height / 2 + 10;
        const radius = Math.min(width, height) / 2 - 50;
        const count = results.length;
        const angleStep = (Math.PI * 2) / count;

        ctx.clearRect(0, 0, width, height);

        // 绘制网格
        const levels = 5;
        ctx.strokeStyle = '#e5e7eb';
        ctx.lineWidth = 1;
        for (let level = 1; level <= levels; level++) {
            ctx.beginPath();
            for (let i = 0; i < count; i++) {
                const angle = i * angleStep - Math.PI / 2;
                const r = (radius * level) / levels;
                const x = centerX + Math.cos(angle) * r;
                const y = centerY + Math.sin(angle) * r;
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.closePath();
            ctx.stroke();
        }

        // 绘制轴线
        for (let i = 0; i < count; i++) {
            const angle = i * angleStep - Math.PI / 2;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(x, y);
            ctx.strokeStyle = '#e5e7eb';
            ctx.stroke();

            // 标签
            const labelR = radius + 24;
            const lx = centerX + Math.cos(angle) * labelR;
            const ly = centerY + Math.sin(angle) * labelR;
            ctx.fillStyle = '#4b5563';
            ctx.font = '12px sans-serif';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(results[i].name, lx, ly);
        }

        // 绘制数据区域
        ctx.beginPath();
        for (let i = 0; i < count; i++) {
            const angle = i * angleStep - Math.PI / 2;
            const r = (results[i].percentage / 100) * radius;
            const x = centerX + Math.cos(angle) * r;
            const y = centerY + Math.sin(angle) * r;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fillStyle = 'rgba(37, 99, 235, 0.2)';
        ctx.fill();
        ctx.strokeStyle = '#2563eb';
        ctx.lineWidth = 2;
        ctx.stroke();

        // 绘制数据点
        for (let i = 0; i < count; i++) {
            const angle = i * angleStep - Math.PI / 2;
            const r = (results[i].percentage / 100) * radius;
            const x = centerX + Math.cos(angle) * r;
            const y = centerY + Math.sin(angle) * r;
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fillStyle = '#2563eb';
            ctx.fill();
        }
    }

    function downloadReport() {
        const results = calculateScores();
        const dateStr = new Date().toLocaleString('zh-CN');
        let text = `才干测评报告\n生成时间：${dateStr}\n\n`;
        text += 'TOP 5 核心才干\n';
        results.slice(0, 5).forEach((item, idx) => {
            text += `${idx + 1}. ${item.name} — ${item.percentage}%\n`;
        });
        text += '\n各维度详情\n';
        results.forEach(item => {
            text += `\n【${item.name}】${item.percentage}%\n`;
            text += `${item.description}\n`;
            text += `${item.tip}\n`;
        });

        const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `才干测评报告_${new Date().toISOString().slice(0, 10)}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // 页面加载时初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
