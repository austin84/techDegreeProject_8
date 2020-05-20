// Variables

let employees = [];
const urlAPI =
  'https://randomuser.me/api/?results=12&nat=us&inc=name,location,email,dob,phone,picture&noinfo';
const gridContainer = document.querySelector('.grid-container');
const overlay = document.querySelector('.overlay');
const modalContent = document.querySelector('model-content');
const modalClose = document.querySelector('.modal-close');

/**
 *
 * @param {string} url - the url required to fetch data from the Random User API
 * Fucntion to fetch data and convert it to JSON
 */
function getData(url) {
  fetch(url)
    .then((res) => res.json())
    .then((res) => res.results)
    .then(displayEmployees)
    .catch((err) => console.log(err));
}

/**
 *
 * @param {array} employeeData - An array of employee data returned as a response from a fetch to the RandomUser API
 * Function creates the HTML for the Employee Data
 */
function displayEmployees(employeeData) {
  employees = employeeData;
  let html = '';
  employees.forEach((employee) => {
    let name = employee.name;
    let email = employee.email;
    let city = employee.location.city;
    let picture = employee.picture.large;
    html += `
    <div class="card">
        <img src=${picture} alt="employee photo" class="avatar" />
        <div class="text-container">
          <h2 class="name">${name.first} ${name.last}</h2>
          <p class="email">${email}</p>
          <p class="address">${city}</p>
        </div>
      </div>
    `;
  });
  gridContainer.innerHTML = html;
}

getData(urlAPI);
