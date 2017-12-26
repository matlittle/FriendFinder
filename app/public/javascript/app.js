
$("#submit-btn").click(function() {
    let answers = {
        name: $("#name-input").val().trim(),
        photo: $("#photo-input").val().trim(),
        scores: []
    }

    if(answers.name.length === 0) {
        return missingInfo("name");
    }

    if( !answers.photo.match(/\.(jpeg|jpg|gif|png)$/) ) {
        return missingInfo("photo");
    }

    const questionEls = $(".question-form");

    for(let i = 0; i < questionEls.length; i++) {
        let value = $('input:checked', $(questionEls[i]) ).val();
        if(value === undefined) return missingInfo("question");

        answers.scores.push( value );
    }

    $.post("api/survey", answers, (friend) => {
        showMatch(friend);
    });
});


function missingInfo(type) {
    $("#found-match").hide();

    switch(type) {
        case "name":
            $(".modal-body p").text(`Please enter a name.`);
            break;
        case "photo":
            $(".modal-body p").text(`Please enter a valid url for a photo.`);
            break;
        case "question":
            $(".modal-body p").text(`Please make sure to answer all questions.`);
            break;
        default:
            $(".modal-body p").text(`You shouldn't see this!!!`);
    }

    $("#missing-info").show();
    $(".modal").modal("show");
}

function showMatch(match) {
    $("#missing-info").hide();

    $(".modal-body img").attr("src", match.photo);
    $("#match-name").text(match.name);

    $("#found-match").show();
    $(".modal").modal("show");
}
