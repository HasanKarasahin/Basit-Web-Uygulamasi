
var firebaseConfig = {
    apiKey: "AIzaSyDW2i1MENzPH9enR4oYfzmgfIrZ3ZlwuoM",
    authDomain: "webprojesi-a7400.firebaseapp.com",
    databaseURL: "https://webprojesi-a7400.firebaseio.com",
    projectId: "webprojesi-a7400",
    storageBucket: "webprojesi-a7400.appspot.com",
    messagingSenderId: "683562127976",
    appId: "1:683562127976:web:b3f49334bb9ea70d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

db = firebase.database();

function ogrenciEkle(){

    var frm_ogr_isim= document.getElementById("frm_ogr_isim");
    var frm_ogr_soyisim=document.getElementById("frm_ogr_soyisim");

    var ogrenci1=new Ogrenci(frm_ogr_isim.value,frm_ogr_soyisim.value);

    var key = db.ref().child("Ogrenci").push().key;

    db.ref("Ogrenci/"+key).set(ogrenci1);

    frm_ogr_isim.value="";
    frm_ogr_soyisim.value="";
}

var tbl=document.getElementById("myTable");

class Ogrenci{
    constructor(isim,soyIsmi){
        this._isim=isim;
        this._soyIsim=soyIsmi;
    }

    get isim(){
        return this._isim;
    }

    get soyIsim(){
        return this._soyIsim;
    }
}

function ogrenciListener(){

    var ref = db.ref("Ogrenci");
    var sayac=1;
    ref.on('value',gotData,errData) 

    function gotData(data){
        
        tbl.innerHTML="";
        data.forEach(element => {
            console.log(element.val()._isim);
            addRow(element,sayac++);
        });

    }

    function errData(err){
        console.log(err);
    }

}

function addRow(element,sayac){

   

    var tr = tbl.insertRow();

    var tdSira=tr.insertCell();
    var tdIsim=tr.insertCell();
    var tdSoyisim=tr.insertCell();

    tdSira.appendChild(document.createTextNode(sayac));
    tdIsim.appendChild(document.createTextNode(element.val()._isim));
    tdSoyisim.appendChild(document.createTextNode(element.val()._soyIsim));

    tr.appendChild(tdSira);
    tr.appendChild(tdIsim);
    tr.appendChild(tdSoyisim);

    tbl.appendChild(tr);
}


