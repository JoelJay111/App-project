// ==========================
// MOBILE MENU
// ==========================

// SELECT MENU ELEMENTS
const menuToggle = document.querySelector(".menu-toggle");

const navLinks = document.querySelector(".nav-links");


// TOGGLE MOBILE MENU
if(menuToggle){

  menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("active");

  });

}



// ==========================
// DARK MODE
// ==========================

// DARK MODE BUTTON
const darkModeBtn = document.querySelector(".dark-mode-btn");


// DARK MODE FUNCTION
if(darkModeBtn){

  darkModeBtn.addEventListener("click", () => {

    // TOGGLE DARK MODE
    document.body.classList.toggle("dark-mode");


    // CHANGE ICON
    if(document.body.classList.contains("dark-mode")){

      darkModeBtn.textContent = "☀️";

    }else{

      darkModeBtn.textContent = "🌙";

    }

  });

}



// ==========================
// BOOKING FORM
// ==========================

// SELECT FORM
const bookingForm = document.querySelector("#bookingForm");


// CHECK IF FORM EXISTS
if(bookingForm){

  // FORM SUBMIT EVENT
  bookingForm.addEventListener("submit", (event) => {

    // STOP PAGE REFRESH
    event.preventDefault();


    // GET INPUT VALUES
    const name =
      document.querySelector("#name").value;

    const email =
      document.querySelector("#email").value;

    const phone =
      document.querySelector("#phone").value;

    const repairType =
      document.querySelector("#repairType").value;

    const brand =
      document.querySelector("#brand").value;

    const problem =
      document.querySelector("#problem").value;


    // CREATE BOOKING OBJECT
    const booking = {

      name,
      email,
      phone,
      repairType,
      brand,
      problem

    };


    // GET EXISTING BOOKINGS
    let bookings =
      JSON.parse(
        localStorage.getItem("repairBookings")
      ) || [];


    // ADD NEW BOOKING
    bookings.push(booking);


    // SAVE TO LOCAL STORAGE
    localStorage.setItem(
      "repairBookings",
      JSON.stringify(bookings)
    );


    // SUCCESS MESSAGE
    alert("Repair booking submitted successfully!");


    // CLEAR FORM
    bookingForm.reset();

  });

}



// ==========================
// DASHBOARD BOOKINGS
// ==========================

// SELECT TABLE BODY
const bookingTableBody =
  document.querySelector("#bookingTableBody");


// CHECK IF TABLE EXISTS
if(bookingTableBody){

  // GET BOOKINGS FROM STORAGE
  const bookings =
    JSON.parse(
      localStorage.getItem("repairBookings")
    ) || [];


  // LOOP THROUGH BOOKINGS
  bookings.forEach((booking, index) => {

    // CREATE TABLE ROW
    const row =
      document.createElement("tr");


    // ADD DATA TO ROW
    row.innerHTML = `

      <td>${booking.name}</td>

      <td>${booking.email}</td>

      <td>${booking.phone}</td>

      <td>${booking.repairType}</td>

      <td>${booking.brand}</td>

      <td>${booking.problem}</td>

    `;


    // ADD ROW TO TABLE
    bookingTableBody.appendChild(row);

  });

}