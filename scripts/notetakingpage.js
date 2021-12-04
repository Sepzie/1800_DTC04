var currentUser
// Retrieve the name of the course from local storage.
let courseName = localStorage.getItem("course")
console.log(courseName)
document.getElementById('note-title').innerHTML = courseName;

async function saveUserNote() {
    // A function that is called when the user clicks the save button on the notetakingpage page.
    // This function creates a new document for that note in the database under the collection for the course and 
    // saves the title and and text of the note inside it.
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            note = document.getElementById('exampleFormControlTextarea1')
                .value;
            title = document.getElementById('title').value;

            let course = localStorage.getItem("course")

            document.getElementById('note-title').innerHTML = course;

            currentUser = db.collection("users").doc(user.uid).collection(course);

            currentUser.add({
                Title: title,
                Note: note
            });
            console.log(note + ' with title of ' + title + ' was added to ' + course + '!');
            setTimeout(function () {
                window.location.href = "./viewnotes.html";
            }, 500);
        } else {

        }
    });
}

function redirect() {
    // redirects the user back to viewnotes.html after their note is saved.
    window.location.assign("viewnotes.html");
}

