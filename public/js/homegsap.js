const s1 = new TimelineMax({ paused: true });

s1.to("#center_text", 0.7, { css: { opacity: 0, display: "none" } })
  .to("#cultureMan", 0.5, { css: { left: "-320" }, ease: Expo.easeOut })
  .to("#TechMan", 0.5, { css: { right: "-350" }, ease: Expo.easeOut }, "-=0.5")
  .to("#DesignMan", 0, { css: { display: "block" } })
  .to("#DesignMan", 0.5, { css: { opacity: 1 }, ease: Expo.easeOut }, "-=1")
  .to("#flash", 5, { css: { display: "block", delay: 1 } })
  .to("#flash", 0, { css: { display: "none" } });

const explore = document.getElementById("explore");
explore.addEventListener("click", () => {
  s1.play();
});

const stech = new TimelineMax({ paused: true });
const scult = new TimelineMax({ paused: true });
const sdesg = new TimelineMax({ paused: true });

stech
  .to("#cultureMan", 0.5, { css: { left: "-1000px" } })
  .to("#DesignMan", 0.5, { css: { opacity: 0 } }, "-=0.5")
  .to("#DesignMan", 0, { css: { display: "none" } })
  .to("#overlay_tech", 0.5, { css: { left: "0" } })
  .to("#TechMan", 0.2, {
    css: { right: "-300", filter: "grayscale(0)", transform: "scale(1)" }
  })
  .to(".comp", 0.2, { css: { opacity: 1 } });

scult
  .to("#TechMan", 0.5, { css: { right: "-1000px" } })
  .to("#DesignMan", 0.5, { css: { opacity: 0 } }, "-=0.5")
  .to("#DesignMan", 0, { css: { display: "none" } })
  .to("#overlay_cul", 0.5, { css: { left: "0" } })
  .to("#cultureMan", 0.2, {
    css: { left: "-280", filter: "grayscale(0)", transform: "scale(1)" }
  })
  .to(".comp", 0.2, { css: { opacity: 1 } });

const tclick = document.getElementById("TechMan");
const cclick = document.getElementById("cultureMan");
tclick.addEventListener("click", () => {
  stech.play();
});
cclick.addEventListener("click", () => {
  scult.play();
});

const back = document.getElementsByClassName("goback");

for (let i = 0; i < back.length; i++) {
  back[i].addEventListener("click", () => {
    if (back[i].id == "scult") {
      scult.reverse();
      document.getElementById("cultureMan").style.pointerEvents = "all";
    }
    if (back[i].id == "stech") {
      stech.reverse();
      document.getElementById("TechMan").style.pointerEvents = "all";
    }
  });
}
