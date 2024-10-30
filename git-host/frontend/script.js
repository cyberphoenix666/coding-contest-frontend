// Function to show exit alert
function showExitAlert(event) {
    // Check if click is outside the main area
    const mainArea = document.querySelector('main');
    if (!mainArea.contains(event.target)) {
        alert("You have been exited.");
    }
}

// Add an event listener for the click event on the document
document.addEventListener('click', showExitAlert);

// Existing code to get a random question and submit code
document.getElementById('getQuestion').addEventListener('click', async function() {
    const response = await fetch('http://localhost:5000/api/questions/random'); // Update to your backend API
    const question = await response.json();
    document.getElementById('questionContainer').innerText = question.statement;
});

document.getElementById('submit').addEventListener('click', async function() {
    const code = document.getElementById('code').value;
    const language = 'Python'; // Set selected language here

    const response = await fetch('http://localhost:5000/api/questions/execute', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ code, language })
    });

    const result = await response.json();
    document.getElementById('result').innerText = 'Output: ' + result.output || result.error;
});