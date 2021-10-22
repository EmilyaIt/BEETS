const sections = $("section");
const display = $(".maincontent");
const sideMenu = $(".fixed-menu");
const menuItems = sideMenu.find(".fixed-menu__item");

let inScroll = false;

sections.first().addClass("active");

const countSectionPosition = sectionEq => {
  return sectionEq * -100;
}

const changeMenuThemeForSection = sectionEq => {
  const currentSection = sections.eq(sectionEq);
  const menuTheme = currentSection.attr("data-sidemenu-theme"); 
  const activeClass = ".fixed-menu--shadowed"

  if (menuTheme === "white") {
    sideMenu.addClass(activeClass);
  } else {
    sideMenu.removeClass(activeClass);
  }
}

const resetActiveClassForItem = (items, itemEq, activeClass) => {
  items.eq(itemEq).addClass(activeClass).siblings().removeClass(activeClass);
}

const performTransition = (sectionEq) => {

  if(inScroll === false) {
    inScroll = true;

    const position = countSectionPosition(sectionEq);

    changeMenuThemeForSection(sectionEq);

    display.css({
      transform:`translateY(${position}%)`,
    });
  
    resetActiveClassForItem(sections, sectionEq, "active");

    setTimeout(() => {
      inScroll = false;

      resetActiveClassForItem(menuItems, sectionEq, "fixed-menu__item--active");
    }, 1300);
  }
};

const scrolViewport = (direction) => {
  const activeSection = sections.filter(".active");
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();

  if (direction === "next" && nextSection.length) {
    performTransition(nextSection.index());
  }
  if (direction === "prev" && prevSection.length) {
    performTransition(prevSection.index());
  }
};

$(window).on("wheel", e => {
  const deltaY = e.originalEvent.deltaY;

  if (deltaY > 0) {
    scrolViewport("next");
  }
  if (deltaY < 0) {
    scrolViewport("prev");
  }
});

$(window).on("keydown", e => {
  
  const tagName = e.target.tagName.toLowerCase();

  if (tagName !== "input" && tagName !== "textarea") {
    switch(e.keyCode) {
      case 38:
        scrolViewport("prev");
        break;
  
      case 40:
        scrolViewport("next");
        break;
    }   
  }
});

$("[data-scroll-to]").click(e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target = $this.attr("data-scroll-to");
  const reqSection = $(`[data-section-id=${target}]`);

  performTransition(reqSection.index());
});

//https://github.com/mattbryson/TouchSwipe-Jquery-Plugin

$("body").swipe( {
  swipe:function (event, direction, ) {
    const scroller = viewportScroller();
    let scrollDirection = "";

    if(direction === "up") scrollDirection = "next";
    if(direction === "down") scrollDirection = "prev";

    scroller[scrollDirection]();
  },
});

// const sections = $("section");
// const display = $(".maincontent");

// const performTransition = sectionEq => {
//   const position = sectionEq * -100;

//   display.css({
//     transform: `translateY(${position}%)`
//   });
// }

// $(window).on("wheel", e => {
//   const deltaY = e.originalEvent.deltaY;

//   console.log(deltaY)

//   if (deltaY > 0) {
//     performTransition(2);
//   //   // scrolViewport("next");
//   }
//   if (deltaY < 0) {
//   //   // scrolViewport("prev");
//   }
// });