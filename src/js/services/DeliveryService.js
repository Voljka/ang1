'use strict';

// import { WE_CONSUMER, WE_PROVIDER, WE_MEDIATOR, MEDIATOR_PROVIDER } from '../constants/operationtypes.js';

var API_SERVER = 'http://localhost:8080/api/v1';

var current, 
    operationType;

function Service($http) {

  function all() {
    return $http
      .get(API_SERVER + '/deliveries', { cache: false })
      .then(function (data) {
        return data.data;
      })
      .catch(function () {
        return undefined;
      });
  }

  function add(data) {
    return $http
      .post(API_SERVER + '/deliveries', data)
      .then(function (data) {
        return data.data;
      })
      .catch(function () {
        return undefined;
      });
  }

  function update(id, data) {
    return $http
      .put(API_SERVER + '/deliveries/' + id, data)
      .then(function (data) {
        return data.data;
      })
      .catch(function () {
        return undefined;
      });
  }

  function remove(id) {
    return $http
      .delete(API_SERVER + '/deliveries/' + id)
      .then(function (data) {
        return data.data;
      })
      .catch(function () {
        return undefined;
      });
  }

  function current(){
    return current;
  }

  function select(delivery) {
    current = delivery;
  }

  function setType(type) {
    operationType = type;
  }

  function currentType() {
    return operationType;
  }

  return {
    all        : all,
    current    : current,
    select     : select,
    add        : add,
    update     : update,
    remove     : remove,
    setType    : setType,
    currentType: currentType,    
  };
}

module.exports = Service;