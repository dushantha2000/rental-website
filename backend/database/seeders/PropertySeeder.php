<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Property;

class PropertySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Property::create([
            'name' => 'Luxury Apartment',
            'location' => 'Downtown',
            'squareFeet' => 1200,
            'monthlyFee' => 2500,
            'status' => 'available',
            'features' => json_encode(['Pool', 'Gym', 'Parking']),
            'images' => json_encode(['image1.jpg', 'image2.jpg']),
            'category_id' => 1, // Assuming category ID 1 exists
            'sub_category_id' => 1, // Assuming sub-category ID 1 exists
            'description' => 'A beautiful luxury apartment in the heart of the city.',
            'user_id' => 1, // Assuming user ID 1 exists
        ]);
    }
}
