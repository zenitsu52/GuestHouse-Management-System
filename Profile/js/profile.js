//check user is logged in or not
let userInfo;
let user;
let allBData = [];
let allInHData = [];
let allArchiveData = [];

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
allInHData = fetchData(user + "_allInHdata");
allArchiveData = fetchData(user + "_allArchivedata");



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
        <td>${index + 1}</td>
        <td>${item.fullname}</td>
        <td>${item.contact}</td>
        <td>${item.room}</td>
        <td>${item.checkin}</td>
        <td>${item.checkout}</td>
        <td>${item.checkinat}</td>
        <td>
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
            // console.log(formData)
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
  for(let el of tr){
    let fullname = el.querySelectorAll("td")[1].innerText;
    let contact = el.querySelectorAll("td")[2].innerText;
    let room = el.querySelectorAll("td")[3].innerText;
    if(fullname.toLowerCase().indexOf(value) != -1)
    {
        el.classList.remove('d-none');
    } 
    else if(contact.indexOf(value) != -1)
    {
        el.classList.remove('d-none');
    } 
    else if(room.indexOf(value) != -1)
    {
        el.classList.remove('d-none')
    }
        
    else
    {
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


ShowData(TInHList, allInHData, user + "_allInHdata");
ShowData(TBodyList, allBData, user + "_allBdata");
ShowData(TArchiveList, allArchiveData, user + "_allArchivedata");












