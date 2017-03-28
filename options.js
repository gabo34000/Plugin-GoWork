var include = function(url, callback){
 
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

include('email.min.js', function() {
  (function(){
      emailjs.init("user_gSnxY79VNXbW9BTkqdrcr");
   })();
    emailjs.send("gmail","template_zYaTm7RR",{
  name: "James", 
  notes: "Check this out!",
  message: "testz"
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