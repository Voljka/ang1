'use strict';

var API_SERVER = 'http://localhost:8080/api/v1';

var current;

function Service($http) {

  function all() {
    return $http
      .get(API_SERVER + '/deliveryletters', { cache: false })
      .then(function (data) {
        return data.data;
      })
      .catch(function () {
        return undefined;
      });
  }

  function add(data) {
    return $http
      .post(API_SERVER + '/deliveryletters', data)
      .then(function (data) {
        return data.data;
      })
      .catch(function () {
        return undefined;
      });
  }

  function update(id, data) {
    return $http
      .put(API_SERVER + '/deliveryletters/' + id, data)
      .then(function (data) {
        return data.data;
      })
      .catch(function () {
        return undefined;
      });
  }

  function remove(id) {
    return $http
      .delete(API_SERVER + '/deliveryletters/' + id)
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
  };
}

module.exports = Service;