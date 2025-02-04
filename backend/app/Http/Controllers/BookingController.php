<?php

// app/Http/Controllers/BookingController.php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Booking;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class BookingController extends Controller
{
    public function index()
    {
        return response()->json(Booking::all(), 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|',
            'email' => 'required|email',
            'phone' => 'required|',
            'date' => 'required|date',
            'time' => 'required',
            'property_id' => 'required|',
        ]);

        $booking = Booking::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'date' => $request->date,
            'time' => $request->time,
            'property_id' => $request->property_id,
           
        ]);

        return response()->json(['message' => 'Booking created successfully', 'data' => $booking], 201);
    }

    public function show($id)
    {
        $booking = Booking::find($id);
        if (!$booking) return response()->json(['message' => 'Booking not found'], 404);
        return response()->json($booking, 200);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'sometimes|required|string',
            'email' => 'sometimes|required|email',
            'phone' => 'sometimes|required|string',
            'date' => 'sometimes|required|date',
            'time' => 'sometimes|required',
            'property_id' => 'sometimes|required|exists:properties,id',
        ]);

        $booking = Booking::find($id);
        if (!$booking) return response()->json(['message' => 'Booking not found'], 404);

        $booking->update($request->all());
        return response()->json(['message' => 'Booking updated successfully', 'data' => $booking], 200);
    }

    public function destroy($id)
    {
        $booking = Booking::find($id);
        if (!$booking) return response()->json(['message' => 'Booking not found'], 404);

        $booking->delete();
        return response()->json(['message' => 'Booking deleted successfully'], 200);
    }
}
