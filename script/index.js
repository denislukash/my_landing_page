"use strict";

                       /*HEADER*/

$(window).load = function () {
    let $name = $(".name").find("h1");
    let $position = $(".name").find("p");

    let D = $.Deferred();

    D.resolve();

    D.then(function () {

        return $($name).animate({
            "left" : "25%"
        }, 4000, 'easeOutBack').promise()

    }).then(function () {

        $.fn.animate_Text = function() {
            var string = this.text();

            return this.each(function(){
                var $this = $(this);
                $this.html(string.replace(/./g, '<span class="new">$&</span>'));
                $this.find('span.new').each(function(i, el){
                    setTimeout(function(){ $(el).addClass('p_opacity'); }, 70 * i);
                });
            });
        };
        $($position).show();
        $($position).animate_Text();

    });
};




