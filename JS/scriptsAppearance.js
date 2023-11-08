$(function() {
    $("#darkMode").click(function() {
        $("div").removeClass("light").addClass("dark");
    });
});
$(function() {
    $("#lightMode").click(function() {
        $("div").removeClass("dark").addClass("light");
    });
});


/*bg Theme*/
(function () {

    /*INIT*/
    let svg = document.getElementsByTagName("svg")[0]
    let body = document.getElementsByTagName("body")[0]
    let g = svg.querySelector("g")
    let themeSelector = {value: "Particles"}
    let WIDTH, COLS, ROWS, TOTAL, CENTERX, CENTERY
    let gridIsBuilding = false  //unused.

    function setWindowValues(){
        minFactor = Math.min(svg.clientWidth, svg.clientHeight)
        WIDTH = minFactor > 1200 ? 65 : minFactor > 950 ? 55 : minFactor > 750 ? 45 : 35
        COLS = Math.floor(svg.clientWidth / WIDTH)
        ROWS = Math.floor(svg.clientHeight / WIDTH)
        TOTAL = (COLS + 1) * (ROWS + 1)
        CENTERX = Math.floor(COLS / 2)
        CENTERY = Math.floor(ROWS / 2)
    }

    /*theme config + theme func = theme*/
    let themes = {

        "Particles": {
            key: "Particles",
            url: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1197275/milky3.jpg",
            /*see pen details for image credits*/
            func: particles,
            base: "rgba(10,0,0, .3)",
            solid1: "rgba(86, 86, 149, .3)",
            solid2: "rgba(86, 86, 149, .5)",
            className: "particles"
        },

    }

   /* themeSelector("change", function(ev){
        buildGrid()
    })*/
    async function buildGrid(doDelay = true) {
        setWindowValues()
        if(doDelay) await delay(2000)
        let theme = themes["Particles"]
        g.innerHTML = ''
        g.style = ''
        g.style.fill = theme.base
        body.className = theme.className || ""
        body.style.backgroundImage = theme.url ? `url('${theme.url}')` : ""

        buildBoxes(theme.base, theme.gutter)
        theme.func()

    }
    body.onload = () => buildGrid(false)

    /* PRESETS */

    function particles() {
        let theme = themes["Particles"]
        let bounceMap = {
            "right": {
                "northEast": "northWest",
                "southEast": "southWest",
            },
            "down": {
                "southEast": "northEast",
                "southWest": "northWest",
            },
            "left": {
                "southWest": "southEast",
                "northWest": "northEast"
            },
            "up": {
                "northEast": "southEast",
                "northWest": "southWest",
            }
        }
        let reversalMap = {
            "northEast": "southWest",
            "southEast": "northWest",
            "northWest": "southEast",
            "southWest": "northEast"
        }

        let min = 20 /*time range*/
        let max = 150
        for (let i = 0; i < 15; i++) {
            let seed = Math.random()
            let seed2 = Math.random()
            let randCol = parseInt(seed * COLS)
            let randRow = parseInt(seed2 * ROWS)
            let time = seed2 * (max - min) + min
            let direction = seed > .75 ? "southWest" : seed > .5 ? "southEast" : seed > .25 ? "northEast" : "northWest"
            randCol = randCol == 0 ? 1 : randCol //move points in from perimeter, causes issues when starting on outside.
            randRow = randRow == 0 ? 1 : randRow
            let p = new Point(randRow, randCol)
            moveDiagonally(p, time, seed > .5 ? theme.solid1 : theme.solid2, theme.base, direction)
        }

        async function moveDiagonally(point, time, color, base, direction) {

            if(gridIsBuilding || themeSelector.value != "Particles") return false;

            let target = getTarget(point.row, point.col)
            target.setAttribute("fill", color)
            await delay(time)
            target.setAttribute("fill", base)

            if (isBoundary(target)) {
                if (isCorner(target)) {
                    direction = reversalMap[direction]
                } else { //against the wall
                    let side = whichBoundary(target)
                    direction = bounceMap[side][direction]
                }
            }
            let nextPoint = getNextPointInDirection(point, direction)
            moveDiagonally(nextPoint, time, color, base, direction)
        }
    }
    /* helpers */
    function buildBoxes(color, gutter) {
        gutter = gutter === undefined ? 1 : gutter
        for (var col = 0; col <= COLS; col++) {
            for (var row = 0; row <= ROWS; row++) {
                let x = WIDTH * col
                let y = WIDTH * row
                drawSquare(row, col, x, y, WIDTH - gutter, WIDTH - gutter, color)
            }
        }
    }

    function Point(row, col, type) {
        this.col = parseInt(col)
        this.row = parseInt(row)
        this.type = type
    }

    function getNextPoint(point) {
        let isEndOfRow = point.col == COLS
        let newRow = isEndOfRow ? point.row + 1 : point.row
        let newCol = isEndOfRow ? 0 : point.col + 1
        if (newRow > ROWS) return undefined
        return new Point(newRow, newCol)
    }

    function getNextPointInDirection(point, direction) {
        let row = point.row
        let col = point.col
        switch (direction) {
            case "north":
                return new Point(row - 1, col)
                break
            case "south":
                return new Point(row + 1, col)
                break
            case "east":
                return new Point(row, col + 1)
                break
            case "west":
                return new Point(row, col - 1)
                break
            case "northEast":
                return new Point(row - 1, col + 1)
                break
            case "southEast":
                return new Point(row + 1, col + 1)
                break
            case "northWest":
                return new Point(row - 1, col - 1)
                break
            case "southWest":
                return new Point(row + 1, col - 1)
                break
        }
    }

    function getRandomMove(from, xRando = Math.random(), yRando = Math.random()) {

        var xMove = xRando > .66 ? 1 : xRando > .33 ? 0 : -1
        var yMove = yRando > .66 ? 1 : yRando > .33 ? 0 : -1

        if (from.row + yMove > ROWS) yMove = 0
        if (from.row + yMove < 0) yMove = 0
        if (from.col + xMove < 0) xMove = 0
        if (from.col + xMove > COLS) xMove = 0

        return new Point(from.row + yMove, from.col + xMove)
    }

    function getRandomPoint() {
        let row = Math.floor(Math.random() * (ROWS + 1))
        let col = Math.floor(Math.random() * (COLS + 1))
        return new Point(row, col)
    }

    function getRandomDirection(not) {

        var generate = () => {
            let seed = Math.random()
            return seed > .75 ? "south" : seed > .5 ? "north" : seed > .25 ? "east" : "west"
        }
        let which = generate()
        while (not && which == not) {
            which = generate()
        }
        return which
    }

    function getTarget(row, col) {
        return document.querySelector(`rect[col='${col}'][row='${row}']`)
    }

    function isBoundary(el) {
        let row = el.getAttribute("row")
        let col = el.getAttribute("col")
        return row == 0 || row == ROWS || col == 0 || col == COLS
    }

    function whichBoundary(el) {
        let row = el.getAttribute("row")
        let col = el.getAttribute("col")
        return row == 0 ? "up" : row == ROWS ? "down" : col == 0 ? "left" : col == COLS ? "right" : undefined
    }

    function isCorner(el) {
        let row = el.getAttribute("row")
        let col = el.getAttribute("col")
        return (row == 0 && col == 0) ||
            (col == 0 && row == ROWS) ||
            (col == COLS && row == ROWS) ||
            (row == 0 && col == COLS)
    }

    function changePreset(e) {
        //document.location.search = `preset=${e.target.value}`
        document.location.replace(document.location.href.replace(/\?preset=\w+$/, "") + `?preset=${e.target.value}`)
    }

    function delay(ms) {
        return new Promise(done => setTimeout(() => {
            done()
        }, ms))
    }

    function drawSquare(row, col, x, y, w, h, color) {
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect")
        rect.setAttribute("x", x)
        rect.setAttribute("y", y)
        rect.setAttribute("row", row)
        rect.setAttribute("col", col)
        rect.setAttribute("width", w)
        rect.setAttribute("height", h)
        g.appendChild(rect)

    }
})("Visit me at sweaverD.com!")