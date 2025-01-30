import React from "react";

function Nostate({title ='Record not found'}) {
  return (
    <div className="text-center">
      <section class="bg-white dark:bg-gray-900">
        <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div class="mx-auto max-w-screen-sm text-center">
           
            <p class="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            {title}
              
            </p>
            
          </div>
        </div>
      </section>
    </div>
  );
}

export default Nostate;
