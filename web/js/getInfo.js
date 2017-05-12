
//Fill the language options
function getLanguage() {
  
  var URL = 'https://en.wikipedia.org/w/api.php?action=query&meta=siteinfo&siprop=languages&origin=*&format=json'

  fetch(URL).then(function(respuesta) {
      return respuesta.json();

    }).then(function(data) {

      var lg = document.getElementById('language');
      var lgs = data.query.languages

      for(var i = 0; i < lgs.length; i++) {

        if(lgs[i].code == 'es' || lgs[i].code == 'en' || lgs[i].code == 'ko' || lgs[i].code == 'de' || lgs[i].code == 'ar' || lgs[i].code == 'pt' || lgs[i].code == 'it' || lgs[i].code == 'ru' || lgs[i].code == 'ja' || lgs[i].code == 'hi') {
          
          var opt = document.createElement('option');
          opt.innerHTML = lgs[i]['*'];
          opt.value = lgs[i].code;

          if(i==0)
            opt.selectedIndex = true

          lg.appendChild(opt);

        }
      }

    }).catch(function(error) {
      console.log('Error: ' + error);
    });
}

//Search the wiki content
function getInfo(){

    getLanguage();

    var title = document.getElementById('title');
    var titlesearch = document.getElementById('titlesearch').value;
    var content = document.getElementById('content');
    var languageselect = document.getElementById('language')
    var language = languageselect.options[languageselect.selectedIndex].value;
    var api = 'https://' + language + '.wikipedia.org/w/api.php?';

    var URL = api + 'action=opensearch&search=' + titlesearch + '&origin=*'

    fetch(URL).then(function(respuesta) {
      return respuesta.json();

    }).then(function(data) {

      //Fill data
      title.innerHTML = data[0]
      content.innerHTML = data[2]

      //If mobile close menu
      if(top.isMobile.mobilecheck()) {
        search.classList.add('invisible')
      }

      if(content.innerHTML=="" || content.innerHTML==undefined)
        content.innerHTML = '404: Not found.'

    }).catch(function(error) {
      console.log('Error: ' + error);
    });
}

document.getElementById("btnsearch").onclick =  getInfo;
window.onload = getLanguage;