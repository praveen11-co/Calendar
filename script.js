document.addEventListener('DOMContentLoaded', () => {
    const calendar = document.getElementById('calendar');
    const monthYear = document.getElementById('month-year');
    const dates = document.getElementById('dates');
    const prev = document.getElementById('prev');
    const next = document.getElementById('next');
    const modal = document.getElementById('modal');
    const close = document.getElementById('close');
    const selectedDate = document.getElementById('selected-date');
    const journal = document.getElementById('journal');
    const todoList = document.getElementById('todo-list');
    const newTodo = document.getElementById('new-todo');
    const addTodo = document.getElementById('add-todo');

    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();
    let currentSelectedDate = null;

    function loadCalendar(month, year) {
        const firstDay = new Date(year, month).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        monthYear.innerText = `${new Date(year, month).toLocaleString('default', { month: 'long' })} ${year}`;

        dates.innerHTML = '';

        for (let i = 0; i < firstDay; i++) {
            dates.innerHTML += '<div></div>';
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const dateDiv = document.createElement('div');
            dateDiv.innerText = i;
            dateDiv.addEventListener('click', () => openModal(i));
            dates.appendChild(dateDiv);
        }
    }

    function openModal(day) {
        currentSelectedDate = `${currentYear}-${currentMonth + 1}-${day}`;
        selectedDate.innerText = `${day} ${new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} ${currentYear}`;
        modal.style.display = 'block'; // Show modal
        modal.classList.add('show-modal');

        const storedJournal = localStorage.getItem(`${currentSelectedDate}-journal`);
        journal.value = storedJournal || '';

        const storedTodos = JSON.parse(localStorage.getItem(`${currentSelectedDate}-todos`)) || [];
        renderTodoList(storedTodos);
    }

    function closeAndSaveModal() {
        modal.style.display = 'none'; // Hide modal
        modal.classList.remove('show-modal');
        saveEntry();
    }

    function renderTodoList(todos) {
        todoList.innerHTML = '';
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.innerText = todo;
            todoList.appendChild(li);
        });
    }

    close.addEventListener('click', closeAndSaveModal);

    addTodo.addEventListener('click', () => {
        const todo = newTodo.value.trim();
        if (todo) {
            const todos = JSON.parse(localStorage.getItem(`${currentSelectedDate}-todos`)) || [];
            todos.push(todo);
            localStorage.setItem(`${currentSelectedDate}-todos`, JSON.stringify(todos));
            renderTodoList(todos);
            newTodo.value = '';
        }
    });

    journal.addEventListener('input', () => {
        saveEntry();
    });

    function saveEntry() {
        if (currentSelectedDate) {
            localStorage.setItem(`${currentSelectedDate}-journal`, journal.value);
        }
    }

    prev.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        loadCalendar(currentMonth, currentYear);
    });

    next.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        loadCalendar(currentMonth, currentYear);
    });

    // Initialize calendar and modal
    modal.style.display = 'none'; // Hide modal initially

    // Load current month's calendar
    loadCalendar(currentMonth, currentYear);
});
