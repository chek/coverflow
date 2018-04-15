var Coverflow = {
    container: null,
    count: 7,
    index: 3,
    pics: [],
    touchStar: null,
    twistPics: function() {
        var i;
        var zIndex = 0;    
        for (i = 0; i < Coverflow.count; i++) { 
            var el = Coverflow.pics[i];
            if (i < Coverflow.index) {
                zIndex += 1;
                if ( !el.classList.contains("left") ) {
                    el.style.zIndex = zIndex;    
                    el.classList.remove("right");
                    el.classList.remove("middle");
                    el.classList.add("left");
                }
            }
        } 
        zIndex = 0;    
        for (i = Coverflow.count - 1; i >= 0; i--) { 
            var el = Coverflow.pics[i];
            if (i > Coverflow.index) {
                zIndex += 1;
                if ( !el.classList.contains("right") ) {
                    el.style.zIndex = zIndex;    
                    el.classList.remove("left");
                    el.classList.remove("middle");
                    el.classList.add("right");
                }
            }
        } 
        var el = Coverflow.pics[Coverflow.index];
        el.style.zIndex = 10000;    
        el.classList.remove("left");
        el.classList.add("middle");
        el.classList.remove("right");
    },
    init: function() {
        Coverflow.container = document.getElementById("container");
        var i;
        for (i = 1; i <= Coverflow.count; i++) { 
            var img = document.createElement("img");
            img.src = "https://loremflickr.com/320/240?random=" + i;            
            Coverflow.container.appendChild(img);            
            Coverflow.pics.push(img);
        }        
        Coverflow.twistPics();




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