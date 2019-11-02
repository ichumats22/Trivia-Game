$(document).ready(function() {
  //VARIABLES
  //-----------------------------------------------------------------------------------------------------------------------------------------------
  //Set time interval to 15 seconds
  var counter = 180;
  var intervalID;
  var score = 0;
  var questionIndex = 0;
  var questions = [
    {
      q: "What creature is in the corner the first time Harry visits Proffessor Lupin's office?",
      c: ['House Elf','Grindylow', 'Blast-Ended Skrewt', 'Boggart'],
      a: '2',
    },
    {
      q: 'What Quidditch team does Oliver Wood join after leaving Hogwarts?',
      c: ['Chudley Cannons','Irish National Team', 'Puddlemere United', 'Holyhead Harpies'],
      a: '3',
    },
    {
      q: 'What Hogwarts house is known for its cleverness?',
      c: ['Gryffindor','Hufflepuff', 'Ravenclaw', 'Slytherin'],
      a: '3',
    },
    {
      q: 'Which of the following characters is NOT a Death-Eater?',
      c: ['Stan Shunpike','Antonin Dolohov','Rodolphus Lestrange', 'Walden McNair'],
      a: '1',
    },
    {
      q: 'Who does Harry impersonate when he, Ron, and Hermione infiltrate the Ministry of Magic?',
      c: ['Sturgis Podmore','Arthur Weasley', 'Reginald Cattermole', 'Albert Runcorn'],
      a: '4',
    },
    {
      q: 'Which of the following does Hagrid NOT discuss during his care of magical creatures lessons?',
      c: ['Flubberworms','Nifflers','Hippogriff','Bowtruckle'],
      a: '4',
    },
    {
      q: 'Which one of the following is NOT a spell?',
      c: ['Salvio Hexia','Episkey', 'Finite', 'Point Me'],
      a: '3',
    },
    {
      q: 'Which of the following characters is a member of the Order of the Phoenix?',
      c: ['Mafalda Hopkirk', 'Dedalus Diggle', 'Amelia Bones', 'Reginald Cattermole'],
      a: '2',
    },
    {
      q: 'Which of the following is NOT a method Harry used to leave the Dursleys?',
      c: ['Portkey','Ford Anglier', 'Floo Powder', 'Broomstick'],
      a: '1',
    },
    {
      q: 'What does Molly Weasley prefer to be called by her husband?',
      c: ['Mollywobbles','Mollycoddles', 'Mollykins', 'Mollybear'],
      a: '1',
    },
    {
      q: `Which one of the following was NOT a member of Dumbledore's Army?`,
      c: ['Ernie MacMillan','Luna Lovegood', 'Percy Weasley', 'Sheamus Finnegan'],
      a: '3',
    },
  ]

  //FUNCTIONS
  //-----------------------------------------------------------------------------------------------------------------------------------------------
  function run() {
    clearInterval(intervalID);
    intervalID = setInterval(countdown, 1000)
  };

  function countdown() {
    //Decrease our 30 second counter by one 
    counter--
    //Show the time in #timeRemaining
    $('#timeRemaining').text('Seconds Remaining: ' + counter);
    //Stop the function and alert the user their time is up once the counter hits zero
    if (counter === 0) {
      stop();
      $('#question').text("Time's Up!");
    };
  };

  function stop() {
    $('#question').hide();
    $('form').hide();
    $('#secondaryBreaks').hide();
    $('#nextQuestion').hide();
    clearInterval(intervalID);
    $('#score').empty().append('Your final score is ' + score + ' out of ' + questions.length + '!');
  };

  function renderConditions() {
    //Delete the content inside the question and answerChoices divs so we do not have old answer choices on the screen
    $('#question').empty();
    $('#answerChoices').empty();
    $('#timeRemaining').empty().append('Seconds Remaining: ' + counter);
    $('.form-check-input').prop('checked', false);
    //So long as there are questions remaining, display the next one
    if (questionIndex <= (questions.length - 1)) {
      $('#question').append(questions[questionIndex].q);
      for (var i=0; i <= 3; i++) {
        $('#'+i).empty().append(questions[questionIndex].c[i]);
      };
    } else {
      stop();
    }
  };

  function checkAnswer() {
    var userInput = $('.form-check-input:checked').val();
    console.log(userInput);
    console.log(questions[questionIndex].a);
    if (userInput == questions[questionIndex].a) {
      $('#answerChoices').empty();
      $('#question').empty().append('Correct!');
      score ++;
      updateScore();
    }
    else {
      $('#answerChoices').empty();
      $('#question').empty().append("Sorry, that's incorrect!");
    }
  };

  function updateScore() {
    $('#score').empty().append('Score: ' + score);
  };
  //GAME LOGIC
  //-----------------------------------------------------------------------------------------------------------------------------------------------
  //Calling functions to start the game
  renderConditions();
  updateScore();
  run ();

  //When the user clicks the 'Next Question' button, it will run the following function...
  $('#nextQuestion').on('click',function() {
    checkAnswer();
    updateScore();
    questionIndex++
    renderConditions();
  });
})