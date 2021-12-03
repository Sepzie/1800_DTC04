var currentUser;

function deleteNote(id) {
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
    setTimeout(function () {
        window.location.href = "/htmls/viewnotes.html";
    }, 500);
}

function courseNotes() {
    let course = localStorage.getItem('course');
    console.log(course);

    displayNotes(course);

    document.getElementById('notes').innerHTML = course + ' Notes';
};

courseNotes();

function displayNotes(collection) {
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
    let Note_ID = id.slice(1, )
    localStorage.setItem("noteId", Note_ID)
}

function insertName() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(user.uid);
            currentUser = db.collection("users").doc(user.uid);
            currentUser.get().then(userDoc => {
                var user_Name = userDoc.data().name;
                console.log(user_Name);
                $("#name-goes-here").text(user_Name);
            })
        } else {}
    });
}
insertName();