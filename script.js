Shery.mouseFollower();

// locomotive boilderplate
const scroll = new LocomotiveScroll({
  el: document.querySelector("main"),
  smooth: true,

  // for tablet smooth
  tablet: { smooth: true },

  // for mobile
  smartphone: { smooth: true },
});

function locomotiveFix() {
  gsap.registerPlugin(ScrollTrigger);

  scroll.on("scroll", ScrollTrigger.update);

  ScrollTrigger.scrollerProxy("main", {
    scrollTop(value) {
      return arguments.length
        ? scroll.scrollTo(value, 0, 0)
        : scroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
  });

  ScrollTrigger.addEventListener("refresh", () => scroll.update());

  ScrollTrigger.refresh();
}
locomotiveFix();

let counterElem = document.querySelector(".counter");
let allLineH1 = document.querySelectorAll(".line h1");
let scrollAnime = document.querySelector(".scroll-reminder p");
let cursor = document.querySelector("#cursor");
let heroH1 = document.querySelectorAll("#hero-content div h1");
let heroVideo = document.querySelector("#intro-video");
let heroVideoCursor = document.querySelector(".video-cursor");
let heroVideoCursorIcon = document.querySelector(".video-cursor i");
let introVidImage = document.querySelector("#intro-video img");
let introVideo = document.querySelector("#intro-video video");
let sheryCursor = document.querySelector(".mousefollower");
let circleArrow = document.querySelectorAll(".circle-arrow");
let specialHeroHeading = document.querySelector("#sepcial-hero-heading");
let flag = document.querySelector("#flag");
let footerH1 = document.querySelector("footer > h1");
let footerH1Span = document.querySelector("footer > h1 span");


// hero video player animation
introVidImage.addEventListener("click", (event) => {
  if (heroVideoCursorIcon.className.includes("play")) {
    gsap.to("#intro-video img", {
      opacity: 0,
    });

    introVideo.play();

    gsap.to(".video-cursor", {
      scale: 0.7,
    });

    gsap.set(".video-cursor i", {
      duration: 1,
      className: "ri-pause-fill",
    });
  } else if (heroVideoCursorIcon.className.includes("pause")) {
    gsap.to("#intro-video img", {
      opacity: 1,
    });

    introVideo.pause();

    gsap.set(".video-cursor i", {
      duration: 1,
      className: "ri-play-fill",
    });

    gsap.to(".video-cursor", {
      scale: 1.2,
    });
  }
});

function stopScrollAnime() {
  scrollAnime.classList.add("stop-anime");
}

function getElementVisibleHeight(element) {
  const rect = element.getBoundingClientRect();
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const topVisible = Math.max(0, rect.top);
  const bottomVisible = Math.min(windowHeight, rect.bottom);
  return bottomVisible - topVisible;
}

let clientHeight = getElementVisibleHeight(
  document.querySelector("#page1 nav")
);

function toggleScrollAnime() {
  scroll.on("scroll", (scrollArgs) => {
    let visibleHeight = getElementVisibleHeight(
      document.querySelector("#page1 nav")
    );

    let visiblePage = getElementVisibleHeight(document.querySelector("#page1"));

    scrollAnime.style.opacity = "1";
    scrollAnime.classList.remove("stop-anime");
    if (visibleHeight >= clientHeight || visiblePage < 0) {
      scrollAnime.style.opacity = "1";
      scrollAnime.classList.remove("stop-anime");
    } else {
      stopScrollAnime();
      scrollAnime.style.opacity = "0";
    }
  });
}

toggleScrollAnime();

// seperate element
function seperateElement(listItem, seperator) {
  listItem.forEach((element) => {
    let clutter = "";
    splitedText = element.textContent.split(seperator);
    splitedText.forEach((element) => {
      clutter += `<span>${element}</span>`;
    });
    element.innerHTML = clutter;
  });
}

seperateElement(allLineH1, " ");
seperateElement(heroH1, " ");
seperateElement([footerH1], "");
document.querySelectorAll("footer > h1 span").forEach((element)=>{
  if(element.textContent === " "){
    element.style.paddingLeft = "1rem";
  }
})
// scroll.destroy();

let heroSpan = document.querySelectorAll("#hero-content div h1 span");
heroSpan.forEach((element) => {
  if (element.textContent.toLowerCase() === "web") {
    element.classList.add("hero-span-after");
    element.classList.add("hero-span-sepcial");
    element.classList.add("underline");
  } else if (element.textContent.toLowerCase() === "graphic") {
    element.style.marginLeft = "1rem";
    element.classList.add("hero-span-sepcial");
    element.classList.add("underline");
  }
});

// MOUSE FOLLOWER
function mouseFollower(targetElement, follower) {
  document.addEventListener("mousemove", (event) => {
    follower.style.left = `${event.x}px`;
    follower.style.top = `${event.y}px`;
  });
}
mouseFollower(document, cursor);

specialHeroHeading.addEventListener("mousemove", (event)=>{
  console.log(event.layerX);
  gsap.to(flag, {
    opacity: 1,
    duration: 0.3,
    onStart: ()=>{
      flag.style.left = `${event.layerX}px`;
    flag.style.top = `${event.offsetY}px`;
    }
  })
})
specialHeroHeading.addEventListener("mouseleave", (event)=>{
  console.log(event.layerX);
  gsap.to(flag, {
    opacity: 0,
    duration: 0.3,
  })
})
// mouseFollower(specialHeroHeading, flag);

heroVideo.addEventListener("mousemove", (event) => {
  gsap.to(heroVideoCursor, {
    left: `${event.offsetX}px`,
    top: `${event.offsetY}px`,
    delay: "-0.05",
  });
});

heroVideo.addEventListener("mouseenter", (event) => {
  cursor.style.border = "none";
  sheryCursor.style.opacity = "0";

  if (heroVideoCursorIcon.className.includes("pause")) {
    gsap.to(".video-cursor", {
      scale: 0.8,
      ease: "power4",
    });
  } else {
    gsap.to(".video-cursor", {
      scale: 1.2,
      ease: "power4",
    });
  }
});

heroVideo.addEventListener("mouseleave", (event) => {
  sheryCursor.style.opacity = "1";
  cursor.style.border = "1px solid #0b0b0b";
  gsap.to(".video-cursor", {
    scale: 1,
    ease: "power4",
  });
});

function removeCursor(elementSelector, cursor) {
  let targetElement = document.querySelectorAll(elementSelector);
  targetElement.forEach((element) => {
    element.addEventListener("mouseenter", () => {
      document.querySelector(cursor).style.opacity = "0";
    });
  });
  targetElement.forEach((element) => {
    element.addEventListener("mouseleave", () => {
      document.querySelector(cursor).style.opacity = "1";
    });
  });
}

removeCursor(".project .project-image-container", ".mousefollower");

function arrowBtnAnimation(id){
  let t2 = gsap.timeline();
  let targetId = document.querySelector(id);
  targetId.addEventListener("mouseenter", () => {
    t2.to(`${id} .circle-text`, {
      scale: 1,
      ease: "power4",
    });
  
    t2.from(`${id} .circle-text p`, {
      opacity: 0,
      scale: 0,
    }), "<0.2s";
  });
  targetId.addEventListener("mouseleave", () => {
    gsap.to(`${id} .circle-text`, {
      scale: 0,
    })
  });
}

arrowBtnAnimation("#arrow-btn1");
arrowBtnAnimation("#arrow-btn2");
arrowBtnAnimation("#arrow-btn3");
// arrowBtnAnimation("#arrow-btn4");

// SHERY JS
Shery.makeMagnet("#nr-right h1, .nav-content i", {});
Shery.imageEffect(".project-image-container", {
  style: 5 /*OR 5 for different variant */,
  gooey: true,
  config: {
    a: { value: 2.06, range: [0, 30] },
    b: { value: -0.92, range: [-1, 1] },
    zindex: { value: -9996999, range: [-9999999, 9999999] },
    aspect: { value: 0.7812544202305679 },
    ignoreShapeAspect: { value: true },
    shapePosition: { value: { x: 0, y: 0 } },
    shapeScale: { value: { x: 0.5, y: 0.5 } },
    shapeEdgeSoftness: { value: 0, range: [0, 0.5] },
    shapeRadius: { value: 0, range: [0, 2] },
    currentScroll: { value: 0 },
    scrollLerp: { value: 0.07 },
    gooey: { value: true },
    infiniteGooey: { value: false },
    growSize: { value: 4, range: [1, 15] },
    durationOut: { value: 1, range: [0.1, 5] },
    durationIn: { value: 1.5, range: [0.1, 5] },
    displaceAmount: { value: 0.5 },
    masker: { value: true },
    maskVal: { value: 1.4, range: [1, 5] },
    scrollType: { value: 0 },
    geoVertex: { range: [1, 64], value: 1 },
    noEffectGooey: { value: true },
    onMouse: { value: 1 },
    noise_speed: { value: 1.15, range: [0, 10] },
    metaball: { value: 0.43, range: [0, 2] },
    discard_threshold: { value: 0.38, range: [0, 1] },
    antialias_threshold: { value: 0, range: [0, 0.1] },
    noise_height: { value: 0.37, range: [0, 2] },
    noise_scale: { value: 9.16, range: [0, 100] },
  },
});

// GSAP CODE
let t1 = gsap.timeline();

t1.from("#loader .line h1", {
  y: "100px",
  duration: 0.8,
  stagger: 0.2,

  onStart: function () {
    let counter = 0;

    var loaderCount = setInterval(() => {
      if (counter < 100) {
        counter += 1;
        counterElem.textContent = counter;
      } else {
        clearInterval(loaderCount);
      }
    }, 45);
  },
});

t1.from(".line p", {
  opacity: 0,
  duration: 1,
});

t1.to(
  ".counter-container, #loader p, #loader .line:nth-child(3) h1 span:last-child, #loader h1 span",
  {
    opacity: 0,
    delay: 2.7,
    stagger: 0.1,
  }
);



t1.to("#loader", {
  display: "none",
});

t1.from("#page1", {
  y: "100vh",
  duration: 1,
  backgroundColor: "#dedede",
  ease: "power4.in",
})

t1.from("#page1 nav",{
  opacity: 0,
})

t1.from("#hero-content h1", {
  delay: "-0.7",
  duration: 0.3,
  transform: "translateY(70%)",
  stagger: 0.1,
})

gsap.utils.toArray(".line-hidder").forEach((line) => {
  gsap.set(line, { width: "100%", transformOrigin: "right" });
  ScrollTrigger.create({
    trigger: line,
    scroller: "main",
    start: "top 75%",
    end: "top: 50%",
    onEnter: () => {
      gsap.to(line, {
        width: "0%",
        duration: 0.8,
        ease: "power2.inOut"
      });
    },
    
  });
});


t3 = gsap.timeline();
t4 = gsap.timeline();

document.querySelector("footer > h1").addEventListener("mouseenter", (event)=>{
  t3.to("footer > h1 span", {
    opacity: 0,
    stagger: 0.1,
    duration: 0.3,
    fontFamily: "Plain",
    onStart: function(){
      gsap.set("footer h1 span", {
        className : " ",
        stagger: 0.1,
        duration: 0.3,
      })
    }
  })
  
  t3.to("footer > h1 span", {
    opacity: 1,
    stagger: 0.1,
    duration: 0.3,
    fontFamily: "Silk Serif",
    delay: "-1",
    onStart: function(){
      gsap.set("footer h1 span", {
        className : "stroke",
        stagger: 0.1,
        duration: 0.3,
      })
    },
  })
})

document.querySelector("footer > h1").addEventListener("mouseleave", (event)=>{
  t4.play();
  t4.to("footer > h1 span", {
    opacity: 0,
    stagger: 0.1,
    duration: 0.3,
    fontFamily: "Silk Serif",
    onStart: function(){
      gsap.set("footer h1 span", {
        className : "stroke",
        stagger: 0.1,
        duration: 0.3,
      })
    }
  })
  t4.to("footer > h1 span", {
    opacity: 1,
    stagger: 0.1,
    duration: 0.3,
    fontFamily: "Plain",
    delay: "-1",
    onStart: function(){
      gsap.set("footer h1 span", {
        className : " ",
        stagger: 0.1,
        duration: 0.3,
      })
    }
  })
})
