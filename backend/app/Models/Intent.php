<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Intent extends Model
{
    use HasFactory;

    protected $fillable = [
        'tag',
        'patterns',
        'responses',
    ];

    protected $casts = [
        'patterns' => 'array',
        'responses' => 'array',
    ];

    public static function rules(): array
    {
        return [
            'tag' => 'required|string|max:255|unique:intents,tag',
            'patterns' => 'required|array',
            'patterns.*' => 'string|max:255',
            'responses' => 'required|array',
            'responses.*' => 'string|max:255',
        ];
    }
}