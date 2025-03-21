<?php

namespace App\Http\Controllers;

use App\Models\Intent;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Rubix\ML\PersistentModel;
use Rubix\ML\Persisters\Filesystem;

class ChatController extends Controller
{
    public function handle(Request $request)
    {
        $request->validate([
            'message' => 'required|string|max:255'
        ]);

        try {
            $response = $this->processMessage($request->message);
            return response()->json(['response' => $response]);
        } catch (\Exception $e) {
            Log::error("Chat error: " . $e->getMessage());
            return response()->json([
                'response' => "I'm having trouble understanding. Please try again later."
            ]);
        }
    }

    private function processMessage(string $message): string
    {
        $modelPath = storage_path('app/chatbot.model');
        
        if (!file_exists($modelPath)) {
            throw new \Exception("Chatbot model not found");
        }

        $model = PersistentModel::load(new Filesystem($modelPath));
        $prediction = $model->predictSample([$message]);

        $intent = Intent::where('tag', $prediction)->first();

        return $intent 
            ? $this->getRandomResponse($intent->responses)
            : "I'm still learning. Could you rephrase that?";
    }

    private function getRandomResponse(array $responses): string
    {
        return $responses[array_rand($responses)];
    }
}