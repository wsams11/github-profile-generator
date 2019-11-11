const fs = require("fs");
const util = require("util");
const inquirer = require("inquirer");
const axios = require("axios");
const writeFileAsync = util.promisify(fs.writeFile);

const questions = [
   
  {
    type: "input",
    message: "What is your name?",
    name: "name"
  },
  {
    type: "input",
    message: "What is your GitHub username?",
    name: "username"
  },
  {
    type: "input",
    message: "What is your favorite color?",
    name: "colors"
  }
];
const colors = {
  green: {
    wrapperBackground: "#E6E1C3",
    headerBackground: "#C1C72C",
    headerColor: "black",
    photoBorderColor: "#black"
  },
  blue: {
    wrapperBackground: "#5F64D3",
    headerBackground: "#26175A",
    headerColor: "white",
    photoBorderColor: "#73448C"
  },
  pink: {
    wrapperBackground: "#879CDF",
    headerBackground: "#FF8374",
    headerColor: "white",
    photoBorderColor: "#FEE24C"
  },
  red: {
    wrapperBackground: "#DE9967",
    headerBackground: "#870603",
    headerColor: "white",
    photoBorderColor: "white"
  }
};
function generateHTML(userInput, res, getStars) {
 
  return ` <!DOCTYPE html>
  <html lang="en">
     <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
        <link href="https://fonts.googleapis.com/css?family=BioRhyme|Cabin&display=swap" rel="stylesheet">
        <title>Document</title>
        <style>
            @page {
              margin: 0;
            }
           *,
           *::after,
           *::before {
           box-sizing: border-box;
           }
           html, body {
           padding: 0;
           margin: 0;
           }
           html, body, .wrapper {
           height: 100%;
           }
           .wrapper {
           background-color: #DE9967;
           padding-top: 100px;
           }
           body {
           background-color: white;
           -webkit-print-color-adjust: exact !important;
           font-family: 'Cabin', sans-serif;
           }
           main {
           background-color: #E9EDEE;
           height: auto;
           padding-top: 30px;
           }
           h1, h2, h3, h4, h5, h6 {
           font-family: 'BioRhyme', serif;
           margin: 0;
           }
           h1 {
           font-size: 3em;
           }
           h2 {
           font-size: 2.5em;
           }
           h3 {
           font-size: 2em;
           }
           h4 {
           font-size: 1.5em;
           }
           h5 {
           font-size: 1.3em;
           }
           h6 {
           font-size: 1.2em;
           }
           .photo-header {
           position: relative;
           margin: 0 auto;
           margin-bottom: -50px;
           display: flex;
           justify-content: center;
           flex-wrap: wrap;
           background-color: #870603;
           color: white;
           padding: 10px;
           width: 95%;
           border-radius: 6px;
           }
           .photo-header img {
           width: 250px;
           height: 250px;
           border-radius: 50%;
           object-fit: cover;
           margin-top: -75px;
           border: 6px solid white;
           box-shadow: rgba(0, 0, 0, 0.3) 4px 1px 20px 4px;
           }
           .photo-header h1, .photo-header h2 {
           width: 100%;
           text-align: center;
           }
           .photo-header h1 {
           margin-top: 10px;
           }
           .links-nav {
           width: 100%;
           text-align: center;
           padding: 20px 0;
           font-size: 1.1em;
           }
           .nav-link {
           display: inline-block;
           margin: 5px 10px;
           }
           .workExp-date {
           font-style: italic;
           font-size: .7em;
           text-align: right;
           margin-top: 10px;
           }
           .container {
           padding: 50px;
           padding-left: 100px;
           padding-right: 100px;
           }
  ​
           .row {
             display: flex;
             flex-wrap: wrap;
             justify-content: space-between;
             margin-top: 20px;
             margin-bottom: 20px;
           }
  ​
           .card {
             padding: 20px;
             border-radius: 6px;
             background-color: #870603;
             color: white;
             margin: 20px;
           }
           
           .col {
           flex: 1;
           text-align: center;
           }
  ​
           a, a:hover {
           text-decoration: none;
           color: inherit;
           font-weight: bold;
           }
  ​
           @media print { 
            body { 
              zoom: .75; 
            } 
           }
        </style>
        }
       </head>
       <body>
          <div class="wrapper">
             <div class="photo-header">
                <img src=${res.data.avatar_url} alt="Photo of ${res.data.name}" />
                <h1>Hi!</h1>
                <h2>
                My name is ${res.data.name}!</h1>
                <h5></h5>
                <nav class="links-nav">
                   <a class="nav-link" target="_blank" rel="noopener noreferrer" href="https://www.google.com/maps/place/${res.data.location}"><i class="fas fa-location-arrow"></i> ${res.data.location}</a>
                   <a class="nav-link" target="_blank" rel="noopener noreferrer" href="${res.data.html_url}"><i class="fab fa-github-alt"></i> GitHub</a>        
                </nav>
             </div>
             <main>
                <div class="container">
                <div class="row">
                   <div class="col">
                      <h3>${res.data.bio} </h3>
                   </div>
                   </div>
                   <div class="row">
                   <div class="col">
                      <div class="card">
                        <h3>Public Repositories</h3>
                        <h4>${res.data.public_repos}</h4>
                      </div>
                   </div>
                    <div class="col">
                    <div class="card">
                      <h3>Followers</h3>
                      <h4>${res.data.followers}</h4>
                    </div>
                   </div>
                   </div>
                   <div class="row">
                   <div class="col">
                   <div class="card">
                      <h3>GitHub Stars</h3>
                      <h4>${getStars}</h4>
                      </div>
                   </div>
                    <div class="col">
                    <div class="card">
                      <h3>Following</h3>
                      <h4>${res.data.following}</h4>
                      </div>
                   </div>
                   </div>
                </div>
             </main>
          </div>
       </body>
    </html>`;
}

function getStars(userInput){
  const queryUrl = `https://api.github.com/users/${userInput.username}/repos?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`;
  axios.get(queryUrl).then(function(res) {
   
   let totalStars = 0;
   for (var i = 0; i < res.data.length; i ++){
     totalStars = totalStars + res.data[i].stargazers_count;
   }
   return totalStars;
 
  });
}

async function promptUser() {
  const userInput = await inquirer.prompt(questions);
  console.log(userInput.data);
  getStars(userInput);
  
  const CLIENT_ID = "Iv1.58a221594db896a7";


  const CLIENT_SECRET = "ec9d0d86435af2863130af950728312a20dd8d73";
  const queryUrl = `https://api.github.com/users/${userInput.username}?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}`;
  axios.get(queryUrl).then(function(res) {
  
    // let stars = 0;
    // const starCounter = (stars, curr) => stars + curr;
    // let totalStars = res.data.stargazers_count.reduce(starCounter);
    // console.log(totalStars);
  
    
    const html = generateHTML(userInput, res, getStars(userInput));
    writeFileAsync("index.html", html);
  });
}
promptUser();
// https://api.github.com/users/wsams11?client_id=Iv1.58a221594db896a7&client_secret=ec9d0d86435af2863130af950728312a20dd8d73