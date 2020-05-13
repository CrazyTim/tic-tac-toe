<div>
  <img alt="Countdown" src="https://crazytim.github.io/tic-tac-toe/img/repo-thumbnail.jpg" width=350px />
  <br>
</div>

# Tic Tac Toe

Learning React while adding fun features, such as themes and adjustable rows/columns :smile:.

View the [live build](https://crazytim.github.io/tic-tac-toe).

## Getting Started

Install Node.js, clone this repo, then run:

```
npm install
npm start
```

## Deploy to GitHub Pages

```
npm run deploy
```

[Refer here](https://create-react-app.dev/docs/deployment/#github-pages) for information about deploying a Create React App to GitHub Pages.

## Features

I completed the [React tutorial](https://reactjs.org/tutorial/tutorial.html) and then added the following features:

- Fancy styles.
- Themes.
- The board is automatically reset once the game is over.
- The winning squares are highlighted green when the game is over.
- A message is shown when the game is tied.
- A new win algorithm that allows for a dynamic number of rows, columns, and the number of symbols that you need to get in a line to win. Note that changing this actually breaks the game, but its fun to see it work!
- User can change some of the settings, including the number of rows and columns.
- Each player's score is shown above the board.
- The multiple undo buttons for each turn have been replaced with a single undo button.
- Components and styles have been separated into their own files.
- The `Square` component was removed (unnecessary, replaced with a styled `Button`).

## Acknowledgements
- Icons adapted from [Octicons](https://github.com/primer/octicons), MIT license.
