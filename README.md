# Time Tracker Codex

A simple time tracking web application built with React and TypeScript.

## Development

1. Install dependencies
   ```bash
   npm install
   ```
2. Start the dev server
   ```bash
   npm run dev
   ```
   The entry file `index.html` is located in the repository root, so visiting
   `http://localhost:3000/` after running the dev server will load the
   application.
3. Run tests
   ```bash
   npm test
   ```

The application stores data in your browser `localStorage`.

Click "Start" next to a project to begin tracking time. When a project is running a "Stop" button lets you end the timer.

Timers update automatically while running so you can watch progress in real time.

Starting a timer while others are active prompts you to choose whether to stop
the running timers. Declining allows multiple timers to run concurrently.

Stopping a timer now asks for a description of what work was done. Activities
are tracked per project and the total time spent on each activity is displayed
under the project name.

The interface now features a styled layout with clearly separated components for
adding projects and viewing the list.
