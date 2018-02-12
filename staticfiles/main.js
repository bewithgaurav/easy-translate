var SpeechRecognition = '';
var recognition = '';

$(document).ready(function(){
	$("#sendTranslate").click(function(){
		$("#voiceResults").html('');
		$("#translatedVoiceResults").html('');
		var text=$('#inputText').val();
		console.log("HOST IS - "+host);
		var url="http://"+host+":8081/translate";
		var lang=$('input[name=fromto]:checked').val();
		$("#result").html('<div class="loader"></div>');
		console.log(text);
		$.ajax({
			type: "POST",
			url: url,
			data: {text:text,lang:lang},
			success: function(result){
				console.log("result :"+result);
				$("#result").html(result);
			}
		});
	});
	$("#startVoice").click(function(){
		startRecording();
		$("#result").html('');
		recognition.start();
  		console.log('Voice recognition Started');
	});
	
});

function startRecording(){
	SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
	recognition = new SpeechRecognition();
	recognition.lang = 'en-IN';

	recognition.onresult = function(event) {
		// The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
		// The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
		// It has a getter so it can be accessed like an array
		// The [last] returns the SpeechRecognitionResult at the last position.
		// Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
		// These also have getters so they can be accessed like arrays.
		// The [0] returns the SpeechRecognitionAlternative at position 0.
		// We then return the transcript property of the SpeechRecognitionAlternative object

		var last = event.results.length - 1;
		var result = event.results[last][0].transcript;

		console.log('Result: ' + result);
		console.log('Confidence: ' + event.results[0][0].confidence);
		
		console.log(event.results)

		console.log("HOST IS - "+host);
		var url="http://"+host+":8081/translate";
		
		var lang='hi';
		$("#voiceResults").html('<div class="loader"></div>');
		$("#translatedVoiceResults").html('');
		
		$.ajax({
			
			type: "POST",
			url: url,
			data: {text:result,lang:lang},
			success: function(result){
				
				console.log("Voice Result :"+result);
				$("#voiceResults").html(result);
				
				var lang='en';
				$("#translatedVoiceResults").html('');
				
				$.ajax({
					type: "POST",
					url: url,
					data: {text:result,lang:lang},
					success: function(result){
						console.log("Translated Voice Result :"+result);
						$("#translatedVoiceResults").html(result);
					}
				});
			
			}
		
		});

	}

	recognition.onspeechend = function() {
	  recognition.stop();
	}
}