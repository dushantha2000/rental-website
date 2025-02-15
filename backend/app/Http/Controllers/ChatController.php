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
        $request->validate(['message' => 'required|string|max:255']);
        
        try {
            $response = $this->processMessage($request->message);
            return response()->json(compact('response'));
        } catch (\Exception $e) {
            Log::error("Chat error: " . $e->getMessage());
            return response()->json([
                'response' => $this->fallbackResponse()
            ]);
        }
        
    }
    
    private function processMessage(string $message): string
    {
        $modelPath = storage_path('app/chatbot.model');
        
        if (!file_exists($modelPath)) {
            Log::critical("Missing chatbot model");
            return $this->fallbackResponse();
        }

        try {
            $model = PersistentModel::load(new Filesystem($modelPath));
            $prediction = $model->predictSample([$message]);
            
            Log::debug("Predicted tag: $prediction");

            if (!$intent = Intent::where('tag', $prediction)->first()) {
                Log::warning("Unknown tag predicted: $prediction");
                return $this->fallbackResponse();
            }

            return $this->getResponse($intent);
        } catch (\Exception $e) {
            Log::error("Prediction failed: " . $e->getMessage());
            return $this->fallbackResponse();
        }
    }

    private function getResponse(Intent $intent): string
    {
        $responses = $intent->responses;
        
        if (empty($responses)) {
            Log::warning("No responses for intent: {$intent->tag}");
            return $this->fallbackResponse();
        }

        return $responses[array_rand($responses)];
    }

    private function fallbackResponse(): string
    {
        return "I'm still learning. Could you please rephrase your question?";
    }
}