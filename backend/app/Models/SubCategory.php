<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubCategory extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'status'];

    // Relationship with Category
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    // Relationship with Property
    public function properties()
    {
        return $this->hasMany(Property::class);
    }
}
