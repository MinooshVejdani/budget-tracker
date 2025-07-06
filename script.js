
document.addEventListener("DOMContentLoaded", function () {
  const amount = document.getElementById("amount");
  const date = document.getElementById("date");
  const categoryContainer = document.getElementById("category-container");
  const expensesContainer = document.querySelector(".expenses-container");
  const totalsSection = document.querySelector(".totals-section");
  const monthSelect = document.getElementById("month-select");
  const monthlyTotalAmount = document.getElementById("monthly-total-amount");

  const currentMonth = new Date().getMonth() + 1;
  monthSelect.value = currentMonth.toString();

  const formData = document.querySelector(".form-data");

  let expenses = [];
  

  formData.addEventListener("submit", (event) => {
    event.preventDefault();

    addExpense();
    displayExpensesUI();
    displayTotalByCategory(Number(monthSelect.value));
    displayMonthlyTotal(getMonthlyTotal());
    formData.reset();
  });

  let categories = [
    "Grocery",
    "Clothes",
    "Car Loan",
    "Mortgage",
    "Cosmetics",
    "Travel",
    "Gifts",
    "Commute",
    "utilities",
    "mobile & data",
    "Restaurant",
  ];

  

  //******************* Data handler functions *******************/

  const addExpense = function () {
    const category = document.getElementById("category");
    const expense = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      amount: parseFloat(amount.value),
      date: date.value,
      category: category.value,
    };
    
    expenses.push(expense);
    saveExpenses();
    console.log(expenses);
    return expenses;
  };

  const editExpenseData = function (id, amount, date, category) {
    const index = expenses.findIndex((exp) => exp.id === id);
    expenses[index] = {
      id: id,
      amount: amount.value,
      date: date.value,
      category: category.value,
    };
    saveExpenses();
  };

  const removeExpense = function (id) {
    const index = expenses.findIndex((exp) => exp.id === id);
    if (index !== -1) {
      expenses.splice(index, 1);
    }
    displayExpensesUI();
    displayTotalByCategory(Number(monthSelect.value));
    displayMonthlyTotal(getMonthlyTotal());
    saveExpenses();
  };

  const getTotalByCategory = function (month) {
    let totalOfCategories = [];

    categories.forEach((cat) => {
      let total = 0;

      for (let i = 0; i < expenses.length; i++) {
        const expMonth = new Date(expenses[i].date).getMonth() + 1;

        if (expMonth === month && expenses[i].category === cat) {
          total += Number(expenses[i].amount);
        }
      }
      totalOfCategories.push({
        category: cat,
        total: total,
      });
    });
    return totalOfCategories;
  };

  const getMonthlyTotal = function () {
    let total = 0;
    for (let i = 0; i < expenses.length; i++) {
      if (
        new Date(expenses[i].date).getMonth() + 1 ===
        Number(monthSelect.value)
      ) {
        total += Number(expenses[i].amount);
      }
    }
    return total;
  };

  const filterMonthlyExpenses = function (month) {
    let monthExpenses = [];
    for (let i = 0; i < expenses.length; i++) {
      const expMonth = new Date(expenses[i].date).getMonth() + 1;

      if (expMonth === month) {
        monthExpenses.push(expenses[i]);
      }
    }
    return monthExpenses;
  };

  monthSelect.addEventListener("change", () => {
    displayExpensesUI(filterMonthlyExpenses(Number(monthSelect.value)));
    displayTotalByCategory(Number(monthSelect.value));
    displayMonthlyTotal(getMonthlyTotal());
  });

  //******************* UI handler functions *******************/

  const createExpenseElement = function (expense, expenseDiv) {
    expenseDiv.classList.add("expense-item");
    expenseDiv.dataset.id = expense.id;
    expenseDiv.textContent = `Category: ${expense.category}, Amount: ${expense.amount}, Date: ${expense.date}`;

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    const removeButton = document.createElement("button");
    removeButton.textContent = "remove";
    expenseDiv.appendChild(editButton);
    expenseDiv.appendChild(removeButton);

    editButton.addEventListener("click", () => {
      populateFormForEditing(expense.id, expenseDiv);
    });

    removeButton.addEventListener("click", () => {
      console.log('Removing expense with ID:', expense.id);
      removeExpense(expense.id);
      displayExpensesUI();
      displayTotalByCategory(Number(monthSelect.value));
    });
  };


  const displayExpensesUI = function (array = expenses) {

    expensesContainer.innerHTML = "";
    array.forEach((exp) => {
      const expenseDiv = document.createElement("div");
      createExpenseElement(exp, expenseDiv);
      expensesContainer.appendChild(expenseDiv);
    });
  };

  const displayTotalByCategory = function (month) {
    const totalOfCategories = getTotalByCategory(month);
    totalsSection.innerHTML = "";

    totalOfCategories.forEach((item) => {
      const categoryColumn = document.createElement("div");
      categoryColumn.classList.add("category-column");

      const categoryItem = document.createElement("div");
      categoryItem.classList.add("category-item");
      categoryItem.textContent = item.category;
      categoryColumn.appendChild(categoryItem);

      const totalItem = document.createElement("div");
      totalItem.classList.add("total-amount");
      totalItem.textContent = item.total;
      categoryColumn.appendChild(totalItem);
      totalsSection.appendChild(categoryColumn);
    });
  };

  const createCategorySelect = function () {
    const categoryInputElement = document.createElement("select");
    categories.forEach((cat) => {
      const option = document.createElement("option");
      option.value = cat;
      option.textContent = cat;
      categoryInputElement.appendChild(option);
    });
    return categoryInputElement;
  };

  const populateFormForEditing = function (id, expenseDiv) {
    const index = expenses.findIndex((exp) => exp.id === id);
    console.log("index:", index, "id:", id);
    if (index !== -1) {
      expenseDiv.innerHTML = "";

      const categoryInputElement = createCategorySelect();
      categoryInputElement.value = expenses[index].category;

      const amountInput = document.createElement("input");
      amountInput.value = expenses[index].amount;
      amountInput.type = "number";

      const dateInput = document.createElement("input");
      dateInput.type = "date";
      dateInput.value = expenses[index].date;

      const saveButton = document.createElement("button");
      saveButton.textContent = "Save";
      const cancelButton = document.createElement("button");
      cancelButton.textContent = "Cancel";

      expenseDiv.appendChild(categoryInputElement);
      expenseDiv.appendChild(amountInput);
      expenseDiv.appendChild(dateInput);
      expenseDiv.appendChild(saveButton);
      expenseDiv.appendChild(cancelButton);

      saveButton.addEventListener("click", () => {
        editExpenseData(id, amountInput, dateInput, categoryInputElement);

        expenseDiv.innerHTML = "";
        createExpenseElement(expenses[index], expenseDiv);
        displayTotalByCategory(Number(monthSelect.value));
      });

      cancelButton.addEventListener("click", () => {
        expenseDiv.innerHTML = "";
        createExpenseElement(expenses[index], expenseDiv);
      });
    }
  };

  const displayMonthlyTotal = function (total) {
    monthlyTotalAmount.innerHTML = "";
    monthlyTotalAmount.textContent = total;
  };

  const saveExpenses = function () {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  };

      const loadExpenses = function () {
    console.log("Loading expenses...");
    const storedExpenses = localStorage.getItem("expenses");
    if(storedExpenses) {
      expenses = JSON.parse(storedExpenses);
    } 
  }

  const expenseCategorySelect = createCategorySelect();
  expenseCategorySelect.id = "category";
  categoryContainer.appendChild(expenseCategorySelect);

  loadExpenses();
  displayExpensesUI();
  displayTotalByCategory(Number(monthSelect.value));
  displayMonthlyTotal(getMonthlyTotal());

});
