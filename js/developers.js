(function ($) {
    let hostname = "http://localhost"
    let port = 57422
    let secretToken = "VerySecretToken1"
    let tableCategories = ["ID", "Name", "Email"]

    $.ajax({
        method: "GET",
        url: hostname + ":" + port + "/api/developers",
        dataType: "json",
        headers: {
            "centisoft_token": secretToken,
        },
        "success": (data) => {
            parseDevelopers(data)
        },
        "error": (data) => {
            alert("Something went wrong, please contact developers")
            console.error(data)
        },
    })

    function parseDevelopers(data) {
        let container = $("#dev-container")

        let table = createDevTable(tableCategories)

        let tableBody = $("<tbody></tbody>")
        data.forEach(dev => {
            let row = $("<tr></tr>")

            let id = $(`<th scope='row'>${dev.Id}</th>`)
            let name = $(`<td>${dev.Name}</td>`)
            let email = $(`<td>${dev.Email}</td>`)

            tableBody.append(row.append(id).append(name).append(email))
        });
        table.append(tableBody)
        
        container.append(table)
    }

    function createDevTable(categories) {
        let table = $("<table></table>").addClass("table")
        let tableHeaderRow = $("<thead><tr></tr></thead>")

        categories.forEach(category => {
            let tableHeader = $("<th scope='col'></th>").text(category)
            tableHeaderRow.append(tableHeader)
        })

        return table
    }

})(jQuery)