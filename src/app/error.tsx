"use client";

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  console.log(`Error: ${error.message}`);
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-md mx-auto ">
        <div className="p-6 flex flex-col items-center space-y-2u justify-center">
          <div className="rounded-full p-3 bg-gray-900">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="w-6 h-6 fill-gray-50"
            >
              <path d="m8 2 1.88 1.88"></path>
              <path d="M14.12 3.88 16 2"></path>
              <path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1"></path>
              <path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6"></path>
              <path d="M12 20v-9"></path>
              <path d="M6.53 9C4.6 8.8 3 7.1 3 5"></path>
              <path d="M6 13H2"></path>
              <path d="M3 21c0-2.1 1.7-3.9 3.8-4"></path>
              <path d="M20.97 5c0 2.1-1.6 3.8-3.5 4"></path>
              <path d="M22 13h-4"></path>
              <path d="M17.2 17c2.1.1 3.8 1.9 3.8 4"></path>
            </svg>
          </div>
          <h3 className="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight text-center">
            {error.message}
          </h3>
        </div>
        <div className="p-6 space-y-4">
          <p className="text-sm/relaxed text-gray-500 md:text-base/relaxed dark:text-gray-400 text-center">
            Кажется, вы столкнулись с ошибкой. Не волнуйтесь, наша команда
            уведомлена и работает над исправлением проблемы. В то же время вы
            можете попробовать обновить страницу
          </p>
        </div>
        <div className="flex items-center p-6">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full"
          >
            Попробовать снова
          </button>
        </div>
      </div>
    </div>
  );
};
export default Error;
