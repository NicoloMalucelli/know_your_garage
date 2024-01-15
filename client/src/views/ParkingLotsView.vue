<template>
  <Header selected_item="find_a_parking_lot"></Header>
  <h1 class="mt-3">Parking lots</h1>
  <div class="w-100 d-flex justify-content-center" style="height: 50vh">

    <GoogleMap
        id="map"
        ref="map"
        api-key=""
        :center="{ lat: 44.148464093357504, lng: 12.235835024328905 }"
        :zoom="15"
        @bounds_changed="updateMarkersWithCheck"
        @mouseup="updateMarkers">
      <MarkerCluster>
      <div v-for="marker in map_markers">
        <CustomMarker :options="{ position: { lat: marker.latitude, lng: marker.longitude }}">
          <div class="d-flex justify-content-center flex-column align-items-center">
            <img src="../assets/parking.png" style="height: 40px; width: 40px">
            <div style="background-color: #42b983; padding: 3px; font-size: 13px; border-radius: 10px">
              <strong>200/{{marker.slots}}</strong>
            </div>
          </div>
        </CustomMarker>
      </div>
      </MarkerCluster>
    </GoogleMap>

    <div id="list">
      <div v-for="marker in list_markers" class="w-100" style="padding: 10px 0px; box-shadow: 2px 5px 10px 0px #b0b0b0; margin-bottom: 10px; border-radius: 40px; background-color: #9de3f5">
        <strong><p>{{marker.name}}</p></strong>
        <div class="d-flex align-items-center justify-content-center">
          <p class="d-flex" style="margin-bottom: 0; margin-right: 10%">{{getDist(lat, long, marker.latitude, marker.longitude) }} Km</p>
          <p class="d-flex" style="margin-bottom: 0">{{marker.slots - 200}} free slots</p>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { defineComponent } from "vue";
import Header from "@/components/Header.vue";
import { GoogleMap, Marker, InfoWindow, CustomMarker, MarkerCluster } from "vue3-google-map";

import CarCard from "@/components/CarCard.vue";
import CarCreationCard from "@/components/CarCreationCard.vue";
import axios from "axios";

export default defineComponent({
  name: "ParkingLots",
  components: {
    Header,
    GoogleMap,
    Marker,
    CustomMarker,
    InfoWindow,
    MarkerCluster
  },
  data(){
    return{
      lat: 0,
      long: 0,
      map_markers: [],
      list_markers: [],
      lastUpdateTime: 0,
    }
  },
  methods: {
    updateMarkersWithCheck(){
      if((new Date() - this.lastUpdateTime) < 500){
        return
      }
      this.updateMarkers()
    },
    updateMarkers(){
      this.lastUpdateTime = new Date()

      this.lat = this.$refs.map.map.center.lat()
      this.long = this.$refs.map.map.center.lng()

      const params = {
        latitude_min: this.$refs.map.map.getBounds().ci.lo,
        latitude_max: this.$refs.map.map.getBounds().ci.hi,
        longitude_min: this.$refs.map.map.getBounds().Nh.lo,
        longitude_max:this.$refs.map.map.getBounds().Nh.hi,
      }
      axios.get('http://localhost:3000/parkings/', {"params": params}).then((response) => {
        this.list_markers = response.data
        this.list_markers.sort((a, b) => this.getDist(this.lat, this.long, a.latitude, a.longitude) - this.getDist(this.lat, this.long, b.latitude, b.longitude))

        if(this.map_markers.length === response.data.length && this.getNewMarkers(this.map_markers, response.data).length === 0){
          return
        }

        this.map_markers = response.data
      })
    },
    getNewMarkers(oldMarkers, newMarkers){
      const old = oldMarkers.map(e => e.name)
      return newMarkers.map(e => e.name).filter(e => !old.includes(e))
    },
    getDist(lat1, lon1, lat2, lon2) {
      let R = 6371; // Radius of the earth in km
      let dLat = this.deg2rad(lat2-lat1);  // deg2rad below
      let dLon = this.deg2rad(lon2-lon1);
      let a =
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
          Math.sin(dLon/2) * Math.sin(dLon/2)
      ;
      let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      let d = R * c; // Distance in km
      return d.toFixed(2);
    },
    deg2rad(deg) {
      return deg * (Math.PI/180)
    }
  },
  mounted() {
    /*navigator.geolocation.getCurrentPosition((success) => {
      this.longitude = success.coords.longitude
      this.latitude = success.coords.latitude
    })*/

    //this.updateMarkers()
  },
});
</script>

<style>

#map{
  width: 50%;
  height: 500px;
  max-height: 100%;

  border: 1px solid black;
}

#list{
  max-width: 350px;
  width: 40%;
  height: 100%;
  padding: 0px 10px;
  overflow-y: auto;
  margin-left: 2%;
}

</style>