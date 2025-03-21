<?php

namespace App\Console\Commands;

use App\Models\Intent;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use Rubix\ML\Classifiers\KNearestNeighbors;
use Rubix\ML\Datasets\Labeled;
use Rubix\ML\Pipeline;
use Rubix\ML\PersistentModel;
use Rubix\ML\Persisters\Filesystem;
use Rubix\ML\Tokenizers\Word;
use Rubix\ML\Transformers\TextNormalizer;
use Rubix\ML\Transformers\TfIdfTransformer;
use Rubix\ML\Transformers\WordCountVectorizer;


class TrainChatbot extends Command
{
    protected $signature = 'chatbot:train';
    protected $description = 'Train the chatbot ML model';

    public function handle()
    {
        $intents = Intent::all();

        if ($intents->isEmpty()) {
            $this->warn('No intents found. Add intents before training.');
            Log::warning('Chatbot training failed: No intents found in database');
            return 1;
        }

        $samples = [];
        $labels = [];

        foreach ($intents as $intent) {
            $patterns = $intent->patterns;
            
            if (!is_array($patterns)) {
                $errorMsg = "Invalid patterns format for intent: {$intent->tag}";
                $this->error($errorMsg);
                Log::error($errorMsg);
                continue;
            }

            foreach ($patterns as $pattern) {
                $samples[] = [$pattern]; 
                $labels[] = $intent->tag;
            }
        }

        if (empty($samples)) {
            $this->warn('No valid training data found.');
            Log::warning('Chatbot training failed: No valid training data found');
            return 1;
        }

        try {
            $dataset = new Labeled($samples, $labels);

            $pipeline = new Pipeline([
                new TextNormalizer(),
                new WordCountVectorizer(10000, 1, 0.8, new Word()),
                new TfIdfTransformer(),
            ], new KNearestNeighbors(3));

            $this->info('Training model...');
            Log::info('Starting chatbot model training');
            
            $pipeline->train($dataset);
            Log::info('Model training completed successfully');

            $persister = new Filesystem(storage_path('app/chatbot.model'));
            Log::debug('Saving trained model to: ' . storage_path('app/chatbot.model'));
            $persistentModel = new PersistentModel($pipeline, $persister);
            $persistentModel->save();

            $this->info('Model trained successfully!'); 
            Log::info('Chatbot model trained and saved successfully');
            return 0;
        } catch (\Exception $e) {
            $errorMsg = 'Training failed: ' . $e->getMessage();
            $this->error($errorMsg);
            Log::error($errorMsg);
            return 1;
        }
    }
}
