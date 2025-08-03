# Project Overview

This app is a clone of [Google Gemini AI](https://www.gemini.google.com).
This app is just made to simulate the gemini app and doesn't have any database.

_To Setup and Run:_

- You might need to clone this repo and run `npm i`.
- After the dependencies has been installed you can host them locally using `npm run start`

_Folder Structure:_
Just like a normal react-app with typescript everything lies inside _src_ directory.

There are
[x] assets - includes pictures and icons
[x] components - includes reusable components
[x] layouts - where components are assembled to make pages
[x] store - contains state-management solutions created using [Zustand](https://zustand.docs.pmnd.rs/getting-started/introduction)
[x] routes - contains routes (using [React Router Dom](https://reactrouter.com/))

The props are defined in the component files and are used to structure the data.

_Gemini functionality simulation_

1. The user needs to sign in to use this (simulated)
   _1.1._ The user might be new. So need to enter the mobile number to get the otp (Simulated)
   _1.2._ The user might have already signed-up. So can enter the mobile number alone and can be signed-in.
   _`Leveraged AuthStore - created using zustand to achieve this sign-in/sign-up functionality. Could be replaced with JWT if integrating with backend.`_

2. Once logged in, the routes will take the user to `/app`, on which the user might see a input field with support only for picture uploads.
   _2.1._ Only after typing something, or having an image uploaded, can the user send the message.
   _2.2._ On uploading the image, Skeleton loader from `Antd` is shown for 2 or more seconds (simulated using `setTimeout`) and then toast appears on upload success.
   _2.3._ On sending the message, delayed AI simulation is done using `setTimeout` and then message is appended.

_`All these chats and images are stored in the localStorage and can be obtained even on refresh or logging out till it is cleaned up`_

3. Search functionality is implemented for the titles of the chats in the `SearchComponent`. Implemented `Debouncing`. Generally debouncing is implemented using interval, but that would not be ideal in this case. So, started a timeout on Onchange handler of the input element and clearing them on beginning of the onchange handler, or whenever the conversations change.
4. There would be a default chat created to showcase the pagination and reverse infinite scrolling. The chat has one image (from the assets folder) and hunders of messages (created using [faker-js](https://fakerjs.dev/)). On scrolling upward, new messages would be appended (20 at a time).

## Dependencies used

- [x] [AntDesign](https://ant.design/) - for UI and icons
- [x] [Material UI](https://mui.com/material-ui/) - for Material UI Icons
- [x] [Faker-js](https://fakerjs.dev/) - for creating random data and simulate ai responses.
- [x] [Country-State-City](https://countrystatecity.in/) - for obtaining country code in mobile number.
- [x] [React](https://react.dev/) - come-on! I would have died before finishing this project if it wasn't for him. (_That's why he is the GOAT! the GOAT!!!_)
- [x] [React-hook-form](https://react-hook-form.com/) - for forms
- [x] [React-router-dom](https://reactrouter.com/) - for navigation and combining layouts through routes (SPA!).
- [x] [React-textarea-autosize](https://www.npmjs.com/package/react-textarea-autosize) - to simulate dynamically growing textarea as in gemini
- [x] [React-toastify](https://www.npmjs.com/package/react-toastify) - for toast and they have custom controls too!
- [x] [Typescript](https://www.typescriptlang.org/) - The protector. (_It was perfect! PERFECT!. Down to the last minute detail_)
- [x] [zod](https://zod.dev/) - for form validation.
- [x] [zustand](https://zustand.docs.pmnd.rs/getting-started/introduction) - for state management.

# About this app

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
