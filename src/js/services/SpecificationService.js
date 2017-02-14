'use strict';

var API_SERVER = 'http://localhost:8080/api/v1';

var currentSpecification;

function SpecificationService($http) {

  function all() {
    return $http
      .get(API_SERVER + '/specifications', { cache: false })
      .then(function (data) {
        return data.data;
      })
      .catch(function () {
        return undefined;
      });
  }

  function byContract(contractId) {
    return $http
      .get(API_SERVER + '/contracts/'+contractId+'/specifications', { cache: false })
      .then(function (data) {
        return data.data;
      })
      .catch(function () {
        return undefined;
      });
  }

  function add(data) {
    return $http
      .post(API_SERVER + '/specifications', data)
      .then(function (data) {
        return data.data;
      })
      .catch(function () {
        return undefined;
      });
  }

  function update(id, data) {
    return $http
      .put(API_SERVER + '/specifications/' + id, data)
      .then(function (data) {
        return data.data;
      })
      .catch(function () {
        return undefined;
      });
  }

  function remove(id) {
    return $http
      .delete(API_SERVER + '/specifications/' + id)
      .then(function (data) {
        return data.data;
      })
      .catch(function () {
        return undefined;
      });
  }

  function updateData(specificationId, data) {
    // return $http
      // .put(API_SERVER + '/specifications/' + specificationId+'/updatepositions', data)
      // .then(function (data) {
      //   return data.data;
      // })
      // .catch(function () {
      //   return undefined;
      // });
  }

  function current(){
    return currentSpecification;
  }

  function select(specification) {
    currentSpecification = specification;
  }

  return {
    all        : all,
    byContract : byContract,
    current    : current,
    select     : select,
    add        : add,
    update     : update,
    remove     : remove,    
    updateData : updateData,
  };
}

module.exports = SpecificationService;