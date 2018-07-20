import axios from "axios";

export default {
    getGoogleMaps: function () {
        return axios.get("/api/googleMaps");
    }
};
