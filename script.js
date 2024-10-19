let expenses = [];
let totalAmount = 0;

const categorySelect = document.getElementById("category-select");
const amountInput = document.getElementById("amount-input");
const dateInput = document.getElementById("date-input");
const addBtn = document.getElementById("add-btn");
const expensesTableBody = document.getElementById("expenses-table-body");
const totalAmountCell = document.getElementById("total-amount");

// Load data from local storage
loadData();

addBtn.addEventListener("click", function () {
    const category = categorySelect.value;
    const amount = Number(amountInput.value);
    const date = dateInput.value;

    if (category === "") {
        alert("Please select a category")
        return;
    }
    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount")
        return;
    }
    if (date === "") {
        alert("Please select a date")
        return;
    }

    expenses.push({ category, amount, date });

    totalAmount += amount;
    totalAmountCell.textContent = totalAmount;

    const newRow = expensesTableBody.insertRow();

    const categoryCell = newRow.insertCell();
    const amountCell = newRow.insertCell();
    const dateCell = newRow.insertCell();
    const deleteCell = newRow.insertCell();
    const deleteBtn = document.createElement("button");

    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", function () {
        expenses.splice(expenses.indexOf(expense), 1);

        totalAmount -= expense.amount;
        totalAmountCell.textContent = totalAmount;

        expensesTableBody.removeChild(newRow);
    });

    const expense = expenses[expenses.length - 1];
    categoryCell.textContent = expense.category;
    amountCell.textContent = expense.amount;
    dateCell.textContent = expense.date;
    deleteCell.appendChild(deleteBtn);

    // Store data in local storage
    storeData();
});

function storeData() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
    localStorage.setItem("totalAmount", totalAmount);
}

function loadData() {
    const storedExpenses = localStorage.getItem("expenses");
    const storedTotalAmount = localStorage.getItem("totalAmount");

    if (storedExpenses && storedTotalAmount) {
        expenses = JSON.parse(storedExpenses);
        totalAmount = Number(storedTotalAmount);

        for (const expense of expenses) {
            const newRow = expensesTableBody.insertRow();
            const categoryCell = newRow.insertCell();
            const amountCell = newRow.insertCell();
            const dateCell = newRow.insertCell();
            const deleteCell = newRow.insertCell();
            const deleteBtn = document.createElement("button");

            deleteBtn.textContent = "Delete";
            deleteBtn.classList.add("delete-btn");
            deleteBtn.addEventListener("click", function () {
                expenses.splice(expenses.indexOf(expense), 1);

                totalAmount -= expense.amount;
                totalAmountCell.textContent = totalAmount;

                expensesTableBody.removeChild(newRow);

                // Store data in local storage
                storeData();
            });
            categoryCell.textContent = expense.category;
            amountCell.textContent = expense.amount;
            dateCell.textContent = expense.date;
            deleteCell.appendChild(deleteBtn);
        }

        totalAmountCell.textContent = totalAmount;
    }
}
