const passages = [
  "This could be, or perhaps few can name a pasteboard river that isn't a brittle alligator. A swordfish is a death's numeric. Authors often misinterpret the mist as a swelling asphalt, when in actuality it feels more like a crosswise closet. Some posit the tonal brother-in-law to be less than newborn. We know that the sizes could be said to resemble sleepwalk cycles. Before seasons, supplies were only fighters. Their stew was, in this moment.",
  "On a rocky cliff above the crashing waves stood a lighthouse, manned by the last lightkeeper, Elias. He had watched over the coast for decades, never once missing a storm or ship’s arrival. People forgot him, but he remembered everyone—each vessel, each rescue, each night the lamp glowed. His only companions were gulls and wind, but he found comfort in the rhythm of waves. One evening, a letter arrived by boat: “Thank you for saving my father.” Elias smiled, knowing his quiet work mattered. The next day, he lit the lamp one last time, and then disappeared into the sea fog.",
  "Ava returned to the old willow tree where she had buried a time capsule years ago. The ground was soft from spring rain, and the tree’s leaves whispered like old friends. She unearthed a rusted tin box and opened it slowly. Inside were a crayon drawing, a marble, and a letter written in her nine-year-old scrawl. “Dear Future Me,” it began. The letter reminded her of dreams once held close—becoming an artist, traveling the world. Smiling through tears, she realized she had become someone her younger self would be proud of. The willow tree swayed, as if nodding in approval.",
  "Liam found an old pocket watch in his grandfather’s drawer, its cover etched with initials and dates. Curious, he wound it. The ticking began instantly, but the world outside slowed. Time bent around him. The second hand spun differently—backward at times, skipping forward at others. He wandered through frozen streets, saw people mid-step, birds paused in flight. He returned the watch to the drawer, shaken yet thrilled. Later, his grandfather smiled knowingly. “You’ve used it, haven’t you?” Liam nodded. “Use it wisely,” he whispered, “because time always takes back what it gives.” The next morning, the watch was gone.",
  "She painted storms—dark clouds, crashing waves, lightning caught mid-strike. Her canvases terrified and mesmerized. No one knew why she never painted calm skies or flowers. When asked, she simply said, “Storms are honest.” Every evening, she sat on the balcony, watching clouds roll in, brush in hand. One day, a small boy visited and asked, “Can you paint a rainbow?” She smiled, hesitated, then nodded. Her next painting was a storm breaking, sunlight piercing through, a rainbow stretching across the sky. It became her most loved piece. She finally understood: even storm painters need a little hope now and then.",
  "At midnight, the library came alive. Books rustled, shelves shifted, and characters whispered across pages. Nora, the night librarian, wasn’t startled anymore. She knew the routine—calm the pirate in aisle three, hush the poet in nonfiction. The books had stories to share, but only when the world slept. One night, a child wandered in, wide-eyed. “I heard stories,” he whispered. Nora handed him a glowing book, and the words floated into the air. He laughed, clapped, and vanished into the pages. By morning, the book was back—but heavier somehow. It now held a new chapter: “The Boy Who Believed.”",
  "In a muddy puddle after the rain, Maya placed a paper boat, watching it float away with childish pride. She chased it along the gutter, laughing as it danced through twigs and ripples. It seemed small, simple—but to her, it was a grand ship on a mighty journey. As the sun peeked through the clouds, the boat disappeared around a corner. Years later, now an architect, she designed a memorial shaped like a folded paper boat. It stood by the river, reminding everyone that even small beginnings can carry great dreams. Children still float paper boats nearby, dreaming like Maya.",
  "Hidden inside an attic trunk, a music box played a haunting melody when opened. Clara, a curious teenager, discovered it during spring cleaning. The melody felt familiar, like a lullaby from dreams. She brought it to her grandmother, who gasped. “Your great-grandmother made that tune. She believed it summoned memories.” That night, Clara wound the box and dreamt of fields, laughter, and a woman with warm eyes. The next morning, she drew everything she saw. Her grandmother cried, recognizing every detail. Clara had awakened more than music—she’d unlocked a memory sealed by time, passed down through a single tune.",
  "In a quiet market, a caged bird sang the most beautiful song. People gathered to listen, enchanted by its melody. The merchant boasted, “No bird sings like this.” One day, a girl asked, “Why does it sing so sadly?” The merchant shrugged. That night, the girl returned, opened the cage, and let the bird fly. The next morning, the market was silent. Days passed. Then, from the distant trees, the bird sang again—freer, louder, joyful. It never returned to the cage, but its song echoed over the rooftops. The merchant sold no more birds, but the girl sold wind chimes.",
  "In the heart of the city stood a massive clock tower, yet it made no sound. People checked time by its hands, but it never ticked. Legend said it counted moments, not minutes. If someone truly listened, they’d hear it speak through silence. Amara, a deaf student, visited every week. She said she felt the tower hum beneath her fingers. One day, lightning struck nearby—but the tower stood tall. Amara returned and placed her hand on the stone. Her eyes widened, and she smiled. “It spoke,” she signed. The crowd watched silently, realizing perhaps silence itself could measure what mattered."
];

const textToTypeEl = document.getElementById("textToType");
const inputArea = document.getElementById("inputArea");
const timeLeftEl = document.getElementById("timeLeft");
const mistakesCountEl = document.getElementById("mistakesCount");
const wpmEl = document.getElementById("wpm");
const cpmEl = document.getElementById("cpm");
const restartBtn = document.getElementById("restartBtn");

let timeLeft = 60;
let mistakes = 0;
let timer = null;
let isTyping = false;
let charIndex = 0;
let sampleText = "";

function renderText() {
  let html = '';
  for (let i = 0; i < sampleText.length; i++) {
    html += `<span>${sampleText[i]}</span>`;
  }
  textToTypeEl.innerHTML = html;
}

function startTimer() {
  if (isTyping) return;
  isTyping = true;
  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      timeLeftEl.textContent = timeLeft;
      calculateWPM();
    } else {
      finishTest();
    }
  }, 1000);
}

function calculateWPM() {
  const wordsTyped = charIndex - mistakes;
  const minutes = (60 - timeLeft) / 60;
  const wpm = minutes > 0 ? Math.max(0, Math.round((wordsTyped / 5) / minutes)) : 0;
  const cpm = minutes > 0 ? Math.max(0, Math.round(wordsTyped / minutes)) : 0;
  wpmEl.textContent = wpm;
  cpmEl.textContent = cpm;
}

function finishTest() {
  clearInterval(timer);
  inputArea.disabled = true;
  restartBtn.disabled = false;
}

function resetTest() {
  clearInterval(timer);
  timeLeft = 60;
  mistakes = 0;
  isTyping = false;
  charIndex = 0;
  timeLeftEl.textContent = timeLeft;
  mistakesCountEl.textContent = mistakes;
  wpmEl.textContent = 0;
  cpmEl.textContent = 0;
  inputArea.disabled = false;
  inputArea.value = '';
  restartBtn.disabled = true;
  sampleText = passages[Math.floor(Math.random() * passages.length)];
  renderText();
  updateTextDisplay();
  inputArea.focus();
}

function updateTextDisplay() {
  const spans = textToTypeEl.querySelectorAll('span');
  const inputValue = inputArea.value;
  mistakes = 0;
  charIndex = inputValue.length;

  for (let i = 0; i < spans.length; i++) {
    const char = inputValue[i];
    if (char == null) {
      spans[i].className = '';
    } else if (char === spans[i].textContent) {
      spans[i].className = 'correct';
    } else {
      spans[i].className = 'mistake';
      mistakes++;
    }
  }
  mistakesCountEl.textContent = mistakes;
}

inputArea.addEventListener('input', () => {
  if (!isTyping) startTimer();
  updateTextDisplay();
  if (inputArea.value.length === sampleText.length) {
    finishTest();
  }
  calculateWPM();
});

restartBtn.addEventListener('click', resetTest);

// Initial setup
sampleText = passages[Math.floor(Math.random() * passages.length)];
renderText();
