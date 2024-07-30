// Ravenclaw, Slytherin, Hufflepuff, Gryffindor
// How do you describe yourself?
//What is your favourite colour?
// What is your favourite animal?
// What item would you like?
// Who is your favourite Harry Potter character?
// 1. Display the starting page with a fuction called unload
// 1.1 Hide all the questions and results page elements (question, 4 buttons ,image, name)
function start() {
   document.getElementById("question").style.display = "none";
   document.getElementById("button1").style.display = "none";
   document.getElementById("button2").style.display = "none";
   document.getElementById("button3").style.display = "none";
   document.getElementById("button4").style.display = "none";
   document.getElementById("name").style.display = "none";
   document.getElementById("image").style.display = "none";
}

// 2. Creat a list of questions-and-answers pairs
const questions = [
   [
      ["How do you describe yourself?"],
      ["Courage", "Intelligence", "Loyal", "Cunning"]
   ], [
      ["What is your favourite colour?"],
      ["Red", "Blue", "Yellow", "Green"]
   ], [
      ["What is your favourite animal?"],
      ["Lion", "Raven", "Badger", "Serpent"]
   ], [
      ["What item would you like?"],
      ["Dagger", "Flying Jewel", "Trophy", "Locket"]
   ], [
      ["Who is your favourite Harry Potter character?"],
      ["Harry Potter", "Luna Lovegood", "Cedric Digorry", "Draco Malfoy"]
   ]
]

// 3. Create a function to change the quiz questions one-by-one
var questionnumber = 0;

function setquestion() {
   // 3.1 Change the text displayed by showing the correct question and answer pairs
   document.getElementById("question").innerHTML = questions[questionnumber][0];
   document.getElementById("button1").innerHTML = questions[questionnumber][1][0];
   document.getElementById("button2").innerHTML = questions[questionnumber][1][1];
   document.getElementById("button3").innerHTML = questions[questionnumber][1][2];
   document.getElementById("button4").innerHTML = questions[questionnumber][1][3];



   // 3.2 Display the correct elements on the question and answeres page

   document.getElementById("question").style.display = "block";
   document.getElementById("button1").style.display = "block";
   document.getElementById("button2").style.display = "block";
   document.getElementById("button3").style.display = "block";
   document.getElementById("button4").style.display = "block";
   document.getElementById("name").style.display = "none";
   document.getElementById("image").style.display = "none";
   document.getElementById("start").style.display = "none";
   document.getElementById("Description").style.display = "none";

}

// create a function to add points to the respective Harry Potter houses'

var Gryffindor = 0;
var Ravenclaw = 0;
var Hufflepuff = 0;
var Slytherin = 0;

function addpoint(selected) {
   // two equal signs means we are checking if they are equal
   if (selected == 1) {
      // add 1 point to Gryffindor
      Gryffindor += 1;
   } else if (selected == 2) {
      Ravenclaw += 1;
   } else if (selected == 3) {
      Hufflepuff += 1;
   } else if (selected == 4) {
      Slytherin += 1;
   }
}


// 5. Calculate the results, which variable has the highest number of points??
function result() {
   let highest = Math.max(Gryffindor, Ravenclaw, Hufflepuff, Slytherin);
   if (Gryffindor == highest) {
      document.getElementById("name").innerHTML = "The <b>Gryffindor</b> house emphasised the traits of courage as well as daring, nerve, and chivalry,and thus its members were generally regarded as brave, though sometimes to the point of recklessness. Some Gryffindors had also been noted to be short-tempered.";
      document.getElementById("image").src = "images/Gryffindor.png";

   }
   if (Ravenclaw == highest) {
      document.getElementById("name").innerHTML = "The<b>Ravenclaw</b> House prized learning, wisdom, wit, and intellect in its members.Thus, many Ravenclaws tended to be academically motivated and talented students.";
      document.getElementById("image").src = "images/Ravenclaw.png";

   }
   if (Hufflepuff == highest) {
      document.getElementById("name").innerHTML = "<b>Hufflepuff</b> was the most inclusive among the four houses, valuing hard work, dedication, patience, loyalty, and fair play rather than a particular aptitude in its members.";
      document.getElementById("image").src = "images/Hufflepuff.png";
}
   if (Slytherin == highest) {
      document.getElementById("name").innerHTML = "<b>Slytherins</b> tended to be ambitious, shrewd, cunning, strong leaders, and achievement-oriented. They also had highly developed senses of self-preservation";
      document.getElementById("image").src = "images/Slytherin.png";
   }
   document.getElementById("name").style.display = "block";
   document.getElementById("image").style.display = "block";
   document.getElementById("question").style.display = "none";
   document.getElementById("button1").style.display = "none";
   document.getElementById("button2").style.display = "none";
   document.getElementById("button3").style.display = "none";
   document.getElementById("button4").style.display = "none";
}

//6. Make the functions run when we click on the buttons

function button1clicked(){
   addpoint(1);
   questionnumber += 1;
   if (questionnumber == 5) {
      result();
   } else {
      setquestion();
   }
}

function button2clicked(){
   addpoint(2);
   questionnumber += 1;
   if (questionnumber == 5) {
      result();
   } else {
      setquestion();
   }
}

function button3clicked(){
   addpoint(3);
   questionnumber += 1;
   if (questionnumber == 5) {
      result();
   } else {
      setquestion();
   }
}

function button4clicked(){
   addpoint(4);
   questionnumber += 1;
   if (questionnumber == 5) {
      result();
   } else {
      setquestion();
   }
}

