var accounts = ['freecodecamp', 'khuey', 'ogamingsc2', 'storbeck', 'terakilobyte', 'habathcx', 'RobotCaleb', 'thomasballinger', 'noobs2ninjas', 'beohoff', 'MedryBW', 'brunofin', 'comster404', 'quill18'];
var logo = './img/logo.png';
var streams = 'https://wind-bow.glitch.me/twitch-api/streams/';
var channels = 'https://wind-bow.glitch.me/twitch-api/channels/';
var users = 'https://wind-bow.glitch.me/twitch-api/users/';

$(document).ready(function() {
  accounts.forEach(getStreams);
});

function Account(name, logo){
  this.name = name;
  this.logo = logo;
}


// function getUserInfo(currentName) {
//   $.getJSON(users + currentName + '?callback=?', function(data) {
//     console.log(data);
//     if (data.logo === null) {
//       currentName = new Account(data.display_name, logo);
//       console.log('testing', currentName,logo);
//     } else {
//       currentName = new Account(data.display_name, data.logo);
//     }
//     $("#streamList").append(
//       "<li><img src=" + currentName.logo + "></img>"+"<h4>"+currentName.name+"</h4>"+"</li>"
//     );
//   })
//   return currentName;
// }

function getStreams(currentName) {
  $.getJSON(streams + currentName, function(data) {
      if (data.stream) {
        status = true;
        getChannel(currentName, status);
      } else {
        status = false;
        getChannel(currentName, status);
      }
  })
}


function getChannel(currentName, status){
  $.getJSON(channels + currentName, function(data) {
    if (data.status === 404) {
      $('.notification').append(data.message);
    } else {
      var card = cardDisplay(data, status);
      $('#streamList').append(card);
    }
  })
}

function cardDisplay(data, status) {
  console.log(status);
  var card = "";

}



function onlineClicked() {
  console.log('clicked');
  $('#online').addClass('active');
}
