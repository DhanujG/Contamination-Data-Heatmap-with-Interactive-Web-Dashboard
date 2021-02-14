import { chemicals_data } from "./../../heatmap/json_data_files/chemicals_data.js";
import { zipcodes_data } from "./../../heatmap/json_data_files/zipcodes_data.js";
import { make_heatmap } from "./../../heatmap/heatmap.js";
import { chem_info } from "./../../infobox/chem_info.js";

const no_chemical_or_year_chosen_value = "---";
const data_units = "µg/L";
const chemical_name_selector = document.querySelector("#chemical-name-selector");
const chemical_year_selector = document.querySelector("#chemical-year-selector");
const make_heatmap_btn = document.querySelector("#make-heatmap-btn");
const loading_spinner = document.querySelector("#loading-spinner");
const zipcode_input = document.querySelector("#zipcode-input");
const zipcode_data_btn = document.querySelector("#get-zipcode-data-btn");
const zipcode_modal = document.querySelector("#zipcode-modal-body");
const infobox = document.querySelector("#infobox");

main();

function main() {
  make_dropdowns();
  make_heatmap_btn.addEventListener("click", make_heatmap_btn_function);
  zipcode_data_btn.addEventListener("click", get_zipcode_data);
}

// pass the actual dropdown obj into here, not its id
function make_dropdown_options(options_array, dropdown) {
  const fragment = new DocumentFragment();

  // make a new option tag for each option, and add it to the fragment
  for (const option of options_array) {
    const new_option = document.createElement("option");
    new_option.innerText = option;
    new_option.value = option;

    fragment.appendChild(new_option);
  }

  // add the fragment to the actual dropdown, so the options are visible on the page
  dropdown.innerHTML = `<option selected disabled>${no_chemical_or_year_chosen_value}</option>`; // clear previous options, and only leave the "Choose new chemical/Choose new year option"
  dropdown.appendChild(fragment);
}

function make_dropdowns() {
  const chemical_names = Object.keys(chemicals_data);

  // make the options for the chemical_name dropdown
  make_dropdown_options(chemical_names, chemical_name_selector);

  // when user chooses a chemical, fill the year selection dropdown
  // with the available yearz for the chosen chemical
  chemical_name_selector.addEventListener("change", () => {
    const chosen_chemical_name = chemical_name_selector.value;
    const chosen_chemical_data = chemicals_data[chosen_chemical_name];
    const chosen_chemical_years = Object.keys(chosen_chemical_data);

    // add the available years for the chosen chemical to the years dropdown
    make_dropdown_options(chosen_chemical_years, chemical_year_selector);
  });
}

function make_heatmap_btn_function() {
  if (
    chemical_name_selector.value === no_chemical_or_year_chosen_value ||
    chemical_year_selector.value === no_chemical_or_year_chosen_value
  ) {
    alert("Error! Please choose a valid chemical/year!");
    return;
  }
  // spinner class creates the spinner
  loading_spinner.classList.add("spinner");
  
  make_heatmap(chemical_name_selector.value, chemical_year_selector.value);

  infobox.innerText = chem_info[chemical_name_selector.value];
}

function get_zipcode_data() {
  if (zipcode_input.value in zipcodes_data === false) {
    zipcode_modal.innerHTML =
      `The zipcode ${zipcode_input.value} could not be found in the EPA data. You may want to try entering a nearby zipcode.`;
    return;
  }

  const data = zipcodes_data[zipcode_input.value];
  let data_msg = `<strong>Here are all the chemical contamination values we found for the zipcode ${zipcode_input.value}:</strong>
                  <br><br>
                  <div>All values are in <code>${data_units}</code></div>
                  <br>`;

  for (const year in data) {
    data_msg += `<strong><u>${year}</u></strong>`;
    data_msg += `<ul>`;

    for (const chemical in data[year]) {
      data_msg += `<li>${chemical}:
                    <pre>${data[year][chemical]}</pre>
                  </li>`;
    }

    data_msg += `</ul><br>`;
  }

  zipcode_modal.innerHTML = data_msg;
}
