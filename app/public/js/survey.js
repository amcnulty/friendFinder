if (window.attachEvent) {window.attachEvent('onload', load);}
else if (window.addEventListener) {window.addEventListener('load', load, false);}
else {document.addEventListener('load', load, false);}
function load() {
    function formNotComplete() {
        alert("Please fill out all fields before submitting!")
    }
    
    function sendFormData() {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/api/friends", true);
        xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                console.log(xhr.response);
                currentIndex = 0;
                matches = JSON.parse(xhr.response);
                displayMatches(JSON.parse(xhr.response));
            }
            else if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 404) {
            }
            else if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 401) {
            }
        }
        xhr.send(JSON.stringify(formData));
    }

    function displayMatches(matches) {
        displayModal();
        populateModal(matches[currentIndex]);
    }

    function displayModal() {
        modalView.style.zIndex = '1';
        modalView.style.visibility = 'visible';
    }

    function hideModal() {
        modalView.style.zIndex = '-1';
        modalView.style.visibility = 'hidden';
    }

    function populateModal(match) {
        document.getElementById('slideName').innerHTML = match.name;
        document.getElementById('inlineName').innerHTML = match.name;
        document.getElementById('inlinePercent').innerHTML = match.matchPercent;
        document.getElementById('profileImg').src = match.photo;
    }

    function loadImgPreview() {
        preview.src = pictureInput.value.trim();
    }
    
    var modalView = document.getElementById('modalView');
    var modal = document.getElementById('modal');
    var modalExitBut = document.getElementById('modalExit');
    var leftBut = document.getElementById('leftButton');
    var rightBut = document.getElementById('rightButton');
    var nameInput = document.getElementById('name');
    var pictureInput = document.getElementById('picture');
    var preview = document.getElementById('preview');
    var submitButton = document.getElementById('surveySubmit');
    var dropDowns = document.getElementsByClassName('dropDown');
    var formData = {
        name: '',
        photo: '',
        scores: []
    }
    var matches;
    var currentIndex = 0;
    
    
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

    pictureInput.addEventListener('blur', function() {
        loadImgPreview();
    });

    leftBut.addEventListener('click', function() {
        currentIndex--;
        if (currentIndex < 0) currentIndex = 0;
        else populateModal(matches[currentIndex]);
    });

    rightBut.addEventListener('click', function() {
        currentIndex++;
        if (currentIndex >= matches.length) currentIndex = matches.length - 1;
        else populateModal(matches[currentIndex]);
    });

    modalExitBut.addEventListener('click', function() {
        hideModal();
    })
}