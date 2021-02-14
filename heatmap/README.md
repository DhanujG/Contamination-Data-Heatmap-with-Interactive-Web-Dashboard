# How to modify the heatmap stuff:
* `heatmap.js` contains the `make_heatmap` function, and this function runs using the Zingchart library, which takes in a geojson file of Michigan zipcodes, and a styles_json file, which contains css properties for each zipcode in the geojson file (zipcodes in the csv data are given a darker background color depending on their contamination value)
* If you have new data to add, then don't modify `chemicals_data.js` or `zipcodes_data.js` directly, they'll be overwritten later
* Instead, add your new csv files to the `scripts_and_source_data_to_create_json_data_files/chem_files` folder following the existing format `<chemical_name>_<year>_<state>_<UCMR_version>.txt`
* Then, run `scripts_and_source_data_to_create_json_data_files/merge_csv_files_into_single_json_object.js`, though the filepath may be different depending on your current terminal location
* To run that file, you should first have node.js and npm nstalled, and then use them to install the dependencies needed for the script (`fs` and `csv-parse/lib/sync`)
* Then, go into the script file, and comment out either chemicals_data or zipcodes_data, depending on which one you want to print out
* Next, run this command: `node <filepath> > <output _filepath>`, where you use `>` to redirect the console output into a specified file (I used `output.json`) before copying and pasting into json_data_files/chemicals_data or json_data_files/zipcodes_data, but you could just redirect into those files directly (make sure you have the correct filepaths!!!) and skip this intermediate step
* Push your code and merge the master and gh-pages branches to see changes on the live website! (running `push_and_merge.sh` makes this significantly easier -> type `bash <filepath> "Your commit message here"`)
---

# This heatmap folder was originally its own repository, which is why theres an index.html and outdated README.md file in here. Feel free to ignore them if you want.

# Chemical Contamination Heatmap
 Chemical Contamination Heatmap for Michigan EcoData

## todo:
* maybe try to find a way to have multiple chemicals on the heatmap at once?, might not work though due to color limitations
* add way to export table of data for specific zipcode
* connect map to input of chemical name
* add slider across years & pass different json styles for each year
* use this for slider: https://www.zingchart.com/gallery/timeline-style-map-with-slider-input
* connect to main website
* change color scheme
* modify other styling parts of the map
