<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'date',
        'name',
        'time',
        'status',
        'user_id',
        'property_id',
    ];

    /**
     * Relationship: A booking belongs to a user.
     */
   

    /**
     * Relationship: A booking belongs to a property.
     */
    public function property()
    {
        return $this->belongsTo(Property::class);
    }
}
