class Game {
	constructor() {
		// const url = 'ws://websocket-server-y5p7.onrender.com';
		// this.url = 'ws://localhost:8080';
		this.url = 'ws://tan-tungsten-brisket.glitch.me';
		this.socket = null;
		this.message = document.querySelector('.message');
		this.name = document.querySelector('.name');
		this.clients = document.querySelector('.clients');
		this.score = document.querySelector('.score');
		this.buttons = document.querySelectorAll('.btn');
	}

	init = () => {
		this.socket = new WebSocket(this.url);
		document.addEventListener('click', this.clickHandler);
		this.socket.addEventListener('message', this.messageHandler);
		this.socket.addEventListener('close', this.closeHandler);
	};

	clickHandler = (event) => {
		if (event.target.closest('.btn')) {
			this.clearMessageStyle();
			this.clearButtons();
			this.socket.send(event.target.id);
			event.target.classList.add('js--selected');
		}
	};

	messageHandler = (message) => {
		const data = JSON.parse(message.data);
		switch (data.type) {
		case 'result':
			this.showMessage(data.data);
			this.message.classList.add(`js--${data.core}`);
			this.score.textContent = data.score;
			break;
		case 'message':
			this.clearMessageStyle();
			this.showMessage(data.data);
			break;
		case 'name':
			this.name.textContent = `Your name: ${data.name}`;
			this.clearMessageStyle();
			break;
		case 'connection':
			this.clients.textContent = `Total clients: ${data.clients}`;
			this.clearMessageStyle();
			break;
		default:
			break;
		}
	};

	clearButtons = () => {
		this.buttons.forEach((button) => button.classList.remove('js--selected'));
	};

	clearMessageStyle = () => {
		this.message.classList.remove('js--win', 'js--draw', 'js--lose');
	};

	showMessage = (message) => {
		this.message.textContent = message;
	};

	closeHandler = () => {
		console.log('Disconnected from server');
	};
}

const game = new Game();
game.init();
