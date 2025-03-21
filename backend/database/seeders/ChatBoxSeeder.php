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
            [
                'tag' => 'availability',
                'patterns' => ['is it available', 'can I rent now', 'availability', 'available properties', 'what\'s available'],
                'responses' => [
                    'Yes, we have several properties available for rent. Can you share what type of property you’re looking for?',
                    'Availability depends on the location and type of property. Would you like me to show you the current listings?',
                    'We have properties available for immediate move-in. What’s your preferred location and budget?'
                ]
            ],
            [
                'tag' => 'amenities',
                'patterns' => ['amenities', 'facilities', 'what does it include', 'what are the features'],
                'responses' => [
                    'Our properties include amenities like Wi-Fi, parking, security, and fully furnished options. Do you need any specific features?',
                    'Amenities vary by property. Common features include air conditioning, swimming pools, gyms, and parking spaces.',
                    'We offer properties with different amenities. Are you looking for furnished, pet-friendly, or properties with parking?'
                ]
            ],
            [
                'tag' => 'lease_terms',
                'patterns' => ['lease terms', 'contract', 'rental agreement', 'how long is the lease', 'minimum stay'],
                'responses' => [
                    'Lease terms vary. We offer monthly, 6-month, and yearly agreements. What term works best for you?',
                    'Our standard lease term is one year, but some properties offer short-term rentals as well.',
                    'Most rentals require a minimum 6-month lease. Do you need a short-term or long-term rental?'
                ]
            ],
            [
                'tag' => 'booking',
                'patterns' => ['how do I book', 'book a property', 'reserve a rental', 'rental booking'],
                'responses' => [
                    'Booking is easy! Just share the property you’re interested in, and we’ll guide you through the process.',
                    'To book a property, we’ll need your details and a security deposit. Would you like to start the booking?',
                    'You can book a rental by visiting the property page and clicking "Book Now." Need help with anything else?'
                ]
            ],
            [
                'tag' => 'contact',
                'patterns' => ['how can I contact you', 'support', 'customer service', 'phone number', 'email'],
                'responses' => [
                    'You can reach us at +94 71 234 5678 or email us at support@rentalservice.lk.',
                    'Our customer support team is available from 9 AM to 6 PM. Would you like me to arrange a call?',
                    'You can contact us via phone, email, or live chat. How would you like to connect?'
                ]
            ],
            [
                'tag' => 'property_type',
                'patterns' => ['types of properties', 'what properties do you have', 'apartment', 'house', 'villa'],
                'responses' => [
                    'We offer apartments, houses, villas, and commercial spaces. What type of property are you interested in?',
                    'Our listings include studio apartments, family houses, luxury villas, and more.',
                    'We have properties of all types. Are you looking for a single room, an apartment, or a house?'
                ]
            ],
            [
                'tag' => 'thank_you',
                'patterns' => ['thank you', 'thanks', 'appreciate it', 'thank you so much'],
                'responses' => [
                    'You’re welcome! Let me know if you need more help.',
                    'Happy to assist! Have a great day.',
                    'Glad I could help. Feel free to ask anything else.'
                ]
            ],
            [
                'tag' => 'goodbye',
                'patterns' => ['bye', 'goodbye', 'see you', 'talk later'],
                'responses' => [
                    'Goodbye! Have a great day.',
                    'Take care! Let me know if you need help again.',
                    'Bye! Feel free to return anytime.'
                ]
            ]
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
