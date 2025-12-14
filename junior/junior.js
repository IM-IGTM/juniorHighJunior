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
    ["reach", "~에 이르다, 닿다, 도달하다"],
    ["escape", "탈출하다, 탈출, 도피"],
    ["electronic", "전자의"],
    ["specially", "특별히, 특히"],
    ["flexible", "신축성(융통성)있는, 유연한"],
    ["research", "연구, 조사, 연구(조사)하다"],
    ["film", "영화, 촬영하다"],
    ["include", "포함하다"],
    ["injure", "부상을 입다(입히다)"],
    ["disaster", "참사, 재난, 재해"],
    ["leather", "가죽(옷)"],
    ["double", "두 배의"],
    ["enable", "~을 할 수 있게 하다"],
    ["activate", "작동시키다, 활성화시키다"],
    ["dull", "따분한, 재미없는, 둔한"],
    ["rate", "속도/비율, 평가하다"],
    ["expect", "예상[기대]하다"],
    ["needle", "바늘"],
    ["noble", "상류층(귀족), 고결한, 고귀한"],
    ["mysterious", "신비한, 불가사의한"],
    ["method", "방법, 체계성"],
    ["witness", "목격자, 증인, 목격하다"],
    ["vaccination", "백신(예방)접종"],
    ["shear", "털을 깎다, 부러지다"],
    ["Arctic", "북극의, 북극"],
    ["nation", "국가, 국민"],
    ["composer", "작곡가"],
    ["humid", "습한"],
    ["contain", "~이 들어(함유되어) 있다"],
    ["frown", "얼굴을 찌푸리다, 찡그림"],
    ["sum", "액수, 합계, 계산"],
    ["organize", "준비(조직)하다, 정리하다"],
    ["assembly", "의회, 입법기관, 집회"],
    ["mainly", "주로, 대부분"],
    ["toad", "두꺼비"],
    ["tooth", "이, 이빨, 치아"],
    ["operation", "수술, 작전, 활동, 기업, 사업체"],
    ["amusement", "오락, 놀이, 재미, 우스움"],
    ["personal", "개인의, 개인적인"],
    ["teamwork", "팀워크, 협동작업"],
    ["elegant", "우아한"],
    ["medal", "메달, 훈장"],
    ["branch", "나뭇가지, 분점, 지사"],
    ["gather", "모으다, 모이다"],
    ["technology", "기술"],
    ["author", "작가, 저자"],
    ["inquiry", "연구, 탐구, 조사 / 질문, 문의"],
    ["practical", "실용적인, 현실적인"],
    ["rid", "없애다, 제거하다"],
    ["whether", "~인지 아닌지"],
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
    ["대답하다, 대응하다", "respond"],
    ["리그, 연합, 연맹", "league"],
    ["부딪치다, 튀어나온 부분", "bump"],
    ["뿔", "horn"],
    ["받다", "receive"],
    ["동일한, 동등한", "equal"],
    ["바코드", "barcode"],
    ["(도구장비) 세트", "kit"],
    ["맞추다(조정하다), 재단사", "tailor"],
    ["빙하", "glacier"],
    ["갑옷, 갑옷을 입히다", "armor"],
    ["스케치, 스케치하다", "sketch"],
    ["술집, 바", "bar"],
    ["원인, 이유, 야기하다", "cause"],
    ["가혹한, 혹독한", "harsh"],
    ["자유", "liberty"],
    ["구부리다", "bend"],
    ["상관, 상사, 사장", "boss"],
    ["핸드볼", "handball"],
    ["껌, 잇몸, 고무신", "gum"],
    ["측정하다[재다]", "measure"],
    ["증기, 증발시키다", "vapor"],
    ["요소, 성분", "element"],
    ["삭제하다", "delete"],
    ["과감한, 극단적인", "drastic"],
    ["~하는 동안, 잠깐, 잠시, 동안", "while"],
    ["벌거벗은, 맨-", "bare"],
    ["질투하는", "jealous"],
    ["인정하다, 시인하다, 허가하다", "admit"],
    ["잎이 무성한", "leafy"],
    ["하녀(가정부)", "maid"],
    ["의회", "council"],
    ["고무(격려)하다, 영감을 주다", "inspire"],
    ["흡수하다", "absorb"],
    ["빙산", "iceberg"],
    ["털로 덮인, 털 같은", "furry"],
    ["청바지", "jeans"],
    ["화석", "fossil"],
    ["스튜디오, (무용)강습소(연습실)", "studio"],
    ["화가, 예술가, 아티스트", "artist"],
    ["적", "enemy"],
    ["키스하다, 키스, 입맞춤", "kiss"],
    ["방정식, 등식", "equation"],
    ["(어깨를) 으쓱하다", "shrug"],
    ["비치다, 비추다, 섬광, 번쩍임", "flash"],
    ["시간, 기간, 회기", "session"],
    ["감촉(질감)", "texture"],
    ["웃기는, 재미있는, 희극의", "comic"],
    ["둥지", "nest"],
    ["실내의", "indoor"],
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
