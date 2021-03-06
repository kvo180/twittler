function getTweets() {
	var $main = $('main');
  $main.html('');

  var index = streams.home.length - 1;
  while(index >= 0){
    var tweet = streams.home[index];
    var $tweet = $('<div class="tweet"></div>');
    var $user = $('<p class="user"></p>');
    var $userLink = $('<span class="userlink" id=' +index+ '>@' +tweet.user+ '</span>');
    var $message = $('<p class="message"></p>');
    var $timestamp = $('<p class="timestamp"></p>');

    $message.text(tweet.message);
    $timestamp.text(formatDate(tweet.created_at));

    $userLink.appendTo($user);
    $user.prependTo($tweet);
    $message.appendTo($tweet);
    $timestamp.appendTo($tweet);
    $tweet.appendTo($main);
    index -= 1;
  }
}

function getTweetsForUser(username) {
	$('main').html('');

	var index = streams.users[username].length - 1;

	while (index >= 0) {
		var tweet = streams.users[username][index]
		var $userTweet = $('<div class="tweet"></div>');
		var $user = $('<p class="user"></p>');
		var $message = $('<p class="message"></p>');
		var $timestamp = $('<p class="timestamp"></p>');

		$user.text('@' + username);
		$message.text(tweet.message);
		$timestamp.text(formatDate(tweet.created_at));

		$user.prependTo($userTweet);
		$message.appendTo($userTweet);
		$timestamp.appendTo($userTweet);
		$userTweet.appendTo($('main'));
		index -= 1;
	}
}

$(document).ready(function(){
	getTweets();

  $('.btn').on('click', function() {
  	$('h4').text('created by Khoa Vo');
  	$('.btn').text('get new tweets!');
  	getTweets();
  });

  $('main').on('click', '.userlink', function() {
  	var username = $(this).text().substring(1);
		$('h4').text($(this).text());
		$('.btn').text('home');
		getTweetsForUser(username);
  });

});

function formatDate(date) {
	var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	var weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

	var weekdayIndex = date.getDay();
	var day = date.getDate();
	var monthIndex = date.getMonth();
	var hour = date.getHours();
	var amPm = (hour >= 0 && hour <= 11) ? 'AM' : 'PM';
	var minutes = date.getMinutes().toString();

	if (hour === 0 || hour === 12) {
		hour = 12;
	} else {
		hour = hour % 12;
	}
	if (minutes.length === 1) {
		minutes = '0' + minutes;
	}

	return weekdays[weekdayIndex] + ', ' + months[monthIndex] + ' ' + day.toString() + ' at ' + hour.toString() + ':' + minutes + ' ' + amPm;
}
