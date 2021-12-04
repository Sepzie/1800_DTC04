var currentUser;

function deleteNote(id) {
    // A function called when pressing the delete button to delete a note card.
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            let note_collection = localStorage.getItem("course")
            let doc_id = id.slice(1, )
            db.collection("users").doc(user.uid).collection(note_collection).doc(doc_id).delete();
            console.log("Deleted!")
        } else {}
    });
}

function deleteRefresh() {
    // A function that refreshes the page when a card is deleted so that the change is visible for the user.
    setTimeout(function () {
        window.location.href = "/htmls/viewnotes.html";
    }, 500);
}

function courseNotes() {
    // A function that retrieves the name of the course that the user has selected in the notes page from the local storage.
    let course = localStorage.getItem('course');
    console.log(course);

    displayNotes(course);

    document.getElementById('notes').innerHTML = course + ' Notes';
};

courseNotes();

function displayNotes(collection) {
    // A function that retrieves the note data for the class that the user has selected from the database 
    // and populates the card templates with it.
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            let CardTemplate = document.getElementById("CardTemplate");

            db.collection("users").doc(user.uid).collection(collection).get()
                .then(snap => {
                    var i = 1;
                    snap.forEach(doc => {
                        var title = doc.data().Title;
                        var details = doc.data().Note.slice(0, 30);
                        let newcard = CardTemplate.content.cloneNode(true);
                        console.log(doc.id)
                        newcard.querySelector('.card-title').innerHTML = title;

                        if (details.length >= 20) {
                            details = details.slice(0, 20) + "...";
                        }
                        newcard.querySelector('.card-text').innerHTML = details;

                        newcard.querySelector('.card-title').setAttribute("id", "ctitle" +
                            i);
                        newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);

                        newcard.querySelector('.edit').setAttribute("id", "e" + doc.id);
                        newcard.querySelector('.delete').setAttribute("id", "d" + doc.id);
                        document.getElementById("courseNotes-go-here").appendChild(
                            newcard);
                        i++;
                    })
                })
        } else {

        }
    });
}

function setEditNoteData(id) {
    // A function that redirects the user to updatenotes page when they click on the edit button of a note card.
    let Note_ID = id.slice(1, )
    localStorage.setItem("noteId", Note_ID)
}