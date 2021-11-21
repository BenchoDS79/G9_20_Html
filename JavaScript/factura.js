var UrlGetFactura='http://localhost:90/G9_20/Factura/controller/Facturas.php?op=GetFacturas';
var UrlPostFactura='http://localhost:90/G9_20/Factura/controller/Facturas.php?op=InsertFactura';
var UrlGetUno='http://localhost:90/G9_20/Factura/controller/Facturas.php?op=GetUno';
var UrlPutFactura='http://localhost:90/G9_20/Factura/controller/Facturas.php?op=UpdateFactura';
var UrlDeleteFactura='http://localhost:90/G9_20/Factura/controller/Facturas.php?op=DeleteFactura';

$(document).ready(function(){
    CargarFacturas();
});

function CargarFacturas(){
    $.ajax({
        url:UrlGetFactura,
        type:'GET',
        datatype:'JSON',
        success:function(response){
            var MiItems=response;
            var Valores='';

            for(i=0; i< MiItems.length; i++){
                Valores += '<tr>'+
                '<td id="idfactura">'+MiItems[i].ID+'</td>'+
                '<td>'+MiItems[i].ID+'</td>'+
                '<td>'+MiItems[i].NUMERO_FACTURA+'</td>'+
                '<td>'+MiItems[i].ID_SOCIO+'</td>'+
                '<td>'+MiItems[i].FECHA_FACTURA+'</td>'+
                '<td>'+MiItems[i].DETALLE+'</td>'+
                '<td>'+MiItems[i].SUB_TOTAL+'</td>'+
                '<td>'+MiItems[i].TOTAL_ISV+'</td>'+
                '<td>'+MiItems[i].TOTAL+'</td>'+
                '<td>'+MiItems[i].FECHA_VENCIMIENTO+'</td>'+
                '<td>'+MiItems[i].ESTADO+'</td>'+
                '<td>'+
                '<button class="btn btn-outline-warning" onclick="CargarFactura('+MiItems[i].id +')">Editar</button>'+
                '<td>'+
                '<button class="btn btn-outline-danger" onclick="EliminarFactura('+MiItems[i].id +')">Eliminar</button>'+
                '<td>'+
            '</tr>';
            $('.facturas').html(Valores);
            }
        }
        
    });
} 
function AgregarFactura(){
    var datosfactura={
        ID:$('#ID').val(),
        NUMERO_FACTURA:$('#NUMERO_FACTURA').val(),
        ID_SOCIO:$('#ID_SOCIO').val(),
        FECHA_FACTURA:$('#FECHA_FACTURA').val(),
        DETALLE:$('#DETALLE').val(),
        SUB_TOTAL:$('#SUB_TOTAL').val(),
        TOTAL_ISV:$('#TOTAL_ISV').val(),
        TOTAL:$('#TOTAL').val(),
        FECHA_VENCIMIENTO:$('#FECHA_VENCIMIENTO').val(),
        ESTADO:$('#ESTADO').val()
    };
    var datosfacturajson= JSON.stringify(datosfactura);
    $.ajax({
        url:UrlPostFactura,
        type:'POST',
        data:datosfacturajson,
        datatype:'JSON',
        contentType:'application/json',
        success:function(response){
            console.log(response);
        }
    });
    alert("Factura Agregada");
}

function CargarFactura(idfactura){
    var datosfactura={
        id:idfactura
    };
    var datosfacturajson=JSON.stringify(datosfactura);
    $.ajax({
        url:UrlGetUno,
        type:'POST',
        data:datosfacturajson,
        datatype:'JSON',
        contentType:'application/json',
        success:function(response){
            var MiItems=response;
            $('#ID').val(MiItems[0].ID);
            $('#NUMERO_FACTURA').val(MiItems[0].NUMERO_FACTURA);
            $('#ID_SOCIO').val(MiItems[0].ID_SOCIO);
            $('#FECHA_FACTURA').val(MiItems[0].FECHA_FACTURA);
            $('#DETALLE').val(MiItems[0].DETALLE);
            $('#SUB_TOTAL').val(MiItems[0].SUB_TOTAL);
            $('#TOTAL_ISV').val(MiItems[0].TOTAL_ISV);
            $('#TOTAL').val(MiItems[0].TOTAL);
            $('#FECHA_VENCIMIENTO').val(MiItems[0].FECHA_VENCIMIENTO);
            $('#ESTADO').val(MiItems[0].ESTADO);

            var btnactualizar= '<input type="submit" id="btn_actualizar" onclick="ActualizarFactura('+MiItems[0].id +')"value="Actualizar Factura" class="btn btn-primary"></input>';
            $('.btnagregar').html(btnactualizar);
        } 

    });
}

function ActualizarFactura(idfactura){
    var datosfactura={
        id:idfactura,
        ID:$('#ID').val(),
        NUMERO_FACTURA:$('#NUMERO_FACTURA').val(),
        ID_SOCIO:$('#ID_SOCIO').val(),
        FECHA_FACTURA:$('#FECHA_FACTURA').val(),
        DETALLE:$('#DETALLE').val(),
        SUB_TOTAL:$('#SUB_TOTAL').val(),
        TOTAL_ISV:$('#TOTAL_ISV').val(),
        TOTAL:$('#TOTAL').val(),
        FECHA_VENCIMIENTO:$('#FECHA_VENCIMIENTO').val(),
        ESTADO:$('#ESTADO').val()
    };
    var datosfacturajson=JSON.stringify(datosfactura);
    $.ajax({
        url:UrlPutFactura,
        type:'PUT',
        data:datosfacturajson,
        datatype:'JSON',
        contentType:'application/json',
        success:function(response){
            console.log(response);
        }
    });
    alert("Factura Actualizada");
}

function EliminarFactura(idfactura){
    var datosfactura={
        id:idfactura
    };
    var datosfacturajson=JSON.stringify(datosfactura);
    $.ajax({
        url:UrlDeleteFactura,
        type:'DELETE',
        data:datosfacturajson,
        datatype:'JSON',
        contentType:'application/json',
        success:function(response){
            console.log(response);
        }
    });
    alert("Factura Eliminada");
}
