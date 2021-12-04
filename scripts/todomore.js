var currentUser

// get the doc ID from the local storage 
var doc_id = localStorage.getItem("Doc_ID")

function populateInfo(doc_id) {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {
            //go to the correct user document by referencing to the user uid
            currentTodo = db.collection("users").doc(user.uid).collection("todo").doc(doc_id)
            //get the document for current user
            currentTodo.get()
                .then(userTodo => {
                    //get the data fields of the user
                    var todoTitle = userTodo.data().To_Do;
                    var todoDate = userTodo.data().Due_Date;

                    console.log(todoTitle, todoDate)
                    //if the data fields are not empty, then write them in to the form
                    if (todoTitle != null) {
                        document.getElementById("titleInput").value = todoTitle;
                    }
                    if (todoDate != null) {
                        document.getElementById("myDate").value = todoDate;
                    }
                })
        } else {
            // No user is signed in.
            console.log("No user is signed in");
        }
    });
}

function editUserInfo() {
    //Enable the form fields
    document.getElementById('personalInfoFields').disabled = false;
}

function saveUserInfo() {
    //Save new info to database
    todoTitle = document.getElementById('titleInput').value; //get the value of the field with id="titleInput"
    todoDate = document.getElementById('myDate').value; //get the value of the field with id="myDate"
    currentTodo.update({
            To_Do: todoTitle,
            Due_Date: todoDate
        })
        .then(() => {
            console.log("Document successfully updated!");
        })

    // Disable the fields again
    document.getElementById('personalInfoFields').disabled = true;
    
    
    setTimeout(function () {
        window.location.href = "./todo.html"; // Redirect the current page to the todo page after user clicks on Save
    }, 500);
}

populateInfo(doc_id)