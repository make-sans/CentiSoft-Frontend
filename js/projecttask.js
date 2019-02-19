
// get list of tasks from the project with given id
$("#getTasksForm").submit(function (e) {

    e.preventDefault(); // avoid to execute the actual submit of the form.

    // get the project id input
    let projectId = $(this).find("#projectIdInput").val();
    if (isNaN(projectId) || !projectId.length > 0) {
        alert("Given project id is not a number!");
        
        return;
    }
    let url = "http://localhost:57422/api/projects/" + projectId + "/tasks";


    $.ajax({
        method: "GET",
        url: url,
        headers: { "centisoft_token": "VerySecretToken1" }
    })
        .done(function (msg) {
            //alert("Data Saved: " + JSON.stringify(msg, null, 4));

            $.each(msg, function (key, value) {
                $(".table-tasks").find("tbody").append(
                    "<tr>" +
                    "<th scope='row'>" + value.Id + "</th>" +
                    "<td>" + value.Name + "</td>" +
                    "<td>" + value.Description + "</td>" +
                    "<td>" + value.Created + "</td>" +
                    "<td>" + value.Duration + "</td>" +
                    "<td>" + value.ProjectId + "</td>" +
                    "<td>" + value.DeveloperId + "</td>" +
                    "</tr>"
            );
            });

        })
        .fail(function (msg) {
            alert("sumfail: " + msg);
        })

    // display loading

});