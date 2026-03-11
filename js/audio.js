(function (global) {
  function playAudio(options) {
    var url = options.url;
    var text = options.text || '';

    if (currentAudio) {
      currentAudio.pause();
      currentAudio = null;
    }
    if (global.speechSynthesis) {
      global.speechSynthesis.cancel();
    }

    if (url) {
      var audio = new Audio(url);
      currentAudio = audio;
      var fallbackDone = false;
      function onFallback() {
        if (!fallbackDone) {
          fallbackDone = true;
          speakTTS(text);
        }
      }
      audio.addEventListener('error', onFallback);
      audio.addEventListener('ended', function () {
        if (currentAudio === audio) currentAudio = null;
      });
      audio.play().catch(onFallback);
    } else {
      speakTTS(text);
    }
  }

  function speakTTS(text) {
    if (!text || !global.speechSynthesis) return;
    var u = new SpeechSynthesisUtterance(text);
    u.lang = 'he-IL';
    global.speechSynthesis.speak(u);
  }

  var currentAudio = null;

  global.playAudio = playAudio;
})(typeof window !== 'undefined' ? window : this);
