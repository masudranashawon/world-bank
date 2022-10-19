'use strict';

/////////////////////////////////////////////////////////////
// Data
/////////////////////////////////////////////////////////////

const accounts = [
  {
    owner: 'Shohanur Rahman',
    movements: [2500, 500, -750, 1200, 3200, -1500, 500, 1200, -1750, 1800],
    interestRate: 1.5, // %
    password: 1234,
    movementsDates: [
      '2021-11-18T21:31:17.178Z',
      '2021-12-23T07:42:02.383Z',
      '2022-05-28T09:15:04.904Z',
      '2022-07-01T10:17:24.185Z',
      '2022-08-08T14:11:59.604Z',
      '2022-09-10T17:01:17.194Z',
      '2022-10-12T23:36:17.929Z',
      '2022-10-15T12:51:31.398Z',
      '2022-10-18T19:41:26.190Z',
      '2022-10-19T18:11:36.678Z',
    ],
    currency: 'USD',
    locale: 'en-US',
  },
  {
    owner: 'Sunerah Binte Ayesha',
    movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -300, 1500, -1850],
    interestRate: 1.3, // %
    password: 5678,
    movementsDates: [
      '2021-12-11T21:31:17.671Z',
      '2021-12-27T07:42:02.184Z',
      '2022-01-05T09:15:04.805Z',
      '2022-02-14T10:17:24.687Z',
      '2022-03-12T14:11:59.203Z',
      '2022-09-16T17:01:17.392Z',
      '2022-10-11T23:36:17.929Z',
      '2022-10-15T12:51:31.398Z',
      '2022-10-18T19:41:26.190Z',
      '2022-10-19T08:11:36.678Z',
    ],
    currency: 'EUR',
    locale: 'en-GB',
  },
  {
    owner: 'Masud Rana Shawon',
    movements: [500, 340, -150, -900, -100, -1000, 800, -300, 1500, -500],
    interestRate: 1.1, // %
    password: 999,
    movementsDates: [
      '2021-12-11T21:31:17.671Z',
      '2021-12-27T07:42:02.184Z',
      '2022-01-05T09:15:04.805Z',
      '2022-02-14T10:17:24.687Z',
      '2022-03-12T14:11:59.203Z',
      '2022-05-16T17:01:17.392Z',
      '2022-08-10T23:36:17.522Z',
      '2022-10-03T12:51:31.491Z',
      '2022-10-19T06:41:26.394Z',
      '2022-10-19T08:12:53.276Z',
    ],
    currency: 'BDT',
    locale: 'bn-BD',
  },
  {
    owner: 'Hriday Hrisikhes',
    movements: [5000, 3400, -1500, -9000, -1000, -1000, 800, -300, 15000, -500],
    interestRate: 1.1, // %
    password: 1122,
    movementsDates: [
      '2021-12-11T21:31:17.671Z',
      '2021-12-27T07:42:02.184Z',
      '2022-01-05T09:15:04.805Z',
      '2022-02-14T10:17:24.687Z',
      '2022-03-12T14:11:59.203Z',
      '2022-05-16T17:01:17.392Z',
      '2022-09-30T23:36:17.522Z',
      '2022-10-03T12:51:31.491Z',
      '2022-10-19T06:41:26.394Z',
      '2022-10-20T03:45:36.276Z',
    ],
    currency: 'EUR',
    locale: 'en-GB',
  },
];

/////////////////////////////////////////////////////////////
// Elements
/////////////////////////////////////////////////////////////

const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance-value');
const labelSumIn = document.querySelector('.summary-value-in');
const labelSumOut = document.querySelector('.summary-value-out');
const labelSumInterest = document.querySelector('.summary-value-interest');
const labelTimer = document.querySelector('.timer');

const app = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login-btn');
const btnTransfer = document.querySelector('.form-btn-transfer');
const btnLoan = document.querySelector('.form-btn-loan');
const btnClose = document.querySelector('.form-btn-close');
const btnSort = document.querySelector('.btn-sort');

const inputLoginUsername = document.querySelector('.login-input-username');
const inputLoginPassword = document.querySelector('.login-input-password');
const inputTransferTo = document.querySelector('.form-input-to');
const inputTransferAmount = document.querySelector('.form-input-amount');
const inputLoanAmount = document.querySelector('.form-input-loan-amount');
const inputCloseUsername = document.querySelector('.form-input-username');
const inputClosePassword = document.querySelector('.form-input-password');

/////////////////////////////////////////////////////////////////////
// Update UI
/////////////////////////////////////////////////////////////////////

function updateUI(currentAccount) {
  displayMovements(currentAccount);
  displaySummary(currentAccount);
  displayBalance(currentAccount);
}

/////////////////////////////////////////////////////////////////////
//formatting currency
/////////////////////////////////////////////////////////////////////

function formateCurrency(value, locale, currency) {
  return Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
}

/////////////////////////////////////////////////////////////////////
// Days calculation
/////////////////////////////////////////////////////////////////////

function formatMoveDate(date, locale) {
  const calculateDays = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (24 * 60 * 60 * 1000));
  const daysPassed = calculateDays(new Date(), date);
  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(date);
}

/////////////////////////////////////////////////////////////////////
// Username
/////////////////////////////////////////////////////////////////////

function createUsernames(accounts) {
  accounts.forEach((account) => {
    account.username = account.owner
      .toLowerCase()
      .split(' ')
      .map((uNameWord) => uNameWord.at(0))
      .join('');
  });
}
createUsernames(accounts);

/////////////////////////////////////////////////////////////////////
// Login
/////////////////////////////////////////////////////////////////////

let currentAccount, timer;
btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    (account) => account.username == inputLoginUsername.value
  );

  if (currentAccount?.password === Number(inputLoginPassword.value)) {
    setTimeout(() => {
      // Display UI and welcome
      labelWelcome.innerHTML = `Welcome back, <span style="color:#42a8ff">${currentAccount.owner
        .split(' ')
        .at(0)}</span>`;

      app.style.opacity = '1';

      // Display date and time
      const nowTime = new Date();
      const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
      };

      labelDate.textContent = Intl.DateTimeFormat(
        currentAccount.locale,
        options
      ).format(nowTime);

      // Log out timer
      if (timer) clearInterval(timer);
      timer = logout();

      // Update UI
      updateUI(currentAccount);
    }, 2000);
  } else {
    setTimeout(() => {
      // Hide UI and warning sms
      labelWelcome.innerHTML = `<span style="color:#ff000d">Ops, Login Faild!</span>`;
      app.style.opacity = '0';
    }, 2000);
  }
  // Clear fields
  inputLoginUsername.value = inputLoginPassword.value = '';
  inputLoginPassword.blur();
});

/////////////////////////////////////////////////////////////////////
// Movements
/////////////////////////////////////////////////////////////////////

function displayMovements(account, sort = false) {
  containerMovements.innerHTML = '';
  const moves = sort
    ? account.movements.slice(0).sort((a, b) => a - b)
    : account.movements;

  moves.forEach((move, i) => {
    const transType = move > 0 ? 'deposit' : 'withdrawal';
    const formatedMove = formateCurrency(
      move,
      account.locale,
      account.currency
    );

    const date = new Date(account.movementsDates[i]);
    const displayDate = formatMoveDate(date, account.locale);
    const movementsHtml = `
          <div class="movements-row">
            <div class="movements-type movements-type-${transType}">${
      i + 1
    } ${transType}</div>
            <div class="movements-date">${displayDate}</div>
            <div class="movements-value">${formatedMove}</div>
          </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', movementsHtml);
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

  labelSumIn.textContent = formateCurrency(
    incomes,
    account.locale,
    account.currency
  );

  //Outcomes
  const outcomes = account.movements
    .filter((move) => move < 0)
    .reduce((accu, withdrawal) => accu + withdrawal, 0);

  labelSumOut.textContent = formateCurrency(
    Math.abs(outcomes),
    account.locale,
    account.currency
  );

  // Interest
  const interest = account.movements
    .filter((move) => move > 0)
    .map((deposit) => (deposit * account.interestRate) / 100)
    .filter((interest) => interest >= 1)
    .reduce((accu, interest) => accu + interest);

  labelSumInterest.textContent = formateCurrency(
    interest,
    account.locale,
    account.currency
  );
}

/////////////////////////////////////////////////////////////////////
// Balance
/////////////////////////////////////////////////////////////////////

function displayBalance(account) {
  account.balance = account.movements.reduce((accu, move) => accu + move);
  labelBalance.textContent = formateCurrency(
    account.balance,
    account.locale,
    account.currency
  );
}

/////////////////////////////////////////////////////////////////////
// Transfer
// /////////////////////////////////////////////////////////////////////

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();

  const receiverAccount = accounts.find(
    (account) => account.username === inputTransferTo.value
  );

  const reciverAmount = Number(inputTransferAmount.value);

  // Clear fields
  inputTransferTo.value = inputTransferAmount.value = '';
  inputTransferAmount.blur();

  if (
    reciverAmount > 0 &&
    reciverAmount <= currentAccount.balance &&
    currentAccount.username !== receiverAccount?.username &&
    receiverAccount
  ) {
    setTimeout(() => {
      // Transfer moneyoperation-loan
      currentAccount.movements.push(-reciverAmount);
      receiverAccount.movements.push(reciverAmount);

      // Add current date and time
      currentAccount.movementsDates.push(new Date().toISOString());
      receiverAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);

      // Show message
      labelWelcome.innerHTML = `Hurray,<span style="color:#00b79f"> Transaction successful!</span>`;
    }, 1500);

    // Log out timer
    if (timer) clearInterval(timer);
    timer = logout();
  } else {
    setTimeout(() => {
      labelWelcome.innerHTML = `<span style="color:#ff000d"> Transaction failed!</span>`;
    }, 1500);

    // Log out timer
    if (timer) clearInterval(timer);
    timer = logout();
  }
});

// /////////////////////////////////////////////////////////////////////
// // Loan
// /////////////////////////////////////////////////////////////////////

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const loanAmount = Number(inputLoanAmount.value);

  if (
    loanAmount > 0 &&
    currentAccount.movements.some((move) => move >= loanAmount * 0.1)
  ) {
    setTimeout(() => {
      // Add positive movement into current account
      currentAccount.movements.push(loanAmount);

      //Add current time
      currentAccount.movementsDates.push(new Date().toISOString());

      //updateUI
      updateUI(currentAccount);

      // Show message
      labelWelcome.innerHTML = `Hurray,<span style="color:#00b79f"> Loan Request successful!</span>`;
    }, 1500);

    // Log out timer
    if (timer) clearInterval(timer);
    timer = logout();
  } else {
    setTimeout(() => {
      labelWelcome.innerHTML = `Damn,<span style="color:#ff000d"> Loan Request declined! </span>`;
    }, 1500);

    // Log out timer
    if (timer) clearInterval(timer);
    timer = logout();
  }

  // Clear
  inputLoanAmount.value = '';
  inputLoanAmount.blur();
});

/////////////////////////////////////////////////////////////////////
// Close account
/////////////////////////////////////////////////////////////////////

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  const closeUserName = inputCloseUsername.value;
  const closeUserPassowrd = Number(inputClosePassword.value);

  if (
    currentAccount.username === closeUserName &&
    currentAccount.password === closeUserPassowrd
  ) {
    setTimeout(() => {
      const accountIndex = accounts.findIndex(
        (account) => account.username === currentAccount.username
      );

      // Delete account
      accounts.splice(accountIndex, 1);

      // Hide UI
      app.style.opacity = 0;

      // Show message
      labelWelcome.innerHTML = `<span style="color:#00b79f">Account closed successfully </span>${currentAccount.owner
        .toLowerCase()
        .split(' ')
        .at(0)}`;
    }, 1500);

    // Log out timer
    if (timer) clearInterval(timer);
    timer = logout();
  } else {
    setTimeout(() => {
      labelWelcome.innerHTML = `<span style="color:#ff000d">Account close can not be done! </span>`;
    }, 1500);

    // Log out timer
    if (timer) clearInterval(timer);
    timer = logout();
  }
  // Clear fields
  inputCloseUsername.value = inputClosePassword.value = '';
  inputCloseUsername.blur();
  inputClosePassword.blur();
});

///////////////////////////////////////////////////////////////////
// Sort
////////////////////////////////////////////////////////////////

let sortedMoves = false;

btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  setTimeout(() => {
    displayMovements(currentAccount, !sortedMoves);
    sortedMoves = !sortedMoves;
  }, 500);
});

///////////////////////////////////////////////////////////////////
// Timer
////////////////////////////////////////////////////////////////

function logout() {
  labelTimer.textContent = '';
  let time = 120;
  const clock = () => {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padEnd(2, 0);
    labelTimer.textContent = `${min}:${sec}`;

    if (time === 0) {
      clearInterval(timer);
      labelWelcome = `<span style="color:#ff000d">You've been logged out! </span>${currentAccount.owner
        .toLowerCase()
        .split(' ')
        .at(0)}`;
    }
    time--;
  };

  clock();
  timer = setInterval(clock, 1000);
  return timer;
}
