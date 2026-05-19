// --- 1. COMPTEUR D'ENGAGEMENT ---
const boutonEngager = document.getElementById('btn-engager');
// --- 3. GESTION DU FORMULAIRE ET STOCKAGE LOCAL ---
const formulaire = document.getElementById('form-projet');
const messageFormulaire = document.getElementById('message-formulaire');
const listeProjetsAffichage = document.getElementById('liste-projets');

// Étape A : Fonction pour afficher les projets à l'écran
function afficherLesProjets() {
    // Vider la liste actuelle pour éviter les doublons d'affichage
    listeProjetsAffichage.innerHTML = "";
    
    // Récupérer les projets dans le localStorage (ou créer un tableau vide si rien n'existe)
    let projetsEnregistres = JSON.parse(localStorage.getItem('listeProjets')) || [];
    
    // Parcourir le tableau et créer un élément de liste HTML pour chaque projet
    projetsEnregistres.forEach(function(item) {
        const li = document.createElement('li');
        li.style.marginBottom = "10px";
        li.innerHTML = `<strong>${item.auteur}</strong> : ${item.texte}`;
        listeProjetsAffichage.appendChild(li);
    });
}

// Étape B : Écouter la soumission du formulaire
formulaire.addEventListener('submit', function(evenement) {
    evenement.preventDefault();

    const nom = document.getElementById('nom-citoyen').value;
    const projet = document.getElementById('texte-projet').value;

    // 1. Récupérer le tableau existant depuis le localStorage
    let projetsEnregistres = JSON.parse(localStorage.getItem('listeProjets')) || [];
    
    // 2. Ajouter le nouveau projet sous forme d'objet au tableau
    projetsEnregistres.push({ auteur: nom, texte: projet });
    
    // 3. Sauvegarder le tableau mis à jour dans le localStorage (conversion en texte JSON obligatoire)
    localStorage.setItem('listeProjets', JSON.stringify(projetsEnregistres));

    // 4. Mettre à jour l'affichage et réinitialiser le formulaire
    messageFormulaire.innerHTML = "Votre idée a été enregistrée avec succès !";
    formulaire.reset();
    afficherLesProjets(); 
});

// Étape C : Charger et afficher automatiquement les projets dès l'ouverture de la page
afficherLesProjets();
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
