var accounts = ['freecodecamp', 'khuey', 'ogamingsc2', 'storbeck', 'terakilobyte', 'habathcx', 'RobotCaleb', 'thomasballinger', 'noobs2ninjas', 'beohoff', 'MedryBW', 'brunofin', 'comster404', 'quill18'];
var logo = './img/logo.png';
var streams = 'https://api.twitch.tv/kraken/streams/';
var channels = 'https://wind-bow.glitch.me/twitch-api/channels/';
var users = 'https://wind-bow.glitch.me/twitch-api/users/';


function Account(name, logo){
  this.name = name;
  this.logo = logo;
}

$(document).ready(function() {
  accounts.forEach(getUserInfo);
});

function getUserInfo(currentName) {
  $.getJSON(users + currentName + '?callback=?', function(data) {
    console.log(data);
    if (data.logo === null) {
      currentName = new Account(data.display_name, logo);
      console.log('testing', currentName,logo);
    } else {
      currentName = new Account(data.display_name, data.logo);
    }
    $("#streamList").append("<div><li><img src=" + currentName.logo + "></img>"+currentName.name+"</li></div>");
  })
  return currentName;
}
