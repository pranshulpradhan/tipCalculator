const calculateTipButton = document.querySelector('.calculate');
let tipAmount = 0;

// Function to enable/disable the button based on input validation
function toggleButton() {
    const billValue = parseFloat(document.querySelector(".billvalue").value);
    const serviceValue = (document.querySelector("#serviceOption").value);
    const peopleInput = document.querySelector("#peopleSplit");
    const peopleValue = parseInt(peopleInput.value);
    const selectedCurrency = document.querySelector("#currencyOption").value;

    const isBillValid = !isNaN(billValue) && billValue > 0; // Check if it's a positive number
    const isServiceValid = serviceValue !== "default"; // Compare to the numeric default value (0)
    const isPeopleValid = !isNaN(peopleValue) && peopleValue > 0; // Check if it's a positive integer
    const isCurrencySelected = selectedCurrency !== "default";

    // console.log("service option: ", isServiceValid);
    // console.log("service value: ", serviceValue);
    // Display warnings for missing individual fields
    displayWarning("billWarning", !isBillValid);
    displayWarning("serviceWarning", !isServiceValid);
    displayWarning("peopleWarning", !isPeopleValid);
    displayWarning("currencyWarning", !isCurrencySelected);

    // Enable the button only when all values are provided
    if (isBillValid && isServiceValid && isPeopleValid && isCurrencySelected) {
        calculateTipButton.removeAttribute("disabled");
    } else {
        calculateTipButton.setAttribute("disabled", "true");
    }
}

// Function to display or hide a warning message
function displayWarning(id, shouldDisplay) {
    const warningElement = document.getElementById(id);
    if (shouldDisplay) {
        warningElement.style.display = "block";
    } else {
        warningElement.style.display = "none";
    }
}

// Add input event listeners to check the input validity
document.querySelector(".billvalue").addEventListener("input", toggleButton);
document.querySelector("#serviceOption").addEventListener("input", toggleButton);

const peopleInput = document.querySelector("#peopleSplit");

peopleInput.addEventListener("input", () => {
    // Restrict input to integers only
    const currentValue = peopleInput.value;
    const intValue = parseInt(currentValue);

    if (!isNaN(intValue) && intValue > 0) {
        // If it's a valid positive integer, update the input value
        peopleInput.value = intValue;
    } else {
        // If it's not a valid integer or not positive, display a warning
        peopleInput.value = ""; // Clear the input field
        displayWarning("peopleWarning", true);
        calculateTipButton.setAttribute("disabled", "true");
    }

    toggleButton(); // Check input validity when the value changes
});

// Add an event listener for the currency select element
const currencyOption = document.querySelector("#currencyOption");
currencyOption.addEventListener("input", updateCurrency); // Change "change" to "input"

// Function to update the displayed currency based on the selected option
function updateCurrency() {
    const selectedCurrency = currencyOption.value;
    document.getElementById("selectedCurrency").textContent = selectedCurrency;
    toggleButton(); // Check input validity when currency is selected
}
calculateTipButton.addEventListener('click', calculateTip);

// Function to calculate the tip and update the displayed amount
function calculateTip() {
    const billValue = parseFloat(document.querySelector(".billvalue").value);
    const serviceValue = parseFloat(document.querySelector("#serviceOption").value);
    const peopleValue = parseInt(peopleInput.value);
    const selectedCurrency = document.querySelector("#currencyOption").value;

    if (!isNaN(billValue) && serviceValue !== 0 && !isNaN(peopleValue) && peopleValue > 0 && selectedCurrency !== "default") {
        const tipValue = (billValue * serviceValue) / 100;
        const tipAmountPerPerson = tipValue / peopleValue;

        // Display the tip amount with the selected currency
        document.getElementById("tipAmount").textContent = " " + tipAmountPerPerson.toFixed(2);

        // Show the results
        document.querySelector(".results").removeAttribute("hidden");
    }
}
