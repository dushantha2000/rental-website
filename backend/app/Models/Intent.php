<?php



namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Intent extends Model
{
    protected $casts = [
        'patterns' => 'array',
        'responses' => 'array',
    ];
}