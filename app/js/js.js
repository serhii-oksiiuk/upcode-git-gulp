$(function(){
    btnHamburger();
    scrollMenuActiveClass();
    resizeWindow();
});

$( window ).resize(function() {
    resizeWindow();
});

//btn hamburger

function btnHamburger(){
    $('.btn-hamburger').on('click',function(){
        $('.btn-hamburger').toggleClass('active');
        $('nav ul').toggleClass('active');
    })
}

//scroller menu

function scrollMenuActiveClass(){   
    const section = $('.all-id'),
          nav = $('header nav'),
          srcLogoGray = './images/logo-gray.svg',
          srcLogoWhite = './images/Logo.svg';

    $(window).on('scroll', function () {
        const position = $(this).scrollTop(),
        homeHeight = ($('#home').height() - 100);
        
        if(position > homeHeight){
            nav.addClass('gray');
            $('.btn-hamburger').addClass('gray')
            $('.logo img').attr('src', srcLogoGray);
        }else{
            nav.removeClass('gray');
            $('.btn-hamburger').removeClass('gray')
            $('.logo img').attr('src', srcLogoWhite);
        }

        section.each(function () {
            const top = $(this).offset().top,
                  bottom = top + $(this).outerHeight();

            if (position >= top && position <= bottom) {
                nav.find('a').removeClass('active');
                section.removeClass('active');
                $(this).addClass('active');
                nav.find('a[href="#' + $(this).attr('id') + '"]').addClass('active');
            }
        });
        
    });

    $('header nav a, footer nav a').on('click', function () {
        const id = $(this).attr('href'),
        top = $(this).offset().top
        $('html, body').animate({
            scrollTop: $(id).offset().top
        }, 1000);
        return false;
    });

}

//home

var swiper = new Swiper('.swiper-home', {

    centeredSlides: true,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

});

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '360',
        width: '640',
        videoId: 'OLi5_8JWoAU',
        autoplay: true,
        events: {
            'onReady': onPlayerReady,
           // 'onStateChange': onPlayerStateChange
        }
    });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
    event.target.playVideo();
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING && !done) {
        done = true;
    }
}
// function stopVideo() {
//     player.stopVideo();
// }


//services

function positionTheDot() {

    var scrollPercentage = (
        (document.documentElement.scrollTop + document.body.scrollTop) / 
        (document.documentElement.scrollHeight - document.documentElement.clientHeight)
    ) * 1.25;
    
    var path = document.getElementById("theMotionPath");
    var pathLen = path.getTotalLength();
    
    var pt = path.getPointAtLength(scrollPercentage * pathLen);

    var dot = document.getElementById("dot");

    dot.setAttribute("transform", "translate("+ pt.x + "," + pt.y + ")");
    
};

function resizeWindow(){
    var widthWindow = $( window ).width();
    if(  widthWindow > 1024 ){
        window.addEventListener("scroll", positionTheDot);
        positionTheDot();
    }
}

//team

var mySwiper = new Swiper('.mySwiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    coverflowEffect: {
        rotate: 30,
        slideShadows: true,
    },
    on: {
        init: function () {
          console.log('swiper initialized');
        },
        
    },    
});

mySwiper.on('slideChange', function () {
    console.log('slide changed');
});

//maps

var markers = new Array();
var map;
var locations = [];

function initialize() {   
    $('.one-adress').each(function(index){
        let thisAttrId = $(this).attr('data-id');
        let thisAttrX = $(this).attr('data-x');
        let thisAttrY = $(this).attr('data-y');
        $(this).on('click', function(){
            triggerClick(thisAttrId);
            let text = $(this).find('span.adressa').text();
            $('.head-adressa').text(text);
        });
        locations.push([thisAttrId, thisAttrX, thisAttrY])
    });  
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center:  new google.maps.LatLng(locations[0][1], locations[0][2]),
        styles: [
            {
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#444444"
                    }
                ]
            },
            {
                "featureType": "administrative.country",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "administrative.locality",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "administrative.locality",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#f2f2f2"
                    }
                ]
            },
            {
                "featureType": "landscape.natural.terrain",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "landscape.natural.terrain",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "invert_lightness": true
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 45
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#9FE7B2"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            }
        ],
    });
   
    for (var i = 0; i < locations.length; i++) {
        var iconN = './images/marker.svg';
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map,
            icon: iconN,
            activeMarker: locations[i][0]
        });
        markers.push(marker);
        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                map.setCenter(marker.getPosition());
                for (var j = 0; j < markers.length; j++) {
                    markers[j].setIcon('./images/marker.svg');
                }
                marker.setIcon("./images/marker-act.svg");
                
                $('.one-adress').removeClass('active');
                $('.one-item-description').removeClass('active');

                let thisMarker = marker.activeMarker;
                $('.one-adress[data-id=' + thisMarker + ']').addClass('active');
                $('.one-item-description[data-id=' + thisMarker + ']').addClass('active');
                
            }
        })(marker, i)); 
        
    }
}

function triggerClick(i) {
    google.maps.event.trigger(markers[i], 'click');
}