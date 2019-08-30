const CLIENT_ID = "swmw2jvyfygze3wh86ewg1k9lofovk6";
const TWITCH_LOGO = "http://static1.squarespace.com/static/510d16d5e4b0e3b888b8ec28/t/560f9916e4b0827aaefe9bd1/1443862807121/Twitch_Logo_Black.png";
const TWITCH_ENDPOINT = `https://api.twitch.tv/kraken`;
const CHANNELS = ["freecodecamp", "GfinityTV", "veemerk", "iijeriichoii", "SethBling", "Xisuma", "OMGitsfirefoxx", "thatmumbojumbo", "ethotv", "captainsparklez", "syndicate", "ramettacraft", "brunofin", "comster404", "twitchoffice", "FRCGameSense", "WePlayDota2"];

class Twitch extends React.Component {
	constructor(){
		super();
		this.state = {input: "", channels: []};
		CHANNELS.map(channel => this.fetchChannel(channel));
	}
	
	fetchChannel(channel = this.state.input) {
		this.setState({ input: "" });
		const url = `${TWITCH_ENDPOINT}/channels/${channel}?client_id=${CLIENT_ID}`;
		
		fetch(url)
			.then(res => res.json())
			.then(resJson => this.setState({ channels: this.state.channels.concat(resJson) }) );
	}
	
	render() {
		console.log(this.state);
		return (
			<Container>
				<Logo logo={TWITCH_LOGO} />
				<InputChannel 
					input={this.state.input}
					inputChange={input => this.setState({ input })}
					addChannel={ev => this.fetchChannel()} />
				<ChannelList channels={this.state.channels} />
			</Container>
		);
	}
}

const Container = props => <div className="container">{props.children}</div>;

const Logo = props => {
	return (
		<div className="row">
			<div className="col-xs-8 col-xs-push-2">
				<img src={props.logo} className="img-responsive center-block page-logo" />
			</div>
		</div>
	);
}

const InputChannel = props => {
	return (
		<div className="row">
			<div className="col-xs-12 col-md-8 col-md-push-2">
				<div className="input-group search-bar">
					<input type="text" className="form-control" placeholder="Channel to add..." 
						value={props.input} 
						onChange={ev => props.inputChange(ev.target.value)} />
					<span className="input-group-btn">
						<button className="btn btn-default" type="button"
							onClick={ev => props.addChannel()}>Add!</button>
					</span>
				</div>
			</div>
		</div>
	);
}

const ChannelList = props => {
	return (
		<div className="row">
			<div className="col-xs-12">
				{ props.channels.map(channel => <ChannelCard key={ channel._id } channel={ channel } />) }
			</div>
		</div>
	);
}

const ChannelCard = props => {
	return (
		<div className="col-sm-6">
			<a href={props.channel.url} target="_blank">
				<div className="channel text-center">
					<img className="img-responsive channel-logo" src={props.channel.logo} />
					<h3 className="channel-name">{props.channel.display_name}</h3>
					<p className="channel-subtitle">
						<em>{props.channel.game}</em> - {props.channel.status}
					</p>
				</div>
			</a>
		</div>
	);
}

ReactDOM.render(<Twitch />, document.getElementById('app'));
