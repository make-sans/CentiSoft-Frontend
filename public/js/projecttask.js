const hostname = "http://localhost";
const port = "5000";

// get customer projects
$("#getProjectsForm").submit(function(e) {
  e.preventDefault(); // avoid to execute the actual submit of the form.

  // get the customer id input
  let customerId = $(this)
    .find("#customerIdInput")
    .val();
  if (customerId.length <= 0) {
    alert("Customer id is required!");
    return;
  }

  // display loading
  let submitButton = $(this).find(":submit");
  submitButton
    .prop("disabled", true)
    .html(
      `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> fetching data...`
    );

  let url =
    hostname + ":" + port + "/api/customers/" + customerId + "/projects";

  // actual request
  $.ajax({
    method: "GET",
    url: url,
    headers: { "content-type": "application/json" }
  })
    .done(function(msg) {
      // clear last results
      let projectTableBody = document
        .querySelector("#projectsTable")
        .getElementsByTagName("tbody")[0];
      projectTableBody.innerHTML = "";

      // if successful then loop through returned json
      if (!$.trim(msg)) {
        alert("nothing found");
      } else {
        $.each(msg, function(key, value) {
          // instantiate the template
          let projectTemplate = document.querySelector("#projectsListTemplate");
          let clone = document.importNode(projectTemplate.content, true);

          // assign content to template
          clone.querySelector(".project-id").innerHTML = value._id;
          clone.querySelector(".project-name").innerHTML = value.name;
          clone.querySelector(".project-duedate").innerHTML = value.dueDate;
          clone.querySelector(".project-customerid").innerHTML =
            value.customerId;
          clone.querySelector(".delete-this").value =
            value.customerId + "|" + value._id;

          // use the template
          projectTableBody.appendChild(clone);
        });
      }

      // stop loading animation
      submitButton.prop("disabled", false).html("Get customer's projects");
    })
    .fail(function(msg) {
      alert("sumfail: " + msg);
      // stop loading animation
      submitButton.prop("disabled", false).html("Get customer's projects");
    });
});

// add new project
$("#addNewProjectForm").submit(function(e) {
  e.preventDefault(); // avoid to execute the actual submit of the form.

  // get the customer id input
  let customerId = $(this)
    .find("#projectCustomerIdInput")
    .val();
  if (isNaN(customerId) || !customerId.length > 0) {
    alert("Given customer id is not a number or is invalid!");
    return;
  }

  // display loading
  let submitButton = $(this).find(":submit");
  submitButton
    .prop("disabled", true)
    .html(
      `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Adding new project...`
    );

  let url =
    hostname + ":" + port + "/api/customers/" + customerId + "/projects";
  console.log(url);
  console.log($(this).serialize());
  // actual request
  $.ajax({
    method: "POST",
    url: url,
    headers: { centisoft_token: "VerySecretToken1" },
    data: $(this).serialize()
  })
    .done(function() {
      // close modal when successful
      submitButton.prop("disabled", false).html("Add");
      $("#newProjectModal").modal("hide");
    })
    .fail(function(msg) {
      alert("sumfail: " + msg);
      // stop loading animation
      submitButton.prop("disabled", false).html("Add");
    });
});

// Delete project
$("#projectsTable").on("click", ".delete-this", function() {
  let deleteValue = $(this)
    .val()
    .split("|");
  let customerId = deleteValue[0];
  let deleteId = deleteValue[1];
  let url =
    hostname +
    ":" +
    port +
    "/api/customers/" +
    customerId +
    "/projects/" +
    deleteId;

  // display loading
  let deleteButton = $(this);
  deleteButton
    .prop("disabled", true)
    .html(
      `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Deleting...`
    );

  $.ajax({
    method: "DELETE",
    url: url,
    headers: { centisoft_token: "VerySecretToken1" }
  })
    .done(function() {
      // clear last results
      $("#projectsTable th.project-id")
        .filter(function() {
          // Matches exact string
          return $(this).text() === deleteId;
        })
        .parent()
        .remove();

      // stop loading animation
      deleteButton.prop("disabled", false).html("Delete");
    })
    .fail(function(msg) {
      alert("sumfail: " + JSON.stringify(msg, null, 4));
      // stop loading animation
      deleteButton.prop("disabled", false).html("Delete");
    });
});

// get list of tasks from the project with given id
$("#getTasksForm").submit(function(e) {
  e.preventDefault(); // avoid to execute the actual submit of the form.

  // get the project id input
  let projectId = $(this)
    .find("#projectIdInput")
    .val();
  if (projectId.length <= 0) {
    alert("Given projeasd");

    return;
  }

  // display loading
  let submitButton = $(this).find(":submit");
  submitButton
    .prop("disabled", true)
    .html(
      `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> fetching data...`
    );

  let url = hostname + ":" + port + "/api/projects/" + projectId + "/tasks";
  console.log(projectId);
  // actual request
  $.ajax({
    method: "GET",
    url: url,
    headers: { centisoft_token: "VerySecretToken1" }
  })
    .done(function(msg) {
      // clear last results
      let taskTableBody = document
        .querySelector("#tasksTable")
        .getElementsByTagName("tbody")[0];
      taskTableBody.innerHTML = "";

      // if successful then loop through returned json
      if (!$.trim(msg)) {
        alert("nothing found");
      } else {
        $.each(msg, function(key, value) {
          // instantiate the template
          let taskTemplate = document.querySelector("#tasksListTemplate");
          let clone = document.importNode(taskTemplate.content, true);

          // assign content to template
          clone.querySelector(".task-id").innerHTML = value.Id;
          clone.querySelector(".task-name").innerHTML = value.Name;
          clone.querySelector(".task-description").innerHTML =
            value.Description;
          clone.querySelector(".task-created").innerHTML = value.Created;
          clone.querySelector(".task-duration").innerHTML = value.Duration;
          clone.querySelector(".task-projectid").innerHTML = value.ProjectId;
          clone.querySelector(".task-developerid").innerHTML =
            value.DeveloperId;
          clone.querySelector(".delete-this").value =
            value.ProjectId + "|" + value.Id;

          // use the template
          taskTableBody.appendChild(clone);
        });
      }

      // stop loading animation
      submitButton.prop("disabled", false).html("Get project's tasks");
    })
    .fail(function(msg) {
      alert("sumfail: " + msg);
      // stop loading animation
      submitButton.prop("disabled", false).html("Get project's tasks");
    });
});

// add new task
$("#addNewTaskForm").submit(function(e) {
  e.preventDefault(); // avoid to execute the actual submit of the form.

  // get the customer id input
  let projectId = $(this)
    .find("#taskProjectIdInput")
    .val();
  if (isNaN(projectId) || !projectId.length > 0) {
    alert("Given project id is not a number or is invalid!");
    return;
  }

  // display loading
  let submitButton = $(this).find(":submit");
  submitButton
    .prop("disabled", true)
    .html(
      `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Adding new task...`
    );

  let url = hostname + ":" + port + "/api/projects/" + projectId + "/tasks";
  console.log(url);
  console.log($(this).serialize());
  // actual request
  $.ajax({
    method: "POST",
    url: url,
    headers: { centisoft_token: "VerySecretToken1" },
    data:
      $(this).serialize() +
      "&Created=" +
      new Date()
        .toISOString()
        .slice(0, 19)
        .replace("T", " ")
  })
    .done(function() {
      // close modal when successful
      submitButton.prop("disabled", false).html("Add");
      $("#newTaskModal").modal("hide");
    })
    .fail(function(msg) {
      alert("sumfail: " + JSON.stringify(msg, null, 4));
      // stop loading animation
      submitButton.prop("disabled", false).html("Add");
    });
});

// Delete task
$("#tasksTable").on("click", ".delete-this", function() {
  let deleteValue = $(this)
    .val()
    .split("|");
  let projectId = deleteValue[0];
  let deleteId = deleteValue[1];
  let url = hostname + ":" + port + "/api/projects/" + projectId + "/tasks";

  // display loading
  let deleteButton = $(this);
  deleteButton
    .prop("disabled", true)
    .html(
      `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Deleting...`
    );

  $.ajax({
    method: "DELETE",
    url: url,
    headers: { centisoft_token: "VerySecretToken1" }
  })
    .done(function() {
      // clear last results
      $("#tasksTable th.task-id")
        .filter(function() {
          // Matches exact string
          return $(this).text() === deleteId;
        })
        .parent()
        .remove();

      // stop loading animation
      deleteButton.prop("disabled", false).html("Delete");
    })
    .fail(function(msg) {
      alert("sumfail: " + JSON.stringify(msg, null, 4));
      // stop loading animation
      deleteButton.prop("disabled", false).html("Delete");
    });
});
