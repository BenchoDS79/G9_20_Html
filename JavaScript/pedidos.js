var UrlGetpedidos='http://localhost:80/G9_20/Pedidos/controller/Pedidos.php?OP=GetMapedidos';
var UrlPostpedido='http://localhost:80/G9_20/Pedidos/controller/Pedidos.php?OP=InsertPedidos';
var UrlGetUno='http://localhost:80/G9_20/Pedidos/controller/Pedidos.php?OP=GetUno';
var UrlPutpedido='http://localhost:80/G9_20/Pedidos/controller/Pedidos.php?OP=UpdatePedidos';
var UrlEliminar='http://localhost:80/G9_20/Pedidos/controller/Pedidos.php?OP=DeletePedidos';

$(document).ready(function(){
     CargarPedidos();
});

function CargarPedidos(){
    $.ajax({
        url: UrlGetpedidos,
        type:'GET',
        datatype:'JSON',
        success:function(response){
            var MiItems = response;
            var valores = '' ;

            for(i=0; i< MiItems.length; i++){
                valores += '<tr>'+
                '<td>'+MiItems[i].ID+'</td>'+
                '<td>'+MiItems[i].ID_SOCIO+'</td>'+
                '<td>'+MiItems[i].FECHA_PEDIDO+'</td>'+
                '<td>'+MiItems[i].TEXTO+'</td>'+
                '<td>'+MiItems[i].SUB_TOTAL+'</td>'+
                '<td>'+MiItems[i].TOTAL_ISV+'</td>'+
                '<td>'+MiItems[i].TOTAL+'</td>'+
                '<td>'+MiItems[i].FECHA_ENTREGA+'</td>'+
                '<td>'+MiItems[i].ESTADO+'</td>'+
                '<td>'+
                '<button class="btn btn-outline-warning" onclick="CargarPedido('+MiItems[i].ID +')">Editar</button>'+
                '<td>'+
                '<button class="btn btn-outline-danger" onclick="EliminarPedido('+MiItems[i].ID +')">Eliminar</button>'+
                '<td>'+
                '</tr>';
                $('.pedidos').html(valores);
            }
        }   
    });
}
function Agregarpedido(){
    var datospedidos={
        ID_SOCIO:$('#ID_SOCIO').val(),
        FECHA_PEDIDO:$('#FECHA_PEDIDO').val(),
        TEXTO:$('#TEXTO').val(),
        SUB_TOTAL:$('#SUB_TOTAL').val(),
        TOTAL_ISV:$('#TOTAL_ISV').val(),
        TOTAL:$('#TOTAL').val(),
        FECHA_ENTREGA:$('#FECHA_ENTREGA').val(),
        ESTADO:$('#ESTADO').val()
    };
    var datospedidojson= JSON.stringify(datospedidos);
    
    $.ajax({
        url: UrlPostpedido,
        type:'POST',
        data:datospedidojson,
        datatype:'JSON',
        contentType:'application/json',
        success:function(response){
            console.log(response);
            
        }   
    });
    alert("Pedido Agregado");
    
}
function CargarPedido(idpedido){
    var datospedidos ={
        ID:idpedido
    }
    var datospedidojson= JSON.stringify(datospedidos);

    $.ajax({
        url: UrlGetUno,
        type:'POST',
        data:datospedidojson,
        datatype:'JSON',
        contentType:'application/json',
        success:function(response){
            var MiItems = response;
            $('#ID_SOCIO').val(MiItems[0].ID_SOCIO);
            $('#FECHA_PEDIDO').val(MiItems[0].FECHA_PEDIDO);
            $('#TEXTO').val(MiItems[0].TEXTO);
            $('#SUB_TOTAL').val(MiItems[0].SUB_TOTAL);
            $('#TOTAL_ISV').val(MiItems[0].TOTAL_ISV);
            $('#TOTAL').val(MiItems[0].TOTAL);
            $('#FECHA_ENTREGA').val(MiItems[0].FECHA_ENTREGA);
            $('#ESTADO').val(MiItems[0].ESTADO);

            var btnactualizar = '<input type="submit" id="btn_actualizar" onclick="ActualizarPedido('+MiItems[0].ID+')"'+
            'value="Actualizar Pedidos" class="btn btn-primary"></input>';
            $('.btnagregar').html(btnactualizar);
        }   
    });
}
function ActualizarPedido(idpedido){
    var datospedidos = {
        ID:idpedido,
        ID_SOCIO: $('#ID_SOCIO').val(),
        FECHA_PEDIDO: $('#FECHA_PEDIDO').val(),
        TEXTO: $('#TEXTO').val(),
        SUB_TOTAL: $('#SUB_TOTAL').val(),
        TOTAL_ISV: $('#TOTAL_ISV').val(),
        TOTAL: $('#TOTAL').val(),
        FECHA_ENTREGA: $('#FECHA_ENTREGA').val(),
        ESTADO: $('#ESTADO').val()
    };
    var datospedidojson= JSON.stringify(datospedidos)

    $.ajax({
        url: UrlPutpedido,
        type:'PUT',
        data:datospedidojson,
        datatype:'JSON',
        contentType:'application/json',
        success: function(response){
            console.log(response);
        }
    });
    alert("Pedido Actualizado");
}
function EliminarPedido(idpedido){
    var datospedidos ={
        ID:idpedido
    }
    var datospedidojson= JSON.stringify(datospedidos);

    $.ajax({
        url: UrlEliminar,
        type:'DELETE',
        data:datospedidojson,
        datatype:'JSON',
        contentType:'application/json',
        success: function(response){
            console.log(response);
        }
    });
    alert("Pedido Eliminado");

}