<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Intent;
use Illuminate\Support\Facades\Log;

class ChatBoxSeeder extends Seeder
{
    public function run()
    {
        // Clear existing intents to avoid duplicates
        Intent::query()->delete();

        // Define intents
        $intents = [
            [
                'tag' => 'greeting',
                'patterns' => ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening'],
                'responses' => [
                    'Hello! Welcome to our rental service. How can I assist you today?',
                    'Hi there! Looking for a place to rent? I can help.',
                    'Greetings! What are you looking for in a rental property?'
                ]
            ],
            [
                'tag' => 'rental_price',
                'patterns' => [
                    'how much', 'price', 'cost', 'rent', 'rental price', 'what\'s the rent',
                    'what\'s the monthly cost', 'how much per month', 'rental rates',
                    'price range for apartments', 'what budget do I need'
                ],
                'responses' => [
                    'Our rentals range from Rs.7,500 to Rs.220,000 per month, depending on the property.',
                    'Rental prices vary greatly depending on the size, location, and amenities. Tell me what you\'re looking for, and I can give you a better idea.',
                    'We have options for every budget. What\'s your price range?',
                    'Our rental prices vary based on property type and location. Studio apartments start at Rs.15,000/mo, while luxury villas can go up to Rs.500,000/mo. What type of property are you interested in?',
                    'Prices depend on size and location. For example: 
                    - 1-bedroom: Rs.15,000-50,000
                    - 2-bedroom: Rs.40,000-120,000
                    - Luxury properties: Rs.200,000+
                    Which category interests you?'
                ]
            ],
            [
                'tag' => 'property_location',
                'patterns' => ['where is it', 'location', 'address', 'where are your properties located', 'in which areas do you have properties'],
                'responses' => [
                    'Our properties are located in prime areas like Colombo 03, Colombo 07, Kandy, and more.',
                    'We have properties in various locations across Sri Lanka. Are you interested in a specific city or area?',
                    'We have listings in Colombo, Kandy, Galle, and other popular destinations.'
                ]
            ],
            // Add other intents here...
        ];

        // Insert intents into the database
        foreach ($intents as $intentData) {
            try {
                Intent::create($intentData);
            } catch (\Exception $e) {
                Log::error("Failed to create intent: " . $e->getMessage());
                $this->command->error("Failed to create intent: {$intentData['tag']}");
            }
        }

        $this->command->info('Intents seeded successfully!');
    }
}