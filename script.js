const btnImperial = document.querySelector('.radioImperial');
const btnMetric = document.querySelector('.radioMetric');


btnImperial.addEventListener('click', () => {
    const inputType = document.querySelector('.inputType');
    inputType.style.display = 'none';
    const inputImperial = document.querySelector('.inputImperial');
    inputImperial.style.display = 'flex';
})

btnMetric.addEventListener('click', () => {
    const inputType = document.querySelector('.inputType');
    inputType.style.display = 'flex';
    const inputImperial = document.querySelector('.inputImperial');
    inputImperial.style.display = 'none';
})



const metricRadio = document.getElementById("metric");
const imperialRadio = document.getElementById("imperial");
const heightInputMetric = document.getElementById("height-input");
const weightInputMetric = document.getElementById("weight-input");
const heightInputFt = document.getElementById("height-input-ft");
const heightInputIn = document.getElementById("height-input-in");
const weightInputSt = document.getElementById("weight-input-st");
const weightInputLbs = document.getElementById("weight-input-lbs");
const bmiText = document.querySelector(".bmi-number");
const calculatorEmpty = document.querySelector(".calculator-empty");
const calculatorResult = document.querySelector(".calculator-result"); 
const resultDescription = document.querySelector(".result-description");

// Fonction pour activer/désactiver les inputs
function toggleInputs() {
    const isMetric = metricRadio.checked;
    heightInputMetric.disabled = !isMetric;
    weightInputMetric.disabled = !isMetric;
    heightInputFt.disabled = isMetric;
    heightInputIn.disabled = isMetric;
    weightInputSt.disabled = isMetric;
    weightInputLbs.disabled = isMetric;
}

// Fonction pour calculer l'IMC en unités métriques
function calculateMetricBMI() {
    const height = parseFloat(heightInputMetric.value) / 100; 
    const weight = parseFloat(weightInputMetric.value);
    if (height && weight) {
        const bmi = weight / (height * height);
        
        // Calculer le poids idéal
        const idealWeightLower = 18.5 * (height * height);
        const idealWeightUpper = 24.9 * (height * height);
        
        displayBMIResult(bmi, idealWeightLower, idealWeightUpper);
    }
}

// Fonction pour calculer l'IMC en unités impériales
function calculateImperialBMI() {
    const heightFt = parseFloat(heightInputFt.value) || 0;
    const heightIn = parseFloat(heightInputIn.value) || 0;
    const weightSt = parseFloat(weightInputSt.value) || 0;
    const weightLbs = parseFloat(weightInputLbs.value) || 0;
    
    const heightInches = heightFt * 12 + heightIn; 
    const weightPounds = weightSt * 14 + weightLbs;
    if (heightInches && weightPounds) {
        const bmi = (weightPounds / (heightInches * heightInches)) * 703;
        
        // Calculer le poids idéal
        const idealWeightLower = 18.5 * ((heightInches * 0.0254) * (heightInches * 0.0254));
        const idealWeightUpper = 24.9 * ((heightInches * 0.0254) * (heightInches * 0.0254)); 
        
        displayBMIResult(bmi, idealWeightLower, idealWeightUpper);
    }
}

// Afficher le résultat de l'IMC
function displayBMIResult(bmi, idealWeightLower, idealWeightUpper) {
    bmiText.textContent = bmi.toFixed(1); 
    calculatorEmpty.style.display = "none";
    calculatorResult.style.display = "flex";
    resultDescription.style.display = "flex";

    // Remplacement du texte pour chaque plage de BMI
    if (bmi < 18.5) {
        resultDescription.innerHTML = `<p>Your BMI suggests you’re underweight. Your ideal weight is between ${idealWeightLower.toFixed(1)}kg - ${idealWeightUpper.toFixed(1)}kg.</p>`;
    } else if (bmi < 24.9) {
        resultDescription.innerHTML = `<p>Your BMI suggests you’re a healthy weight. Your ideal weight is between ${idealWeightLower.toFixed(1)}kg - ${idealWeightUpper.toFixed(1)}kg.</p>`;
    } else if (bmi < 29.9) {
        resultDescription.innerHTML = `<p>Your BMI suggests you’re overweight. Your ideal weight is between ${idealWeightLower.toFixed(1)}kg - ${idealWeightUpper.toFixed(1)}kg.</p>`;
    } else {
        resultDescription.innerHTML = `<p>Your BMI suggests you’re obese. Your ideal weight is between ${idealWeightLower.toFixed(1)}kg - ${idealWeightUpper.toFixed(1)}kg.</p>`;
    }

    // Rafraîchir la page après 10 secondes
    setTimeout(() => {
        location.reload();
    }, 20000);
}

// Gérer les changements d'unités
metricRadio.addEventListener("change", function() {
    toggleInputs();
    if (metricRadio.checked) {
        calculateMetricBMI();
    }
});

imperialRadio.addEventListener("change", function() {
    toggleInputs();
    if (imperialRadio.checked) {
        calculateImperialBMI();
    }
});

// Ajouter les événements d'écoute aux champs de saisie
heightInputMetric.addEventListener("input", calculateMetricBMI);
weightInputMetric.addEventListener("input", calculateMetricBMI);
heightInputFt.addEventListener("input", calculateImperialBMI);
heightInputIn.addEventListener("input", calculateImperialBMI);
weightInputSt.addEventListener("input", calculateImperialBMI);
weightInputLbs.addEventListener("input", calculateImperialBMI);

// Désactiver les inputs au départ
toggleInputs();
