# Trivia Game 

## How to play:
* Open game in browser (https://myraileen.github.io/GA-SEI-Trivia)
* Select game options:  
  - Choose a question category  
  - Choose how many questions to play  
* **Click start!**  
  - The number of questions from the selected category will be presented until all questions have been answered.  
  - Upon answering a question the score is updated to show questions answered correctly and incorrectly.  
  - When all questions have been answered, the win status for current and previously played games is displayed and a new game can be started. 
  
## Technologies used, Acknowledgements and Credits
* HTML validated with HTML5 Validator _(https://html5.validator.nu/)_  
* Javascript
* CSS validated with CSS Validator _(https://jigsaw.w3.org/css-validator/)_  
* CSS Animate library _(https://daneden.github.io/animate.css/)_
* Google Fonts _(https://fonts.google.com)_  
* Open Triva Database _(https://opentdb.com)_ created by Pixeltail Games. LLC, a free to use, user contributed trivia question database.  
* Postman (postman.com) used to test API connection and URLs.
* Guidance for how to shuffle an array was referenced from Mike Bostock's blog-post about coding the Fisher-Yates Algorithm in javascript.  
  - _(https://bost.ocks.org/mike/shuffle)_  
  - _(https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#Fisher_and_Yates')_  
* GitHub used for revision history and control: repository for the game is available at (https://github.com/myraileen/GA-SEI-Trivia).

## Developer Notes
My approach to deliver this project centered on meeting all the minimum requirements while touching on the topics covered during the SEI class so far. Once I chose Trivia as the game to develop, I sketched out a miniumal viable product (MVP) wireframe and concept on a piece of notebook paper (https://github.com/myraileen/GA-SEI-Trivia/tree/master/images/wireframe.jpg).

I wanted to use an API for the question content so I searched the internet for a free and well documented API that appeared to be stable and have a user base. I landed on the _**Open Trivia Database**_ API and found I was able to connect to it using the Postman app.

I roughed out basic html, css and javascript and got the API connection working in the direction of my wireframe concept. As I tested, I found I received the same question back from the API many times. Looking at their documentation, they had a remedy for this by implementing a session token. I followed the API documentation and implemented the token. As I familiarized myself with the API, I found some question categories had very few questions in them. I reviewed the number of questions per category and chose to limit my game to only a few categories that had the most qusetions.

The correct answer needed to be shuffled into the incorrect answers, so I searched for a way to do that and found the Fisher-Yates Algorithm was touted as the best way and a blogpost from Mike Bostock demonstrated this algorithm in javascript. 

I wanted the user interface to be very simple and intuitive needing only visual cues to play. I introduced drop-down and button enabling and disabling to force game flow and I got event listeners setup when a new question was played. 

I added a scoreboard class to use local storage to keep track of total game wins and losses and this was a good learning experience: if the storage key doesn't exist it must be created, for example (to avoid 'undefined' and 'NaN' evaluations).

I changed the final UI layout to single column, moving away from the two column design I originally sketched. I did this because I wanted the screen to fit nicely on mobile devices and the learning curve to implement breakpoints and @media CSS queries went beyond my will for the project... but I did have some good learnings around responsive design that I would consider in future projects at the start. 

I added some user feedbacks with the **CSS Animate** library that were fun to play with and refactored and cleaned my code. If I were to continue to build it out, I would:
  - change the game button to a countdown timer when a new question is played
  - show question correct/incorrect status as a graph/meter/gauge
  - add a multi-player mode
  - add a feature for players to see the correct answer if they got it wrong
  - responsively adapting the game layout based on players display size
  
Fun project... I enjoyed it a lot!  
