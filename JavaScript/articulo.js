var UrlGetArticulos = 'http://34.68.196.220:90/G9_20/Articulos/controller/articulos.php?opcion=GetArticulos';
var UrlPostArticulo = 'http://34.68.196.220:90/G9_20/Articulos/controller/Articulos.php?opcion=InsertArticulo';

var UrlGetUno = 'http://34.68.196.220:90/G9_20/Articulos/controller/Articulos.php?opcion=GetUno';
var UrlPutArticulo = 'http://34.68.196.220:90/G9_20/Articulos/controller/Articulos.php?opcion=UpdateArticulo';
var UrlDeleteArticulo = 'http://34.68.196.220:90/G9_20/Articulos/controller/Articulos.php?opcion=DeleteArticulo';

$(Document).ready(function(){
    CargarArticulos();
});

function CargarArticulos(){
    $.ajax({
        url: UrlGetArticulos,
        type: 'GET',
        datatype: 'JSON',
        success: function(response){
            var MiItems = response;
            var Valores ='';

            for(i=0; i < MiItems.length ; i++){
                Valores += '<tr>'+
                '<td>'+MiItems[i].Id+'</td>'+
                '<td>'+MiItems[i].Descripcion+'</td>'+
                '<td>'+MiItems[i].Unidad+'</td>'+
                '<td>'+MiItems[i].Costo+'</td>'+
                '<td>'+MiItems[i].Precio+'</td>'+
                '<td>'+MiItems[i].Aplica_ISV+'</td>'+
                '<td>'+MiItems[i].Porcentaje_ISV+'</td>'+
                '<td>'+MiItems[i].Estado+'</td>'+
                '<td>'+MiItems[i].Id_socio+'</td>'+
                '<td>'+
                '<button class="btn btn-outline-warning" onclick="CargarArticulo('+MiItems[i].Id+')">Editar</button>'+
                '<button class="btn btn-danger" onclick="EliminarArticulo('+MiItems[i].Id+')">Eliminar</button>'+
                '</td>'+
              +'</tr>';              
              $('.articulos').html(Valores);
            }
        }
    });
}

function AgregarArticulo(){
    var datosarticulo = {
        Descripcion: $('#Descripcion').val(),
        Unidad: $('#Unidad').val(),
        Costo: $('#Costo').val(),
        Precio: $('#Precio').val(),
        Aplica_ISV: $('#Aplica_ISV').val(),
        Porcentaje_ISV: $('#Porcentaje_ISV').val(),
        Estado: $('#Estado').val(),
        Id_socio: $('#Id_socio').val()
    };
    var datosarticulojson = JSON.stringify(datosarticulo);
    
    $.ajax({
        url: UrlPostArticulo,
        type: 'POST',
        data: datosarticulojson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            console.log(response);
        }
    });
    alert("Articulo Agregado");
}

function CargarArticulo(IdArticulo){
    var datosarticulo = {
        id: IdArticulo
    };
    var datosarticulojson = JSON.stringify(datosarticulo);

    $.ajax({
        url: UrlGetUno,
        type: 'POST',
        data: datosarticulojson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            var MiItems = response;
            $('#Descripcion').val(MiItems[0].Descripcion);
            $('#Unidad').val(MiItems[0].Unidad);
            $('#Costo').val(MiItems[0].Costo);
            $('#Precio').val(MiItems[0].Precio);
            $('#Aplica_ISV').val(MiItems[0].Aplica_ISV);
            $('#Porcentaje_ISV').val(MiItems[0].Porcentaje_ISV);
            $('#Estado').val(MiItems[0].Estado);
            $('#Id_socio').val(MiItems[0].Id_socio);
            var btnactualizar = '<input type="submit" id="btn_actualizar" onclick="ActualizarArticulo('+MiItems[0].Id+')" value="Actualizar Articulo" class="btn btn-primary"></input>';
            $('.btnagregar').html(btnactualizar);
        }
    });
}

function ActualizarArticulo(IdArticulo){
    var datosarticulo ={
        id: IdArticulo,
        Descripcion: $('#Descripcion').val(),
        Unidad: $('#Unidad').val(),
        Costo: $('#Costo').val(),
        Precio: $('#Precio').val(),
        Aplica_ISV: $('#Aplica_ISV').val(),
        Porcentaje_ISV: $('#Porcentaje_ISV').val(),
        Estado: $('#Estado').val(),
        Id_socio: $('#Id_socio').val()
    };
    var datosarticulojson = JSON.stringify(datosarticulo);

    $.ajax({
        url: UrlPutArticulo,
        type: 'PUT',
        data: datosarticulojson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            console.log(response);
        }
    });
    alert("Articulo Actualizado");
}

function EliminarArticulo(IdArticulo){
    var datosarticulo = {
        id: IdArticulo
    };
    var datosarticulojson = JSON.stringify(datosarticulo);

    $.ajax({
        url: UrlDeleteArticulo,
        type: 'DELETE',
        data: datosarticulojson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            console.log(response);
        }        
    });
    alert("Articulo Eliminado");
}
