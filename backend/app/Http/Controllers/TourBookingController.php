<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TourBooking;
use Illuminate\Support\Facades\Validator;

class TourBookingController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required',
            'phone' => 'required',
            'date' => 'required',
            'time' => 'required',
            'property_id'=> 'required'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ], 400);
        }
        
        $TourBooking = new TourBooking();
        $TourBooking->name = $request->name;
        $TourBooking->email = $request->email;
        $TourBooking->phone = $request->phone;
        $TourBooking->date = $request->date;
        $TourBooking->time = $request->time;

        $TourBooking->save();

        return response()->json([
            'status' => 200,
            'errors' => $validator->errors()
        ], 200);
    }

    
    
}
