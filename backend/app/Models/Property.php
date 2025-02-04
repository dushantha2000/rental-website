<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Property extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'location', 'squareFeet', 'monthlyFee', 'description',
        'category_id', 'sub_category_id', 'user_id', 'status', 'features', 'images'
    ];

    // Relationship with Category
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    // Relationship with SubCategory
    public function subCategory()
    {
        return $this->belongsTo(SubCategory::class, 'sub_category_id');
    }

    // Relationship with User
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}



