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
                    {network:'facebook', type:'timeline', id:'1'},
                    {network:'twitter', type:'tweets', id:'2'},
                    {network:'gplus', type:'my posts', id:'3'},
                    {network:'instagram', type:'search', id:'4'}
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
                return <SCRM.Stack stack={stack} />
            }.bind(this));

            return (
                <div id='stacks'>
                    {stacks}
                </div>
            );
        }
    }),

    Stack: React.createClass({
        getInitialState: function () {
            return {
                  stack: this.props.stack,
                  items: []
            };
        },

        render: function() {
            var className = 'stack ' + this.state.stack.network;
            var stackType = this.state.stack.type || '';

            var items = this.state.items.map(function (item, index) {
                return <SCRM.Item item={item} />
            }.bind(this));

            return (
                <div className={className}>
                    <div className='header'>
                        <div className='icon' />
                        <div className='title'>{stackType}</div>
                    </div>
                    <div className='items'>
                        {items}
                    </div>
                </div>
            );
        }
    }),

    Item: React.createClass({
        render: function() {
            return (
                <div className='item'>
                    <div className='avatar' />
                    <div className='username'>User Name</div>
                    <div className='timestamp'>8d</div>
                    <p className='message'>
                        Gastropub Williamsburg leggings narwhal, normcore vinyl wolf Brooklyn semiotics cronut Helvetica. 8-bit letterpress brunch PBR asymmetrical, High Life narwhal irony small batch chambray vegan.
                    </p>
                    <div className='attachment' />
                </div>
            );
        }
    })
};

$(document).ready(function() {
    SCRM.init();
});