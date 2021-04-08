var myCarousel = document.querySelector('#carouselExampleIndicators')
var carousel = new bootstrap.Carousel(myCarousel, {
  interval: 1500,
  wrap: true,
  touch: true
})


$(document).ready(function(){
    $('.single-item').slick({
        
    });
  });
      
  
$('.slider_product').slick({
dots: true,
infinite: true,
speed: 2,
slidesToShow: 4,
slidesToScroll: 4,
responsive: [
    {
    breakpoint: 1024,
    settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
    }
    },
    {
    breakpoint: 600,
    settings: {
        slidesToShow: 2,
        slidesToScroll: 2
    }
    },
    {
    breakpoint: 480,
    settings: {
        slidesToShow: 1,
        slidesToScroll: 1
    }
    }
]
});
