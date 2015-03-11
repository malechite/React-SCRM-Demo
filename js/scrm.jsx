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

        componentDidMount: function () {
            var delay = (Math.floor(Math.random() * 10) + 1) * 400;

            this.addItem(); //lets add 1 item by default
            var timer = window.setInterval(function() {
                this.addItem(); //lets add an item at a random delay
            }.bind(this),delay);  
        },

        getItem: function() {
            var names = [
                "Dean Quinn",
                "Delmar Bender",
                "Berta Nolan",
                "Cody Madden",
                "Rufus Delgado",
                "Kirsten Summer Morales",
                "Jayne Nancy Mcdowell",
                "Flora Benson",
                "Rosetta Bates",
                "Gina Stanley",
                "Haley Malone",
                "Anne Harrison",
                "Hattie Winters",
                "Elvia Kari Peck",
                "Consuelo Lester",
                "Nettie Mercer",
                "Stella Velazquez",
                "Lazaro Randall",
                "Geneva Hanson",
                "Darlene Stevenson",
                "Chuck Lott Ashley",
                "Blair Mcclain",
                "Chang Frank",
                "Harley Vang",
                "Amie Reynolds",
                "Thad Brock",
            ];
            var messages = [
                "Photo booth mlkshk chambray fixie lomo, fashion axe mustache Helvetica flannel. Hashtag photo booth craft beer single-origin coffee listicle.",
                "Pickled lomo meditation, tattooed whatever DIY master cleanse sriracha swag Thundercats brunch banjo fixie cardigan deep v.",
                "Messenger bag plaid Portland, try-hard cornhole readymade kogi ethical fanny pack. Kitsch brunch ugh, squid scenester Echo Park salvia.",
                "Brunch try-hard small batch, pour-over kitsch Shoreditch beard cardigan direct trade readymade heirloom vinyl cred.",
                "Dreamcatcher cray literally narwhal letterpress cronut normcore, Shoreditch street art Austin raw denim brunch",
                "Four dollar toast listicle Vice mixtape tote bag. Scenester PBR aesthetic cliche 3 wolf moon whatever roof party, Brooklyn twee authentic Pitchfork leggings squid pug flexitarian.",
                "8-bit asymmetrical fashion axe, Blue Bottle synth Pinterest before they sold out farm-to-table. Wes Anderson tofu Banksy Thundercats kogi.",
                "Freegan Schlitz food truck, art party PBR&B organic beard mixtape 3 wolf moon scenester synth artisan. Bitters paleo taxidermy Blue Bottle, sartorial flannel lumbersexual.",
                "Cronut stumptown typewriter, raw denim +1 ennui viral Pitchfork mumblecore aesthetic occupy cray lomo",
                "Letterpress viral sustainable, listicle jean shorts cronut Carles Helvetica health goth organic 90's cred mumblecore Neutra.",
                "Pop-up Vice YOLO 8-bit, Carles Brooklyn forage banh mi High Life farm-to-table crucifix mustache. Literally wolf Pinterest mlkshk Carles Austin.",
                "Quinoa bespoke before they sold out, single-origin coffee pork belly Carles paleo post-ironic.",
                "Vinyl hashtag tousled, roof party viral skateboard single-origin coffee biodiesel cold-pressed Wes Anderson 90's umami fap.",
                "Pork belly organic small batch, synth photo booth authentic kale chips letterpress iPhone trust fund keytar.",
                "High Life wolf chia, butcher farm-to-table slow-carb pour-over lumbersexual ennui hashtag migas taxidermy XOXO pickled jean shorts",
            ];
            var colors = ['red', 'green', 'blue', 'purple', 'orange', 'yellow'];

            var demoItem = {
                network: 'facebook',
                type: 'post',
                id: Math.floor(Math.random()*10000000),
                username: this.returnRandomItemFromArray(names),
                timestamp: '1s',
                message: this.returnRandomItemFromArray(messages),
                avatar: this.returnRandomItemFromArray(colors),
                attachment: false
            }
            return demoItem;
        },

        returnRandomItemFromArray: function(array) {
            if(array) {
                var item = array[Math.floor(Math.random()*array.length)];
                return item;
            }
        },

        addItem: function(item) {
            var items = this.state.items;
            var item = item || this.getItem();
            if(item) {
                items.unshift(item);

                this.setState({
                    items:items
                });
            }
        },

        render: function() {
            var className = 'stack ' + this.state.stack.network;
            var stackType = this.state.stack.type || '';

            var items = this.state.items.map(function (item, index) {
                return <SCRM.Item item={item} key={item.id} />
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
        getInitialState: function () {
            return this.props.item;
        },

        render: function() {
            var avatarColor = {
                backgroundColor: this.state.avatar
            }
            return (
                <div className='item'>
                    <div className='avatar' style={avatarColor} />
                    <div className='username'>{this.state.username}</div>
                    <div className='timestamp'>{this.state.timestamp}</div>
                    <p className='message'>{this.state.message}</p>
                    {this.state.attachment ? <div className='attachment'>{this.state.attachment}</div> : false}
                    <SCRM.ItemActions item={this.props.item} />
                </div>
            );
        }
    }),

    ItemActions: React.createClass({
        getActionList: function(network, type) {
            switch(network) {
                case 'facebook':
                    return <SCRM.FacebookPostItemActions item={this.props.item} />;
                case 'twitter':
                    return <SCRM.TwitterTweetItemActions item={this.props.item} />;
            }
        },

        render: function() {
            var actions = this.getActionList(this.props.item.network, this.props.item.type);
            return actions;
        }
    }),

    FacebookPostItemActions: React.createClass({
        getInitialState: function () {
            return {
                item:this.props.item  
            };
        },

        replyAction: function() {
            alert('reply action for ' + this.props.item.id);
        },

        render: function() {
            return (
                <ul className='actions'>
                    <li onClick={this.replyAction}>Reply</li>
                    <li>Tag</li>
                    <li>Assign Task</li>
                </ul>
            )
        }
    }),

    TwitterTweetItemActions: React.createClass({
        getInitialState: function () {
            return {
                item:this.props.item  
            };
        },

        replyAction: function() {
            alert('reply action for ' + this.props.item.id);
        },

        render: function() {
            return (
                <ul className='actions'>
                    <li onClick={this.replyAction}>Reply</li>
                    <li>Tag</li>
                    <li>Assign Task</li>
                </ul>
            )
        }
    })
};

$(document).ready(function() {
    SCRM.init();
});