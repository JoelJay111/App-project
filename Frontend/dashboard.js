const API_URL = "https://phone-repair-backend-m1xm.onrender.com/api";

// Check if admin is logged in
const token = localStorage.getItem("adminToken");

if (!token) {
    window.location.href = "admin-login.html";
}

// Logout
const logoutBtn = document.querySelector("#logoutBtn");

logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("adminToken");
    window.location.href = "admin-login.html";
});

// Load bookings
async function loadBookings() {

    try {

        const response = await fetch(`${API_URL}/bookings`);

        const bookings = await response.json();

        const tableBody = document.querySelector("#bookingTableBody");

        tableBody.innerHTML = "";

        // Statistics
        document.querySelector("#totalBookings").textContent = bookings.length;

        let pending = 0;
        let progress = 0;
        let completed = 0;

        bookings.forEach((booking) => {

            const status = booking.status || "Pending";

            if (status === "Pending") pending++;
            if (status === "In Progress") progress++;
            if (status === "Completed") completed++;

            tableBody.innerHTML += `
                <tr>
                    <td>${booking.name}</td>
                    <td>${booking.email}</td>
                    <td>${booking.phone}</td>
                    <td>${booking.repairType}</td>
                    <td>${booking.brand}</td>
                    <td>${booking.problem}</td>
                    <td>${status}</td>
                    <td>
                        <button class="edit-btn">Edit</button>
                        <button class="delete-btn">Delete</button>
                    </td>
                </tr>
            `;
        });

        document.querySelector("#pendingBookings").textContent = pending;
        document.querySelector("#progressBookings").textContent = progress;
        document.querySelector("#completedBookings").textContent = completed;

    } catch (error) {

        console.error(error);

        alert("Failed to load bookings.");

    }

}

// Run when page loads
loadBookings();