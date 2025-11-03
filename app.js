var maxPossibleScore = 200;
var studentRecords = [];
var maxRecordsAllowed = 10;


function determineGrade(percentage) {
    if (percentage >= 80) return 'A';
    if (percentage >= 65) return 'B';
    if (percentage >= 50) return 'C';
    if (percentage >= 40) return 'D';
    return 'F';
}


function recordScore() {
    var sName = document.getElementById("studentNameInput").value.trim();
    var mathsInput = document.getElementById("mathsScoreInput").value;
    var csInput = document.getElementById("csScoreInput").value;

    var mathsScore = Number(mathsInput);
    var csScore = Number(csInput);

    if (!sName || mathsInput === "" || csInput === "" || isNaN(mathsScore) || isNaN(csScore)) {
        alert("All fields must be filled with valid numbers for scores.");
        return;
    }

    if (mathsScore < 0 || csScore < 0 || mathsScore > 100 || csScore > 100) {
        alert("Scores must be between 0 and 100.");
        return;
    }

    if (studentRecords.length >= maxRecordsAllowed) {
        alert(`Maximum ${maxRecordsAllowed} records allowed!`);
        return;
    }

    var totalScore = mathsScore + csScore;
    var finalPercentage = (totalScore / maxPossibleScore) * 100;
    

    var resultStatus = finalPercentage >= 50 ? "PASS" : "FAIL";
    var resultGrade = determineGrade(finalPercentage);

    studentRecords.push({
        name: sName,
        maths: mathsScore,
        cs: csScore,
        total: totalScore,
        percent: finalPercentage.toFixed(2),
        status: resultStatus,
        grade: resultGrade
    });

    renderRecords();

    document.getElementById("studentNameInput").value = "";
    document.getElementById("mathsScoreInput").value = "";
    document.getElementById("csScoreInput").value = "";
}


function renderRecords() {
    var container = document.getElementById("output-cards");
    container.innerHTML = "";

    studentRecords.forEach(function (rec) {
        container.innerHTML += `
              <div class="result-card">
                <h3>${rec.name}</h3>
                <div class="data-row"><span>Maths Score:</span> <b>${rec.maths}</b></div>
                <div class="data-row"><span>C.S. Score:</span> <b>${rec.cs}</b></div>
                <div class="data-row"><span>Total Score:</span> <b>${rec.total} / ${maxPossibleScore}</b></div>
                <div class="data-row"><span>Percentage:</span> <b>${rec.percent}%</b></div>
                <div class="data-row"><span>Grade:</span> <span class="tag grade-${rec.grade.toLowerCase()}">${rec.grade}</span></div>
                <span class="tag status-${rec.status.toLowerCase()}">
                  ${rec.status}
                </span>
              </div>
            `;
    });
} 