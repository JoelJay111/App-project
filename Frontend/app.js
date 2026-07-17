// ==========================
// MOBILE MENU
// ==========================

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });
}

// ==========================
// DARK MODE
// ==========================

const darkModeBtn = document.querySelector(".dark-mode-btn");

if (darkModeBtn) {
    darkModeBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            darkModeBtn.textContent = "☀️";
        } else {
            darkModeBtn.textContent = "🌙";
        }

    });
}

// ==========================
// BOOKING FORM
// ==========================

const bookingForm = document.querySelector("#bookingForm");

if (bookingForm) {

    bookingForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const booking = {
            name: document.querySelector("#name").value,
            email: document.querySelector("#email").value,
            phone: document.querySelector("#phone").value,
            repairType: document.querySelector("#repairType").value,
            brand: document.querySelector("#brand").value,
            problem: document.querySelector("#problem").value
        };

        try {

            const response = await fetch("http://localhost:3000/api/bookings", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(booking)

            });

            if (!response.ok) {
                throw new Error("Server Error");
            }

            const data = await response.json();

            alert(data.message);

            bookingForm.reset();

        } catch (error) {

            console.error("Booking Error:", error);

            alert("Unable to submit booking.");

        }

    });

}

// ==========================
// DASHBOARD BOOKINGS
// ==========================

const bookingTableBody = document.querySelector("#bookingTableBody");

if (bookingTableBody) {

    loadBookings();

}

async function loadBookings() {

    try {

        const response = await fetch("http://localhost:3000/api/bookings");

        const bookings = await response.json();

        bookingTableBody.innerHTML = "";

        bookings.forEach((booking) => {

            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${booking.name}</td>
                <td>${booking.email}</td>
                <td>${booking.phone}</td>
                <td>${booking.repairType}</td>
                <td>${booking.brand}</td>
                <td>${booking.problem}</td>
            `;

            bookingTableBody.appendChild(row);

        });

    } catch (error) {

        console.error("Dashboard Error:", error);

    }

}