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

  function addConsumer(data) {
    // data = {
    //   group: "6734a170-d283-11e6-9cca-3f6676d6a14c",
    //   name: "Енакиевский металлургический завод",
    //   country: "461990b0-d286-11e6-b131-e3fb6e4b097e"
    // };

    return $http
      .post(API_SERVER + '/consumers', data)
      .then(function (data) {
        return data.data;
      })
      .catch(function () {
        return undefined;
      });
  }

  function updateConsumer(id, data) {
    // data = {
    //   group: "6734a170-d283-11e6-9cca-3f6676d6a14c",
    //   name: "Енакиевский металлургический завод",
    //   country: "461990b0-d286-11e6-b131-e3fb6e4b097e"
    // };

    // id = "b5d5ae10-d390-11e6-804c-05a125667c41"; 
    return $http
      .put(API_SERVER + '/consumers/' + id, data)
      .then(function (data) {
        return data.data;
      })
      .catch(function () {
        return undefined;
      });
  }

  function deleteConsumer(id) {
    // id = "b5d5ae10-d390-11e6-804c-05a125667c41";

    return $http
      .delete(API_SERVER + '/consumers/' + id)
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
    add        : addConsumer,
    update     : updateConsumer,
    delete     : deleteConsumer,    
  };
}

module.exports = ConsumerService;