<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('landing');
});

Route::get('dashboard', 'HomeController@index')->name('dashboard');

Route::get('landing', function(){
  return view(landing);
});


/*------------------------------------------------------------------
|   Admin Dashboard                                                |                                                                                                 |
--------------------------------------------------------------------
| Get all restaurants
| Add new restaurants
| Create a restaurant
| Get restaurant by @id
------------------------------------------------------------------*/

Route::prefix('admin')->group(function(){
  Route::get('/', function () {
      return view('admin.restaurants.home');
  });//Load Form
  Route::get('restaurants', 'RestaurantController@getRestaurants');//List all
  Route::get('orders', 'RestaurantController@orders');
  Route::get('delivery-man', 'RestaurantController@deliveryMan');
  Route::get('add_deliveryMan', 'RestaurantController@add_deliveryMan');
  Route::get('update_deliveryMan/{id}', 'RestaurantController@getinfoDeliveryMan');
  Route::get('update_restaurant/{restaurant_id}', 'RestaurantController@infoRestaurant');
  Route::get('add_restaurant', function () {
      $restaurant = null;
      return view('admin.restaurants.form',['restaurant' => $restaurant]);
  });//Load Form
  Route::post('create_restaurant', 'RestaurantController@createRestaurant');//Create
  Route::get('restaurant/{restaurant_id}', 'RestaurantController@getRestaurant');//Get instance

});

Route::post('/deleteRestaurant', 'RestaurantController@deleteRestaurant');//delete
Route::post('/add_delivery_man', 'RestaurantController@add_delivery_man');
Route::post('/deleteDeliveryMan', 'RestaurantController@deleteDeliveryMan');
Route::post('/update_delivery_man', 'RestaurantController@update_delivery_man');
Route::post('/updateRestaurant', 'RestaurantController@update_restaurant');
/*------------------------------------------------------------------
|   Restaurant Dashboard                                           |                                                                                                 |
--------------------------------------------------------------------
| Get all restaurants
| Add new restaurants
| Create a restaurant
| Get restaurant by @id
------------------------------------------------------------------*/
Route::prefix('restaurant')->group(function(){

  Route::get('home/{restaurant_id}', 'AdminRestaurantController@getCategories');//List all
  Route::get('{restaurant_id}/add_category', 'AdminRestaurantController@addCategory');//Load Form
  Route::post('{restaurant_id}/create_category', 'AdminRestaurantController@createCategory');//Create
  Route::post('res/{restaurant_id}/cat/{category_id}', 'RestaurantController@getCategory');//Get instance
});


/*------------------------------------------------------------------
|   Utility Routes                                                 |                                                                                                 |
--------------------------------------------------------------------
| Get images from ./storage ( Azure Server )
------------------------------------------------------------------*/
Route::get('/storage/{restaurant_id}', function($restaurant_id)
{
    $path = storage_path('app/public/restaurants/'.$restaurant_id);

    $file = File::get($path);
    $type = File::mimeType($path);

    $response = Response::make($file, 200);
    $response->header("Content-Type", $type);

    return $response;
});//Get images.


?>
