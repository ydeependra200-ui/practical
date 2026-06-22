let employees = [];

function addEmployee() {
    let name = document.getElementById("name").value;
    let empId = document.getElementById("empId").value;
    let salary = parseFloat(document.getElementById("salary").value);
    let deptartment = document.getElementById("department").value;
    if (name == "" || empId == "" || isNaN(salary) || deptartment == "") {
        alert("Please fill all fields correctly.");
        return;
    }
    let employee = {
        name: name,
        empId: empId,
        salary: salary,
        department: deptartment
    };
    employees.push(employee);
    alert("Employee added successfully!");
    document.getElementById("name").value = "";
    document.getElementById("empId").value = "";
    document.getElementById("salary").value = "";
    document.getElementById("department").value = "";
}
function displayEmployees() {
    let output = "<h3>Employee List:</h3>";
    employees.forEach(emp => {
        output += `
        Name: ${emp.name}<br>
        ID: ${emp.empId}<br>
        Salary: $${emp.salary.toFixed(2)}<br>
        Department: ${emp.department}<br><br>
        `;
    });
    document.getElementById("output").innerHTML = output;
}
function filterSalary() {
    let filtered = employees.filter(emp => emp.salary > 50000);
    let output = "<h3>Employees with Salary > $50,000:</h3>";
    filtered.forEach(emp => {
        output += `
        Name: ${emp.name}<br>
        ID: ${emp.empId}<br>
        Salary: $${emp.salary.toFixed(2)}<br>
        Department: ${emp.department}<br><br>
        `;
    });
    document.getElementById("output").innerHTML = output;
}
function totalSalary() {
    let total = employees.reduce((sum, emp) => sum + emp.salary, 0);
    document.getElementById("output").innerHTML = `<h3>Total Salary of All Employees: $${total.toFixed(2)}</h3>`;
}
function averageSalary() {
    if (employees.length === 0) {
        document.getElementById("output").innerHTML = "<h3>No employees to calculate average salary.</h3>";
        return;
    }
    let total = employees.reduce((sum, emp) => sum + emp.salary, 0);
    let average = total / employees.length;
    document.getElementById("output").innerHTML = `<h3>Average Salary of All Employees: $${average.toFixed(2)}</h3>`;
}
function countDepartment() {
    let departmentName = prompt("Enter department name :");
    let count = employees.filter(emp => emp.department === departmentName).length;
    document.getElementById("output").innerHTML = `<h3>Number of Employees in ${departmentName} Department: ${count}</h3>`;
}