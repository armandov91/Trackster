var Trackster = {};
const API_KEY = "bac1555e1d3c98d0337812a3e4680f5f";


$(document).ready(function() {
  $("#header_search_button").click(function() {
    Trackster.searchTracksByTitle($("#search_field").val());
  });
});



/*
  Given an array of track data, create the HTML for a Bootstrap row for each.
  Append each "row" to the container in the body to display all tracks.
*/
Trackster.renderTracks = function(tracks) {
  $.each(tracks.track,function(index,item){
    var image_url = item.image[1]["#text"];
    var Song_Row_HTML =
    '<div class="row song_row">'+
    '         <a href="'+item.url+'"><i class="far fa-play-circle fa-2x col-xs-1"aria-hidden="true"></i></a>'+
    '         <span class="col-xs-3 song_name">'+item.name+'</span>'+
    '         <span class="col-xs-3 artist_name">'+item.artist+'</span>'+
    '         <div class="col-xs-3"><img src="'+image_url+'" alt="Album image for song '+item.name+'" ></div>'+
    '         <span class="col-xs-2 listeners_quantity">'+item.listeners+'</span>'+
    '       </div>';
    $("#songs_list").append(Song_Row_HTML);
  })
};

/*
  Given a search term as a string, query the LastFM API.
  Render the tracks given in the API query response.
*/
Trackster.searchTracksByTitle = function(title) {
  $.ajax({url: "http://ws.audioscrobbler.com/2.0/?method=track.search&track=" + title + "&api_key=" +API_KEY+ "&format=json", success: function(data){
    console.log(data.results.trackmatches);
    // clear html inside songs list header_section
    $("#songs_list").empty();
    // Call render tracks
    Trackster.renderTracks(data.results.trackmatches);

  }});
};
