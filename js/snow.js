const dpr = 1;

const canvasSnowflakes = document.getElementById('snowflakes');
const canvasSnowdriftYoutube = document.getElementById('snowdriftYoutube');
const toggleButton = document.getElementById('toggleSnow');

let snowActive = true;

let animationFrameId;

let loop;

function snow(canvas, { count, onFallDown }) {
    const ctx = canvas.getContext('2d');
    ctx.globalAlpha = 0.9;

    const snowflakes = [];

    const randmizeSnowflakeParams = (snowflake) => {
        snowflake.size = random(0.5, 3.5);
        snowflake.x = random(-1 * canvas.width, 2 * canvas.width);
        snowflake.y = random(-100, 0);
        snowflake.k = random(0.5, 1);
    }

    for (let i = 0; i < count; i++) {
        const snowflake = { size: 0, x: 0, y: 0, k: 0 };
        randmizeSnowflakeParams(snowflake);
        snowflakes.push({ ...snowflake, y: random(0, -1 * canvas.height) });
    }

    const wind = { forceX: 0, forceY: 0 };
    const targetWind = { forceX: 0, forceY: 0 };

    const changeWindVector2d = () => {
        targetWind.forceX = random(-0.5, 0.5);
        targetWind.forceY = random(-0.1, 0.5);
        window.setTimeout(changeWindVector2d, 1000 * random(2, 5));
    }

    const move = (time) => {
        if (!snowActive) return;
        const step = 0.001;
        wind.forceX += step * (targetWind.forceX - wind.forceX);
        wind.forceY += step * (targetWind.forceY - wind.forceY);

        snowflakes.forEach(snowflake => {
            const mass = snowflake.size / 1.2;

            snowflake.y += mass;
            snowflake.x += snowflake.k * Math.cos(0.0005 / snowflake.k * time);

            snowflake.x += 10 * wind.forceX * mass;
            snowflake.y += 10 * wind.forceY * mass;

            if (snowflake.y > canvas.height) {
                onFallDown && onFallDown(snowflake.x, mass);
                randmizeSnowflakeParams(snowflake);
            }
        });
    }

    const render = () => {
        if (!snowActive) return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        snowflakes.forEach(({ size, x, y }) => {
            ctx.beginPath();
            ctx.arc(x, y, size, 0, 2 * Math.PI);
            ctx.fillStyle = '#fff';
            ctx.fill();
            ctx.closePath();
        });
    };

    loop = (time = 0) => {
        move(time);
        render();
        if (snowActive) {
            animationFrameId = window.requestAnimationFrame(loop);
        }
    }

    loop();
    changeWindVector2d();
}

function createSnowdrift(canvas, pathData) {
    const ctx = canvas.getContext('2d');

    const maxHeight = canvas.height;
    const duration = 10000;
    const totalFrames = Math.floor((duration / 1000) * 60);
    let currentFrame = 0;

    const drawSnowdrift = (height) => {
        const path = new Path2D(pathData);
        ctx.fillStyle = '#fff';
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        ctx.save();
        ctx.translate(maxHeight, maxHeight - height);
        ctx.fill(path);
        ctx.restore();
    };

    let isActive = true;
    let currentHeight = maxHeight;

    return (x, mass) => {
        if (mass < 2 || !isActive) return;
        const step = Math.ceil(maxHeight / totalFrames);

        const animate = () => {
            if (currentFrame < totalFrames) {
                currentHeight -= step;
                if (currentHeight < 0) {
                    currentHeight = maxHeight;
                    isActive = false;
                }

                drawSnowdrift(currentHeight);
                currentFrame++;

                requestAnimationFrame(animate);
            }
        };

        currentFrame = 0;
        currentHeight = 0;
        isActive = true;
        animate();
    };
}

function canvasRatio(canvas) {
    const { left, right, top, bottom } = canvas.getBoundingClientRect();
    canvas.width = Math.round(dpr * right) - Math.round(dpr * left);
    canvas.height = Math.round(dpr * bottom) - Math.round(dpr * top);
}

function random(min, max) {
    return (Math.random() * (max - min)) + min;
}

function throttle(cb, delay) {
    let wait = false;

    return (...args) => {
        if (wait) return;
        cb(...args);
        wait = true;
        window.setTimeout(() => { wait = false }, delay);
    }
}

// Initialize canvases
canvasRatio(canvasSnowflakes);
canvasRatio(canvasSnowdriftYoutube);

const onFallDown = throttle((x, mass) => {
    snowdriftYoutube(x, mass);
}, 50);

const path1 = "M7.5 13.4022C-0.255402 16.8563 -0.713336 2.21066 2.89055 1.10533C6.49444 1.19209e-07 8.12039 1.78039 11.4792 1.658C15.7544 1.50221 17.5923 3.0664e-08 21.8703 0C24.2266 -1.6889e-08 25.005 1.16122 27.2719 1.93433C33.7219 4.13408 37.2912 -0.214203 43.7584 1.93433C45.422 2.487 49.443 4.50068 50.2695 7.32283C50.9776 9.74109 51.691 12.3865 49.7142 13.9548C47.6748 15.5727 47.9883 14.7297 45.4995 15.5C40.4041 17.0771 44.298 21.6226 38.9995 21C33.9146 20.4025 35.8621 16.0273 34.1985 13.4022C33.549 12.3772 32.5004 12.4029 31.2893 12.2968C27.7402 11.9859 28.5403 17.1052 24.9996 17.5C21.0391 17.9416 18.407 6.63199 15.7749 14.2312C13.1428 21.8303 9.58024 21.6921 7.5 13.4022Z";

const snowdriftYoutube = createSnowdrift(canvasSnowdriftYoutube, path1);

// Запускаем снег сразу при инициализации
snow(canvasSnowflakes, {
    onFallDown,
    count: (canvasSnowflakes.width * canvasSnowflakes.height) / 2000,
});

// Функция для плавного исчезновения снега
const fadeOutSnow = () => {
    let opacity = 1;
    const fadeOut = () => {
        if (opacity <= 0) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
            return;
        }
        opacity -= 0.01; // Уменьшаем непрозрачность
        canvasSnowflakes.style.opacity = opacity;
        requestAnimationFrame(fadeOut);
    };
    fadeOut();
};


toggleButton.addEventListener('click', () => {
    snowActive = !snowActive;
    if (snowActive) {

        if (!animationFrameId) {
            loop();
            canvasSnowflakes.style.opacity = 1;
        }
    } else {
        fadeOutSnow();
    }
});
