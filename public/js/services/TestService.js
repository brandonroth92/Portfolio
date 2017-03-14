// angular.module('TestService', []).factory('Test',['$http', function($http) {
//
//  return {
//    
//    // call to get all nerds
//    get : function() {
//      return $http.get('/api/nerds');
//    },
//    
//    // won't work until more api routes are defined on node side
//    // call to POST and create a nerd
//    create : function(nerdData) {
//      return $http.post('/api/nerds', nerdData);
//    },
//    
//    // call to DELETE a nerd
//    delete : function(id) {
//      return $http.delete('/api/nerds/' + id);
//    }
//  }
//  
// }]);