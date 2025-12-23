window.onload = function () {
  // -----------------------------
  // 0. 학생 이름 (결과에서 사용)
  // -----------------------------
  const urlParams = new URLSearchParams(window.location.search);
  const studentNameValue = urlParams.get("studentName") || "이름 정보 없음";

  // =============================
  // 1. 데이터 세트 정의
  // =============================

  // 1-1) 영어 → 한국어 단어 맞추기
  const engToKorPairs = [
    ["embryo", "배아"],
    ["enforce", "집행하다, 강요하다"],
    ["totality", "전체"],
    ["lineage", "혈통, 가계"],
    ["gratitude", "고마움, 감사"],
    ["vendor", "판매 회사, 행상인"],
    ["gene", "유전자"],
    ["reputation", "평판, 명성"],
    ["minister", "장관"],
    ["deliver", "배달하다 / (연설·강연 등을)하다"],
    ["constant", "끊임없는, 거듭되는"],
    ["welfare", "복지, 후생"],
    ["eligible", "~을 가질[할] 수 있는"],
    ["textile", "직물, 옷감"],
    ["metaphor", "은유, 비유"],
    ["digestion", "소화"],
    ["sustainable", "지속 가능한"],
    ["envelope", "봉투"],
    ["prosper", "번영[번창]하다"],
    ["hardware", "하드웨어 / 철물"],
    ["interim", "중간의, 잠정적인"],
    ["spear", "창"],
    ["heed", "주의를 기울이다"],
    ["relativity", "상대성"],
    ["income", "소득, 수입"],
    ["install", "설치[설비]하다"],
    ["attractive", "매력적인"],
    ["philosophy", "철학"],
    ["massage", "마사지, 안마, 안마를 하다"],
    ["unsuitable", "적합하지 않은"],
    ["purely", "순전히"],
    ["perspective", "관점, 시각"],
    ["institution", "기관[단체/협회]"],
    ["responsibility", "책임, 책무"],
    ["hover", "(허공을) 맴돌다"],
    ["reactivity", "반응성"],
    ["underground", "지하의"],
    ["teammate", "팀 동료"],
    ["legislature", "입법부"],
    ["customer", "손님, 고객"],
    ["stranger", "낮선 사람"],
    ["compensation", "보상"],
    ["publicly", "공개적으로"],
    ["analogy", "유사점, 비유, 유추"],
    ["traitor", "배반자"],
    ["accommodation", "숙소, 시설"],
    ["internationally", "국제적으로"],
    ["breakthrough", "돌파구"],
    ["premise", "전제"],
    ["artifact", "공예품, 인공유물"],
  ];

  // 1-2) 한국어 → 영어 맞추기
  const korToEngPairs = [
    ["요약, 개요", "summary"],
    ["복제 가능한", "replicable"],
    ["장려[우대]책", "incentive"],
    ["바라건대", "hopefully"],
    ["박사 학위의", "doctoral"],
    ["상위 인지", "metacognition"],
    ["회복", "recovery"],
    ["아이를 봐 주는 사람, 베이비 시터", "babysitter"],
    ["정부", "government"],
    ["완화 장치", "reliver"],
    ["장인", "craftspeople"],
    ["약화시키다", "weaken"],
    ["터무니없는", "absurd"],
    ["프린터, 인쇄기", "printer"],
    ["흉내를 내다, 모방하다", "mimic"],
    ["문화의", "cultural"],
    ["식물군", "flora"],
    ["가볍게 입을 맞추다 / 쪼다", "peck"],
    ["낮, 주간", "daytime"],
    ["기간, 폭, 걸치다", "span"],
    ["제조[생산]하다", "manufacture"],
    ["제한시키다, 가두다", "confine"],
    ["독립적으로", "independently"],
    ["외국의, 이국적인", "exotic"],
    ["이미, 벌써", "already"],
    ["되씹다, 품다", "brood"],
    ["장애", "disability"],
    ["표준, 규범, 기준", "norm"],
    ["내부의", "internal"],
    ["평지", "flatland"],
    ["굴러떨어지다, 폭삭 무너지다", "tumble"],
    ["개성, 인간성", "personhood"],
    ["고통받다, 시달리다 / 겪다, 당하다", "suffer"],
    ["주름", "wrinkle"],
    ["층운", "stratus"],
    ["증오", "hatred"],
    ["형편없이", "poorly"],
    ["동정, 연민", "sympathy"],
    ["마무리 짓다, 완결하다", "finalize"],
    ["협력하다", "cooperate"],
    ["산이 많은, 산악의", "mountainous"],
    ["훔쳐보다, 살짝 보이다", "peek"],
    ["순수한, 깨끗한", "pure"],
    ["결말 / 급료 지불", "payoff"],
    ["열다", "unlock"],
    ["밝게 하다", "lighten"],
    ["전국적인", "nationwide"],
    ["예측", "prediction"],
    ["단, 대", "podium"],
    ["막", "membrane"],
  ];

  // =============================
  // 2. 공통 유틸
  // =============================
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // =============================
  // 3. 세트별 문제 객체 만들기
  // =============================

  // 3-1) 한국어 → 영어
  const allEng1 = korToEngPairs.map(([, eng]) => eng);
  const korToEngQuestions = korToEngPairs.map(([kor, eng]) => {
    let options = [eng];
    let wrong = allEng1.filter((e) => e !== eng);
    shuffle(wrong);
    options.push(...wrong.slice(0, 3));
    shuffle(options);
    return {
      type: "korToEng",
      title: kor,
      options,
      correctIndex: options.indexOf(eng),
      img: null,
    };
  });

  // 3-2) 영어 → 한국어
  const allKor2 = engToKorPairs.map(([, kor]) => kor);
  const engToKorQuestions = engToKorPairs.map(([eng, kor]) => {
    let options = [kor];
    let wrong = allKor2.filter((k) => k !== kor);
    shuffle(wrong);
    options.push(...wrong.slice(0, 3));
    shuffle(options);
    return {
      type: "engToKor",
      title: eng,
      options,
      correctIndex: options.indexOf(kor),
      img: null,
    };
  });

  // =============================
  // 4. 최종 문제 배열 (총 100문제)
  // 1~50 : 영어→한국어
  // 51~100: 한국어→영어
  // =============================
  const questions = [...engToKorQuestions, ...korToEngQuestions];

  // =============================
  // 5. 정답 테이블 동적 생성 (5문제씩 가로)
  // =============================
  const tbody = document.querySelector(".answer-table tbody");
  if (tbody) {
    tbody.innerHTML = "";
    const totalQuestions = questions.length; // 100
    const groupSize = 4;
    const groupCount = Math.ceil(totalQuestions / groupSize);

    for (let g = 0; g < groupCount; g++) {
      const start = g * groupSize + 1;

      const titleRow = document.createElement("tr");
      const titleLabelCell = document.createElement("td");
      titleLabelCell.textContent = "문제";
      titleRow.appendChild(titleLabelCell);

      const answerRow = document.createElement("tr");
      const answerLabelCell = document.createElement("td");
      answerLabelCell.textContent = "선택";
      answerRow.appendChild(answerLabelCell);

      for (let n = start; n < start + groupSize && n <= totalQuestions; n++) {
        const q = questions[n - 1];

        const titleTd = document.createElement("td");
        titleTd.id = "title-q" + n;
        titleTd.className = "question-title-cell";
        titleTd.textContent = q.title;
        titleRow.appendChild(titleTd);

        const answerTd = document.createElement("td");
        answerTd.id = "answer-q" + n;
        answerTd.className = "answer";
        answerRow.appendChild(answerTd);
      }

      tbody.appendChild(titleRow);
      tbody.appendChild(answerRow);
    }
  }

  // =============================
  // 6. 시험 상태 & DOM
  // =============================
  let currentQuestion = 0;
  let selectedIndex = null;

  const TIMER_DURATION = 20;
  let timeLeft = TIMER_DURATION;
  let countdownInterval = null;

  let correctCount = 0;
  const wrongList = [];

  const questionLabel = document.getElementById("questionLabel");
  const btn1 = document.querySelector(".one");
  const btn2 = document.querySelector(".two");
  const btn3 = document.querySelector(".three");
  const btn4 = document.querySelector(".four");
  //const btn5 = document.querySelector(".five");
  const buttons = [btn1, btn2, btn3, btn4];

  const timerSpan = document.getElementById("timer-sec");
  const imgTag = document.getElementById("questionImage"); // 있어도 되고 없어도 됨

  // =============================
  // 7. 타이머
  // =============================
  function updateTimerDisplay() {
    if (timerSpan) timerSpan.textContent = timeLeft;
  }

  function startTimer() {
    if (countdownInterval) clearInterval(countdownInterval);
    timeLeft = TIMER_DURATION;
    updateTimerDisplay();

    countdownInterval = setInterval(() => {
      timeLeft--;
      updateTimerDisplay();
      if (timeLeft <= 0) {
        clearInterval(countdownInterval);
        handleTimeout();
      }
    }, 1000);
  }

  function handleTimeout() {
    if (currentQuestion >= questions.length) return;

    const questionNumber = currentQuestion + 1;
    const answerCell = document.getElementById("answer-q" + questionNumber);

    if (answerCell) {
      answerCell.textContent = "-";
      answerCell.setAttribute("value", "-");
      answerCell.classList.add("wrong-cell");
    }

    wrongList.push(questionNumber);
    currentQuestion++;

    if (currentQuestion < questions.length) {
      renderQuestion();
    } else {
      finishExam();
    }
  }

  // =============================
  // 8. 시험 종료
  // =============================
  function finishExam() {
    if (countdownInterval) clearInterval(countdownInterval);

    const quizContainer = document.querySelector(".quiz-container");
    if (quizContainer) quizContainer.style.display = "none";

    const examOver = document.querySelector(".examOver");
    if (examOver) examOver.style.display = "block";
  }

  // =============================
  // 9. 문제 렌더링
  // =============================
  function renderQuestion() {
    const q = questions[currentQuestion];
    if (!q) return;

    selectedIndex = null;
    buttons.forEach((btn) => btn && btn.classList.remove("selected"));

    if (questionLabel) questionLabel.textContent = q.title;

    // 이 세트에서는 전부 이미지가 없으므로 항상 숨김
    if (imgTag) {
      imgTag.style.display = "none";
    }

    q.options.forEach((opt, idx) => {
      const btn = buttons[idx];
      if (btn) btn.textContent = idx + 1 + ". " + opt;
    });

    startTimer();
  }

  renderQuestion();

  // =============================
  // 10. 정답 확정 (Space)
  // =============================
  function handleAnswer(choiceIndex) {
    const q = questions[currentQuestion];
    if (!q) return;

    if (countdownInterval) clearInterval(countdownInterval);

    const selectedText = q.options[choiceIndex];
    const questionNumber = currentQuestion + 1;
    const answerCell = document.getElementById("answer-q" + questionNumber);

    if (answerCell) {
      answerCell.textContent = selectedText;
      answerCell.setAttribute("value", selectedText);
    }

    if (choiceIndex === q.correctIndex) {
      correctCount++;
    } else {
      wrongList.push(questionNumber);
      if (answerCell) answerCell.classList.add("wrong-cell");
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
      renderQuestion();
    } else {
      finishExam();
    }
  }

  // =============================
  // 11. 키보드 입력 (1~5 / Space)
  // =============================
  const keyToIndex = { 1: 0, 2: 1, 3: 2, 4: 3 };

  document.addEventListener("keydown", function (event) {
    if (currentQuestion >= questions.length) return;

    if (event.code === "Space") {
      event.preventDefault();
      if (selectedIndex === null) {
        alert("먼저 1~4 중 하나를 선택하세요.");
        return;
      }
      handleAnswer(selectedIndex);
      return;
    }

    const choiceIndex = keyToIndex[event.key];
    if (choiceIndex !== undefined) {
      selectedIndex = choiceIndex;
      buttons.forEach((btn, idx) => {
        if (!btn) return;
        if (idx === choiceIndex) btn.classList.add("selected");
        else btn.classList.remove("selected");
      });
    } else {
      alert("⚠️ 경고: 허용되지 않은 키입니다!");
    }
  });

  // =============================
  // 12. 마우스 클릭 경고 (시험 중에만)
  // =============================
  document.addEventListener("click", function () {
    if (currentQuestion >= questions.length) return;
    alert("⚠️ 경고: 허용되지 않은 키입니다!");
  });

  // =============================
  // 13. 결과보기 버튼 (전역 함수)
  // =============================
  window.resultOk = function () {
    // 비밀번호 확인 (1234)
    const inputPwd = prompt("결과를 보려면 비밀번호를 입력하세요:");

    if (inputPwd === null) {
      alert("취소되었습니다.");
      return;
    }

    if (inputPwd !== "1234") {
      alert("비밀번호가 올바르지 않습니다!");
      return;
    }
    const examOver = document.querySelector(".examOver");
    if (examOver) examOver.style.display = "none";

    const answerPanel = document.querySelector(".answer-panel");
    if (answerPanel) answerPanel.style.display = "block";

    const resultName = document.getElementById("result-name");
    const resultCorrect = document.getElementById("result-correct");
    const resultTotal = document.getElementById("result-total");

    if (resultName) resultName.textContent = studentNameValue;
    if (resultCorrect) resultCorrect.textContent = correctCount;
    if (resultTotal) resultTotal.textContent = questions.length;

    const answerPanelEl = document.querySelector(".answer-panel");
    if (!answerPanelEl) return;

    // pdf 저장 (html2canvas + jsPDF 가 script 로 로드되어 있어야 함)
    setTimeout(() => {
      html2canvas(answerPanelEl).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF("p", "mm", "a4");

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

        const d = new Date();
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, "0");
        const dd = String(d.getDate()).padStart(2, "0");
        const dateStr = `${yyyy}${mm}${dd}`;
        const safeName = (studentNameValue || "이름없음").replace(/\s+/g, "_");

        pdf.save(`${dateStr}_${safeName}_결과.pdf`);
      });
    }, 500);
  };
};
