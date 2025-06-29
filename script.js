document.addEventListener("DOMContentLoaded", function () {
  const amount = document.getElementById("amount");
  const date = document.getElementById("date");
  const category = document.getElementById("category");
  const expensesContainer = document.querySelector(".expenses-container");
  const monthSelect = document.getElementById("month-select");

  const currentMonth = new Date().getMonth() + 1;
  // monthSelect.value = currentMonth.toString();

  const formData = document.querySelector(".form-data");
  console.log(formData);
  formData.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("Form submitted!");
    addExpense();
    displayExpensesUI();
    console.log(monthSelect.value); //June = '6'
    getTotalByCategory(Number(monthSelect.value));
    
  });

  let categories = ['Grocery', 'Clothes', 'Car Loan', 'Mortgage', 'Cosmetics', 'Travel', 'Gifts', 'Commute', 'utilities', 'mobile & data'];

  let expenses = [];

  //Data handler functions
  const addExpense = function () {
  const expense = {
    id: Date.now() + Math.floor(Math.random() * 1000),
    amount: parseFloat(amount.value),
    date: date.value,
    category: category.value,
  };

    expenses.push(expense);
    console.log(expenses);
    return expenses;
  };

  const editExpense = function (id) {
    const index = expenses.findIndex((exp) => exp.id === id);
    if (index !== -1) {
      if (
        expenses[index].amount !== amount.value ||
        expenses[index].date !== date.value ||
        expenses[index].category !== category.value
      ) {
        expenses[index] = {
          id: id,
          amount: amount.value,
          date: date.value,
          category: category.value,
        };
      }
    }
  };

  const removeExpense = function (id) {
    const index = expenses.findIndex((exp) => exp.id === id);
    if (index !== -1) {
      expenses.splice(index, 1);
    }
  };

  // const getTotalByCategory = function (month, category) {
  //   let total = 0;
  //   for (let i = 0; i < expenses.length; i++) {
  //     const dateObj = new Date(expenses[i].date);
  //     const expMonth = dateObj.getMonth();

  //     if (expMonth === month && expenses[i].category === category) {
  //       total += Number(expenses[i].amount);
  //     }
  //   }
  //   return total;
  // };

   const getTotalByCategory = function (month) {
    
    let totalOfCategories = [];

    categories.forEach((cat) => {
      let total = 0;

      for (let i = 0; i < expenses.length; i++) {
      const dateObj = new Date(expenses[i].date);
      const expMonth = dateObj.getMonth() + 1;

      console.log(expMonth);
      if (expMonth === month && expenses[i].category === cat) {
        total += Number(expenses[i].amount);
      }}
      totalOfCategories.push({
        category: cat,
        total: total,
      });
    });
  console.log(totalOfCategories);
    return totalOfCategories;
  };


  const getMonthlyTotal = function (month) {
    let total = 0;
    for (let i = 0; i < expenses.length; i++) {
      const dateObj = new Date(expenses[i].date);
      const expMonth = dateObj.getMonth();

      if (expMonth === month) {
        total += Number(expenses[i].amount);
      }
    }
    return total;
  };

  const filterMonthlyExpenses = function (month) {
    let monthExpenses = [];
    for (let i = 0; i < expenses.length; i++) {
      const dateObj = new Date(expenses[i].date);
      const Month = dateObj.getMonth();

      if (Month === month) {
        monthExpenses.push(expenses[i]);
      }
    }
    return monthExpenses;
  };

  //UI functions

  const displayExpensesUI = function () {
    expensesContainer.innerHTML = "";
    expenses.forEach((exp) => {
      const expenseDiv = document.createElement("div");
      expenseDiv.dataset.id = exp.id;
      expenseDiv.classList.add("expense-item");
      expenseDiv.textContent = `Category: ${exp.category}, Amount: ${exp.amount}, Date: ${exp.date}`;

      console.log(exp.category, exp.amount, exp.date);

      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      const removeButton = document.createElement("button");
      removeButton.textContent = "remove";
      expenseDiv.appendChild(editButton);
      expenseDiv.appendChild(removeButton);
      expensesContainer.appendChild(expenseDiv);

      editButton.addEventListener("click", () => {
        editExpense(exp.id);
      });

      removeButton.addEventListener("click", () => {
        removeExpense(exp.id);
      });
    });
  };

  const displayTotalByCategory = function (month) {

    const totalOfCategories = getTotalByCategory(month);
    const categoryContainer = document.createElement('div');
    const totalByCategoryContainer = document.createElement('div');
    categoryContainer.classList.add('category-container');
    totalByCategoryContainer.classList.add('total-category-container');

    totalOfCategories.forEach(item => {
      const categoryDiv = document.createElement('div');
      categoryDiv.textContent = item.category;
      categoryContainer.appendChild(categoryDiv);

      const totalDiv = document.createElement('div');
      totalDiv.textContent = item.total;
      totalByCategoryContainer.appendChild(totalDiv);

    });
  };

  // const displayMonthlyTotal = function () {};

  // const clearForm = function () {};

  // const populateFormForEditing = function () {};


  // const displayMonthlyTotal = function () {};

  // const clearForm = function () {};

  // const populateFormForEditing = function () {};
});
