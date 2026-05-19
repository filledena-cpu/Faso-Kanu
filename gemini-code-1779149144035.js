// --- 1. COMPTEUR D'ENGAGEMENT ---
const boutonEngager = document.getElementById('btn-engager');
const affichageCompteur = document.getElementById('compteur');
let nombreEngagements = 0;

boutonEngager.addEventListener('click', function() {
    nombreEngagements++;
    affichageCompteur.textContent = nombreEngagements;
    boutonEngager.textContent = "Merci pour ton engagement ! 🇲🇱";
    boutonEngager.disabled = true;
});


// --- 2. GESTION DU QUIZ ET DU SCORE ---
let score = 0;
const affichageScore = document.getElementById('valeur-score');
const feedbackQuiz = document.getElementById('feedback-quiz');

function actualiserScore() {
    affichageScore.textContent = score;
}

// Validation Question 1
function verifierQ1(boutonChoisi, estCorrect) {
    // Désactiver tous les boutons de la question 1 pour bloquer le choix
    const boutonsQ1 = document.querySelectorAll('.q1');
    boutonsQ1.forEach(btn => btn.disabled = true);

    if (estCorrect) {
        score++;
        actualiserScore();
        boutonChoisi.style.backgroundColor = "#A5D6A7"; // Vert clair pour succès
        feedbackQuiz.textContent = "Correct ! Le Vert symbolise l'agriculture et les forêts du Mali.";
        feedbackQuiz.style.color = "var(--couleur-vert)";
    } else {
        boutonChoisi.style.backgroundColor = "#EF9A9A"; // Rouge clair pour erreur
        feedbackQuiz.textContent = "Faux pour la Q1. La première couleur est le Vert.";
        feedbackQuiz.style.color = "var(--couleur-rouge)";
    }
}

// Validation Question 2
function verifierQ2(boutonChoisi, estCorrect) {
    // Désactiver tous les boutons de la question 2
    const boutonsQ2 = document.querySelectorAll('.q2');
    boutonsQ2.forEach(btn => btn.disabled = true);

    if (estCorrect) {
        score++;
        actualiserScore();
        boutonChoisi.style.backgroundColor = "#A5D6A7";
        feedbackQuiz.textContent = "Excellent ! La devise est bien : Un Peuple, Un But, Une Foi.";
        feedbackQuiz.style.color = "var(--couleur-vert)";
    } else {
        boutonChoisi.style.backgroundColor = "#EF9A9A";
        feedbackQuiz.textContent = "Dommage ! La bonne devise est : Un Peuple, Un But, Une Foi.";
        feedbackQuiz.style.color = "var(--couleur-rouge)";
    }
}


// --- 3. GESTION DU FORMULAIRE DE PROJETS ---
const formulaire = document.getElementById('form-projet');
const messageFormulaire = document.getElementById('message-formulaire');

formulaire.addEventListener('submit', function(evenement) {
    // Empêcher la page de se recharger lors de l'envoi du formulaire
    evenement.preventDefault();

    // Récupérer les valeurs écrites par l'utilisateur
    const nom = document.getElementById('nom-citoyen').value;
    const projet = document.getElementById('texte-projet').value;

    // Afficher le message de confirmation
    messageFormulaire.innerHTML = `Merci <strong>${nom}</strong> ! Votre idée ("<em>${projet}</em>") a bien été simulée. C'est ensemble que nous construirons le Mali de demain !`;

    // Réinitialiser (vider) les champs du formulaire
    formulaire.reset();
});