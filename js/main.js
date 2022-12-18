const banks = [
  {
    id: '435tr34wrt',
    name: 'Mono',
    interestRate: 5,
    maxLoan: 500000,
    minPayment: 1000,
    loanTerm: 12,
    logo: 'mono.png',
  },
  {
    id: 'asdfw342rew5',
    name: 'Privat',
    interestRate: 7,
    maxLoan: 1000000,
    minPayment: 5000,
    loanTerm: 50,
    logo: 'privat.png',
  },
  {
    id: 'qwsfw342rew5',
    name: 'NBU',
    interestRate: 4,
    maxLoan: 1000000,
    minPayment: 6000,
    loanTerm: 60,
    logo: 'nbu.png',
  },
  {
    id: 'ew5r3442rw5',
    name: 'Oschad',
    interestRate: 6,
    maxLoan: 1000000,
    minPayment: 6000,
    loanTerm: 60,
    logo: 'oschad.png',
  },
  {
    id: '42rw5ew5r34',
    name: 'Ukrgaz',
    interestRate: 5,
    maxLoan: 750000,
    minPayment: 4000,
    loanTerm: 36,
    logo: 'ukrgaz.png',
  },
  {
    id: '4wrt4r335t',
    name: 'Alfa',
    interestRate: 4,
    maxLoan: 100000,
    minPayment: 2000,
    loanTerm: 24,
  },
];

// ===============================================================================
let userBanks = [];

// let userBanks = [
//   {
//     id: 'qwsfw342rew5',
//     name: 'NBU',
//     interestRate: 4,
//     maxLoan: 1000000,
//     minPayment: 6000,
//     loanTerm: 60,
//     logo: 'nbu.png',
//   },
//   {
//     id: 'ew5r3442rw5',
//     name: 'Oschad',
//     interestRate: 6,
//     maxLoan: 1000000,
//     minPayment: 6000,
//     loanTerm: 60,
//     logo: 'oschad.png',
//   },
//   {
//     id: '42rw5ew5r34',
//     name: 'Ukrgaz',
//     interestRate: 5,
//     maxLoan: 750000,
//     minPayment: 4000,
//     loanTerm: 36,
//     logo: 'ukrgaz.png',
//   },
// ];

let choosenBank = null;
let form = null;

let inputBank;

// ===== initial markup =====
const rootRef = document.querySelector('#root');
const markup = `<div class="bank-box">Мої банки
                  <ul class="bank-list"></ul>
                  <button  class="btn btn-add">Додати банк</button>
                </div>
                <div class="bank-info"></div>`;
rootRef.insertAdjacentHTML('beforeend', markup);

// ===== querySelector for all elements =====
rootRef.addEventListener('click', onElementClick);

const bankList = document.querySelector('.bank-list');
const bankInfo = document.querySelector('.bank-info');

// ===== markup initial favorite list =====
bankList.innerHTML = renderBankList(userBanks);

// ===== functions =====

function renderBankList(userBankList) {
  const markup = !userBankList.length
    ? `<li class = "bank__name bank__message">
    <p>Список улюблених банків пустий</p>
    <p>Скористайтесь кнопкою</p><p>"Додати банк"</p>
    </li>`
    : userBankList
        .map(
          (el) =>
            `<li class = "bank__name" id="${el.id}">
                <img
                  class="bank__image"
                  src="./img/${el.logo}" 
                  alt="логотип ${el.name} банку" 
                  width="50"
                />
                ${el.name}
            </li>`
        )
        .join('');
  return (bankList.innerHTML = markup);
}

function onElementClick(e) {
  const elem = e.target;

  if (elem.classList.contains('btn-add')) {
    inputBank = addUserBankMarkUp();
  } else if (elem.classList.contains('btn-edit')) {
    onBankEdit(choosenBank);
  } else if (elem.classList.contains('btn-delete')) {
    onBankDelete(choosenBank);
  } else if (elem.classList.contains('btn-addbank')) {
    onAddBank(inputBank);
  } else if (
    elem.classList.contains('bank__name') ||
    elem.classList.contains('bank__image')
  ) {
    choosenBank = findUserBank(elem);
    onBankInfoMarkup(choosenBank);
  }
}

function findUserBank(elem) {
  return userBanks.find((bank) => {
    // перевіряє клік на <img> logo і спрямовує клік на батьківський <li>
    if (
      elem.classList.contains('bank__image') &&
      elem.closest('li.bank__name')
    ) {
      return bank.id === elem.closest('li.bank__name').id;
    }
    return bank.id === elem.id;
  });
}

function onBankInfoMarkup(bank) {
  // console.log('choosen bank :>> ', bank);
  if (!bank) {
    bankInfo.innerHTML = '';
  } else {
    bankInfo.innerHTML = `<h2>${bank.name}bank</h2>
    <p>Сума займу: ${bank.maxLoan} грн.</p>
    <p>Відсоткова ставка: ${bank.interestRate}%</p>
    <p>Мінімальний платіж: ${bank.minPayment} грн.</p>
    <p>Строк займу: ${bank.loanTerm} місяців.</p>
    <div class="btn-wrapper">
    <button  class="btn btn-edit">Редагувати фінансовий пакет</button>
    <button class="btn btn-delete">Видалити зі списку улюблених</button>
    </div>`;
  }
}

function addUserBankMarkUp() {
  // https://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_datalist

  const options = banks
    .map((bank) => `<option value="${bank.name}"></option>`)
    .join('');

  const markup = `
  <input type="text" list="banklist" class="input-addbank"/>
    <datalist id="banklist">${options}</datalist>
  <button  class="btn btn-addbank">Додати банк до списку</button>
    `;
  bankInfo.innerHTML = markup;

  return document.querySelector('.input-addbank');
}

function onAddBank(input) {
  // console.log('bank :>> ', input.value);
  const newBank = banks.find((bank) => input.value === bank.name);
  userBanks = [...userBanks, { ...newBank }];
  renderBankList(userBanks);
  choosenBank = userBanks.find((bank) => input.value === bank.name);
  onBankInfoMarkup(choosenBank);
}

function onBankEdit(bank) {
  // console.log('bank :>> ', bank);
  onBankEditMarkUp(bank);
  form = document.querySelector('.form-edit');

  // form.addEventListener('submit', onAddBankSubmit, { once: true });
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // !!!TODO
    const newBank = { ...bank };
    const randomID = randomiseID();
    newBank.id = bank.id + randomID;

    newBank.name =
      bank.name === form.name.value
        ? form.name.value + randomID
        : form.name.value;

    newBank.maxLoan = Number(form.maxLoan.value);
    newBank.interestRate = Number(form.interestRate.value);
    newBank.minPayment = Number(form.minPayment.value);
    newBank.loanTerm = Number(form.loanTerm.value);
    userBanks = [...userBanks, newBank];

    // console.log('banks :>> ', banks);
    // console.log('userBanks :>> ', userBanks);
    renderBankList(userBanks);
    bankInfo.innerHTML = '';
    // !!!TODO
  });
}

let newID = 0;
function randomiseID() {
  newID += 1;
  return newID.toString();
}

function onBankEditMarkUp(bank) {
  const markup = `<form class="form-edit">
      <label class="label-edit">
        Назва банку: 
          <input class="input-edit" type="text" name="name"
                value="${bank.name}"/>
         bank
      </label>
      <label class="label-edit">
        Сума займу: 
          <input class="input-edit" type="number" min="0" name="maxLoan"
                value="${bank.maxLoan}"/>
         грн.
      </label>
      <label class="label-edit">
        Відсоткова ставка: 
          <input class="input-edit" type="number" min="0" name="interestRate"
                value="${bank.interestRate}"/>
         %
      </label>
      <label class="label-edit">
        Мінімальний платіж: 
          <input class="input-edit" type="number" min="0" name="minPayment"
                value="${bank.minPayment}"/>
         грн.
      </label>
      <label class="label-edit">
        Строк займу: 
          <input class="input-edit" type="number" min="0" name="loanTerm"
                value="${bank.loanTerm}"/>
         місяців.
      </label>
      <button type="submit" class="btn btn-editbank">Зберегти зміни</button>
    </form>`;
  bankInfo.innerHTML = markup;
}

function onBankDelete(bank) {
  // console.log('bank :>> ', bank);
  const bankIndex = userBanks.findIndex((item) => item.id === bank.id);
  userBanks.splice(bankIndex, 1);
  choosenBank = null;
  onBankInfoMarkup(choosenBank);
  renderBankList(userBanks);
}
