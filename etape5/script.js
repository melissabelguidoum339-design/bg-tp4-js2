"use strict";   // slide 51 et 141

// Tableau d'objets "persons" : chaque objet a un nom, un prénom et des points
// (tableaux : slide 38, objets : slide 39, tableau d'objets : slide 40)
let persons = [
    { nom: "nom-1", prenom: "prenom-1", points: 5 },
    { nom: "nom-2", prenom: "prenom-2", points: 10 },
    { nom: "nom-3", prenom: "prenom-3", points: 15 },
    { nom: "nom-4", prenom: "prenom-4", points: 20 }
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
