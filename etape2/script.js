"use strict";   // mode strict : signale les variables non déclarées (slide 51 et 141)

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
