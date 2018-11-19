define(
    [
        'ko',
        'uiComponent'
    ],
    function (ko, Component) {
        'use strict';

        return Component.extend({
            vatNumber: ko.observable(),
            vatCompany: ko.observable(),
            vatAddress: ko.observable(),
            vatSave: ko.observable()
        });
    }
);
