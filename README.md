# Frontend coding task

Time taken: Approx. 1 day

Live demo: https://frontend-task-sigma.vercel.app/

## Running locally
1. Clone the repo
2. In the root directory run `yarn` to install deps
3. `yarn dev` to run the application

## Tech stack
- NextJS with Typescript
- Chakra UI for components and styling
- useSWR for data fetching
- React hook form for login form handling

## Features
- Middleware that redirects to login for unauthenticated users
- Cookies and custom hook for session management
- useSWR data fetching with revalidation on focus

## Improvements
- Break things up into more reusable components
- Use of containers to seperate business logic and presentation
- Automated testing (e.g. jest, cypress, playwright etc...)
