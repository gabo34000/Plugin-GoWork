if (localStorage['decompte']) //si le compte à rebours existe
    document.write('Il te reste ' + localStorage['decompte'] + ' secondes'); //on affiche à l'emplacement exacte du script

var ongl = document.getElementById("btn");
if (ongl)
    ongl.addEventListener("click", newTab);

var time = document.getElementById("timer");
if (time)
    time.addEventListener("click", Timer);

function Timer() {
    alert(document.getElementById("time").value);
    localStorage['timer'] = document.getElementById("time").value;
}

function newTab(fenetre, tab) {
    document.location.href = "./index.html";
}