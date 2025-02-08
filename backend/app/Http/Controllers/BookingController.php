<?php

// app/Http/Controllers/BookingController.php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Booking;
use App\Models\Property;
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
            'name' => 'required',
            'email' => 'required',
            'phone' => 'required',
            'date' => 'required|date',
            'time' => 'required',
            'property_id' => 'required|exists:properties,id',
        ]);

        $property = Property::findOrFail($request->property_id);

        $propertyOwnerUserId = $property->user_id;

        $booking = Booking::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'date' => $request->date,
            'time' => $request->time,
            'property_id' => $request->property_id,
            'user_id' => $propertyOwnerUserId,
        ]);

        return response()->json([
            'message' => 'Booking created successfully',
            'data' => $booking,
        ], 201);
    }

    public function show($id)
    {
        $bookings = Booking::where('user_id', $id)
            ->with('property:id,name')
            ->get();

        if ($bookings->isEmpty()) {
            return response()->json(['message' => 'No bookings found for this user'], 404);
        }

        $formattedBookings = $bookings->map(function ($booking) {
            return [
                'id' => $booking->id,
                'property_name' => $booking->property->name ?? 'N/A',
                'date' => $booking->date,
                'time' => $booking->time,
                'email' => $booking->email,
                'phone' => $booking->phone,
                'name' => $booking->name,
            ];
        });

        return response()->json($formattedBookings, 200); 
    }




    public function destroy($id)
    {
        $booking = Booking::find($id);
        if (!$booking) return response()->json(['message' => 'Booking not found'], 404);

        $booking->delete();
        return response()->json(['message' => 'Booking deleted successfully'], 200);
    }
}
