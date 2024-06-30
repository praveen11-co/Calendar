document.addEventListener("DOMContentLoaded", function() {
    // DOM elements
    const monthYearElement = document.getElementById("month-year");
    const daysElement = document.getElementById("days");
    const datesElement = document.getElementById("dates");
    const digitalClockElement = document.getElementById("digital-clock");
    const dateDisplayElement = document.getElementById("date-display");
    const todoListElement = document.getElementById("todo-list");
    const newTodoInput = document.getElementById("new-todo");
    const addTodoButton = document.getElementById("add-todo");
    const notesElement = document.getElementById("notes");
    const journalElement = document.getElementById("journal");

    // Initial setup
    const today = new Date();
    let currentYear = today.getFullYear();
    let currentMonth = today.getMonth();
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    setupCalendar(today);
    updateClock();
    updateDateDisplay();

    // Calendar navigation
    document.getElementById("prev").addEventListener("click", () => {
        currentMonth--;
        setupCalendar(new Date(currentYear, currentMonth, 1));
    });

    document.getElementById("next").addEventListener("click", () => {
        currentMonth++;
        setupCalendar(new Date(currentYear, currentMonth, 1));
    });

    // Add todo item
    addTodoButton.addEventListener("click", () => {
        const todoText = newTodoInput.value.trim();
        if (todoText !== "") {
            addTodoItem(todoText);
            newTodoInput.value = "";
        }
    });

    // Clock update
    setInterval(updateClock, 1000);

    // Function to set up the calendar for a given month
    function setupCalendar(date) {
        currentYear = date.getFullYear();
        currentMonth = date.getMonth();

        monthYearElement.textContent = months[currentMonth] + " " + currentYear;

        // Clear previous calendar
        daysElement.innerHTML = "";
        datesElement.innerHTML = "";

        // Setup days of the week headers
        for (let day of daysOfWeek) {
            const dayElement = document.createElement("div");
            dayElement.textContent = day;
            daysElement.appendChild(dayElement);
        }

        // Setup dates for the current month
        const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
        const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
        const daysInMonth = lastDayOfMonth.getDate();

        // Determine the starting day of the week (0 - 6 index)
        let startDayOfWeek = firstDayOfMonth.getDay();

        if (startDayOfWeek === 0) {
            startDayOfWeek = 7; // Adjust for Sunday (0 index)
        }

        // Create blank spaces for days before the start of the month
        for (let i = 1; i < startDayOfWeek; i++) {
            const blankDayElement = document.createElement("div");
            datesElement.appendChild(blankDayElement);
        }

        // Create day elements for the current month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayElement = document.createElement("div");
            dayElement.textContent = day;
            dayElement.addEventListener("click", () => openModal(day, currentMonth, currentYear));
            datesElement.appendChild(dayElement);

            // Highlight today's date
            if (day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()) {
                dayElement.classList.add("active");
            }
        }
    }

    // Function to update the digital clock
    function updateClock() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, "0");
        const minutes = now.getMinutes().toString().padStart(2, "0");
        const seconds = now.getSeconds().toString().padStart(2, "0");
        digitalClockElement.textContent = `${hours}:${minutes}:${seconds}`;
    }

    // Function to update the date display
    function updateDateDisplay() {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateDisplayElement.textContent = today.toLocaleDateString('en-US', options);
    }

    // Function to add a new todo item
    function addTodoItem(text) {
        const li = document.createElement("li");
        li.textContent = text;
        todoListElement.appendChild(li);
    }

    // Modal functionality
    const modal = document.getElementById("modal");
    const modalContent = document.getElementById("modal-content");
    const closeModal = document.getElementById("close");

    closeModal.addEventListener("click", () => {
        modal.classList.remove("show-modal");
    });

    // Function to open modal with date details
    function openModal(day, month, year) {
        const modalDate = `${day} ${months[month]} ${year}`;
        document.getElementById("modal-date").textContent = modalDate;
        modal.classList.add("show-modal");
    }
});
