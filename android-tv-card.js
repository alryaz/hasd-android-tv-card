const LitElement = Object.getPrototypeOf(
	customElements.get('ha-panel-lovelace')
);
const html = LitElement.prototype.html;

/**
 * This is the list of most common commands from the Android TV Remote integration page
 * https://www.home-assistant.io/integrations/androidtv_remote/#remote
 */
const keys = {
	power: { key: 'POWER', icon: 'mdi:power' },
	volume_up: { key: 'VOLUME_UP', icon: 'mdi:volume-plus' },
	volume_down: { key: 'VOLUME_DOWN', icon: 'mdi:volume-minus' },
	volume_mute: { key: 'MUTE', icon: 'mdi:volume-mute' },
	back: { key: 'BACK', icon: 'mdi:arrow-left' },
	home: { key: 'HOME', icon: 'mdi:home' },
	up: { key: 'DPAD_UP', icon: 'mdi:chevron-up' },
	left: { key: 'DPAD_LEFT', icon: 'mdi:chevron-left' },
	center: { key: 'DPAD_CENTER', icon: 'mdi:checkbox-blank-circle' },
	right: { key: 'DPAD_RIGHT', icon: 'mdi:chevron-right' },
	down: { key: 'DPAD_DOWN', icon: 'mdi:chevron-down' },
	play: { key: 'MEDIA_PLAY_', icon: 'mdi:play' },
	pause: { key: 'MEDIA_PAUSE', icon: 'mdi:pause' },
	play_pause: { key: 'MEDIA_PLAY_PAUSE', icon: 'mdi:play-pause' },
	stop: { key: 'MEDIA_STOP', icon: 'mdi:stop' },
	rewind: { key: 'MEDIA_REWIND', icon: 'mdi:rewind' },
	fast_forward: { key: 'MEDIA_FAST_FORWARD', icon: 'mdi:fast-forward' },
	previous: { key: 'MEDIA_PREVIOUS', icon: 'mdi:skip-previous' },
	record: { key: 'MEDIA_RECORD', icon: 'mdi:record' },
	next: { key: 'MEDIA_NEXT', icon: 'mdi:skip-next' },
	menu: { key: 'MENU', icon: 'mdi:menu' },
	a: { key: 'BUTTON_A', icon: 'mdi:alpha-a-circle' },
	b: { key: 'BUTTON_B', icon: 'mdi:alpha-B-circle' },
	x: { key: 'BUTTON_X', icon: 'mdi:alpha-x-circle' },
	y: { key: 'BUTTON_Y', icon: 'mdi:alpha-y-circle' },
	n0: { key: '0', icon: 'mdi:numeric-0' },
	n1: { key: '1', icon: 'mdi:numeric-1' },
	n2: { key: '2', icon: 'mdi:numeric-2' },
	n3: { key: '3', icon: 'mdi:numeric-3' },
	n4: { key: '4', icon: 'mdi:numeric-4' },
	n5: { key: '5', icon: 'mdi:numeric-5' },
	n6: { key: '6', icon: 'mdi:numeric-6' },
	n7: { key: '7', icon: 'mdi:numeric-7' },
	n8: { key: '8', icon: 'mdi:numeric-8' },
	n9: { key: '9', icon: 'mdi:numeric-9' },
	delete: { key: 'DEL', icon: 'mdi:delete' },
	enter: { key: 'ENTER', icon: 'mdi:arrow-left-bottom' },
	channel_up: { key: 'CHANNEL_UP', icon: 'mdi:arrow-up-circle' },
	channel_down: { key: 'CHANNEL_DOWN', icon: 'mdi:arrow-down-circle' },
	f1: { key: 'F1', icon: 'mdi:keyboard-f1' },
	f2: { key: 'F2', icon: 'mdi:keyboard-f2' },
	f3: { key: 'F3', icon: 'mdi:keyboard-f3' },
	f4: { key: 'F4', icon: 'mdi:keyboard-f4' },
	f5: { key: 'F5', icon: 'mdi:keyboard-f5' },
	f6: { key: 'F6', icon: 'mdi:keyboard-f6' },
	f7: { key: 'F7', icon: 'mdi:keyboard-f7' },
	f8: { key: 'F8', icon: 'mdi:keyboard-f8' },
	f9: { key: 'F9', icon: 'mdi:keyboard-f9' },
	f10: { key: 'F10', icon: 'mdi:keyboard-f10' },
	f11: { key: 'F11', icon: 'mdi:keyboard-f11' },
	f12: { key: 'F12', icon: 'mdi:keyboard-f12' },
	tv: { key: 'TV', icon: 'mdi:television-box' },
	red: { key: 'PROG_RED', icon: 'mdi:alpha-r-box' },
	green: { key: 'PROG_GREEN', icon: 'mdi:alpha-g-box' },
	yellow: { key: 'PROG_YELLOW', icon: 'mdi:alpha-y-box' },
	blue: { key: 'PROG_BLUE', icon: 'mdi:alpha-b-box' },
	button_mode: { key: 'BUTTON_MODE', icon: 'mdi:gesture-tap-buton' },
	explorer: { key: 'EXPLORER', icon: 'mdi:folder-multiple' },
	info: { key: 'INFO', icon: 'mdi:information' },
	guide: { key: 'GUIDE', icon: 'mdi:television-guide' },
	teletext: { key: 'TV_TELETEXT', icon: 'mdi:card-text' },
	captions: { key: 'CAPTIONS', icon: 'mdi:closed-caption' },
	dvr: { key: 'DVR', icon: 'mdi:audio-video' },
	audio_track: { key: 'MEDIA_AUDIO_TRACK', icon: 'mdi:waveform' },
	settings: { key: 'SETTINGS', icon: 'mdi:cog' },
	search: { key: 'SEARCH', icon: 'mdi:magnify' },
	assist: { key: 'ASSIST', icon: 'mdi:google-assistant' },
};

const sources = {
	netflix: { source: 'netflix://', icon: 'mdi:netflix' },
	spotify: { source: 'spotify://', icon: 'mdi:spotify' },
	youtube: { source: 'vnd.youtube://', icon: 'mdi:youtube' },
	appletv: {
		source: 'https://tv.apple.com',
		svg_path:
			'M 6.820312 8.246094 C 7.179688 7.824219 7.398438 7.273438 7.398438 6.675781 C 7.398438 6.613281 7.398438 6.550781 7.394531 6.492188 L 7.394531 6.5 C 6.746094 6.566406 6.183594 6.871094 5.785156 7.324219 L 5.78125 7.328125 C 5.417969 7.726562 5.195312 8.261719 5.195312 8.851562 C 5.195312 8.910156 5.199219 8.96875 5.203125 9.023438 L 5.203125 9.015625 C 5.207031 9.015625 5.214844 9.015625 5.222656 9.015625 C 5.867188 9.015625 6.445312 8.71875 6.820312 8.25 Z M 8.195312 12.304688 C 8.203125 13.292969 8.796875 14.140625 9.648438 14.511719 L 9.664062 14.519531 C 9.46875 15.109375 9.214844 15.625 8.894531 16.09375 L 8.90625 16.070312 C 8.449219 16.734375 7.980469 17.398438 7.230469 17.414062 C 6.5 17.429688 6.269531 16.980469 5.425781 16.980469 C 4.589844 16.980469 4.328125 17.398438 3.632812 17.429688 C 2.925781 17.453125 2.375 16.703125 1.914062 16.039062 C 1.226562 15.109375 0.8125 13.941406 0.8125 12.671875 C 0.8125 11.902344 0.964844 11.167969 1.242188 10.5 L 1.226562 10.535156 C 1.679688 9.734375 2.519531 9.195312 3.484375 9.171875 L 3.488281 9.171875 C 4.191406 9.15625 4.863281 9.648438 5.296875 9.648438 C 5.726562 9.648438 6.535156 9.0625 7.386719 9.148438 C 8.210938 9.179688 8.933594 9.59375 9.378906 10.21875 L 9.386719 10.226562 C 8.675781 10.664062 8.210938 11.429688 8.195312 12.304688 Z M 15.019531 17.304688 C 14.589844 17.429688 14.097656 17.5 13.585938 17.5 C 13.582031 17.5 13.574219 17.5 13.566406 17.5 C 12.417969 17.5 11.847656 16.851562 11.847656 15.546875 L 11.847656 9.796875 L 10.851562 9.796875 L 10.851562 8.753906 L 11.898438 8.753906 L 11.898438 7.398438 L 13.28125 6.832031 L 13.28125 8.761719 L 14.878906 8.761719 L 14.878906 9.804688 L 13.289062 9.804688 L 13.289062 15.238281 C 13.285156 15.277344 13.285156 15.320312 13.285156 15.367188 C 13.285156 15.640625 13.359375 15.898438 13.492188 16.117188 L 13.492188 16.109375 C 13.644531 16.265625 13.855469 16.363281 14.089844 16.363281 C 14.128906 16.363281 14.160156 16.359375 14.195312 16.355469 L 14.191406 16.355469 C 14.492188 16.34375 14.777344 16.304688 15.050781 16.242188 L 15.019531 16.25 Z M 20.019531 17.367188 L 18.324219 17.367188 L 15.195312 8.753906 L 16.726562 8.753906 L 18.617188 14.355469 C 18.6875 14.574219 18.871094 15.199219 19.164062 16.242188 L 19.441406 15.308594 L 19.75 14.367188 L 21.710938 8.746094 L 23.230469 8.746094 Z M 20.019531 17.367188 ',
	},
	crunchyroll: {
		source: 'crunchyroll://',
		svg_path:
			'M 2.933594 13.46875 C 2.707031 10.601562 3.65625 7.769531 5.566406 5.621094 C 7.476562 3.476562 10.179688 2.199219 13.050781 2.089844 C 15.921875 1.984375 18.710938 3.050781 20.777344 5.046875 C 22.847656 7.042969 24.007812 9.792969 24 12.667969 L 24 12 C 24 5.371094 18.628906 0 12 0 C 5.371094 0 0 5.371094 0 12 C 0 18.628906 5.371094 24 12 24 L 12.800781 24 C 7.261719 23.609375 2.964844 19.015625 2.933594 13.46875 Z M 19.199219 14 C 14.886719 14.015625 13.8125 8.011719 17.867188 6.53125 C 16.679688 5.898438 15.347656 5.574219 14 5.601562 C 10.601562 5.601562 7.539062 7.648438 6.238281 10.785156 C 4.9375 13.925781 5.65625 17.539062 8.058594 19.941406 C 10.460938 22.34375 14.074219 23.0625 17.214844 21.761719 C 20.351562 20.460938 22.398438 17.398438 22.398438 14 C 22.421875 13.464844 22.378906 12.925781 22.265625 12.398438 C 21.609375 13.449219 20.4375 14.0625 19.199219 14 Z M 19.199219 14 ',
	},
	disney: {
		source: 'https://disneyplus.com',
		svg_path: ''
	}
};

var fireEvent = function (node, type, detail, options) {
	options = options || {};
	detail = detail === null || detail === undefined ? {} : detail;
	var event = new Event(type, {
		bubbles: false,
	});
	event.detail = detail;
	node.dispatchEvent(event);
	return event;
};

class TVCardServices extends LitElement {
	constructor() {
		super();

		this.custom_keys = {};
		this.custom_sources = {};
		this.custom_icons = {};

		this.holdtimer = null;
		this.holdaction = null;
		this.holdinterval = null;
		this.timer = null;
	}

	static get properties() {
		return {
			_hass: {},
			_config: {},
			_apps: {},
			trigger: {},
		};
	}

	static getStubConfig() {
		return {};
	}

	getCardSize() {
		return 7;
	}

	setConfig(config) {
		this._config = { theme: 'default', ...config };
		this.custom_keys = config.custom_keys || {};
		this.custom_sources = config.custom_sources || {};
		this.custom_icons = config.custom_icons || {};

		this.loadCardHelpers();
		this.renderVolumeSlider();
	}

	isButtonEnabled(row, button) {
		if (!(this._config[row] instanceof Array)) return false;

		return this._config[row].includes(button);
	}

	set hass(hass) {
		this._hass = hass;
		if (this.volume_slider) this.volume_slider.hass = hass;
		if (this._hassResolve) this._hassResolve();
	}

	get hass() {
		return this._hass;
	}

	fireHapticEvent(window, detail) {
		if (
			this._config.enable_button_feedback === undefined ||
			this._config.enable_button_feedback
		) {
			fireEvent(window, 'haptic', detail);
		}
	}

	async loadCardHelpers() {
		this._helpers = await window.loadCardHelpers();
		if (this._helpersResolve) this._helpersResolve();
	}

	async renderVolumeSlider() {
		if (this._helpers === undefined)
			await new Promise((resolve) => (this._helpersResolve = resolve));
		if (this._hass === undefined)
			await new Promise((resolve) => (this._hassResolve = resolve));
		this._helpersResolve = undefined;
		this._hassResolve = undefined;

		let slider_config = {
			type: 'custom:my-slider',
			entity: this._config.media_player_id,
			height: '50px',
			mainSliderColor: 'white',
			secondarySliderColor: 'rgb(60, 60, 60)',
			mainSliderColorOff: 'rgb(60, 60, 60)',
			secondarySliderColorOff: 'rgb(60, 60, 60)',
			thumbWidth: '0px',
			thumbHorizontalPadding: '0px',
			radius: '25px',
		};

		if (this._config.slider_config instanceof Object) {
			slider_config = { ...slider_config, ...this._config.slider_config };
		}

		this.volume_slider = await this._helpers.createCardElement(
			slider_config
		);
		this.volume_slider.style = 'flex: 0.9;';
		this.volume_slider.ontouchstart = (e) => {
			e.stopImmediatePropagation();
			this.fireHapticEvent(window, 'light');
		};
		this.volume_slider.addEventListener(
			'input',
			(e) => {
				this.fireHapticEvent(window, 'light');
			},
			true
		);

		this.volume_slider.hass = this._hass;
		this.triggerRender();
	}

	/**
	 * Send command to an Android TV remote
	 * @param {string} key
	 */
	sendKey(key, longPress = false) {
		let data = {
			entity_id: this._config.remote_id,
			command: key,
		};
		if (longPress) {
			data.hold_secs = 0.5;
		}
		this._hass.callService('remote', 'send_command', data);
	}

	/**
	 * Send either a command to an Android TV remote or a custom key to any service
	 * @param {string} action
	 * @param {boolean} [longPress=true]
	 */
	sendAction(action, longPress = false) {
		let info =
			this.custom_keys[action] ||
			this.custom_sources[action] ||
			keys[action] ||
			sources[action];
		if (info.key) {
			let key = info.key;
			this.sendKey(key, longPress);
		} else if (info.source) {
			this.changeSource(info.source);
		} else if (info.service) {
			let service_data = JSON.parse(
				JSON.stringify(info.service_data || {})
			);
			if (longPress) {
				service_data.hold_secs = 0.5;
			}
			let [domain, service] = info.service.split('.', 2);
			this._hass.callService(domain, service, service_data);
		}
	}

	changeSource(source) {
		this._hass.callService('remote', 'turn_on', {
			activity: source,
			entity_id: this._config.remote_id,
		});
	}

	onClick(event) {
		event.stopImmediatePropagation();
		let click_action = () => {
			let action = 'center';
			this.sendAction(action);

			this.fireHapticEvent(window, 'light');
		};
		if (this._config.enable_double_click) {
			this.timer = setTimeout(click_action, 200);
		} else {
			click_action();
		}
	}

	onDoubleClick(event) {
		if (
			this._config.enable_double_click !== undefined &&
			!this._config.enable_double_click
		)
			return;

		event.stopImmediatePropagation();

		clearTimeout(this.timer);
		this.timer = null;

		action = this._config.double_click_keycode
			? this._config.double_click_keycode
			: 'back';
		this.sendAction(action);

		this.fireHapticEvent(window, 'success');
	}

	onTouchStart(event) {
		event.stopImmediatePropagation();

		this.holdtimer = setTimeout(() => {
			// Only repeat hold action for directional keys
			if (['up', 'down', 'left', 'right'].includes(this.holdaction)) {
				this.holdinterval = setInterval(() => {
					this.sendAction(this.holdaction);
					this.fireHapticEvent(window, 'light');
				}, 100);
			} else {
				this.sendAction('center', true);
				this.fireHapticEvent(window, 'medium');
			}
		}, 500);

		window.initialX = event.touches[0].clientX;
		window.initialY = event.touches[0].clientY;
	}

	onTouchEnd(event) {
		clearTimeout(this.timer);
		clearTimeout(this.holdtimer);
		clearInterval(this.holdinterval);

		this.holdtimer = null;
		this.timer = null;
		this.holdinterval = null;
		this.holdaction = null;
	}

	onTouchMove(event) {
		if (!initialX || !initialY) {
			return;
		}

		var currentX = event.touches[0].clientX;
		var currentY = event.touches[0].clientY;

		var diffX = initialX - currentX;
		var diffY = initialY - currentY;

		let action;
		if (Math.abs(diffX) > Math.abs(diffY)) {
			// sliding horizontally
			action = diffX > 0 ? 'left' : 'right';
		} else {
			// sliding vertically
			action = diffY > 0 ? 'up' : 'down';
		}
		this.holdaction = action;
		this.sendAction(action);

		this.fireHapticEvent(window, 'selection');
		initialX = null;
		initialY = null;
	}

	handleActionClick(e) {
		let action = e.currentTarget.action;
		this.sendAction(action);
		this.fireHapticEvent(window, 'light');
	}

	handleActionLongClick(e) {
		this.holdaction = e.currentTarget.action;
		this.holdtimer = setTimeout(() => {
			// Only repeat hold action for directional keys and volume
			// prettier-ignore
			if (['up', 'down', 'left', 'right', 'volume_up', 'volume_down'].includes(this.holdaction)) {
				this.holdinterval = setInterval(() => {
					this.sendAction(this.holdaction);
					this.fireHapticEvent(window, 'light');
				}, 100);
			} else {
				this.sendAction(this.holdaction, true);
				this.fireHapticEvent(window, 'medium');
			}
		}, 500);
	}

	handleActionLongClickEnd(e) {
		clearTimeout(this.timer);
		clearTimeout(this.holdtimer);
		clearInterval(this.holdinterval);

		this.holdtimer = null;
		this.timer = null;
		this.holdinterval = null;
		this.holdaction = null;
	}

	buildIconButton(action) {
		let button_info =
			this.custom_keys[action] ||
			this.custom_sources[action] ||
			keys[action] ||
			sources[action] ||
			{};
		let icon = button_info.icon;
		let svg_path = button_info.svg_path ?? this.custom_icons[icon];

		return html`
			<ha-icon-button
				.action="${action}"
				@click="${this.handleActionClick}"
				@touchstart="${this.handleActionLongClick}"
				@touchend="${this.handleActionLongClickEnd}"
				title="${action}"
				.path="${svg_path ? svg_path : ''}"
			>
				<ha-icon
					.icon="${!svg_path ? icon : ''}"
				</ha-icon>
			</ha-icon-button>
		`;
	}

	buildRow(content) {
		return html` <div class="row">${content}</div> `;
	}
	buildButtonsFromActions(actions) {
		return actions.map((action) => this.buildIconButton(action));
	}

	triggerRender() {
		this.trigger = Math.random();
	}

	render() {
		if (!this._config || !this._hass || !this.volume_slider) {
			return html``;
		}

		var content = [];
		Object.keys(this._config).forEach((row_name) => {
			if (row_name.includes('_row')) {
				let row_actions = this._config[row_name];

				if (row_name === 'volume_row') {
					let volume_row = [];
					if (this._config.volume_row == 'buttons') {
						volume_row = [
							this.buildIconButton('volume_down'),
							this.buildIconButton('volume_mute'),
							this.buildIconButton('volume_up'),
						];
					} else if (this._config.volume_row == 'slider') {
						volume_row = [this.volume_slider];
					}
					content.push(volume_row);
				} else if (row_name === 'navigation_row') {
					let navigation_row = [];

					if (this._config.navigation_row == 'buttons') {
						let up_row = [this.buildIconButton('up')];
						let middle_row = [
							this.buildIconButton('left'),
							this.buildIconButton('center'),
							this.buildIconButton('right'),
						];
						let down_row = [this.buildIconButton('down')];
						navigation_row = [up_row, middle_row, down_row];
					} else if (this._config.navigation_row == 'touchpad') {
						var touchpad = [
							html`
								<toucharea
									id="toucharea"
									@click="${this.onClick}"
									@dblclick="${this.onDoubleClick}"
									@touchstart="${this.onTouchStart}"
									@touchmove="${this.onTouchMove}"
									@touchend="${this.onTouchEnd}"
								>
								</toucharea>
							`,
						];
						navigation_row = [touchpad];
					}
					content.push(...navigation_row);
				} else {
					let row_content = this.buildButtonsFromActions(row_actions);
					content.push(row_content);
				}
			}
		});

		content = content.map(this.buildRow);

		var output = html`
			${this.renderStyle()}
			<ha-card .header="${this._config.title}">${content}</ha-card>
		`;

		return html`${output}`;
	}

	renderStyle() {
		return html`
			<style>
				.remote {
					padding: 16px 0px 16px 0px;
				}
				img,
				ha-icon-button {
					width: 64px;
					height: 64px;
					cursor: pointer;
					--mdc-icon-size: 100%;
				}
				.row {
					display: flex;
					padding: 8px 36px 8px 36px;
					justify-content: space-evenly;
				}
				.diagonal {
					background-color: var(--light-primary-color);
				}
				toucharea {
					border-radius: 30px;
					flex-grow: 1;
					height: ${this._config['touchpad_height'] || '250px'};
					background: #6d767e;
					touch-action: none;
					text-align: center;
				}
			</style>
		`;
	}

	applyThemesOnElement(element, themes, localTheme) {
		if (!element._themes) {
			element._themes = {};
		}
		let themeName = themes.default_theme;
		if (
			localTheme === 'default' ||
			(localTheme && themes.themes[localTheme])
		) {
			themeName = localTheme;
		}
		const styles = Object.assign({}, element._themes);
		if (themeName !== 'default') {
			var theme = themes.themes[themeName];
			Object.keys(theme).forEach((key) => {
				var prefixedKey = '--' + key;
				element._themes[prefixedKey] = '';
				styles[prefixedKey] = theme[key];
			});
		}
		if (element.updateStyles) {
			element.updateStyles(styles);
		} else if (window.ShadyCSS) {
			// implement updateStyles() method of Polemer elements
			window.ShadyCSS.styleSubtree(
				/** @type {!HTMLElement} */
				(element),
				styles
			);
		}

		const meta = document.querySelector('meta[name=theme-color]');
		if (meta) {
			if (!meta.hasAttribute('default-content')) {
				meta.setAttribute(
					'default-content',
					meta.getAttribute('content')
				);
			}
			const themeColor =
				styles['--primary-color'] ||
				meta.getAttribute('default-content');
			meta.setAttribute('content', themeColor);
		}
	}
}

customElements.define('android-tv-card', TVCardServices);
