# Insta Stories

## Deployment Link

You can access the deployed application at: [Deployment Link](https://insta-stories-two.vercel.app)

## Setting Up and Running the Application

### Prerequisites

* Node.js (version 14 or higher)
* npm (version 6 or higher)

### Installation Steps

1. Clone the repository using `git clone https://github.com/gopalrathore/insta-stories.git`
2. Navigate to the project directory using `cd insta-stories`
3. Install the dependencies using `npm install`
4. Start the development server using `npm run dev`
5. Open your web browser and navigate to `http://localhost:5173`

## Running Tests

1. If the development server is running, use `npm run cypress:run`, else use `npm run test:e2e`

## Design Choices and Optimizations

* I used Vite as our build tool to optimize for performance and scalability.
* The application is split into three main components (`StoriesViewer`, `StoryList`, and `StoryView`) for better maintainability and reusability.
* i implemented a custom Cypress command to simplify the testing process.