'use strict';

var API_SERVER = 'http://localhost:8080/api/v1';

function GroupService($http) {

  function getAllGroups() {
    return $http
      .get(API_SERVER + '/groups', { cache: false })
      .then(function (data) {
        return data.data;
      })
      .catch(function () {
        return undefined;
      });
  }

  return {
    getAll     : getAllGroups,
  };
}

module.exports = GroupService;