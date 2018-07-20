import React from "react";

class MainMap extends 
React.Component {
    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         markers: [],
    //         formValue: ""
    //     }

    // }
}

export default "MainMap";


<div id="map"></div>
    <script>
      var map;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 8
        });
      }
    </script>