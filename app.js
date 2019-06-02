function alertShow(mesaj){
    alert(mesaj);
}

function btnClick(){
    addRow();
}

function addRow(){

    var tbl=document.getElementById("myTable");

    var tr = tbl.insertRow();

    var tdSira=tr.insertCell();
    var tdIsim=tr.insertCell();
    var tdSoyisim=tr.insertCell();

    

    tdSira.appendChild(document.createTextNode("1"));
    tdIsim.appendChild(document.createTextNode(frm_ogr_isim.value));
    tdSoyisim.appendChild(document.createTextNode(frm_ogr_soyisim.value));

    

    tr.appendChild(tdSira);
    tr.appendChild(tdIsim);
    tr.appendChild(tdSoyisim);

    table.appendChild(tr);

}