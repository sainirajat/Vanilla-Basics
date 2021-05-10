const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

function isEmpty(string = "") {
  if (string.length === 0) {
    return true;
  }
  return false;
}

function showError(input, errorMessage) {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = errorMessage;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}
function isValidEmail(input) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(String(input.value.trim()).toLowerCase())) {
    showSuccess(input);
  } else {
    showError(input, "Invalid Email");
  }
}

function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function checkForEmpty(arr = []) {
  arr.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
  });
}
//function to check min and max length
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} should be atleast ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} should be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
}

//match the email ids
function checkForMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(
      input2,
      `${getFieldName(input1)} and ${getFieldName(input2)} does not match`
    );
  }
}

//event listner
form.addEventListener("submit", function (e) {
  e.preventDefault();
  checkForEmpty([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 20);
  checkForMatch(password, password2);
  isValidEmail(email);
});
