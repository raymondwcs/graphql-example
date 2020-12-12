const express = require('express');
const express_graphql = require('express-graphql').graphqlHTTP;
const { buildSchema } = require('graphql');
const fetch = require('node-fetch');

const APIKEY = '';  //signup at api.openweathermap.org and obtain an API Key
var options = {
    host: 'api.openweathermap.org',
    port: 80,
    path: '/data/2.5/weather?q=Tokyo,jp&units=metric',
    method: 'GET'
};

// some hardcoded data
const itineraryData = [
  {
    id: 1,
    departureDate: '2021-01-01',
    departurecCity: 'hongkong',
    arrivalDate: '2021-01-01',
    arrivalCity: 'tokyo'
  },
  {
    id: 2,
    departureDate: '2021-02-01',
    departureCity: 'hongkong',
    arrivalDate: '2021-02-01',
    arrivalCity: 'osaka'
  }
]


// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Query {
    itineraries: [Itinerary],
    itinerary(id: Int!): ItineraryWithWeather
  },

  type Itinerary {
    id: Int
    departureDate: String,
    departureCity: String,
    arrivalDate: String,
    arrivalCity: String
  },

  type ItineraryWithWeather {
    id: Int
    departureDate: String,
    departureCity: String,
    arrivalDate: String,
    arrivalCity: String,
    arrivalCityMinTemp: Float,
    arrivalCityMaxTemp: Float
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  itineraries: () => {
    return itineraryData
  },

  itinerary: (args) => {
    var itinerary = itineraryData.filter(itinerary => {
      return itinerary.id == args.id
    })[0];
    
    return getWeatherDetails(itinerary)
  },
};

const getWeatherDetails = async (itinerary) =>{
  options.path = "/data/2.5/weather?q=" + itinerary.arrivalCity.replace(/ /g,"+") + "&units=metric&APPID=" + APIKEY
  console.log(options.path)
  const res = await fetch(`http://${options.host}/${options.path}`);
  const data = await res.json();
  itinerary['arrivalCityMinTemp'] = data.main.temp_min
  itinerary['arrivalCityMaxTemp'] = data.main.temp_max
  console.log(itinerary)
  return itinerary  
}

// Create an express server and a GraphQL endpoint
const app = express();

app.use('/graphql', express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(4000, () => console.log('Express GraphQL Server Now Running On localhost:4000/graphql'));