// This script takes in an array of objects representing each team member, and spits out html that should go in about.html
// run script like so:
// node [this file's name/path, without the brackets] > [output file name, without the brackets]
// make sure you've npm installed the needed libraries (fs and csv-parse/lib/sync)
// basically this now takes in the csv downloaded from a google form responses and converts it into copy/pasteable html
// make sure to add the headshot to the headshots folder, and don't use the direct link to the drive image
// rename all images to the <Google Form person name>.jpg format (change the ending to a jpg regardless of image type)

const inputFilePath = `${__dirname}/Chemical Heatmap About Page Submissions.csv`; // use the correct path here relative to your terminal location
function renameProperties(json) {
    // rename the properties to match what the html template uses, the original property names are from the google form questions
    return json.map(person => (
        {
            name: person["Name "],
            gradYearOrClassStanding: person['Graduating Year and/or Standing (ex. Class of 2023 or Soph.)'],
            majorAndMinor: person['Major and/or Minors (if applicable)'],
            //image: person["Headshot "], // place the image into headshots folder with name <person.name>.png
            workedOn: person['Short Description of what you worked on in the project '],
            interests: person["Short description of what you're involved in/interested in (ex. Neural Networks, Machines learning, sustainability practices, renewable energy, etc.) "],
        }
    ));
}

const contributorsWhoDidntFillOutGoogleForm = ["Jiyang Zhou", "Lily Zhai", "Adam Mentzer", "Madeline Richards", "Dhanuj Gandikota", "Karl Goddard", "Daniel Schenider", "Keerthi Sajja", "Michael Yufa-Zimilevich"];

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%


const fs = require('fs');
const parse = require('csv-parse/lib/sync');
const { dirname } = require('path');

main();

function generateHTML(peopleJSON) {
    // boilerplate stuff at the top
    let template = `
        <!DOCTYPE html>
            <html lang="en">
            <head>
                <title>About Us</title>
                <link rel="stylesheet" type="text/css" href="chem_test_style.css">
                <meta name="viewport" content="width=device-width,initial-scale=1.0"> <!-- This fixes the bug that made the cards not wrap into a single column on small screens -->
            </head>
            <body>
            <!--Add nav_bar or just back button?-->

            <header class="nav">
                <!--
                <a class="logo"> CHEMICAL HEAT MAP </a>
                -->

                <a id="button" href="../index.html">[HEATMAP]</a>
                <a href="https://umecodata.github.io/website/" id="button">[ECODATA]</a>                
            </header>


            <div class="about_hdr">
                <h1>About Us</h1>
                <p>We built an interactive heatmap to let you easily view chemical contaminants near you!</p>

        <!---This page should be responsive--->
            </div>
    `;

    template += `<div class="row">`

    // generate card for each person who filled out google form
    for (const person of peopleJSON) {
        template += `
            <div class="column">
                <div class="card">
                    <img alt="${person.name}" style="width: 100%" src="headshots/${person.name}.jpg"> <!-- rename .png images to have a .jpg extension -->
                    <div class="container_about">
                        <h2>${person.name}</h2>
                        <p class="title">${person.gradYearOrClassStanding}<br>${person.majorAndMinor}</p>
                        <u>What I worked on:</u>
                            <p>${person.workedOn}</p>
                        <u>What I'm interested in:</u>
                            <p>${person.interests}</p>
                    </div>
                </div>
            </div>
            `;
    }

    // generate basic list for people who didn't fill out google form
    template += `
        <div class="column">
            <div class="card">
                <div class="container_about">

                    <br><!-- for extra vertical space since theres no image padding -->

                    <h2>Other Contributors:</h2>
                    <ul>
                        ${
                        contributorsWhoDidntFillOutGoogleForm
                            .map(name => `<li>${name}</li>`)
                            .join(`\n`)
                        }
                    </ul>
                </div>
            </div>
        </div>`;


    template += `
        </div> <!-- ends the div[class="row"] -->
      </body>
    </html>
    `;

    return template;
}

function main() {
    let fileContent = fs.readFileSync(inputFilePath, "utf-8");
    
    fileContent = parse(fileContent, { columns: true });
    
    fileContent = renameProperties(fileContent);

    const html = generateHTML(fileContent);
    
    console.log(html);
}
