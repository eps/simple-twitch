var accounts = ['freecodecamp', 'khuey', 'ogamingsc2', 'storbeck', 'terakilobyte', 'habathcx', 'RobotCaleb', 'thomasballinger', 'noobs2ninjas', 'beohoff', 'MedryBW', 'brunofin', 'comster404', 'quill18'];
var logo = './img/logo.png';
var streams = 'https://wind-bow.glitch.me/twitch-api/streams/';
var channels = 'https://wind-bow.glitch.me/twitch-api/channels/';
var users = 'https://wind-bow.glitch.me/twitch-api/users/';

$(document).ready(function() {
  accounts.forEach(getStreams);
  // accounts.forEach(cardDisplay);
});

function getChannel(isOnline, currentName){
  $.getJSON(channels + currentName, function(data) {
    if(data.status === 422) {
     $('.notification').append(currentName, 'is not closed!');
    } else if (data.status === 404) {
      $('.notification').append(currentName, 'is not an active user!');
    }
    cardDisplay(isOnline, data);
  });
}

function getStreams(currentName) {
  $.getJSON(streams + currentName, function(data) {
      if (data.stream) {
        // if stream is currently live, pass in true
        // status = data.stream.stream_type;
        getChannel(true, currentName)
      } else {
        status = "Offline";
        getChannel(false, currentName);
      }
  })
}

function cardDisplay(isOnline, data) {
  if (isOnline) {
    $('#streamBody').append("<div class='card online'><div class='streamLogo'><img class='img-responsive' src="+data.logo+"></img></div><div class='streamTitle'><a href="+data.url+'>'+data.display_name+"</a></div><div class='streamStatus'>Online</div></div>");
    $('.online').addClass('active');
  }
  else {
    //stream is offline
    $('#streamBody').append("<div class='card offline'><div class='streamLogo'><img class='img-responsive' src="+data.logo+"></img></div><div class='streamTitle'><a href="+data.url+'>'+data.display_name+"</a></div><div class='streamStatus'>Offline</div></div>");
    $('.offline').addClass('active');
  }
}


function allClicked() {
  $('#all a').addClass('is-active');
  $('#online a').removeClass('is-active');
  $('#offline a').removeClass('is-active');
}

function onlineClicked() {
  $('#streamBody').empty();
  $('#offline a').removeClass('is-active');
  $('#all a').removeClass('is-active');
  $('#online a').addClass('is-active');
}

function offlineClicked() {
  $('#offline a').addClass('is-active');
  $('#online a').removeClass('is-active');
  $('#all a').removeClass('is-active');
}
