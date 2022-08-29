//Div containing profile information
const overview = document.querySelector(".overview");
//Unordered list of the repos
const repoList = document.querySelector(".repo-list");
//Targets the section containing the repos
const repoSection = document.querySelector(".repos");
//Targets the individual repo data
const indivRepoData = document.querySelector(".repo-data");
const username = "alymichwoo";

const getUserInfo = async function () {
    const userInfo = await fetch (`https://api.github.com/users/${username}`);
    const data = await userInfo.json();
    console.log(data);
    displayUserInfo(data);
};

getUserInfo();

//Displays the basic user information 
const displayUserInfo = function (data) {
    const userInfoDiv = document.createElement("div");
    userInfoDiv.classList.add("user-info");
    userInfoDiv.innerHTML =
    `<figure>
        <img alt="user avatar" src=${data.avatar_url} />
    </figure>
    <div>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Bio:</strong> ${data.bio}</p>
        <p><strong>Location:</strong> ${data.location}</p>
        <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    </div>`;
    overview.append(userInfoDiv);
    getRepos();
};

//Fetches and displays all of the public repos from GitHub
const getRepos = async function () {
    const repoInfo = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await repoInfo.json();
    displayRepoInfo(repoData);
};

const displayRepoInfo = function (repos) {
    for (const repo of repos) {
        const repoItem = document.createElement("li");
        repoItem.classList.add("repo");
        repoItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(repoItem);
    }
};


//Event listener for the individal repos
repoList.addEventListener("click", function(e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        getRepoInfo(repoName);
    }
});

//Retrieve and display specific repo info
const getRepoInfo = async function (repoName) {
    const specificRepoInfo = await fetch (`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await specificRepoInfo.json();
    console.log(repoInfo);
    const fetchLanguages = await fetch (`https://api.github.com/repos/${username}/${repoName}/languages`);
    const languageData = await fetchLanguages.json();
    console.log(languageData);
    const languages = [];
    for (let key in languageData) {
        languages.push(key);
        console.log(languages);
    }
    displaySpecificRepoInfo(repoInfo, languages);
};

const displaySpecificRepoInfo = function (repoInfo, languages) {
    indivRepoData.innerHTML = "";
    const repoInfoDiv = document.createElement("div");
    repoInfoDiv.innerHTML =
    `<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${languages.join(", ")}</p>
    <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    indivRepoData.append(repoInfoDiv);
    indivRepoData.classList.remove("hide");
    repoSection.classList.add("hide");
};