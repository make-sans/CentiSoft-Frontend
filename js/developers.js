(function ($) {
    let hostname = "http://localhost"
    let port = 57422
    let secretToken = "VerySecretToken1"

    $.ajax({
        method: "GET",
        url: hostname + ":" + port + "/api/developers",
        dataType: "json",
        headers: {
            "centisoft_token": secretToken,
        },
        "success": (data) => {
            buildDevelopersTable(data)
        },
        "error": (data) => {
            alert("Something went wrong, please contact developers")
            console.error(data)
        },
    })

    function buildDevelopersTable(data) {
        let container = $("#dev-container")

        let table = $("<table></table>").addClass("table")
        let tableHeaderRow = $("<thead><tr><th scope='col'>ID</th><th scope='col'>Name</th><th scope='col'>Email</th></tr></thead>")

        table.append(tableHeaderRow)

        let tableBody = $("<tbody></tbody>")
        data.forEach(dev => {
            let row = $("<tr></tr>")
            let id = $(`<th scope='row'>${dev.Id}</th>`)
            let name = $(`<td>${dev.Name}</td>`)
            let email = $(`<td>${dev.Email}</td>`)

            row.append(id).append(name).append(email)
            tableBody.append(row)
        });
        table.append(tableBody)
        container.append(table)
    }

})(jQuery)