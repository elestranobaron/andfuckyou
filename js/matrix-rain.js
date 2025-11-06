document.addEventListener('DOMContentLoaded', () => {
    // Crée le canvas
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:-1;pointer-events:none;image-rendering:pixelated;';
    
    // Injecte APRÈS le body (pas avant)
    document.body.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');

    // Resize propre
    const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Caractères Matrix + japonais
    const matrix = "01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";
    const fontSize = 16;
    let drops = [];

    const init = () => {
        drops = [];
        const cols = Math.floor(canvas.width / fontSize);
        for (let i = 0; i < cols; i++) drops[i] = Math.random() * -100;
    };
    init();
    window.addEventListener('resize', init);

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0f0';
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
            const char = matrix[Math.floor(Math.random() * matrix.length)];
            const x = i * fontSize;
            const y = drops[i] * fontSize;
            ctx.fillText(char, x, y);
            if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
    }

    setInterval(draw, 33);
});
