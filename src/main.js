"use strict";

let students = [];
students = JSON.parse(localStorage.getItem("students"));
const form = document.querySelector(".student-form");
const changeForm = document.querySelector(".chenging-form");

const template = document.querySelector(".template__list");
const takeStudentData = (inputs) => {
  const userData = Array.from(inputs.children).map((elem) => elem.value);
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
const clearForm = (arr) => {
  arr = arr.children;
  for (let i = 0; i < arr.length; i++) {
    arr[i].value = "";
  }
};
const chengeInputsForChenging = (arrInputs, student) => {
  arrInputs[0].value = student.name;
  arrInputs[1].value = student.surname;
  arrInputs[2].value = student.age;
  arrInputs[3].value = student.mainCourse;
  arrInputs[4].value = student.faculty;
  arrInputs[5].value = student.allCourses.join(",");
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
        <li class="student__elem">
          <button class="student__change-button" 
          data-student-name="${elem.name}" 
          data-student-surname="${elem.surname}">
          заміна
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
  students.push(arrayToObj(takeStudentData(form)));
  updateJSON();
  clearForm(form);
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
  if (e.target.classList == "student__change-button") {
    const name = e.target.dataset.studentName;
    const surname = e.target.dataset.studentSurname;
    const student = students.find(
      (elem) => elem.name == name && elem.surname == surname
    );
    chengeInputsForChenging(changeForm.children, student);
    changeForm.addEventListener("submit", (e) => {
      e.preventDefault();
      students.splice(
        students.indexOf(student),
        1,
        arrayToObj(takeStudentData(changeForm))
      );
      clearForm(changeForm);

      renderTable();
    });
  }
});
