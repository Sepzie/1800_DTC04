var currentUser
var doc_id = localStorage.getItem("noteId")

function populateInfo(doc_id) {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {

            course_name = localStorage.getItem("course")
            console.log(course_name, doc_id)
            let currentNote = db.collection("users").doc(user.uid).collection(course_name).doc(doc_id)
            currentNote.get()
                .then(userNote => {
                    var noteTitle = userNote.data().Title;
                    var Note = userNote.data().Note;

                    console.log(noteTitle, Note)
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
    document.getElementById('personalInfoFields').disabled = false;
}

function saveUserInfo() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            course_name = localStorage.getItem("course")
            var doc_id = localStorage.getItem("noteId")
            let currentNote = db.collection("users").doc(user.uid).collection(course_name).doc(doc_id)
            noteTitle = document.getElementById('titleInput')
                .value;
            noteContent = document.getElementById('noteInput')
                .value;
            currentNote.update({
                    Note: noteContent,
                    Title: noteTitle
                })
                .then(() => {
                    console.log("Document successfully updated!");
                })
            document.getElementById('personalInfoFields').disabled = true;
            setTimeout(function () {
                window.location.href = "./viewnotes.html";
            }, 500);
        } else {
            console.log('Not signed in!')
        }
    });
}

populateInfo(doc_id)