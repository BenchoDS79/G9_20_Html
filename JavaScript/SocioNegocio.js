var UrlGetSociosNegocio = 'http://localhost:90/G9_20/SociosNegocio/controller/Socios_negocio.php?op=GetSociosNegocio';
var UrlInsertSocioNegocio = 'http://localhost:90/G9_20/SociosNegocio/controller/Socios_negocio.php?op=InsertSocioNegocio';
var UrlGetSocioNegocio = 'http://localhost:90/G9_20/SociosNegocio/controller/Socios_negocio.php?op=GetUno';
var UrlUpdateSocioNegocio = 'http://localhost:90/G9_20/SociosNegocio/controller/Socios_negocio.php?op=UpdateSocioNegocio';
var UrlDeleteSocioNegocio = 'http://localhost:90/G9_20/SociosNegocio/controller/Socios_negocio.php?op=DeleteSocioNegocio';



$(document).ready(function(){
    CargarSociosNegocios();
});

function CargarSociosNegocios(){
    $.ajax({
        url:UrlGetSociosNegocio,
        type:'GET',
        datatype:'JSON',
        success: function(response){
            var MiItems = response;
            var valores = '';

            for(i=0; i< MiItems.length; i++){
                valores += '<tr>'+
                '<td>'+MiItems[i].ID+'</td>'+
                '<td>'+MiItems[i].NOMBRE+'</td>'+
                '<td>'+MiItems[i].RAZON_SOCIAL+'</td>'+
                '<td>'+MiItems[i].DIRECCION+'</td>'+
                '<td>'+MiItems[i].TIPO_SOCIO+'</td>'+
                '<td>'+MiItems[i].CONTACTO+'</td>'+
                '<td>'+MiItems[i].EMAIL+'</td>'+
                '<td>'+MiItems[i].FECHA_CREADO+'</td>'+
                '<td>'+MiItems[i].ESTADO+'</td>'+
                '<td>'+MiItems[i].TELEFONO+'</td>'+
                '<td>'+
                '<button class="btn btn-outline-info" onclick="cargarSocioNegocio('+MiItems[i].ID+')">Editar</button>'+
                '<button class="btn btn-outline-danger" onclick="EliminarSocioNegocio('+MiItems[i].ID+')">Eliminar</button>'+
                '</td>'+
            '</tr>';
            $('.SociosNegocio').html(valores);
            }
        } 
    });
}

function AgregarSociosNegocios(){
    var datosSocioNegocio = {
        id: $('#ID').val(),
        nombre: $('#NOMBRE').val(),
        razon_social: $('#RAZON_SOCIAL').val(),
        direccion: $('#DIRECCION').val(),
        tipo_socio: $('#TIPO_SOCIO').val(),
        contacto: $('#CONTACTO').val(),
        email: $('#EMAIL').val(),
        fecha_creado: $('#FECHA_CREADO').val(),
        estado: $('#ESTADO').val(),
        telefono: $('#TELEFONO').val()
    };

    var datosSocioNegociojson= JSON.stringify(datosSocioNegocio);

    $.ajax({
        url:UrlInsertSocioNegocio,
        type:'POST',
        data:datosSocioNegociojson, 
        datatype:'JSON',
        contentType: 'application/json', 
        success: function(response){
            console.log (response);
        } 
    });
    alert("Socio Negocio agregado");
}

function cargarSocioNegocio(idsn){
    var datosSocioNegocio={
        id:idsn
    };
    var datosSocioNegociojson = JSON.stringify(datosSocioNegocio);

    $.ajax({
        url: UrlGetSocioNegocio,
        type: 'POST',
        data: datosSocioNegociojson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            var MiItems = response;
            $('#NOMBRE').val(MiItems[0].NOMBRE);
            $('#RAZON_SOCIAL').val(MiItems[0].RAZON_SOCIAL);
            $('#DIRECCION').val(MiItems[0].DIRECCION);
            $('#TIPO_SOCIO').val(MiItems[0].TIPO_SOCIO);
            $('#CONTACTO').val(MiItems[0].CONTACTO);
            $('#EMAIL').val(MiItems[0].EMAIL);
            $('#FECHA_CREADO').val(MiItems[0].FECHA_CREADO);
            $('#ESTADO').val(MiItems[0].ESTADO);
            $('#TELEFONO').val(MiItems[0].TELEFONO);

            var btnactualizar = '<input type="submit" id="btn_actualizar" onclick="ActualizarSocioNegocio('+MiItems[0].ID+')"' +
                'value="Actualizar Socio Negocio" class="btn btn-primary"></input>';
            $('.btnagregar').html(btnactualizar);
        }
    });
}

function ActualizarSocioNegocio(idsn) {
    var datosSocioNegocio={
        id:idsn,
        nombre: $('#NOMBRE').val(),
        razon_social: $('#RAZON_SOCIAL').val(),
        direccion: $('#DIRECCION').val(),
        tipo_socio: $('#TIPO_SOCIO').val(),
        contacto: $('#CONTACTO').val(),
        email: $('#EMAIL').val(),
        fecha_creado: $('#FECHA_CREADO').val(),
        estado: $('#ESTADO').val(),
        telefono: $('#TELEFONO').val()
    };


    var datosSocioNegociojson= JSON.stringify(datosSocioNegocio);

    $.ajax({
        url: UrlUpdateSocioNegocio,
        type: 'PUT',
        data: datosSocioNegociojson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function (response) {
            console.log(response);
        }
    });
    alert("Socio Negocio Actualizado");
}

function EliminarSocioNegocio(IDsocio){
    var datosSocioNegocio={
        id:IDsocio
    };
    var datosSocioNegociojson = JSON.stringify(datosSocioNegocio);

    $.ajax({
        url: UrlDeleteSocioNegocio,
        type:'DELETE',
        data:datosSocioNegociojson,
        datatype:'JSON',
        contentType:'application/json',
        success: function(response){
            console.log(response);
        }
    });

    alert("Socio Negocio Borrado");
}