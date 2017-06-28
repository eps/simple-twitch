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
        status = "online";
        getChannel(currentName, status);
      } else {
        status = "offline";
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
  var card = "";
  if (status === "online") {
    card += '<p class="online">' + data.display_name + '</p>';
    $('.online').addClass('active');
  }
  if (status === "offline") {
    card += '<p class="offline">' + data.display_name + '</p>';
    $('.offline').addClass('active');
  }
  return card;
}

function allClicked() {
  $('#all a').addClass('is-active');
  $('#online a').removeClass('is-active');
  $('#offline a').removeClass('is-active');
}

function onlineClicked() {
  $('#online a').addClass('is-active');
  $('#offline a').removeClass('is-active');
  $('#all a').removeClass('is-active');
}

function offlineClicked() {
  $('#offline a').addClass('is-active');
  $('#online a').removeClass('is-active');
  $('#all a').removeClass('is-active');
}
