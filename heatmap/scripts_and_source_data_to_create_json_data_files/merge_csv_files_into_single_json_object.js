// How To Use
// 1: run the python scripts from the ecodata github to make all the csv's in a folder called chem_files
// 2: run this script on the folder of csv's (this file should be on the same level as the folder of csv's, not in the folder itself) 
//    Make sure to direct the output into the file that you want (node merge_...._object.js > heatmap/output.json)
// 2.5: make sure you npm installed the two libraries needed (fs and csv-parse)
// 3: substitute new geojson for old geojson, and heatmap will automatically update itself

// folder with the csv's - change this if the folder name changes
const folder_name = `${__dirname}/chem_files`;

const fs = require('fs');
const parse = require('csv-parse/lib/sync');

main()

function main() {
    const chemicals_json = make_chemicals_json();
    const zipcodes_json = make_zipcodes_json(chemicals_json);
    
    // replace the json object being printed here so the output file has what you want
    console.log( JSON.stringify(
        chemicals_json
        //zipcodes_json
    ));
}

function make_chemicals_json() {
    const chemicals_json = {};

    // csv's are stored in the chem_files folder
    const chem_files = fs.readdirSync(folder_name);

    // initialize each chemical_name with {}
    for (let file of chem_files) {
        // file names have the components separated by underscores
        let [ chemical_name ] = file.split("_");
        chemicals_json[chemical_name] = {};
    }
    // add the year keys to each chemical's object
    for (let file of chem_files) {
        let [ chemical_name, year ] = file.split("_");
        chemicals_json[chemical_name][year] = {};
    }


    // another pass to actually add data
    for (let file of chem_files) {
        let [ chemical_name ] = file.split("_");

        let fileContent = fs.readFileSync(`${folder_name}/${file}`, "utf-8");
        let rows = parse(fileContent, { columns: true });

        rows.forEach(row => {
            // make the variable names nicer to work with
            let {
                CollectionDate: year,
                ZIPCODE: zipcode,
                AnalyticalResultValue: value
            } = row;

            chemicals_json[chemical_name][year][zipcode] = parseFloat(value);
        })
    }

    return chemicals_json;
}

function make_zipcodes_json(chemicals_json) {
    const zipcodes_json = {};

    for (const chemical in chemicals_json) {
        const data_for_chemical = chemicals_json[chemical];

        for (const year in data_for_chemical) {
            const data_for_chemical_in_year = data_for_chemical[year];

            for (const zipcode in data_for_chemical_in_year) {
                // initialize zipcodes_json in case this is the first loop iteration
                // where a particular zipcode or year for a zipcode is seen
                if (zipcode in zipcodes_json === false) {
                    zipcodes_json[zipcode] = {};
                }
                if (year in zipcodes_json[zipcode] === false) {
                    zipcodes_json[zipcode][year] = {};
                }

                zipcodes_json[zipcode][year][chemical] = data_for_chemical_in_year[zipcode];
            }
        }
    }

    return zipcodes_json;
}
