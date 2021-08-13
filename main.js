    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext('2d');
    const reset = document.getElementById('reset');
    const penSize = document.getElementById("penSize");
    const errorText = document.createElement("p");

    canvas.width = window.innerWidth - 10;
    canvas.height = window.innerHeight - 70;


    // resize automatique

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth - 10;
        canvas.height = window.innerHeight - 70;
    })

    let paintingIsPresent = false;

    let painting = false;

    function startPosition(e) {
        painting = true;
        draw(e)
    }


    // dessiner

    function draw(e) {
        if (painting == false) return;

        paintingIsPresent = true;

        ctx.lineWidth = penSize.value;
        ctx.lineCap = "round";
        ctx.lineTo(e.clientX - 5, e.clientY - 65);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX - 5, e.clientY - 65);
    }

    // Fin de dessin

    function endPosition(e) {
        painting = false;
        changePenSize = false;
        ctx.beginPath();
    }

    // Nettoyer la zone

    function clear() {

        if (paintingIsPresent && !changePenSize) {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
        }

    }

    let changePenSize = false;

    // Evenements

    penSize.addEventListener("click", () => {
        changePenSize = true;
    })

    penSize.addEventListener("input", () => {

        if (penSize.value > 60) {

            document.querySelector("div").appendChild(errorText);
            errorText.innerText = "Trop grand, maximum 60 !";
            penSize.value = 5;

            setTimeout(() => {
                document.querySelector("div").removeChild(errorText);
            }, 1000)

        }

    })

    document.addEventListener("keydown", clear)

    canvas.addEventListener("mousedown", startPosition)

    canvas.addEventListener("mousemove", draw)

    document.addEventListener("mouseup", endPosition)

    reset.addEventListener("click", clear)

    // Pour évenement mobile

    function drawMobile(e) {

        paintingIsPresent = true;

        ctx.lineWidth = penSize.value;
        ctx.lineCap = "round";
        ctx.lineTo(e.changedTouches[0].clientX - 5, e.changedTouches[0].clientY - 65);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.changedTouches[0].clientX - 5, e.changedTouches[0].clientY - 65);

    }

    document.addEventListener("touchmove", drawMobile)

    document.addEventListener("touchend", endPosition)