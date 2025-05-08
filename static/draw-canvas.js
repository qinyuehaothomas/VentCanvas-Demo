export function drawEmotionShapes(data) {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const emotions = data?.emotion;
    if (!emotions) return;
    
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Shape configuration
    const shapeMapping = {
        angry: { shape: 'circle', color: '#FF4500' },
        disgust: { shape: 'square', color: '#32CD32' },
        fearful: { shape: 'triangle', color: '#00008B' },
        happy: { shape: 'star', color: '#FFD700' },
        neutral: { shape: 'hexagon', color: '#808080' },
        sad: { shape: 'rectangle', color: '#4B0082' },
        surprised: { shape: 'oval', color: '#FFA500' }
    };

    // Canvas dimensions
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    // Layout parameters
    const columns = 3;
    const numItems = Object.keys(emotions).length;
    const rows = Math.ceil(numItems / columns);
    const cellWidth = canvasWidth / columns;
    const cellHeight = canvasHeight / rows;

    // Size calculations
    const maxValue = Math.max(...Object.values(emotions));
    const baseSize = Math.min(cellWidth, cellHeight) * 0.3;

    let i = 0;
    for (const [emotion, value] of Object.entries(emotions)) {
        // Position in grid
        const row = Math.floor(i / columns);
        const col = i % columns;
        const x = col * cellWidth + cellWidth / 2;
        const y = row * cellHeight + cellHeight / 2;
        
        // Get shape config
        const config = shapeMapping[emotion] || { shape: 'circle', color: '#E8C999' };
        const size = baseSize * (value / maxValue);

        // Draw shapes
        ctx.fillStyle = config.color;
        ctx.beginPath();

        switch(config.shape) {
            case 'circle':
                ctx.arc(x, y, size, 0, Math.PI * 2);
                break;
            case 'square':
                ctx.fillRect(x - size, y - size, size * 2, size * 2);
                break;
            case 'triangle':
                ctx.moveTo(x, y - size);
                ctx.lineTo(x + size, y + size);
                ctx.lineTo(x - size, y + size);
                ctx.closePath();
                break;
            case 'star':
                drawStar(ctx, x, y, 5, size, size * 0.5);
                break;
            case 'hexagon':
                drawPolygon(ctx, x, y, 6, size);
                break;
            case 'rectangle':
                ctx.fillRect(x - size * 1.5, y - size / 2, size * 3, size);
                break;
            case 'oval':
                ctx.ellipse(x, y, size, size * 0.5, 0, 0, Math.PI * 2);
                break;
        }

        ctx.fill();
        i++;
    }

    // Helper functions
    function drawStar(ctx, cx, cy, points, outerRadius, innerRadius) {
        ctx.beginPath();
        for(let i = 0; i < points * 2; i++) {
            const radius = i % 2 === 0 ? outerRadius : innerRadius;
            const angle = (Math.PI * i) / points - Math.PI / 2;
            ctx.lineTo(
                cx + Math.cos(angle) * radius,
                cy + Math.sin(angle) * radius
            );
        }
        ctx.closePath();
    }

    function drawPolygon(ctx, cx, cy, sides, radius) {
        ctx.beginPath();
        for(let i = 0; i < sides; i++) {
            const angle = (Math.PI * 2 * i) / sides - Math.PI / 2;
            ctx.lineTo(
                cx + Math.cos(angle) * radius,
                cy + Math.sin(angle) * radius
            );
        }
        ctx.closePath();
    }
}

// Example usage:
// drawEmotionShapes(sampleData, canvas);