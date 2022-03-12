//var urlAPI='https://sstec-mst.co:3000'; //Prod: ':5161' Iceberg. ':5262' Adispetrol , Dev: 'http://192.168.80.250:1337'
var urlAPI= 'https://compras.sstec-mst.co'; 
// var urlSoap= 'http://localhost/consola.sstec.com.co/WStim.asmx';
var urlSoap= 'https://cpk.com.co/WStim.asmx'  //"https://cpk.com.co/WStim.asmx";// https://www.iceberg.net.co/WStim.asmx https://adispetrol.net.co/WStim.asmx

var datosCliente={
    razon:'SERVICIO ESPECIALIZADO DE TRANSPORTE DE CARGA ADISPETROL S.A.',
    nit:'Nit. 860.054.978-1',
    direccion:'PARQUE INDUSTRIAL SANTO DOMINGO MOSQUERA - CUNDINAMARCA - COLOMBIA',
    telefono:'PBX 2673838 CEL: 317 637 2367',
}


function SoapMsg(IdFnc,Pmrts,OnSuc,OnErr) {
    var cia= localStorage.getItem('Ubicacion')//PROD: Iceberg o CPK; DEV: Compras
    var user=typeof(_UsrLog)==='undefined'? 'diegoc':_UsrLog;
    var FncPmrts = Pmrts;
    FncPmrts += FncPmrts.indexOf('<Usr>')>-1?'':'<Usr>'+user+'</Usr>';
    FncPmrts += FncPmrts.indexOf('<Cia>')>-1?'': '<Cia>'+cia+'</Cia>';
    var BodyMessage ='<?xml version="1.0" encoding="utf-8"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema"><soap:Body><' + IdFnc +' xmlns="http://tempuri.org/">' + FncPmrts + '</' + IdFnc +'></soap:Body></soap:Envelope>';
   
        CallSvr(BodyMessage,IdFnc,OnSuc,OnErr);

    //console.log(BodyMessage);
    //console.log(IdFnc);
        
}

function CallSvr(SoapMess,Fnc,OnSuc,OnErr) {
    $.ajax({
        type: "POST",
        url: urlSoap,
        contentType: "text/xml",
        crossDomain: true,
        data: SoapMess,
        dataType: "xml",
        processData: false,
     
        beforeSend: function(xhr) {
            xhr.setRequestHeader(
                    "SOAPTarget",
                    urlSoap
                    );
            xhr.setRequestHeader(
                    "SOAPAction",
                    "http://tempuri.org/" + Fnc
                    );
        },
        success: OnSuc,
        error: OnErr
    });


}
