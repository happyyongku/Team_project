// 자바스크립트에서 선언하는 변수 기호
const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");
const endPoint = 12;  //질문 개수만큼 정의
const select= [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];  //버튼 선택 배열 저장용

// 결과 계산하기 위한 함수
function calResult(){
  var pointArray = [
    { name: 'f0', value: 0, key: 0},
    { name: 'f1', value: 0, key: 1},
    { name: 'f2', value: 0, key: 2},
    { name: 'f3', value: 0, key: 3},
    { name: 'f4', value: 0, key: 4},
    { name: 'f5', value: 0, key: 5},
    { name: 'f6', value: 0, key: 6},
    { name: 'f7', value: 0, key: 7},
    { name: 'f8', value: 0, key: 8},
    { name: 'f9', value: 0, key: 9},
    { name: 'f10', value: 0, key: 10},
    { name: 'f11', value: 0, key: 11},
  ]

  for(let i = 0; i < endPoint; i++){
    // qna 에서 선택한 것을 select 배열에 담긴 값을 호출해서 카운트
    var target = qnaList[i].a[select[i]];
    for(let j = 0; j < target.type.length; j++){
      for(let k = 0; k < pointArray.length; k++){
        if(target.type[j] === pointArray[k].name){
          pointArray[k].value += 1;
        }
      }
    }
  }
  // val 순으로 정렬
  var resultArray = pointArray.sort(function (a, b){
    if(a.value > b.value){
      return -1;
    }
    if(a.value < b.value){
      return 1;
    }
    return 0;
  });
  console.log(resultArray);
  let resultword = resultArray[0].key;
  return resultword;
}

function setResult(){
  let point = calResult();
  const resultName = document.querySelector('.resultname');
  resultName.innerHTML = infoList[point].name;

  var resultImg = document.createElement('img');
  const imgDiv = document.querySelector('#resultImg');
  var imgURL = 'img/image-' + point + '.png';
  resultImg.src = imgURL;
  resultImg.alt = point;
  resultImg.classList.add('img-fluid');
  imgDiv.appendChild(resultImg);

  const resultDesc = document.querySelector('.resultDesc');
  resultDesc.innerHTML = infoList[point].desc;
}

function goResult(){
  qna.style.WebkitAnimation = "fadeOut 1s";
  qna.style.animation = "fadeOut 1s";
  setTimeout(() => {
    result.style.WebkitAnimation = "fadeIn 1s";
    result.style.animation = "fadeIn 1s";
    setTimeout(() => {
      qna.style.display = 'none';
      result.style.display = "block";
    }, 450)})
    setResult();

    console.log(select);
    calResult();
}



// html에 qBox가 선택됨
function addAnswer(answerText, qIdx, idx){
  var a = document.querySelector('.answerBox');
  // 지정한 태그 네임에 HTML 요소 만들어 반환
  var answer = document.createElement('button');
  answer.classList.add('answerList');
  // 버튼과 버튼사이 간격
  answer.classList.add('my-3');
  answer.classList.add('py-3');
  answer.classList.add('mx-auto');

  a.appendChild(answer);
  answer.innerHTML = answerText;

  answer.addEventListener("click", function(){
    var children = document.querySelectorAll('.answerList');
    for(let i = 0; i < children.length; i++){
      // 버튼 하나만 눌러도 모든 버튼이 사라짐
      children[i].disabled = true;
      children[i].style.display = 'none';
    }
    setTimeout(() => {
      select[qIdx] = idx;
      for(let i = 0; i < children.length; i++){
        children[i].style.display = 'none';
      }
    }
    )
    goNext(++qIdx);
  }, false);
}

function goNext(qIdx){
  // 마지막 질문 도달하면 결과 페이지로 넘어가기
  if(qIdx == endPoint){
    goResult();
    return;
  }

  var q = document.querySelector('.qBox');
  // 스크립트 중 qnaList의 첫번째 요소의 q를 불러온다 => 요소는 변수로 설정해서 바뀌게 하기
  q.innerHTML = qnaList[qIdx].q;
  // a가 답변이고 for문으로 반복문 돌리기
  for(let i in qnaList[qIdx].a){
    addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
  }
  // 상태표시바 퍼센트 함수 구현하기
  var status = document.querySelector('.statusBar');
  status.style.width = (100/endPoint) * (qIdx+1) + '%'
}

// begin 시작하기 버튼 눌렸을때 실행되는 것
function begin(){
  // 페이드아웃, 페이드인 추가, 초시간까지 써주어야 작동됨
  main.style.WebkitAnimation = "fadeOut 1s";
  main.style.animation = "fadeOut 1s";
  // qna 화면으로 옮기기
  setTimeout(() => {
    qna.style.WebkitAnimation = "fadeIn 1s";
    qna.style.animation = "fadeIn 1s";
    setTimeout(() => {
      main.style.display = 'none';
      qna.style.display = "block"
    }, 450)
    // +1씩 증가시켜주는 변수를 만드는 인덱스 함수
    let qIdx = 0;
    goNext(qIdx);
  }, 450);
}