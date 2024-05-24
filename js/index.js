let allUserInfo =[];
let regForm = document.querySelector('.reg-form');
let allInput = regForm.querySelectorAll('input');
let regBtn = regForm.querySelector('button');
let loginForm = document.querySelector('.login-form')
let allUserInput = loginForm.querySelectorAll('input')
let loginBtn = loginForm.querySelector('button')

//Registration Code
if(localStorage.getItem("allUserInfo") != null){
    allUserInfo = JSON.parse(localStorage.getItem("allUserInfo"))
}
// console.log(allUserInfo);
// setTimeout(regBtn.addEventListener('click',()=>{
//     history.go()
// }),5000)
regForm.onsubmit = function(e) {
    e.preventDefault()
    let checkEmail = allUserInfo.find(function(data){
       return data.email == allInput[1].value
    })
     let checkNumber = allUserInfo.find(function(data){
        return data.contact == allInput[2].value
     })
     console.log(allInput[1].value)
    if( checkEmail==undefined && checkNumber==undefined ){
        
        let data={};
        for(let el of allInput){
          // console.log(el);
          let key = el.name;
          data[key] = el.value;
        }
        regBtn.innerText = "Processing..."
        setTimeout(() => {
               regBtn.innerText = "Registered"
               allUserInfo.push(data)
               localStorage.setItem("allUserInfo",JSON.stringify(allUserInfo))
               swal("We are Glad to See You Soon!!",'Registration Successful','success').then(()=>{
                location.reload()
               })
        }, 2000);
        
       

               
    }
    else{

        if(checkEmail != undefined){
        swal("Email Already Exists",'','warning')
        }
        else if(checkNumber != undefined){
                swal("Mobile Number Already Exists",'','warning')
                }
    }

}

// setTimeout(regBtn,3000)

//Login Code
 loginForm.onsubmit = (e)=>{
     e.preventDefault();
    if(allUserInput[0].value != '') {
        if(allUserInput[1].value !=''){
        //    checkEmail in your Database
        let checkEmail = allUserInfo.find((data)=>{
            return data.email == allUserInput[0].value
        })
        // console.log(checkEmail)
        if(checkEmail!=undefined){
             if(checkEmail.Password == allUserInput[1].value){
                loginBtn.innerText = "Please Wait..."
                setTimeout(()=>{
                    loginBtn.innerText = "Login"    
                    window.location = "Profile/profile.html"
                    checkEmail.Password = null;
                    sessionStorage.setItem("__au__",JSON.stringify(checkEmail));
                },2000)
             }
             else{
                swal("Warning","Password is Incorrect",'warning')
             }
        }
        else{
            swal("Warning","Email is not Registered",'warning')
        }
        }
        else{
            swal("Warning","Please Enter Password",'warning')
        }
    }
    else{
        swal("Warning","Please Enter Email Address",'warning')
    }
 }
                   
                    
                 