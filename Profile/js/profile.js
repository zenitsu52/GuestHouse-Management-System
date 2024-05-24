//check user is logged in or not
let userInfo;
let user;
let allBData = [];
let allInHData = [];
let navBrand = document.querySelector(".navbar-brand");
let logoutBtn = document.querySelector(".logout-btn");
let bookingForm = document.querySelector(".booking-fm");
let allBInput = bookingForm.querySelectorAll("input");
let inHouseForm = document.querySelector(".inhouse-fm");
let allinHInput = inHouseForm.querySelectorAll("input");
let mClose = document.querySelectorAll(".btn-close");
let TBodyList = document.querySelector(".booking-list");
let TInHList = document.querySelector(".inhouse-list");

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
allInHData = fetchData(user + "_allInHData");

// Registration coding
function registrationCode(Input,array,key){
  let data = { checkinat: new Date().toLocaleString() };
  for (el of Input ) {
    let key = el.name;
    let value = el.value;
    data[key] = value;
  }

  array.push(data);
  localStorage.setItem(key, JSON.stringify(array));
  swal("Congratulations!!", "Booking Succesful...", "success");
}


// start booking coding
bookingForm.addEventListener("submit", (e) => {
  e.preventDefault();
  registrationCode(allBInput,allBData,user + "_allBdata")
  mClose[0].click();
  bookingForm.reset("");
  // window.location.reload()
  ShowData(TBodyList,allBData);
});

// start Inhouse coding
inHouseForm.addEventListener("submit", (e) => {
  e.preventDefault();
  registrationCode(allinHInput,allInHData,user + "_allInHdata")
  console.log(allInHData)
  mClose[1].click();
  bookingForm.reset("");
  // window.location.reload()
  ShowData(TInHList,allInHData);
});

// Showing Booking Data
const ShowData = (element,array) => {
  element.innerHTML = "";
  array.forEach((item, index) => {
    element.innerHTML += `<tr>
        <td>${index + 1}</td>
        <td>${item.fullname}</td>
        <td>${item.contact}</td>
        <td>${item.room}</td>
        <td>${item.checkin}</td>
        <td>${item.checkout}</td>
        <td>${item.checkinat}</td>
        <td>
            <button class="btn ed-btn btn-primary">
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
  updateBtn();
};
ShowData(TBodyList,allBData);
ShowData(TInHList,allInHData);

console.log(allBData)
console.log(allInHData)
// Edit Booking Data
function updateBtn(){
  let AllEditBtn = TBodyList.querySelectorAll(".ed-btn")
  
  AllEditBtn.forEach((btn,index)=>{
    btn.onclick = ()=>{
     
      bregBtn.click();
      let AllBBtn = bookingForm.querySelectorAll("button");
      AllBBtn[0].classList.add("d-none")
      AllBBtn[1].classList.remove("d-none")
      let obj = allBData[index];
      allBInput[0].value = obj.fullname
      allBInput[1].value = obj.contact
      allBInput[2].value = obj.room
      allBInput[3].value = obj.checkin
      allBInput[4].value = obj.checkout
      AllBBtn[1].onclick = ()=>{
        
        swal({
          title: "Are you sure?",
          text: "You want to Update your Booking!",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((willUpdate) => {
          if (willUpdate) {
            let formData = { checkinat: new Date().toLocaleString() };
            for (el of allBInput) {
              let key = el.name;
              let value = el.value;
              formData[key] = value;
        }
              allBData[index]=formData;
              AllBBtn[1].classList.add("d-none")
              AllBBtn[0].classList.remove("d-none")
              bookingForm.reset('')
              localStorage.setItem(user + "_allBdata",JSON.stringify(allBData));
              ShowBookingData();
              modalClose.click();
            swal(" Your Booking has been Updated!", {
              icon: "success",
            });
          } else {
            swal("Your Booking is Not Updated!");
          }
        });
        
      }
      
    }

      
         
    }
  )
}

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








           
          




