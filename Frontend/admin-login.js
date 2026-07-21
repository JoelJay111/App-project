const API_URL = "https://phone-repair-backend-m1xm.onrender.com/api";

const loginForm = document.querySelector("#loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const username = document.querySelector("#username").value.trim();
        const password = document.querySelector("#password").value;

        try {

            const response = await fetch(`${API_URL}/admin/login`, {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    username,
                    password
                })

            });

            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }

            // Save JWT token
            localStorage.setItem("adminToken", data.token);

            alert("Login Successful!");

            window.location.href = "dashboard.html";

        } catch (error) {

            console.error(error);

            alert("Unable to login.");

        }

    });

}

