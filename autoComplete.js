function autocomplete(input, arr) {
    let currentFocus;
    input.addEventListener("input", () => {
        const val = input.value;
        closeAllLists();
        if (!val) return false;
        currentFocus = -1;
        const div = document.createElement("DIV");
        div.setAttribute("id", input.id + "autocomplete-list");
        div.setAttribute("class", "autocomplete-items");
        input.parentNode.appendChild(div);
        arr.forEach(name => {
            if (name.substr(0, val.length).toUpperCase() === val.toUpperCase()) {
                const innerDiv = document.createElement("DIV");
                innerDiv.innerHTML = `<strong>${name.substr(0, val.length)}</strong>${name.substr(val.length)}`;
                innerDiv.addEventListener("click", (e) => {
                    input.value = name;
                    closeAllLists();
                });
                div.appendChild(innerDiv);
            }
        });
    });

    input.addEventListener("keydown", (e) => {
        let list = document.getElementById("autocomplete-list");
        if (list) list = list.getElementsByTagName("div");
        if (e.keyCode == 40) {
            currentFocus++;
            addActive(list);
        } else if (e.keyCode == 38) {
            currentFocus--;
            addActive(list);
        } else if (e.keyCode == 13) {
            e.preventDefault();
            if (currentFocus > -1) {
                if (list) list[currentFocus].click();
            }
        }
    });

    function addActive(node) {
        if (!node) return false;
        removeActive(node);
        if (currentFocus >= node.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (node.length - 1);
        node[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(node) {
        for (let i = 0; i < node.length; i++) {
            node[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(element) {
        const node = document.getElementsByClassName("autocomplete-items");
        for (let i = 0; i < node.length; i++) {
            if (element !== node[i] && element !== input) {
                node[i].parentNode.removeChild(node[i]);
            }
        }
    }

    document.addEventListener("click", e => {
        closeAllLists(e.target);
    });
}