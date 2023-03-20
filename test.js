cards.forEach((card) => {
  let number = getRandom();
  const img = document.createElement("img");
  img.src = emojis[number];
  card.appendChild(img);
  card.setAttribute("data-id", number);
  card.setAttribute("data-click", false);

  /** Click Event */
  card.addEventListener("click", () => {
    /** Check if Card is clicked */
    if (card.dataset.click == "false") {
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
              alert("U win");
            }, 200);
            return;
          }
        } else {
          card.setAttribute("data-click", false);
          document
            .querySelectorAll(`[data-id='${card_1}']`)
            ?.forEach((item) => {
              item.setAttribute("data-click", false);
            });
          setTimeout(() => {
            document.querySelectorAll(".hide").forEach((item) => {
              item.style.transform = "rotateY(-180deg)";
            });
          }, 1000);
        }
        card_1 = "";
      } else {
        card_1 = card.dataset.id;
      }
    }
  });
});
