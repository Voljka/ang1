'use strict';

var API_SERVER = 'http://localhost:8080/api/v1';

var currentContract;

function ContractService($http) {

  function all() {
    return $http
      .get(API_SERVER + '/contracts', { cache: false })
      .then(function (data) {
        return data.data;
      })
      .catch(function () {
        return undefined;
      });
  }

  function byConsumer(consumerId) {
    return $http
      .get(API_SERVER + '/contracts/byconsumer/'+consumerId, { cache: false })
      .then(function (data) {
        return data.data;
      })
      .catch(function () {
        return undefined;
      });
  }

  function add(data) {
    return $http
      .post(API_SERVER + '/contracts', data)
      .then(function (data) {
        return data.data;
      })
      .catch(function () {
        return undefined;
      });
  }

  function update(id, data) {
    return $http
      .put(API_SERVER + '/contracts/' + id, data)
      .then(function (data) {
        return data.data;
      })
      .catch(function () {
        return undefined;
      });
  }

  function remove(id) {
    return $http
      .delete(API_SERVER + '/contracts/' + id)
      .then(function (data) {
        return data.data;
      })
      .catch(function () {
        return undefined;
      });
  }

  function current(){
    return currentContract;
  }

  function select(contract) {
    currentContract = contract;
  }

  return {
    all        : all,
    byConsumer : byConsumer,
    current    : current,
    select     : select,
    add        : add,
    update     : update,
    remove     : remove,    
  };
}

module.exports = ContractService;