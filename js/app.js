// Variables

let employees = [];
const urlAPI =
  'https://randomuser.me/api/?results=12&nat=us&inc=name,location,email,dob,phone,picture&noinfo';
const gridContainer = document.querySelector('.grid-container');
const overlay = document.querySelector('.overlay');
const modalContent = document.querySelector('.modal-content');
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
  employees.forEach((employee, index) => {
    let name = employee.name;
    let email = employee.email;
    let city = employee.location.city;
    let picture = employee.picture.large;
    html += `
    <div class="card" data-index="${index}">
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

/**
 *
 * @param {number} index - index of selected employee
 * grabs data to populate modal
 */
function displayModal(index) {
  let {
    name,
    dob,
    phone,
    email,
    location: { city, street, state, postcode },
    picture,
  } = employees[index];

  let date = new Date(dob.date);

  const html = `
  <img src="${picture.large}" alt="employee photo" class="avatar" />
  <div class="text-container">
    <h2 class="name">${name.first} ${name.last}</h2>
    <p class="email">${email}</p>
    <hr />
    <p>${phone}</p>
    <p class="address">${street.number} ${
    street.name
  } ${city}, ${state} ${postcode}</p>
    <p>${date.getMonth()}/${date.getDate()}/${date.getFullYear()}</p>
  </div>
  `;

  modalContent.innerHTML = html;
  overlay.classList.remove('hidden');
}

// *
// * Event Listeners
// *
gridContainer.addEventListener('click', (e) => {
  if (e.target !== gridContainer) {
    const card = e.target.closest('.card');
    const index = card.getAttribute('data-index');

    displayModal(index);
  }
});

modalClose.addEventListener('click', (e) => {
  overlay.classList.add('hidden');
});

getData(urlAPI);
