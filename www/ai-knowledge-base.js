/*
 * PayTrack AI — Knowledge Base (BILINGUAL: English + Urdu)
 * ---------------------------------------------------------
 * Supports both English and Pakistani Urdu responses.
 * Users can switch languages by saying:
 *   - "Urdu mein bolo" / "Pakistani Urdu" / "اردو میں بات کرو"
 *   - "Speak English" / "English" / "Talk in English"
 * 
 * Structure: each entry has:
 *   - patterns: English variations
 *   - urduPatterns: Urdu variations (including common misspellings)
 *   - responses: English responses
 *   - urduResponses: Urdu responses
 *   - category: for debugging (optional)
 * 
 * To add a new intent, just add an object to the array below.
 */

window.PayTrackAIKnowledgeBase = [

    /* ================================================================
     * LANGUAGE SWITCH INTENTS (SPECIAL — Handled first)
     * ================================================================ */

    {
        category: 'language_switch',
        patterns: [
            'urdu', 'urdu mein', 'urdu mein bolo', 'pakistani urdu',
            'urdu me', 'urdu ma', 'اردو', 'اردو میں', 'اردو میں بات کرو',
            'speak urdu', 'talk in urdu', 'urdu language'
        ],
        urduPatterns: [
            'urdu', 'urdu mein', 'urdu mein bolo', 'pakistani urdu',
            'urdu me', 'urdu ma', 'اردو', 'اردو میں', 'اردو میں بات کرو',
            'speak urdu', 'talk in urdu', 'urdu language'
        ],
        responses: [
            "Alright! I'll now speak in Pakistani Urdu. آپ اردو میں سوال پوچھ سکتے ہیں۔",
            "Switching to Urdu! میں اب اردو میں جواب دوں گا۔",
            "Urdu mode activated! برائے مہربانی اردو میں سوال کریں۔"
        ],
        urduResponses: [
            "ٹھیک ہے! اب میں پاکستانی اردو میں بات کروں گا۔ آپ اردو میں سوال پوچھ سکتے ہیں۔",
            "اردو موڈ آن! میں اب اردو میں جواب دوں گا۔",
            "اردو موڈ فعال! برائے مہربانی اردو میں سوال کریں۔"
        ]
    },
    {
        category: 'language_switch',
        patterns: [
            'english', 'speak english', 'talk in english',
            'english mein', 'english me', 'انگلش', 'انگریزی'
        ],
        urduPatterns: [
            'english', 'speak english', 'talk in english',
            'english mein', 'english me', 'انگلش', 'انگریزی'
        ],
        responses: [
            "Sure! I'll now respond in English. Feel free to ask anything!",
            "Switching to English! How can I help you?",
            "English mode activated! What would you like to know?"
        ],
        urduResponses: [
            "ٹھیک ہے! اب میں انگریزی میں جواب دوں گا۔ آپ کچھ بھی پوچھ سکتے ہیں!",
            "انگریزی موڈ آن! میں آپ کی کیسے مدد کر سکتا ہوں؟",
            "انگریزی موڈ فعال! آپ کیا جاننا چاہیں گے؟"
        ]
    },

    /* ================================================================
     * PAYMENT QUERIES (Bilingual)
     * ================================================================ */

    {
        category: 'payment_total',
        patterns: [
            'total', 'total amount', 'total payments', 'total spending',
            'total expense', 'total paid', 'how much total', 'what is total',
            'show total', 'tell me total', 'total so far', 'overall total',
            'grand total', 'sum', 'sum of payments', 'total kitna hai',
            'kul kitna', 'total kya hai', 'kitna total'
        ],
        urduPatterns: [
            'کل', 'کل رقم', 'کل ادائیگیاں', 'کل خرچ', 'کل اخراجات',
            'کل کتنا', 'کل کتنا ہوا', 'کل ادائیگی', 'سب ملا کر',
            'کل کتنا ادا کیا', 'ٹوٹل', 'ٹوٹل کتنا', 'مجموعہ',
            'کل رقم کتنی ہے', 'سب جمع', 'کل خرچہ'
        ],
        responses: [
            "Your total payments so far are **{total}**. Want to see a breakdown by month or category?",
            "You've paid **{total}** in total across all transactions. Would you like to see the pending amount as well?",
            "The overall total is **{total}**. If you want more detail, I can show you payment progress or pending amounts."
        ],
        urduResponses: [
            "آپ کی کل ادائیگیاں **{total}** ہیں۔ کیا آپ مہینے یا زمرے کے لحاظ سے تفصیل دیکھنا چاہیں گے؟",
            "آپ نے تمام لین دین میں کل **{total}** ادا کیے ہیں۔ کیا آپ زیر التواء رقم بھی دیکھنا چاہیں گے؟",
            "مجموعی رقم **{total}** ہے۔ اگر آپ مزید تفصیل چاہیں تو میں ادائیگی کی پیشرفت یا زیر التواء رقم دکھا سکتا ہوں۔"
        ]
    },
    {
        category: 'payment_pending',
        patterns: [
            'pending', 'pending amount', 'remaining', 'how much pending',
            'what is pending', 'show pending', 'tell me pending',
            'not paid', 'unpaid', 'balance', 'balance due',
            'remaining amount', 'what do i owe', 'how much i owe',
            'outstanding', 'due amount', 'pending kitna hai',
            'baqi kitna hai', 'reh gaya', 'abhi baqi'
        ],
        urduPatterns: [
            'زیر التواء', 'بقایا', 'باقی رقم', 'کتنا باقی ہے',
            'ادھورا', 'ادائیگی باقی', 'بقایا جات', 'باقی کتنا',
            'جو ادا نہیں ہوا', 'غیر ادا شدہ', 'بیلنس',
            'باقی رقم کتنی ہے', 'مجھ پر کتنا باقی ہے',
            'ابھی کتنا دینا ہے', 'پینڈنگ', 'باقی ہے'
        ],
        responses: [
            "Your pending amount is **{pending}**. Would you like to see which payments are still outstanding?",
            "You have **{pending}** pending. Do you want a list of unpaid installments?",
            "The remaining balance is **{pending}**. You're making good progress — keep it up!"
        ],
        urduResponses: [
            "آپ کی زیر التواء رقم **{pending}** ہے۔ کیا آپ دیکھنا چاہیں گے کہ کون سی ادائیگیاں باقی ہیں؟",
            "آپ پر **{pending}** باقی ہے۔ کیا آپ غیر ادا شدہ اقساط کی فہرست چاہیں گے؟",
            "باقی رقم **{pending}** ہے۔ آپ اچھی پیشرفت کر رہے ہیں — اسے جاری رکھیں!"
        ]
    },
    {
        category: 'payment_paid',
        patterns: [
            'paid', 'how much paid', 'what have i paid', 'total paid',
            'amount paid', 'payments made', 'completed payments',
            'finished payments', 'cleared payments', 'settled',
            'kitna paid', 'kitna adaa kiya', 'ada kiya'
        ],
        urduPatterns: [
            'ادا شدہ', 'کتنا ادا کیا', 'میں نے کتنا ادا کیا', 'کل ادا شدہ',
            'ادائیگی کی گئی', 'مکمل ادائیگیاں', 'جو ادا ہو چکا',
            'ادا ہوا', 'تصفیہ شدہ', 'پیسے دیے'
        ],
        responses: [
            "You've successfully paid **{paid}** so far. That's **{percentage}%** of your total commitments!",
            "Total paid: **{paid}**. You're **{percentage}%** done — almost there!",
            "**{paid}** has been cleared. Pending: **{pending}**. Want me to break it down?"
        ],
        urduResponses: [
            "آپ نے اب تک کامیابی سے **{paid}** ادا کر دیے ہیں۔ یہ آپ کی کل ذمہ داریوں کا **{percentage}%** ہے!",
            "کل ادا شدہ: **{paid}**۔ آپ **{percentage}%** مکمل کر چکے ہیں — بس تھوڑا سا باقی ہے!",
            "**{paid}** ادا ہو چکے ہیں۔ زیر التواء: **{pending}**۔ کیا آپ چاہیں گے کہ میں تفصیل بتاؤں؟"
        ]
    },
    {
        category: 'payment_progress',
        patterns: [
            'progress', 'how is my progress', 'progress report',
            'how far along', 'what is progress', 'show progress',
            'payment progress', 'where do i stand', 'status',
            'completion status', 'how much done', 'what percentage',
            'progress kaisa hai', 'kitna hua', 'status kya hai'
        ],
        urduPatterns: [
            'پیشرفت', 'میری پیشرفت کیسی ہے', 'پیشرفت رپورٹ',
            'کتنا ہوا', 'پیشرفت کیا ہے', 'پیشرفت دکھاؤ',
            'ادائیگی کی پیشرفت', 'میں کہاں کھڑا ہوں', 'حالت',
            'مکمل ہونے کی حالت', 'کتنا مکمل ہوا', 'کتنا فیصد'
        ],
        responses: [
            "Progress: **{percentage}%** complete. Paid: {paid} | Pending: {pending}. You're doing great!",
            "You're at **{percentage}%** completion. At this rate, you'll finish in no time!",
            "Payment progress: {paid} paid, {pending} remaining. That's **{percentage}%** of your goal!"
        ],
        urduResponses: [
            "پیشرفت: **{percentage}%** مکمل۔ ادا شدہ: {paid} | زیر التواء: {pending}۔ آپ بہت اچھا کر رہے ہیں!",
            "آپ **{percentage}%** مکمل کر چکے ہیں۔ اس رفتار سے، آپ جلدی ختم کر لیں گے!",
            "ادائیگی کی پیشرفت: {paid} ادا، {pending} باقی۔ یہ آپ کے ہدف کا **{percentage}%** ہے!"
        ]
    },
    {
        category: 'last_payment',
        patterns: [
            'last payment', 'recent payment', 'latest payment',
            'newest payment', 'most recent', 'last transaction',
            'latest transaction', 'recent transaction',
            'akhri payment', 'last transaction kya thi'
        ],
        urduPatterns: [
            'آخری ادائیگی', 'حالیہ ادائیگی', 'تازہ ترین ادائیگی',
            'نیا لین دین', 'سب سے حالیہ', 'آخری لین دین',
            'تازہ ترین لین دین', 'حالیہ لین دین',
            'آخری ٹرانزیکشن', 'آخری بار کتنا دیا'
        ],
        responses: [
            "Your last payment was **{last_amount}** on **{last_date}**.",
            "The most recent payment is **{last_amount}** recorded on **{last_date}**. Want to see more details?",
            "Latest: **{last_amount}** on **{last_date}**. That's your most recent transaction."
        ],
        urduResponses: [
            "آپ کی آخری ادائیگی **{last_amount}** تھی **{last_date}** کو۔",
            "سب سے حالیہ ادائیگی **{last_amount}** ہے جو **{last_date}** کو ریکارڈ ہوئی۔ کیا آپ مزید تفصیل چاہیں گے؟",
            "تازہ ترین: **{last_amount}** **{last_date}** کو۔ یہ آپ کا حالیہ ترین لین دین ہے۔"
        ]
    },
    {
        category: 'biggest_payment',
        patterns: [
            'biggest payment', 'largest payment', 'maximum payment',
            'highest payment', 'max amount', 'most expensive',
            'highest transaction', 'largest transaction',
            'sab se bari payment', 'sab se zyada'
        ],
        urduPatterns: [
            'سب سے بڑی ادائیگی', 'سب سے زیادہ ادائیگی', 'زیادہ سے زیادہ ادائیگی',
            'سب سے بڑا لین دین', 'سب سے مہنگا', 'سب سے زیادہ رقم',
            'زیادہ ترین ٹرانزیکشن', 'بڑی سے بڑی ادائیگی'
        ],
        responses: [
            "Your biggest payment was **{biggest_amount}** on **{biggest_date}**. Quite a chunk!",
            "The largest payment you've made: **{biggest_amount}** on **{biggest_date}**.",
            "**{biggest_amount}** is your record-high payment, made on **{biggest_date}**."
        ],
        urduResponses: [
            "آپ کی سب سے بڑی ادائیگی **{biggest_amount}** تھی **{biggest_date}** کو۔ کافی بڑی رقم ہے!",
            "آپ کی سب سے بڑی ادائیگی: **{biggest_amount}** **{biggest_date}** کو۔",
            "**{biggest_amount}** آپ کا سب سے بڑا لین دین ہے، جو **{biggest_date}** کو کیا گیا۔"
        ]
    },
    {
        category: 'smallest_payment',
        patterns: [
            'smallest payment', 'minimum payment', 'lowest payment',
            'least amount', 'smallest transaction', 'minimum amount',
            'sab se chhoti payment', 'sab se kam'
        ],
        urduPatterns: [
            'سب سے چھوٹی ادائیگی', 'کم سے کم ادائیگی', 'سب سے کم ادائیگی',
            'سب سے کم رقم', 'چھوٹا لین دین', 'کم سے کم رقم'
        ],
        responses: [
            "Your smallest payment was **{smallest_amount}** on **{smallest_date}**.",
            "The minimum payment you've recorded: **{smallest_amount}** on **{smallest_date}**.",
            "Lowest transaction: **{smallest_amount}** on **{smallest_date}**. Every bit counts!"
        ],
        urduResponses: [
            "آپ کی سب سے چھوٹی ادائیگی **{smallest_amount}** تھی **{smallest_date}** کو۔",
            "آپ کی کم سے کم ادائیگی: **{smallest_amount}** **{smallest_date}** کو۔",
            "سب سے کم لین دین: **{smallest_amount}** **{smallest_date}** کو۔ ہر چھوٹی رقم بھی اہم ہے!"
        ]
    },
    {
        category: 'payment_count',
        patterns: [
            'how many payments', 'number of payments', 'total payments count',
            'how many transactions', 'transaction count', 'count',
            'total entries', 'how many records',
            'kitni payments hain', 'kitne transactions'
        ],
        urduPatterns: [
            'کتنی ادائیگیاں ہیں', 'ادائیگیوں کی تعداد', 'کل ادائیگیوں کی تعداد',
            'کتنے لین دین ہیں', 'لین دین کی تعداد', 'تعداد',
            'کل اندراجات', 'کتنے ریکارڈز ہیں'
        ],
        responses: [
            "You've made **{count}** payments so far. That's consistent tracking!",
            "Total transactions: **{count}**. Keep up the good record-keeping!",
            "There are **{count}** payments recorded in your history."
        ],
        urduResponses: [
            "آپ نے اب تک **{count}** ادائیگیاں کی ہیں۔ یہ بہت مستقل ٹریکنگ ہے!",
            "کل لین دین: **{count}**۔ اپنا اچھا ریکارڈ رکھنا جاری رکھیں!",
            "آپ کی ہسٹری میں **{count}** ادائیگیاں ریکارڈ ہیں۔"
        ]
    },
    {
        category: 'average_payment',
        patterns: [
            'average payment', 'average amount', 'average spending',
            'typical payment', 'usual amount', 'mean payment',
            'average transaction', 'avg amount',
            'average kitna hai', 'ausat payment'
        ],
        urduPatterns: [
            'اوسط ادائیگی', 'اوسط رقم', 'اوسط خرچ',
            'عام ادائیگی', 'معمول کی رقم', 'اوسط لین دین',
            'اوسط ٹرانزیکشن', 'اوسط کتنی ہے'
        ],
        responses: [
            "Your average payment is **{average}**. That's your typical transaction size.",
            "On average, you pay **{average}** per transaction.",
            "The average payment amount is **{average}**. Want to see the breakdown?"
        ],
        urduResponses: [
            "آپ کی اوسط ادائیگی **{average}** ہے۔ یہ آپ کا عام لین دین ہے۔",
            "اوسطاً، آپ ہر لین دین میں **{average}** ادا کرتے ہیں۔",
            "اوسط ادائیگی **{average}** ہے۔ کیا آپ تفصیل دیکھنا چاہیں گے؟"
        ]
    },
    {
        category: 'monthly_total',
        patterns: [
            'this month', 'monthly', 'this month total', 'monthly spending',
            'monthly total', 'what is this month', 'current month',
            'this month payments', 'this month amount',
            'is mahine', 'is mahine kitna', 'monthly kya hai'
        ],
        urduPatterns: [
            'اس مہینے', 'ماہانہ', 'اس مہینے کا کل', 'ماہانہ خرچ',
            'ماہانہ کل', 'اس مہینے کا کیا ہے', 'موجودہ مہینہ',
            'اس مہینے کی ادائیگیاں', 'اس مہینے کی رقم'
        ],
        responses: [
            "This month ({current_month}), you've paid **{monthly_total}** across {monthly_count} transactions.",
            "Total for {current_month}: **{monthly_total}**. That's {monthly_count} payments so far.",
            "Your {current_month} spending: **{monthly_total}**. Want to compare with last month?"
        ],
        urduResponses: [
            "اس مہینے ({current_month})، آپ نے {monthly_count} لین دین میں **{monthly_total}** ادا کیے ہیں۔",
            "{current_month} کا کل: **{monthly_total}**۔ یہ اب تک {monthly_count} ادائیگیاں ہیں۔",
            "آپ کا {current_month} خرچہ: **{monthly_total}**۔ کیا آپ پچھلے مہینے سے موازنہ کرنا چاہیں گے؟"
        ]
    },
    {
        category: 'yearly_total',
        patterns: [
            'this year', 'yearly', 'yearly total', 'annual spending',
            'this year total', 'current year', 'yearly payments',
            'annual total', 'year to date',
            'is saal', 'is saal kitna', 'yearly kya hai'
        ],
        urduPatterns: [
            'اس سال', 'سالانہ', 'سالانہ کل', 'سالانہ خرچ',
            'اس سال کا کل', 'موجودہ سال', 'سالانہ ادائیگیاں',
            'سال کا کل', 'سال بھر میں'
        ],
        responses: [
            "This year ({current_year}), your total is **{yearly_total}** from {yearly_count} payments.",
            "Year-to-date: **{yearly_total}** paid across {yearly_count} transactions.",
            "Your {current_year} total: **{yearly_total}**. That's a solid track record!"
        ],
        urduResponses: [
            "اس سال ({current_year})، آپ کا کل **{yearly_total}** ہے جو {yearly_count} ادائیگیوں سے ہے۔",
            "سال بھر میں: **{yearly_total}** {yearly_count} لین دین میں ادا کیے گئے۔",
            "آپ کا {current_year} کل: **{yearly_total}**۔ یہ بہت اچھا ٹریک ریکارڈ ہے!"
        ]
    },

    /* ================================================================
     * PROJECT / FINANCE SPECIFIC (Bilingual)
     * ================================================================ */

    {
        category: 'project_health',
        patterns: [
            'how is my project doing', 'project health', 'project status',
            'project progress', 'where is my project', 'am i on track',
            'tracking progress', 'is my project on track', 'project report',
            'project kaisa hai', 'project status kya hai'
        ],
        urduPatterns: [
            'میرا پروجیکٹ کیسا ہے', 'پروجیکٹ کی حالت', 'پروجیکٹ کی حیثیت',
            'پروجیکٹ کی پیشرفت', 'میرا پروجیکٹ کہاں ہے', 'کیا میں ٹریک پر ہوں',
            'پیشرفت ٹریک کرنا', 'کیا پروجیکٹ ٹریک پر ہے', 'پروجیکٹ رپورٹ'
        ],
        responses: [
            "Your project is **{percentage}%** complete with {paid} paid and {pending} pending. You're making steady progress!",
            "Project health: **{percentage}%** done. Paid: {paid} | Pending: {pending}. Stay consistent and you'll finish strong!",
            "Based on your payments, you're at **{percentage}%** completion. Keep the momentum going!"
        ],
        urduResponses: [
            "آپ کا پروجیکٹ **{percentage}%** مکمل ہے جس میں {paid} ادا اور {pending} زیر التواء ہیں۔ آپ مسلسل پیشرفت کر رہے ہیں!",
            "پروجیکٹ کی صحت: **{percentage}%** مکمل۔ ادا شدہ: {paid} | زیر التواء: {pending}۔ مستقل رہیں اور آپ مضبوطی سے ختم کریں گے!",
            "آپ کی ادائیگیوں کی بنیاد پر، آپ **{percentage}%** مکمل کر چکے ہیں۔ رفتار برقرار رکھیں!"
        ]
    },
    {
        category: 'budget_advice',
        patterns: [
            'am i overspending', 'budget check', 'am i within budget',
            'overspending', 'spending too much', 'budget advice',
            'how is my budget', 'budget health', 'financial health',
            'zyada kharch', 'budget kaisa hai'
        ],
        urduPatterns: [
            'کیا میں زیادہ خرچ کر رہا ہوں', 'بجٹ چیک', 'کیا میں بجٹ میں ہوں',
            'زیادہ خرچ', 'بہت زیادہ خرچ', 'بجٹ مشورہ',
            'میرا بجٹ کیسا ہے', 'بجٹ کی صحت', 'مالی صحت'
        ],
        responses: [
            "You've spent **{total}** so far. Compared to your average of **{average}** per payment, you're on a reasonable track.",
            "Your total spending is **{total}**. If you want to stay within budget, keep your average per payment around **{average}**.",
            "Based on your history, you're spending an average of **{average}** per transaction. That's a helpful baseline for budgeting."
        ],
        urduResponses: [
            "آپ نے اب تک **{total}** خرچ کیے ہیں۔ آپ کی اوسط **{average}** فی ادائیگی کے مقابلے میں، آپ معقول ٹریک پر ہیں۔",
            "آپ کا کل خرچ **{total}** ہے۔ اگر آپ بجٹ میں رہنا چاہتے ہیں تو اپنی اوسط فی ادائیگی **{average}** کے ارد گرد رکھیں۔",
            "آپ کی ہسٹری کی بنیاد پر، آپ فی لین دین اوسطاً **{average}** خرچ کر رہے ہیں۔ یہ بجٹ کے لیے ایک مددگار بنیاد ہے۔"
        ]
    },
    {
        category: 'project_reminder',
        patterns: [
            'remind me', 'reminder', 'what do i need to pay',
            'upcoming payments', 'what is due', 'pending payments',
            'what do i have to pay', 'payment due', 'upcoming due',
            'mujhe yaad dilao', 'kya dena hai', 'kya pending hai'
        ],
        urduPatterns: [
            'مجھے یاد دلاؤ', 'یاد دہانی', 'مجھے کیا ادا کرنا ہے',
            'آنے والی ادائیگیاں', 'کیا واجب الادا ہے', 'زیر التواء ادائیگیاں',
            'مجھے کیا ادا کرنا پڑے گا', 'ادائیگی واجب', 'آنے والی واجب'
        ],
        responses: [
            "You have **{pending_count}** pending payments totaling **{pending}**. Would you like to see them listed?",
            "Upcoming/outstanding: {pending_count} payments, total {pending}. I can show you details if you want.",
            "There are {pending_count} pending payments worth {pending}. Let me know if you want the full list!"
        ],
        urduResponses: [
            "آپ پر **{pending_count}** زیر التواء ادائیگیاں ہیں جن کی کل رقم **{pending}** ہے۔ کیا آپ ان کی فہرست دیکھنا چاہیں گے؟",
            "آنے والی / بقایا: {pending_count} ادائیگیاں، کل {pending}۔ اگر آپ چاہیں تو میں تفصیل دکھا سکتا ہوں۔",
            "{pending_count} زیر التواء ادائیگیاں ہیں جن کی مالیت {pending} ہے۔ اگر آپ مکمل فہرست چاہیں تو مجھے بتائیں!"
        ]
    },
    {
        category: 'project_goal',
        patterns: [
            'goal', 'what is my goal', 'target', 'my target',
            'aim', 'objective', 'what am i aiming for',
            'goal kya hai', 'target kya hai'
        ],
        urduPatterns: [
            'ہدف', 'میرا ہدف کیا ہے', 'ٹارگٹ', 'میرا ٹارگٹ',
            'مقصد', 'هدف', 'میں کس چیز کے لیے کوشش کر رہا ہوں'
        ],
        responses: [
            "Your total target is **{grand_total}**. You've achieved **{percentage}%** so far. Keep pushing!",
            "The overall goal is **{grand_total}**. You're **{percentage}%** there with {paid} already paid.",
            "Target: {grand_total} | Achieved: {percentage}%. You're making excellent progress!"
        ],
        urduResponses: [
            "آپ کا کل ہدف **{grand_total}** ہے۔ آپ نے اب تک **{percentage}%** حاصل کر لیا ہے۔ لگے رہو!",
            "مجموعی ہدف **{grand_total}** ہے۔ آپ **{percentage}%** پہنچ چکے ہیں جس میں {paid} ادا ہو چکے ہیں۔",
            "ہدف: {grand_total} | حاصل: {percentage}%۔ آپ بہترین پیشرفت کر رہے ہیں!"
        ]
    },

    /* ================================================================
     * APP FEATURES (Bilingual)
     * ================================================================ */

    {
        category: 'add_payment',
        patterns: [
            'how do i add', 'how to add', 'add a payment', 'add payment',
            'add transaction', 'add an entry', 'record a payment',
            'enter payment', 'new payment', 'create payment',
            'how to record', 'how to enter',
            'payment kaise add karein', 'new entry kaise'
        ],
        urduPatterns: [
            'ادائیگی کیسے شامل کریں', 'نیا لین دین کیسے', 'ادائیگی ریکارڈ کریں',
            'ادائیگی درج کریں', 'نیا اندراج', 'پیمنٹ ایڈ',
            'لین دین شامل کریں', 'پیسے کیسے ڈالیں'
        ],
        responses: [
            "Tap the **+** button → choose Manual Input or Upload Image → fill in amount/date → save. Done!",
            "Easy! Hit the **+** button, pick Manual Input, type in the details, and save. Or use Upload Image to scan a receipt.",
            "Go to the home screen → tap **+** → enter the payment info → save. That's it!"
        ],
        urduResponses: [
            "**+** بٹن کو تھپتھپائیں → Manual Input یا Upload Image منتخب کریں → رقم/تاریخ ڈالیں → محفوظ کریں۔ بس!",
            "آسان! **+** بٹن دبائیں، Manual Input چنیں، تفصیلات ٹائپ کریں، اور محفوظ کریں۔ یا Upload Image استعمال کریں رسید اسکین کرنے کے لیے۔",
            "ہوم اسکرین پر جائیں → **+** تھپتھپائیں → ادائیگی کی معلومات ڈالیں → محفوظ کریں۔ بس اتنا ہے!"
        ]
    },
    {
        category: 'delete_payment',
        patterns: [
            'how to delete', 'delete payment', 'remove payment',
            'how to remove', 'remove entry', 'undo payment',
            'delete transaction', 'remove transaction',
            'payment kaise hatayein', 'delete kaise karein'
        ],
        urduPatterns: [
            'ادائیگی کیسے ڈیلیٹ کریں', 'ادائیگی ہٹائیں', 'اندراج ہٹائیں',
            'لین دین ڈیلیٹ کریں', 'پیمنٹ ڈیلیٹ', 'ادائیگی واپس لیں'
        ],
        responses: [
            "Open History → find the record → tap delete/trash icon. Quick undo available right after!",
            "Go to History, select the payment, and use the delete option. You'll see an 'undo' prompt for a few seconds.",
            "From History, tap on the payment you want to remove → delete icon → confirm. Easy!"
        ],
        urduResponses: [
            "ہسٹری کھولیں → ریکارڈ تلاش کریں → ڈیلیٹ/ریش آئیکن تھپتھپائیں۔ فوراً انڈو دستیاب ہے!",
            "ہسٹری میں جائیں، ادائیگی منتخب کریں، اور ڈیلیٹ آپشن استعمال کریں۔ آپ کو چند سیکنڈ کے لیے 'انڈو' نظر آئے گا۔",
            "ہسٹری سے، جس ادائیگی کو ہٹانا ہے اس پر تھپتھپائیں → ڈیلیٹ آئیکن → تصدیق کریں۔ آسان!"
        ]
    },
    {
        category: 'edit_payment',
        patterns: [
            'edit payment', 'update payment', 'change payment',
            'how to edit', 'modify payment', 'correct payment',
            'fix payment', 'edit transaction',
            'payment kaise edit karein', 'update kaise'
        ],
        urduPatterns: [
            'ادائیگی ترمیم کریں', 'ادائیگی اپڈیٹ کریں', 'ادائیگی تبدیل کریں',
            'کیسے ترمیم کریں', 'ادائیگی درست کریں', 'لین دین ترمیم'
        ],
        responses: [
            "Open History → tap the payment you want to edit → use the edit/pencil icon → update details → save.",
            "Go to History, select the payment, and tap the edit button. You can change the amount, date, or description.",
            "Find the payment in History → tap it → edit icon → make your changes → save."
        ],
        urduResponses: [
            "ہسٹری کھولیں → جس ادائیگی کو ترمیم کرنا ہے اس پر تھپتھپائیں → ترمیم/پینسل آئیکن استعمال کریں → تفصیلات اپڈیٹ کریں → محفوظ کریں۔",
            "ہسٹری میں جائیں، ادائیگی منتخب کریں، اور ترمیم بٹن تھپتھپائیں۔ آپ رقم، تاریخ، یا وضاحت تبدیل کر سکتے ہیں۔",
            "ہسٹری میں ادائیگی تلاش کریں → تھپتھپائیں → ترمیم آئیکن → تبدیلیاں کریں → محفوظ کریں۔"
        ]
    },
    {
        category: 'export_data',
        patterns: [
            'export', 'download', 'excel', 'csv', 'report',
            'download report', 'get report', 'export data',
            'save as excel', 'spreadsheet', 'backup',
            'export kaise karein', 'report download'
        ],
        urduPatterns: [
            'ایکسپورٹ', 'ڈاؤن لوڈ', 'ایکسل', 'رپورٹ',
            'رپورٹ ڈاؤن لوڈ کریں', 'ڈیٹا ایکسپورٹ کریں',
            'ایکسل کے طور پر محفوظ کریں', 'اسپریڈشیٹ', 'بیک اپ'
        ],
        responses: [
            "Go to History → tap the export/download icon → choose Excel format → done!",
            "You can export all your data as an Excel file from the History page. Look for the download button.",
            "Head to History → export option → download your records as a spreadsheet."
        ],
        urduResponses: [
            "ہسٹری میں جائیں → ایکسپورٹ/ڈاؤن لوڈ آئیکن تھپتھپائیں → ایکسل فارمیٹ چنیں → مکمل!",
            "آپ اپنا تمام ڈیٹا ایکسل فائل کے طور پر ہسٹری پیج سے ایکسپورٹ کر سکتے ہیں۔ ڈاؤن لوڈ بٹن تلاش کریں۔",
            "ہسٹری میں جائیں → ایکسپورٹ آپشن → اپنے ریکارڈز کو اسپریڈشیٹ کے طور پر ڈاؤن لوڈ کریں۔"
        ]
    },
    {
        category: 'currency_settings',
        patterns: [
            'currency', 'change currency', 'switch currency',
            'set currency', 'currency symbol', 'change symbol',
            'what currency', 'update currency',
            'currency kaise change karein'
        ],
        urduPatterns: [
            'کرنسی', 'کرنسی تبدیل کریں', 'کرنسی سوئچ کریں',
            'کرنسی سیٹ کریں', 'کرنسی کا نشان', 'نشان تبدیل کریں'
        ],
        responses: [
            "Go to Settings → Currency → select your preferred currency. It updates everywhere instantly!",
            "You can change the currency from Settings → Currency. The symbol will change across the whole app.",
            "Head to Settings and look for Currency — pick the one you want, and it'll update across PayTrack."
        ],
        urduResponses: [
            "سیٹنگز میں جائیں → کرنسی → اپنی پسندیدہ کرنسی منتخب کریں۔ یہ فوری طور پر ہر جگہ اپڈیٹ ہو جاتی ہے!",
            "آپ سیٹنگز → کرنسی سے کرنسی تبدیل کر سکتے ہیں۔ نشان پوری ایپ میں تبدیل ہو جائے گا۔",
            "سیٹنگز میں جائیں اور کرنسی تلاش کریں — جو چاہیں منتخب کریں، اور یہ PayTrack میں اپڈیٹ ہو جائے گی۔"
        ]
    },
    {
        category: 'theme_settings',
        patterns: [
            'theme', 'dark mode', 'light mode', 'change theme',
            'switch theme', 'color theme', 'dark theme', 'blue theme',
            'theme kaise change karein'
        ],
        urduPatterns: [
            'تھیم', 'ڈارک موڈ', 'لائٹ موڈ', 'تھیم تبدیل کریں',
            'تھیم سوئچ کریں', 'کلر تھیم', 'نیلا تھیم'
        ],
        responses: [
            "Settings → Theme → choose from Light, Dark, Blue, Green. Pick your favorite!",
            "You can switch themes from Settings → Theme. There are several options to match your mood.",
            "Go to Settings → select Theme → pick the one you like best."
        ],
        urduResponses: [
            "سیٹنگز → تھیم → لائٹ، ڈارک، نیلا، سبز میں سے منتخب کریں۔ اپنی پسندیدہ چنیں!",
            "آپ سیٹنگز → تھیم سے تھیم تبدیل کر سکتے ہیں۔ آپ کے موڈ کے مطابق کئی آپشنز ہیں۔",
            "سیٹنگز میں جائیں → تھیم منتخب کریں → جو سب سے زیادہ پسند ہے اسے چنیں۔"
        ]
    },

    /* ================================================================
     * SMALL TALK (Bilingual)
     * ================================================================ */

    {
        category: 'greeting',
        patterns: [
            'hi', 'hello', 'hey', 'good morning', 'good afternoon',
            'good evening', 'yo', 'wasup', 'howdy', 'greetings',
            'salam', 'adaab', 'kia hal hai'
        ],
        urduPatterns: [
            'ہائے', 'ہیلو', 'سلام', 'السلام علیکم', 'آداب',
            'کیا حال ہے', 'کیسے ہو', 'کیسے ہیں آپ'
        ],
        responses: [
            "Hello! How can I help you with your finances today?",
            "Hey there! Ready to track some payments or check your progress?",
            "Hi! I'm your PayTrack assistant. What can I do for you?"
        ],
        urduResponses: [
            "السلام علیکم! آج میں آپ کی مالی معاملات میں کیسے مدد کر سکتا ہوں؟",
            "ہائے! کیا آپ ادائیگیاں ٹریک کرنا چاہیں گے یا اپنی پیشرفت دیکھنا چاہیں گے؟",
            "سلام! میں آپ کا PayTrack اسسٹنٹ ہوں۔ میں آپ کے لیے کیا کر سکتا ہوں؟"
        ]
    },
    {
        category: 'how_are_you',
        patterns: [
            'how are you', "how's it going", 'how are you doing',
            "what's up", 'whats up', 'how is everything',
            'how are things', 'hows life',
            'kya haal hai', 'kaise ho', 'sab theek'
        ],
        urduPatterns: [
            'کیا حال ہے', 'کیسے ہو', 'کیسے ہیں', 'سب ٹھیک',
            'کیسا چل رہا ہے', 'کیا چل رہا ہے'
        ],
        responses: [
            "I'm great, thanks! I've been crunching numbers — your finances are looking good! How can I help?",
            "All good here! I've got all your payment data ready. What would you like to know?",
            "Running smoothly! Your payments are all tracked. What do you need?"
        ],
        urduResponses: [
            "میں ٹھیک ہوں، شکریہ! میں نمبروں کو دیکھ رہا تھا — آپ کی مالی صورتحال اچھی لگ رہی ہے! میں کیسے مدد کر سکتا ہوں؟",
            "یہاں سب ٹھیک ہے! میرے پاس آپ کا تمام ادائیگی ڈیٹا تیار ہے۔ آپ کیا جاننا چاہیں گے؟",
            "سب ٹھیک چل رہا ہے! آپ کی تمام ادائیگیاں ٹریک ہو چکی ہیں۔ آپ کو کیا چاہیے؟"
        ]
    },
    {
        category: 'who_are_you',
        patterns: [
            'who are you', 'what are you', 'are you a bot',
            'are you an ai', 'are you real', 'are you human',
            'what is your identity', 'tell me about yourself',
            'tum kon ho', 'aap kaun hain'
        ],
        urduPatterns: [
            'تم کون ہو', 'آپ کون ہیں', 'کیا آپ بوٹ ہیں', 'کیا آپ اے آئی ہیں',
            'کیا آپ حقیقی ہیں', 'کیا آپ انسان ہیں', 'اپنا تعارف کروائیں'
        ],
        responses: [
            "I'm PayTrack AI — your in-app finance assistant. I help you track payments, view totals, and manage your project finances.",
            "I'm a built-in AI assistant inside PayTrack. I know your payment data inside out and I'm here to help!",
            "I'm your friendly PayTrack helper. Not human, but I know everything about your transactions and progress."
        ],
        urduResponses: [
            "میں PayTrack AI ہوں — آپ کا ان-ایپ فنانس اسسٹنٹ۔ میں ادائیگیاں ٹریک کرنے، کل دیکھنے، اور آپ کے پروجیکٹ کی مالیات کو منظم کرنے میں مدد کرتا ہوں۔",
            "میں PayTrack کے اندر ایک بلٹ ان AI اسسٹنٹ ہوں۔ مجھے آپ کا ادائیگی ڈیٹا مکمل طور پر معلوم ہے اور میں مدد کرنے کے لیے حاضر ہوں!",
            "میں آپ کا دوستانہ PayTrack معاون ہوں۔ انسان نہیں، لیکن مجھے آپ کے لین دین اور پیشرفت کے بارے میں سب کچھ معلوم ہے۔"
        ]
    },
    {
        category: 'what_is_your_name',
        patterns: [
            'what is your name', "what's your name", 'do you have a name',
            'your name', 'name?', 'apka naam kya hai'
        ],
        urduPatterns: [
            'آپ کا نام کیا ہے', 'آپ کا کیا نام ہے', 'کیا آپ کا کوئی نام ہے',
            'نام کیا ہے', 'آپ کا نام'
        ],
        responses: [
            "I'm PayTrack AI — your personal finance assistant.",
            "Call me PayTrack AI! I'm here to help you manage your money.",
            "I go by PayTrack AI. Nice to meet you!"
        ],
        urduResponses: [
            "میں PayTrack AI ہوں — آپ کا ذاتی فنانس اسسٹنٹ۔",
            "مجھے PayTrack AI کہیں! میں آپ کے پیسے منظم کرنے میں مدد کرنے کے لیے حاضر ہوں۔",
            "میرا نام PayTrack AI ہے۔ آپ سے مل کر خوشی ہوئی!"
        ]
    },
    {
        category: 'thanks',
        patterns: [
            'thank you', 'thanks', 'thank u', 'appreciate it',
            'thanks a lot', 'much appreciated', 'cheers', 'thx',
            'shukriya', 'meharbani'
        ],
        urduPatterns: [
            'شکریہ', 'بہت شکریہ', 'مہربانی', 'تہہ دل سے شکریہ',
            'اپreciation', 'تھینکس'
        ],
        responses: [
            "You're welcome! Always happy to help. Anything else you'd like to check?",
            "Anytime! Let me know if you need anything else about your payments.",
            "Glad I could help! I'm here whenever you need me."
        ],
        urduResponses: [
            "آپ کی مہربانی! مدد کر کے ہمیشہ خوشی ہوتی ہے۔ کیا آپ کچھ اور چیک کرنا چاہیں گے؟",
            "ہر وقت! اگر آپ کو اپنی ادائیگیوں کے بارے میں کسی اور چیز کی ضرورت ہو تو مجھے بتائیں۔",
            "مجھے خوشی ہے کہ میں مدد کر سکا! میں جب بھی آپ کو ضرورت ہو حاضر ہوں۔"
        ]
    },
    {
        category: 'goodbye',
        patterns: [
            'bye', 'goodbye', 'see you', 'see ya', 'talk later',
            'im done', "i'm done", 'ciao', 'later', 'peace out',
            'khuda hafiz', 'Allah hafiz', 'phir milenge'
        ],
        urduPatterns: [
            'الوداع', 'خدا حافظ', 'الله حافظ', 'پھر ملیں گے',
            'بائے', 'بعد میں بات کریں', 'چلتا ہوں'
        ],
        responses: [
            "See you next time! Your data is always ready when you return.",
            "Take care! I'll be here when you need to check your payments again.",
            "Bye for now! Keep tracking those payments — you're doing great!"
        ],
        urduResponses: [
            "اگلی بار ملیں گے! جب آپ واپس آئیں گے تو آپ کا ڈیٹا ہمیشہ تیار ہوگا۔",
            "اپنا خیال رکھیں! جب آپ کو دوبارہ اپنی ادائیگیاں چیک کرنی ہوں تو میں حاضر ہوں گا۔",
            "ابھی کے لیے الوداع! اپنی ادائیگیاں ٹریک کرتے رہیں — آپ بہت اچھا کر رہے ہیں!"
        ]
    },

    /* ================================================================
     * JOKES & FUN (Bilingual)
     * ================================================================ */

    {
        category: 'joke',
        patterns: [
            'tell me a joke', 'make me laugh', 'say something funny',
            'joke', 'funny', 'crack a joke', 'humor',
            'mazak sunao', 'hansao', 'lateefah sunao'
        ],
        urduPatterns: [
            'مجھے مذاق سناؤ', 'مجھے ہنساؤ', 'کچھ مزاحیہ بتاؤ',
            'مذاق', 'لطیفہ سناؤ', 'ہنساؤ'
        ],
        responses: [
            "Why did the accountant break up with the calculator? It just couldn't add up to anything! 😄",
            "I'd tell you a finance joke, but honestly, most of them don't add up. 😉",
            "Why was the budget always calm? It knew how to balance itself!",
            "What do you call a group of accountants? A 'balance' sheet! 😂"
        ],
        urduResponses: [
            "اکاؤنٹنٹ نے کیلکولیٹر کو کیوں چھوڑ دیا؟ کیونکہ یہ کسی بھی چیز کا حساب نہیں لگا سکتا تھا! 😄",
            "میں آپ کو فنانس کا مذاق سناؤں، لیکن ایمانداری سے، ان میں سے زیادہ تر کا حساب نہیں ملتا۔ 😉",
            "بجٹ ہمیشہ پرسکون کیوں رہتا تھا؟ کیونکہ وہ خود کو متوازن رکھنا جانتا تھا!",
            "اکاؤنٹنٹس کے گروپ کو کیا کہتے ہیں؟ بیلنس شیٹ! 😂"
        ]
    },

    /* ================================================================
     * FINANCE TIPS (Bilingual)
     * ================================================================ */

    {
        category: 'saving_tips',
        patterns: [
            'how can i save money', 'saving tips', 'budgeting tips',
            'how to budget', 'advice on saving', 'help me save',
            'save more money', 'money saving', 'cut expenses',
            'paise kaise bachayein', 'saving tips'
        ],
        urduPatterns: [
            'پیسے کیسے بچائیں', 'بچت کے مشورے', 'بجٹ کے مشورے',
            'بجٹ کیسے بنائیں', 'بچت کے لیے مشورہ', 'مجھے بچانے میں مدد کریں',
            'زیادہ پیسے بچائیں', 'اخراجات کم کریں'
        ],
        responses: [
            "Start by tracking every expense for a month — which you're already doing here! Then look for the top 1–2 categories you can trim. Small, consistent cuts beat one big drastic change.",
            "Try setting aside a fixed amount right when income comes in — 'pay yourself first' works better than saving whatever's left over.",
            "Review your past payments in PayTrack to spot patterns. Often, subscriptions and small daily expenses add up more than we realize."
        ],
        urduResponses: [
            "ایک ماہ تک ہر خرچ کو ٹریک کرکے شروع کریں — جو آپ پہلے سے ہی کر رہے ہیں! پھر ان 1-2 زمروں کو دیکھیں جنہیں آپ کم کر سکتے ہیں۔ چھوٹی، مستقل کٹوتیاں ایک بڑی تبدیلی سے بہتر ہیں۔",
            "آمدنی آنے پر ایک مقررہ رقم فوری طور پر الگ رکھنے کی کوشش کریں — 'اپنے آپ کو پہلے ادا کریں' باقی بچت سے بہتر کام کرتا ہے۔",
            "PayTrack میں اپنی پچھلی ادائیگیوں کا جائزہ لیں تاکہ پیٹرن دیکھ سکیں۔ اکثر، سبسکرپشنز اور چھوٹے روزانہ کے اخراجات ہماری سوچ سے زیادہ جمع ہو جاتے ہیں۔"
        ]
    },
    {
        category: 'debt_advice',
        patterns: [
            'is debt bad', 'should i pay off debt', 'installments vs saving',
            'debt repayment', 'pay debt', 'clear debt', 'loan',
            'qarz', 'loan', 'debt'
        ],
        urduPatterns: [
            'کیا قرض برا ہے', 'کیا مجھے قرض ادا کرنا چاہیے', 'قسطیں بمقابلہ بچت',
            'قرض کی ادائیگی', 'قرض ادا کریں', 'قرض چکانا', 'لوڈ'
        ],
        responses: [
            "It depends on interest rates. Generally, pay off high-interest debt first — that saves you more than parking money in savings. For low-interest installments, paying steadily while saving alongside is fine.",
            "If your debt interest is high, prioritize it. If it's low, balance with saving. PayTrack can help you track both payments and savings.",
            "Focus on high-interest debt first. For low-interest installments, consistent monthly payments while building an emergency fund is a solid strategy."
        ],
        urduResponses: [
            "یہ شرح سود پر منحصر ہے۔ عام طور پر، پہلے زیادہ سود والا قرض ادا کریں — یہ آپ کو بچت میں پیسے رکھنے سے زیادہ بچاتا ہے۔ کم سود والی اقساط کے لیے، ادائیگی کے ساتھ ساتھ بچت کرنا ٹھیک ہے۔",
            "اگر آپ کے قرض کی شرح سود زیادہ ہے تو اسے ترجیح دیں۔ اگر کم ہے تو بچت کے ساتھ توازن رکھیں۔ PayTrack آپ کو ادائیگیوں اور بچت دونوں کو ٹریک کرنے میں مدد کر سکتا ہے۔",
            "پہلے زیادہ سود والے قرض پر توجہ دیں۔ کم سود والی اقساط کے لیے، ماہانہ ادائیگیوں کے ساتھ ساتھ ایک ایمرجنسی فنڈ بنانا ایک مضبوط حکمت عملی ہے۔"
        ]
    },

    /* ================================================================
     * FALLBACK (Bilingual)
     * ================================================================ */

    {
        category: 'fallback',
        patterns: [
            'default', 'unknown', 'i dont know', 'i do not know',
            'what is this', 'what', 'huh', 'say that again',
            'samajh nahi aya', 'kya', 'phir se batao'
        ],
        urduPatterns: [
            'سمجھ نہیں آیا', 'کیا', 'پھر سے بتاؤ', 'معلوم نہیں',
            'یہ کیا ہے', 'ہہ'
        ],
        responses: [
            "I'm not sure I understood. Try asking about your total, pending, progress, or app features like adding or exporting payments.",
            "Can you rephrase? I can help with payment tracking, totals, progress, and app features.",
            "I didn't catch that. You can ask: 'What's my total?', 'How much is pending?', 'Show progress', or 'How do I add a payment?'",
            "Feel free to ask about your payments, progress, goals, or how to use PayTrack features!"
        ],
        urduResponses: [
            "مجھے سمجھ نہیں آیا۔ براہ کرم اپنے کل، زیر التواء، پیشرفت، یا ایپ فیچرز جیسے ادائیگی شامل کرنے یا ایکسپورٹ کرنے کے بارے میں پوچھیں۔",
            "کیا آپ دوبارہ کہہ سکتے ہیں؟ میں ادائیگی ٹریکنگ، کل، پیشرفت، اور ایپ فیچرز میں مدد کر سکتا ہوں۔",
            "میں سمجھ نہیں پایا۔ آپ پوچھ سکتے ہیں: 'میرا کل کیا ہے؟'، 'کتنا باقی ہے؟'، 'پیشرفت دکھاؤ'، یا 'ادائیگی کیسے شامل کروں؟'",
            "آپ اپنی ادائیگیوں، پیشرفت، اہداف، یا PayTrack فیچرز کے استعمال کے بارے میں پوچھ سکتے ہیں!"
        ]
    }
];

/*
 * ================================================================
 * USAGE NOTES:
 * ================================================================
 * 
 * 1. LANGUAGE SWITCHING:
 *    - User says: "Urdu mein bolo" → AI switches to Urdu mode
 *    - User says: "Speak English" → AI switches to English mode
 *    - Default language: English (can be changed by setting a flag)
 * 
 * 2. RESPONSE SELECTION:
 *    - Use `useUrdu` flag (true/false) to pick between responses/urduResponses
 *    - If Urdu responses are missing, fallback to English
 * 
 * 3. PATTERN MATCHING:
 *    - Check both `patterns` (English) and `urduPatterns` (Urdu)
 *    - Use lowercase matching and handle common variations
 * 
 * 4. PLACEHOLDERS:
 *    - Replace {total}, {pending}, {percentage}, etc. with real data
 *    - Same placeholders work in both languages
 * 
 * 5. ADDING NEW INTENTS:
 *    - Add patterns in both languages
 *    - Add responses in both languages
 *    - Use category for organization
 * 
 * ================================================================
 */