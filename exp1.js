function calculateResults() {
    const subjectsInput = document.getElementById('subjects').value;
    const subjects = parseInt(subjectsInput);
    const resultsDiv = document.getElementById('results');
    if (!subjects || subjects < 1 || subjects > 10) {
        resultsDiv.innerHTML = `<p style="color: #e74c3c; font-weight: bold;">
            Please enter a valid number of subjects (1–10).
        </p>`;
        return;
    }
    let total = 0;
    let scores = [];
    for (let i = 1; i <= subjects; i++) {
        let score = prompt(`Enter marks for Subject ${i} (0-100):`);
        score = parseFloat(score);
        
        if (isNaN(score) || score < 0 || score > 100) {
            resultsDiv.innerHTML = `<p style="color: #e74c3c; font-weight: bold;">
                Invalid input! All marks must be numbers between 0 and 100.
            </p>`;
            return;
        }
        scores.push(score);
        total += score;
    }
    const average = total / subjects;
    let grade;
    if (average >= 90)      grade = 'A';
    else if (average >= 80) grade = 'B';
    else if (average >= 70) grade = 'C';
    else if (average >= 60) grade = 'D';
    else                    grade = 'F';
    const status = average >= 40 ? 'PASSED' : 'FAILED';
    const statusColor = average >= 40 ? '#27ae60' : '#c0392b';
    let output = `
        <strong>Total Marks:</strong> ${total} / ${subjects * 100}<br>
        <strong>Average:</strong> ${average.toFixed(2)}%<br>
        <strong>Grade:</strong> ${grade}<br>
        <strong>Result:</strong> <span style="color: ${statusColor}; font-weight: bold;">${status}</span>
    `;

    resultsDiv.innerHTML = output;
} 