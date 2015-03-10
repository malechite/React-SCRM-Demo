var util = {
    bind: function() {
        $(window).on('resize', function() { this.adjustView(); }.bind(this));
    },

    adjustView: function() {
        var width = $(window).width();
        var height = $(window).height();
        var $container = $('#scrm-container');
        var $stacks = $('#stacks .stack');
        var $items = $('#stacks .stack .items');
        var stackWidth = 340;
        var stackCount = SCRM.stackCount || 0;

        $container.css({
            height:height,
            width: (stackCount * stackWidth)
        });

        $stacks.height(height);
        $items.height(height-60);
    }
};