window.onload = () => {
    document.getElementById("formButton").addEventListener('click', verifyForm);
}

function verifyForm(){
    let username = document.getElementById("Username");
    let password = document.getElementById("Password");

    if (username.value.trim() === "" || password.value.trim() === ""){
        invalidValue();
    }
    else {
        submitForm(username, password);
    }
}

function submitForm(username, password) {
        let userLogin = {username : username.value, password : password.value};
        let url = 'http://localhost:5000/users/authentication';

        console.log("I am before authData");

        authentication(url, userLogin).then(data=> {
            console.log("Inside authentication data" + data);
            
            responseFunction(data);
        });
}

function responseFunction(userData) {
    let failedLogin = document.getElementById("failedLogin");
    if (userData == undefined || userData == null) {

        if (failedLogin.style.display = "none") {
            failedLogin.style.display = "inline-block";
        }   
    }
    else {
        if (failedLogin.style.display = "inline-block") {
            failedLogin.style.display = "none";
        }

        sessionStorage.setItem("id", userData.id);
        sessionStorage.setItem("username", userData.username);
        sessionStorage.setItem("role", userData.role);
        console.log(sessionStorage);
        window.location.href = "home.html";
    }



    console.log("I am in responseFunctionnnnn");
    console.log(userData);
}

async function authentication(url, userData) {

    console.log("I am inside of authentication");
try {
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE
        //   mode: 'cors',
        //   cache: 'default',
        //   credentials: 'same-origin',
          headers: {
              'Content-Type' : 'application/json'
          },
        //   redirect: 'follow',
        //   referrerPolicy: 'no-referrer-when-downgrade',
        body: JSON.stringify(userData)        
    });

    return await response.json();
}catch(e) {
    console.dir("Anythinggggggggggggggggggggggggg " + e);
}




}

function invalidValue() {
    if (username.value.trim() === "") {
        
    }
    if (password.value.trim() === "") {

    }
}

function showPassword() {
    let x = document.getElementById("Password");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}



// loginForm.onsubmit = async(e) => {
//     e.preventDefault();

//     console.log(e);
// }

// function validateForm() {
//     let formData = document.forms["loginForm"];

//     console.log(formData);
// }