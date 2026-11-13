"use strict";   // slide 51 et 141

// Tableau d'objets "persons" : chaque objet a un nom, un prénom et des points
// (tableaux : slide 38, objets : slide 39, tableau d'objets : slide 40)
let persons = [
    { nom: "nom-1", prenom: "prenom-1", points: 5 },
    { nom: "nom-2", prenom: "prenom-2", points: 10 },
    { nom: "nom-3", prenom: "prenom-3", points: 15 }
];

// Compteur de lignes insérées (sert au numéro N°) ; let : slides 37 et 51
let lignes = 0;

let total_points = 0;      // slides 37 et 51

/**
 * Insère une nouvelle ligne <tr> à la fin du tableau.
 * Paramètres : num, nom, prenom, points
 */
function doInsertRowTable(num, nom, prenom, points) {      // fonction avec paramètres : slide 45

    // Récupérer l'élément tableau : getElementsByTagName renvoie une collection, on prend [0]
    // (slides 66 à 69)
    const table = document.getElementsByTagName("table")[0];

    // Créer un élément <tr> : createElement (slide 104)
    const row = document.createElement("tr");

    // Affecter la classe "row" à la ligne avec setAttribute (slides 106-107)
    row.setAttribute("class", "row");

    // Créer les 5 colonnes <td> (slide 104)
    const col1 = document.createElement("td");
    const col2 = document.createElement("td");
    const col3 = document.createElement("td");
    const col4 = document.createElement("td");
    const col5 = document.createElement("td");

    // Remplir le contenu de chaque colonne avec innerText (slides 90-91)
    col1.innerText = num;
    col2.innerText = nom;
    col3.innerText = prenom;
    col4.innerText = points;

    // Dernière colonne : un <input type="checkbox"> créé puis ajouté avec appendChild (slides 103-104)
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");              // slides 106-107
    col5.appendChild(checkbox);

    // Affecter les classes CSS de chaque colonne (slides 106-107)
    col1.setAttribute("class", "col_number");
    col2.setAttribute("class", "col_text");
    col3.setAttribute("class", "col_text");
    col4.setAttribute("class", "col_number");
    col5.setAttribute("class", "col_chkbox");

    // Ajouter les colonnes à la ligne avec append() (slides 96 à 98)
    row.append(col1, col2, col3, col4, col5);

    // Ajouter la ligne au tableau (slides 103-104)
    table.append(row);
}

function doInsert(nom, prenom, points) {
    lignes++;                              // slide 41
    total_points += Number(points);        // slides 41 et 31
    doInsertRowTable(lignes, nom, prenom, points);
    update_summary();
}

/**
 * update_summary() : met à jour l'espace "Résumé" (nombre de lignes, total des points).
 */
function update_summary() {
    // getElementById (slides 62-64) + innerText (slides 90-91)
    document.getElementById("p1").innerText = lignes + " ligne(s)";
    document.getElementById("p3").innerText = "Total point(s)= " + total_points;
}

/**
 * doNewData() : lit les champs de saisie, insère dans le tableau HTML ET dans "persons",
 * puis vide les champs. Vérifie qu'aucun champ n'est vide.
 */
function doNewData() {
    // 1. Lire les valeurs : getElementById (slides 62-64) + attribut "value" (slides 92-93)
    const nom = document.getElementById("form_nom").value;
    const prenom = document.getElementById("form_prenom").value;
    const points = document.getElementById("form_points").value;

    // 2. Saisie contrôlée : if + comparaison stricte === (slides 41, 42 et 141)
    if (nom === "" || prenom === "" || points === "") {
        alert("Veuillez remplir tous les champs !");      // alert : slides 34 et 116
        return;
    }

    // 3. Insérer la ligne dans le tableau HTML
    doInsert(nom, prenom, points);

    // 4. Insérer aussi dans le tableau "persons" : push (slide 38).
    //    Number(points) car la valeur d'un input est du texte (slide 31)
    persons.push({ nom: nom, prenom: prenom, points: Number(points) });

    // 5. Vider les champs pour une nouvelle saisie (propriété value, slides 92-93)
    document.getElementById("form_nom").value = "";
    document.getElementById("form_prenom").value = "";
    document.getElementById("form_points").value = "";
}

/**
 * deleteRow() : supprime les lignes dont la case est cochée.
 */
function deleteRow() {

    // Étape 1 : si le tableau est vide, on affiche une alerte et on sort (slides 42 et 116)
    if (lignes === 0) {
        alert("Le tableau est vide !");
        return;
    }

    // Étape 2 : récupérer le tableau et les checkbox cochées.
    // querySelector = version "un seul élément" de querySelectorAll (slides 76 à 78).
    // On cible les checkbox à l'intérieur de .col_chkbox avec un sélecteur CSS.
    const table = document.querySelector("table");
    const checked = table.querySelectorAll(".col_chkbox input:checked");

    // Étape 3 : aucune checkbox cochée ? (collection : propriété length, slide 44)
    if (checked.length === 0) {
        alert("Sélectionnez au moins une ligne !");
        return;
    }

    // Étape 4 : confirmation (confirm() est une pop-up comme alert/prompt, slide 116)
    if (!confirm("Voulez-vous vraiment supprimer " + checked.length + " ligne(s) ?")) {
        return;        // l'utilisateur a cliqué sur "Annuler"
    }

    // Étape 5 : récupérer toutes les lignes de données (classe "row", posée à l'étape 2)
    const rows = table.querySelectorAll("tr.row");

    // Étape 6 : parcourir les lignes (boucle for, slides 44 et 80 à 83)
    const indexes_a_supprimer = [];            // positions des lignes supprimées dans "persons"
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        const checkbox = row.querySelector(".col_chkbox input");   // slides 76-78

        if (checkbox.checked) {                // propriété "checked" : accès direct à un attribut (slides 92-93)
            // valeur des points = 4e cellule (children : slides 88-89 ; innerText : slides 90-91)
            const points = Number(row.children[3].innerText);

            total_points -= points;            // -= (slide 41)
            lignes--;                          // slide 41
            row.remove();                      // supprimer la ligne du DOM (slide 100)
            indexes_a_supprimer.push(i);       // push (slide 38)
        }
    }

    // Supprimer les mêmes entrées dans "persons" : filter + fonction fléchée (slides 38 et 46)
    persons = persons.filter((person, index) => !indexes_a_supprimer.includes(index));  // includes : slide 38

    // Bonus : renuméroter la colonne N° pour ne pas avoir de trous (1, 3, 4...)
    const rest = table.querySelectorAll("tr.row");
    rest.forEach((row, index) => {             // forEach : slide 44
        row.children[0].innerText = index + 1;
    });

    // Étape 7 : message de succès + mise à jour du résumé
    alert("Suppression effectuée avec succès !");
    update_summary();
}

/**
 * init() : parcourt "persons" et appelle doInsert pour chaque objet.
 */
function init() {
    // Les 3 lignes écrites en dur dans le HTML (classe "static") ne servent que d'aperçu
    // quand JavaScript est désactivé ; on les enlève avant de remplir depuis "persons".
    // querySelectorAll + forEach (slides 76-78 et 44), remove() (slide 100)
    document.querySelectorAll("tr.static").forEach(row => row.remove());

    // Boucle for...of (slide 44) ; destructuration de l'objet (slides 38-39)
    for (const person of persons) {
        const { nom, prenom, points } = person;
        doInsert(nom, prenom, points);
    }
}

/**
 * consoleTableau() : affiche le contenu du tableau "persons" dans la console
 * (console.log : slide 33 ; événement onclick : slides 129 à 135).
 */
function consoleTableau() {
    console.log(persons);
}

init();
