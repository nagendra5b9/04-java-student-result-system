// Java Collections Framework - Student Result System Frontend
let students = [
  {
    id: 'STU-101',
    name: 'Aria Stark',
    dept: 'Computer Sci',
    scores: { 'Mathematics': 95, 'Data Structures': 92, 'Algorithms': 88, 'Database Systems': 94 }
  },
  {
    id: 'STU-102',
    name: 'Brandon Stark',
    dept: 'Robotics',
    scores: { 'Mathematics': 78, 'Robotics 101': 85, 'Control Systems': 82, 'Database Systems': 75 }
  },
  {
    id: 'STU-103',
    name: 'Daenerys Targaryen',
    dept: 'Aeronautics',
    scores: { 'Mathematics': 89, 'Aerodynamics': 96, 'Thermodynamics': 91, 'Avionics': 94 }
  },
  {
    id: 'STU-104',
    name: 'Jon Snow',
    dept: 'Computer Sci',
    scores: { 'Mathematics': 62, 'Data Structures': 58, 'Algorithms': 64, 'Database Systems': 70 }
  },
  {
    id: 'STU-105',
    name: 'Tyrion Lannister',
    dept: 'Economics',
    scores: { 'Microeconomics': 98, 'Game Theory': 99, 'Econometrics': 92, 'Financial Modeling': 95 }
  }
];

let sortOption = 'rank';
let filterQuery = '';

// DOM Elements
const studentTableBody = document.getElementById('studentTableBody');
const filterInput = document.getElementById('filterInput');
const sortSelect = document.getElementById('sortSelect');
const totalStudentsEl = document.getElementById('totalStudents');
const avgPercentageEl = document.getElementById('avgPercentage');
const passRateEl = document.getElementById('passRate');
const topStudentNameEl = document.getElementById('topStudentName');

// Modals
const detailModal = document.getElementById('detailModal');
const addModal = document.getElementById('addModal');

function calculateStudentMetrics(student) {
  const scoreVals = Object.values(student.scores);
  const total = scoreVals.reduce((a, b) => a + b, 0);
  const percentage = scoreVals.length > 0 ? (total / scoreVals.length) : 0;

  let gpa = 0.0;
  let grade = 'F';

  if (percentage >= 90) { gpa = 4.0; grade = 'A+'; }
  else if (percentage >= 80) { gpa = 3.5; grade = 'A'; }
  else if (percentage >= 70) { gpa = 3.0; grade = 'B'; }
  else if (percentage >= 60) { gpa = 2.5; grade = 'C'; }
  else if (percentage >= 50) { gpa = 2.0; grade = 'D'; }

  const isPassed = scoreVals.every(s => s >= 40);

  return { total, percentage, gpa, grade, isPassed };
}

function updateSummaryKPIs() {
  totalStudentsEl.textContent = students.length;

  if (students.length === 0) {
    avgPercentageEl.textContent = '0%';
    passRateEl.textContent = '0%';
    topStudentNameEl.textContent = 'N/A';
    return;
  }

  const allPercentages = students.map(s => calculateStudentMetrics(s).percentage);
  const avg = (allPercentages.reduce((a, b) => a + b, 0) / students.length).toFixed(1);
  avgPercentageEl.textContent = `${avg}%`;

  const passCount = students.filter(s => calculateStudentMetrics(s).isPassed).length;
  passRateEl.textContent = `${((passCount / students.length) * 100).toFixed(0)}%`;

  // Max performance using comparator logic
  const top = [...students].sort((a, b) => calculateStudentMetrics(b).percentage - calculateStudentMetrics(a).percentage)[0];
  topStudentNameEl.textContent = `${top.name} (${calculateStudentMetrics(top).percentage.toFixed(1)}%)`;
}

function renderTable() {
  // 1. Filter
  let filtered = students.filter(s =>
    s.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
    s.dept.toLowerCase().includes(filterQuery.toLowerCase()) ||
    s.id.toLowerCase().includes(filterQuery.toLowerCase())
  );

  // 2. Sort using Collections comparators
  if (sortOption === 'rank') {
    filtered.sort((a, b) => calculateStudentMetrics(b).percentage - calculateStudentMetrics(a).percentage);
  } else if (sortOption === 'name') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortOption === 'gpa') {
    filtered.sort((a, b) => calculateStudentMetrics(b).gpa - calculateStudentMetrics(a).gpa);
  }

  // 3. Render HTML
  studentTableBody.innerHTML = filtered.map((s, index) => {
    const { total, percentage, gpa, grade, isPassed } = calculateStudentMetrics(s);
    let rankBadgeClass = index === 0 ? 'rank-1' : (index === 1 ? 'rank-2' : (index === 2 ? 'rank-3' : ''));

    let gradeClass = 'grade-A';
    if (grade.startsWith('B')) gradeClass = 'grade-B';
    if (grade.startsWith('C') || grade.startsWith('D')) gradeClass = 'grade-C';
    if (grade === 'F') gradeClass = 'grade-F';

    return `
      <tr>
        <td><span class="rank-badge ${rankBadgeClass}">#${index + 1}</span></td>
        <td><code style="font-family:'JetBrains Mono'; font-weight:600; color:#93c5fd;">${s.id}</code></td>
        <td><strong>${s.name}</strong></td>
        <td><span style="color:#94a3b8;">${s.dept}</span></td>
        <td><strong>${total}</strong></td>
        <td>${percentage.toFixed(1)}%</td>
        <td><span style="font-family:'JetBrains Mono'; font-weight:700;">${gpa.toFixed(1)}</span></td>
        <td><span class="grade-badge ${gradeClass}">${grade}</span></td>
        <td><button class="btn-detail" onclick="viewStudentDetails('${s.id}')">View Report</button></td>
      </tr>
    `;
  }).join('');

  updateSummaryKPIs();
}

window.viewStudentDetails = function(id) {
  const student = students.find(s => s.id === id);
  if (!student) return;

  const { total, percentage, gpa, grade, isPassed } = calculateStudentMetrics(student);

  document.getElementById('modalStudentName').textContent = `${student.name} (${student.id})`;
  document.getElementById('modalMetaSummary').innerHTML = `
    <div><strong>Dept:</strong> ${student.dept}</div>
    <div><strong>GPA:</strong> ${gpa.toFixed(1)} / 4.0</div>
    <div><strong>Percentage:</strong> ${percentage.toFixed(1)}%</div>
    <div><strong>Status:</strong> ${isPassed ? '<span style="color:#10b981; font-weight:700;">PASSED</span>' : '<span style="color:#ef4444; font-weight:700;">NEEDS RE-EXAM</span>'}</div>
  `;

  document.getElementById('subjectBars').innerHTML = Object.entries(student.scores).map(([subj, score]) => `
    <div class="subject-row">
      <div class="subject-row-header">
        <span>${subj}</span>
        <span><strong>${score}</strong> / 100</span>
      </div>
      <div class="bar-bg">
        <div class="bar-fill" style="width: ${score}%;"></div>
      </div>
    </div>
  `).join('');

  detailModal.classList.remove('hidden');
};

document.getElementById('closeDetailBtn').addEventListener('click', () => {
  detailModal.classList.add('hidden');
});

// Add Modal
document.getElementById('openAddModalBtn').addEventListener('click', () => {
  addModal.classList.remove('hidden');
});
document.getElementById('closeAddBtn').addEventListener('click', () => {
  addModal.classList.add('hidden');
});
document.getElementById('cancelAddBtn').addEventListener('click', () => {
  addModal.classList.add('hidden');
});

document.getElementById('addStudentForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const id = document.getElementById('newId').value.trim();
  const name = document.getElementById('newName').value.trim();
  const dept = document.getElementById('newDept').value.trim();
  const math = parseInt(document.getElementById('scoreMath').value, 10);
  const algo = parseInt(document.getElementById('scoreAlgo').value, 10);
  const db = parseInt(document.getElementById('scoreDb').value, 10);
  const sys = parseInt(document.getElementById('scoreSys').value, 10);

  students.push({
    id, name, dept,
    scores: { 'Mathematics': math, 'Algorithms': algo, 'Database Systems': db, 'Operating Systems': sys }
  });

  addModal.classList.add('hidden');
  document.getElementById('addStudentForm').reset();
  renderTable();
});

filterInput.addEventListener('input', (e) => {
  filterQuery = e.target.value;
  renderTable();
});

sortSelect.addEventListener('change', (e) => {
  sortOption = e.target.value;
  renderTable();
});

// Initial Render
renderTable();
