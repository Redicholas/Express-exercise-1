function init() {
  document.querySelector("#submitUserBtn").addEventListener("click", addUser);
  document.querySelector("#loginBtn").addEventListener("click", checkLogin);

  fetch("http://localhost:3000/users")
    .then((response) => response.json())
    .then((data) => {
      renderUsers(data);
    });
}

function renderUsers(users) {
  const userList = document.querySelector("#userList");
  userList.innerHTML = "";

  users.map((user) => {
    const li = document.createElement("li");
    li.innerHTML = `${user.id} : ${user.name}`;
    userList.appendChild(li);
  });
}

function checkLogin() {
  const forms = document.querySelector("#forms");
  const loginNameInput = document.querySelector("#loginNameInput");
  const loginPasswordInput = document.querySelector("#loginPasswordInput");

  let user = { name: loginNameInput.value, password: loginPasswordInput.value };

  fetch("http://localhost:3000/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === 200) {
        forms.innerHTML = `<h1>Welcome ${user.name}</h1>`;
      } else {
        alert("Login Failed");
      }
    });
}

function addUser() {
  const userNameInput = document.querySelector("#userNameInput");
  const userPasswordInput = document.querySelector("#userPasswordInput");

  let user = { name: userNameInput.value, password: userPasswordInput.value };
  console.log(user);
  userNameInput.value = "";
  userPasswordInput.value = "";

  fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .then(() => {
      fetch("http://localhost:3000/users")
        .then((res) => res.json())
        .then((data) => {
          renderUsers(data);
        });
    });
}

init();
