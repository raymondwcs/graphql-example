# GraphQL Example
This example demonstrates how to use [GraphQL](https://graphql.org) to serve *consolidated* information from multiple sources.

## Instructions
1. Replace the value of `APIKEY` with a valid API key from [OpenWeatherMap.org](https://home.openweathermap.org/api_keys)
1. Submit the following query to see data combined with OpenWeatherMap API return data.
```
{itinerary(id:1) {
  id,arrivalCity,arrivalCityMinTemp,arrivalCityMaxTemp
}}
```
