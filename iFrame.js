/* 
  🔍 전역상수 : 3개
  --> document.getElementById() 남발을 방지하기위해 상수를 만들어서 활용
  [1] TOGGLE_BUTTON   : 인풋태그    -> 파일 새로고침을 시작, 중단하는 토글(온오프) 버튼
  [2] FILE_NAME       : 인풋태그    -> 파일명 입력화면의 텍스트필드
  [3] SHOW_HTML       : ifrma 태그


  🔍 전역변수 : 4개
  --> 사용자가 상황에맞춰 사용할 수 있게 옵션제공
  [1] intervalId    : 타이머의 이름
  [2] intervalDelay : 타이머가 몇초 단위로 반복할지를 정했다. (기본값은 1)
  [3] selectedFile  : 텍스트상자에 입력된 내용을 보관해서, 새로운 입력값과 비교한다.
                      (조건문) 기존에 보관된 내용과 새로운 입력값이 같은지를 확인하기 위한 변수
  [4] dirPath       : 파일이름을 입력받았을때, 해당 파일이 있는 상대경로


  🔍 메소드 : 10개

  -> 전역변수를 관리하는 메소드 (변경, 비교)
  [1] intervalDelayChange
  [2] searchKeyword
  [3] dirPathShow

  -> 입력된 전역변수기준으로, 새로고침을 담당하는 메소드들
  [4] toggleTimer  
  [5] startTimer
  [6] stopTimer
  [7] restartTimer

  -> `사용하는 방법`, `사용자 설정` 버튼을 눌렀을때 모달창을 띄워주는 메소드
  [8] showModal
  [9] showOption
  
-> 🐣 아이프레임 ( 🥚 페이지 새로고침 ) 버튼 클릭시 페이지 새로고침 ( 타이머 동작 X )
  [10] pageReload




*/




//=============================================================>>>
// 전역상수들
const FILE_NAME     = document.getElementById("fileSearch");
const SHOW_HTML     = document.getElementById("getFrame");
const TOGGLE_BUTTON = document.getElementById("toggleBtn");

// 전역변수들
let intervalDelay = 1;
let intervalId;
let selectedFile;
let dirPath = "./";


// 전역변수 [2]번을 바꿔주는 역할 : 가장 아래 `사용자 설정 (모달창)`에서 사용하는 메소드
function intervalDelayChange(getSecond) {
  intervalDelay = getSecond.value;
  document.getElementById("showInterval").value = getSecond.value;
  
  /* 만약, 새로고침되고있는중에 새로고침 간격이 바뀌게되면 타이머를 다시 시작한다 */
  if (TOGGLE_BUTTON.value == "🌠 땡") { restartTimer(); }

}


// 전역변수 [3]번을 바꿔주는 역할 : 파일명을 입력받았을때 실행되는 메소드
function searchKeyword(keywordInput) {
  
  /* 같은 파일을 여러번 실행하는걸 방지하기위해, 기존 값(파일)과 다른지 확인 */
  if (keywordInput.value != selectedFile) { 
    selectedFile = keywordInput.value;
    restartTimer();
  }

}

// 전역변수 [4]번을 바꿔주는 역할 : `사용자 설정`에서 텍스트 입력받을때 실행될 메소드
function dirPathShow(getDir) {

  /* 입력받은 값이 없을경우엔 뒤에 백슬래시를 붙이지않음. */
  dirPath = "./" + getDir.value;
  if (getDir.value !== "") { dirPath += "/"; }
  
  getDir.placeholder = "상대경로가 " + dirPath + " 으로 변경되었습니다 !";
  getDir.value = "";
  
}





//=============================================================>>>

// 입력상자 왼쪽에 위치한 버튼을 누르게 될때 실행될 메소드
// 누를때마다 🧊 얼음 ↔ 🌠 땡 왔다갔다한다
function toggleTimer() {
  TOGGLE_BUTTON.value = (TOGGLE_BUTTON.value == "🧊 얼음") ? "🌠 땡" : "🧊 얼음";
  
  if (TOGGLE_BUTTON.value === "🧊 얼음") { 
    stopTimer(); 
  
  } else { startTimer(); }
    
}


// 파일을 intyervalDelay 초 단위로 새로고침해주는 메소드
function startTimer() {

  /* 만약, 얼음(멈춘)상태에서 실행되었다면, 땡! 하고 풀어준다  */
  
  if (TOGGLE_BUTTON.value == "🧊 얼음") { TOGGLE_BUTTON.value = "🌠 땡"; }
  
  /* 타이머 동작시키기 ( 1초 : intervalDelay x 1,000 )      */
  intervalId = setInterval(
    () => { SHOW_HTML.src = `${dirPath}${FILE_NAME.value}.html`; }
    , intervalDelay * 1000  );
}


// 타이머의 동작을 멈-춰! 해주는 메소드
function stopTimer() { clearInterval(intervalId); }


// 타이머가 중복되지않게 재시작해주는 메소드
function restartTimer() {
  stopTimer();
  startTimer();
}



/* sweetAlert 라이브러리 사용,  모달창 */

// 사용방법 안내 (모달창)
function showModal() {
  Swal.fire({
    icon: 'info',    
    title: '사용방법 안내',
    html: 
    "앗.. 여기에는 다 적을 수가 없네요 <br>" +
    "개발자 블로그로 이동해도 괜찮을까요?"
    ,
    confirmButtonText: '보러가기',
    
    showCancelButton: true,
    cancelButtonText: '닫기'

    // 요기부터 ~~~  ===================================================
  }) .then((result) => {
    if (result.value) {
      window.open("https://blog.naver.com/taehwa10404/223041041055");
    }
    // ===================================== 요기까진 , 지워도 되는 내용들
      
    })
}



// 사용사 설정 (모달창) 
function showOption() {


  Swal.fire({
    icon: 'success',
    title: '사용자 설정',
    html: `
      파일을 <input type="text" value="${intervalDelay}" id="showInterval" readonly>초마다 새로고침됩니다. <small>(기본값은 1초 입니다)</small>
      <br>      
      
      <input type="range" id="inputRange" oninput="intervalDelayChange(this);" min="1" max="9" value="${intervalDelay}">
      <br><br>
      
      .html 파일이 있는 위치를 상대경로로 입력할 수 있습니다<br>      
      <small><mark>자세한 내용은 '사용하는 방법' 버튼을 참고해주세요</small></mark>
      <br><br>

      <input type="text" id="inputPath" placeholder="현재 상대경로값은 ${dirPath} 로 되어있습니다 :)"
      onkeypress="if (event.keyCode == 13) {dirPathShow(this);}">
      `,
    
    confirmButtonText: '확인'
  
  });
}










// ======================================================>>>>
// 🐣 아이프레임 ( 🥚 페이지 새로고침 ) 버튼 클릭시 페이지 새로고침 ( 타이머 동작 X )

function pageReload() {

  /* iframe src 속성에  경로 + 검색창에 입력된 내용 + .html 내용을 할당해줌 */
  if (TOGGLE_BUTTON.value == "🧊 얼음") {
  SHOW_HTML.src =  dirPath + FILE_NAME.value + ".html";
  

  /* 만약,  이미 새로고침되고있는 상태라면 ? : 수동 새로고침 불가함 안내하기 */
  } else {

    Swal.fire({
      icon: 'error',
      title: '수동 새로고침 불가',
      html: `
        이런, 이미 ${intervalDelay}초 단위로 자동 새로고침이 되고있네요 <br>
        💡 해결방법 : 버튼이 <mark>" 🧊 얼음 " 상태일때</mark> 다시 시도
        `,
      
      confirmButtonText: '확인'

    })
  }


}
