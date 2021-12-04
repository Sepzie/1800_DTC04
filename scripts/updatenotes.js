var currentUser

// get the noteID from the local storage
var doc_id = localStorage.getItem("noteId")


function populateInfo(doc_id) {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            //go to the correct user document by referencing to the user uid
            course_name = localStorage.getItem("course") // get the course name from the local storage
            console.log(course_name, doc_id)
            let currentNote = db.collection("users").doc(user.uid).collection(course_name).doc(doc_id)
            //get the document for current user
            currentNote.get()
                .then(userNote => {
                    var noteTitle = userNote.data().Title;
                    var Note = userNote.data().Note;

                    console.log(noteTitle, Note)
                    //if the data fields are not empty, then write them in to the form
                    if (noteTitle != null) {
                        document.getElementById("titleInput").value = noteTitle;
                    }
                    if (Note != null) {
                        document.getElementById("noteInput").value = Note;
                    }
                })
        } else {
            console.log("No user is signed in");
        }
    });
}

function editUserNote() {
    //Enable the form fields
    document.getElementById('personalInfoFields').disabled = false;
}

function saveUserInfo() {
    //Save new info to database
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            var course_name = localStorage.getItem("course") // get the course name from the local storage
            var doc_id = localStorage.getItem("noteId") // get the noteID from the local storage
            let currentNote = db.collection("users").doc(user.uid).collection(course_name).doc(doc_id)
            noteTitle = document.getElementById('titleInput').value; //get the value of the field with id="titleInput"
            noteContent = document.getElementById('noteInput').value; //get the value of the field with id="noteInput"
            currentNote.update({
                    Note: noteContent,
                    Title: noteTitle
                })
                .then(() => {
                    console.log("Document successfully updated!");
                })
            // Disable the fields again
            document.getElementById('personalInfoFields').disabled = true;
            
            
            setTimeout(function () {
                window.location.href = "./viewnotes.html"; // Redirect the current page to the viewnotes page after user clicks on Save
            }, 500);
        } else {
            console.log('Not signed in!')
        }
    });
}

populateInfo(doc_id)