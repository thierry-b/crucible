"use strict";

var m      = require("mithril"),
    assign = require("lodash.assign"),

    id    = require("./lib/id"),
    hide  = require("./lib/hide"),
    types = require("./lib/types.css"),
    
    css   = require("./checkbox.css");

module.exports = {
    controller : function(options) {
        var ctrl = this;

        ctrl.id      = id(options);
        ctrl.checked = options.data === true;

        ctrl.onclick = function(options, checked) {
            options.update(options.path, checked);
            
            ctrl.checked = checked;
        };
    },

    view : function(ctrl, options) {
        var details = options.details,
            name    = details.name,
            hidden  = hide(options);
            
        if(hidden) {
            return hidden;
        }

        if(details.required) {
            name += "*";
        }

        return m("div", { class : options.class },
            m("label", {
                    for   : ctrl.id,
                    class : types[details.required ? "required" : "label"]
                },
                m("input", assign({
                        // attrs
                        id       : ctrl.id,
                        type     : "checkbox",
                        class    : css.checkbox,
                        checked  : ctrl.checked,
                        required : details.required ? "required" : null,

                        // events
                        onclick : m.withAttr("checked", ctrl.onclick.bind(ctrl, options))
                    },
                    details.attrs || {}
                ), options.data || ""),
                name
            )
        );
    }
};