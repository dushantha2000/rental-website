<?php

namespace App\Console\Commands;

use App\Models\Intent;
use Illuminate\Console\Command;
use Rubix\ML\Classifiers\KNearestNeighbors;
use Rubix\ML\Datasets\Labeled;
use Rubix\ML\Pipeline;
use Rubix\ML\PersistentModel;
use Rubix\ML\Persisters\Filesystem;
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
            $this->warn('No intents found in the database. Please add intents before training.');
            return 1; // Indicate failure
        }

        $samples = [];
        $labels = [];

        foreach ($intents as $intent) {
            // Ensure patterns are treated as an array
            $patterns = is_array($intent->patterns) ? $intent->patterns : json_decode($intent->patterns, true);

            if (!is_array($patterns)) {
                continue; // Skip if invalid data
            }

            foreach ($patterns as $pattern) {
                $samples[] = $pattern;
                $labels[] = $intent->tag;
            }
        }

        if (empty($samples)) {
            $this->warn('No training data found. Add intents and patterns to the database.');
            return 1; // Indicate failure
        }

        $dataset = new Labeled($samples, $labels);

        $pipeline = new Pipeline([
            new TextNormalizer(),
            new WordCountVectorizer(1000),
            new TfIdfTransformer(),
        ], new KNearestNeighbors(3));

        $pipeline->train($dataset);

        $persister = new Filesystem(storage_path('app/chatbot.model'));
        $persistentModel = new PersistentModel($pipeline, $persister);

        try {
            $persistentModel->save();
        } catch (\Exception $e) {
            $this->error('Failed to save the model: ' . $e->getMessage());
            return 1; // Indicate failure
        }

        $this->info('Model trained successfully! The model has been saved to ' . storage_path('app/chatbot.model'));
        return 0; // Indicate success
    }
}
