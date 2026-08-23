const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");

let width;
let height;

let particles = [];

function resizeCanvas() {

    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);


/* ===================================
   HEART FORMULA
=================================== */

function heartPoint(t) {

    const x =
        16 * Math.pow(Math.sin(t), 3);

    const y =
        13 * Math.cos(t)
        - 5 * Math.cos(2 * t)
        - 2 * Math.cos(3 * t)
        - Math.cos(4 * t);

    return { x, y };

}


/* ===================================
   PARTICLE
=================================== */

class Particle {

    constructor(targetX, targetY) {

        // Start from random screen position

        this.x =
            Math.random() * width;

        this.y =
            Math.random() * height;


        // Final heart position

        this.targetX = targetX;
        this.targetY = targetY;


        this.size =
            Math.random() * 2.8 + 1;


        this.speed =
            Math.random() * 0.025 + 0.018;


        this.alpha = 0;

    }


    update() {

        // Fade in

        if (this.alpha < 1) {
            this.alpha += 0.025;
        }


        // Move towards heart

        this.x +=
            (this.targetX - this.x)
            * this.speed;

        this.y +=
            (this.targetY - this.y)
            * this.speed;

    }


    draw() {

        ctx.beginPath();

        ctx.arc(
            this.x,
            this.y,
            this.size,
            0,
            Math.PI * 2
        );

        ctx.fillStyle =
            `rgba(255, 40, 100, ${this.alpha})`;

        ctx.shadowBlur = 15;

        ctx.shadowColor =
            "#ff0055";

        ctx.fill();

    }

}


/* ===================================
   CREATE HEART PARTICLES
=================================== */

function createParticles() {

    particles = [];

    const centerX = width / 2;

    const centerY =
        height * 0.43;


    const scale =
        Math.min(width, height) / 40;


    // Outer heart

    for (
        let t = 0;
        t < Math.PI * 2;
        t += 0.035
    ) {

        const point =
            heartPoint(t);


        const x =
            centerX +
            point.x * scale;


        const y =
            centerY -
            point.y * scale;


        particles.push(
            new Particle(x, y)
        );

    }


    // Inner glowing particles

    for (let i = 0; i < 450; i++) {

        const t =
            Math.random()
            * Math.PI
            * 2;


        const point =
            heartPoint(t);


        const randomScale =
            Math.random();


        const x =
            centerX +
            point.x
            * scale
            * randomScale;


        const y =
            centerY -
            point.y
            * scale
            * randomScale;


        particles.push(
            new Particle(x, y)
        );

    }

}


createParticles();


/* ===================================
   ANIMATION
=================================== */

function animate() {

    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    particles.forEach(
        particle => {

            particle.update();

            particle.draw();

        }
    );


    requestAnimationFrame(
        animate
    );

}


setTimeout(() => {

    animate();

}, 1000);


/* ===================================
   REMOVE PARTICLE HEART
=================================== */

setTimeout(() => {

    canvas.style.transition =
        "opacity 1.5s ease";

    canvas.style.opacity = "0";

}, 5200);


/* ===================================
   FLOATING HEARTS
=================================== */

const floatingContainer =
    document.getElementById(
        "floatingHearts"
    );


function createFloatingHeart() {

    const heart =
        document.createElement("span");


    heart.className =
        "floating-heart";


    heart.innerHTML =
        Math.random() > .5
            ? "♥"
            : "♡";


    heart.style.left =
        Math.random() * 100 + "vw";


    heart.style.fontSize =
        Math.random() * 20
        + 10
        + "px";


    const duration =
        Math.random() * 5 + 6;


    heart.style.animationDuration =
        duration + "s";


    floatingContainer.appendChild(
        heart
    );


    setTimeout(() => {

        heart.remove();

    }, duration * 1000);

}


// Floating hearts start later

setTimeout(() => {

    setInterval(
        createFloatingHeart,
        350
    );

}, 6500);


/* ===================================
   MUSIC
=================================== */

const music =
    document.getElementById("music");

const musicBtn =
    document.getElementById(
        "musicBtn"
    );

let playing = false;


musicBtn.addEventListener(
    "click",
    async () => {

        if (!playing) {

            try {

                await music.play();

                playing = true;

                musicBtn.innerHTML =
                    "🔊 Music On";

            }

            catch {

                musicBtn.innerHTML =
                    "⚠️ Add love.mp3";

            }

        }

        else {

            music.pause();

            playing = false;

            musicBtn.innerHTML =
                "🎵 Play Music";

        }

    }
);