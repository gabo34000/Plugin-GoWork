var include = function(url, callback) {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = url + '?' + (new Date().getTime());
    if (callback) {
        script.onreadystatechange = callback;
        script.onload = script.onreadystatechange;
    }
    document.getElementsByTagName('head')[0].appendChild(script);
}


var tabUrl = [];
var urls = "";
var PrevTab = "";
var t = "";

function newTab(fenetre, tab) {
    t = "";
    if (!fenetre) {
        chrome.windows.getLastFocused(function(fenetre) { newTab(fenetre); });
    } else {
        if (!tab) {
            chrome.tabs.getSelected(fenetre.id, function(tab) {
                newTab(fenetre, tab);
            });
        } else { //parsing pour découper l'url jusqu'au .fr, .com ou .eu
            url = tab.url;
            if (tab.url.indexOf(".com") > 0) {
                var nb = tab.url.indexOf(".com");
                t = tab.url.substring(0, nb + 4);
                alert("t " + t);
            } else if (tab.url.indexOf(".eu") > 0) {
                var nb = tab.url.indexOf(".eu");
                t = tab.url.substring(0, nb + 3);
                alert("t " + t);
            } else if (tab.url.indexOf(".fr") > 0) {
                var nb = tab.url.indexOf(".fr");
                t = tab.url.substring(0, nb + 3);
                alert("t " + t);
            } else {
                alert(tab.url);
            }
            //            tabUrl.push(t);
            alert(tabUrl[tabUrl.length - 1]);
            if (tabUrl.length != 0) {
                alert("tab +");
                if (tabUrl[tabUrl.length - 1] == t) {
                    alert("il ya qq chose");
                    //                localStorage['cpt'] = 60;
                } else {
                    alert("else push");
                    tabUrl.push(t);
                    localStorage['cpt'] = 20;
                }
            } else {
                alert("First url");
                tabUrl.push(t);
                localStorage['cpt'] = 20;
                //              aler("clear interval");
                //                clearInterval(rpt);
            }

            // checkHowManyTimes() elle va checker combien de temps l'utilisateur reste sur la page
        }
    }
}

//localStorage['cpt'] = 20;


function cpt() //appellée toute les 2 secondes
{
    localStorage['cpt'] = parseInt(localStorage['cpt']) - 2; // -2 car c'est toutes les 2 secondes
    if (parseInt(localStorage['cpt']) <= 0) {
        alert("cpt fini " + t + "!");
        if (tabUrl[tabUrl.length - 1] == t)
            alert("GO TO WORK !!!");
        //clearInterval(rpt); //on arrète le compte à rebours 
        //        newTab();
    }
}
var rpt = setInterval(cpt, 2000); //toutes les 2 secondes -> ne pas surcharger le navigateur




function takePhoto(tab, adresse) { // l'adresse est l'url de la tab a screenshot 
    if (!adresse) {
        chrome.tabs.captureVisibleTab(tab.windowId, null, function(adresse) { takePhoto(tab, adresse); });
    } else {
        for (var i = 0; i < tabUrl.length; i++) {
            urls += tabUrl[i] + " | ";
        }
        alert(urls);
        /*include('email.min.js', function() {
  (function(){
      emailjs.init("user_gSnxY79VNXbW9BTkqdrcr");
   })();
   alert("je passe dans l'envoi de mail");
    emailjs.send("gmail","template_zYaTm7RR",{
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
})*/
        tabUrl = [];
    }
}

localStorage['decompte'] = 10; //15*60 secondes <=> 15 minutes
function decompter() //appellée toute les 2 secondes
{
    localStorage['decompte'] = parseInt(localStorage['decompte']) - 2; // -2 car c'est toutes les 2 secondes
    if (parseInt(localStorage['decompte']) <= 0) {
        //clearInterval(repetition); //on arrète le compte à rebours 
        newTab();
        localStorage['decompte'] = 10;
    }
}
var repetition = setInterval(decompter, 2000); //toutes les 2 secondes -> ne pas surcharger le navigateur