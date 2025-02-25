gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray("section").forEach((section, i) => {
    ScrollTrigger.create({
        trigger: section,
        start: "top top",
        pin: true,
        pinSpacing: false,
    });
});

const lenis = new Lenis({
    lerp: 0.08,
    smooth: true
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
})