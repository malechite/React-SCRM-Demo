var SCRM = {
    stackCount: 0,

    init: function() {
        util.bind();
        util.adjustView();

        React.render(
            <SCRM.StackView />,
            document.getElementById('scrm-container')
        );
    },

    StackView: React.createClass({
        getInitialState: function () {
            return {
                stacks: [
                    {network:'facebook', type:'timeline', id:'1'}
                ]          
            };
        },

        componentDidMount: function () {
            SCRM.stackCount = this.state.stacks.length;
            util.adjustView();  
        },

        componentDidUpdate: function (prevProps, prevState) {
            SCRM.stackCount = this.state.stacks.length;
            util.adjustView();  
        },

        render: function() {
            var stacks = this.state.stacks.map(function (stack, index) {
                return (
                    <div className='stack'>
                        <div className='header'>
                            <div className='icon' />
                            <div className='title'>Default</div>
                        </div>
                        <div className='items'>
                            <div className='item'>
                                <div className='avatar' />
                                <div className='username'>User Name</div>
                                <div className='timestamp'>8d</div>
                                <p className='message'>
                                    Gastropub Williamsburg leggings narwhal, normcore vinyl wolf Brooklyn semiotics cronut Helvetica. 8-bit letterpress brunch PBR asymmetrical, High Life narwhal irony small batch chambray vegan.
                                </p>
                                <div className='attachment' />
                            </div>
                        </div>
                    </div>
                );
            }.bind(this));

            return (
                <div id='stacks'>
                    {stacks}
                </div>
            );
        }
    }),
};

$(document).ready(function() {
    SCRM.init();
});