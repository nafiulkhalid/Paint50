
let ctx, canvas;

document.addEventListener('DOMContentLoaded', function(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.8;

    let painting = false;

    function startPosition(e) {
        painting = true;
        draw(e);
    }

    function finishedPosition(){
        painting = false;
        ctx.beginPath();
    }

    function draw(e){
        if (!painting) return;
        ctx.lineWidth = 5;
        ctx.lineCap = 'round';
        ctx.strokeStyle = document.getElementById('colorPicker').value;

        const rect = canvas.getBoundingClientRect();
        ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    }

    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', finishedPosition);
    canvas.addEventListener('mousemove', draw);
    document.getElementById('clear').addEventListener('click', clearCanvas);

    document.querySelectorAll('#toolbar button').forEach(btn => {
        btn.addEventListener('click', () => setTool(btn.id));
    });
});

// Using the clear button

function clearCanvas(){
    ctx.fillStyle = '#FFFFFF';
    ctx.clearRect(0,0,canvas.width, canvas.height);
}


const setTool = (tool) => {
    switch(tool){
        case 'brush':
            ctx.globalCompositeOperation = 'source-over';
            ctx.strokeStyle = document.getElementById('colorPicker').value;
            ctx.lineWidth = 5;
            break;
        case 'eraser':
            ctx.globalCompositeOperation = 'destination-out';
            ctx.strokeStyle = '#FFFFFF';
            ctx.lineWidth = 25;
            break;
    }
};