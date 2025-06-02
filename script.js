// DOM Elements
const categoryButtons = document.querySelectorAll(".category-btn");
const subCategoryButtons = document.querySelectorAll(".sub-category-btn");
const calculatorSections = document.querySelectorAll(".calculator-section");
const calculatorsContainers = document.querySelectorAll(
  ".calculators-container"
);
const calculatorDisplay = document.getElementById("calculator-content");

// Event Listeners for Category Buttons
categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    categoryButtons.forEach((btn) => btn.classList.remove("active"));
    // Add active class to clicked button
    button.classList.add("active");

    // Show the corresponding calculator section
    const category = button.getAttribute("data-category");
    calculatorSections.forEach((section) => {
      section.classList.remove("active");
      if (section.id === `${category}-calculators`) {
        section.classList.add("active");
      }
    });
  });
});

// Event Listeners for Sub-Category Buttons
subCategoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Find parent section to only affect buttons within that section
    const parentSection = button.closest(".calculator-section");
    const sectionSubButtons =
      parentSection.querySelectorAll(".sub-category-btn");

    // Remove active class from all buttons in this section
    sectionSubButtons.forEach((btn) => btn.classList.remove("active"));
    // Add active class to clicked button
    button.classList.add("active");

    // Show the corresponding calculators container
    const subcategory = button.getAttribute("data-subcategory");
    const containers = parentSection.querySelectorAll(".calculators-container");
    containers.forEach((container) => {
      container.classList.remove("active");
      if (container.id === `${subcategory}-calculators`) {
        container.classList.add("active");
      }
    });
  });
});

// Calculator data - This stores all our calculators
const calculators = {
  math: {
    percentage: [
      {
        id: "percentage-calculator",
        name: "Percentage Calculator",
        emoji: "📊",
        description: "Calculate percentages easily",
        generateHTML: function () {
          return `
                                <h2><span class="emoji">📊</span> Percentage Calculator</h2>
                                <p>Calculate what percent one number is of another, or find a percentage of a number.</p>
                                
                                <div class="calculator-form">
                                    <div class="form-group">
                                        <label for="percent-value">Value:</label>
                                        <input type="number" id="percent-value" placeholder="Enter value">
                                    </div>
                                    <div class="form-group">
                                        <label for="percent-percentage">Percentage (%):</label>
                                        <input type="number" id="percent-percentage" placeholder="Enter percentage">
                                    </div>
                                    <button id="calculate-percentage" class="calculate-btn">Calculate</button>
                                    <div id="percentage-result" class="result" style="display:none;"></div>
                                </div>
                            `;
        },
        attachEvents: function () {
          document
            .getElementById("calculate-percentage")
            .addEventListener("click", function () {
              const value = parseFloat(
                document.getElementById("percent-value").value
              );
              const percentage = parseFloat(
                document.getElementById("percent-percentage").value
              );
              const resultDiv = document.getElementById("percentage-result");

              if (isNaN(value) || isNaN(percentage)) {
                resultDiv.innerHTML = "Please enter valid numbers";
                resultDiv.style.display = "block";
                return;
              }

              const result = (value * percentage) / 100;
              resultDiv.innerHTML = `${percentage}% of ${value} = ${result.toFixed(
                2
              )}`;
              resultDiv.style.display = "block";
            });
        },
      },
      {
        id: "percent-error-calculator",
        name: "Percent Error Calculator",
        emoji: "🔍",
        description:
          "Calculate the percent error between measured and actual values",
        generateHTML: function () {
          return `
                                <h2><span class="emoji">🔍</span> Percent Error Calculator</h2>
                                <p>Calculate the percentage error between a measured value and the actual value.</p>
                                
                                <div class="calculator-form">
                                    <div class="form-group">
                                        <label for="actual-value">Actual Value:</label>
                                        <input type="number" id="actual-value" placeholder="Enter actual value">
                                    </div>
                                    <div class="form-group">
                                        <label for="measured-value">Measured Value:</label>
                                        <input type="number" id="measured-value" placeholder="Enter measured value">
                                    </div>
                                    <button id="calculate-percent-error" class="calculate-btn">Calculate</button>
                                    <div id="percent-error-result" class="result" style="display:none;"></div>
                                </div>
                            `;
        },
        attachEvents: function () {
          document
            .getElementById("calculate-percent-error")
            .addEventListener("click", function () {
              const actualValue = parseFloat(
                document.getElementById("actual-value").value
              );
              const measuredValue = parseFloat(
                document.getElementById("measured-value").value
              );
              const resultDiv = document.getElementById("percent-error-result");

              if (isNaN(actualValue) || isNaN(measuredValue)) {
                resultDiv.innerHTML = "Please enter valid numbers";
                resultDiv.style.display = "block";
                return;
              }

              if (actualValue === 0) {
                resultDiv.innerHTML = "Actual value cannot be zero";
                resultDiv.style.display = "block";
                return;
              }

              const percentError =
                Math.abs((measuredValue - actualValue) / actualValue) * 100;
              resultDiv.innerHTML = `Percent Error: ${percentError.toFixed(
                2
              )}%`;
              resultDiv.style.display = "block";
            });
        },
      },
      {
        id: "time-percentage-calculator",
        name: "Time Percentage Calculator",
        emoji: "⏱️",
        description: "Calculate percentage of time elapsed or remaining",
        generateHTML: function () {
          return `
                                <h2><span class="emoji">⏱️</span> Time Percentage Calculator</h2>
                                <p>Calculate the percentage of time elapsed or remaining.</p>
                                
                                <div class="calculator-form">
                                    <div class="form-group">
                                        <label for="total-time">Total Time (minutes):</label>
                                        <input type="number" id="total-time" placeholder="Enter total time">
                                    </div>
                                    <div class="form-group">
                                        <label for="elapsed-time">Elapsed Time (minutes):</label>
                                        <input type="number" id="elapsed-time" placeholder="Enter elapsed time">
                                    </div>
                                    <button id="calculate-time-percentage" class="calculate-btn">Calculate</button>
                                    <div id="time-percentage-result" class="result" style="display:none;"></div>
                                </div>
                            `;
        },
        attachEvents: function () {
          document
            .getElementById("calculate-time-percentage")
            .addEventListener("click", function () {
              const totalTime = parseFloat(
                document.getElementById("total-time").value
              );
              const elapsedTime = parseFloat(
                document.getElementById("elapsed-time").value
              );
              const resultDiv = document.getElementById(
                "time-percentage-result"
              );

              if (isNaN(totalTime) || isNaN(elapsedTime)) {
                resultDiv.innerHTML = "Please enter valid numbers";
                resultDiv.style.display = "block";
                return;
              }

              if (totalTime <= 0) {
                resultDiv.innerHTML = "Total time must be greater than zero";
                resultDiv.style.display = "block";
                return;
              }

              if (elapsedTime < 0 || elapsedTime > totalTime) {
                resultDiv.innerHTML =
                  "Elapsed time must be between 0 and total time";
                resultDiv.style.display = "block";
                return;
              }

              const percentageElapsed = (elapsedTime / totalTime) * 100;
              const percentageRemaining = 100 - percentageElapsed;

              let result = `<strong>Percentage Elapsed:</strong> ${percentageElapsed.toFixed(
                2
              )}%<br>`;
              result += `<strong>Percentage Remaining:</strong> ${percentageRemaining.toFixed(
                2
              )}%<br>`;

              resultDiv.innerHTML = result;
              resultDiv.style.display = "block";
            });
        },
      },
      // Add more percentage calculators here
    ],
    algebra: [
      {
        id: "quadratic-equation-calculator",
        name: "Quadratic Equation Calculator",
        emoji: "📈",
        description: "Solve quadratic equations in the form ax² + bx + c = 0",
        generateHTML: function () {
          return `
                                <h2><span class="emoji">📈</span> Quadratic Equation Calculator</h2>
                                <p>Solve quadratic equations in the form ax² + bx + c = 0.</p>
                                
                                <div class="calculator-form">
                                    <div class="form-group">
                                        <label for="quad-a">a:</label>
                                        <input type="number" id="quad-a" placeholder="Enter coefficient a">
                                    </div>
                                    <div class="form-group">
                                        <label for="quad-b">b:</label>
                                        <input type="number" id="quad-b" placeholder="Enter coefficient b">
                                    </div>
                                    <div class="form-group">
                                        <label for="quad-c">c:</label>
                                        <input type="number" id="quad-c" placeholder="Enter coefficient c">
                                    </div>
                                    <button id="calculate-quadratic" class="calculate-btn">Solve</button>
                                    <div id="quadratic-result" class="result" style="display:none;"></div>
                                </div>
                            `;
        },
        attachEvents: function () {
          document
            .getElementById("calculate-quadratic")
            .addEventListener("click", function () {
              const a = parseFloat(document.getElementById("quad-a").value);
              const b = parseFloat(document.getElementById("quad-b").value);
              const c = parseFloat(document.getElementById("quad-c").value);
              const resultDiv = document.getElementById("quadratic-result");

              if (isNaN(a) || isNaN(b) || isNaN(c)) {
                resultDiv.innerHTML = "Please enter valid coefficients";
                resultDiv.style.display = "block";
                return;
              }

              if (a === 0) {
                resultDiv.innerHTML =
                  "This is not a quadratic equation (a = 0)";
                resultDiv.style.display = "block";
                return;
              }

              const discriminant = b * b - 4 * a * c;
              let result = "";

              if (discriminant > 0) {
                const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
                const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
                result = `Two real solutions:<br>x₁ = ${x1.toFixed(
                  4
                )}<br>x₂ = ${x2.toFixed(4)}`;
              } else if (discriminant === 0) {
                const x = -b / (2 * a);
                result = `One real solution (double root):<br>x = ${x.toFixed(
                  4
                )}`;
              } else {
                const realPart = -b / (2 * a);
                const imaginaryPart =
                  Math.sqrt(Math.abs(discriminant)) / (2 * a);
                result = `Two complex solutions:<br>x₁ = ${realPart.toFixed(
                  4
                )} + ${imaginaryPart.toFixed(4)}i<br>x₂ = ${realPart.toFixed(
                  4
                )} - ${imaginaryPart.toFixed(4)}i`;
              }

              resultDiv.innerHTML = result;
              resultDiv.style.display = "block";
            });
        },
      },
      {
        id: "discriminant-calculator",
        name: "Discriminant Calculator",
        emoji: "🔍",
        description: "Calculate the discriminant of a quadratic equation",
        generateHTML: function () {
          return `
                                <h2><span class="emoji">🔍</span> Discriminant Calculator</h2>
                                <p>Calculate the discriminant of a quadratic equation: b² - 4ac.</p>
                                
                                <div class="calculator-form">
                                    <div class="form-group">
                                        <label for="disc-a">a:</label>
                                        <input type="number" id="disc-a" placeholder="Enter coefficient a">
                                    </div>
                                    <div class="form-group">
                                        <label for="disc-b">b:</label>
                                        <input type="number" id="disc-b" placeholder="Enter coefficient b">
                                    </div>
                                    <div class="form-group">
                                        <label for="disc-c">c:</label>
                                        <input type="number" id="disc-c" placeholder="Enter coefficient c">
                                    </div>
                                    <button id="calculate-discriminant" class="calculate-btn">Calculate</button>
                                    <div id="discriminant-result" class="result" style="display:none;"></div>
                                </div>
                            `;
        },
        attachEvents: function () {
          document
            .getElementById("calculate-discriminant")
            .addEventListener("click", function () {
              const a = parseFloat(document.getElementById("disc-a").value);
              const b = parseFloat(document.getElementById("disc-b").value);
              const c = parseFloat(document.getElementById("disc-c").value);
              const resultDiv = document.getElementById("discriminant-result");

              if (isNaN(a) || isNaN(b) || isNaN(c)) {
                resultDiv.innerHTML = "Please enter valid coefficients";
                resultDiv.style.display = "block";
                return;
              }

              const discriminant = b * b - 4 * a * c;
              let result = `Discriminant (b² - 4ac) = ${discriminant}<br><br>`;

              if (discriminant > 0) {
                result += "The quadratic equation has two distinct real roots.";
              } else if (discriminant === 0) {
                result += "The quadratic equation has one repeated real root.";
              } else {
                result += "The quadratic equation has two complex roots.";
              }

              resultDiv.innerHTML = result;
              resultDiv.style.display = "block";
            });
        },
      },
      // Add more algebra calculators here
    ],
    arithmetic: [
      {
        id: "arithmetic-sequence-calculator",
        name: "Arithmetic Sequence Calculator",
        emoji: "🔢",
        description: "Calculate terms and sum of an arithmetic sequence",
        generateHTML: function () {
          return `
                                <h2><span class="emoji">🔢</span> Arithmetic Sequence Calculator</h2>
                                <p>Calculate terms and sum of an arithmetic sequence.</p>
                                
                                <div class="calculator-form">
                                    <div class="form-group">
                                        <label for="first-term">First Term (a₁):</label>
                                        <input type="number" id="first-term" placeholder="Enter first term">
                                    </div>
                                    <div class="form-group">
                                        <label for="common-difference">Common Difference (d):</label>
                                        <input type="number" id="common-difference" placeholder="Enter common difference">
                                    </div>
                                    <div class="form-group">
                                        <label for="n-terms">Number of Terms (n):</label>
                                        <input type="number" id="n-terms" placeholder="Enter number of terms">
                                    </div>
                                    <button id="calculate-arithmetic" class="calculate-btn">Calculate</button>
                                    <div id="arithmetic-result" class="result" style="display:none;"></div>
                                </div>
                            `;
        },
        attachEvents: function () {
          document
            .getElementById("calculate-arithmetic")
            .addEventListener("click", function () {
              const a1 = parseFloat(
                document.getElementById("first-term").value
              );
              const d = parseFloat(
                document.getElementById("common-difference").value
              );
              const n = parseInt(document.getElementById("n-terms").value);
              const resultDiv = document.getElementById("arithmetic-result");

              if (isNaN(a1) || isNaN(d) || isNaN(n)) {
                resultDiv.innerHTML = "Please enter valid numbers";
                resultDiv.style.display = "block";
                return;
              }

              if (n <= 0 || !Number.isInteger(n)) {
                resultDiv.innerHTML =
                  "Number of terms must be a positive integer";
                resultDiv.style.display = "block";
                return;
              }

              // Calculate the nth term
              const an = a1 + (n - 1) * d;

              // Calculate the sum of n terms
              const sum = (n / 2) * (a1 + an);

              let result = `<strong>nth Term (a<sub>n</sub>):</strong> ${an.toFixed(
                2
              )}<br>`;
              result += `<strong>Sum of ${n} terms:</strong> ${sum.toFixed(
                2
              )}<br><br>`;

              // Show the first few terms (up to 10)
              const termsToShow = Math.min(n, 10);
              result += `<strong>First ${termsToShow} terms:</strong><br>`;
              for (let i = 0; i < termsToShow; i++) {
                const term = a1 + i * d;
                result += `a<sub>${i + 1}</sub> = ${term.toFixed(2)}`;
                if (i < termsToShow - 1) {
                  result += ", ";
                }
              }

              resultDiv.innerHTML = result;
              resultDiv.style.display = "block";
            });
        },
      },
      {
        id: "factorial-calculator",
        name: "Factorial Calculator",
        emoji: "🔄",
        description: "Calculate the factorial of a number (n!)",
        generateHTML: function () {
          return `
                                <h2><span class="emoji">🔄</span> Factorial Calculator</h2>
                                <p>Calculate the factorial of a non-negative integer n (n!).</p>
                                
                                <div class="calculator-form">
                                    <div class="form-group">
                                        <label for="factorial-n">n:</label>
                                        <input type="number" id="factorial-n" placeholder="Enter a non-negative integer" min="0" step="1">
                                    </div>
                                    <button id="calculate-factorial" class="calculate-btn">Calculate</button>
                                    <div id="factorial-result" class="result" style="display:none;"></div>
                                </div>
                            `;
        },
        attachEvents: function () {
          document
            .getElementById("calculate-factorial")
            .addEventListener("click", function () {
              const n = parseInt(document.getElementById("factorial-n").value);
              const resultDiv = document.getElementById("factorial-result");

              if (isNaN(n) || n < 0 || !Number.isInteger(n)) {
                resultDiv.innerHTML = "Please enter a non-negative integer";
                resultDiv.style.display = "block";
                return;
              }

              // Calculate factorial
              let factorial = 1;
              for (let i = 2; i <= n; i++) {
                factorial *= i;
                // Check for overflow
                if (!isFinite(factorial)) {
                  resultDiv.innerHTML = "Result is too large to display";
                  resultDiv.style.display = "block";
                  return;
                }
              }

              resultDiv.innerHTML = `${n}! = ${factorial}`;
              resultDiv.style.display = "block";
            });
        },
      },
      // Add more arithmetic calculators here
    ],
  },
  physics: {
    kinematics: [
      {
        id: "projectile-motion-calculator",
        name: "Projectile Motion Calculator",
        emoji: "🚀",
        description: "Calculate projectile motion parameters",
        generateHTML: function () {
          return `
                                <h2><span class="emoji">🚀</span> Projectile Motion Calculator</h2>
                                <p>Calculate key parameters of projectile motion.</p>
                                
                                <div class="calculator-form">
                                    <div class="form-group">
                                        <label for="initial-velocity">Initial Velocity (m/s):</label>
                                        <input type="number" id="initial-velocity" placeholder="Enter initial velocity">
                                    </div>
                                    <div class="form-group">
                                        <label for="launch-angle">Launch Angle (degrees):</label>
                                        <input type="number" id="launch-angle" placeholder="Enter angle" min="0" max="90">
                                    </div>
                                    <div class="form-group">
                                        <label for="initial-height">Initial Height (m):</label>
                                        <input type="number" id="initial-height" placeholder="Enter initial height" value="0">
                                    </div>
                                    <button id="calculate-projectile" class="calculate-btn">Calculate</button>
                                    <div id="projectile-result" class="result" style="display:none;"></div>
                                </div>
                            `;
        },
        attachEvents: function () {
          document
            .getElementById("calculate-projectile")
            .addEventListener("click", function () {
              const v0 = parseFloat(
                document.getElementById("initial-velocity").value
              );
              const angleInDegrees = parseFloat(
                document.getElementById("launch-angle").value
              );
              const h0 = parseFloat(
                document.getElementById("initial-height").value
              );
              const resultDiv = document.getElementById("projectile-result");

              if (isNaN(v0) || isNaN(angleInDegrees) || isNaN(h0)) {
                resultDiv.innerHTML = "Please enter valid numbers";
                resultDiv.style.display = "block";
                return;
              }

              // Convert angle to radians
              const angle = (angleInDegrees * Math.PI) / 180;

              // Gravitational acceleration
              const g = 9.8; // m/s²

              // Initial velocity components
              const v0x = v0 * Math.cos(angle);
              const v0y = v0 * Math.sin(angle);

              // Time to reach maximum height
              const timeToMax = v0y / g;

              // Maximum height
              const maxHeight =
                h0 + v0y * timeToMax - 0.5 * g * timeToMax * timeToMax;

              // Time of flight (time to return to initial height)
              const timeOfFlight =
                (v0y + Math.sqrt(v0y * v0y + 2 * g * h0)) / g;

              // Range (horizontal distance)
              const range = v0x * timeOfFlight;

              let result = `<strong>Maximum Height:</strong> ${maxHeight.toFixed(
                2
              )} m<br>`;
              result += `<strong>Time to Max Height:</strong> ${timeToMax.toFixed(
                2
              )} s<br>`;
              result += `<strong>Time of Flight:</strong> ${timeOfFlight.toFixed(
                2
              )} s<br>`;
              result += `<strong>Range:</strong> ${range.toFixed(2)} m<br>`;

              resultDiv.innerHTML = result;
              resultDiv.style.display = "block";
            });
        },
      },
      {
        id: "free-fall-calculator",
        name: "Free Fall Calculator",
        emoji: "🍎",
        description: "Calculate parameters for objects in free fall",
        generateHTML: function () {
          return `
                                <h2><span class="emoji">🍎</span> Free Fall Calculator</h2>
                                <p>Calculate parameters for objects falling under gravity (ignoring air resistance).</p>
                                
                                <div class="calculator-form">
                                    <div class="form-group">
                                        <label for="free-fall-height">Height (m):</label>
                                        <input type="number" id="free-fall-height" placeholder="Enter initial height">
                                    </div>
                                    <div class="form-group">
                                        <label for="gravity-value">Gravitational Acceleration (m/s²):</label>
                                        <input type="number" id="gravity-value" placeholder="Enter g value" value="9.8">
                                    </div>
                                    <button id="calculate-free-fall" class="calculate-btn">Calculate</button>
                                    <div id="free-fall-result" class="result" style="display:none;"></div>
                                </div>
                            `;
        },
        attachEvents: function () {
          document
            .getElementById("calculate-free-fall")
            .addEventListener("click", function () {
              const height = parseFloat(
                document.getElementById("free-fall-height").value
              );
              const gravity = parseFloat(
                document.getElementById("gravity-value").value
              );
              const resultDiv = document.getElementById("free-fall-result");

              if (isNaN(height) || isNaN(gravity)) {
                resultDiv.innerHTML = "Please enter valid numbers";
                resultDiv.style.display = "block";
                return;
              }

              if (height < 0) {
                resultDiv.innerHTML = "Height must be non-negative";
                resultDiv.style.display = "block";
                return;
              }

              if (gravity <= 0) {
                resultDiv.innerHTML =
                  "Gravitational acceleration must be positive";
                resultDiv.style.display = "block";
                return;
              }

              // Time to reach the ground
              const time = Math.sqrt((2 * height) / gravity);

              // Final velocity when reaching the ground
              const finalVelocity = gravity * time;

              let result = `<strong>Time to Fall:</strong> ${time.toFixed(
                2
              )} seconds<br>`;
              result += `<strong>Final Velocity:</strong> ${finalVelocity.toFixed(
                2
              )} m/s<br>`;

              resultDiv.innerHTML = result;
              resultDiv.style.display = "block";
            });
        },
      },
      // Add more kinematics calculators here
    ],
    dynamics: [
      {
        id: "force-calculator",
        name: "Force Calculator",
        emoji: "💪",
        description: "Calculate force using Newton's Second Law: F = ma",
        generateHTML: function () {
          return `
                                <h2><span class="emoji">💪</span> Force Calculator</h2>
                                <p>Calculate force using Newton's Second Law: F = ma.</p>
                                
                                <div class="calculator-form">
                                    <div class="form-group">
                                        <label for="mass">Mass (kg):</label>
                                        <input type="number" id="mass" placeholder="Enter mass">
                                    </div>
                                    <div class="form-group">
                                        <label for="acceleration">Acceleration (m/s²):</label>
                                        <input type="number" id="acceleration" placeholder="Enter acceleration">
                                    </div>
                                    <button id="calculate-force" class="calculate-btn">Calculate</button>
                                    <div id="force-result" class="result" style="display:none;"></div>
                                </div>
                            `;
        },
        attachEvents: function () {
          document
            .getElementById("calculate-force")
            .addEventListener("click", function () {
              const mass = parseFloat(document.getElementById("mass").value);
              const acceleration = parseFloat(
                document.getElementById("acceleration").value
              );
              const resultDiv = document.getElementById("force-result");

              if (isNaN(mass) || isNaN(acceleration)) {
                resultDiv.innerHTML = "Please enter valid numbers";
                resultDiv.style.display = "block";
                return;
              }

              const force = mass * acceleration;
              resultDiv.innerHTML = `Force (F) = ${force.toFixed(
                2
              )} Newtons (N)`;
              resultDiv.style.display = "block";
            });
        },
      },
      {
        id: "gravitational-force-calculator",
        name: "Gravitational Force Calculator",
        emoji: "🌍",
        description: "Calculate the gravitational force between two masses",
        generateHTML: function () {
          return `
                                <h2><span class="emoji">🌍</span> Gravitational Force Calculator</h2>
                                <p>Calculate the gravitational force between two masses using Newton's Law of Universal Gravitation.</p>
                                
                                <div class="calculator-form">
                                    <div class="form-group">
                                        <label for="mass1">Mass 1 (kg):</label>
                                        <input type="number" id="mass1" placeholder="Enter mass 1">
                                    </div>
                                    <div class="form-group">
                                        <label for="mass2">Mass 2 (kg):</label>
                                        <input type="number" id="mass2" placeholder="Enter mass 2">
                                    </div>
                                    <div class="form-group">
                                        <label for="distance">Distance between masses (m):</label>
                                        <input type="number" id="distance" placeholder="Enter distance">
                                    </div>
                                    <button id="calculate-gravity" class="calculate-btn">Calculate</button>
                                    <div id="gravity-result" class="result" style="display:none;"></div>
                                </div>
                            `;
        },
        attachEvents: function () {
          document
            .getElementById("calculate-gravity")
            .addEventListener("click", function () {
              const mass1 = parseFloat(document.getElementById("mass1").value);
              const mass2 = parseFloat(document.getElementById("mass2").value);
              const distance = parseFloat(
                document.getElementById("distance").value
              );
              const resultDiv = document.getElementById("gravity-result");

              if (isNaN(mass1) || isNaN(mass2) || isNaN(distance)) {
                resultDiv.innerHTML = "Please enter valid numbers";
                resultDiv.style.display = "block";
                return;
              }

              if (mass1 <= 0 || mass2 <= 0) {
                resultDiv.innerHTML = "Masses must be positive";
                resultDiv.style.display = "block";
                return;
              }

              if (distance <= 0) {
                resultDiv.innerHTML = "Distance must be positive";
                resultDiv.style.display = "block";
                return;
              }

              // Gravitational constant G
              const G = 6.6743e-11; // N⋅m²/kg²

              // Calculate gravitational force
              const force = (G * (mass1 * mass2)) / (distance * distance);

              // Format in scientific notation for very small values
              let formattedForce;
              if (force < 0.01) {
                formattedForce = force.toExponential(4);
              } else {
                formattedForce = force.toFixed(10);
              }

              resultDiv.innerHTML = `Gravitational Force = ${formattedForce} Newtons (N)`;
              resultDiv.style.display = "block";
            });
        },
      },
      // Add more dynamics calculators here
    ],
  },
};

// Function to generate calculator cards for a specific category
function generateCalculatorCards(category, subcategory) {
  const container = document.getElementById(`${subcategory}-calculators`);
  const calculatorList = calculators[category][subcategory];

  let cardsHTML = "";
  calculatorList.forEach((calc) => {
    cardsHTML += `
                    <div class="calculator-card" data-calculator="${calc.id}">
                        <h3><span class="emoji">${calc.emoji}</span> ${calc.name}</h3>
                        <p>${calc.description}</p>
                    </div>
                `;
  });

  container.innerHTML = cardsHTML;

  // Add click event listeners to the cards
  container.querySelectorAll(".calculator-card").forEach((card) => {
    card.addEventListener("click", () => {
      const calculatorId = card.getAttribute("data-calculator");
      showCalculator(category, subcategory, calculatorId);
    });
  });
}

// Function to show a specific calculator
function showCalculator(category, subcategory, calculatorId) {
  const calculatorList = calculators[category][subcategory];
  const calculator = calculatorList.find((calc) => calc.id === calculatorId);

  if (calculator) {
    calculatorDisplay.innerHTML = calculator.generateHTML();
    calculator.attachEvents();
  }
}

// Initialize the calculator cards
function initializeCalculators() {
  // Generate calculator cards for all categories
  for (const category in calculators) {
    for (const subcategory in calculators[category]) {
      generateCalculatorCards(category, subcategory);
    }
  }
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", initializeCalculators);
