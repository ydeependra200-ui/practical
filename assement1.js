
let students = []; 

const nameInput    = document.getElementById('name');
const rollInput    = document.getElementById('roll');
const mathInput    = document.getElementById('math');
const scienceInput = document.getElementById('science');
const englishInput = document.getElementById('english');
const addBtn       = document.getElementById('addBtn');
const output       = document.getElementById('output');
const btnShowAll     = document.getElementById('showAll');
const btnTotals      = document.getElementById('showTotals');
const btnAverages    = document.getElementById('showAverages');
const btnTop         = document.getElementById('showTop');
const btnFailed      = document.getElementById('showFailed');
const btnCount       = document.getElementById('countStudents');
const btnClear       = document.getElementById('clearDisplay');
addBtn.addEventListener('click', () => {
  const name    = nameInput.value.trim();
  const roll    = rollInput.value.trim();
  const math    = Number(mathInput.value);
  const science = Number(scienceInput.value);
  const english = Number(englishInput.value);

  if (!name || !roll || isNaN(math) || isNaN(science) || isNaN(english)) {
    alert("Please fill all fields correctly!");
    return;
  }

  if (math < 0 || math > 100 || science < 0 || science > 100 || english < 0 || english > 100) {
    alert("Marks should be between 0 and 100!");
    return;
  }

  const student = {
    name,
    roll,
    math,
    science,
    english,
    getTotal() {
      return this.math + this.science + this.english;
    },
    getAverage() {
      return (this.getTotal() / 3).toFixed(2);
    }
  };

  students.push(student);
  alert(`Student ${name} (Roll ${roll}) added successfully!`);
  nameInput.value = rollInput.value = mathInput.value = scienceInput.value = englishInput.value = '';
});
function clearOutput() {
  output.innerHTML = '';
}

function showStudents(filteredStudents = students, title = "All Students") {
  clearOutput();
  if (filteredStudents.length === 0) {
    output.innerHTML = `<p style="color:#777;">No students to display</p>`;
    return;
  }

  output.innerHTML = `<h2>${title} (${filteredStudents.length})</h2>`;

  filteredStudents.forEach(st => {
    const avg = st.getAverage();
    const total = st.getTotal();
    const statusClass = avg >= 80 ? 'highlight-good' : (avg < 40 ? 'highlight-bad' : '');

    const div = document.createElement('div');
    div.className = `student-card ${statusClass}`;
    div.innerHTML = `
      <h3>${st.name}  •  Roll: ${st.roll}</h3>
      <p>Math: ${st.math} | Science: ${st.science} | English: ${st.english}</p>
      <p><strong>Total:</strong> ${total} | <strong>Average:</strong> ${avg}%</p>
    `;
    output.appendChild(div);
  });
}
btnShowAll.addEventListener('click', () => showStudents(students, "All Students"));

btnTotals.addEventListener('click', () => {
  clearOutput();
  output.innerHTML = "<h2>Total Marks of Each Student</h2>";
  students.forEach(s => {
    output.innerHTML += `<p><strong>${s.name}</strong> (Roll ${s.roll}) → Total: ${s.getTotal()}/300</p>`;
  });
});

btnAverages.addEventListener('click', () => {
  clearOutput();
  output.innerHTML = "<h2>Average Marks of Each Student</h2>";
  students.forEach(s => {
    output.innerHTML += `<p><strong>${s.name}</strong> → Average: ${s.getAverage()}%</p>`;
  });
});

btnTop.addEventListener('click', () => {
  const top = students.filter(s => Number(s.getAverage()) >= 80);
  showStudents(top, "Students with Average ≥ 80%");
});

btnFailed.addEventListener('click', () => {
  const failed = students.filter(s => Number(s.getAverage()) < 40);
  showStudents(failed, "Failed Students (Average < 40%)");
});

btnCount.addEventListener('click', () => {
  clearOutput();
  output.innerHTML = `<h2 style="color:#d81b60;">Total Students: ${students.length}</h2>`;
});

btnClear.addEventListener('click', clearOutput);