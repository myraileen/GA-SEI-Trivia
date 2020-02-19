# Trivia Game  

## How to play:  
* Select game options:  
  - Choose a question category  
  - Choose how many questions to play  
* **Click start!**  

### UX expected features
Upon loading the game into the browser, once a game is started, the player will be prompted with the number of questions selected from the category selected. Once game play begins:
* The next question is enabled only after choosing an answer to the current question.
* Upon answering a question the player gets feedback if their answer is correct or not and the game score is updated.
* When all questions have been played, the player can change game options and start a new game. 
  - _Game play technical consideration: with each browser refresh, a session token is obtained from the game's data-service (https://opentdb.com) which prevents the same question from presenting to the player during the browser session. If the player consumes the limited number of questions available, the browser would need to be refreshed. Consequently, the player could be presented with repeat questions. (A 'gold' version of this game could check the remaining number of questions in the category and automatically obtain a new session token)_

## Technologies used:  
* Open Triva Database _(https://opentdb.com)_ created by Pixeltail Games. LLC, a free to use, user contributed trivia question database.  
* Google Fonts _(https://fonts.google.com)_  
* CSS Animate library
* HTML validated with HTML5 Validator _(https://html5.validator.nu/)_  
* CSS validated with CSS Validator _(https://jigsaw.w3.org/css-validator/)_  

## Acknowledgements and credits
* Guidance for how to shuffle an array was referenced from Mike Bostock's blog-post about coding the Fisher-Yates Algorithm in javascript.  
  - _(https://bost.ocks.org/mike/shuffle)_  
  - _(https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#Fisher_and_Yates')_  

