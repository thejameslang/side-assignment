# side-assignment

## What is this?

This is my submission to the Side Inc. take home assignment. It is a React project which when run features a table view of GitHub users stored in a FireBase Cloud Firestore. The user will be able to search for a GitHub username. If the username exists, the user's details will be stored to the Cloud Firestore and subsequently displayed in the table.

The site has been deployed via Netlify to [here](https://pedantic-shirley-25b15e.netlify.com/).

## Requirements

Begin by installing the following:

- [Node.js](https://nodejs.org)

## Getting Started

### Install dependencies with npm

```bash
$ npm install
```

### Compile and hot-reload for development

```bash
$ npm run start
```

After running the above, http://localhost:3000 should open in your default browser. Changes are watched.

### Building for production

```bash
$ npm run build
```

## What I would like to do with more time

If there was more time, I would like to have the following improvements:

- Design
  - I followed the wireframe provided in the instructions but have the following observations:
    - The text input should perhaps clear after a search to save the user from having to clear it manually
    - It may not be readily obvious that the text input is in a form and a search is triggered after entering text by pressing the 'enter' key to submit the form. Perhaps a `search` button would be welcome.
    - The requirements did not specify whether or not to check for duplicate users in the database. With more time I would like to have it check prior to adding to prevent duplicate entries.
    - I took the liberty of using Bulma's table row hover effect. However, this personally does not jive for me with the GitHub profile link being on the first table cell. The hover suggests the entire row is clickable. I would either remove this effect or make the entire row click to navigate to the user's GitHub profile.
    - I understood the success/failure message to be a notification. I would explore doing this as a toast notification instead, or perhaps giving the user the ability to close/delete them once they have viewed them. This would mean storing the notifications as an array (simulating a queue) instead of the string that I have used. I currently have them disappearing after 2000 milliseconds. I would also like to use CSS animations to have the notification fade in and out.
    - ADA compliance is a concern, would like to address that and test with VoiceOver and JAWS.
- Maintainability
  - Static type system and linter
  - Unit testing
  - Integration tests
  - e2e functional tests
- Reusability
  - If this is to be reused in other projects, it can be packaged as a Web Component if there is a need to be framework agnostic. Otherwise with a small bit of effort it can be packaged to be imported and used as a component in another React project.
- Other thoughts
  - Perhaps more robust error handling; the app currently optimistically assumes no connection issues.
  - Pagination may be useful if the collection of users grows to be too long (both from a performance standpoint as well as a usability one).
  - I believe there are newer, lighter alternatives to Moment.js nowadays that can be used and are more conducive to tree shaking.
