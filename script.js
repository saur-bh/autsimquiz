document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const quizContainer = document.getElementById("quiz");
  const progressBar = document.getElementById("progress");
  const resultContainer = document.getElementById("resultContainer");
  const resultText = document.getElementById("resultText");
  const resetButton = document.getElementById("resetButton");
  const controls = document.querySelector(".controls");
  const yesButton = document.getElementById("yesButton");
  const noButton = document.getElementById("noButton");

  // State variables
  let currentQuestion = 0;
  let yesCount = 0;

  const questions = [
    { id: 1, text: "Does your child often fail to pay close attention to details?", img: "./img/placeholder1.png" },
    { id: 2, text: "Does your child often have difficulty staying focused?", img: "./img/placeholder2.png" },
    { id: 3, text: "Does your child often seem not to listen when spoken to directly?", img: "./img/placeholder3.png" },
    { id: 4, text: "Does your child often start tasks but fail to complete them?", img: "./img/placeholder4.png" },
    { id: 5, text: "Does your child often lose things necessary for tasks?", img: "./img/placeholder5.png" },
    { id: 6, text: "Is your child often easily distracted by noises or other things happening around them?", img: "./img/placeholder6.png" },
    { id: 7, text: "Does your child frequently fidget with their hands, feet, or squirm in their seat?", img: "./img/placeholder7.png" },
    { id: 8, text: "Does your child often leave their seat when expected to stay seated?", img: "./img/placeholder8.png" },
    { id: 9, text: "Does your child often run, climb, or act overly restless in inappropriate situations?", img: "./img/placeholder9.png" },
    { id: 10, text: "Does your child often seem 'on the go' as if driven by a motor?", img: "./img/placeholder10.png" },
    { id: 11, text: "Does your child frequently talk excessively?", img: "./img/placeholder11.png" },
    { id: 12, text: "Does your child often blurt out answers before the question is completed?", img: "./img/placeholder12.png" },
    { id: 13, text: "Does your child have difficulty waiting their turn in games or group activities?", img: "./img/placeholder13.png" },
    { id: 14, text: "Does your child interrupt or intrude on others frequently?", img: "./img/placeholder14.png" },
    { id: 15, text: "Does your child often act without thinking, leading to risky or inappropriate behavior?", img: "./img/placeholder15.png" },
  ];

  // Initialize Quiz
  function loadQuiz() {
    quizContainer.innerHTML = questions
      .map(
        (q, index) => `
          <div class="card" style="z-index: ${questions.length - index};">
              <h3>Question ${q.id}</h3>
              <img src="${q.img}" alt="Question Image">
              <p>${q.text}</p>
          </div>`
      )
      .join("");
    controls.classList.remove("hidden");
  }

  // Update Progress
  function updateProgress() {
    progressBar.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
  }

  // Handle Answer
  function handleAnswer(answer) {
    if (answer === "yes") yesCount++;
    currentQuestion++;

    if (currentQuestion < questions.length) {
      quizContainer.children[0].remove();
      updateProgress();
    } else {
      showForm();
    }
  }

  // Show Form to Collect Data
  function showForm() {
    quizContainer.classList.add("hidden");
    controls.classList.add("hidden"); // Hide Yes/No buttons
    resultContainer.classList.remove("hidden");

    resultText.innerHTML = `
      <h2>Thank you for completing the quiz!</h2>
      <p>Please provide your details to see the results.</p>
    `;

    document.getElementById("userForm").classList.remove("hidden");
  }

  // Show Result After Form Submission
  function showResult(formData) {
    // Hide Yes and No Buttons
    controls.classList.add("hidden");

    let resultImage;
    let feedbackMessage;

    // Determine the result based on the yesCount
    if (yesCount <= 4) {
        resultImage = "./img/parent_with_child.png";
        feedbackMessage = "Likely typical behavior; no immediate concerns.";
    } else if (yesCount <= 9) {
        resultImage = "./img/female_child.png"; // Adjust based on context
        feedbackMessage = "Some signs of ADHD; consider monitoring and seeking professional advice.";
    } else {
        resultImage = "./img/male_child.png"; // Adjust based on context
        feedbackMessage = "Strong signs of ADHD; consult a pediatrician, psychologist, or psychiatrist for a detailed evaluation.";
    }

    // Display the result
    resultText.innerHTML = `
        <img src="${resultImage}" alt="Result Image" style="width: 100%; max-width: 300px; margin-bottom: 20px;">
        <h2>Quiz Result</h2>
        <p>Your child scored <strong>${yesCount}</strong> Yes answers.</p>
        <p><strong>${feedbackMessage}</strong></p>
        <p>Child Name: ${formData.childName}</p>
        <p>Age: ${formData.childAge}</p>
        <p>City: ${formData.city}</p>
    `;
    resetButton.classList.remove("hidden"); // Show Reset button after result
}

  // Collect Form Data
  function getFormData() {
    const childName = document.getElementById("childName").value;
    const childAge = document.getElementById("childAge").value;
    const childGender = document.getElementById("childGender").value;
    const parentPhone = document.getElementById("parentPhone").value;
    const parentEmail = document.getElementById("parentEmail").value;
    const city = document.getElementById("city").value;

    return {
      childName,
      childAge,
      childGender,
      parentPhone,
      parentEmail,
      city,
    };
  }

  // Attach event listener to the form
  document.getElementById("userForm").addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent default form submission

    // Get the form data
    const formData = getFormData();

    // Show the result after collecting form data
    showResult(formData);
  });

  // Reset Quiz
  resetButton.addEventListener("click", () => {
    currentQuestion = 0;
    yesCount = 0;
    loadQuiz();
    updateProgress();
    resultContainer.classList.add("hidden");
    quizContainer.classList.remove("hidden");
    resetButton.classList.add("hidden");
  });

  // Event listeners for Yes and No buttons
  yesButton.addEventListener("click", () => handleAnswer("yes"));
  noButton.addEventListener("click", () => handleAnswer("no"));

  // Load Quiz and Initialize Progress Bar
  loadQuiz();
  updateProgress();
});