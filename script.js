const amount = document.getElementById(amount);
const date = document.getElementById(date);
const category = document.getElementById(category);
const id = Date.now() + Math.floor(Math.random() * 1000);
let expense = { id: Date.now() + Math.floor(Math.random() * 1000) , amount: amount.value, 
date: date.value,
category: category.value
};


let expenses = [];


//Data handler functions
const addExpense = function() {
expenses.push(expense);
return expenses;
};

const editExpense = function(id) {
    const index = expenses.findIndex(exp => exp.id === id);
    if(index!== -1) {
        if(expenses[index].amount !== amount.value || expenses[index].date !== date.value || expenses[index].category !== category.value) {
            expenses[index] = {id: id, amount: amount.value, date: date.value, category: category.value}
        }
    }
};

const removeExpense = function(id) {
    const index = expenses.findIndex(exp => exp.id === id);
    if(index !== -1) {
        expenses.splice(index, 1);
    }
};

const getTotalByCategory = function(month, category){
    let total = 0;
    for (let i = 0; i < expenses.length; i++) {
        const dateObj = new Date(expenses[i].date);
        const expMonth = dateObj.getMonth();
        
        if(expMonth === month && expenses[i].category === category) {
            total += Number(expenses[i].amount);
        }
    }
    return total;
};

const getMonthlyTotal = function(month) {
let total = 0;
    for (let i = 0; i < expenses.length; i++) {
        const dateObj = new Date(expenses[i].date);
        const expMonth = dateObj.getMonth();
        
        if(expMonth === month) {
            total += Number(expenses[i].amount);
        }
    }
    return total;
};