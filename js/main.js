(function () {
  var LETTERS = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט', 'י', 'כ', 'ל', 'מ', 'נ', 'ס', 'ע', 'פ', 'צ', 'ק', 'ר', 'ש', 'ת'];
  var LETTER_NAMES = ['אלף', 'בית', 'גימל', 'דלת', 'הא', 'וו', 'זיין', 'חית', 'טית', 'יוד', 'כף', 'למד', 'מם', 'נון', 'סמך', 'עין', 'פא', 'צדי', 'קוף', 'ריש', 'שין', 'תו'];

  var COLORS = [
    { id: 'red', hebrew: 'אדום', hex: '#e74c3c' },
    { id: 'blue', hebrew: 'כחול', hex: '#3498db' },
    { id: 'yellow', hebrew: 'צהוב', hex: '#f1c40f' },
    { id: 'green', hebrew: 'ירוק', hex: '#2ecc71' },
    { id: 'orange', hebrew: 'כתום', hex: '#e67e22' },
    { id: 'purple', hebrew: 'סגול', hex: '#9b59b6' },
    { id: 'pink', hebrew: 'ורוד', hex: '#fd79a8' },
    { id: 'brown', hebrew: 'חום', hex: '#795548' },
    { id: 'black', hebrew: 'שחור', hex: '#2c3e50' },
    { id: 'white', hebrew: 'לבן', hex: '#ecf0f1' }
  ];

  var STORIES = [
    { id: '1', title: 'סיפור ראשון', audioFile: 'story-1.mp3' },
    { id: '2', title: 'סיפור שני', audioFile: 'story-2.mp3' },
    { id: '3', title: 'סיפור שלישי', audioFile: 'story-3.mp3' }
  ];

  function showSection(sectionId) {
    var prefix = 'section-';
    var id = sectionId.indexOf(prefix) === 0 ? sectionId : prefix + sectionId;
    var sections = document.querySelectorAll('.section');
    sections.forEach(function (el) {
      el.classList.toggle('section--active', el.id === id);
    });
  }

  function pad(n) {
    return (n + 1).toString().padStart(2, '0');
  }

  function renderLetters() {
    var grid = document.getElementById('aleph-bet-grid');
    if (!grid) return;
    grid.innerHTML = '';
    LETTERS.forEach(function (letter, i) {
      var name = LETTER_NAMES[i];
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'letter-btn';
      btn.setAttribute('aria-label', name);
      btn.textContent = letter;
      btn.addEventListener('click', function () {
        window.playAudio({
          url: 'audio/letters/' + pad(i) + '.mp3',
          text: name
        });
      });
      grid.appendChild(btn);
    });
  }

  function renderColors() {
    var grid = document.getElementById('colors-grid');
    if (!grid) return;
    grid.innerHTML = '';
    COLORS.forEach(function (c) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'color-btn';
      btn.setAttribute('aria-label', c.hebrew);
      btn.style.backgroundColor = c.hex;
      btn.addEventListener('click', function () {
        window.playAudio({
          url: 'audio/colors/' + c.id + '.mp3',
          text: c.hebrew
        });
      });
      grid.appendChild(btn);
    });
  }

  function renderStories() {
    var list = document.getElementById('stories-list');
    if (!list) return;
    list.innerHTML = '';
    STORIES.forEach(function (s) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'story-btn';
      btn.textContent = s.title;
      btn.addEventListener('click', function () {
        window.playAudio({
          url: 'audio/stories/' + s.audioFile,
          text: s.title
        });
      });
      list.appendChild(btn);
    });
  }

  function bindNav() {
    document.querySelectorAll('[data-section]').forEach(function (el) {
      el.addEventListener('click', function (ev) {
        ev.preventDefault();
        showSection(this.getAttribute('data-section'));
      });
    });
  }

  bindNav();
  renderLetters();
  renderColors();
  renderStories();
})();
