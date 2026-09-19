/*
 * PayTrack AI Assistant
 * ----------------------
 * A fully self-contained chat assistant — no API, no API key, no network
 * calls of any kind. It answers in two ways:
 *
 *  1. Live data questions ("what's pending", "last payment", "this month's
 *     total"...) are answered directly from the same localStorage data
 *     paytrack.js already saves.
 *  2. Everything else (how-tos, small talk, greetings, jokes, etc.) is
 *     matched against window.PayTrackAIKnowledgeBase, a plain data file
 *     of question patterns -> response(s) — see ai-knowledge-base.js.
 *     That file must be loaded before this one.
 *
 * This file is intentionally independent from paytrack.js internals (no
 * shared variables/imports) so it can't break existing app logic. It reads
 * the same localStorage/sessionStorage keys paytrack.js uses.
 */
(function () {
    'use strict';

    const AI_HISTORY_STORAGE_PREFIX = 'paytrackAiHistory_';

    /* ---------------------------------------------------------------- */
    /*  Data access (reads the same storage keys paytrack.js writes to)  */
    /* ---------------------------------------------------------------- */

    function getContext() {
        try {
            const projectId = sessionStorage.getItem('currentProjectId');
            if (!projectId) return null;

            const allProjects = JSON.parse(localStorage.getItem('allTrackerProjects')) || [];
            const project = allProjects.find(p => p.id == projectId);

            const settings = JSON.parse(localStorage.getItem(`project_${projectId}_settings`)) || {};
            const expenseMode = !!settings.expenseMode;
            const dataKey = expenseMode ? `project_${projectId}_expense` : `project_${projectId}_installment`;
            const state = JSON.parse(localStorage.getItem(dataKey)) || {
                totalAmount: 0, paidAmount: 0, pendingAmount: 0, payments: [], projectName: ''
            };

            const global = JSON.parse(localStorage.getItem('dashboardGlobalSettings')) || {};
            const currencySymbol = global.currencySymbol || '$';

            return {
                projectId,
                projectName: (project && project.name) || state.projectName || 'your project',
                expenseMode,
                state,
                payments: Array.isArray(state.payments) ? state.payments : [],
                currencySymbol
            };
        } catch (e) {
            console.error('AI assistant: failed to read app data', e);
            return null;
        }
    }

    function money(ctx, amount) {
        const n = Number(amount) || 0;
        return `${ctx.currencySymbol} ${new Intl.NumberFormat().format(Math.round(n * 100) / 100)}`;
    }

    function isSameMonth(dateStr, ref) {
        const d = new Date(dateStr);
        return !isNaN(d) && d.getFullYear() === ref.getFullYear() && d.getMonth() === ref.getMonth();
    }

    /* ---------------------------------------------------------------- */
    /*  Local rule-based NLU — answers questions straight from the data  */
    /* ---------------------------------------------------------------- */

    function localAnswer(rawQuery) {
        const q = rawQuery.trim().toLowerCase();
        const ctx = getContext();

        if (!ctx) {
            return "I can't find any project data yet. Set up a project first, and I'll be able to answer questions about it.";
        }

        const payments = ctx.payments;
        const has = (...words) => words.some(w => q.includes(w));

        // Greeting — kept here (rather than the knowledge base file) since
        // it's personalized with the live project name.
        if (/^(hi|hello|hey|salaam|assalam)\b/.test(q)) {
            return `Hey! I'm your PayTrack assistant for **${ctx.projectName}**. Ask me things like "what's my pending amount", "last payment", or "how much did I pay this month".`;
        }

        // Project name
        if (has('project name', 'which project')) {
            return `You're currently viewing **${ctx.projectName}**.`;
        }

        // Finished / complete
        if (has('finished', 'complete', 'is it done', 'fully paid', 'paid off')) {
            const done = ctx.state.totalAmount > 0 && ctx.state.paidAmount >= ctx.state.totalAmount - 0.1;
            return done
                ? `Yes — ${ctx.projectName} is fully paid off! 🎉`
                : `Not yet. ${money(ctx, ctx.state.pendingAmount)} is still remaining.`;
        }

        // Progress
        if (has('progress', 'percent', '%')) {
            const pct = ctx.state.totalAmount > 0 ? (ctx.state.paidAmount / ctx.state.totalAmount) * 100 : 0;
            return `You're at ${pct.toFixed(1)}% progress on ${ctx.projectName}.`;
        }

        // Count
        if (has('how many payment', 'how many transaction', 'number of payment', 'number of transaction', 'total transactions')) {
            return `You have ${payments.length} recorded ${payments.length === 1 ? 'transaction' : 'transactions'}.`;
        }

        // Last / most recent
        if (has('last payment', 'latest payment', 'recent payment', 'last transaction', 'latest transaction')) {
            if (!payments.length) return "You don't have any payments recorded yet.";
            const sorted = [...payments].sort((a, b) => new Date(b.paymentDate) - new Date(a.paymentDate));
            const p = sorted[0];
            return `Your most recent entry: ${money(ctx, p.paymentAmount)} on ${p.paymentDate}${p.description ? ` — "${p.description}"` : ''}.`;
        }

        // Biggest / smallest
        if (has('biggest payment', 'largest payment', 'highest payment')) {
            if (!payments.length) return "You don't have any payments recorded yet.";
            const p = [...payments].sort((a, b) => b.paymentAmount - a.paymentAmount)[0];
            return `Your biggest payment was ${money(ctx, p.paymentAmount)} on ${p.paymentDate}${p.description ? ` — "${p.description}"` : ''}.`;
        }
        if (has('smallest payment', 'lowest payment')) {
            if (!payments.length) return "You don't have any payments recorded yet.";
            const p = [...payments].sort((a, b) => a.paymentAmount - b.paymentAmount)[0];
            return `Your smallest payment was ${money(ctx, p.paymentAmount)} on ${p.paymentDate}${p.description ? ` — "${p.description}"` : ''}.`;
        }

        // Average
        if (has('average', 'avg')) {
            if (!payments.length) return "You don't have any payments recorded yet.";
            const avg = payments.reduce((s, p) => s + (Number(p.paymentAmount) || 0), 0) / payments.length;
            return `Your average payment is ${money(ctx, avg)} across ${payments.length} entries.`;
        }

        // This month
        if (has('this month', 'current month')) {
            const now = new Date();
            const sum = payments.filter(p => isSameMonth(p.paymentDate, now)).reduce((s, p) => s + (Number(p.paymentAmount) || 0), 0);
            const count = payments.filter(p => isSameMonth(p.paymentDate, now)).length;
            return `This month you've recorded ${count} ${count === 1 ? 'entry' : 'entries'} totaling ${money(ctx, sum)}.`;
        }

        // Last month
        if (has('last month', 'previous month')) {
            const ref = new Date();
            ref.setMonth(ref.getMonth() - 1);
            const sum = payments.filter(p => isSameMonth(p.paymentDate, ref)).reduce((s, p) => s + (Number(p.paymentAmount) || 0), 0);
            const count = payments.filter(p => isSameMonth(p.paymentDate, ref)).length;
            return `Last month you had ${count} ${count === 1 ? 'entry' : 'entries'} totaling ${money(ctx, sum)}.`;
        }

        // This year
        if (has('this year', 'current year')) {
            const year = new Date().getFullYear();
            const filtered = payments.filter(p => new Date(p.paymentDate).getFullYear() === year);
            const sum = filtered.reduce((s, p) => s + (Number(p.paymentAmount) || 0), 0);
            return `In ${year} you've recorded ${filtered.length} ${filtered.length === 1 ? 'entry' : 'entries'} totaling ${money(ctx, sum)}.`;
        }

        // Category breakdown (expense mode)
        if (has('category', 'categories', 'top spending', 'spend the most')) {
            if (!payments.length) return "You don't have any payments recorded yet.";
            const byCat = {};
            payments.forEach(p => {
                const c = p.category || 'Uncategorized';
                byCat[c] = (byCat[c] || 0) + (Number(p.paymentAmount) || 0);
            });
            const sorted = Object.entries(byCat).sort((a, b) => b[1] - a[1]);
            const top = sorted.slice(0, 3).map(([c, amt]) => `${c}: ${money(ctx, amt)}`).join(', ');
            return `Top categories — ${top}.`;
        }

        // Pending / remaining / owe / due / balance
        if (has('pending', 'remaining', 'owe', 'due', 'left', 'balance')) {
            return `Pending amount for ${ctx.projectName}: ${money(ctx, ctx.state.pendingAmount)}.`;
        }

        // Paid / received / income
        if (has('paid', 'received', 'income')) {
            return `Paid amount so far: ${money(ctx, ctx.state.paidAmount)}.`;
        }

        // Total
        if (has('total', 'overall', 'summary', 'how much is')) {
            const pct = ctx.state.totalAmount > 0 ? (ctx.state.paidAmount / ctx.state.totalAmount) * 100 : 0;
            return `**${ctx.projectName}** — Total: ${money(ctx, ctx.state.totalAmount)} · Paid: ${money(ctx, ctx.state.paidAmount)} · Pending: ${money(ctx, ctx.state.pendingAmount)} (${pct.toFixed(1)}% complete).`;
        }

        // Keyword search in descriptions
        const searchMatch = q.match(/(?:about|for|containing|search)\s+(.+)/);
        if (searchMatch) {
            const term = searchMatch[1].trim();
            const found = payments.filter(p => (p.description || '').toLowerCase().includes(term) || (p.category || '').toLowerCase().includes(term));
            if (found.length) {
                const lines = found.slice(0, 5).map(p => `• ${money(ctx, p.paymentAmount)} on ${p.paymentDate}${p.description ? ` — "${p.description}"` : ''}`).join('\n');
                return `Found ${found.length} matching ${found.length === 1 ? 'entry' : 'entries'}:\n${lines}`;
            }
            return `I couldn't find any entries matching "${term}".`;
        }

        return null; // no local match
    }

    function fallbackAnswer() {
        const variants = [
            "I'm not sure about that one yet. Try asking about your total, paid, or pending amounts, payment history, or monthly totals.",
            "Hmm, I don't have an answer for that one. I'm best with questions about your payments, totals, and progress — give one of those a try?",
            "I didn't quite catch that. You can ask me things like \"what's pending\", \"last payment\", or \"how do I add a payment\"."
        ];
        return variants[Math.floor(Math.random() * variants.length)];
    }

    /* ---------------------------------------------------------------- */
    /*  Knowledge-base matching — general Q&A that doesn't depend on     */
    /*  live project data (how-tos, small talk, etc). Data lives in      */
    /*  ai-knowledge-base.js, loaded before this file.                   */
    /* ---------------------------------------------------------------- */

    function matchKnowledgeBase(rawQuery) {
        const kb = window.PayTrackAIKnowledgeBase;
        if (!Array.isArray(kb) || !kb.length) return null;

        const q = ' ' + rawQuery.trim().toLowerCase().replace(/[.,!?]+$/g, '') + ' ';
        const qTrimmed = q.trim();

        let best = null;
        let bestScore = 0;

        for (const entry of kb) {
            if (!entry || !Array.isArray(entry.patterns) || !Array.isArray(entry.responses) || !entry.responses.length) continue;
            for (const pattern of entry.patterns) {
                const p = String(pattern).toLowerCase();
                if (!p) continue;
                const isExact = qTrimmed === p;
                const isPhraseMatch = q.includes(' ' + p + ' ') || q.startsWith(p + ' ') || q.endsWith(' ' + p);
                const isSubstring = !isPhraseMatch && q.includes(p);
                if (!isExact && !isPhraseMatch && !isSubstring) continue;

                // Longer, more specific phrases win over short/generic ones;
                // an exact whole-message match wins over everything.
                const score = (isExact ? 100 : 0) + p.split(' ').length;
                if (score > bestScore) {
                    bestScore = score;
                    best = entry;
                }
            }
        }

        if (!best) return null;
        const responses = best.responses;
        return responses[Math.floor(Math.random() * responses.length)];
    }

    /* ---------------------------------------------------------------- */
    /*  Chat history persistence (per project, local only)               */
    /* ---------------------------------------------------------------- */

    function historyKey() {
        const projectId = sessionStorage.getItem('currentProjectId') || 'global';
        return `${AI_HISTORY_STORAGE_PREFIX}${projectId}`;
    }

    function loadHistory() {
        try {
            return JSON.parse(localStorage.getItem(historyKey())) || [];
        } catch (e) {
            return [];
        }
    }

    function saveHistory(history) {
        try {
            localStorage.setItem(historyKey(), JSON.stringify(history.slice(-40)));
        } catch (e) { /* ignore quota errors */ }
    }

    /* ---------------------------------------------------------------- */
    /*  UI wiring                                                        */
    /* ---------------------------------------------------------------- */

    function injectMarkup() {
        if (document.getElementById('aiAssistantBtn')) return;

        const btn = document.createElement('button');
        btn.id = 'aiAssistantBtn';
        btn.type = 'button';
        btn.setAttribute('aria-label', 'Open AI Assistant');
        btn.innerHTML = '<i class="fas fa-robot"></i>';
        document.body.appendChild(btn);

        const panel = document.createElement('div');
        panel.id = 'aiAssistantPanel';
        panel.className = 'hidden';
        panel.innerHTML = `
            <div class="ai-panel-header">
                <div class="ai-panel-title">
                    <i class="fas fa-robot"></i>
                    <span>PayTrack AI</span>
                    <span class="ai-status-dot" title="Online"></span>
                </div>
                <div class="ai-panel-actions">
                    <button type="button" id="aiVoiceModeBtn" aria-label="Live voice conversation" title="Start live voice conversation"><i class="fas fa-phone"></i></button>
                    <button type="button" id="aiPanelCloseBtn" aria-label="Close chat" title="Close"><i class="fas fa-times"></i></button>
                </div>
            </div>
            <div id="aiChatMessages" class="ai-chat-messages">
                <div id="aiSmokeContainer" class="ai-smoke-container hidden">
                    <div class="ai-smoke-cloud c1"></div>
                    <div class="ai-smoke-cloud c2"></div>
                    <div class="ai-smoke-cloud c3"></div>
                    <div class="ai-smoke-cloud c4"></div>
                    <div class="ai-smoke-cloud c5"></div>
                </div>
                <div class="ai-chat-messages-inner" id="aiChatMessagesInner"></div>
            </div>
            <div id="aiListeningIndicator" class="ai-listening-indicator hidden">
                <div class="ai-listening-bars"><span></span><span></span><span></span><span></span></div>
                <span id="aiListeningText">Listening…</span>
            </div>
            <div id="aiSpeakingIndicator" class="ai-speaking-indicator hidden">
                <div class="ai-speaking-bars"><span></span><span></span><span></span><span></span></div>
                <span id="aiSpeakingText">Speaking…</span>
                <button type="button" id="aiStopSpeakingBtn" aria-label="Stop speaking" title="Stop speaking"><i class="fas fa-stop"></i></button>
            </div>
            <div id="aiSuggestionChips" class="ai-suggestion-chips"></div>
            <form id="aiChatForm" class="ai-chat-form">
                <div class="ai-chat-form-inner">
                    <button type="button" id="aiMicBtn" aria-label="Voice input" title="Speak your message"><i class="fas fa-microphone"></i></button>
                    <input type="text" id="aiChatInput" placeholder="Ask about your payments..." autocomplete="off" />
                    <button type="submit" id="aiChatSendBtn" aria-label="Send" title="Send"><i class="fas fa-paper-plane"></i></button>
                </div>
            </form>
        `;
        document.body.appendChild(panel);
    }

    function addMessageToUI(container, role, text) {
        const wrap = document.createElement('div');
        wrap.className = `ai-msg ai-msg-${role}`;
        const bubble = document.createElement('div');
        bubble.className = 'ai-bubble';
        bubble.innerHTML = formatText(text);
        wrap.appendChild(bubble);
        container.appendChild(wrap);
        const scrollEl = container.closest('.ai-chat-messages') || container;
        scrollEl.scrollTop = scrollEl.scrollHeight;
        return wrap;
    }

    function formatText(text) {
        const escaped = String(text)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
        return escaped
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n/g, '<br>');
    }

    function showTyping(container) {
        const wrap = document.createElement('div');
        wrap.className = 'ai-msg ai-msg-assistant ai-typing';
        wrap.innerHTML = '<div class="ai-bubble"><span class="ai-dot"></span><span class="ai-dot"></span><span class="ai-dot"></span></div>';
        container.appendChild(wrap);
        const scrollEl = container.closest('.ai-chat-messages') || container;
        scrollEl.scrollTop = scrollEl.scrollHeight;
        return wrap;
    }

    const SUGGESTIONS = [
        "What's my total?",
        "How much is pending?",
        'Last payment?',
        'This month summary'
    ];

    function renderSuggestions(container, onPick) {
        container.innerHTML = '';
        SUGGESTIONS.forEach(s => {
            const chip = document.createElement('button');
            chip.type = 'button';
            chip.className = 'ai-chip';
            chip.textContent = s;
            chip.addEventListener('click', () => onPick(s));
            container.appendChild(chip);
        });
    }

    function initAssistant() {
        injectMarkup();

        const btn = document.getElementById('aiAssistantBtn');
        const panel = document.getElementById('aiAssistantPanel');
        const closeBtn = document.getElementById('aiPanelCloseBtn');
        const messagesEl = document.getElementById('aiChatMessagesInner');
        const chipsEl = document.getElementById('aiSuggestionChips');
        const form = document.getElementById('aiChatForm');
        const input = document.getElementById('aiChatInput');
        const sendBtn = document.getElementById('aiChatSendBtn');
        const micBtn = document.getElementById('aiMicBtn');
        const listeningIndicator = document.getElementById('aiListeningIndicator');
        const listeningText = document.getElementById('aiListeningText');
        const voiceModeBtn = document.getElementById('aiVoiceModeBtn');
        const speakingIndicator = document.getElementById('aiSpeakingIndicator');
        const stopSpeakingBtn = document.getElementById('aiStopSpeakingBtn');
        const smokeContainer = document.getElementById('aiSmokeContainer');

        let history = loadHistory();
        const STOP_SIGNAL = Symbol('stopped');
        let cancelThinking = null;
        let isGenerating = false;

        function setGeneratingUI(generating) {
            isGenerating = generating;
            if (generating) {
                sendBtn.classList.add('ai-send-btn-stop');
                sendBtn.innerHTML = '<i class="fas fa-pause"></i>';
                sendBtn.setAttribute('aria-label', 'Stop generating');
                sendBtn.title = 'Stop generating';
            } else {
                sendBtn.classList.remove('ai-send-btn-stop');
                sendBtn.innerHTML = '<i class="fas fa-paper-plane"></i>';
                sendBtn.setAttribute('aria-label', 'Send');
                sendBtn.title = 'Send';
            }
        }

        function stopGenerating() {
            if (cancelThinking) cancelThinking();
        }

        // Simulates the assistant "thinking" for a moment before replying —
        // scaled roughly to how long the reply is — so it feels less like
        // an instant lookup and more like a real response being composed.
        // Cancellable via the pause button (or closing the panel).
        function thinkingDelay(replyText) {
            return new Promise((resolve, reject) => {
                const ms = Math.max(350, Math.min(1600, 300 + String(replyText).length * 8));
                const timer = setTimeout(() => {
                    cancelThinking = null;
                    resolve();
                }, ms);
                cancelThinking = () => {
                    clearTimeout(timer);
                    cancelThinking = null;
                    reject(STOP_SIGNAL);
                };
            });
        }

        function renderHistory() {
            messagesEl.innerHTML = '';
            if (!history.length) {
                const ctx = getContext();
                const name = ctx ? ctx.projectName : 'your project';
                addMessageToUI(messagesEl, 'assistant', `Hi! I'm your PayTrack assistant for **${name}**. Ask me about your totals, payments, or progress.`);
            } else {
                history.forEach(m => addMessageToUI(messagesEl, m.role, m.text));
            }
        }

        function openPanel() {
            panel.classList.remove('hidden');
            btn.classList.add('ai-btn-active');
            document.body.classList.add('ai-panel-open');
            renderHistory();
            renderSuggestions(chipsEl, (text) => { input.value = text; handleSend(); });
            setTimeout(() => input.focus(), 150);
        }

        function closePanel() {
            panel.classList.add('hidden');
            btn.classList.remove('ai-btn-active');
            document.body.classList.remove('ai-panel-open');
            stopListening();
            stopSpeaking();
            setLiveMode(false);
            stopGenerating();
        }

        btn.addEventListener('click', () => {
            if (panel.classList.contains('hidden')) openPanel(); else closePanel();
        });
        closeBtn.addEventListener('click', closePanel);

        async function handleSend() {
            const text = input.value.trim();
            if (!text) return;
            input.value = '';

            addMessageToUI(messagesEl, 'user', text);
            history.push({ role: 'user', text });
            saveHistory(history);

            const typingEl = showTyping(messagesEl);
            const replyText = localAnswer(text) || matchKnowledgeBase(text) || fallbackAnswer();

            setGeneratingUI(true);
            let wasStopped = false;
            try {
                await thinkingDelay(replyText);
            } catch (e) {
                if (e === STOP_SIGNAL) {
                    wasStopped = true;
                } else {
                    throw e;
                }
            }
            setGeneratingUI(false);
            typingEl.remove();

            if (wasStopped) {
                // User pressed pause mid-response — don't add a reply or
                // speak anything, just leave the conversation as-is.
                return;
            }

            addMessageToUI(messagesEl, 'assistant', replyText);
            history.push({ role: 'assistant', text: replyText });
            saveHistory(history);

            // In live conversation mode, speak the reply aloud. The mic is
            // opened at the same time (not after), so if the user starts
            // talking while the assistant is still mid-sentence, the
            // recognition 'result' handler below will cut the assistant
            // off and hand control back to the user automatically.
            if (liveMode) {
                startListening();
                speak(replyText, () => {
                    if (liveMode && !panel.classList.contains('hidden') && !isListening) {
                        startListening();
                    }
                });
            }
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (isGenerating) {
                stopGenerating();
                return;
            }
            handleSend();
        });

        /* ------------------------------------------------------------ */
        /*  Text-to-speech: speaks assistant replies out loud             */
        /* ------------------------------------------------------------ */

        const speechSynthesisSupported = 'speechSynthesis' in window;
        let currentUtterance = null;

        function speak(text, onDone) {
            if (!speechSynthesisSupported) {
                if (onDone) onDone();
                return;
            }
            // Cancel anything already playing before starting the new reply.
            window.speechSynthesis.cancel();

            const cleanText = String(text)
                .replace(/\*\*(.+?)\*\*/g, '$1')
                .replace(/^[•\-]\s*/gm, '')
                .replace(/\n+/g, '. ')
                .trim();

            if (!cleanText) {
                if (onDone) onDone();
                return;
            }

            const utter = new SpeechSynthesisUtterance(cleanText);
            const lang = document.documentElement.lang || 'en-US';
            utter.lang = lang;
            utter.rate = 1;
            utter.pitch = 1;

            const pickVoice = () => {
                const voices = window.speechSynthesis.getVoices();
                if (!voices || !voices.length) return null;
                return voices.find(v => v.lang === lang) ||
                    voices.find(v => v.lang.split('-')[0] === lang.split('-')[0]) ||
                    null;
            };
            const preferredVoice = pickVoice();
            if (preferredVoice) utter.voice = preferredVoice;

            currentUtterance = utter;
            setSpeakingUI(true);

            utter.onend = () => {
                currentUtterance = null;
                setSpeakingUI(false);
                if (onDone) onDone();
            };
            utter.onerror = () => {
                currentUtterance = null;
                setSpeakingUI(false);
                if (onDone) onDone();
            };

            window.speechSynthesis.speak(utter);
        }

        function stopSpeaking() {
            if (speechSynthesisSupported && window.speechSynthesis.speaking) {
                window.speechSynthesis.cancel();
            }
            currentUtterance = null;
            setSpeakingUI(false);
        }

        function setSpeakingUI(active) {
            speakingIndicator.classList.toggle('hidden', !active);
            // Smoke drifts faster while the assistant is actually talking.
            smokeContainer.classList.toggle('ai-smoke-fast', active);
        }

        stopSpeakingBtn.addEventListener('click', () => {
            stopSpeaking();
        });

        /* ------------------------------------------------------------ */
        /*  Live conversation mode: continuous listen → reply → speak    */
        /*  → listen loop, so the user can hold a hands-free voice chat  */
        /* ------------------------------------------------------------ */

        let liveMode = false;

        function setLiveMode(on) {
            liveMode = on;
            voiceModeBtn.classList.toggle('ai-voicemode-active', liveMode);
            voiceModeBtn.title = liveMode ? 'End live voice conversation' : 'Start live voice conversation';
            voiceModeBtn.innerHTML = liveMode ? '<i class="fas fa-phone-slash"></i>' : '<i class="fas fa-phone"></i>';
            // The ambient green smoke only drifts while a live conversation
            // is active, and speeds up automatically whenever the
            // assistant is speaking (handled in setSpeakingUI).
            smokeContainer.classList.toggle('hidden', !liveMode);
            if (!liveMode) {
                smokeContainer.classList.remove('ai-smoke-fast');
                stopListening();
                stopSpeaking();
            }
        }

        voiceModeBtn.addEventListener('click', () => {
            if (voiceModeBtn.disabled) return;
            if (liveMode) {
                setLiveMode(false);
            } else {
                setLiveMode(true);
                showNotificationSafe('Live conversation started — just speak, I\u2019ll reply out loud.', 'info');
                if (!isListening) startListening();
            }
        });

        /* ------------------------------------------------------------ */
        /*  Voice input: real-time transcription + auto-send on silence  */
        /* ------------------------------------------------------------ */

        const SpeechRecognitionCtor = window.SpeechRecognition || window.webkitSpeechRecognition;
        const SILENCE_TIMEOUT_MS = 2000;

        let recognition = null;
        let isListening = false;
        let silenceTimer = null;
        let finalTranscript = '';
        let manuallyStopped = false;

        if (!SpeechRecognitionCtor) {
            micBtn.classList.add('ai-mic-unsupported');
            micBtn.disabled = true;
            micBtn.title = 'Voice input is not supported on this browser';
            voiceModeBtn.classList.add('ai-mic-unsupported');
            voiceModeBtn.disabled = true;
            voiceModeBtn.title = 'Live voice conversation is not supported on this browser';
        } else if (!speechSynthesisSupported) {
            voiceModeBtn.classList.add('ai-mic-unsupported');
            voiceModeBtn.disabled = true;
            voiceModeBtn.title = 'Live voice conversation is not supported on this browser';
        } else {
            recognition = new SpeechRecognitionCtor();
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = (document.documentElement.lang || 'en-US');

            // Voice commands that interrupt the assistant mid-sentence
            // during a live conversation. Simply talking no longer cuts
            // the assistant off — only one of these phrases does.
            const STOP_COMMANDS = [
                'stop', 'stop it', 'stop please', 'please stop', 'stop talking',
                'wait', 'wait wait', 'hold on', 'hold up', 'pause',
                'shut up', 'quiet', 'enough', "that's enough", 'okay stop', 'ok stop', 'cancel'
            ];

            const isStopCommand = (text) => {
                const t = String(text || '').trim().toLowerCase().replace(/[.,!?]+$/g, '');
                if (!t) return false;
                return STOP_COMMANDS.some(p => t === p || t.startsWith(p + ' ') || t.endsWith(' ' + p));
            };

            recognition.addEventListener('result', (event) => {
                // While the assistant is talking, the mic can pick up its
                // own voice through the speaker (acoustic echo) and
                // mistake it for user speech. To avoid the assistant
                // "hearing itself" and looping on its own reply, ignore
                // everything during that window except an explicit stop
                // command — don't accumulate any of it into the transcript.
                const aiSpeaking = liveMode && speechSynthesisSupported && window.speechSynthesis.speaking;

                let interim = '';
                for (let i = event.resultIndex; i < event.results.length; i++) {
                    const transcriptPiece = event.results[i][0].transcript;

                    if (aiSpeaking) {
                        if (isStopCommand(transcriptPiece)) {
                            stopSpeaking();
                            finalTranscript = '';
                            input.value = '';
                            resetSilenceTimer();
                            return;
                        }
                        // Not a stop command — discard, don't add to transcript.
                        continue;
                    }

                    if (event.results[i].isFinal) {
                        finalTranscript += transcriptPiece + ' ';
                    } else {
                        interim += transcriptPiece;
                    }
                }

                if (aiSpeaking) return;

                // Show live transcript (final + interim) in the message box in real time
                input.value = (finalTranscript + interim).trim();
                resetSilenceTimer();
            });

            recognition.addEventListener('error', (event) => {
                console.error('AI assistant: speech recognition error', event.error);
                if (event.error === 'no-speech' || event.error === 'audio-capture') {
                    // keep listening state handled by onend
                    return;
                }
                stopListening();
                if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
                    showNotificationSafe('Microphone access was blocked. Please allow mic permission to use voice input.', 'error');
                }
            });

            recognition.addEventListener('end', () => {
                // If it ended on its own (e.g. browser timeout) but user hasn't
                // manually stopped and there's no pending silence auto-send,
                // just reflect the stopped state in the UI.
                if (isListening && !manuallyStopped) {
                    setListeningUI(false);
                    isListening = false;
                    clearSilenceTimer();
                }
            });

            micBtn.addEventListener('click', () => {
                // Barge-in: tapping the mic while the assistant is talking
                // interrupts it so the user can jump straight back in.
                if (speechSynthesisSupported && window.speechSynthesis.speaking) {
                    stopSpeaking();
                }
                if (isListening) {
                    manuallyStopped = true;
                    stopListening();
                    if (liveMode) setLiveMode(false);
                } else {
                    startListening();
                }
            });
        }

        function startListening() {
            if (!recognition || isListening) return;
            try {
                finalTranscript = input.value ? input.value + ' ' : '';
                manuallyStopped = false;
                recognition.start();
                isListening = true;
                setListeningUI(true);
                resetSilenceTimer();
            } catch (e) {
                console.error('AI assistant: could not start speech recognition', e);
            }
        }

        function stopListening() {
            clearSilenceTimer();
            if (recognition && isListening) {
                manuallyStopped = true;
                try { recognition.stop(); } catch (e) { /* ignore */ }
            }
            isListening = false;
            setListeningUI(false);
        }

        function resetSilenceTimer() {
            clearSilenceTimer();
            silenceTimer = setTimeout(() => {
                // 2 seconds of no new speech: stop listening and auto-send
                const hasText = input.value.trim().length > 0;
                if (!hasText && liveMode) {
                    // Live conversation mode: the user just hasn't started
                    // talking yet — keep the mic open and keep waiting
                    // instead of giving up like a one-off voice input.
                    resetSilenceTimer();
                    return;
                }
                stopListening();
                if (hasText) handleSend();
            }, SILENCE_TIMEOUT_MS);
        }

        function clearSilenceTimer() {
            if (silenceTimer) {
                clearTimeout(silenceTimer);
                silenceTimer = null;
            }
        }

        function setListeningUI(active) {
            micBtn.classList.toggle('ai-mic-listening', active);
            micBtn.innerHTML = active ? '<i class="fas fa-stop"></i>' : '<i class="fas fa-microphone"></i>';
            micBtn.title = active ? 'Stop listening' : 'Speak your message';
            listeningIndicator.classList.toggle('hidden', !active);
            if (active) {
                listeningText.textContent = liveMode
                    ? 'Listening… (live conversation)'
                    : 'Listening… (auto-sends after a pause)';
            }
        }

        function showNotificationSafe(message, type) {
            if (typeof window.showNotification === 'function') {
                window.showNotification(message, type);
            } else {
                console.warn(message);
            }
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAssistant);
    } else {
        initAssistant();
    }
})();