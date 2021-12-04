var currentUser

function populateInfo() {
    // This function is used to populate the users info in the form that is in the profile page.
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {

            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    //get the data fields of the user
                    var userName = userDoc.data().name;
                    var userSet = userDoc.data().set;

                    //if the data fields are not empty, then write them in to the form.
                    if (userName != null) {
                        document.getElementById("nameInput").value = userName;
                    }
                    if (userSet != null) {
                        document.getElementById("setInput").value = userSet;
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
    userName = document.getElementById('nameInput').value; //get the value of the field with id="nameInput"
    userSet = document.getElementById('setInput').value; //get the value of the field with id="setInput"
    currentUser.update({
            name: userName,
            set: userSet
        })
        .then(() => {
            console.log("Document successfully updated!");
        })
    document.getElementById('personalInfoFields').disabled = true;
}

//call the function to run it 
populateInfo();
