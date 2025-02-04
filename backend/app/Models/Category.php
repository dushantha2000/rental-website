<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'status'];

    // Relationship with Property
    public function properties()
    {
        return $this->hasMany(Property::class);
    }

    // Relationship with SubCategory
    public function subCategories()
    {
        return $this->hasMany(SubCategory::class);
    }
}
