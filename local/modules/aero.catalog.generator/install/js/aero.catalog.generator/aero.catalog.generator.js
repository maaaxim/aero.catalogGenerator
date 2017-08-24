(function(){

    "use strict";

    var catalogLoader = new function () {

        /**
         * Self
         *
         * @type {catalogLoader}
         */
        var that = this;

        /**
         *  Session identifyer
         *
         *  @type string
         */
        var session;

        /**
         *  Jquery objects
         */
        var $progresbar;
        var $form;
        var $text1;
        var $text2;

        /**
         * Initializes
         */
        this.init = function () {
            this.initFields();
            this.initHandlers();
        };

        /**
         * Update progressbar staus
         *
         * @param current
         */
        this.update = function (current) {
            var request = {
                "session" : that.session,
                "iterator" : current
            };
            var process = $.post("up.php", request, function(){}, "json");
            process.done(function (data) {
                current++;
                if(data.finished == true){
                    that.setSize(100);
                    that.setText(0, true);
                    return;
                }
                that.setSize(data.percent);
                that.setText(data.timeRemaining, false);
                that.update(current);
            });
        };

        /**
         * Handle submit etc
         */
        this.initHandlers = function () {
            $(document).ready(function () {
                $(document).on("submit", "#progress-starter", function () {
                    that.update(1);
                    return false;
                });
            });
        };

        /**
         * Initializes fields
         */
        this.initFields = function () {
            $(document).ready(function () {
                that.$progressbar = $(".pg-progress");
                if(typeof $progressbar != 'undefined'){
                    that.$form = $("#progress-starter");
                    that.$text1 = $("#pg-text-1");
                    that.$text2= $("#pg-text-2");
                    var data = that.$form.data();
                    that.session = data.session;
                }
            });
        };

        /**
         * Set progressbar size
         *
         * @param percent
         */
        this.setSize = function (percent) {
            that.$progressbar.css("width", Math.ceil(percent) + "%");
        };

        /**
         * Set progressbar message
         *
         * @param remaining
         * @param finish
         */
        this.setText = function (remaining, finish) {
            var text = remaining + " sec remaining";
            if(remaining == 0)
                text = "calculating...";
            if(finish === true)
                text = "completed!";
            that.$text1.html(text);
            that.$text2.html(text);
        };
    };

    catalogLoader.init()

})();