var Coverflow = {
    container: null,
    loadingContainer: null,
    settingsContainer: null,
    widthInput: null,
    heightInput: null,
    spaceInput: null,
    addButton: null,

    countLeftVisibleImgs: 0,
    countRightVisibleImgs: 0,
    count: 7,
    index: 3,
    pics: [],
    touchStar: null,
    loadedImages: 0,
    width: 320,
    height: 240,
    space: 20,
    recalculateZIndex: function() {
        var i;
        var zIndex = 0;    
        for (i = 0; i < Coverflow.count; i++) { 
            var el = Coverflow.pics[i];
            if (i < Coverflow.index) {
                zIndex += 1;
                el.style.zIndex = zIndex;    
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
                if ( !el.classList.contains("right") ) {
                    el.classList.remove("left");
                    el.classList.remove("middle");
                    el.classList.add("right");
                    Coverflow.setImageSize(el);
                }
            }
        } 
    },
    setCurrentImg: function() {
        var el = Coverflow.pics[Coverflow.index];
        el.style.zIndex = 10000;    
        el.classList.remove("left");
        el.classList.add("middle");
        el.classList.remove("right");
        Coverflow.setImageSize(el);
    },
    setCardsOpacity: function() {
        Coverflow.countLeftVisibleImgs = 0;
        var countLeftImgs = Coverflow.index - 1;
        var ind = 0;
        for (i = Coverflow.index-1; i >= 0; i--) { 
            ind += 1;
            var el = Coverflow.pics[i];
            if (ind > 5) {
                var opacity = 1;
                opacity = opacity - (ind - 5) * 0.1;
                if (opacity < 0) opacity = 0;
                el.style.opacity = opacity;    
                if (opacity === 0) el.style.display = 'none';
                if (opacity > 0) {
                    el.style.display = 'inline';
                    Coverflow.countLeftVisibleImgs += 1;
                }
            } else {
                el.style.display = 'inline';
                el.style.opacity = '';    
                Coverflow.countLeftVisibleImgs += 1;
            }
        }         
        Coverflow.countRightVisibleImgs = 0;
        var countRightImgs = Coverflow.count - Coverflow.index;        
        var ind = 0;
        for (i = Coverflow.index+1; i < Coverflow.count; i++) { 
            ind += 1;
            var el = Coverflow.pics[i];
            if (ind > 5) {
                var opacity = 1;
                opacity = opacity - (ind - 5) * 0.1;
                if (opacity < 0) opacity = 0;
                el.style.opacity = opacity;    
                if (opacity === 0) el.style.display = 'none';
                if (opacity > 0) {
                    el.style.display = 'inline';
                    Coverflow.countRightVisibleImgs += 1;
                }
            } else {
                el.style.display = 'inline';
                el.style.opacity = '';    
                Coverflow.countRightVisibleImgs += 1;
            }
        }         
    },
    shiftContainer: function() {
        var countLeftImgs = Coverflow.index - 1;
        var countRightImgs = Coverflow.count - Coverflow.index;        
        if (Coverflow.countRightVisibleImgs > Coverflow.countLeftVisibleImgs) {
            var rightOffset = Coverflow.countRightVisibleImgs - Coverflow.countLeftVisibleImgs - 1;
            Coverflow.container.style.paddingLeft = rightOffset * Coverflow.space + 'px';
            Coverflow.container.style.paddingRight = '';
        }
        if (Coverflow.countRightVisibleImgs < Coverflow.countLeftVisibleImgs) {
            var leftOffset = Coverflow.countLeftVisibleImgs - Coverflow.countRightVisibleImgs - 1;
            Coverflow.container.style.paddingRight = leftOffset * Coverflow.space + 'px';
            Coverflow.container.style.paddingLeft = '';
        }                        
        if (Coverflow.countRightVisibleImgs === Coverflow.countLeftVisibleImgs) {
            Coverflow.container.style.paddingLeft = '';
            Coverflow.container.style.paddingRight = '';
        }                        
    },
    twistPics: function(leftRight) {
        var currentPic = document.getElementsByClassName("middle")[0];
        if (typeof currentPic !== 'undefined') {
            if (!leftRight) {
                currentPic.classList.add("left");
                currentPic.classList.remove("middle");
                currentPic.classList.remove("right");
                var countLeftImgs = Coverflow.index - 1;
                currentPic.style.zIndex = countLeftImgs + 1;  
                Coverflow.setImageSize(currentPic);    
            }
            if (leftRight) {
                currentPic.classList.remove("left");
                currentPic.classList.remove("middle");
                currentPic.classList.add("right");
                var countRightImgs = Coverflow.count - Coverflow.index;        
                currentPic.style.zIndex = countRightImgs + 1;  
                Coverflow.setImageSize(currentPic);    
            }
        }

        Coverflow.setCurrentImg();

        setTimeout(
            function() { 
                Coverflow.setCardsOpacity();
                Coverflow.shiftContainer();
            }, 
            100
        );
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
        Coverflow.recalculateZIndex();
        Coverflow.setCardsOpacity();
        Coverflow.shiftContainer();
        Coverflow.setCurrentImg();




        Coverflow.addButton.onclick = function(e) {
            e.preventDefault();
            Coverflow.count += 1;
            var img = document.createElement("img");
            Coverflow.container.appendChild(img);            
            img.src = "https://picsum.photos/320/240?image=" + Coverflow.count;     
            Coverflow.pics.push(img);
            Coverflow.recalculateZIndex();
            Coverflow.setCardsOpacity();
            Coverflow.shiftContainer();            
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
        Coverflow.container.onmousedown = function(e){
            e.preventDefault();
            var coords = [e.clientX, e.clientY];
            Coverflow.touchStar = coords;
        };
        Coverflow.container.ontouchstart = function(e){
            e.preventDefault();
            var touchList = e.changedTouches;
            var coords = [touchList[0].clientX, touchList[0].clientY];
            Coverflow.touchStar = coords;
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
            if ( (Coverflow.touchStar !== null) && (coords[0] > Coverflow.touchStar[0] + 40) ) {
                if (Coverflow.index > 0) {
                    Coverflow.index -= 1;
                    Coverflow.touchStar = null;
                    Coverflow.twistPics(true);
                }
            }
            if ( (Coverflow.touchStar !== null) &&  (coords[0] < Coverflow.touchStar[0] - 40) ) {
                if (Coverflow.index < Coverflow.count - 1) {
                    Coverflow.index += 1;
                    Coverflow.touchStar = null;
                    Coverflow.twistPics(false);
                }
            }
        };
        
    },
};