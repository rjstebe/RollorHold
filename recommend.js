class die {
  constructor(face, element){
    this.value = face;
    this.reference = element;
  }

  set_face(face){
    this.value = face
    switch(this.value){
      case 6:
        this.reference.src="img/Dice-6a-b.svg";
        break;
      case 5:
        this.reference.src="img/Dice-5-b.svg";
        break;
      case 4:
        this.reference.src="img/Dice-4-b.svg";
        break;
      case 3:
        this.reference.src="img/Dice-3a-b.svg";
        break;
      case 2:
        this.reference.src="img/Dice-2a-b.svg";
        break;
      default:
        this.reference.src="img/Dice-1-b.svg"
    }
  }

  increment_face(){
    this.set_face((this.value == 6) ? 1 : this.value+1);
    updateOutput();
  }

  decrement_face(){
    this.set_face((this.value == 1) ? 6 : this.value-1);
    updateOutput();
  }
}

var dice = {};
var showScores = false;

function onLoad(){
  loadDieSelectors();
  loadQuestionIcons();
}

function loadDieSelectors(){
  var dieSelectors = document.getElementsByClassName('die-selector');
  for(i = 0; i < dieSelectors.length; i++){
    dieSelectors[i].innerHTML =
    `<button class="increment-value" type="button" onclick="dice[${i}].increment_face()">&#x25B2;</button>
    <img class="die-image" width="50" alt="Dice-1-b" src="img/Dice-1-b.svg">
    <button class="decrement-value" type="button" onclick="dice[${i}].decrement_face()">&#x25BC;</button>`
    dice[i] = new die(1, dieSelectors[i].getElementsByClassName("die-image")[0]);
  }
}

function loadQuestionIcons(){
  var icons = document.getElementsByClassName("help-icon");
  var icon =
  ` <svg xmlns="http://www.w3.org/2000/svg" width="0.75em" height="0.75em" fill="currentColor" class="bi bi-question-circle" viewBox="0 0 16 16">
    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
    <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"/>
  </svg>`;
  for(i = 0; i < icons.length; i++){
    icons[i].insertAdjacentHTML("afterbegin", icon);
  }
}

function toggleScores(){
  var icon = document.getElementById("rotating-icon");
  var dropdown = document.getElementById("scores-dropdown");
  showScores = !showScores;
  if (showScores){
    icon.style.transform = "rotate(90deg)";
    dropdown.style.height = "210px";
    dropdown.addEventListener("transitionend", (e) => {
      if (e.target == dropdown){
        dropdown.style.overflow = "visible";
      }
    }, {once: true});
  }
  else{
    icon.style.transform = "rotate(0deg)";
    dropdown.style.height = "0";
    dropdown.style.overflow = "hidden";
  }
}

function updateOutput(){
  var callback = (e) => {
    e.target.style.transition = "background-color 2s";
    e.target.style.setProperty("background-color", "yellow");
  };
  //if randomizing score options' values, update each of them
  if (type == "Yahtzee"){
    var expecteds = document.getElementsByClassName("expected");
    for (i = 0; i < expecteds.length; i++){
      var oldValue = expecteds[i].innerHTML;
      expecteds[i].innerHTML = Math.floor(Math.random() * 36) + "pts";
      if (oldValue != expecteds[i].innerHTML){
        expecteds[i].removeEventListener("transitionend", callback, {once: true});
        expecteds[i].style.transition = "background-color 1ms";
        expecteds[i].style.setProperty("background-color", "#CB2F2F");
        expecteds[i].addEventListener("transitionend", callback, {once: true});
      }
    }
  }
  //update recommendations randomly
  var recommendedActions = document.getElementsByClassName("recommended-action");
  for (i = 0; i < recommendedActions.length; i++){
    var oldValue = recommendedActions[i].innerHTML;
    recommendedActions[i].innerHTML = Math.floor(Math.random() * 2) ? "Hold" : "Roll";
    if (oldValue != recommendedActions[i].innerHTML){
      recommendedActions[i].removeEventListener("transitionend", callback, {once: true});
      recommendedActions[i].style.transition = "background-color 1ms";
      recommendedActions[i].style.setProperty("background-color", "#CB2F2F");
      recommendedActions[i].addEventListener("transitionend", callback, {once: true});
    }
  }
}
