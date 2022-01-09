var host = 'http://localhost:5000';

function loadAds(state, room, area, rent) {
    $("#adrows").html("");

    room = room == "Alla" ? "0" : room
    area = area == "Alla" ? "0" : area
    rent = rent == "Alla" ? "20000" : rent

    $.ajax({
        url: host + '/ads/state=' + state +'&room=' + room + '&area=' + area + '&rent=' + rent,
        type: 'GET',

        success: function(ads) {
        $.each(ads, function(index, ad){
            if (ad.paid) {

                var apartment = ad.apartment
                var apartment_image_src = "https://pix10.agoda.net/hotelImages/103/1030438/1030438_15081214210034117680.png"
                if (apartment.images[0] !== undefined) {
                   apartment_image_src = "../assets/img_uploads/" + apartment.images[0].image_name
                   // When images are stored on server: apartment_image_src = "../../server/img_uploads2" + apartment.images[0].image_name
                }

                    $("#adrows").append(
                        '<div class="col-lg-6 col-md-6 mb-4 mb-lg-0">' +
                            '<div class="card shadow-sm border-0 rounded housingcard">' +
                                '<div class="card-body p-0">'+
                                '<img src="'+ apartment_image_src +'" alt="bild på bostad ' + apartment?.address + '" class="d-block w-100 card-img-top">' +
                                    '<div class="p-4">' +
                                        '<h3 class="mb-0">'+ apartment?.address +'</h3>' +
                                        '<p class="small text-muted">' + apartment?.city + ', ' + apartment?.state + '</p>'+
                                        '<p class="small text-muted">'+ apartment?.rooms +' rum • '+ apartment?.area +' m2</p>'+
                                        '<div class="row">'+
                                            '<div class="column col-lg-8 col-md-7 col-sm-7 col-7"><div class="mb-0 rent" style="text-align:left; font-size: 25px">'+ad.rent+' kr</div><p class="small text-muted" style="text-align:left">' + ad.start_date +' - '+ ad.end_date +'</p></div>'+
                                            '<div class="column col-lg-4 col-md-5 col-sm-5 col-5"><a class="btn btn-primary" style="margin: 10px 0 0 0; padding-left: 30px; padding-right: 30px" href="/ad&id='+ad.id+'" role="button" aria-label="Mer info om '+apartment?.address+'">Mer info</a></div>'+
                                        
                                        '</div>'+
                                        
                                        '</div></div></div></div>');
                                    

            }                            
        });
        }
    });
}

$(document).ready(function(){
    $(document).on("housingroute", function(event, state, room, area, rent) {

        state = state ?? "Alla"
        room = room ?? "Alla"
        area = area ?? "Alla"
        rent = rent ?? "Alla"

        $('#State').val(state)
        $('#Room').val(room)
        $('#Area').val(area)
        $('#Rent').val(rent)
        
        loadAds(state, room, area, rent);
    })

    $(document).on("click", '#filter', function(e){
        e.preventDefault()
        var state = $('#State').val() //== "Visa alla" ? "All" : $('#State').val()
        var room = $('#Room').val()
        var area = $('#Area').val()
        var rent = $('#Rent').val()

        window.history.pushState({ additionalInformation: 'Updated the URL with JS' },"Housing", "./housing&state=" + state + "&room=" + room + "&area=" + area + "&rent="+ rent);

        loadAds(state, room, area, rent);
    });


});
