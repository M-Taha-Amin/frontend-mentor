"use strict";

const calcAgeBtn = document.querySelector("#calc-age");
const inputsArray = [
  document.querySelector("#day-input"),
  document.querySelector("#month-input"),
  document.querySelector("#year-input"),
];
const presentYear = new Date().getFullYear();

// Allow Number inputs only
inputsArray.forEach(inputEl =>
  inputEl.addEventListener("input", function () {
    allowNumbersInput(this);
  })
);
function allowNumbersInput(el) {
  if (!isFinite(el.value)) el.value = "";
}

calcAgeBtn.addEventListener("click", calcDispAge);
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") calcDispAge();
});
function calcDispAge() {
  // html input elements
  const dayInputEl = document.querySelector("#day-input");
  const monthInputEl = document.querySelector("#month-input");
  const yearInputEl = document.querySelector("#year-input");

  // html result elements
  const yearsDispEl = document.querySelector("#years-el");
  const monthsDispEl = document.querySelector("#months-el");
  const daysDispEl = document.querySelector("#days-el");

  // current year, month and day
  const date = new Date();
  const currYear = date.getFullYear();
  const currMonth = date.getMonth() + 1;
  const currDay = date.getDate();

  const validDay =
    Number(dayInputEl.value) <= 31 && Number(dayInputEl.value) >= 1;

  const validMonth =
    Number(monthInputEl.value) <= 12 && Number(monthInputEl.value) >= 1;

  const validYear =
    Number(yearInputEl.value) <= currYear &&
    Number(yearInputEl.value) >= currYear - 100;

  const allInputsGiven =
    dayInputEl.value !== "" &&
    monthInputEl.value !== "" &&
    yearInputEl.value !== "";

  const resetValues = function () {
    yearsDispEl.textContent = "--";
    monthsDispEl.textContent = "--";
    daysDispEl.textContent = "--";
  };

  if (dayInputEl.value === "") {
    showWarning(dayInputEl, "This field is required");
    resetValues();
  } else if (!validDay) {
    showWarning(dayInputEl, "Must be a valid day");
    resetValues();
  }

  if (monthInputEl.value === "") {
    showWarning(monthInputEl, "This field is required");
    resetValues();
  } else if (!validMonth) {
    showWarning(monthInputEl, "Must be a valid month");
    resetValues();
  }

  if (yearInputEl.value === "") {
    showWarning(yearInputEl, "This field is required");
    resetValues();
  } else if (!validYear) {
    showWarning(yearInputEl, "Must be a valid year");
    resetValues();
  }

  if (allInputsGiven && validDay && validMonth && validYear) {
    // Variable to hold users years
    let userYear = currYear - +yearInputEl.value;
    let userMonths = currMonth - +monthInputEl.value;
    let userDays = currDay - +dayInputEl.value;

    // if the month user was born in has not come yet, then the current year is not completed so subtract one
    if (+monthInputEl.value > currMonth) {
      userYear -= 1;
      userMonths = +monthInputEl.value - currMonth;
      userMonths = 12 - userMonths;
    }
    if (+dayInputEl.value > currDay) {
      userMonths -= 1;
      userDays = +dayInputEl.value - currDay;
      userDays = 31 - userDays;
    }
    yearsDispEl.textContent = userYear;
    monthsDispEl.textContent = userMonths;
    daysDispEl.textContent = userDays;
  }
}
function showWarning(el, warningText) {
  el.classList.add("border-red");
  el.previousElementSibling.classList.add("text-red");
  const warning = document.createElement("div");
  warning.innerHTML = `
                      <div class="warning-text">
                        ${warningText}
                      </div>
  `;

  el.insertAdjacentElement("afterend", warning);

  setTimeout(() => {
    el.classList.remove("border-red");
    el.previousElementSibling.classList.remove("text-red");
    el.nextElementSibling.remove();
  }, 2000);
}
