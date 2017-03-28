//window.addEventListener('click', newTab);
//document.getElementsByTagName('body')[0].style.backgroundColor = localStorage['couleur'];

//saluer();
/*if (localStorage['decompte']) //si le compte à rebours existe
    document.write('Il te reste ' + localStorage['decompte'] + ' secondes');*/ //on affiche à l'emplacement exacte du script
if (localStorage['decompte']) //si le compte à rebours existe
    document.write('Il te reste ' + localStorage['decompte'] + ' secondes'); //on affiche à l'emplacement exacte du script

//window.addEventListener('load', checkUserLogged);

var ongl = document.getElementById("btn");
if (ongl)
    ongl.addEventListener("click", newTab);

function newTab(fenetre, tab) { //check sur quelle page nous sommes si c'est youtube la dupliquer sinon alert l'url de la page
    if (!fenetre) // premier appel : aucun paramètre existant
    {
        chrome.windows.getLastFocused(function(fenetre) { newTab(fenetre); }); //on demande la fenêtre visible
    } else {
        if (!tab) // deuxième appel : 1 paramètre existant (fenetre)
        {
            chrome.tabs.getSelected(fenetre.id, function(tab) { newTab(fenetre, tab); }); //on demande la fenêtre visible, et on appelle la fonction une deuxième fois
        } else // troisième appel : 2 paramètres existants (fenetre et tab)
        {
            url = tab.url;
            if (url.indexOf("youtube") != -1) {
                //chrome.tabs.create({ url: tab.url });
                takePhoto(tab, null /*tab, tab.url*/ );
            } else
                alert("tab.url" + tab.url);
        }
    }
}

function takePhoto(tab, adresse) { // l'adresse est l'url de la tab a screenshot 
    if (!adresse) {
        chrome.tabs.captureVisibleTab(tab.windowId, null, function(adresse) { takePhoto(tab, adresse); });
    } else {
        document.getElementById("conteneur").innerHTML = '<img src="' + adresse + '" alt="riendutout"/>';
    }
}


//media player https://developers.google.com/youtube/js_api_reference?hl=fr