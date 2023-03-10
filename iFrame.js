/* 
  π μ μ­μμ : 3κ°
  --> document.getElementById() λ¨λ°μ λ°©μ§νκΈ°μν΄ μμλ₯Ό λ§λ€μ΄μ νμ©
  [1] TOGGLE_BUTTON   : μΈννκ·Έ    -> νμΌ μλ‘κ³ μΉ¨μ μμ, μ€λ¨νλ ν κΈ(μ¨μ€ν) λ²νΌ
  [2] FILE_NAME       : μΈννκ·Έ    -> νμΌλͺ μλ ₯νλ©΄μ νμ€νΈνλ
  [3] SHOW_HTML       : ifrma νκ·Έ


  π μ μ­λ³μ : 4κ°
  --> μ¬μ©μκ° μν©μλ§μΆ° μ¬μ©ν  μ μκ² μ΅μμ κ³΅
  [1] intervalId    : νμ΄λ¨Έμ μ΄λ¦
  [2] intervalDelay : νμ΄λ¨Έκ° λͺμ΄ λ¨μλ‘ λ°λ³΅ν μ§λ₯Ό μ νλ€. (κΈ°λ³Έκ°μ 1)
  [3] selectedFile  : νμ€νΈμμμ μλ ₯λ λ΄μ©μ λ³΄κ΄ν΄μ, μλ‘μ΄ μλ ₯κ°κ³Ό λΉκ΅νλ€.
                      (μ‘°κ±΄λ¬Έ) κΈ°μ‘΄μ λ³΄κ΄λ λ΄μ©κ³Ό μλ‘μ΄ μλ ₯κ°μ΄ κ°μμ§λ₯Ό νμΈνκΈ° μν λ³μ
  [4] dirPath       : νμΌμ΄λ¦μ μλ ₯λ°μμλ, ν΄λΉ νμΌμ΄ μλ μλκ²½λ‘


  π λ©μλ : 10κ°

  -> μ μ­λ³μλ₯Ό κ΄λ¦¬νλ λ©μλ (λ³κ²½, λΉκ΅)
  [1] intervalDelayChange
  [2] searchKeyword
  [3] dirPathShow

  -> μλ ₯λ μ μ­λ³μκΈ°μ€μΌλ‘, μλ‘κ³ μΉ¨μ λ΄λΉνλ λ©μλλ€
  [4] toggleTimer  
  [5] startTimer
  [6] stopTimer
  [7] restartTimer

  -> `μ¬μ©νλ λ°©λ²`, `μ¬μ©μ μ€μ ` λ²νΌμ λλ μλ λͺ¨λ¬μ°½μ λμμ£Όλ λ©μλ
  [8] showModal
  [9] showOption
  
-> π£ μμ΄νλ μ ( π₯ νμ΄μ§ μλ‘κ³ μΉ¨ ) λ²νΌ ν΄λ¦­μ νμ΄μ§ μλ‘κ³ μΉ¨ ( νμ΄λ¨Έ λμ X )
  [10] pageReload




*/




//=============================================================>>>
// μ μ­μμλ€
const FILE_NAME     = document.getElementById("fileSearch");
const SHOW_HTML     = document.getElementById("getFrame");
const TOGGLE_BUTTON = document.getElementById("toggleBtn");

// μ μ­λ³μλ€
let intervalDelay = 1;
let intervalId;
let selectedFile;
let dirPath = "./";


// μ μ­λ³μ [2]λ²μ λ°κΏμ£Όλ μ­ν  : κ°μ₯ μλ `μ¬μ©μ μ€μ  (λͺ¨λ¬μ°½)`μμ μ¬μ©νλ λ©μλ
function intervalDelayChange(getSecond) {
  intervalDelay = getSecond.value;
  document.getElementById("showInterval").value = getSecond.value;
  
  /* λ§μ½, μλ‘κ³ μΉ¨λκ³ μλμ€μ μλ‘κ³ μΉ¨ κ°κ²©μ΄ λ°λκ²λλ©΄ νμ΄λ¨Έλ₯Ό λ€μ μμνλ€ */
  if (TOGGLE_BUTTON.value == "π  λ‘") { restartTimer(); }

}


// μ μ­λ³μ [3]λ²μ λ°κΏμ£Όλ μ­ν  : νμΌλͺμ μλ ₯λ°μμλ μ€νλλ λ©μλ
function searchKeyword(keywordInput) {
  
  /* κ°μ νμΌμ μ¬λ¬λ² μ€ννλκ±Έ λ°©μ§νκΈ°μν΄, κΈ°μ‘΄ κ°(νμΌ)κ³Ό λ€λ₯Έμ§ νμΈ */
  if (keywordInput.value != selectedFile) { 
    selectedFile = keywordInput.value;
    restartTimer();
  }

}

// μ μ­λ³μ [4]λ²μ λ°κΏμ£Όλ μ­ν  : `μ¬μ©μ μ€μ `μμ νμ€νΈ μλ ₯λ°μλ μ€νλ  λ©μλ
function dirPathShow(getDir) {

  /* μλ ₯λ°μ κ°μ΄ μμκ²½μ°μ λ€μ λ°±μ¬λμλ₯Ό λΆμ΄μ§μμ. */
  dirPath = "./" + getDir.value;
  if (getDir.value !== "") { dirPath += "/"; }
  
  getDir.placeholder = "μλκ²½λ‘κ° " + dirPath + " μΌλ‘ λ³κ²½λμμ΅λλ€ !";
  getDir.value = "";
  
}





//=============================================================>>>

// μλ ₯μμ μΌμͺ½μ μμΉν λ²νΌμ λλ₯΄κ² λ λ μ€νλ  λ©μλ
// λλ₯Όλλ§λ€ π§ μΌμ β π  λ‘ μλ€κ°λ€νλ€
function toggleTimer() {
  TOGGLE_BUTTON.value = (TOGGLE_BUTTON.value == "π§ μΌμ") ? "π  λ‘" : "π§ μΌμ";
  
  if (TOGGLE_BUTTON.value === "π§ μΌμ") { 
    stopTimer(); 
  
  } else { startTimer(); }
    
}


// νμΌμ intyervalDelay μ΄ λ¨μλ‘ μλ‘κ³ μΉ¨ν΄μ£Όλ λ©μλ
function startTimer() {

  /* λ§μ½, μΌμ(λ©μΆ)μνμμ μ€νλμλ€λ©΄, λ‘! νκ³  νμ΄μ€λ€  */
  
  if (TOGGLE_BUTTON.value == "π§ μΌμ") { TOGGLE_BUTTON.value = "π  λ‘"; }
  
  /* νμ΄λ¨Έ λμμν€κΈ° ( 1μ΄ : intervalDelay x 1,000 )      */
  intervalId = setInterval(
    () => { SHOW_HTML.src = `${dirPath}${FILE_NAME.value}.html`; }
    , intervalDelay * 1000  );
}


// νμ΄λ¨Έμ λμμ λ©-μΆ°! ν΄μ£Όλ λ©μλ
function stopTimer() { clearInterval(intervalId); }


// νμ΄λ¨Έκ° μ€λ³΅λμ§μκ² μ¬μμν΄μ£Όλ λ©μλ
function restartTimer() {
  stopTimer();
  startTimer();
}



/* sweetAlert λΌμ΄λΈλ¬λ¦¬ μ¬μ©,  λͺ¨λ¬μ°½ */

// μ¬μ©λ°©λ² μλ΄ (λͺ¨λ¬μ°½)
function showModal() {
  Swal.fire({
    icon: 'info',    
    title: 'μ¬μ©λ°©λ² μλ΄',
    html: 
    "μ.. μ¬κΈ°μλ λ€ μ μ μκ° μλ€μ <br>" +
    "κ°λ°μ λΈλ‘κ·Έλ‘ μ΄λν΄λ κ΄μ°?μκΉμ?"
    ,
    confirmButtonText: 'λ³΄λ¬κ°κΈ°',
    
    showCancelButton: true,
    cancelButtonText: 'λ«κΈ°'

    // μκΈ°λΆν° ~~~  ===================================================
  }) .then((result) => {
    if (result.value) {
      window.open("https://blog.naver.com/taehwa10404/223041041055");
    }
    // ===================================== μκΈ°κΉμ§ , μ§μλ λλ λ΄μ©λ€
      
    })
}



// μ¬μ©μ¬ μ€μ  (λͺ¨λ¬μ°½) 
function showOption() {


  Swal.fire({
    icon: 'success',
    title: 'μ¬μ©μ μ€μ ',
    html: `
      νμΌμ <input type="text" value="${intervalDelay}" id="showInterval" readonly>μ΄λ§λ€ μλ‘κ³ μΉ¨λ©λλ€. <small>(κΈ°λ³Έκ°μ 1μ΄ μλλ€)</small>
      <br>      
      
      <input type="range" id="inputRange" oninput="intervalDelayChange(this);" min="1" max="9" value="${intervalDelay}">
      <br><br>
      
      .html νμΌμ΄ μλ μμΉλ₯Ό μλκ²½λ‘λ‘ μλ ₯ν  μ μμ΅λλ€<br>      
      <small><mark>μμΈν λ΄μ©μ 'μ¬μ©νλ λ°©λ²' λ²νΌμ μ°Έκ³ ν΄μ£ΌμΈμ</small></mark>
      <br><br>

      <input type="text" id="inputPath" placeholder="νμ¬ μλκ²½λ‘κ°μ ${dirPath} λ‘ λμ΄μμ΅λλ€ :)"
      onkeypress="if (event.keyCode == 13) {dirPathShow(this);}">
      `,
    
    confirmButtonText: 'νμΈ'
  
  });
}










// ======================================================>>>>
// π£ μμ΄νλ μ ( π₯ νμ΄μ§ μλ‘κ³ μΉ¨ ) λ²νΌ ν΄λ¦­μ νμ΄μ§ μλ‘κ³ μΉ¨ ( νμ΄λ¨Έ λμ X )

function pageReload() {

  /* iframe src μμ±μ  κ²½λ‘ + κ²μμ°½μ μλ ₯λ λ΄μ© + .html λ΄μ©μ ν λΉν΄μ€ */
  if (TOGGLE_BUTTON.value == "π§ μΌμ") {
  SHOW_HTML.src =  dirPath + FILE_NAME.value + ".html";
  

  /* λ§μ½,  μ΄λ―Έ μλ‘κ³ μΉ¨λκ³ μλ μνλΌλ©΄ ? : μλ μλ‘κ³ μΉ¨ λΆκ°ν¨ μλ΄νκΈ° */
  } else {

    Swal.fire({
      icon: 'error',
      title: 'μλ μλ‘κ³ μΉ¨ λΆκ°',
      html: `
        μ΄λ°, μ΄λ―Έ ${intervalDelay}μ΄ λ¨μλ‘ μλ μλ‘κ³ μΉ¨μ΄ λκ³ μλ€μ <br>
        π‘ ν΄κ²°λ°©λ² : λ²νΌμ΄ <mark>" π§ μΌμ " μνμΌλ</mark> λ€μ μλν΄μ£ΌμΈμ
        `,
      
      confirmButtonText: 'νμΈ'

    })
  }


}