gsap.registerPlugin(ScrollTrigger);

const nav = document.querySelector("nav");

const showAnim = gsap.from("nav", {
    yPercent: -100,
    paused: true,
    duration: 0.2
})

ScrollTrigger.create({
    trigger: "body",
    start: "top top",
    end: 99999,
    onEnter: () => nav.classList.add("visible"),
    onLeaveBack: () => nav.classList.remove("visible"),
    markers: false,
    onUpdate: (self) => {
        self.direction === -1 ? showAnim.play() : showAnim.reverse();
    }
});

gsap.utils.toArray('.banner').forEach((section) => {
    const w = section.querySelector(".images");
    const [x, xEnd] = [w.scrollWidth * -1, 0];
    gsap.fromTo(
        w,
        { x },
        {
            x: xEnd,
            scrollTrigger: {
                trigger: section,
                scrub: 1,
                start: "top bottom",
                end: "bottom top"
            },
        }
    );
});
