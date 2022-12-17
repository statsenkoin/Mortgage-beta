const banks = [
  {
    id: '435tr34wrt',
    name: 'Mono',
    interestRate: 5,
    maxLoan: 500000,
    minPayment: 1000,
    loanTerm: 12,
  },
  {
    id: 'asdfw342rew5',
    name: 'Privat',
    interestRate: 7,
    maxLoan: 1000000,
    minPayment: 5000,
    loanTerm: 50,
  },
];

const rootRef = document.querySelector('#root');
const markup = `<div class="bank-box"></div>
      <div class="bank-info"></div>`;
rootRef.insertAdjacentHTML('beforeend', markup);

const renderBankList = banks =>
  banks.map(el => `<li class = "item__name">${el.name}</li> `).join('');

const listEl = document.createElement('ul');
const markupBtnAddBankItem = document.createElement('button');
markupBtnAddBankItem.classList.add('btn');
markupBtnAddBankItem.textContent = 'Добавити банк';

listEl.insertAdjacentHTML('beforeend', renderBankList(banks));

const bankBox = document.querySelector('.bank-box');

bankBox.append(listEl, markupBtnAddBankItem);

listEl.addEventListener('click', event => {
  console.log(banks.find(bank => bank.name === event.target.textContent));
});
