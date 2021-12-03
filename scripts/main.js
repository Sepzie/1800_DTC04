function insertName() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {
            // Do something for the current logged-in user here: 
            console.log(user.uid);
            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    var user_Name = userDoc.data().name;
                    //console.log(user_Name);
                    //document.getElementById("username").innerText = n;                     //using javascript
                    $("#name-goes-here1").text(user_Name); //using jquery
                    $("#name-goes-here2").text(user_Name);
                })
        } else {
            // No user is signed in.
            console.log("no user signed in")
        }
    });
}

function insertSet() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if user is signed in:
        if (user) {
            // Do something for the current logged-in user here: 
            console.log(user.uid);
            //go to the correct user document by referencing to the user uid
            currentUser = db.collection("users").doc(user.uid)
            //get the document for current user.
            currentUser.get()
                .then(userDoc => {
                    var user_Set = userDoc.data().set;
                    //console.log(user_Name);
                    //document.getElementById("username").innerText = n;                     //using javascript
                    $("#set-goes-here").text(user_Set);
                })
        } else {
            // No user is signed in.
            console.log("no user signed in")
        }
    });
}
const today = new Date();
var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();


document.getElementById("date-goes-here").innerHTML = date;
insertName();
insertSet();