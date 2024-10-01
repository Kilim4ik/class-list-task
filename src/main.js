"use strict";
import tmp from "./template/tmp.hbs";
let students = [];
students = JSON.parse(localStorage.getItem("students"));
const form = document.querySelector(".student-form");
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
          <li class="student__elem">${elem.allCourses}</li>
        </ul>
        </li>`;
    });
  document.querySelector(".template__list").innerHTML = code;
};
form.addEventListener("submit", (e) => {
  e.preventDefault();
  students.push(arrayToObj(takeStudentData()));
  localStorage.setItem("students", JSON.stringify(students));
  renderTable();
});

renderTable();
const markup = tmp({ students });
console.log(markup);
console.log(typeof tmp);
// сделать два дата атрибута  , сделать поиск по этим дата атрибутам и удалять объект , обновлять рендер и json
console.log(students);

const isDataInStorage = (key) => {
  return !!localStorage.getItem(key);
};
console.log(isDataInStorage("userName"));

localStorage.setItem("key", null);
console.log(isDataInStorage("key"));
