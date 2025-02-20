<?php

namespace App\Http\Controllers\common;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Property;
use Illuminate\Support\Facades\Log;



class PropertyController extends Controller
{
    public function store(Request $request)
    {
        // Validate the request
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'squareFeet' => 'required|numeric|min:0',
            'monthlyFee' => 'required|numeric|min:0',
            'status' => 'required|string|in:available,rented,pending,underMaintenance',
            'features' => 'nullable|array',
            'features.*' => 'string',
            'images' => 'nullable|array',
            'images.*' => 'image|mimes:jpg,jpeg,png', 
            'category_id' => 'required|exists:categories,id',
            'sub_category_id' => 'required|exists:sub_categories,id',
            'description' => 'nullable|string',
            'user_id' => 'required|exists:users,id',
        ]);

        // If validation fails, return error response
        if ($validator->fails()) {
            Log::error('Validation failed:', ['errors' => $validator->errors()]);
            return response()->json([
                'status' => 409,
                'errors' => $validator->errors()
            ], 409);
        }

        // Save images
        $imagePaths = [];
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $extension = $image->getClientOriginalExtension();
                $fileName = time() . '_' . uniqid() . '.' . $extension; 
                $path = 'storage/properties/';
                $image->move($path, $fileName);
                $imagePaths[] = $path . $fileName;
            }
        }

        // Save property data
        $property = new Property();
        $property->name = $request->name;
        $property->location = $request->location;
        $property->squareFeet = $request->squareFeet;
        $property->monthlyFee = $request->monthlyFee;
        $property->status = $request->status;
        $property->features = json_encode($request->features ?? []);
        $property->images = json_encode($imagePaths ?? []);
        $property->category_id = $request->category_id;
        $property->sub_category_id = $request->sub_category_id;
        $property->description = $request->description;
        $property->user_id = $request->user_id;
        $property->save();

        Log::info('Property saved:', ['id' => $property->id, 'images' => $property->images]);

        return response()->json([
            'status' => 200,
            'message' => 'Property added successfully!',
            'property' => $property
        ], 200);
    }


    public function index()
    {
        $properties = Property::all()->map(function ($property) {
            $property->images = collect(json_decode($property->images, true))->map(fn($img) => asset('' . $img));
            return $property;
        });

        return response()->json($properties);
    }

    public function show($id)
    {
        $property = Property::findOrFail($id);
        $property->images = collect(json_decode($property->images, true))->map(fn($img) => asset('' . $img));

        return response()->json($property);
    }

    
    //unique seller's added property view
    public function sellerProperty($id)
{
    $property = Property::where('user_id', $id)->get();

    if ($property->isEmpty()) {
        return response()->json(['message' => 'No properties created'], 404);
    }

    $formattedProperty = $property->map(function ($property) {
        return [
            'id' => $property->id,
            'name' => $property->name,
            'location' => $property->location,
            'squareFeet' => $property->squareFeet,
            'monthlyFee' => $property->monthlyFee,
            'description' => $property->description,
            'features' => $property->features,
            'images' => collect(json_decode($property->images, true))->map(fn($img) => asset($img)),
        ];
    });

    return response()->json($formattedProperty, 200);
}



    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'location' => 'sometimes|required|string|max:255',
            'squareFeet' => 'sometimes|required|numeric|min:0',
            'monthlyFee' => 'sometimes|required|numeric|min:0',
            'status' => 'sometimes|required|string|in:available,rented,pending,underMaintenance',
            'features' => 'sometimes|array',
            'images' => 'sometimes|array',
            'category_id' => 'sometimes|required|exists:categories,id',
            'sub_category_id' => 'sometimes|required|exists:sub_categories,id',
            'description' => 'sometimes|nullable|string',
            'user_id' => 'sometimes|required|exists:users,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ], 400);
        }

        $property = Property::findOrFail($id);
        $property->update($request->all());

        return response()->json([
            'status' => 200,
            'message' => 'Property updated successfully.'
        ]);
    }

    public function destroy($id)
    {
        $property = Property::findOrFail($id);
        $property->delete();

        return response()->json([
            'status' => 200,
            'message' => 'Property deleted successfully.'
        ]);
    }

    public function search(Request $request)
    {
        $request->validate([
            'location' => 'nullable|string|max:255',
            'category_id' => 'nullable|exists:categories,id',
            'sub_category_id' => 'nullable|exists:sub_categories,id',
        ]);


        $query = Property::query();

        if ($request->filled('location')) {
            $query->where('location', 'like', '%' . $request->location . '%');
        }

        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->filled('sub_category_id')) {
            $query->where('sub_category_id', $request->sub_category_id);
        }

        $properties = $query->get();

        return response()->json([
            'status' => 200,
            'data' => $properties,
            'message' => 'Search results retrieved successfully.'
        ]);
    }
}
