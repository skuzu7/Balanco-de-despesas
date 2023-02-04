const transactionsUL = document.querySelector("#transactions")
const incomeDisplay = document.querySelector("#money-plus")
const outcomeDisplay = document.querySelector("#money-minus")
const balanceDisplay = document.querySelector("#balance")
const form = document.querySelector('#form')
const inputTransactionAmount = document.querySelector('#amount')
const inputTransactionName = document.querySelector('#text')






const localStorageTransactions = JSON.parse(localStorage
    .getItem('transactions'))

let transactions = localStorage
    .getItem('transactions') !== null ? localStorageTransactions : []


const removeTransaction = ID => {
    transactions = transactions.filter(transaction => transaction.id != ID)
    updateLocalStorage()
    transactionsUL.innerHTML = ''
    init()
}


const addTransactionIntoDOM = transaction => {
 


    const operator = transaction.amount < 0 ? "-" : "+"
    const CSSclass = transaction.amount < 0 ? 'minus' : 'plus'
    const li = document.createElement('li')
    const amountWithouOperator = Math.abs(transaction.amount)

    li.classList.add(CSSclass)


    li.innerHTML = ` ${transaction.name}<span> ${operator} R$ ${amountWithouOperator}
    </span>
    <button class="delete-btn" id="${transaction.id}">x</button>" `

    const btn = li.querySelector('.delete-btn')
    btn.addEventListener('click', () => {
        removeTransaction(btn.id)
    })

    transactionsUL.append(li)

    transactionsUL.append(li)


}

const updateBalanceValues = () => {

    const transactionsAmounts = transactions.map(transaction => transaction.amount)
    console.log(transactionsAmounts)

    const total = transactionsAmounts
        .reduce((accumulator, transaction) => accumulator + transaction, 0)

    const income = transactions.filter(value => value.amount > 0).reduce((accumulator, value) => accumulator + value.amount, 0)
    const expenses = transactions.filter(value => value.amount < 0).reduce((accumulator, value) => accumulator + value.amount, 0)


    balanceDisplay.textContent = `${total}`
    outcomeDisplay.textContent = `${expenses}`
    incomeDisplay.textContent = `${income}`


}



const init = () => {


    transactions.forEach(addTransactionIntoDOM)
    updateBalanceValues()

}

init()

const updateLocalStorage = () => {

    localStorage.setItem('transactions', JSON.stringify(transactions))
}


function generateId(length) {
    let id = '';
    const characters = '0123456789';

    for (let i = 0; i < length; i++) {
        id += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return id;
}



form.addEventListener('submit', event => {

    event.preventDefault()

    const transactionName = inputTransactionName.value.trim()
    const transactionAmount = inputTransactionAmount.value.trim()

    if (transactionName === '' || transactionAmount === '') {
        alert(' Preencha corretamente')
        return
    }

    const transaction = {
        id: generateId(3),
        name: transactionName,
        amount: +transactionAmount




    }

    transactions.push(transaction)
    transactionsUL.innerHTML = ''
    init()
    updateLocalStorage()

    inputTransactionName.value = ''
    inputTransactionAmount.value = ''


})