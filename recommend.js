function onLoad(){
  loadDieSelectors()
}

function loadDieSelectors(){
  var dieSelectors = document.getElementsByClassName('die-selector')
  for(i = 0; i < dieSelectors.length; i++){
    dieSelectors[i].innerHTML=
    `<button class="increment-value" type="button" onclick="alert('increment')">&#x25B2;</button>
    <img class="die-image" width="50" alt="Dice-1-b" src="img/Dice-1-b.svg">
    <button class="decrement-value" type="button" onclick="alert('decrement')">&#x25BC;</button>
    <div class="recommended-action">Roll</div>`
  }
}
