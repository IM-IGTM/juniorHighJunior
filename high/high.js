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
    ["abatement", "감소, 경감, 완화"],
    ["phobia", "공포증"],
    ["accumulation", "축적, 누적"],
    ["FALSE", "틀린, 사실이 아닌"],
    ["streamline", "간소화[능률화]하다"],
    ["advisor", "고문, 조언자"],
    ["episode", "사건, 에피소드"],
    ["binge", "흥청망청하기, 폭식하기"],
    ["latch", "걸쇠, 자물쇠"],
    ["divine", "신성한, 아주 훌룡한, 멋진"],
    ["finalize", "마무리 짓다, 완결하다"],
    ["depict", "그리다, 묘사하다"],
    ["schematic", "도식적인"],
    ["utmost", "최고의, 극도의"],
    ["without", "~없이 (prep), ~없이 (adv)"],
    ["forbid", "금(지)하다"],
    ["paralyze", "마비시키다 / 무력하게 만들다"],
    ["devil", "악마"],
    ["cabbage", "양배추"],
    ["recent", "최근의"],
    ["priest", "사제, 성직자"],
    ["host", "주최하다, 주인"],
    ["fundamental", "근본적인, 핵심적인"],
    ["vanish", "사라지다"],
    ["alcohol", "술, 알코올"],
    ["mane", "갈기"],
    ["deliver", "배달하다 / (연설/강연 등을)하다"],
    ["latex", "유액, 라텍스"],
    ["scarp", "급경사, 단층 절벽"],
    ["messaging", "전달, 통신"],
    ["symbolize", "상징하다"],
    ["peril", "위험"],
    ["electrify", "전기로 움직이게 하다 / 열광시키다"],
    ["palace", "궁전"],
    ["devastate", "충격을 주다 / 파괴하다"],
    ["fragile", "부서지기 쉬운"],
    ["cramp", "경련, 막다, 방해하다"],
    ["punctual", "시간을 지키는"],
    ["afloat", "(물 위나 공중에) 뜬"],
    ["drain", "빼내다, 빠지다, 하수구"],
    ["fictional", "허구적인, 소설의"],
    ["almost", "거의"],
    ["sarcasm", "빈정댐, 비꼼"],
    ["vast", "방대한, 막대한"],
    ["decree", "명하다, 결정하다, 법령, 칙령"],
    ["mention", "언급하다, 말하다"],
    ["disability", "장애"],
    ["civil", "서민들의 / 인간의"],
    ["rainforest", "(열대) 우림"],
    ["fingerprint", "지문"],
  ];

  // 1-2) 한국어 → 영어 맞추기
  const korToEngPairs = [
    ["요트", "yacht"],
    ["금기(사항)", "taboo"],
    ["역설", "paradox"],
    ["동사", "verb"],
    ["겸손한, 초라한", "humble"],
    ["그 다음의, 차후의", "subsequent"],
    ["사직[사임]하다", "resign"],
    ["고립, 분리", "isolation"],
    ["의복, 복장", "attire"],
    ["합법성, 적법", "legitimacy"],
    ["법정, 법원", "court"],
    ["소개, 도입", "introduction"],
    ["너그러움", "generosity"],
    ["버리다, 폐기하다", "discard"],
    ["이익, 지지", "behalf"],
    ["암기하다", "memorize"],
    ["습격, 급습", "raid"],
    ["그러나, 반면에", "whereas"],
    ["기억(력)", "memory"],
    ["지도, 지침[안내]", "guidance"],
    ["진화", "evolution"],
    ["~을 할 수 없는", "incapable"],
    ["좋아하는[즐기는]", "fond"],
    ["조력[협력]자", "facilitator"],
    ["연구, 조사, 연구[조사]하다", "research"],
    ["회로, 순환", "circuit"],
    ["감명을 주다", "impress"],
    ["(번지점프용) 밧줄", "bungee"],
    ["채집하는 사람", "gatherer"],
    ["난장판, 큰 혼란", "shambles"],
    ["빛깔, 색조", "hue"],
    ["일탈, 탈선", "deviation"],
    ["감시", "surveillance"],
    ["잡식성의", "omnivorous"],
    ["기쁨, 환희", "joy"],
    ["수위, 관리인", "janitor"],
    ["두꺼운", "thick"],
    ["골수", "marrow"],
    ["익히지 않은, 날것의", "raw"],
    ["승무원, 선원, (특정한 기술을 가지고 함께 일을 하는) 팀, 반, 조", "crew"],
    ["지나친, 과도한", "undue"],
    ["납득시키다, 설득하다", "convince"],
    ["바보, 멍청이", "idiot"],
    ["흥미롭게도", "interestingly"],
    ["연대기", "chronicle"],
    ["먹을 수 있는", "edible"],
    ["절연[단열/방음] 처리를 하다", "insulate"],
    ["(세게) 치다, 부딫히다", "strike"],
    ["수력 발전, 수력 발전의", "hydro"],
    ["제공하다", "serve"],
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
