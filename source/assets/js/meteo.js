//        const api = `https://api.darksky.net/forecast/fb8dd781a66caac5b412b2fbddc9ff1b/${lat},${long}`
window.addEventListener('load', () => {
  /**
   * @class Meteo
   * @constructor
   */
  class Meteo{
    /**
     * init the weather plugin
     * @constructor
     * @param {string} apiKey - apiKey
     * @param {string} source - link to the source
     */
    constructor(apiKey,source) {
      this.apiKey = apiKey
      this.source = source
      this.activeGeoloc()
    }

    /**
     * @name activeGeoloc
     * @method
     * @returns all data and change information on weather card
     *
     */
    activeGeoloc () {
      let long;
      let lat;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
          // get longitude
          long = pos.coords.longitude;
          // get latitude
          lat = pos.coords.latitude;
          this.fetch(long,lat)
        })


      }
    }

    /**
     * @memberOf Meteo
     * @method
     * @param {numver} long - Position longitude
     * @param {numver} lat - Position latitude
     * @returns {Object} api - API from api.darksky.net
     * @see {@link https://api.darksky.net|darksky}
     */
    fetch (long,lat) {
      const proxy = 'https://cors-anywhere.herokuapp.com/'
      const api = `${proxy}${this.source}/${this.apiKey}/36.7525,3.041970?units=si&lang=fr`
      fetch(api)
        .then(data => {
          return data.json();
        })
        .then(data => {
          const {temperature, summary, time, icon, humidity} = data.currently
          // init functions
          this.addTemp(temperature)
          this.addLocation(data.timezone)
          this.addDesc(summary)
          this.setIcons(icon, '.icon')
        })
    }

    /**
     *
     * @param loc
     */
    addLocation(loc){
      const location = document.querySelector('.weather-location')
      location.innerText= loc
    }

    /**
     *
     * @param temp
     */
    addTemp(temp){
      const tmp = document.querySelector('.weather-temp')
      tmp.innerText= temp
    }

    /**
     *
     * @param desc
     */
    addDesc(desc){
      const description = document.querySelector('.weather-description')
      description.innerText= desc
    }

    /**
     *
     * @param tmp
     * @returns {number}
     */
    convTempToC(tmp) {

      return (tmp - 32) * (5/9)
    }

    /**
     *
     * @param tmp
     * @returns {number}
     */
    convTempToF(tmp) {
      return (tmp * (9/5)) + 32
    }

    /**
     *
     * @param icon
     * @param dataIcon
     * @returns {*}
     */
    setIcons(icon, dataIcon) {
      const skycons = new Skycons({color:"gray"})
      const el = document.querySelector(dataIcon)
      let currTcon = icon.replace(/-/g, "_")
      currTcon = currTcon.toUpperCase()
      skycons.play()
      return skycons.set(el, Skycons[currTcon])

    }

  }
  new Meteo('fb8dd781a66caac5b412b2fbddc9ff1b', 'https://api.darksky.net/forecast')
})
