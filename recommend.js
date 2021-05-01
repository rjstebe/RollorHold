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
  }

  decrement_face(){
    this.set_face((this.value == 1) ? 6 : this.value-1);
  }
}

var dice = {};

function onLoad(){
  loadDieSelectors();
}

function loadDieSelectors(){
  var dieSelectors = document.getElementsByClassName('die-selector');
  for(i = 0; i < dieSelectors.length; i++){
    dieSelectors[i].innerHTML=
    `<button class="increment-value" type="button" onclick="dice[${i}].increment_face()">&#x25B2;</button>
    <img class="die-image" width="50" alt="Dice-1-b" src="img/Dice-1-b.svg">
    <button class="decrement-value" type="button" onclick="dice[${i}].decrement_face()">&#x25BC;</button>`
    dice[i] = new die(1, dieSelectors[i].getElementsByClassName("die-image")[0]);
  }
}
