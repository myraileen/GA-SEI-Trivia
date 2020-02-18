# Trivia Game  

## How to play:  
* Select game options:  
  - Choose a question category  
  - Choose how many questions to play  
* **Click start!**  

## Technologies used:  
* Open Triva Database _(https://opentdb.com)_ created by Pixeltail Games. LLC, a free to use, user contributed trivia question database.  
  - With each browser refresh, a session token is obtained from the api to prevent the same question from presenting to the player during play. If the player consumes the limited number of questions available, the browser would need to be refreshed. Consequently, the player may be presented with repeat questions. (A 'gold' version of this game could check the remaining number of questions in the category and automatically renew a token)
* Google Fonts _(https://fonts.google.com)_  
* HTML validated with HTML5 Validator _(https://html5.validator.nu/)_  
* CSS validated with CSS Validator _(https://jigsaw.w3.org/css-validator/)_  

## Acknowledgements and credits
* Guidance for how to shuffle an array was referenced from Mike Bostock's blog-post about coding the Fisher-Yates Algorithm in javascript.  
  - _(https://bost.ocks.org/mike/shuffle)_  
  - _(https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#Fisher_and_Yates')_  
