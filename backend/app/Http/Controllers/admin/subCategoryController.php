<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SubCategory;
use Illuminate\Support\Facades\Validator;

class subCategoryController extends Controller
{
    // this method will return all sub category 
    public function index()
    {

        $subCategories = SubCategory::orderBy('created_at', 'DESC')->get();
        return response()->json([
            'status' => 200,
            'data' => $subCategories,
        ]);
    }
    //this method will store a sub category  in BD
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required'

        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors(),
            ], 400);
        }
        $subCategories = new SubCategory();
        $subCategories->name = $request->name;
        $subCategories->status = $request->status;
        $subCategories->save();

        return response()->json([
            'status' => 200,
            'massage' => 'subCategory added successfully.',
            'data' => $subCategories
        ], 200);
    }

    //this method will return a single sub category 
    public function show($id)
    {
        $subCategories = SubCategory::find($id)->get();

        if($subCategories==null){
            return response()->json([
                'status' => 404,
                'massage' => 'subCategory not found.',
                'data' => []
            ], 404);
        }
        return response()->json([
            'status' => 200,
            'data' => $subCategories,
        ]);
    }
    //this method will update a single sub category 
    public function update($id, Request $request) {

        $subCategories = SubCategory::find($id);

        if($subCategories==null){
            return response()->json([
                'status' => 404,
                'massage' => 'subCategory not found.',
                'data' => []
            ], 404);
        }
        $validator = Validator::make($request->all(), [
            'name' => 'required'

        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors(),
            ], 400);
        }

        $subCategories->name = $request->name;
        $subCategories->status = $request->status;
        $subCategories->save();

        return response()->json([
            'status' => 200,
            'massage' => 'subCategory updated successfully.',
            'data' => $subCategories
        ], 200);
    }

    //this method will delete a single sub category 
    public function destroy($id) {
        $subCategories = SubCategory::find($id);

        if($subCategories==null){
            return response()->json([
                'status' => 404,
                'massage' => 'subCategory not found.',
                'data' => []
            ], 404);
        }
        $subCategories ->delete();
        return response()->json([
            'status' => 200,
            'massage' => 'subCategory Delete successfully.',
            'data' => $subCategories
        ], 200);
    }
}
