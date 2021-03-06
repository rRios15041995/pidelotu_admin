<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Crypt;

use Illuminate\Http\Request;

class User extends Controller
{

  public function update(Request $request) {
       return \App\User::where('firebase_id','=',$request['firebaseId'])->update(['email' => $request['email']]);
   }

   
  public function register(Request $request) {
     try {
         \App\User::create([
             'firebase_id' => $request['firebaseId'],
             'name' => $request['name'],
             'email' => $request['email'],
             'phone' => $request['phone']
         ]);
     }
     catch(Exception $ex){
         return $ex->messages;
     }
 }
 public function signup(Request $request) {
     try {
         \App\User::create([
             'firebase_id' => $request['firebaseId'],
             'name' => $request['name'],
             'email' => $request['email'],
         ]);
     }
     catch(Exception $ex){
         return $ex->messages;
     }
 }
 public function checkNumber($number) {
     // return \App\User::where('phone','=',$number)->get();

     $user = DB::table('users')->where('phone','=',$number)->get();
     return $user;
 }

}
