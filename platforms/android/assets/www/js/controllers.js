// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter.controllers', []);
var myaudio = null;
var playing = false; // this var indicate if the audio stream is active
var audioSrc = "";

app.run(function($ionicPlatform) {
	$ionicPlatform.ready(function() {
		if(window.StatusBar) {
			StatusBar.styleDefault();
		}
	});
});


// For manipulate all channels 
app.controller('ChannelController',['$scope','$http',ChannelController]); 

// For manipulate the detail of one channel
app.controller('ChannelDetailController',['$scope','$stateParams','$http',ChannelDetailController]);

// For manipulate the user login
//app.controller('UserLoginController',['$scope','$http',UserLoginController]);


/*
function UserLoginController($scope,$http) {

}
*/




/*
|---------------------------------------------------------------------------------------
| 									CHANNEL CONTROLLERS 
|---------------------------------------------------------------------------------------
| 				This section of code shows the controllers for channels.
*/

/*
|---------------------------------------------------------------------
|	ChannelController
|---------------------------------------------------------------------
*/
function ChannelController($scope,$http) {
	$http.get('channels/channel.json').success(function(data) {
		$scope.channels = data;
	});
}

/*
|--------------------------------------------------------------------------------------
|   ChannelDetailController
|--------------------------------------------------------------------------------------
*/
function ChannelDetailController($scope,$stateParams,$http) {

	$http.get('channels/' + $stateParams.channelId +'.json').success(function(data) {
		$scope.channel = data;
		if (!playing)  // if it is not playing audio
			$scope.audioClass = "icon ion-play"; // shows the play icon 
		else  { 
			if (audioSrc == $scope.channel.stream) 
				$scope.audioClass = "icon ion-pause"; 
			else {
				$scope.audioClass = "icon ion-play";
				playing = false;
			}
		}
	});

	/*
	|------------------------------------------------------------
	|   $scope.play()
	|------------------------------------------------------------
	| The scope of the function handles the click events for 
	| audio playback
	| 
	|
	*/
	$scope.play = function(src) {
		try {
			if (!playing) {
				$scope.audioClass = "icon ion-pause";
				playAudio(src);
			}else {
				$scope.audioClass = "icon ion-play";
				pauseAudio();
			}
		} catch (e) {
			alert('no audio support!');
		} 
	}
}

/*
|------------------------------------------------------------
|   pauseAudio()
|------------------------------------------------------------
| This function handles pause the audio being played
|
|
*/
function pauseAudio() {
	myaudio.pause();
	playing = false;
}

/*
|------------------------------------------------------------
|   playAudio()
|------------------------------------------------------------
| This function is responsible for reproducing the audio 
|
|
*/
function playAudio(src) {
	if (audioSrc != src) {
		if (audioSrc != "")
			pauseAudio();
		myaudio = new Audio(src);
	}
	myaudio.id = 'playerMyAdio';
	myaudio.play();
	playing = true;
	audioSrc = src;
}
