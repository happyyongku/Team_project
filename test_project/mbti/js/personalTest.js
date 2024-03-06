class PersonalTest {
    constructor(target) {
        this.container = document.querySelector(target); // 추후 dom 내용을 바꾸기 위한 선택자
        this.page = 0; // 0: intro, 1: test, 2: result 현재 페이지
        this.progress = 0; // 현재 질문 단계
        this.questions = {
            IE: [{ question: '나는 혼자있을때 더 편안함을 느낀다.', answer: { a:'그렇다', b: '아니다'} }],
            SN: [{ question: '나는 아무 생각도 안할 수 있다.', answer: { a: '그렇다', b: '아니다' } }],
            TF: [{ question: '누군가 나를 싫어하는 걸 알았을 때.', answer: { a: '신경쓰지 않는다.', b: '왜 나를 싫어할까?' } }],
            JP: [{ question: '청소를 자주 하나요?', answer: { a: '그렇다', b: '아니다' } }],
        }; // 질문 모음
        this.results = []; // 사용자가 선택한 답모음
        this.resultInfors = {
            ISTJ: {title:"현실주의자", desc: "진솔하게 행동하는 자신의 모습에서 자부심을 느끼며, 자기 생각을 솔직하게 이야기하고 어떤 것에 헌신하기로 한 경우 최선을 다합니다."},
            ISFJ: {title:"수호자", desc: "겸손한 자세로 세상을 지탱하는 역할을 합니다. 이들은 근면하고 헌신적인 성격으로 주변 사람들에 대한 깊은 책임감을 느낍니다"},
            INFJ: {title:"옹호자", desc: "이상주의적이고 원칙주의적인 성격으로, 삶에 순응하는 대신 삶에 맞서 변화를 만들어 내고자 합니다.<br />이들에게 성공이란 돈이나 지위가 아니라 자아를 실현하고 다른 사람을 도우며 세상에서 선을 실천하는 일입니다."},
            INTJ: {title:"전략가", desc: "전략가는 이성적이면서도 두뇌 회전이 빠른 성격으로, 자신의 뛰어난 사고 능력을 자랑스러워하며 거짓말과 위선을 꿰뚫어 보는 능력이 있습니다. <br /> 하지만 이로 인해 끊임없이 생각하고 주변의 모든 것을 분석하려는 자신의 성향을 이해할 수 있는 사람을 찾는 데 어려움을 겪기도 합니다."},
            ISTP: {title:"장인", desc: "이성과 호기심을 통해 세상을 바라보며 눈과 손으로 직접 탐구하는 일을 즐깁니다. <br /> 이들은 타고난 손기술을 지니고 있으며, 다양한 프로젝트에서 유용하고 재미있는 물건을 만들어 내고 주변 환경에서 배울 점을 찾습니다."},
            ISFP: {title:"모험가", desc: "진정한 의미의 예술가라고 할 수 있습니다. <br /> 하지만 모험가라고 반드시 예술 업계에만 종사하는 것은 아닙니다. <br /> 이들에게는 삶 자체가 자신을 표현하기 위한 캔버스이기 때문입니다. 이들은 입는 옷부터 여가 시간을 보내는 방식까지 다양한 측면에서 자신의 독특한 개성을 생생히 드러냅니다."},
            INFP: {title:"중재자", desc: "언뜻 보기에 조용하고 자신을 내세우지 않는 것처럼 보이지만, 사실은 에너지와 열정이 넘치는 마음을 지닌 성격입니다. <br /> 이들은 창의적이고 상상력이 뛰어나며 몽상을 즐기는 성격으로 머릿속에서 수많은 이야기를 만들어 내곤 합니다."},
            INTP: {title:"논리술사", desc: " 자신의 독특한 관점과 활기 넘치는 지성에 자부심을 느끼며, 우주의 미스터리에 대해 깊이 생각하곤 합니다. <br /> 상당히 희귀한 성격이지만 뛰어난 창의성과 독창성으로 많은 사람 사이에서 존재감을 드러내곤 합니다."},
            ESTP: {title:"사업가", desc: " 항상 주변 사람에게 영향력을 행사하곤 합니다. <br /> 파티에서 가는 곳마다 사람들에게 둘러싸여 있는 사람을 발견한다면 바로 사업가일 것입니다. 이들은 직설적인 유머 감각을 지니고 있으며 수많은 사람의 관심을 받는 일을 즐깁니다."},
            ESFP: {title:"연예인", desc: "즉흥적으로 노래하고 춤을 추는 일을 즐기는 성격입니다. <br /> 이들은 지금 이 순간을 즐기며 남들도 자신과 같은 즐거움을 느낄 수 있기를 바랍니다. <br /> 또한 남을 응원하는 데 기꺼이 시간과 에너지를 투자하며, 매우 매력적인 방식으로 다른 사람의 기운을 북돋곤 합니다."},
            ENFP: {title:"활동가", desc: "진정으로 자유로운 영혼이라고 할 수 있으며 외향적이고 솔직하며 개방적인 성격입니다. <br /> 이들은 활기차고 낙관적인 태도로 삶을 대하며 다른 사람들 사이에서 돋보이곤 합니다."},
            ENTP: {title:"변론가", desc: "두뇌 회전이 빠르고 대담한 성격으로 현재 상황에 이의를 제기하는 데 거리낌이 없습니다. <br /> 변론가는 어떤 의견이나 사람에 반대하는 일을 두려워하지 않으며, 논란이 될 만한 주제에 대해 격렬하게 논쟁하는 일을 즐깁니다."},
            ESTJ: {title:"경영자", desc: "전통과 질서를 중시하는 성격으로, 자신이 생각하는 옳고 그름과 사회적 기준에 따라 가족과 공동체가 화합할 수 있도록 노력합니다. <br /> 이들은 정직과 헌신과 존엄성을 중시하며, 어려운 길을 기꺼이 앞장서고 다른 사람들에게 명확한 조언과 지도를 제공합니다."},
            ESFJ: {title:"친목질", desc: "생각보다 철저함 혼자 계획 세우고 그 계획 틀어지는 거 싫어함<br />술자리 좋아함(특히 새로운 사람과의)<br />남 눈치 많이 봄(남 생각 잘해서 그에 맞춰줌)<br />책 읽고 영화보는거 좋아함<br />상담, 고민 들어주는 거 잘함<br />친구, 가족 내 주변 인물들 다 챙기고 이 사람들 불행하면 내가 다 불행해지는 수준임 인간관계 틀어지면 스트레스 오지게 받음<br />인간관계에서 상처받아도 그 사람 배려한다고 얘기 못함<br />어디 나가면 어색한거 못참고 먼저 말 검"},
            ENFJ: {title:"선도자", desc: "삶에서 위대한 사명을 위해 힘써야 한다는 느낌을 받곤 합니다. <br /> 사려 깊고 이상주의적 성향을 지닌 선도자는 다른 사람과 주변 세상에 긍정적인 영향력을 발휘하기 위해 최선을 다하며, <br /> 어려운 상황에서도 올바른 일을 할 기회를 마다하지 않습니다."},
            ENTJ: {title:"통솔자", desc: "타고난 리더라고 할 수 있습니다. <br /> 이들은 카리스마와 자신감을 지니고 있으며 자신의 권한을 이용해 사람들이 공통된 목표를 위해 함께 노력하도록 이끕니다. <br /> 또한 이들은 냉철한 이성을 지닌 것으로 유명하며 자신이 원하는 것을 성취하기 위해 열정과 결단력과 날카로운 지적 능력을 활용합니다."},
        }
        this.init();
    }

    init() {
        this.questionArray = this.getQuestion(); // 질문을 배열로 저장

        const answerAButton = this.container.querySelector('button[data-answer="a"]');
        const answerBButton = this.container.querySelector('button[data-answer="b"]');
        const startButton = this.container.querySelector('button[data-action="start"]');
        const restartButton = this.container.querySelector('button[data-action="restart"]');

        answerAButton.addEventListener('click', () => this.submitAnswer(answerAButton.innerText));
        answerBButton.addEventListener('click', () => this.submitAnswer(answerBButton.innerText));
        startButton.addEventListener('click', this.start.bind(this));
        restartButton.addEventListener('click', this.restart.bind(this));

        /*
        2023-05-19 리팩토링
        1. 이벤트 리스너 함수 분리: 이벤트 리스너를 분리하여 코드 가독성 향상.
        2. e.target.innerText 대신 클릭한 버튼의 innerText를 매개변수로 전달. (직관성)
        3. querySelector 결과를 변수에 저장: 반복적인 querySelector 호출을 피하여 가독성 향상.
        */

        this.render();
    }

    start() {
        if(this.progress !== 0) return; // 진행중이면 실행하지 않음

        this.page = 1;
        this.render();
    }

    restart() {
        this.page = 0;
        this.progress = 0;
        this.results = [];
        this.render();
    }

    getQuestion() { // questions의 키를 참조해서 질문을 반환
        return Object.entries(this.questions)
        .flatMap(([type, questions]) => questions.map(question => ({ ...question, type })));

        /*
        2023-05-19 리팩토링
        1. Object.entries를 사용하여 객체를 배열로 변환 후 이차원 배열을 flatMap으로 평탄화.
        */
    }

    getCurrentQuestions() { // 현재 progress의 질문을 반환
        const currentQuestionIndex = this.progress;
        return this.questionArray[currentQuestionIndex];

        /*
        2023-05-19 리팩토링
        1. currentQuestionIndex 변수 도입으로 현재 질문의 인덱스를 명시적으로 표현하여 가독성 향상.
        */
    }

    submitAnswer(answer) {
        const currentQuestion = this.questionArray[this.progress];

        if (this.questionArray.length <= this.progress + 1) {
            this.page = 2;
            this.render();
        }

        const selectedAnswer = Object.keys(currentQuestion.answer)
        .find(selectedAnswer => currentQuestion.answer[selectedAnswer] === answer);

        this.results.push({
            type: currentQuestion.type,
            answer: selectedAnswer
        });

        this.progress++;
        this.render();

        return this.getCurrentQuestions();

        /*
        2023-05-19 리팩토링
        1. this.questionArray[this.progress]를 반복해서 사용하는 대신 currentQuestion라는 변수를 도입하여 가독성 향상
        2. Object.keys() 및 find() 메서드를 사용하여 사용자가 선택한 답변에 해당하는 키 값을 찾는 과정을 단순화.
        */
    }

    calcResult() {
        const totalResult = Object.keys(this.questions).reduce((acc, cur) => {
            acc[cur] = this.results
                .filter(result => result.type === cur)
                .reduce((acc, cur) => {
                acc[cur.answer] = acc[cur.answer] ? acc[cur.answer] + 1 : 1;
                return acc;
            }, {});
            return acc;
        }, {});
        
        return this.createPersonalResult(totalResult);
        /*
        2023-05-19 리팩토링
        1. this.result = 부분 제거, totalResult 변수에 할당 이후 중첩 reduce() 메서드를 사용하여 가독성 향상.
        */
    }

    createPersonalResult(totalResult) {
        return Object.keys(totalResult).reduce((acc, cur) => {
            const result = totalResult[cur];
            
            if (!result.a) return acc + cur[1];
            if (!result.b) return acc + cur[0];
        
            if (result.a === result.b) {
                return acc + cur[0];
            }
            
            return acc + (result.a > result.b ? cur[0] : cur[1]);
        }, "");
        /*
        2023-05-19 리팩토링
        1. totalResult[cur]를 result 변수로 저장하여 가독성 향상
        2. if문의 반환 값이 같은 경우를 하나로 통합하여 가독성을 개선
        */
    }

    render() {
        const introContainer = this.container.querySelector('.intro_container');
        const testContainer = this.container.querySelector('.test_container');
        const resultContainer = this.container.querySelector('.result_container');
        const resultImage = this.container.querySelector('#resultImage');

        if (this.page === 0) {
            introContainer.classList.add('active');
            testContainer.classList.remove('active');
            resultContainer.classList.remove('active');

        } else if (this.page === 1) {
            testContainer.classList.add('active');
            introContainer.classList.remove('active');
            resultContainer.classList.remove('active');

            const progressElement = this.container.querySelector('.progress');
            const questionElement = this.container.querySelector('.question');
            const answerAElement = this.container.querySelector('button[data-answer="a"]');
            const answerBElement = this.container.querySelector('button[data-answer="b"]');
        
            progressElement.textContent = `Q${this.progress + 1}. `;
            questionElement.textContent = this.getCurrentQuestions().question;
            answerAElement.textContent = this.getCurrentQuestions().answer.a;
            answerBElement.textContent = this.getCurrentQuestions().answer.b;

        } else if (this.page === 2) {
            resultContainer.classList.add('active');
            introContainer.classList.remove('active');
            testContainer.classList.remove('active');
        
            const resultTextElement = this.container.querySelector('.result_text');
            const resultInforTitleElement = this.container.querySelector('.result_infor_title');
            const resultInforElement = this.container.querySelector('.result_infor');
            const calcResult = this.calcResult();

            const resultImagePath = './src/images/result_${calcResult.toLowerCase()}'.png;
            resultImage.src = resultImagePath;
        
            resultTextElement.innerHTML = `당신의 성향은 <span class="point_text">${calcResult}</span>입니다.`;
            resultInforTitleElement.innerHTML = `[ ${this.resultInfors[calcResult].title} ]`;
        
            resultInforElement.innerHTML = this.resultInfors[calcResult].desc
            .split('<br />')
            .map(el => `<li>${el}</li>`)
            .join('');
        }
        /*
        2023-05-19 리팩토링
        1. 각각의 UI 요소를 변수로 저장하여 가독성을 향상 
        2. 텍스트 콘텐츠와 HTML 내용을 설정하는 부분을 변수로 분리하여 가독성을 개선
        */
    }
}
