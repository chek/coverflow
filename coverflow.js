var Coverflow = {
    container: null,
    loadingContainer: null,
    settingsContainer: null,
    widthInput: null,
    heightInput: null,
    spaceInput: null,
    addButton: null,

    count: 7,
    index: 3,
    pics: [],
    touchStar: null,
    loadedImages: 0,
    width: 320,
    height: 240,
    space: 20,
    twistPics: function() {
        var i;
        var zIndex = 0;    
        var countLeftImgs = 0;
        for (i = 0; i < Coverflow.count; i++) { 
            var el = Coverflow.pics[i];
            if (i < Coverflow.index) {
                zIndex += 1;
                el.style.zIndex = zIndex;    
                countLeftImgs += 1;
                if ( !el.classList.contains("left") ) {
                    el.classList.remove("right");
                    el.classList.remove("middle");
                    el.classList.add("left");
                    Coverflow.setImageSize(el);
                }
            }
        } 
        zIndex = 0;    
        var countRightImgs = 0;
        for (i = Coverflow.count - 1; i >= 0; i--) { 
            var el = Coverflow.pics[i];
            if (i > Coverflow.index) {
                zIndex += 1;
                el.style.zIndex = zIndex;    
                countRightImgs += 1;
                if ( !el.classList.contains("right") ) {
                    el.classList.remove("left");
                    el.classList.remove("middle");
                    el.classList.add("right");
                    Coverflow.setImageSize(el);
                }
            }
        } 
        var el = Coverflow.pics[Coverflow.index];
        el.style.zIndex = 10000;    
        el.classList.remove("left");
        el.classList.add("middle");
        el.classList.remove("right");
        Coverflow.setImageSize(el);

        if (countRightImgs > countLeftImgs) {
            var rightOffset = countRightImgs - countLeftImgs - 1;
            Coverflow.container.style.paddingLeft = rightOffset * Coverflow.space + 'px';
        }
        if (countRightImgs < countLeftImgs) {
            var leftOffset = countLeftImgs - countRightImgs - 1;
            Coverflow.container.style.paddingRight = leftOffset * Coverflow.space + 'px';
        }
    },
    setImagesSizes: function() {
        var i;
        Coverflow.heightInput.value = Coverflow.height;
        Coverflow.widthInput.value = Coverflow.width;
        for (i = 0; i < Coverflow.count; i++) { 
            var el = Coverflow.pics[i];
            Coverflow.setImageSize(el);
        } 
    },
    setImageSize: function(el) {
        el.style.width = Coverflow.width + 'px';    
        el.style.height = Coverflow.height + 'px';    
        if ( el.classList.contains("right") ) {
            el.style.marginRight = Coverflow.space - Coverflow.width + 'px';                    
            el.style.marginLeft = '';                    
        }
        if ( el.classList.contains("left") ) {
            el.style.marginLeft = Coverflow.space - Coverflow.width + 'px';                    
            el.style.marginRight = '';                    
        }
        if ( el.classList.contains("middle") ) {
            el.style.marginLeft = '';                    
            el.style.marginRight = '';                    
        }
    },
    init: function() {
        Coverflow.container = document.getElementById("container");
        Coverflow.loadingContainer = document.getElementById("loading-container");
        Coverflow.settingsContainer = document.getElementById("settings");
        Coverflow.widthInput = document.getElementById("width");
        Coverflow.heightInput = document.getElementById("height");
        Coverflow.spaceInput = document.getElementById("space");
        Coverflow.spaceInput = document.getElementById("space");
        Coverflow.addButton = document.getElementById("add-btn");
            
        var i;
        for (i = 1; i <= Coverflow.count; i++) { 
            var img = document.createElement("img");
            Coverflow.container.appendChild(img);            
            img.src = "https://picsum.photos/320/240?image=" + i;     
            img.onload = function() {
                Coverflow.loadedImages += 1;
                if (Coverflow.loadedImages === Coverflow.count) {
                    Coverflow.loadingContainer.style.display = 'none';    
                    Coverflow.container.style.display = 'block';    
                    Coverflow.settingsContainer.style.display = 'block';    
                    Coverflow.setImagesSizes();
                }
            };                   
            Coverflow.pics.push(img);
        }        
        Coverflow.twistPics();



        Coverflow.addButton.onclick = function(e) {
            e.preventDefault();
            Coverflow.count += 1;
            var img = document.createElement("img");
            Coverflow.container.appendChild(img);            
            img.src = "https://picsum.photos/320/240?image=" + Coverflow.count;     
            Coverflow.pics.push(img);
            Coverflow.twistPics();
        }
        Coverflow.spaceInput.onchange = function(e) {
            e.preventDefault();
            Coverflow.space = Coverflow.spaceInput.value;
            Coverflow.setImagesSizes();
        }
        Coverflow.widthInput.onchange = function(e) {
            e.preventDefault();
            var neWidth = Coverflow.widthInput.value;
            var coef = 320/240;
            var newHeight = neWidth/coef;
            Coverflow.width = neWidth;
            Coverflow.height = newHeight;
            Coverflow.setImagesSizes();
        }
        Coverflow.heightInput.onchange = function(e) {
            e.preventDefault();
            var newHeight = Coverflow.heightInput.value;
            var coef = 320/240;
            var neWidth = coef/newHeight;
            Coverflow.width = neWidth;
            Coverflow.height = newHeight;
            Coverflow.setImagesSizes();
        }
        //Coverflow.heightInput = document.getElementById("height");

        Coverflow.container.onmousedown = function(e){
            e.preventDefault();
            var coords = [e.clientX, e.clientY];
            Coverflow.touchStar = coords;
            console.log(Coverflow.touchStar);
        };
        Coverflow.container.ontouchstart = function(e){
            e.preventDefault();
            var touchList = e.changedTouches;
            var coords = [touchList[0].clientX, touchList[0].clientY];
            Coverflow.touchStar = coords;
            console.log(Coverflow.touchStar);
        };
        Coverflow.container.onmouseup = function(e){
            e.preventDefault();
            Coverflow.touchStar = null;
        };
        Coverflow.container.ontouchend = function(e){
            e.preventDefault();
            Coverflow.touchStar = null;
        };
        
        Coverflow.container.onmousemove = function(e){
            e.preventDefault();
            var coords = [e.clientX, e.clientY];
            //console.log(coords[0] - Coverflow.touchStar[0])
            if ( (Coverflow.touchStar !== null) && (coords[0] > Coverflow.touchStar[0] + 40) ) {
                if (Coverflow.index > 0) {
                    Coverflow.index -= 1;
                    Coverflow.touchStar = null;
                    Coverflow.twistPics();
                    console.log('move right')
                }
            }
            if ( (Coverflow.touchStar !== null) &&  (coords[0] < Coverflow.touchStar[0] - 40) ) {
                if (Coverflow.index < Coverflow.count - 1) {
                    Coverflow.index += 1;
                    Coverflow.touchStar = null;
                    Coverflow.twistPics();
                    console.log('move left')
                }
            }
        };
        
    },
};