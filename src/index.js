import weatherInterface from './modules/openWeatherMapInterface';


async function test() {

   try{
        let weatherResponse = weatherInterface.getWeatherResponse('carrollton,ga,us');
    let oneCallResponse = weatherInterface.getOneCallResponse(33.7212,-85.1455);

    let responses = await Promise.all([weatherResponse, oneCallResponse]);
    console.log(responses[0]);
    console.log(responses[1]);
    console.log(weatherInterface.getWeatherIcon('03d'));
   }
   catch(error) {
       console.log('Error: ' + error);
   }

}

test();