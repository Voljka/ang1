'use strict';

var API_SERVER = 'http://localhost:8080/api/v1';

function Service($http) {

  function all() {
    return $http
      .get(API_SERVER + '/paymentevents', { cache: false })
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