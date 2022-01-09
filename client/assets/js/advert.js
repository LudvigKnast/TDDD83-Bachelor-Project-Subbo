 
 function loadAd(ad_id) {
    $.ajax({
        url: host + '/ads/' + ad_id,
        type: 'GET',

        success: function(ad) {
            var apartment = ad.apartment

            $("#advertrow").append(
                '<div class="col-lg-12 col-md-12 mb-4 mb-lg-0">' +
                    '<div id="advertcard" class="card shadow-sm border-0 rounded">' +
                        '<div class="card-body p-0">' +
                            image_carousel(ad, apartment)+
                            '<div class="p-4">' +
                                '<h2 class="mb-0">'+ apartment?.address +'</h2>' +
                                '<p class="small text-muted">' + apartment?.city + ', ' + apartment?.state + '</p>'+
                                '<p class="small text-muted">'+ apartment?.rooms +' rum • '+ apartment?.area +' m2</p>'+
                                '<p>'+ad.description+'</p>'+
                                '<div class="row">'+
                                            '<div class="column col-lg-9 col-md-7 col-sm-7 col-7"><div class="mb-0 rent" style="text-align:left; font-size: 25px">'+ad.rent+' kr/mån</div>'+
                                            '<p class="small text-muted" style="text-align:left">' + 'Tillgänglig ' + ad.start_date +' till '+ ad.end_date +'</p></div>'+
                                            '<div class="column col-lg-3 col-md-5 col-sm-5 col-5" style="margin: 10px 0 0 0">'+interest_button(ad_id,apartment.id)+'</div>'+
                                        '</div>'+
                                
                                '</div></div></div></div>');
        }
    });
}
function image_carousel(ad, apartment){
    var carousel = '<div id="imagecarousel" class="carousel slide" data-ride="carousel" data-interval="false">'+
                            '<ol class="carousel-indicators">'+
                                '<li data-target="#imagecarousel" data-slide-to="0" class="active"></li>'+
                                add_carousel_indicator(ad, apartment) +
                            '</ol>'+
                            '<div class="carousel-inner">'+
                                '<div class="carousel-item active">'+
                                '<figure class="card-img-wrapper">'+
                                '<img class="d-block w-100 card-img-top" src="assets/img_uploads/' + apartment.images[0].image_name +'" alt="Bild 1 på bostaden" >'+
                                '</figure>'+
                                '</div>'+
                                add_images_to_carousel(ad, apartment) +
                            '</div>'+
                            '<a class="carousel-control-prev" href="#imagecarousel" role="button" data-slide="prev">'+
                                '<span class="carousel-control-prev-icon" aria-hidden="true"></span>'+
                                '<span class="sr-only">Nästa bild</span>'+
                            '</a>'+
                            '<a class="carousel-control-next" href="#imagecarousel" role="button" data-slide="next">'+
                                '<span class="carousel-control-next-icon" aria-hidden="true"></span>'+
                                '<span class="sr-only">Föregående bild</span>'+
                            '</a>'+
                ' </div>'
    return carousel
}

function add_carousel_indicator(ad, apartment){
    var indicator_carousel = ""

    for (i = 1; i < apartment.images.length; i++){
        indicator_carousel += '<li data-target="#imagecarousel" data-slide-to="'+i+'"></li>'
    }

    return indicator_carousel
}

function add_images_to_carousel(ad, apartment){
    var images_carousel = ""

    for (i = 1; i < apartment.images.length; i++){
        var pic_nr = i+1
        images_carousel += '<div class="carousel-item">'+
                            '<figure class="card-img-wrapper">'+
                            '<img class="d-block w-100 card-img-top" src="assets/img_uploads/' + apartment.images[i].image_name +'" alt="Bild '+ pic_nr +' på bostaden">'+
                            '</figure>'+
                            '</div>'
    }

    return images_carousel
}

function check_interest(apt,id){
    return apt.id == id
}
 
function interest_button(ad_id,apt_id){
    reg_interest_string = '<a class="btn btn-warning" onclick=registerInterest('+ad_id+') href="/ad&id=' + ad_id + '"  role="button">Anmäl ditt intresse!</a>'
    rem_interest_string = '<a class="btn btn-warning" onclick=removeInterest('+apt_id+') href="/ad&id=' + ad_id + '"  role="button">Avanmäl ditt intresse!</a>'
    ret =""
    $.ajax({
        headers: { "Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token },
        url: host + "/interesting-apartments",
        type: 'GET',
        contentType: "application/json",
        async : false,
        success: function(result) {
            result.forEach(apt => {
                if (apt.id == apt_id){
                    ret = rem_interest_string
                }           
            });
            if (ret ==""){
                ret = reg_interest_string 
            }                                         
        }
    });
return ret

}

function removeInterest(apt_id){
    $.ajax({headers: { "Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token },
    url : host+"/interesting-apartments/" + apt_id,
    type : "DELETE",
    contentType : "application/json"
    });

}
function registerInterest(ad_id) {
    $.ajax({
        headers: { "Authorization": "Bearer " + JSON.parse(sessionStorage.getItem('auth')).token },
        url: host + '/register-interest/' + ad_id,
        type: 'POST',
        contentType: "application/json",

    })
}

$(document).ready(function(){
    $(document).on("advertroute", function(event, ad_id) {
        loadAd(ad_id);
    })
});