const fs = require("fs");
const inquirer = require("inquirer");

// array of questions for user
const questions = () =>
    inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What is your project's title?"
        },
        {
            type: "input",
            name: "description",
            message: "Please write a short description of your project"
        },
        {
            type: "list",
            name: "license",
            message: "What kind of license should your project have?",
            choices: ["MIT", "Apache", "GPL", "WTFPL"]
        },
        {
            type: "input",
            name: "dependencies",
            message: "What command should be used to install required dependencies?",
            default: "npm i"
        },
        {
            type: "input",
            name: "test",
            message: "What command should be use to run any added tests?",
            default: "npm test"
        },
        
    ]).then((answers) => {

        switch (answers.license) {
            case "MIT":
                var mdlicense = "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
                break;
            case "Apache":
                var mdlicense = "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
                break;
            case "WTFPL":
                var mdlicense = "[![License: WTFPL](https://img.shields.io/badge/License-WTFPL-brightgreen.svg)](http://www.wtfpl.net/about/)";
                break;
            default:
                var mdlicense = "";
                break
        }
    
        const markdownString = `# ${answers.title}

        ![screenshot]()
        ${mdlicense}  


        ---
        
        ## Table of Contents
        - [About the Project](#About-the-Project)
        - [Getting Started](#Getting-Started)
        - [Installation](#Installation)
        - [Contributing](#Contributing)
        - [Testing](#Testing)
        - [License](#License) 
        
        ## About the Project
        ${answers.description}
        
        ## Getting Started  
        To get started, follow the Installation instructions.  
        
        ### Installation  
        Run the following command in your terminal  
            ${answers.dependencies}
        
        ## Testing
        Run the following command in your terminal  
            ${answers.test}
        
        ## Contributing
        ${answers.contribute}
        
        ## License
        This application is covered under the ${answers.license} license;
        `
        fs.writeFile("README.md", markdownString, err => {
                if (err) console.log(err)
        })
    })

    // function call to initialize program
    questions();