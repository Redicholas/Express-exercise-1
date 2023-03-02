const userNameInput = document.querySelector("#userNameInput");
const addUserBtn = document.querySelector("#submitUserBtn");
const userList = document.querySelector("#userList");

fetch("http://localhost:3000/users")
  .then((response) => response.json())
  .then((data) => {
    renderUsers(data);
  });

function renderUsers(users) {
  userList.innerHTML = "";

  users.map((user) => {
    let li = document.createElement("li");
    li.id = user.id;
    li.innerText = user.name;
    userList.appendChild(li);
  });
  //   userList.innerHTML = "";

  //   for (let i = 0; i < users.length; i++) {
  //     const li = document.createElement("li");
  //     li.innerHTML = `${users[i].id} : ${users[i].name}`;
  //     userList.appendChild(li);

  //   users.map((user) => {
  //     const li = document.createElement("li");
  //     li.innerHTML = `${user.id} : ${user.name}`;
  //     userList.appendChild(li);
  //   });

  //   userList.innerHTML = users
  //     .map((user) => {
  //       console.log(user);
  //       return `<li>${user.id} : ${user.name}</li>`;
  //     })
  //     .join("");
}

addUserBtn.addEventListener("click", () => {
  let user = { name: userNameInput.value };

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
});

// addUserBtn.addEventListener("click", () => {
//   // SKAPA EN NY ANVÄNDARE
//   let user = { name: userNameInput.value };
//   console.log(user);

//   // SKICKA TILL SERVERN
//   fetch("http://localhost:3000/users", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(user),
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       renderUsers(data);
//     });
// });

// addUserBtn.addEventListener("click", () => {
//   let user = { name: userNameInput.value };
//   console.log("step 1: " + user);
//   fetch("http://localhost:3000/users", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(user),
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       renderUsers(data);
//       console.log("step 2: " + data);
//     });
// });
