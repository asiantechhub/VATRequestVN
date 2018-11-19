define(
    [
        'jquery',
        'ko',
        'underscore',
        'uiComponent',
        'Wiki_VAT/js/model/vat-data',
        'Wiki_VAT/js/model/vat-information',
        'jquery/ui',
        'jquery/jquery-ui-timepicker-addon'
    ],
    function ($, ko, _, Component, vatData, vatInformation) {
        'use strict';

        var cacheKeyvatNumber = 'vatNumber',
            cacheKeyvatCompany = 'vatCompany',
            cacheKeyvatAddress = 'vatAddress',
            cacheKeyvatSave = 'vatSave',
            cacheKeyIsRequireVat = 'vatRequire';

        function prepareSubscribeValue(object, cacheKey) {
            object(vatData.getData(cacheKey));
            object.subscribe(function (newValue) {
                vatData.setData(cacheKey, newValue);
            });
        }

        return Component.extend({
            defaults: {
                template: 'Wiki_VAT/container/vat-information'
            },
            vatNumber: vatInformation().vatNumber,
            vatCompany: vatInformation().vatCompany,
            vatAddress: vatInformation().vatAddress,
            vatSave: vatInformation().vatSave,

            initialize: function () {
                this._super();

                var self = this;

                prepareSubscribeValue(this.vatNumber, cacheKeyvatNumber);
                prepareSubscribeValue(this.vatCompany, cacheKeyvatCompany);
                prepareSubscribeValue(this.vatAddress, cacheKeyvatAddress);
                prepareSubscribeValue(this.vatSave, cacheKeyvatSave);

                return this;
            },
            initObservable: function () {
                this._super()
                    .observe({
                        isRequireVatVisible: vatData.getData(cacheKeyIsRequireVat)
                    });

                this.isRequireVatVisible.subscribe(function (newValue) {
                    vatData.setData(cacheKeyIsRequireVat, newValue);
                });

                return this;
            },
        });
    }
);
