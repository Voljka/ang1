'use strict';

var API_SERVER = 'http://localhost:8080/api/v1';

var current,
    operationType,
    hierarchy;

// import { CONSUMER, CONTRACT, SPECIFICATION, POSITION } from '../constants/hierarchy.js';

function Service($http) {

  function all() {
    return $http
      .get(API_SERVER + '/payments', { cache: false })
      .then(function (data) {
        return data.data;
      })
      .catch(function () {
        return undefined;
      });
  }

  function byParent(elementId) {

    return $http
      .get(API_SERVER + '/payments/hierarchy/'+ hierarchy +'/id/'+elementId, { cache: false })
      .then(function (data) {
        return data.data;
      })
      .catch(function () {
        return undefined;
      });
  }

  function add(data) {
    return $http
      .post(API_SERVER + '/payments', data)
      .then(function (data) {
        return data.data;
      })
      .catch(function () {
        return undefined;
      });
  }

  function update(id, data) {
    return $http
      .put(API_SERVER + '/payments/' + id, data)
      .then(function (data) {
        return data.data;
      })
      .catch(function () {
        return undefined;
      });
  }

  function remove(id) {
    return $http
      .delete(API_SERVER + '/payments/' + id)
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

  function select(payment) {
    current = payment;
  }

  function setType(type) {
    operationType = type;
  }

  function currentType() {
    return operationType;
  }

  function setHierarchy(type) {
    hierarchy = type;
  }

  function currentHierarchy() {
    return hierarchy;
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
    setHierarchy    : setHierarchy,
    currentHierarchy: currentHierarchy,
    byParent   : byParent,
  };
}

module.exports = Service;