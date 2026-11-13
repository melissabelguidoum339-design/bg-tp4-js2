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

/**
 * doInsert(nom, prenom, points) : insère une ligne en tenant compte du compteur "lignes".
 */
function doInsert(nom, prenom, points) {
    // lignes++ : opérateur d'incrémentation (slide 41)
    lignes++;
    // Appelle doInsertRowTable avec les paramètres appropriés (le N° = lignes)
    doInsertRowTable(lignes, nom, prenom, points);
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

// Au chargement : le script est à la fin du <body>, le tableau existe déjà (slides 26-27)
init();
