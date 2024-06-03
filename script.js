const subjects = [
    { name: "Application Development by Java", maxMarks: 60 },
    { name: "Web Design and Development 2", maxMarks: 30 },
    { name: "Data Communication", maxMarks: 90 },
    { name: "Accounting", maxMarks: 60 },
    { name: "Computer Architecture and Microprocessor", maxMarks: 90 },
    { name: "Operating System", maxMarks: 60 }
];

let currentSubjectIndex = 0;
let marks = [];

const nextQuestion = () => {
    const marksInput = document.getElementById('marks-input');
    const marksValue = parseFloat(marksInput.value);

    if (!isNaN(marksValue)) {
        marks.push(marksValue);

        currentSubjectIndex++;
        if (currentSubjectIndex < subjects.length) {
            document.getElementById('question').textContent = `What is your marks in ${subjects[currentSubjectIndex].name}?`;
            speakQuestion(subjects[currentSubjectIndex].name);
            marksInput.value = '';
        } else {
            document.getElementById('quiz-form').style.display = 'none';
            calculateGrade();
        }
    } else {
        alert('Please enter valid marks');
    }
};

const speakQuestion = (subjectName) => {
    const utterance = new SpeechSynthesisUtterance(`What is your marks in ${subjectName}?`);
    speechSynthesis.speak(utterance);
};

const calculateGrade = () => {
    const fullMarks = subjects.map(subject => subject.maxMarks);
    const totalMarks = marks.reduce((sum, mark) => sum + mark, 0);
    const maxTotalMarks = fullMarks.reduce((sum, mark) => sum + mark, 0);
    const percentage = ((totalMarks / maxTotalMarks) * 100).toFixed(2);

    const calculateCGPA = (score, maxMarks) => {
        if (maxMarks === 90) {
            if (score >= 76) return 4.00;
            else if (score >= 71) return 3.75;
            else if (score >= 66) return 3.50;
            else if (score >= 61) return 3.25;
            else if (score >= 56) return 3.00;
            else if (score >= 51) return 2.75;
            else if (score >= 46) return 2.50;
            else if (score >= 41) return 2.25;
            else if (score >= 36) return 2.00;
        } else if (maxMarks === 60) {
            if (score >= 56) return 4.00;
            else if (score >= 52) return 3.75;
            else if (score >= 48) return 3.50;
            else if (score >= 44) return 3.25;
            else if (score >= 40) return 3.00;
            else if (score >= 36) return 2.75;
            else if (score >= 32) return 2.50;
            else if (score >= 28) return 2.25;
            else if (score >= 24) return 2.00;
        } else if (maxMarks === 30) {
            if (score >= 28) return 4.00;
            else if (score >= 26) return 3.75;
            else if (score >= 24) return 3.50;
            else if (score >= 22) return 3.25;
            else if (score >= 20) return 3.00;
            else if (score >= 18) return 2.75;
            else if (score >= 16) return 2.50;
            else if (score >= 14) return 2.25;
            else if (score >= 12) return 2.00;
        }
        return 0;
    };

    const cgpa = marks.map((mark, index) => calculateCGPA(mark, subjects[index].maxMarks));
    const totalCgpa = (cgpa.reduce((sum, c) => sum + c, 0) / cgpa.length).toFixed(2);

    let finalGrade = '';
    if (totalCgpa >= 4.00) finalGrade = 'A+';
    else if (totalCgpa >= 3.75) finalGrade = 'A';
    else if (totalCgpa >= 3.50) finalGrade = 'A-';
    else if (totalCgpa >= 3.25) finalGrade = 'B+';
    else if (totalCgpa >= 3.00) finalGrade = 'B';
    else if (totalCgpa >= 2.75) finalGrade = 'B-';
    else if (totalCgpa >= 2.50) finalGrade = 'C+';
    else if (totalCgpa >= 2.25) finalGrade = 'C-';
    else if (totalCgpa >= 2.00) finalGrade = 'D';
    else finalGrade = 'F';

    document.getElementById('result-section').style.display = 'block';
    const resultBody = document.getElementById('result-body');
    resultBody.innerHTML = subjects.map((subject, index) => `
        <tr>
            <td>${subject.name}</td>
            <td>${marks[index]}</td>
            <td>${cgpa[index]}</td>
        </tr>
    `).join('');

    document.getElementById('showData').innerHTML = `
        Total Marks: ${totalMarks} out of ${maxTotalMarks}<br>
        Percentage: ${percentage}%<br>
        Average CGPA: ${totalCgpa}<br>
        Final Grade: ${finalGrade}
    `;
    const passFail = totalCgpa >= 2.00 ? 'PASS' : 'FAIL';
    document.getElementById('result').innerHTML = passFail;
};

const restartQuiz = () => {
    currentSubjectIndex = 0;
    marks = [];
    document.getElementById('quiz-form').style.display = 'block';
    document.getElementById('result-section').style.display = 'none';
    document.getElementById('marks-input').value = '';
    document.getElementById('question').textContent = `What is your marks in ${subjects[currentSubjectIndex].name}?`;
    speakQuestion(subjects[currentSubjectIndex].name);
};

// Initial voice prompt for the first question
speakQuestion(subjects[0].name);

const canvas = document.getElementById('backgroundCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 1 - 0.5;
        this.speedY = Math.random() * 1 - 0.5;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.1;
    }
    draw() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}


const particlesArray = [];
const numberOfParticles = 100;

function init() {
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function handleParticles() {
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
        if (particlesArray[i].size <= 0.3) {
            particlesArray.splice(i, 1);
            particlesArray.push(new Particle());
            i--;
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    requestAnimationFrame(animate);
}

init();
animate();