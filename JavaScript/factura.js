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
       url: UrlGetFactura,
       type:'GET',
       datatype:'JSON',
       success:function(response){
           var MiItems = response;
           var valores = '' ;

           for(i=0; i< MiItems.length; i++){
               valores += '<tr>'+
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
               '<button class="btn btn-outline-warning" onclick="CargarFactura('+MiItems[i].ID +')">Editar</button>'+
               '<td>'+
               '<button class="btn btn-outline-danger" onclick="EliminarFactura('+MiItems[i].ID +')">Eliminar</button>'+
               '<td>'+
               '</tr>';
               $('.facturas').html(valores);
           }
       }   
   });
}
function AgregarFactura(){
   var datosfacturas={
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
   var datosfacturajson= JSON.stringify(datosfacturas);
   
   $.ajax({
       url: UrlPostFactura,
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
   var datosfacturas ={
       ID:idfactura
   }
   var datospedidojson= JSON.stringify(datosfacturas);

   $.ajax({
       url: UrlGetUno,
       type:'POST',
       data:datosfacturajson,
       datatype:'JSON',
       contentType:'application/json',
       success:function(response){
           var MiItems = response;
           $('#NUMERO_FACTURA').val(MiItems[0].NUMERO_FACTURA);
           $('#ID_SOCIO').val(MiItems[0].ID_SOCIO);
           $('#FECHA_FACTURA').val(MiItems[0].FECHA_FACTURA);
           $('#DETALLE').val(MiItems[0].DETALLE);
           $('#SUB_TOTAL').val(MiItems[0].SUB_TOTAL);
           $('#TOTAL_ISV').val(MiItems[0].TOTAL_ISV);
           $('#TOTAL').val(MiItems[0].TOTAL);
           $('#FECHA_VENCIMIENTO').val(MiItems[0].FECHA_VENCIMIENTO);
           $('#ESTADO').val(MiItems[0].ESTADO);

           var btnactualizar = '<input type="submit" id="btn_actualizar" onclick="ActualizarPedido('+MiItems[0].ID+')"'+
           'value="Actualizar Pedidos" class="btn btn-primary"></input>';
           $('.btnagregar').html(btnactualizar);
       }   
   });
}

function ActualizarFactura(idfactura){
   var datosfacturas = {
       ID:idfactura,
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
   var datosfacturajson= JSON.stringify(datosfacturas)

   $.ajax({
       url: UrlPutFactura,
       type:'PUT',
       data:datosfacturajson,
       datatype:'JSON',
       contentType:'application/json',
       success: function(response){
           console.log(response);
       }
   });
   alert("Factura Actualizada");
}

function EliminarFactura(idfactura){
   var datosfacturas ={
       ID:idfactura
   }
   var datosfacturajson= JSON.stringify(datosfacturas);

   $.ajax({
       url: UrlDeleteFactura,
       type:'DELETE',
       data:datosfacturajson,
       datatype:'JSON',
       contentType:'application/json',
       success: function(response){
           console.log(response);
       }
   });
   alert("Factura Eliminada");

}
