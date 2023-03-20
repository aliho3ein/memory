const content = document.getElementById("content");

const emojis = [
  "https://www.cambridge.org/elt/blog/wp-content/uploads/2019/07/Blushed-Smiling-Emoji-Free-Download-IOS-Emojis.png",
  "https://www.itpedia.nl/wp-content/uploads/2018/02/Thinking_Face_Emoji.png",
  "https://ps.w.org/emoji-toolbar/assets/icon-256x256.png?rev=2580091",
  "https://i.pinimg.com/originals/85/6c/72/856c72c52a0be9efbc5315927e1fff85.png",
  "https://www.alucare.fr/wp-content/uploads/2023/01/emoji-visage-qui-pleure.png",
  "https://imageio.forbes.com/specials-images/imageserve/602c09c9135a060af5e1a8f4/Face-with-Spiral-Eyes---a-new-Apple-emoji-/960x0.png?format=png&width=960",
  "https://images.squarespace-cdn.com/content/v1/54d50ceee4b05797b34869cf/74eac249-563f-467e-acea-1d2d62f524f9/1f915.png",
  "https://images.emojiterra.com/google/noto-emoji/v2.034/512px/1f97a.png",
];

const ruleNumber = 6;

let firstCard = [];
let secondCard = [];
/** */
let card_1;
let correct = 0;

for (let i = 0; i < ruleNumber * 2; i++) {
  /** Create Cards */
  const card = document.createElement("div");
  card.classList = "cart hide";
  let number = getRandom();
  const img = document.createElement("img");
  img.src = emojis[number];
  card.appendChild(img);
  card.setAttribute("data-id", number);
  card.setAttribute("data-click", false);
  content.append(card);

  /** Click Event */
  card.addEventListener("click", (e) => {
    /** Check if Card is clicked */
    if (card.dataset.click == "false" && !e.repeat) {
      /** Set Card as clicked */
      card.setAttribute("data-click", true);
      /** Rotate the clicked Card */
      card.style.transform = "rotateY(0deg)";
      /** Check if this clicked card is second Card */
      if (card_1) {
        /** Check if first and second Card are equal  */
        if (card_1 == card.dataset.id) {
          /** if the card are equal the lost class Hide and they don't rotate */
          document
            .querySelectorAll(`[data-id='${card.dataset.id}']`)
            ?.forEach((item) => {
              item.classList.remove("hide");
            });
          /** Count of true answer */
          correct++;

          /** Check if player win */
          if (correct == ruleNumber) {
            setTimeout(() => {
              /** Show win massage */
              alert("Winner");
            }, 200);
            return;
          }
        } else {
          /** if the cards are equal after 1 sec they rotate   */
          setTimeout(() => {
            document.querySelectorAll(".hide").forEach((item) => {
              item.style.transform = "rotateY(-180deg)";
              /** if cards was not equal click gonna be false */
              document
                .querySelectorAll(`[data-id='${card_1}']`)
                ?.forEach((item) => {
                  item.setAttribute("data-click", false);
                });
              card.setAttribute("data-click", false);
              card_1 = "";
            });
          }, 1000);
        }
      } else {
        /** if its the first card to be clicked  */
        card_1 = card.dataset.id;
      }
    }
  });
}

/** Create Random number */
function getRandom() {
  let num = Math.floor(Math.random() * ruleNumber);

  if (firstCard.includes(num) && secondCard.includes(num)) {
    return getRandom();
  } else if (firstCard.includes(num)) {
    secondCard.push(num);
    return num;
  } else {
    firstCard.push(num);
    return num;
  }
}
