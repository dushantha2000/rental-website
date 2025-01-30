<?php

namespace App\Http\Controllers\common;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Property;

class PropertyController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'squareFeet' => 'required|numeric|min:0',
            'monthlyFee' => 'required|numeric|min:0',
            'status' => 'required|string|in:available,rented,pending,underMaintenance',
            'features' => 'array',
            'images' => 'array',
            'category_id' => 'required|exists:categories,id',
            'sub_category_id' => 'required|exists:sub_categories,id',
            'description' => 'nullable|string',
            'user_id' => 'required|exists:users,id',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors()
            ], 400);
        }
        $Property = new Property();
        $Property->name = $request->name;
        $Property->location = $request->location;
        $Property->squareFeet = $request->squareFeet;
        $Property->monthlyFee = $request->monthlyFee;
        $Property->status = $request->status;
        $Property->features = json_encode($request->features);
        $Property->images = json_encode($request->images);
        $Property->category_id = $request->category_id;
        $Property->sub_category_id = $request->sub_category_id;
        $Property->description = $request->description;
        $Property->user_id = $request->user_id;
        $Property->save();

        return response()->json([
            'status' => 200,
            'errors' => $validator->errors()
        ], 200);
    }

    public function index()
    {
        $properties = Property::all();
        return response()->json($properties);
    }

    public function show($id)
    {
        $property = Property::findOrFail($id);
        return response()->json($property);
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
