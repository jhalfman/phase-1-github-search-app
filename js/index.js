document.addEventListener("DOMContentLoaded", () => {
    
    const listElement = document.getElementById("user-list"); //ul for user names
    const githubForm = document.getElementById("github-form"); //grab submit form
    const reposList = document.getElementById("repos-list"); //grab repo list ul

    githubForm.addEventListener("submit", (e) => {
        e.preventDefault();
        listElement.innerHTML = ""; //clear current field
        searchValue = e.target.search.value; //grab value from search field
        
        fetch(`https://api.github.com/search/users?q=${searchValue}`) //fetch request using search field value
        .then(resp => resp.json())
        .then((users) => users.items.forEach(user => {
        const newUser = document.createElement("li"); //create new li for each user
        newUser.innerHTML = ` 
        <h2>${user.login}</h2>
        <img src="${user.avatar_url}">
        <p>profile link: ${user.html_url}</p>
        `
        newUser.querySelector("h2").addEventListener("click", (e) => {
            fetch(`https://api.github.com/users/${user.login}/repos`)
            .then(resp => resp.json())
            .then(data => {
                listElement.innerHTML = ""; //clear page and leave the clicked user
                listElement.appendChild(newUser);
                reposList.innerHTML = `<h1>REPO LIST</h1>`
                data.forEach(repo => {
                    const repoList = document.createElement("li");
                    repoList.innerHTML = `
                    <p>${repo.name}</p>
                    `
                    reposList.appendChild(repoList);
                })
            });
        }); //create event listener for clicking on user name
        
        listElement.appendChild(newUser); //appead user li to ul
        e.target.reset();
    }))
    })
    
})

