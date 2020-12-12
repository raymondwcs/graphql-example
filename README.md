# GraphQL Example
This example demonstrates how to use GraphQL to serve information consoldiated from different sources.

## Instructions
1. Replace the value of `APIKEY` with a valid API key from [OpenWeatherMap.org](https://home.openweathermap.org/api_keys)
1. Submit the following query.
```
{itinerary(id:1) {
  id,arrivalCity,arrivalCityMinTemp,arrivalCityMaxTemp
}}
```
