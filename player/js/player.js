const audio = document.getElementById("myAudio");
const spotifyPlayer = document.getElementById("spotifyPlayer");
const progressBar = document.getElementById("progressBar");
const progressContainer = document.getElementById("progressContainer");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const mainPlayBtn = document.getElementById("mainPlayBtn");
const volumeSlider = document.getElementById("volumeSlider");
const additionalContent = document.getElementById("additionalContent");

// Variável para controlar se a duração já foi definida
let durationSet = false;

spotifyPlayer.style.display = "none";

function initAudio() {
      spotifyPlayer.style.display = "flex";
      additionalContent.style.display = "block"; // Mostra o conteúdo adicional
      audio.volume = volumeSlider.value;

      durationSet = false;

      audio.load();
      audio.oncanplay = function () {
            if (!durationSet) {
                  durationEl.textContent = formatTime(audio.duration);
                  durationSet = true;
            }

            audio.play().then(() => {
                  mainPlayBtn.textContent = '❚❚';
            }).catch(error => {
                  console.log("Reprodução automática bloqueada:", error);
                  spotifyPlayer.style.display = "flex";
            });
      };
}

function formatTime(timeInSeconds) {
      if (isNaN(timeInSeconds) || !isFinite(timeInSeconds)) return "00:00";

      const totalSeconds = Math.abs(Math.floor(timeInSeconds));
      const minutes = Math.floor(totalSeconds / 60);
      const seconds = totalSeconds % 60;

      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds} `;
}

function updateProgress() {
      currentTimeEl.textContent = formatTime(audio.currentTime);
      console.log(audio.duration);
      if (audio.duration && !isNaN(audio.duration)) {
            const progressPercent = (audio.currentTime / audio.duration);
            progressBar.style.width = `${progressPercent}%`;
      }
}

function setProgress(e) {
      if (!audio.duration || isNaN(audio.duration)) return;
      const width = this.clientWidth;
      const clickX = e.offsetX;
      audio.currentTime = (clickX / width) * audio.duration;
}

function togglePlay() {
      if (audio.paused) {
            audio.play().then(() => {
                  mainPlayBtn.textContent = '❚❚';
            });
      } else {
            audio.pause();
            mainPlayBtn.textContent = '▶';
      }
}

function changeVolume() {
      audio.volume = volumeSlider.value;
      const volumeIcon = document.querySelector('.volume-icon');
      if (audio.volume == 0) {
            volumeIcon.textContent = '🔇';
      } else if (audio.volume < 0.5) {
            volumeIcon.textContent = '🔉';
      } else {
            volumeIcon.textContent = '🔊';
      }
}

mainPlayBtn.addEventListener('click', togglePlay);
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', () => {
      mainPlayBtn.textContent = '▶';
});
progressContainer.addEventListener('click', setProgress);
volumeSlider.addEventListener('input', changeVolume);

audio.addEventListener('loadedmetadata', function () {
      if (!durationSet) {
            durationEl.textContent = " " + formatTime(audio.duration);
            durationSet = true;
      }
});

changeVolume();