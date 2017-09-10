'use strict';

// var API_SERVER = 'http://localhost:8080/api/v1';
import { getSiteHost } from '../libs/url';
var API_SERVER = getSiteHost();

var current,
    operationType;

function Service($http) {

  function all() {
    return $http
      .get(API_SERVER + '/billpayments/optype/'+operationType, { cache: false })
      .then(function (data) {
        return data.data;
      })
      .catch(function () {
        return undefined;
      });
  }

  function byBillPosition(posId) {

    return $http
      .get(API_SERVER + '/billpayments/bybillposition/'+ posId + '/optype/'+operationType, { cache: false })
      .then(function (data) {
        return data.data;
      })
      .catch(function () {
        return undefined;
      });
  }

  function add(data) {
    return $http
      .post(API_SERVER + '/billpayments', data)
      .then(function (data) {
        return data.data;
      })
      .catch(function () {
        return undefined;
      });
  }

  function update(id, data) {
    return $http
      .put(API_SERVER + '/billpayments/' + id, data)
      .then(function (data) {
        return data.data;
      })
      .catch(function () {
        return undefined;
      });
  }

  function remove(id) {
    return $http
      .delete(API_SERVER + '/billpayments/' + id)
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

  return {
    all        : all,
    current    : current,
    select     : select,
    add        : add,
    update     : update,
    remove     : remove,
    setType    : setType,
    currentType: currentType,    
    byBillPosition   : byBillPosition,
  };
}

module.exports = Service;