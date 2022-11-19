// Tämä tiedosto on autocompletea eli paikkojen ehdotus listaa varten luotu
function autocomplete(input, arr) {
    let currentFocus;
// Kun inputfieldiin(hakukenttään) kirjoitetaan, niin ehdotus lista aukeaa. 
    input.addEventListener("input", () => {
        const val = input.value;
// Tässä suljetaan valmiiksi auennut lista.
        closeAllLists();
        if (!val) return false;
        currentFocus = -1;
// Tässä tehdään div elementti joka sisältää ehdotus-listan arvot / itemit. 
        const div = document.createElement("DIV");
        div.setAttribute("id", input.id + "-autocomplete-list");
        div.setAttribute("class", "autocomplete-items");
        input.parentNode.appendChild(div);
// Tässä katsotaan mätsääkö inputfieldin teksti johonkin listalla olevaan nimeen. 
        arr.forEach(name => {
            if (name.substr(0, val.length).toUpperCase() === val.toUpperCase()) {
                const innerDiv = document.createElement("DIV");
// Tässä tehdään mätsäävistä kirjaimista boldit ( paksummat kuin muut.)
                innerDiv.innerHTML = `<strong>${name.substr(0, val.length)}</strong>${name.substr(val.length)}`;
// Tässä teksti ehdotuslistasta lisätään inputfieldiin eli tekstikenttään.
                innerDiv.addEventListener("click", (e) => {
                    input.value = name;
// Tämän jälkeen lista suolkeutuu.
                    closeAllLists();
                });
                div.appendChild(innerDiv);
            }
        });
    });
// Kun näppäimistöä painetaan funktio laukaistaan.
    input.addEventListener("keydown", (e) => {
        let list = document.getElementById("inputField-autocomplete-list");
        if (list) list = list.getElementsByTagName("div");
// Kun painetaan enter näppäintä niin nimi jonka päällä ollaan siirtyy inputfieldiin eli hakukenttään. 
        if (e.keyCode === 13) {
            e.preventDefault();
            if (currentFocus > -1) {
                if (list) list[currentFocus].click();
            }
// Kun nuolinäppäimistä painetaan ylös korostuu se nimi jonka kohdalle osutaan.
        } else if (e.keyCode === 38) {
            currentFocus--;
            addActive(list);
// Kun nuolinäppäimistä painetaan alas korostuu se nimi jonka kohdalle osutaan.
        } else if (e.keyCode === 40) {
            currentFocus++;
            addActive(list);
        }
    });
// Tässä funktiossa annetaan valittavalle diville aktiivisuus class, jotta käyttäjä tietää mikä on tällä hetkellä korostettuna.
    function addActive(node) {
        if (!node) return false;
        removeActive(node);
        if (currentFocus >= node.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (node.length - 1);
        node[currentFocus].classList.add("autocomplete-active");
    }
// Tässä funktiossa poistetaan korostus. 
    function removeActive(node) {
        for (let i = 0; i < node.length; i++) {
            node[i].classList.remove("autocomplete-active");
        }
    }
// Tässä funktiossa suljetaan ehdotuslista.
    function closeAllLists(element) {
        const node = document.getElementsByClassName("autocomplete-items");
        for (let i = 0; i < node.length; i++) {
            if (element !== node[i] && element !== input) {
                node[i].parentNode.removeChild(node[i]);
            }
        }
    }
// Tässä asetetaan dokumentille toiminnon, joka aktivoi closeAllLists funktion, mikäli käyttäjä klikkaa hiiren nappia. 
    document.addEventListener("click", e => {
        closeAllLists(e.target);
    });
}