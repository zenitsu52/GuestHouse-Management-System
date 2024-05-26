//check user is logged in or not
let userInfo;
let user;
let allBData = [];
let allInHData = [];
let allArchiveData = [];
let allCashData = [];
let allCashArchData = [];

let navBrand = document.querySelector(".navbar-brand");
let logoutBtn = document.querySelector(".logout-btn");
let bookingForm = document.querySelector(".booking-fm");
let allBInput = bookingForm.querySelectorAll("input");
let inHouseForm = document.querySelector(".inhouse-fm");
let allinHInput = inHouseForm.querySelectorAll("input");
let ArchiveForm = document.querySelector(".archive-fm");
let allArchiveInput = ArchiveForm.querySelectorAll("input");
let mClose = document.querySelectorAll(".btn-close");
let TBodyList = document.querySelector(".booking-list");
let TInHList = document.querySelector(".inhouse-list");
let TArchiveList = document.querySelector(".archive-list");
let btnbtn = document.querySelectorAll(".tab-btn");
let bregBtn = document.querySelector(".b-register-btn");
let inHBtn = document.querySelector(".in-house-reg-btn");
let searchEl = document.querySelector(".search-element")
let cashierForm = document.querySelector(".cashier-fm")
let cashInput = cashierForm.querySelectorAll("input")
let TCashierList = document.querySelector(".cashier-list");
let cashTotal = document.querySelector(".total");
let closeCashier = document.querySelector(".close-cashier-btn");
let TArchCashierList = document.querySelector(".cashier-arch-list");
let ArchcashTotal = document.querySelector(".arch-total");
let printBtn = document.querySelectorAll(".print-btn");
let ArchCashprintBtn = document.querySelector(".arch-print-btn");
let CashPane = document.querySelector(".cashier-pane");





// let cashierName = document.querySelector(".cashier-default")
// let cashierid = document.querySelector(".cashier-id")



if (sessionStorage.getItem("__au__") == null) {
  window.location = "../index.html";
}

userInfo = JSON.parse(sessionStorage.getItem("__au__"));
user = userInfo.email.split("@")[0];
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
allInHData = fetchData(user + "_allInHdata");
allArchiveData = fetchData(user + "_allArchivedata");
allCashData = fetchData(user + "_allCashdata");
allCashArchData = fetchData(user + "_allCashArchdata");



// Registration coding
function registrationCode(Input, array, key) {
  let data = { checkinat: new Date().toLocaleString() };
  for (el of Input) {
    let key = el.name;
    let value = el.value;
    data[key] = value;
  }

  array.unshift(data);
  localStorage.setItem(key, JSON.stringify(array));
  swal("Congratulations!!", "Booking Succesful...", "success");
}


// Check in Check out function
function CheckInandCheckOut(element, array, keys) {
  let AllcheckBtn = element.querySelectorAll(".check-btn")
  AllcheckBtn.forEach((btn, index) => {
    btn.onclick = () => {
      let tmp = keys.split("_")[1]
      let data = array[index]
      array.splice(index, 1);
      localStorage.setItem(keys, JSON.stringify(array))
      if (tmp == "allBdata") {
        allInHData.unshift(data)
        localStorage.setItem(user + "_allInHdata", JSON.stringify(allInHData))
        ShowData(element, array, keys);
      }
      else if (tmp == "allArchivedata") {
        allBData.unshift(data)
        localStorage.setItem(user + "_allBdata", JSON.stringify(allBData))
        ShowData(element, array, keys);
      }


      else {
        allArchiveData.unshift(data)
        localStorage.setItem(user + "_allArchivedata", JSON.stringify(allArchiveData))
        ShowData(element, array, keys);


      }
    }
  })
}

// Showing Booking Data
const ShowData = (element, array, keys) => {
  let tmp = keys.split("_")[1]


  element.innerHTML = "";
  array.forEach((item, index) => {
    element.innerHTML += `<tr>
        <td class="no-print">${index + 1}</td>
        <td>${item.fullname}</td>
        <td>${item.contact}</td>
        <td>${item.room}</td>
        <td>${item.checkin}</td>
        <td>${item.checkout}</td>
        <td>${item.checkinat}</td>
        <td class="no-print">
           <button class= " ${tmp == "allArchivedata" && 'd-none'} btn ed-btn btn-primary">
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
  DelData(element, array, keys);
  updateBtn(element, array, keys);
  CheckInandCheckOut(element, array, keys);

};

// start booking coding
bookingForm.addEventListener("submit", (e) => {
  e.preventDefault();
  registrationCode(allBInput, allBData, user + "_allBdata");
  mClose[0].click();
  bookingForm.reset("");
  // window.location.reload()
  ShowData(TBodyList, allBData, user + "_allBdata");
});

// start Inhouse coding
inHouseForm.addEventListener("submit", (e) => {
  e.preventDefault();
  registrationCode(allinHInput, allInHData, user + "_allInHdata");
  mClose[1].click();
  inHouseForm.reset("");
  // window.location.reload()
  ShowData(TInHList, allInHData, user + "_allInHdata");

});

// Start Archive Coding
ArchiveForm.addEventListener("submit", (e) => {
  e.preventDefault();
  registrationCode(allinHInput, allInHData, user + "_allInHdata");
  mClose[1].click();
  inHouseForm.reset("");
  // window.location.reload()
  ShowData(TArchiveList, allArchiveData, user + "_allArchivedata");

});

// Start Cashier Coding
cashierForm.addEventListener("submit", (e) => {
  e.preventDefault();
  registrationCash(cashInput, allCashData, user + "_allCashdata");
  mClose[3].click();
  cashierForm.reset("");
  // window.location.reload()
  showCashierFunc();
});

// Update Data Function
function updateBtn(element, array, keys) {
  let AllEditBtn = element.querySelectorAll(".ed-btn")

  AllEditBtn.forEach((btn, index) => {
    btn.onclick = () => {

      let tmp = keys.split("_")

      tmp == "allBdata" ? bregBtn.click() : inHBtn.click()

      let AllBtn = tmp == "allBdata" ?
        bookingForm.querySelectorAll("button") :
        inHouseForm.querySelectorAll("button");


      let AllInput = tmp == "allBdata" ?
        bookingForm.querySelectorAll("input") :
        inHouseForm.querySelectorAll("input");

      AllBtn[0].classList.add("d-none")
      AllBtn[1].classList.remove("d-none")

      let obj = array[index];
      AllInput[0].value = obj.fullname
      AllInput[1].value = obj.contact
      AllInput[2].value = obj.room
      AllInput[3].value = obj.checkin
      AllInput[4].value = obj.checkout

      AllBtn[1].onclick = () => {

        swal({
          title: "Are you sure?",
          text: "You want to Update your Booking!",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((willUpdate) => {
          if (willUpdate) {
            let formData = { checkinat: new Date().toLocaleString() };
            for (el of AllInput) {
              let key = el.name;
              let value = el.value;
              formData[key] = value;

            }
            array[index] = formData;
            AllBtn[1].classList.add("d-none")
            AllBtn[0].classList.remove("d-none")
            tmp == "allBdata" ? bookingForm.reset('') : inHouseForm.reset('')
            localStorage.setItem(keys, JSON.stringify(array));
            ShowData(element, array, keys);
            tmp == "allBdata" ? mClose[0].click() : mClose[1].click()
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

// refresh list ui
for (let btn of btnbtn) {
  btn.onclick = () => {
    ShowData(TInHList, allInHData, user + "_allInHdata");
    ShowData(TBodyList, allBData, user + "_allBdata");
    ShowData(TArchiveList, allArchiveData, user + "_allArchivedata");
  }
}

// Delete  Data Function
function DelData(element, array, keys) {
  let allBDelBtn = element.querySelectorAll(".del-btn");
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
          array.splice(index, 1);
          localStorage.setItem(keys, JSON.stringify(array));
          ShowData(element, array, keys);
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

//Search Func
function searchFunc() {
  let value = searchEl.value.toLowerCase();
  let tableEl = document.querySelector(".tab-content .search-pane.active");
  let tr = tableEl.querySelectorAll("tbody tr");
  for (let el of tr) {
    let fullname = el.querySelectorAll("td")[1].innerText;
    let contact = el.querySelectorAll("td")[2].innerText;
    let room = el.querySelectorAll("td")[3].innerText;
    if (fullname.toLowerCase().indexOf(value) != -1) {
      el.classList.remove('d-none');
    }
    else if (contact.indexOf(value) != -1) {
      el.classList.remove('d-none');
    }
    else if (room.indexOf(value) != -1) {
      el.classList.remove('d-none')
    }

    else {
      el.classList.add('d-none')
    }



  }
}

//Search Input
function searchElement() {
  searchEl.oninput = () => {
    searchFunc();
  }
}
searchElement()

//Show Cashier Function
function showCashierFunc() {
  let totalamount = 0;
  TCashierList.innerHTML = "";
  allCashData.forEach((item, index) => {
    totalamount += +item.amount
    TCashierList.innerHTML += `<tr>
      <td>${index + 1}</td>
      <td>${item.cashier}</td>
      <td>${item.id}</td>
      <td>${item.room}</td>
      <td>${item.checkinat}</td>
      <td>${item.amount}</td>
  </tr>`
  })
  cashTotal.innerHTML = `<i class=" fa-solid fa-indian-rupee-sign">${totalamount}</i>`;

}
showCashierFunc()

// default cashierName
let cashier = JSON.parse(sessionStorage.getItem("__au__"))
function defaultCashier() {
  cashInput[0].readOnly = "true";
  cashInput[0].placeholder = cashier.fullName
  cashInput[1].readOnly = "true";
  cashInput[1].placeholder = cashier.cashierid
}
defaultCashier()



function registrationCash(Input, array, key) {
  let data = { checkinat: new Date().toLocaleString() };
  data["cashier"] = cashier.fullName
  data["id"] = cashier.cashierid
  data["room"] = Input[2].value
  data["amount"] = Input[3].value

  array.unshift(data);
  localStorage.setItem(key, JSON.stringify(array));
  swal("Congratulations!!", "Booking Succesful...", "success");
}

closeCashier.onclick = () => {
  if (allCashData.length > 0) {
    let data = {
      cashierName: cashier.fullName,
      amount: cashTotal.innerText,
      createdAt: new Date().toLocaleString()
    }
    allCashArchData.push(data);

    allCashData = []
    localStorage.removeItem(user + "_allCashdata")
    localStorage.setItem(user + "_allCashArchdata", JSON.stringify(allCashArchData))
    showCashierFunc();

  }
  else {
    swal('Warning', "No Cashier data available", "warning")
  }
}

// Show Archive Cashier
function showArchCashierFunc() {
  let totalamount = 0;
  TArchCashierList.innerHTML = "";
  allCashArchData.forEach((item, index) => {
    totalamount += +item.amount
    TArchCashierList.innerHTML += `<tr>
      <td class="no-print" >${index + 1}</td>
      <td>${item.cashierName}</td>
      <td>${JSON.parse(sessionStorage.getItem("__au__")).cashierid}</td>
      <td class="text-nowrap">${item.createdAt}</td>
      <td>${item.amount}</td>
  </tr>`
  })
  ArchcashTotal.innerHTML = `<i class=" fa-solid fa-indian-rupee-sign">${totalamount}</i>`;
}
showArchCashierFunc()

// Print Data Button
function printButton() {
  for (let btn of printBtn) {
    btn.onclick = () => {
      window.print()
    }
  }
}
printButton();


//Print Archive Cash Button
function ArchPrintBtn() {
  ArchCashprintBtn.onclick = () => {
    CashPane.classList.add("d-none")
    window.print();
  }
}
ArchPrintBtn()

window.onclick = () => {
  CashPane.classList.remove("d-none")
}

//Checking Availability of Booked Rooms
let BroomNo = JSON.parse(localStorage.getItem(user + "_allBdata"))
let InHroomNo = JSON.parse(localStorage.getItem(user + "_allInHdata"))

function checkBookedRooms(element) {
 

  for (el of BroomNo) {
    if (InHroomNo != null){
      for(e of InHroomNo){
        if (el.room == element.value) {
          swal("Warning", `Room No.${el.room} is Booked for this Date:${el.checkin}`, 'warning').then(() => {
            element.value = "";
          })
        }
        else if (e.room == element.value) {
          swal("Warning", `Room No.${e.room} is Occupied for this Date:${e.checkin}`, 'warning').then(() => {
            element.value = "";
          })
        }
      }
  }
  else{
    if (el.room == element.value) {
      swal("Warning", `Room No.${el.room} is Booked for this Date:${el.checkin}`, 'warning').then(() => {
        element.value = "";
      })
    }
  }
      
    
  }
}
// for (e of InHroomNo) {
 
// }

allBInput[2].oninput = (e) => {
  checkBookedRooms(e.target)
}

//Checking Availability of InHouse Rooms
function checkInHouseRooms(element) {
  let BroomNo = JSON.parse(localStorage.getItem(user + "_allBdata"))
  let InHroomNo = JSON.parse(localStorage.getItem(user + "_allInHdata"))
 

  for (el of BroomNo) {
    if (InHroomNo != null){
      for(e of InHroomNo){
        if (el.room == element.value) {
          swal("Warning", `Room No.${el.room} is Booked for this Date:${el.checkin}`, 'warning').then(() => {
            element.value = "";
          })
        }
        else if (e.room == element.value) {
          swal("Warning", `Room No.${e.room} is Occupied for this Date:${e.checkin}`, 'warning').then(() => {
            element.value = "";
          })
        }
      }
  }
  else{
    if (el.room == element.value) {
      swal("Warning", `Room No.${el.room} is Booked for this Date:${el.checkin}`, 'warning').then(() => {
        element.value = "";
      })
    }
  }
      
    
  }
}
for (let index = 2; index < 4; index++) {
  allinHInput[index].oninput = (e) => {
    checkInHouseRooms(e.target);
  }

}

let currentDate = new Date().toLocaleDateString()
let [month,day,year] = currentDate.split("/")
let newDate = `${year}-${month > 9 ? month: 0+month}-${day}`

// CheckIn Date And CheckOut

allBInput[3].oninput=(e)=>{
     
        let element = e.target;
        if(element.value<newDate){
          swal("Warning","You Have Selected Wrong Check-Out Date","warning")
          element.value=""
        }
        else{allBInput[4].oninput=(el)=>{
            let date = el.target;
            if(element.value>=date.value){
                  swal("Warning","You Have Selected Wrong Check-Out Date","warning")
                  date.value=""
            }
            else{
              
            }
          }
        }

  }

 allinHInput[3].oninput=(e)=>{
     
    let element = e.target;
    if(element.value<newDate){
      swal("Warning","You Have Selected Wrong Check-Out Date","warning")
      element.value=""
    }
    else{allinHInput[4].oninput=(el)=>{
        let date = el.target;
        if(element.value>=date.value){
              swal("Warning","You Have Selected Wrong Check-Out Date","warning")
              date.value=""
        }
        else{
          
        }
    }
  }

}






    









ShowData(TInHList, allInHData, user + "_allInHdata");
ShowData(TBodyList, allBData, user + "_allBdata");
ShowData(TArchiveList, allArchiveData, user + "_allArchivedata");












