const inquirer = require("inquirer");
const fs = require("fs");

var licenseBadge;
var licenseText;

// Framework for the README document
const generateREADME = answers =>
`# ${answers.title}
${licenseBadge}

## Description
${answers.description}

## Table of Contents
* [Installation](#installation)  
* [Usage](#usage)  
* [Contributing](#contributing)  
* [Tests](#tests)  
* [Questions](#questions)  
* [License](#license)  

## Installation
${answers.installation}

## Usage
${answers.usage}

## Contributing
${answers.contributing}

## Tests
${answers.tests}

## Questions
My GitHub username is ${answers.username}, and you can view my profile [here](https://github.com/${answers.username}/).

If you have any questions and would like to contact me, please email me at ${answers.email}.

## License
${licenseText}
`;

inquirer
    // Start README generation by invoking node index.js, and answer the prompts
    .prompt([
        {
            type: "input",
            name: "title",
            message: "What is your project title?",
        },
        {
            type: "input",
            name: "description",
            message: "Please enter a description for your project.",
        },
        {
            type: "input",
            name: "installation",
            message: "Please enter installation directions for your project.",
        },
        {
            type: "input",
            name: "usage",
            message: "Please enter usage information for your project.",
        },
        {
            type: "list",
            name: "license",
            message: "Please select a license for your project.",
            choices: ["MIT License", "Boost Software License 1.0", "The Unlicense"],
        },
        // Only the MIT license requires a year/copyright holder name
        {
            type: "input",
            name: "year",
            message: "What year is it?",
            when: function (answers) {
                return answers.license === "MIT License";
              },
        },
        {
            type: "input",
            name: "fullname",
            message: "What is your full name?",
            when: function (answers) {
                return answers.license === "MIT License";
              },
        },
        {
            type: "input",
            name: "contributing",
            message: "Please enter contribution guidelines for your project.",
        },
        {
            type: "input",
            name: "tests",
            message: "Please enter test instructions for your project.",
        },
        {
            type: "input",
            name: "username",
            message: "What is your GitHub username?",
        },
        {
            type: "input",
            name: "email",
            message: "What is your email address?",
        },
    ])
    .then((answers) => {
        // Populates license badge/text content depending on choice
        switch(answers.license) {
        case "MIT License":
            licenseBadge = "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
            licenseText = `MIT License

Copyright (c) ${answers.year} ${answers.fullname}

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`;
            break;
        case "Boost Software License 1.0":
            licenseBadge = "[![License](https://img.shields.io/badge/License-Boost%201.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)";
            licenseText = `Boost Software License - Version 1.0 - August 17th, 2003

Permission is hereby granted, free of charge, to any person or organization
obtaining a copy of the software and accompanying documentation covered by
this license (the "Software") to use, reproduce, display, distribute,
execute, and transmit the Software, and to prepare derivative works of the
Software, and to permit third-parties to whom the Software is furnished to
do so, all subject to the following:

The copyright notices in the Software and this entire statement, including
the above license grant, this restriction and the following disclaimer,
must be included in all copies of the Software, in whole or in part, and
all derivative works of the Software, unless such copies or derivative
works are solely in the form of machine-executable object code generated by
a source language processor.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT. IN NO EVENT
SHALL THE COPYRIGHT HOLDERS OR ANYONE DISTRIBUTING THE SOFTWARE BE LIABLE
FOR ANY DAMAGES OR OTHER LIABILITY, WHETHER IN CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.`;
            break;
        case "The Unlicense":
            licenseBadge = "[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)";
            licenseText = `This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <https://unlicense.org>`;
            break;
        }

        // Fills in README form
        const readmeContent = generateREADME(answers);

        // Writes README file
        fs.writeFile(`${answers.title}-README.md`, readmeContent, (err) =>
            err ? console.log(err) : console.log(`Successfully created ${answers.title}-README.md!`)
        );
    });