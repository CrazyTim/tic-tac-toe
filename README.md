<div>
  <img alt="thumbnail" src="https://crazytim.github.io/tic-tac-toe/img/repo-thumbnail.jpg" width=350px />
  <br>
</div>

# Tic Tac Toe

Learning React. View the [live build](https://crazytim.github.io/tic-tac-toe).

## Features

I completed the [React tutorial](https://reactjs.org/tutorial/tutorial.html), and then added the following features:

- Its a web app (so go install it on your phone :man_shrugging:).
- You can switch between several themes :sunglasses:.
- The board is automatically reset once the game is over.
- The winning squares are highlighted green when the game is over.
- A message is shown when the game is tied.
- A new win algorithm that allows for a dynamic number of rows, columns, and the number of symbols that you need to get in a line to win. Anything other than 3x3 makes the game unfair, but its still fun to see it work! :smile:
- Settings are saved to Web Storage.
- Each player's score is shown above the board.
- The multiple undo buttons for each turn have been replaced with a single undo button.
- Components and styles have been separated into their own files.
- The `Square` component was removed (unnecessary, replaced with a styled `Button`).

## Getting Started

Install Node.js, clone this repo, then run:

```shell
npm install
npm start
```

## Deploy to GitHub Pages

The first time you will need to generate a personal access token and then run:

```shell
git remote set-url origin https://crazytim:<token>@github.com/crazytim/tic-tac-toe
```

To deploy:

```shell
npm run deploy
```

[Refer here](https://create-react-app.dev/docs/deployment/#github-pages) for information about deploying a Create React App to GitHub Pages.

## Acknowledgements
- Some icons adapted from [Octicons](https://github.com/primer/octicons), MIT license.
