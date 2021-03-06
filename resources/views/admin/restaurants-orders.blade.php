@extends('layouts.admin-restaurant-app-header')

@section('section-title', $id[0]->name)

@section('stylesheets')
<link rel="stylesheet" href="/libs/jquery-validate/bootstrap.css">
<link rel="stylesheet" href="/css/restaurants/restaurants-orders.css">
@endsection

@section('content')
<div class="container">
<h2>Pedidos</h2>
<input class="form-control" id="myInput" type="text" placeholder="Busqueda">
<br>
<table class="table table-bordered table-striped">
  <thead>
    <tr>
      <th>Cliente</th>
      <th>Fecha del pedido</th>
      <th>Comida</th>
      <!--<th>Acciones</th>-->
    </tr>
  </thead>
  <tbody id="myTable">
    @if($orders > 0)
      @foreach($orders as $order)
        <tr>
          <td>{{$order->name}}</td>
          <td>{{$order->order_date}}</td>
          <td>{{$order->meal_name}}</td>
          <!--<td>
            <button type="button" class="btn btn-primary" data-id="{{$order->order_id}}" id="getDelivery" name="button">Pedir Repartidor</button>
            <button type="button" class="btn btn-danger" name="button">Eliminar</button> 
          </td>-->
        </tr>
      @endforeach
    @else
      <p>No se encontraron ordenes de este restaurante</p>
    @endif
  </tbody>
</table>

</div>
@endsection

@section('javascript')
<script type="text/javascript" src="/libs/jquery-validate/bootstrap.min.js"></script>
<script type="text/javascript" src="/js/restaurant/restaurants-orders.js"></script>
@endsection
