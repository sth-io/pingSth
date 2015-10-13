angular.module('noteSth').directive('modal', function() {
   return {
       restrict: 'E',
       link: function(scope, element, attrs) {
           scope.getContentUrl = function() {
               if(attrs.type) {
                return '/views/modals/' + attrs.type + '.html';
                   } else {
                       return ;
                   }
           }
       },
       template: '<div class="note-modal" ng-include="getContentUrl()"></div>'
   }
});