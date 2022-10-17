"use strict";

/////////////////////////////////////////////////////////////
// Data
/////////////////////////////////////////////////////////////

const accounts = [
  {
    owner: "Shohanur Rahman",
    movements: [2500, 500, -750, 1200, 3200, -1500, 500, 1200, -1750, 1800],
    interestRate: 1.5, // %
    password: 1234,
    // movementsDates: [
    //   "2021-11-18T21:31:17.178Z",
    //   "2021-12-23T07:42:02.383Z",
    //   "2022-01-28T09:15:04.904Z",
    //   "2022-04-01T10:17:24.185Z",
    //   "2022-07-08T14:11:59.604Z",
    //   "2022-09-10T17:01:17.194Z",
    //   "2022-09-12T23:36:17.929Z",
    //   "2022-09-15T12:51:31.398Z",
    //   "2022-09-19T06:41:26.190Z",
    //   "2022-09-21T08:11:36.678Z",
    // ],
    // currency: "USD",
    // locale: "en-US",
  },
  {
    owner: "Sunerah Binte Ayesha",
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -300, 1500, -1850],
    interestRate: 1.3, // %
    password: 5678,
    // movementsDates: [
    //   "2021-12-11T21:31:17.671Z",
    //   "2021-12-27T07:42:02.184Z",
    //   "2022-01-05T09:15:04.805Z",
    //   "2022-02-14T10:17:24.687Z",
    //   "2022-03-12T14:11:59.203Z",
    //   "2022-05-16T17:01:17.392Z",
    //   "2022-08-10T23:36:17.522Z",
    //   "2022-09-03T12:51:31.491Z",
    //   "2022-09-18T06:41:26.394Z",
    //   "2022-09-21T08:11:36.276Z",
    // ],
    // currency: "EUR",
    // locale: "en-GB",
  },
  {
    owner: "Masud Rana Shawon",
    movements: [50, 34, -15, -90, -10, -100, 80, -30, 150, -50],
    interestRate: 1.1, // %
    password: 999,
    // movementsDates: [
    //   "2021-12-11T21:31:17.671Z",
    //   "2021-12-27T07:42:02.184Z",
    //   "2022-01-05T09:15:04.805Z",
    //   "2022-02-14T10:17:24.687Z",
    //   "2022-03-12T14:11:59.203Z",
    //   "2022-05-16T17:01:17.392Z",
    //   "2022-08-10T23:36:17.522Z",
    //   "2022-09-03T12:51:31.491Z",
    //   "2022-09-18T06:41:26.394Z",
    //   "2022-09-21T08:11:36.276Z",
    // ],
    // currency: "EUR",
    // locale: "en-GB",
  },
  {
    owner: "Hriday Hrisikhes",
    movements: [5000, 3400, -1500, -9000, -1000, -1000, 800, -300, 15000, -500],
    interestRate: 1.1, // %
    password: 1122,
    // movementsDates: [
    //   "2021-12-11T21:31:17.671Z",
    //   "2021-12-27T07:42:02.184Z",
    //   "2022-01-05T09:15:04.805Z",
    //   "2022-02-14T10:17:24.687Z",
    //   "2022-03-12T14:11:59.203Z",
    //   "2022-05-16T17:01:17.392Z",
    //   "2022-08-10T23:36:17.522Z",
    //   "2022-09-03T12:51:31.491Z",
    //   "2022-09-18T06:41:26.394Z",
    //   "2022-09-21T08:11:36.276Z",
    // ],
    // currency: "EUR",
    // locale: "en-GB",
  },
];

/////////////////////////////////////////////////////////////
// Elements
/////////////////////////////////////////////////////////////

const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance-value");
const labelSumIn = document.querySelector(".summary-value-in");
const labelSumOut = document.querySelector(".summary-value-out");
const labelSumInterest = document.querySelector(".summary-value-interest");
const labelTimer = document.querySelector(".timer");

const app = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login-btn");
const btnTransfer = document.querySelector(".form-btn-transfer");
const btnLoan = document.querySelector(".form-btn-loan");
const btnClose = document.querySelector(".form-btn-close");
const btnSort = document.querySelector(".btn-sort");

const inputLoginUsername = document.querySelector(".login-input-username");
const inputLoginPassword = document.querySelector(".login-input-password");
const inputTransferTo = document.querySelector(".form-input-to");
const inputTransferAmount = document.querySelector(".form-input-amount");
const inputLoanAmount = document.querySelector(".form-input-loan-amount");
const inputCloseUsername = document.querySelector(".form-input-username");
const inputClosePassword = document.querySelector(".form-input-password");

/////////////////////////////////////////////////////////////////////
// Update UI
/////////////////////////////////////////////////////////////////////

function updateUI(currentAccount) {
  displayMovements(currentAccount);
  displaySummary(currentAccount);
  displayBalance(currentAccount);
}

/////////////////////////////////////////////////////////////////////
// Username
/////////////////////////////////////////////////////////////////////

function createUsernames(accounts) {
  accounts.forEach((account) => {
    account.username = account.owner
      .toLowerCase()
      .split(" ")
      .map((uNameWord) => uNameWord.at(0))
      .join("");
  });
}
createUsernames(accounts);

/////////////////////////////////////////////////////////////////////
// Login
/////////////////////////////////////////////////////////////////////

let currentAccount;
btnLogin.addEventListener("click", function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    (account) => account.username == inputLoginUsername.value
  );
  if (currentAccount?.password === Number(inputLoginPassword.value)) {
    // Display UI and welcome
    labelWelcome.innerHTML = `Welcome back, <span style="color:#42a8ff">${currentAccount.owner
      .split(" ")
      .at(0)}</span>`;
    app.style.opacity = "1";
    updateUI(currentAccount);
  } else {
    // Hide UI and warning sms
    labelWelcome.innerHTML = `<span style="color:#ff000d">Ops, Login Faild!</span>`;
    app.style.opacity = "0";
  }
  // Clear fields
  inputLoginUsername.value = inputLoginPassword.value = "";
  inputLoginPassword.blur();
});

/////////////////////////////////////////////////////////////////////
// Movements
/////////////////////////////////////////////////////////////////////

function displayMovements(account, sort = false) {
  containerMovements.innerHTML = "";
  const moves = sort
    ? account.movements.slice(0).sort((a, b) => a - b)
    : account.movements;
  moves.forEach((move, i) => {
    const transType = move > 0 ? "deposit" : "withdrawal";
    const movementsHtml = `
          <div class="movements-row">
            <div class="movements-type movements-type-${transType}">${
      i + 1
    } ${transType}</div>
            <div class="movements-date">5 days ago</div>
            <div class="movements-value">${move}$</div>
          </div>`;
    containerMovements.insertAdjacentHTML("afterbegin", movementsHtml);
  });
}

/////////////////////////////////////////////////////////////////////
// Summary
/////////////////////////////////////////////////////////////////////

function displaySummary(account) {
  //Incomes
  const incomes = account.movements
    .filter((move) => move > 0)
    .reduce((accu, deposit) => accu + deposit, 0);

  labelSumIn.textContent = `${incomes}$`;
  //Outcomes
  const outcomes = account.movements
    .filter((move) => move < 0)
    .reduce((accu, withdrawal) => accu + withdrawal, 0);

  labelSumOut.textContent = `${Math.abs(outcomes)}$`;
  // Interest
  const interest = account.movements
    .filter((move) => move > 0)
    .map((deposit) => (deposit * account.interestRate) / 100)
    .filter((interest) => interest >= 1)
    .reduce((accu, interest) => accu + interest);

  labelSumInterest.textContent = `${interest}$`;
}

/////////////////////////////////////////////////////////////////////
// Balance
/////////////////////////////////////////////////////////////////////

function displayBalance(account) {
  account.balance = account.movements.reduce((accu, move) => accu + move);

  labelBalance.textContent = `${account.balance}$`;
}

/////////////////////////////////////////////////////////////////////
// Transfer
// /////////////////////////////////////////////////////////////////////

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();

  const receiverAccount = accounts.find(
    (account) => account.username === inputTransferTo.value
  );

  const reciverAmount = Number(inputTransferAmount.value);

  // Clear fields
  inputTransferTo.value = inputTransferAmount.value = "";
  inputTransferAmount.blur();

  if (
    reciverAmount > 0 &&
    reciverAmount <= currentAccount.balance &&
    currentAccount.username !== receiverAccount?.username &&
    receiverAccount
  ) {
    // Transfer moneyoperation-loan
    currentAccount.movements.push(-reciverAmount);
    receiverAccount.movements.push(reciverAmount);
    // Update UI
    updateUI(currentAccount);
    // Show message
    labelWelcome.innerHTML = `Hurray,<span style="color:#00b79f"> Transaction successful!</span>`;
  } else {
    labelWelcome.innerHTML = `<span style="color:#ff000d"> Transaction failed!</span>`;
  }
});

// /////////////////////////////////////////////////////////////////////
// // Loan
// /////////////////////////////////////////////////////////////////////

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();
  const loanAmount = Number(inputLoanAmount.value);
  if (
    loanAmount > 0 &&
    currentAccount.movements.some((move) => move >= loanAmount * 0.1)
  ) {
    // add positive movement into current account
    currentAccount.movements.push(loanAmount);
    //updateUI
    updateUI(currentAccount);
    // Show message
    labelWelcome.innerHTML = `Hurray,<span style="color:#00b79f"> Loan Request successful!</span>`;
  } else {
    labelWelcome.innerHTML = `Damn,<span style="color:#ff000d"> Loan Request declined! </span>`;
  }
  // clear
  inputLoanAmount.value = "";
  inputLoanAmount.blur();
});

/////////////////////////////////////////////////////////////////////
// Close account
/////////////////////////////////////////////////////////////////////

btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  const closeUserName = inputCloseUsername.value;
  const closeUserPassowrd = Number(inputClosePassword.value);
  if (
    currentAccount.username === closeUserName &&
    currentAccount.password === closeUserPassowrd
  ) {
    const accountIndex = accounts.findIndex(
      (account) => account.username === currentAccount.username
    );
    // delete
    accounts.splice(accountIndex, 1);
    // hide ui
    app.style.opacity = 0;
    // Show message
    labelWelcome.innerHTML = `<span style="color:#00b79f">Account closed successfully </span>${currentAccount.owner
      .toLowerCase()
      .split(" ")
      .at(0)}`;
  } else {
    labelWelcome.innerHTML = `<span style="color:#ff000d">Account close can not be done! </span>`;
  }
});

///////////////////////////////////////////////////////////////////
// sort
////////////////////////////////////////////////////////////////

let sortedMoves = false;

btnSort.addEventListener("click", function (e) {
  e.preventDefault();

  displayMovements(currentAccount, !sortedMoves);
  sortedMoves = !sortedMoves;
});
