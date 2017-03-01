'use strict';

// var API_SERVER = 'http://localhost:8080/api/v1';
import { getSiteHost } from '../libs/url';
var API_SERVER = getSiteHost();

var current;

function Service($http) {

  function all() {
    return $http
      .get(API_SERVER + '/bills', { cache: false })
      .then(function (data) {
        return data.data;
      })
      .catch(function () {
        return undefined;
      });
  }

  function add(data) {
    return $http
      .post(API_SERVER + '/bills', data)
      .then(function (data) {
        return data.data;
      })
      .catch(function () {
        return undefined;
      });
  }

  function update(id, data) {
    return $http
      .put(API_SERVER + '/bills/' + id, data)
      .then(function (data) {
        return data.data;
      })
      .catch(function () {
        return undefined;
      });
  }

  function remove(id) {
    return $http
      .delete(API_SERVER + '/bills/' + id)
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

  function select(bill) {
    current = bill;
  }

  function byProvider(providerId) {
    return $http
      .get(API_SERVER + '/providers/' + providerId + '/bills')
      .then(function (data) {
        return data.data;
      })
      .catch(function () {
        return undefined;
      });
  }

  function updateData(data) {
    return $http
      .put(API_SERVER + '/bills/' + current._id +'/updatepositions', data)
      .then(function (data) {
        return data.data;
      })
      .catch(function () {
        return undefined;
      });
  }  

  return {
    all        : all,
    current    : current,
    select     : select,
    add        : add,
    update     : update,
    remove     : remove,
    byProvider : byProvider,
    updateData : updateData,
  };
}

module.exports = Service;