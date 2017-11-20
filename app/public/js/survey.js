if (window.attachEvent) {window.attachEvent('onload', load);}
else if (window.addEventListener) {window.addEventListener('load', load, false);}
else {document.addEventListener('load', load, false);}
function load() {
    function formNotComplete() {
        alert("Please fill out all fields before submitting!")
    }
    
    function sendFormData() {
        // console.log(formData);
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/api/friends", true);
        xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                console.log("Status OK");
            }
            else if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 404) {
            }
            else if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 401) {
            }
        }
        xhr.send(JSON.stringify(formData));
    }
    
    var nameInput = document.getElementById('name');
    var pictureInput = document.getElementById('picture');
    var submitButton = document.getElementById('surveySubmit');
    var dropDowns = document.getElementsByClassName('dropDown');
    var formData = {
        name: '',
        photo: '',
        scores: []
    }
    
    
    submitButton.addEventListener('click', function(e) {
        e.preventDefault();
        formData.scores = [];
        if (nameInput.value.trim() === '' || pictureInput.value.trim() === '') {
            formNotComplete();
            return;
        }
        else {
            formData.name = nameInput.value.trim();
            formData.photo = pictureInput.value.trim();
        }
        for (var i = 0; i < dropDowns.length; i++) {
            if (dropDowns[i].options[dropDowns[i].selectedIndex].value === 'Select Option') {
                formNotComplete();
                break;
            }
            else formData.scores.push(parseInt(dropDowns[i].options[dropDowns[i].selectedIndex].value));
        }
        sendFormData();
    }, false);
}