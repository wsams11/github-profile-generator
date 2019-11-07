const fs = require("fs");
const util = require("util");
const inquirer = require("inquirer");
const axios = require("axios");
const writeFileAsync = util.promisify(fs.writeFile);

function generatePDF (userInput) {
    return ``;
}

const questions = [
    {
        type: "input",
        message: "What is your name?",
        name: "firstName"
    },
    {
        type: "input",
        message: "What is your favorite color?",
        name: "color"
    },
    {
        type: "input",
        message: "What is your Github username",
        name: "username"
    },
];

function getUserName(username){
    const clientID = 'Iv1.58a221594db896a7';

    const clientSecret = "ec9d0d86435af2863130af950728312a20dd8d73";
    const queryURL = `https://api.github.com/users/${username}/repos?$clientId=${clientID}&client_secret=${clientSecret}`;
        
   
    return axios.get(queryURL).then((response)=> {
        console.log(response)

    })
}

function getTotalStars(username){
    const clientID = 'Iv1.58a221594db896a7';

    const clientSecret = "ec9d0d86435af2863130af950728312a20dd8d73";
    const queryURL = `https://api.github.com/users/${username}/repos?$clientId=${clientID}&client_secret=${clientSecret}`;
        
    let totalFollowers = 0;
    return axios.get(queryURL).then((response)=> {
        for (var i = 0; i < response.data.length; i++){
            totalFollowers = totalFollowers + response.data[i].stargazers_count;

        }
        console.log(totalFollowers);

    })
}
function getPublicRepositories(username){
    const clientID = 'Iv1.58a221594db896a7';

    const clientSecret = "ec9d0d86435af2863130af950728312a20dd8d73";
    const queryURL = `https://api.github.com/users/${username}/repos?$clientId=${clientID}&client_secret=${clientSecret}`;
        
   
    return axios.get(queryURL).then((response)=> {
        return response.data.reduce((acc, curr) => {
            acc += curr.stargazers_count;
            console.log(acc);
        })

    })
}
function getFollowers(username){
    const clientID = 'Iv1.58a221594db896a7';

    const clientSecret = "ec9d0d86435af2863130af950728312a20dd8d73";
    const queryURL = `https://api.github.com/users/${username}/repos?$clientId=${clientID}&client_secret=${clientSecret}`;
        
   let totalFollowers = 0;
    return axios.get(queryURL).then((response)=> {
        for (var i = 0; i < response.data.length; i++){
            totalFollowers = totalFollowers + response.data[i].stargazers_count;

        }
        console.log(totalFollowers);

    })
}
function getUsersFollowing(username){
    const clientID = 'Iv1.58a221594db896a7';

    const clientSecret = "ec9d0d86435af2863130af950728312a20dd8d73";
    const queryURL = `https://api.github.com/users/${username}/repos?$clientId=${clientID}&client_secret=${clientSecret}`;
        
   
    return axios.get(queryURL).then((response)=> {
        return response.data.reduce((acc, curr) => {
            acc += curr.stargazers_count;
            console.log(acc);
        })

    })
}







async function promptUser(){
    const userInput = await inquirer.prompt(questions);
    // await getUserName(userInput.username);
    await getTotalStars(userInput.username);
    // const pdf = await generatePDF(userInput);
    // await writeFileAsync("profile.pdf", pdf);

}
promptUser();
