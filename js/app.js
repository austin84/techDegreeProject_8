// Variables

let employees = [];
const urlAPI =
  'https://randomuser.me/api/?results=12&nat=us&inc=name,location,email,dob,phone,picture&noinfo';
const gridContainer = document.querySelector('.grid-container');
const overlay = document.querySelector('.overlay');
const modalContent = document.querySelector('model-content');
const modalClose = document.querySelector('.modal-close');

function getData(url) {
  fetch(url)
    .then((res) => res.json())
    .then((res) => res.results)
    .then(displayEmployees)
    .catch((err) => console.log(err));
}

getData(urlAPI);
