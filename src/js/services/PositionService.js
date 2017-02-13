'use strict';

var API_SERVER = 'http://localhost:8080/api/v1';

var currentPosition;

function PositionService($http) {

  function all() {
    return $http
      .get(API_SERVER + '/positions', { cache: false })
      .then(function (data) {
        return data.data;
      })
      .catch(function () {
        return undefined;
      });
  }

  function bySpecification(specificationId) {
    return $http
      .get(API_SERVER + '/specifications/'+ specificationId +'/positions', { cache: false })
      .then(function (data) {
        return data.data;
      })
      .catch(function () {
        return undefined;
      });
  }

  function add(data) {
    return $http
      .post(API_SERVER + '/positions', data)
      .then(function (data) {
        return data.data;
      })
      .catch(function () {
        return undefined;
      });
  }

  function update(id, data) {
    return $http
      .put(API_SERVER + '/positions/' + id, data)
      .then(function (data) {
        return data.data;
      })
      .catch(function () {
        return undefined;
      });
  }

  function remove(id) {
    return $http
      .delete(API_SERVER + '/positions/' + id)
      .then(function (data) {
        return data.data;
      })
      .catch(function () {
        return undefined;
      });
  }

  function current(){
    return currentPosition;
  }

  function select(position) {
    currentPosition = position;
  }

  return {
    all        : all,
    bySpecification : bySpecification,
    current    : current,
    select     : select,
    add        : add,
    update     : update,
    remove     : remove,    
  };
}

module.exports = PositionService;