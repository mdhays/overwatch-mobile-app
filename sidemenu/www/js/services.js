angular.module('starter.services', [])

.factory('PlayersFactory', function($http, $q) {
  let service = {};
  let baseUrl = 'https://api.lootbox.eu/';
  let _platform = '';
  let _region = '';
  let _battleTag = '';


  let makeUrl = function() {
    _battleTag = _battleTag.split('#').join('-');
    _finalUrl = baseUrl + _platform + '/' + _region + '/' + _battleTag;

    return _finalUrl;
  }

  service.setBattleTag = function(battleTag) {
    _battleTag = battleTag;
  }

  service.getBattleTag = function() {
    return _battleTag;
  }

  service.getProfileFromApi = function() {
    makeUrl();
    let deferred = $q.defer();
    $http({
      method: 'JSONP',
      url: _finalUrl
    }).success(function(data) {
      deferred.resolve(data);
    }).error(function() {
      deferred.reject('There was an error');
    })
    return deferred.promise;
  }
  return service;
});












