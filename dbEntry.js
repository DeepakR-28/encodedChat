var firebaseConfig = {
  apiKey: "AIzaSyCPSWg1uahyT-5xgtseOIRzii6RU-wy46I",
  authDomain: "encoded-chat.firebaseapp.com",
  databaseURL: "https://encoded-chat.firebaseio.com",
  projectId: "encoded-chat",
  storageBucket: "encoded-chat.appspot.com",
  messagingSenderId: "106128365252",
  appId: "1:106128365252:web:8dc9d057cea45621405b91",
  measurementId: "G-K0851R1YFH",
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var messageRef = firebase.database().ref("messages");

document.getElementById("chatBox").addEventListener("submit", storeMessages);

var name = prompt("Enter your name");
//! Storing in database from here
var finalText = "";
var keyword = prompt(
  "Enter the keyword for encoding (make sure the keyword doesn't have repeated letters)"
);
function KeywordEncoder() {
  var inputString = document.getElementById("message").value;
  var alphabets = "abcdefghijklmnopqrstuvwxyz";
  var encodedAlphabets = keyword;
  while (1) {
    if (keyword.length > 26) {
      keyword = prompt("Enter the Keyword which is 26 letters long");
    } else {
      break;
    }
  }
  for (var i = 0; i < 26; i++) {
    //   encodedAlphabets += alphabets[i];
    if (encodedAlphabets.includes(alphabets[i])) {
      continue;
    } else {
      encodedAlphabets += alphabets[i];
    }
  }
  for (var i = 0; i < inputString.length; i++) {
    changeIndex = alphabets.indexOf(inputString[i]);
    if (changeIndex == -1) {
      finalText += " ";
    } else {
      finalText += encodedAlphabets[changeIndex];
    } //   console.log(inputString[i] + " is at " + changeIndex);
  }
}

function storeMessages(e) {
  e.preventDefault();
  var message = name + " : " + finalText;
  //   console.log(message);
  saveMessage(message);

  setTimeout(function () {
    document.querySelector(".alert").style.display = "none";
  }, 3000);
  document.getElementById("chatBox").reset();
  finalText = "";
}

function getInputVal(id) {
  return document.getElementById(id).value;
}

function saveMessage(message) {
  var newMesssageRef = messageRef.push();
  newMesssageRef.set({
    message: message,
  });
}

// !displaying data on window from here

var ref = firebase.database().ref("messages");
ref.on("value", gotData, errData);

function gotData(data) {
  var messageListings = document.querySelectorAll(".messageListings");
  for (var i = 0; i < messageListings.length; i++) {
    messageListings[i].remove();
  }
  var messages = data.val();
  var keys = Object.keys(messages);
  for (var i = 0; i < keys.length; i++) {
    var k = keys[i];
    var finalText = messages[k].message;
    var li = document.createElement("li");
    li.innerHTML = finalText;
    li.setAttribute("class", "messageListings");
    document.getElementById("messageList").appendChild(li);
  }
}
function errData(err) {
  console.log("error");
  console.log(err);
}
