import PluginBase from 'chrome-extension://lnnmjmalakahagblkkcnjkoaihlfglon/dist/modules/plugin-base.js';import ExtensionUtil from 'chrome-extension://lnnmjmalakahagblkkcnjkoaihlfglon/dist/modules/extension-util.js';var Weather_backend_resolved = {...PluginBase,niceName:"Weather",languages:{},match:/.*accuweather\.com/,version:"2.9.0",commands:[{name:"Check the Weather",description:"Check the weather for a given city.",global:!0,match:["weather for *","forecast for *","weather in *"],pageFn:async(transcript,q)=>{const resp=await(await window.fetch(`https://api.accuweather.com/locations/v1/cities/autocomplete?q=${q}&apikey=d41dfd5e8a1748d0970cba6637647d96&language=en-us&get_param=value`)).json();let cityId=resp[0].Key,countryCode=resp[0].Country.ID.toLowerCase(),cityName=resp[0].LocalizedName.replace(" ","-");window.location.href=`https://www.accuweather.com/en/${countryCode}/${cityName}/${cityId}/weather-forecast/${cityId}`;}}]};

export default Weather_backend_resolved;LS-SPLITallPlugins.Weather = (() => { var Weather_0_matching_cs_resolved = {...PluginBase,commands:{"Check the Weather":{pageFn:async(transcript,q)=>{const resp=await(await window.fetch(`https://api.accuweather.com/locations/v1/cities/autocomplete?q=${q}&apikey=d41dfd5e8a1748d0970cba6637647d96&language=en-us&get_param=value`)).json();let cityId=resp[0].Key,countryCode=resp[0].Country.ID.toLowerCase(),cityName=resp[0].LocalizedName.replace(" ","-");window.location.href=`https://www.accuweather.com/en/${countryCode}/${cityName}/${cityId}/weather-forecast/${cityId}`;}}}};

return Weather_0_matching_cs_resolved;
 })()LS-SPLITallPlugins.Weather = (() => { var Weather_0_nonmatching_cs_resolved = {...PluginBase,commands:{"Check the Weather":{pageFn:async(transcript,q)=>{const resp=await(await window.fetch(`https://api.accuweather.com/locations/v1/cities/autocomplete?q=${q}&apikey=d41dfd5e8a1748d0970cba6637647d96&language=en-us&get_param=value`)).json();let cityId=resp[0].Key,countryCode=resp[0].Country.ID.toLowerCase(),cityName=resp[0].LocalizedName.replace(" ","-");window.location.href=`https://www.accuweather.com/en/${countryCode}/${cityName}/${cityId}/weather-forecast/${cityId}`;}}}};

return Weather_0_nonmatching_cs_resolved;
 })()