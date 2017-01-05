'use strict';

var API_SERVER = 'http://localhost:8080/api/v1';

var currentConsumer;

function ConsumerService($http) {

  function getAllConsumers() {
    return $http
      .get(API_SERVER + '/consumers', { cache: false })
      .then(function (data) {
        return data.data;
      })
      .catch(function () {
        return undefined;
      });
  }

  function getCurrentConsumer(){
    return currentConsumer;
  }

  function selectConsumer(consumer) {
    currentConsumer = consumer;
  }

  return {
    getAll     : getAllConsumers,
    getCurrent : getCurrentConsumer,
    select     : selectConsumer,    
  };
}

module.exports = ConsumerService;