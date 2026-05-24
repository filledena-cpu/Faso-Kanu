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
    // --- 2. GESTION DU QUIZ, DU SCORE ET DES BADGES ---
let score = 0;
let questionsRepondues = 0; // Nouvelle variable pour suivre la progression

const affichageScore = document.getElementById('valeur-score');
const feedbackQuiz = document.getElementById('feedback-quiz');

function actualiserScore() {
    affichageScore.textContent = score;
}

// Fonction clé : Vérifier si le quiz est fini et attribuer le badge
function verifierFinDuQuiz() {
    questionsRepondues++;

    // Si l'utilisateur a répondu aux 2 questions
    if (questionsRepondues === 2) {
        // Créer un nouvel élément HTML <div> pour le badge
        const divBadge = document.createElement('div');
        divBadge.classList.add('badge-citoyen');

        // Structure conditionnelle (if/else) pour attribuer le badge selon le score
        if (score === 2) {
            divBadge.style.backgroundColor = "var(--couleur-vert)";
            divBadge.style.color = "white";
            divBadge.innerHTML = "🏆 Statut : Citoyen Patriote 🇲🇱";
            feedbackQuiz.textContent = "Parfait ! Tu connais parfaitement les symboles de la patrie !";
        } else {
            divBadge.style.backgroundColor = "var(--couleur-jaune)";
            divBadge.style.color = "var(--texte-sombre)";
            divBadge.innerHTML = "🌱 Statut : Futur Citoyen En Apprentissage";
            feedbackQuiz.textContent = "Le score n'est pas maximal, mais chaque jour est une opportunité d'apprendre pour le pays !";
        }

        // Ajouter le badge juste en dessous du feedback textuel
        feedbackQuiz.appendChild(document.createElement('br'));
        feedbackQuiz.appendChild(divBadge);
    }
}

// Validation Question 1
function verifierQ1(boutonChoisi, estCorrect) {
    const boutonsQ1 = document.querySelectorAll('.q1');
    boutonsQ1.forEach(btn => btn.disabled = true);

    if (estCorrect) {
        score++;
        actualiserScore();
        boutonChoisi.style.backgroundColor = "#A5D6A7";
    } else {
        boutonChoisi.style.backgroundColor = "#EF9A9A";
    }
    
    // Lancer la vérification de fin de quiz
    verifierFinDuQuiz();
}

// Validation Question 2
function verifierQ2(boutonChoisi, estCorrect) {
    const boutonsQ2 = document.querySelectorAll('.q2');
    boutonsQ2.forEach(btn => btn.disabled = true);

    if (estCorrect) {
        score++;
        actualiserScore();
        boutonChoisi.style.backgroundColor = "#A5D6A7";
    } else {
        boutonChoisi.style.backgroundColor = "#EF9A9A";
    }
    
    // Lancer la vérification de fin de quiz
    verifierFinDuQuiz();
}
});







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
// --- 4. FONCTIONS DE RÉINITIALISATION (RESET) ---

// Sélection du bouton de nettoyage des projets
const btnNettoyerProjets = document.getElementById('btn-nettoyer-projets');

// Écouteur pour vider le stockage local des projets
btnNettoyerProjets.addEventListener('click', function() {
    // Confirmer l'action auprès de l'utilisateur
    if (confirm("Es-tu sûr de vouloir effacer toutes les idées enregistrées sur cet appareil ?")) {
        // 1. Supprimer la clé spécifique dans le localStorage
        localStorage.removeItem('listeProjets');
        
        // 2. Mettre à jour l'affichage immédiatement
        afficherLesProjets();
    }
});

// Fonction pour réinitialiser le Quiz (à appeler pour recommencer)
function reinitialiserLeQuiz() {
    score = 0;
    questionsRepondues = 0;
    affichageScore.textContent = score;
    feedbackQuiz.textContent = "";
    
    // Vider le conteneur HTML et regénérer les boutons actifs
    conteneurQuiz.innerHTML = "";
    genererQuiz();
}
