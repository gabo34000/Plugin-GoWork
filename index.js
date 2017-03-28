if (localStorage['decompte']) //si le compte à rebours existe
    document.write('Il te reste ' + localStorage['decompte'] + ' secondes'); //on affiche à l'emplacement exacte du script

var ongl = document.getElementById("btn");
if (ongl)
    ongl.addEventListener("click", newTab);

function newTab(fenetre, tab) {
    document.location.href = "./options.html";
}