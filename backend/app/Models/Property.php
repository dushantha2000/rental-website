<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Property extends Model
{
    protected $fillable = [
        'name',
        'location',
        'squareFeet',
        'monthlyFee',
        'status',
        'features',
        'images',
        'category_id',
        'sub_category_id',
        'description',
        'user_id',
    ];
}
