<template>
  <Header selected_item="home"></Header>

  <BuyPassForm v-if="overlayMarker != null" :garage="overlayMarker" @close="overlayMarker = null"></BuyPassForm>

  <GoogleAddressAutocomplete
      apiKey="AIzaSyB633unraFl_EQhKi6DAUvz-71uYQEr6VU"
      v-model="address"
      @callback="updatePlace"
      class="mb-3 mt-3 searchBar"
      placeholder="Seach a place"
  />

  <div class="w-100 d-flex justify-content-center" style="height: 50vh">
    <GoogleMap
        id="map"
        ref="map"
        mapTypeId="satellite"
        api-key="AIzaSyB633unraFl_EQhKi6DAUvz-71uYQEr6VU"
        :center="{ lat: 44.148464093357504, lng: 12.235835024328905 }"
        :zoom="15"
        @bounds_changed="boundsChanged"
        @zoom_changed="zoomChanged"
        @mouseup="updateMarkers">

      <MarkerCluster>
      <div v-for="(marker, index) in map_markers">
        <CustomMarker :options="{ position: { lat: marker.latitude, lng: marker.longitude }}" @click="garage_clicked(marker)" style="cursor: pointer">
          <div class="d-flex justify-content-center flex-column align-items-center">
            <img src="../assets/garage.png" style="height: 40px; width: 40px">
            <div style="background-color: #42b983; padding: 3px; font-size: 13px; border-radius: 10px">
              <strong>{{marker.occupiedPlaces}}/{{marker.slots}}</strong>
            </div>
          </div>
        </CustomMarker>

        <InfoWindow class="mb-1" v-if="marker.infoWindow" :options="{ position: { lat: marker.latitude, lng: marker.longitude }, pixelOffset: {width: 0, height: -25}}">
          <div style="width: 200px">
            <p style="font-size: 15px; color: black"><strong>{{marker.name}}</strong></p>
            <p style="font-size: 15px; color: darkgreen"> <strong>{{marker.slots-marker.occupiedPlaces}} slots available</strong> </p>
            <button class="btn btn-primary" @click="overlayMarker = marker"> buy a pass </button>
          </div>
        </InfoWindow>
      </div>
      </MarkerCluster>
    </GoogleMap>

    <div class="right_panel" id="list">
      <div v-for="marker in list_markers" @click="garage_clicked(marker)" class="w-100" style="cursor: pointer; padding: 10px 0px; box-shadow: 2px 5px 10px 0px #b0b0b0; margin-bottom: 10px; border-radius: 40px; background-color: #9de3f5">
        <strong><p>{{marker.name}}</p></strong>
        <div class="d-flex align-items-center justify-content-center">
          <p class="d-flex" style="margin-bottom: 0; margin-right: 10%">{{getDist(lat, long, marker.latitude, marker.longitude) }} Km</p>
          <p class="d-flex" style="margin-bottom: 0">{{marker.slots - marker.occupiedPlaces}} free slots</p>
        </div>
      </div>

      <p v-if="list_markers.length === 0" class="mt-5"><strong>No garage in this area</strong></p>
    </div>

  </div>

</template>

<script>
import { defineComponent } from "vue";
import Header from "@/components/Header.vue";
import { GoogleMap, Marker, InfoWindow, CustomMarker, MarkerCluster } from "vue3-google-map";
import GoogleAddressAutocomplete from 'vue3-google-address-autocomplete'
import axios from "axios";
import button from "bootstrap/js/src/button";
import PassCard from "@/components/PassCard.vue";
import BuyPassForm from "@/components/BuyPassForm.vue";
import io from "socket.io-client";

export default defineComponent({
  name: "ParkingLots",
  components: {
    BuyPassForm,
    Header,
    GoogleMap,
    Marker,
    CustomMarker,
    InfoWindow,
    MarkerCluster,
    GoogleAddressAutocomplete,
  },
  data(){
    return{
      lat: 0,
      long: 0,
      map_markers: [],
      list_markers: [],
      lastUpdateTime: 0,
      address: "",
      overlayMarker: null,
      socket: io('localhost:3000'),
    }
  },
  methods: {
    boundsChanged(){
      if((new Date() - this.lastUpdateTime) < 500){
        return
      }
      this.updateMarkers()
    },
    updateMarkers(){
      if(this.$refs.map.map.zoom < 12){
        return;
      }
      this.lastUpdateTime = new Date()

      this.lat = this.$refs.map.map.center.lat()
      this.long = this.$refs.map.map.center.lng()

      const params = {
        latitude_min: this.$refs.map.map.getBounds().ci.lo,
        latitude_max: this.$refs.map.map.getBounds().ci.hi,
        longitude_min: this.$refs.map.map.getBounds().Nh.lo,
        longitude_max:this.$refs.map.map.getBounds().Nh.hi,
      }
      axios.get('http://localhost:3000/garages/', {"params": params}).then((response) => {
        this.list_markers = response.data
        this.list_markers.sort((a, b) => this.getDist(this.lat, this.long, a.latitude, a.longitude) - this.getDist(this.lat, this.long, b.latitude, b.longitude))
        this.list_markers.forEach(m => this.updateListMarkersSlots(m._id))

        if(this.map_markers.length === response.data.length && this.getNewMarkers(this.map_markers, response.data).length === 0){
          return
        }

        const openInfoWindow = this.map_markers.find(e => e.infoWindow === true)
        this.map_markers = response.data
        this.map_markers.forEach(m => this.updateMapMarkersSlots(m._id))
        this.map_markers.forEach(e => e.infoWindow = !(openInfoWindow === undefined || e.name !== openInfoWindow.name))
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
    },
    updatePlace(place){
      this.$refs.map.map.zoom = 15
      this.$refs.map.map.setCenter({lat: place.geometry.location.lat(), lng: place.geometry.location.lng()})
    },
    zoomChanged(){
      if(this.$refs.map.map.zoom < 12){
        this.map_markers = []
        this.list_markers = []
      }
    },
    garage_clicked(marker){
      this.map_markers.forEach(e => e.infoWindow = (e.name === marker.name) )
      this.$refs.map.map.zoom = 17
      this.$refs.map.map.setCenter({lat: marker.latitude, lng: marker.longitude})
    },
    updateMapMarkersSlots(id){
      this.map_markers
        .filter(m => m._id.toString() === id)
        .forEach(m => {
          axios.get('http://localhost:3000/garages/realtime/' + id).then((newCount) => {
            m.occupiedPlaces = m.slots - newCount.data
          })
        })
    },
    updateListMarkersSlots(id){
      this.list_markers
          .filter(m => m._id.toString() === id)
          .forEach(m => {
            axios.get('http://localhost:3000/garages/realtime/' + id).then((newCount) => {
              m.occupiedPlaces = m.slots - newCount.data
            })
          })
    },
  },
  mounted() {
    this.socket.on('free-slots-update', (garage) => {
      this.updateMapMarkersSlots(garage.id)
      this.updateListMarkersSlots(garage.id)
    })
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

.right_panel{
  max-width: 350px;
  width: 40%;
  height: 100%;
  padding: 0px 10px;
  overflow-y: auto;
  margin-left: 2%;
}

.searchBar{
  height: 40px; border-radius: 20px; padding: 10px; text-align: center
}

.pac-item-query{
  font-size: 17px;
}

.pac-item{
  font-size: 12px;
  padding-top: 5px;
  padding-bottom: 5px;
}

.pac-container{
  margin-top: 3px;
  padding: 0px 10px;
  border-radius: 20px;
}

</style>