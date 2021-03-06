const sections = $("section");
const display = $(".maincontent");
const sideMenu = $(".fixed-menu");
const menuItems = sideMenu.find(".fixed-menu__item");
const menuLinks = menuItems.find(".fixed-menu__link");

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();

let inScroll = false;

sections.first().addClass("active");

const countSectionPosition = (sectionEq) => {
  const position = sectionEq * -100;

  if (isNaN(position)) {
    console.error("передано не верно значение в countSectionPosition");
    return 0;
  }

  return position;
}

const changeMenuThemeForSection = (sectionEq) => {
  const currentSection = sections.eq(sectionEq);
  const menuTheme = currentSection.attr("data-sidemenu-theme");
  const activeClass = ".fixed-menu--shadowed"

  if (menuTheme === "white") {
    sideMenu.addClass(activeClass);
  } else {
    sideMenu.removeClass(activeClass);
  }
};

const resetActiveClassForLink = (links, linkEq, activeClass) => {
  links.eq(linkEq).addClass(activeClass).siblings().removeClass(activeClass);
};

const resetActiveClassForItem = (items, itemEq, activeClass) => {
  items.eq(itemEq).addClass(activeClass).siblings().removeClass(activeClass);
};




const performTransition = (sectionEq) => {

  if (inScroll === false) {
    inScroll = true;

    const position = countSectionPosition(sectionEq);

    changeMenuThemeForSection(sectionEq);

    display.css({
      transform: `translateY(${position}%)`,
    });

    resetActiveClassForItem(sections, sectionEq, "active");
    resetActiveClassForLink(sections, sectionEq, "active");

    setTimeout(() => {
      inScroll = false;

      resetActiveClassForItem(menuItems, sectionEq, "fixed-menu__item--active"),
        resetActiveClassForLink(menuLinks, sectionEq, "fixed-menu__link--active");
    }, 1300);
  }
};

const viewportScroller = () => {
  const activeSection = sections.filter(".active");
  const nextSection = activeSection.next();
  const prevSection = activeSection.prev();

  return {
    next() {
      if (nextSection.length) {
        performTransition(nextSection.index());
      }
    },
    prev() {
      if (prevSection.length) {
        performTransition(prevSection.index());
      }
    },
  };
};

$(window).on("wheel", (e) => {
  const deltaY = e.originalEvent.deltaY;
  const scroller = viewportScroller();

  if (deltaY > 0) {
    scroller.next();
  }
  if (deltaY < 0) {
    scroller.prev();
  }
});

$(window).on("keydown", (e) => {

  const tagName = e.target.tagName.toLowerCase();
  const userTypingInInputs = tagName == "input" || tagName == "textarea";
  const scroller = viewportScroller();

  if (userTypingInInputs) return;
  switch (e.keyCode) {
    case 38:
      vcroller.prev();
      break;

    case 40:
      scroller.next();
      break;
  }
});

$(".wrapper").on("touchmove", e => e.preventDefault);

$("[data-scroll-to]").click(e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target = $this.attr("data-scroll-to");
  const reqSection = $(`[data-section-id=${target}]`);

  performTransition(reqSection.index());
});


if (isMobile) {
  $("body").swipe({
    swipe: function (event, direction) {
      const scroller = viewportScroller();
      let scrollDirection = "";

      if (direction === "up") scrollDirection = "next";
      if (direction === "down") scrollDirection = "prev";

      scroller[scrollDirection]();
    },
  });
}
//https://github.com/mattbryson/TouchSwipe-Jquery-Plugin



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