# Trivia Game  

## How to play:  
* Select game options:  
  - Choose a question category  
  - Choose how many questions to play  
* **Click start!**  

### UX expected features  
Once game play begins by clicking the start button:
* The number of questions from the selected category will be presented to the player. 
  - During game play, the category and number of questions to play cannot be changed.  
* Upon answering a question the player's score is updated to show questions answered correctly and incorrectly.  
* When all questions have been answered, the win status for current and previously played games is displayed and a new game can be started. 
  
## Technologies used, Acknowledgements and Credits
* HTML validated with HTML5 Validator _(https://html5.validator.nu/)_  
* Javascript
* CSS validated with CSS Validator _(https://jigsaw.w3.org/css-validator/)_  
* CSS Animate library _(https://daneden.github.io/animate.css/)_
* Google Fonts _(https://fonts.google.com)_  
* Open Triva Database _(https://opentdb.com)_ created by Pixeltail Games. LLC, a free to use, user contributed trivia question database.  
  - _Game play technical consideration: with each browser refresh, a session token is obtained from the game's data-service (https://opentdb.com) which prevents the same question from presenting to the player during the browser session. If the player consumes the limited number of questions available, the browser would need to be refreshed. Consequently, the player could be presented with repeat questions. (A 'gold' version of this game could check the remaining number of questions in the category and automatically obtain a new session token)_  
* Guidance for how to shuffle an array was referenced from Mike Bostock's blog-post about coding the Fisher-Yates Algorithm in javascript.  
  - _(https://bost.ocks.org/mike/shuffle)_  
  - _(https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#Fisher_and_Yates')_  