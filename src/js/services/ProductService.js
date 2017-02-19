'use strict';

// var API_SERVER = 'http://localhost:8080/api/v1';
import { getSiteHost } from '../libs/url';
var API_SERVER = getSiteHost();

var currentProduct;

function ProductService($http) {

  function all() {
    return $http
      .get(API_SERVER + '/products', { cache: false })
      .then(function (data) {
        return data.data;
      })
      .catch(function () {
        return undefined;
      });
  }

  function add(data) {

    return $http
      .post(API_SERVER + '/products', data)
      .then(function (data) {
        return data.data;
      })
      .catch(function () {
        return undefined;
      });
  }

  function update(id, data) {
    return $http
      .put(API_SERVER + '/products/' + id, data)
      .then(function (data) {
        return data.data;
      })
      .catch(function () {
        return undefined;
      });
  }

  function remove(id) {

    return $http
      .delete(API_SERVER + '/products/' + id)
      .then(function (data) {
        return data.data;
      })
      .catch(function () {
        return undefined;
      });
  }

  function current(){
    return currentProduct;
  }

  function select(product) {
    currentProduct = product;
  }

  return {
    all     : all,
    current : current,
    select     : select,
    add        : add,
    update     : update,
    remove     : remove,    
  };
}

module.exports = ProductService;