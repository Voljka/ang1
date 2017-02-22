'use strict';

import { getSiteHost } from '../libs/url';

var API_SERVER = getSiteHost();

var current;

function Service($http) {

  function all() {
    return $http
      .get(API_SERVER + '/applications', { cache: false })
      .then(function (data) {
        return data.data;
      })
      .catch(function () {
        return undefined;
      });
  }

  function byPositionId(posId){
    return $http
      .get(API_SERVER + '/applications/position/'+posId , { cache: false })
      .then(function (data) {
        return data.data;
      })
      .catch(function () {
        return undefined;
      });
  }

  function add(data) {
    return $http
      .post(API_SERVER + '/applications', data)
      .then(function (data) {
        return data.data;
      })
      .catch(function () {
        return undefined;
      });
  }

  function update(id, data) {
    return $http
      .put(API_SERVER + '/applications/' + id, data)
      .then(function (data) {
        return data.data;
      })
      .catch(function () {
        return undefined;
      });
  }

  function remove(id) {
    return $http
      .delete(API_SERVER + '/applications/' + id)
      .then(function (data) {
        console.log('Application Successfully removed');
        return data.data;
      })
      .catch(function () {
        return undefined;
      });
  }

  function current(){
    return current;
  }

  function select(letter) {
    current = letter;
  }

  return {
    all        : all,
    current    : current,
    select     : select,
    add        : add,
    update     : update,
    remove     : remove,
    byPositionId : byPositionId,
  };
}

module.exports = Service;