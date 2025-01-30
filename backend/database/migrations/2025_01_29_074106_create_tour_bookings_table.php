<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up() {
        Schema::create('tour_bookings', function (Blueprint $table) {
            $table->id(); 
            $table->date('date');
            $table->time('time');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); 
            $table->string('email');
            $table->text('description')->nullable();
            $table->timestamps(); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tour_bookings');
    }
};
