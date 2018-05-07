var restaurantData = $('form#restaurantForm');
var uploading_image = $('#restaurant-photo');
var image_input = $('#upload');
$("#pedidosActive").addClass('active');

/* Create Form Object & Send To The Server*/
$("body").on('click', '#save', function(){
  restaurantData.validate({
     rules : {
        name : {required: true},
        age : {required: true},
        address  : {required: true},
        details : {required: true},
        gender : {required: true},
        curp : {required: true},
        phone : {required: true}
     },
     messages: {
      name: {required: "Ingresa el nombre del repartidor"},
      address: {required: "Ingresa del nombre del repartidor"},
      details: {required: "Ingresa los detalles del repartidor"},
      age: {required: "Ingresa la edad del repartidor"},
      gender: {required: "Ingresa el sexo del repartidor"},
      phone: {required: "Ingresa el telefono del repartidor"},
      curp: {required: "Ingresa la CURP del repartidor"}
    }
  });
  if (restaurantData.valid()){
    var formData = new FormData($("#restaurantForm")[0]);
    $.ajax({
       url: '/add_delivery_man',
       type: 'POST',
       data: formData,
       cache: false,
       contentType: false,
       processData: false,
       headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
       }
   })
   .done(function(response){
     if (response.status == "200") {
       swal({
        title: "Excelente",
        text: "Todo se ha guardado con exito",
        icon: "success",
        button: "Aceptar",
      })
      .then((value) => {
        window.location.href = '/admin/delivery-man';
      });
    }else {
      swal({
       title: "Lo sientimos",
       text: "Al parecer hay un error, Por favor intentalo mas tarde",
       icon: "Warning",
       button: "Aceptar",
     })
     .then((value) => {
       window.location.href = '/admin/restaurants';
     });
    }
   });

  }else {
    let BreakException = {};
    $.each($("[id*=-error]"),function(i){
      if ($($("[id*=-error]")[i]) && $($("[id*=-error]")[i]).text() != "") {
        $.notify({
          title: '<strong>Atencion!</strong>',
          message: $($("[id*=-error]")[i]).text()
        },{
          type: 'danger'
        });
        throw BreakException;
      }
    });
  }
});


$("body").on('click', '#saveUpdate', function(){
  $id = $(this).data('id');
  restaurantData.validate({
     rules : {
        name : {required: true},
        age : {required: true},
        address  : {required: true},
        details : {required: true},
        gender : {required: true},
        curp : {required: true},
        phone : {required: true}
     },
     messages: {
      name: {required: "Ingresa el nombre del repartidor"},
      address: {required: "Ingresa del nombre del repartidor"},
      details: {required: "Ingresa los detalles del repartidor"},
      age: {required: "Ingresa la edad del repartidor"},
      gender: {required: "Ingresa el sexo del repartidor"},
      phone: {required: "Ingresa el telefono del repartidor"},
      curp: {required: "Ingresa la CURP del repartidor"}
    }
  });
  if (restaurantData.valid()){
    var formData = new FormData($("#restaurantForm")[0]);
    formData.append('id', $id);
    $.ajax({
       url: '/update_delivery_man',
       type: 'POST',
       data: formData,
       cache: false,
       contentType: false,
       processData: false,
       headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
       }
   })
   .done(function(response){
     if (response.status == "200") {
       swal({
        title: "Excelente",
        text: "Todo se ha guardado con exito",
        icon: "success",
        button: "Aceptar",
      })
      .then((value) => {
        window.location.href = '/admin/restaurants';
      });
    }else {
      swal({
       title: "Lo sientimos",
       text: "Al parecer hay un error, Por favor intentalo mas tarde",
       icon: "Warning",
       button: "Aceptar",
     })
     .then((value) => {
       window.location.href = '/admin/delivery-man';
     });
    }
   });

  }else {
    let BreakException = {};
    $.each($("[id*=-error]"),function(i){
      if ($($("[id*=-error]")[i]) && $($("[id*=-error]")[i]).text() != "") {
        $.notify({
          title: '<strong>Atencion!</strong>',
          message: $($("[id*=-error]")[i]).text()
        },{
          type: 'danger'
        });
        throw BreakException;
      }
    });
  }
});

/*Change Image On File Selected*/

$("body").on('change', '#upload', function(){
    selectFile($("#upload"), "#restaurant-photo");
});

var file = {
  validExtension : function ($file, $types) {
     extension = ($file.substring($file.lastIndexOf("."))).toLowerCase();
     $available = false;
     for (var i = 0; i < $types.length; i++) {
        if ($types[i] == extension) {
           $available = true;
           break;
        }
     }
     if ($available) {
        return true;
     }else{
        return false;
     }
  },
  validSize : function($idInput, $mb){
     var files = document.getElementById($idInput).files;
     $max = (1024000 * $mb);
     if(files[0].size > $max){
        return null;
     }
     else{
        return files[0];
     }
  }
}

function makeBlob($idInput){
  try {
     var files = document.getElementById($idInput).files;
     var browser = window.URL || window.webkitURL;
     var url = browser.createObjectURL(files[0]);
     return url;
  } catch (e) {
     return null;
  }
}

function selectFile($input, $prev){
     var exts = new Array(".png", ".jpg", "jpeg", "JPEG", "JPG", "PNG");
     var $file = $input;
     var maxMegas = 2;
     if ($file.val() != ""){
        if(file.validExtension($file.val(), exts)){
           var files = file.validSize($file.attr("id"), maxMegas);
           if (files != null){
              var url = makeBlob($file.attr("id"));
              $($prev).attr("src", url);
           }
           else{
              this.resetImage();
              $.notify({
              	message: "El archivo excede los "+maxMegas+" MB máximos permitidos"
              },{
              	type: 'danger'
              });
           }
        }
        else{
           $file.val("");
           $.notify({
             message: "Selecciona un archivo de imagen valido"
           },{
             type: 'danger'
           });
        }
     }
  }
