angular.module("575-game").run(["$templateCache", function($templateCache) {$templateCache.put("app.template.html","<app-sidebar></app-sidebar>\n\n<div class=\"app\">\n  <app-header></app-header>\n\n  <div class=\"app-body\">\n    <div class=\"app-content\">\n      <div class=\"scrollable\">\n        <div class=\"scrollable-content section\">\n          <ng-outlet></ng-outlet>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n");
$templateCache.put("header/header.template.html","<div class=\"navbar navbar-app navbar-absolute-top\">\n    <div class=\"navbar-brand navbar-brand-center\">\n        5 * 7 * 5\n    </div>\n\n    <div class=\"btn-group pull-right\">\n        <div class=\"btn btn-navbar\" ui-toggle=\'uiSidebarRight\'>\n            <i class=\"fa fa-bars\"></i>\n        </div>\n    </div>\n</div>\n");
$templateCache.put("sidebar/sidebar.template.html","<div class=\"sidebar sidebar-right\">\n  <div class=\"scrollable\">\n    <div class=\"scrollable-content\">\n      <div class=\"list-group\">\n        <a class=\"list-group-item\" href=\"#/link1\">Link 1\n          <i class=\"fa fa-chevron-right pull-right\"></i></a>\n        <a class=\"list-group-item\" href=\"#/link2\">Link 2\n          <i class=\"fa fa-chevron-right pull-right\"></i></a>\n      </div>\n    </div>\n  </div>\n</div>\n");
$templateCache.put("component/signin/signin.template.html","<form role=\"form\" ng-submit=\"login()\" class=\"ng-pristine ng-valid ng-valid-email\">\n    <fieldset>\n        <legend>Start A Game</legend>\n        <div class=\"form-group has-success has-feedback\">\n            <label>Nickname</label>\n            <input type=\"email\" ng-model=\"email\" class=\"form-control\" placeholder=\"Enter Your Nickname\">\n        </div>\n\n        <div class=\"form-group\">\n          <div class=\"btn-group justified\" ui-state=\"isNew\" ui-default=\"false\">\n            <a href=\"\" class=\"btn btn-default\" ui-turn-on=\"isNew\" ui-class=\"{ active: isNew }\">\n              New Game\n            </a>\n            <a href=\"\" class=\"btn btn-default\" ui-turn-off=\"isNew\" ui-class=\"{ active: !isNew }\">\n              Join Existing\n            </a>\n          </div>\n        </div>\n\n        <div ui-show=\"!isNew\" class=\"form-group\">\n          <label>Room Code</label>\n          <input type=\"email\" ng-model=\"email\" class=\"form-control\" placeholder=\"Enter 4 Letter Code\">\n        </div>\n    </fieldset>\n\n    <hr>\n\n    <button ui-show=\"isNew\" class=\"btn btn-primary btn-block\">\n        <i class=\"fa fa-plus\"></i> New Game\n    </button>\n\n    <button ui-show=\"!isNew\" class=\"btn btn-primary btn-block\">\n        <i class=\"fa fa-sign-in\"></i> Join Game\n    </button>\n</form>\n");}]);