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

        handleClick: function() {
            var demoItem = {
                username: 'User Name',
                timestamp: '8d',
                message: 'Kogi lo-fi selvage 90\'s flexitarian. Lo-fi lumbersexual mixtape pop-up. Food truck kitsch semiotics Intelligentsia.',
                attachment: false
            }
            this.addItem(demoItem)
        },

        addItem: function(item) {
            var items = this.state.items.slice();
            if(item) {
                items.push(item);

                this.setState({
                    items:items
                });
            }
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
                        <a onClick={this.handleClick} className='add-item'>Add Item</a>
                        {items}
                    </div>
                </div>
            );
        }
    }),

    Item: React.createClass({
        getInitialState: function () {
            return {
                  item: this.props.item
            };
        },

        render: function() {
            return (
                <div className='item'>
                    <div className='avatar' />
                    <div className='username'>{this.state.item.username}</div>
                    <div className='timestamp'>{this.state.item.timestamp}</div>
                    <p className='message'>{this.state.item.message}</p>
                    {this.state.item.attachment ? <div className='attachment'>{this.state.item.attachment}</div> : false}
                </div>
            );
        }
    })
};

$(document).ready(function() {
    SCRM.init();
});