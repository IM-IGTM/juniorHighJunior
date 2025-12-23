window.onload = function () {
  // -----------------------------
  // 0. 학생 이름 (결과에서 사용)
  // -----------------------------
  const urlParams = new URLSearchParams(window.location.search);
  const studentNameValue = urlParams.get("studentName") || "이름 정보 없음";

  // ===============================
  // 1. 공통: 배열 섞기 함수
  // ===============================
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  // ----------------------------------------------------
  // 1유형 영어 → 한국어 뜻 고르기 (1~50)
  // ----------------------------------------------------
  const engToKorPairs = [
    ["style", "방식, 스타일"],
    ["pianist", "피아니스트"],
    ["skyscraper", "고층건물"],
    ["misty", "안개가 낀 / 흐릿한"],
    ["nearly", "거의"],
    ["swamp", "늪, 습지, 쇄도하다"],
    ["pace", "속도"],
    ["trunk", "나무의 몸통"],
    ["buffalo", "물소"],
    ["originate", "비롯되다, 유해하다"],
    ["plug", "플러그, 마개, 틀어막다, 메우다"],
    ["entire", "전체의"],
    ["streak", "줄/구속/연속"],
    ["liberty", "자유"],
    ["toe", "발가락"],
    ["favorite", "(가장) 좋아하는, (가장) 좋아하는 것"],
    ["appear", "나타나다, 발생하다 / ~인 것 같다"],
    ["concern", "영향을 미치다[관련되다], 우려"],
    ["snip", "(가위로 싹둑) 자르기, 자르다"],
    ["curry", "카레"],
    ["page", "페이지, 쪽"],
    ["fear", "공포, 두려움"],
    ["embassy", "대사관"],
    ["magnetic", "자성의"],
    ["attract", "마음을 끌다"],
    ["critique", "평론"],
    ["inventor", "발명가"],
    ["needy", "어려운, 궁핍한"],
    ["grammar", "문법"],
    ["swelling", "(살갗의) 부기"],
    ["toad", "두꺼비"],
    ["uncommon", "흔하지 않은"],
    ["shaggy", "텁수룩한"],
    ["patient", "환자, 참을성 있는"],
    ["scope", "범위/기회[여지/능력]"],
    ["youth", "젊음, 청춘/어린 시절"],
    ["silent", "조용한"],
    ["Atlantic", "대서양, 대서양의"],
    ["affection", "애착, 애정"],
    ["guard", "경비, 지키다, 보호하다"],
    ["multiple", "많은, 다수의"],
    ["Greek", "그리스인/그리스어"],
    ["horror", "공포"],
    ["plenty", "충분한 양, 많이"],
    ["doping", "도핑, 약물복용"],
    ["produce", "생산하다, 낳다"],
    ["couple", "두 사람[개]/몇 명[개]의/커플"],
    ["destination", "목적지"],
    ["witness", "목격자, 증인, 목격하다"],
    ["mercy", "자비"],
    ["antique", "골동품인, 골동품"],
    ["reaction", "반응, 반작용"],
    ["assign", "맡기다, 배정하다"],
    ["quickly", "빨리[빠르게], 곧"],
    ["digest", "소화하다, 소화되다"],
    ["refill", "다시 채우다, 리필 제품"],
    ["weakness", "약함, 약점"],
    ["fillet", "살코기"],
    ["championship", "선수권 대회"],
    ["caffeine", "카페인"],
    ["pottery", "도자기, 도예"],
    ["household", "가정"],
    ["ballroom", "무도회장, 연회장"],
    ["eruption", "분출, 폭발"],
    ["monarchy", "군주제"],
    ["clue", "단서, 실마리"],
    ["pinch", "꼬집다"],
    ["barcode", "바코드"],
    ["dairy", "유제품의"],
    ["suffocation", "질식"],
    ["grace", "우아함, 품위"],
    ["invade", "침입하다"],
    ["killer", "살인자"],
    ["workshop", "워크숍, 연수회"],
    ["plentiful", "풍부한"],
    ["greedy", "탐욕스러운"],
    ["solo", "단독의, 솔로의"],
    ["cancel", "취소하다"],
    ["mile", "마일(거리 단위)"],
    ["understand", "이해하다"],
  ];

  const allKor2 = engToKorPairs.map(([, kor]) => kor);

  const type2Questions = engToKorPairs.map(([eng, kor]) => {
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

  // ----------------------------------------------------
  // 2유형 한국어 → 영어 고르기 (51~100)
  // ----------------------------------------------------
  const korToEngPairs = [
    ["거리", "distance"],
    ["옷", "clothing"],
    ["싫어하다, 반감, 싫음", "dislike"],
    ["딱정벌레", "beetle"],
    ["선원", "sailor"],
    ["가죽(옷)", "leather"],
    ["번빵, (둥글납작한) 빵", "bun"],
    ["4분의 1", "quarter"],
    ["출판하다", "publish"],
    ["삼림 지대", "woodland"],
    ["작동시키다, 활성화시키다", "activate"],
    ["우선 사항", "priority"],
    ["살금살금(몰래)가다, 몰래 하다(가져가다)", "sneak"],
    ["연락하다, 연락", "contact"],
    ["촉진하다/홍보하다/승진시키다", "promote"],
    ["정확히", "exactly"],
    ["천문학자", "astronomer"],
    ["굶주리다", "starve"],
    ["기꺼이, 기쁘게", "gladly"],
    ["건강하지 못한, 건강에 해로운", "unhealthy"],
    ["(도구장비) 세트", "kit"],
    ["완전히", "totally"],
    ["카카오나무", "cacao"],
    ["구입하다, 구입, 구매", "purchase"],
    ["기본적인", "basic"],
    ["다발, 묶음/많음", "bunch"],
    ["어리석은, 바보같은", "stupid"],
    ["요람, 발상지, 부드럽게 안다", "cradle"],
    ["해산물", "seafood"],
    ["아내", "wife"], // ⚠️ 표에 sife 라고 되어있는데 오타라서 wife로 고쳤어요
    ["칭찬하다, 칭찬", "compliment"],
    ["전문가", "expert"],
    ["상대", "opponent"],
    ["시달리다, 고통받다 / 겪다[당하다]", "suffer"],
    ["현실적인", "realistic"],
    ["기차, 교육시키다", "train"],
    ["분명한[명백한] / 너무 빤한", "obvious"],
    ["알루미늄", "aluminum"],
    ["스케치, 스케치하다", "sketch"],
    ["결합시키다, 결합되다, 유대, 끈", "bond"],
    ["경찰", "police"],
    ["측면, 양상", "aspect"],
    ["섞다, 혼합", "blend"],
    ["청력, 듣기", "hearing"],
    ["선택적인", "optional"],
    ["어느 것도 ~아니다", "neither"],
    ["단백질", "protein"],
    ["모래로 뒤덮인", "sandy"],
    ["레모네이드", "lemonade"],
    ["예방책", "precaution"],
    ["거리", "distance"],
    ["옷", "clothing"],
    ["싫어하다, 반감, 싫음", "dislike"],
    ["딱정벌레", "beetle"],
    ["선원", "sailor"],
    ["가죽(옷)", "leather"],
    ["번빵, (둥글납작한) 빵", "bun"],
    ["4분의 1", "quarter"],
    ["출판하다", "publish"],
    ["삼림 지대", "woodland"],
    ["작동시키다, 활성화시키다", "activate"],
    ["우선 사항", "priority"],
    ["살금살금(몰래)가다, 몰래 하다(가져가다)", "sneak"],
    ["연락하다, 연락", "contact"],
    ["촉진하다, 홍보하다, 승진시키다", "promote"],
    ["정확히", "exactly"],
    ["천문학자", "astronomer"],
    ["굶주리다", "starve"],
    ["기꺼이, 기쁘게", "gladly"],
    ["건강하지 못한, 건강에 해로운", "unhealthy"],
    ["(도구장비) 세트", "kit"],
    ["완전히", "totally"],
    ["카카오나무", "cacao"],
    ["구입하다, 구입, 구매", "purchase"],
    ["기본적인", "basic"],
    ["다발, 묶음, 많음", "bunch"],
    ["어리석은, 바보같은", "stupid"],
    ["요람, 발상지, 부드럽게 안다", "cradle"],
    ["해산물", "seafood"],
    ["아내", "sife"],
  ];

  const allEng1 = korToEngPairs.map(([, eng]) => eng);

  const type1Questions = korToEngPairs.map(([kor, eng]) => {
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

  // ===============================
  // 5. 최종 questions 배열 (1~100)
  // ===============================
  const questions = [
    ...type2Questions, // 1~50
    ...type1Questions, // 51~100
  ];

  // 이제 questions를 기존 시험 로직에서 그대로 사용하면 됩니다.
  // 예) questions[currentQuestion].title / options / correctIndex …

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
