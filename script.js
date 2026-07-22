/* ==========================================
   ARRAY VISUALIZER
========================================== */

let array = [];

/* ==========================================
   HELPER FUNCTIONS
========================================== */

// Animation Speed
function getSpeed() {
    return Number(document.getElementById("speedRange").value);
}

// Delay
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/* ==========================================
   TOAST
========================================== */

function showToast(message, color = "#6D4C41") {

    const toast = document.getElementById("toast");

    toast.innerText = message;

    toast.style.background = color;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 2500);

}


/* ==========================================
   UPDATE CARDS
========================================== */

function updateArraySize() {

    document.getElementById("arraySize").innerText = array.length;

}

function setComplexity(value) {

    document.getElementById("complexity").innerText = value;

}

/* ==========================================
   RENDER ARRAY
========================================== */

function renderArray() {

    const container = document.getElementById("arrayContainer");

    container.innerHTML = "";

    array.forEach((value, index) => {

        const wrapper = document.createElement("div");

        wrapper.className = "bar-wrapper";

        wrapper.innerHTML = `

            <div class="bar" id="bar-${index}">
                ${value}
            </div>

            <div class="index">
                ${index}
            </div>

        `;

        container.appendChild(wrapper);

    });

}

/* ==========================================
   CREATE ARRAY
========================================== */

function createArray() {

    let input = document.getElementById("inputArray").value.trim();

    if (input == "") {

        showToast("Please enter array values", "#B71C1C");

        return;

    }

    let values = input.split(",");

    array = [];

    for (let value of values) {

        value = value.trim();

        if (value == "" || isNaN(value)) {

            showToast("Only numbers are allowed", "#B71C1C");

            return;

        }

        array.push(Number(value));

    }

    renderArray();

    updateArraySize();

    setComplexity("O(n)");

    addHistory("Created Array");

    showToast("Array Created Successfully");

}

/* ==========================================
   DARK MODE
========================================== */

const themeButton = document.querySelector(".theme-btn");

themeButton.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const icon = themeButton.querySelector("i");

    if (document.body.classList.contains("dark")) {

        icon.classList.remove("fa-moon");

        icon.classList.add("fa-sun");

        showToast("Dark Mode Enabled");

    } else {

        icon.classList.remove("fa-sun");

        icon.classList.add("fa-moon");

        showToast("Light Mode Enabled");

    }

});

/* ==========================================
   RANDOM ARRAY
========================================== */

function generateRandomArray() {

    array = [];

    const size = Math.floor(Math.random() * 6) + 5;

    for (let i = 0; i < size; i++) {

        array.push(Math.floor(Math.random() * 90) + 10);

    }

    document.getElementById("inputArray").value = array.join(",");

    renderArray();

    updateArraySize();

    setComplexity("O(n)");

    addHistory("Generated Random Array");

    showToast("Random Array Created");

}

/* ==========================================
   RESET ARRAY
========================================== */

function resetArray() {

    array = [];

    document.getElementById("inputArray").value = "";
    document.getElementById("insertValue").value = "";
    document.getElementById("insertIndex").value = "";
    document.getElementById("deleteIndex").value = "";

    renderArray();

    updateArraySize();

    setComplexity("-");

    const history = document.getElementById("historyList");

    history.innerHTML = "<li>Waiting for operation...</li>";

    showToast("Array Reset");

}

/* ==========================================
   INSERT ELEMENT
========================================== */

async function insertAtIndex() {

    const value = document.getElementById("insertValue").value;

    const index = parseInt(document.getElementById("insertIndex").value);

    if (value === "" || isNaN(index)) {

        showToast("Enter value and index", "#B71C1C");

        return;

    }

    if (index < 0 || index > array.length) {

        showToast("Invalid Index", "#B71C1C");

        return;

    }

    let bars = document.getElementsByClassName("bar");

    for (let i = 0; i < index; i++) {

        if (bars[i]) {

            bars[i].classList.add("traverse");

            await sleep(getSpeed());

            bars[i].classList.remove("traverse");

        }

    }

    array.splice(index, 0, Number(value));

    renderArray();

    updateArraySize();

    setComplexity("O(n)");

    bars = document.getElementsByClassName("bar");

    if (bars[index]) {

        bars[index].classList.add("insert-animation");

        await sleep(500);

        bars[index].classList.remove("insert-animation");

    }

    addHistory("Inserted " + value + " at index " + index);

    showToast("Element Inserted");

    document.getElementById("insertValue").value = "";
    document.getElementById("insertIndex").value = "";

}

/* ==========================================
   DELETE ELEMENT
========================================== */

async function deleteAtIndex() {

    const index = parseInt(document.getElementById("deleteIndex").value);

    if (isNaN(index)) {

        showToast("Enter Index", "#B71C1C");

        return;

    }

    if (index < 0 || index >= array.length) {

        showToast("Invalid Index", "#B71C1C");

        return;

    }

    const deletedValue = array[index];

    let bars = document.getElementsByClassName("bar");

    for (let i = 0; i <= index; i++) {

        if (bars[i]) {

            bars[i].classList.add("traverse");

            await sleep(getSpeed());

            bars[i].classList.remove("traverse");

        }

    }

    bars[index].classList.add("delete-animation");

    await sleep(500);

    array.splice(index, 1);

    renderArray();

    updateArraySize();

    setComplexity("O(n)");

    addHistory("Deleted " + deletedValue + " from index " + index);

    showToast("Element Deleted");

    document.getElementById("deleteIndex").value = "";

}

/* ==========================================
   REVERSE ARRAY
========================================== */

async function reverseArray() {

    if (array.length === 0) {

        showToast("Create an array first", "#B71C1C");
        return;

    }

    let start = 0;
    let end = array.length - 1;

    while (start < end) {

        let bars = document.getElementsByClassName("bar");

        bars[start].classList.add("active");
        bars[end].classList.add("active");

        await sleep(getSpeed());

        // Swap values
        [array[start], array[end]] = [array[end], array[start]];

        renderArray();

        await sleep(250);

        start++;
        end--;

    }

    renderArray();

    setComplexity("O(n)");

    addHistory("Reversed Array");

    showToast("Array Reversed Successfully");

}

/* ==========================================
   CLEAR HISTORY
========================================== */

function clearHistory() {

    const history = document.getElementById("historyList");

    history.innerHTML = "<li>Waiting for operation...</li>";

}

/* ==========================================
   INITIALIZE PROJECT
========================================== */

window.onload = function () {

    updateArraySize();

    setComplexity("-");

    clearHistory();

    renderArray();

    showToast("Welcome to Array Visualizer 🤎");

};

/* ==========================================
   ENTER KEY SUPPORT
========================================== */

document.getElementById("inputArray").addEventListener("keypress", function (e) {

    if (e.key === "Enter") {
        createArray();
    }

});

document.getElementById("insertIndex").addEventListener("keypress", function (e) {

    if (e.key === "Enter") {
        insertAtIndex();
    }

});

document.getElementById("deleteIndex").addEventListener("keypress", function (e) {

    if (e.key === "Enter") {
        deleteAtIndex();
    }

});

/* ==========================================
   PREVENT INVALID INPUT
========================================== */

document.getElementById("inputArray").addEventListener("input", function () {

    this.value = this.value.replace(/[^0-9,\s-]/g, "");

});

/* ==========================================
   UPDATE SPEED LABEL (Optional)
========================================== */

const speedSlider = document.getElementById("speedRange");

speedSlider.addEventListener("input", function () {

    addHistory("Animation Speed Changed");

});

/* ==========================================
   END OF SCRIPT
========================================== */