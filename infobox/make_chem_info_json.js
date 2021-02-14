// How to use:
// 1. Make sure the Chem_Info is in the infobox folder, or else change the code to get the right path to it
// 2: run this script on the folder of csv's (this file should be on the same level as the folder of csv's, not in the folder itself) 
//    Make sure to direct the output into the file that you want (node merge_...._object.js > infobox/output.json)
// 2.5: make sure you npm installed the libraries needed (fs)
// 3: enjoy!
// folder with the csv's - change this if the folder name changes
const folder_name = `${__dirname}/Chem_Info`;

const fs = require('fs');

main()

function main() {
    let chem_info_json = make_chem_info();
    chem_info_json = JSON.stringify(chem_info_json);

    // use output redirection in the terminal to dump this into the file you use as the source for the website's chem_info
    console.log(
`// this was json but I made is .js so I could import it instead of fetching it :: remove lines 1 and 2 to turn back into valid json
export const chem_info =
${chem_info_json}`
    )
}

function make_chem_info() {
    const chem_info = {};

    // csv's are stored in the chem_files folder
    const chem_info_files = fs.readdirSync(folder_name);

    for (const file of chem_info_files) {
        const chemical_name = file.split(".")[0]; // filenames are <chemical_name>.txt
        
        const file_content = fs.readFileSync(`${folder_name}/${file}`, "utf-8");
        
        chem_info[chemical_name] = file_content;
    }

    delete chem_info[""]; // delete the weird empty property that occurs sometimes

    return chem_info;
}

// for now, this just turns {1} into a superscript <sup>, and replaces \n newlines with <br>
// untested, not sure if this works
// no longer needed since plain text is fine, and easier to edit in the future
function make_chem_info_html(chem_info) {
    const chem_info_html = {};

    for (const chemical in chem_info) {
        let text = chem_info[chemical];
        text = text.trim().replaceAll(`\n`, `<br>`);

        let firstLine = text.split("<br>")[0];
        firstLine = firstLine.replaceAll("{", "<sup>").replaceAll("}", "</sup");

        let notFirstLine = text.split("<br>").slice(1).join("<br>");

        const html = firstLine + "<br>" + notFirstLine;
        chem_info_html[chemical] = html;
    }

    return chem_info_html;
}
