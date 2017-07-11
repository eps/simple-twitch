var accounts = ['freecodecamp', 'khuey', 'ogamingsc2', 'storbeck', 'terakilobyte', 'habathcx', 'RobotCaleb', 'thomasballinger', 'noobs2ninjas', 'beohoff', 'MedryBW', 'brunofin', 'comster404', 'quill18'];
var logo = './img/logo.png';
var streams = 'https://wind-bow.glitch.me/twitch-api/streams/';
var channels = 'https://wind-bow.glitch.me/twitch-api/channels/';
var users = 'https://wind-bow.glitch.me/twitch-api/users/';

$(document).ready(function() {
  accounts.forEach(getStreams);
  // accounts.forEach(cardDisplay);

  $('#search-form').submit(function(e){
    e.preventDefault();
    var searchInput = $('.search-string').val();
    getStreams(searchInput);
    $('#search-form').trigger('reset');
  });
});

function getChannel(isOnline, currentName){
  $.getJSON(channels + currentName, function(data) {
    if(data.status === 422) {
     $('.notification').append(currentName, 'is not closed!');
    } else if (data.status === 404) {
      $('.notification').append(currentName, 'is not an active user!');
    } else if (data.logo === null) {
      data.logo = logo;
    }
    cardDisplay(isOnline, data, logo);
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
      // if (data.stream.channel.logo === null) {
      //   data.stream.channel.logo = logo;
      //   console.log(logo);
      // }
  })
}

function cardDisplay(isOnline, data, logo) {
  if (isOnline) {
    $('#stream-body').append("<div class='card online'><div class='streamLogo'><img class='img-responsive' src="+data.logo+"></img></div><div class='streamTitle'><a href="+data.url+'>'+data.display_name+"</a></div><div class='streamStatus'>Online</div></div>");
    $('.online').addClass('active');
  }
  else {
    //stream is offline
    $('#stream-body').append("<div class='card offline'><div class='streamLogo'><img class='img-responsive' src="+data.logo+"></img></div><div class='streamTitle'><a href="+data.url+'>'+data.display_name+"</a></div><div class='streamStatus'>Offline</div></div>");
    $('.offline').addClass('active');
  }
}


function allClicked() {
  $('#all a').addClass('is-active');
  $('#online a').removeClass('is-active');
  $('#offline a').removeClass('is-active');
  $('#stream-body .offline').show();
  $('#stream-body .online').show();
}

function onlineClicked() {
  // $('#stream-body').empty();
  $('#offline a').removeClass('is-active');
  $('#all a').removeClass('is-active');
  $('#online a').addClass('is-active');
  $('#stream-body .offline').hide();
}

function offlineClicked() {
  $('#offline a').addClass('is-active');
  $('#online a').removeClass('is-active');
  $('#all a').removeClass('is-active');
  $('#stream-body .offline').show();
  $('#stream-body .online').hide();
}
