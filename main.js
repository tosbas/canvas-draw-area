    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth - 10;
    canvas.height = window.innerHeight - 45;

    // resize automatique

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth - 10;
        canvas.height = window.innerHeight - 45;
    })

    let painting = false;

    function startPosition(e) {
        painting = true;
        draw(e)
    }

    // dessiner

    function draw(e) {
        if (painting == false) return;

        ctx.lineWidth = 5;
        ctx.lineCap = "round";
        ctx.lineTo(e.clientX - 5, e.clientY - 40);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX - 5, e.clientY - 40);
    }

    // Fin de dessin

    function endPosition(e) {
        painting = false;
        ctx.beginPath();
    }

    // Nettoyer la zone

    function clear(e) {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

    }

    // Evenements

    document.addEventListener("keydown", clear)

    document.addEventListener("mousedown", startPosition)

    document.addEventListener("mousemove", draw)

    document.addEventListener("mouseup", endPosition)

    // Pour évenement mobile

    function drawMobile(e) {

        ctx.lineWidth = 3;
        ctx.lineCap = "round";
        ctx.lineTo(e.changedTouches[0].clientX - 5, e.changedTouches[0].clientY - 40);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.changedTouches[0].clientX - 5, e.changedTouches[0].clientY - 40);

    }

    document.addEventListener("touchmove", drawMobile)

    document.addEventListener("touchend", endPosition)