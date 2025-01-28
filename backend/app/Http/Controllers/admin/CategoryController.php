<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\category;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    // this method will return all category 
    public function index()
    {

        $categories = Category::orderBy('created_at', 'DESC')->get();
        return response()->json([
            'status' => 200,
            'data' => $categories,
        ]);
    }
    //this method will store a category in BD
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'status'=>'required'

        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 400,
                'errors' => $validator->errors(),
            ], 400);
        }
        $category = new category();
        $category->name = $request->name;
        $category->status = $request->status;
        $category->save();

        return response()->json([
            'status' => 200,
            'massage' => 'Category added successfully.',
            'data' => $category
        ], 200);
    }

    //this method will return a single category
    public function show($id)
    {
        $category = Category::find($id)->get();

        if($category==null){
            return response()->json([
                'status' => 404,
                'massage' => 'Category not found.',
                'data' => []
            ], 404);
        }
        return response()->json([
            'status' => 200,
            'data' => $category,
        ]);
    }
    //this method will update a single category
    public function update($id, Request $request) {

        $category = Category::find($id);

        if($category==null){
            return response()->json([
                'status' => 404,
                'massage' => 'Category not found.',
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

        $category->name = $request->name;
        $category->status = $request->status;
        $category->save();

        return response()->json([
            'status' => 200,
            'massage' => 'Category updated successfully.',
            'data' => $category
        ], 200);
    }

    //this method will delete a single category
    public function destroy($id) {
        $category = Category::find($id);

        if($category==null){
            return response()->json([
                'status' => 404,
                'massage' => 'Category not found.',
                'data' => []
            ], 404);
        }
        $category ->delete();
        return response()->json([
            'status' => 200,
            'massage' => 'Category Delete successfully.',
            'data' => $category
        ], 200);
    }
}
