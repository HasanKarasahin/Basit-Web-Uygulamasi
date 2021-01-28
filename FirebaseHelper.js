
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

    let frm_ogr_isim= isEmpty(getValueWithId("frm_ogr_isim"));
    let frm_ogr_soyisim=isEmpty(getValueWithId("frm_ogr_soyisim"));

    if(frm_ogr_isim && frm_ogr_soyisim){
        
        let ogrenci1=new Ogrenci(frm_ogr_isim,frm_ogr_soyisim);

        let key = db.ref().child("Ogrenci").push().key;
    
        db.ref("Ogrenci/"+key).set(ogrenci1);

        if($('.alert').hasClass('alert-success')){
            let count = parseInt($('.alert').attr("data-add-count"));
            $('.alert').text('Veri eklendi x'+count);
            $('.alert').attr("data-add-count",count+1);
        }else{
            $('.alert').removeClass('alert-danger')
            .addClass('alert-success')
            .text("Veri eklendi")
            .attr("data-add-count",2);
        }
        
       
    }else{
        $('.alert').removeClass('alert-success')
        .addClass('alert-danger')
        .text("Veriler Boş olamaz.")
        .show();
    }
    
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
    ref.on('value',gotData,errData) 

    function gotData(data){
        
        tbl.innerHTML="";
		var sayac=1;
        data.forEach(element => {
            console.log(element.ref.path.pieces_[1]);
            addRow(element,sayac++);
        });

    }

    function errData(err){
        console.log(err);
    }

}

function addRow(element,sayac){

    var tr = tbl.insertRow();
    //TO-DO sayac yerine ogrenci_id gelicek
    ref=element.ref.path.pieces_[1]
    tr.setAttribute("data-id",ref);

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


