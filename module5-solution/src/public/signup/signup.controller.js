(function () {

angular.module('public')
.controller('RegistrationController', RegistrationController);

RegistrationController.$inject = ['menuItems', 'UserService'];
function RegistrationController(menuItems, UserService) {
  var reg = this;
  reg.menuItems = menuItems;

  reg.submit = function () {
    reg.completed = true;
    var favoriteDishParsed = JSON.parse(reg.user.favoriteDish);
    reg.user.favoriteDish = favoriteDishParsed;
    UserService.saveUser(reg.user);
  };
}

})();