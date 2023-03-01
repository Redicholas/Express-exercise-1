fetch("http://localhost:3000/users")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    document.querySelector("#userList").innerHTML = data
      .map((user) => {
        return `<li>${user.name}</li>`;
      })
      .join("");
  });
