const container = $(".container");
const starClass = ["yellowStar", "greenStar", "redStar", "whiteStar"];
let starCounter = 0;
const numberOfStar = 500;

const starGenerator = () => {
  //generate a div each 10ms
  const starTimer = setInterval(() => {
    //add a random class
    const randomStarClass =
      starClass[Math.floor(Math.random() * starClass.length)];

    $("<div></div>")
      .addClass(randomStarClass)
      .css({
        position: "absolute",
        top: Math.random() * $(document).height(),
        left: Math.random() * $(document).width(),
        zIndex: 2,
      })
      .appendTo(container);

    starCounter++;
    //limit number of div
    if (starCounter === 500) {
      window.clearInterval(starTimer);
      starCounter = 0;
    }
  }, 20);

  //adding a delay to create black div
  const blackHoleTimer = setTimeout(() => {
    const randomStarClass =
      starClass[Math.floor(Math.random() * starClass.length)];
    $(".blackHole").css({
      top: Math.random() * ($(container).height() - 50),
      left: Math.random() * ($(container).width() - 50),
      zIndex: 5,
      opacity: 1,
    });
  }, 10);
};

$(document).ready(() => {
  starGenerator();
  //move screen view with mousepos
  $(document).mousemove(event => {
    let mouseX = event.pageX;
    let mouseY = event.pageY;
    $("body, html").animate(
      {
        scrollTop: mouseY / 2,
        scrollLeft: mouseX / 2,
      },
      0
    );
  });
  // reset space
  $("button").click(() => {
    $(".blackHole").css({ opacity: 0 });
    $(".yellowStar, .redStar, .whiteStar, .greenStar").remove();
    starGenerator();
  });
});
