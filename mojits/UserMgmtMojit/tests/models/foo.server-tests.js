/*
 * Copyright (c) 2012 Yahoo! Inc. All rights reserved.
 */

YUI.add('ldapedit2ModelFoo-tests', function(Y, NAME) {
    
    var suite = new YUITest.TestSuite(NAME),
        model = null,
        A = YUITest.Assert;
    
    suite.add(new YUITest.TestCase({
        
        name: 'ldapedit2ModelFoo user tests',
        
        setUp: function() {
            model = Y.mojito.models.ldapedit2ModelFoo;
        },
        tearDown: function() {
            model = null;
        },
        
        'test mojit model': function() {
            var called = false,
                cfg = { color: 'red' };

            A.isNotNull(model);

            A.isFunction(model.init);
            model.init(cfg);
            A.areSame(cfg, model.config);

            A.isFunction(model.getData);
            model.getData(function(err, data) {
                called = true;
                A.isTrue(!err);
                A.isObject(data);
                A.areSame('data', data.some);
            });
            A.isTrue(called);
        }
        
    }));
    
    YUITest.TestRunner.add(suite);
    
}, '0.0.1', {requires: ['mojito-test', 'ldapedit2ModelFoo']});
