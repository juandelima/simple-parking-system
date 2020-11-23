<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/



Route::post('register', 'Auth\RegisterController@register');
Route::post('login', 'Auth\LoginController@login');
Route::post('logout', 'Auth\LoginController@logout');

Route::group(['middleware' => 'auth:api'], function() {
    Route::get('all', 'ParkingController@index');
    Route::get('edit/{kode_parkings}', 'ParkingController@getDataById');
    Route::get('filter-by-date/{tanggal_awal}/{tanggal_akhir}', 'ParkingController@searchByDate');
    Route::post('create', 'ParkingController@save');
    Route::put('update/{kode_parkings}', 'ParkingController@update');
});
