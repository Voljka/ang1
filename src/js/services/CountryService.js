'use strict';

// var API_SERVER = 'http://localhost:8080/api/v1';
import { getSiteHost } from '../libs/url';
var API_SERVER = getSiteHost();

function Service($http) {

  function all() {
    return $http
      .get(API_SERVER + '/countries', { cache: false })
      .then(function (data) {
        return data.data;
      })
      .catch(function () {
        return undefined;
      });
  }

  return {
    all        : all,
  };
}

module.exports = Service;