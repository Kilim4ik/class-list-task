"use strict";

// import tmp from "./template/tmp.hbs";
let students = [];
students = JSON.parse(localStorage.getItem("students"));
const form = document.querySelector(".student-form");
const template = document.querySelector(".template__list");
const takeStudentData = () => {
  const userData = Array.from(form.children).map((elem) => elem.value);
  userData.pop();
  if (userData.some((elem) => elem == "" || elem == " ")) return;
  return userData;
};
const arrayToObj = (callback) => {
  if (!callback) return;
  const student = {
    name: callback[0],
    surname: callback[1],
    age: Number(callback[2]),
    mainCourse: callback[3],
    faculty: callback[4],
    allCourses: callback[5].split(","),
  };
  if (isNaN(student.age)) return;
  return student;
};
const updateJSON = () => {
  localStorage.setItem("students", JSON.stringify(students));
};
const renderTable = () => {
  let code = ``;
  students
    .filter((elem) => elem)
    .forEach((elem) => {
      code += `
      <li>
      <ul class="student">
        <li class="student__elem">${elem.name}</li>
        <li class="student__elem">${elem.surname}</li>
        <li class="student__elem">${elem.age}</li>
        <li class="student__elem">${elem.mainCourse}</li>
        <li class="student__elem">${elem.faculty}</li>
        <li class="student__elem">${elem.allCourses.join(", ")}</li>
        <li class="student__elem">
          <button class="student__delete-button" 
          data-student-name="${elem.name}" 
          data-student-surname="${elem.surname}">
          за кораблем
          </button>
        </li>
      </ul>
    </li>`;
    });
  template.innerHTML = code;
};
renderTable();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  students.push(arrayToObj(takeStudentData()));
  updateJSON;
  renderTable();
});
template.addEventListener("click", (e) => {
  if (e.target.classList == "student__delete-button") {
    const name = e.target.dataset.studentName;
    const surname = e.target.dataset.studentSurname;
    students = students.filter((elem) => {
      if (elem != null) {
        return elem.name !== name && elem.surname !== surname;
      }
    });
    updateJSON();
    renderTable();
  }
});
// const markup = tmp({ students });
// console.log(markup);
// console.log(typeof tmp);
// сделать два дата атрибута  , сделать поиск по этим дата атрибутам и удалять объект , обновлять рендер и json
