//check user is logged in or not
let userInfo;
let user;
let allBData = [];
let navBrand = document.querySelector(".navbar-brand");
let logoutBtn = document.querySelector(".logout-btn");
let bookingForm = document.querySelector(".booking-fm");
let allBInput = bookingForm.querySelectorAll("input");
let modalClose = document.querySelector(".b-btn-close-modal");
let TBodyList = document.querySelector(".booking-list");
let bregBtn = document.querySelector(".b-register-btn");
if (sessionStorage.getItem("__au__") == null) {
  window.location = "../index.html";
}
userInfo = JSON.parse(sessionStorage.getItem("__au__"));
user = userInfo.email.split("@")[0];
// console.log(user)
navBrand.innerHTML = userInfo.fullName;
navBrand.style.color = "white";
logoutBtn.onclick = () => {
  logoutBtn.innerHTML = "Please Wait...";
  setTimeout(() => {
    swal("Session Logged Out", "", "success").then(() => {
      window.location = "../index.html";
      sessionStorage.removeItem("__au__");
    }),
      3000;
  });
};

// Getting Data from Storage

const fetchData = (key) => {
  if (localStorage.getItem(key) != null) {
    const data = JSON.parse(localStorage.getItem(key));
    return data;
  } else {
    return [];
  }
};

allBData = fetchData(user + "_allBdata");

// start booking coding
bookingForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let data = { checkinat: new Date().toLocaleString() };
  for (el of allBInput) {
    let key = el.name;
    let value = el.value;
    data[key] = value;
  }

  allBData.push(data);
  localStorage.setItem(user + "_allBdata", JSON.stringify(allBData));
  swal("Congratulations!!", "Booking Succesful...", "success");
  modalClose.click();
  bookingForm.reset("");
  // window.location.reload()
  ShowBookingData();
});

// Edit Booking Data
// const updateBtn =()=>{
//   let AllEditBtn = TBodyList.querySelectorAll(".edit-btn")
//   AllEditBtn.forEach((btn,index)=>{
//     btn.addEventListener(()=>{
//       console.log("sahil");
//     })
//     bregBtn.click();
//     }
//   )
// }
// updateBtn()

// Showing Booking Data
const ShowBookingData = () => {
  TBodyList.innerHTML = "";
  allBData.forEach((item, index) => {
    TBodyList.innerHTML += `<tr>
        <td>${index + 1}</td>
        <td>${item.fullname}</td>
        <td>${item.contact}</td>
        <td>${item.room}</td>
        <td>${item.checkin}</td>
        <td>${item.checkout}</td>
        <td>${item.checkinat}</td>
        <td>
            <button class="btn edit-btn btn-primary">
                <i class="fa fa-edit"></i>
            </button>
            <button class="btn check-btn text-white btn-info">
                <i class="fa fa-check"></i>
            </button>
            <button class="btn del-btn btn-danger">
                <i class="fa fa-trash"></i>
            </button>
        </td>
        </tr>`;
  });
  DelBookingData();
};
ShowBookingData();

// // On page load
// window.addEventListener('load', () => {
//     // Check if the user is logged in
//     if (sessionStorage.getItem("__au__") === null) {
//         window.location = "../index.html";
//     } else {
//         userInfo = JSON.parse(sessionStorage.getItem("__au__"));
//         user = userInfo.email.split("@")[0];
//         navBrand.innerHTML = userInfo.fullName;
//         navBrand.style.color = "white";

//         // Fetch booking data from localStorage
//         allBData = fetchData(user + "_allBdata");

//         // Display booking data
//         ShowBookingData();
//     }
// });

// Delete Booking Data

function DelBookingData() {
  let allBDelBtn = TBodyList.querySelectorAll(".del-btn");
  allBDelBtn.forEach((btn, index) => {
    btn.onclick = () => {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this Booking!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          allBData.splice(index, 1);
          localStorage.setItem(user + "_allBdata", JSON.stringify(allBData));
          ShowBookingData();
          swal("Poof! Your Booking has been deleted!", {
            icon: "success",
          });
        } else {
          swal("Your Booking is safe!");
        }
      });
    };
  });
}



           
          




