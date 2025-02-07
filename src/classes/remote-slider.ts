import { html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

import { renderTemplate } from 'ha-nunjucks';

import { IServiceCall } from '../models';

import { BaseRemoteElement } from './base-remote-element';

@customElement('remote-slider')
export class RemoteSlider extends BaseRemoteElement {
	@property({ attribute: false }) sliderId!: string;
	@property({ attribute: false }) sliderAttribute?: string;
	@property({ attribute: false }) range: [number, number] = [0, 1];
	@property({ attribute: false }) info!: IServiceCall;

	value: number = 0;
	oldValue?: number;
	newValue?: number;
	step: number = 0.01;
	speed: number = 0.02;

	onInput(e: InputEvent) {
		e.preventDefault();
		e.stopImmediatePropagation();

		this.fireHapticEvent('selection');

		const slider = e.currentTarget as HTMLInputElement;
		const start = parseFloat(
			(this.oldValue as unknown as string) ?? this.value,
		);
		const end = parseFloat(slider.value ?? start);
		slider.value = start.toString();
		this.newValue = end;

		if (end > this.range[0]) {
			slider.className = 'slider';
		}

		let i = start;
		if (start > end) {
			const id = setInterval(() => {
				i -= this.speed;
				slider.value = i.toString();

				if (end >= i) {
					clearInterval(id);
					slider.value = end.toString();
					if (end <= this.range[0]) {
						slider.className = 'slider-off';
					}
				}
			}, 1);
		} else if (start < end) {
			const id = setInterval(() => {
				i += this.speed;
				slider.value = i.toString();

				if (end <= i) {
					clearInterval(id);
					slider.value = end.toString();
				}
			}, 1);
		} else {
			slider.value = end.toString();
		}

		this.oldValue = end;
	}

	onEnd(_e: MouseEvent | TouchEvent) {
		const [domain, service] = (
			renderTemplate(this.hass, this.info.service) as string
		).split('.');
		if (!this.newValue && this.newValue != 0) {
			this.newValue = this.value as number;
		}
		const data = structuredClone(this.info.data ?? {});
		for (const key in data) {
			data[key] = renderTemplate(this.hass, data[key] as string);
			if (data[key] == 'VALUE') {
				data[key] = this.newValue;
			} else if (data[key].toString().includes('VALUE')) {
				data[key] = data[key]
					.toString()
					.replace('VALUE', this.newValue.toString());
			}
		}
		this.fireHapticEvent('light');
		this.hass.callService(domain, service, data);
		this.value = this.newValue;
	}

	render() {
		const background = html`<div class="slider-background"></div>`;
		const sliderId = renderTemplate(this.hass, this.sliderId) as string;
		const sliderAttribute = renderTemplate(
			this.hass,
			this.sliderAttribute as string,
		) as string;

		if (sliderAttribute) {
			if (sliderAttribute == 'state') {
				this.value = parseFloat(this.hass.states[sliderId].state);
			} else {
				this.value =
					this.hass.states[sliderId].attributes[sliderAttribute];
			}
		} else {
			this.value =
				this.hass.states[sliderId].attributes.volume_level ?? 0;
		}

		if (this.oldValue == undefined) {
			this.oldValue = this.value;
		}
		if (this.newValue == undefined) {
			this.newValue = this.value;
		}

		const end = parseFloat(
			renderTemplate(
				this.hass,
				this.range[0] as unknown as string,
			) as string,
		);
		const start = parseFloat(
			renderTemplate(
				this.hass,
				this.range[1] as unknown as string,
			) as string,
		);

		this.step = (start - end) / 100;
		this.speed = 2 * this.step;

		let sliderClass = 'slider';
		if (!this.value || this.value <= end) {
			sliderClass = 'slider-off';
		}
		const slider = html`
			<input
				type="range"
				class="${sliderClass}"
				min="${end}"
				max="${start}"
				step=${this.step}
				value="${this.value}"
				@input=${this.onInput}
				@mouseup=${this.onEnd}
				@touchend=${this.onEnd}
			/>
		`;

		const style = structuredClone(this._style ?? {});
		for (const key in style) {
			style[key] = renderTemplate(
				this.hass,
				style[key] as string,
			) as string;
		}

		return html`<div class="container" style=${styleMap(style)}>
			${background}${slider}
		</div>`;
	}

	static get styles() {
		return css`
			:host {
				display: flex;
				flex-flow: column;
				place-content: center space-evenly;
				align-items: center;
				position: relative;
				width: 100%;
				border: none;
				padding: 0px;
				box-sizing: border-box;
				line-height: 0;
				outline: 0px;
				overflow: hidden;
				font-size: inherit;
				color: inherit;
			}

			.container {
				all: inherit;
				overflow: hidden;
				height: 50px;
				border-radius: var(--border-radius);

				--color: var(--primary-text-color);
				--background: var(--secondary-background-color);
				--background-height: 50px;
				--border-radius: 25px;
			}

			.slider-background {
				position: absolute;
				width: inherit;
				height: var(--background-height);
				background: var(--background);
				border-radius: var(--border-radius);
			}

			.slider,
			.slider-off {
				position: absolute;
				appearance: none;
				-webkit-appearance: none;
				-moz-appearance: none;
				height: inherit;
				width: inherit;
				border-radius: var(--border-radius);
				background: none;
				overflow: hidden;
			}

			.slider::-webkit-slider-thumb {
				appearance: none;
				-webkit-appearance: none;
				height: var(--background-height);
				width: 24px;
				cursor: pointer;
				z-index: 1;
				background: var(--color);
				box-shadow: -100vw 0 0 100vw var(--color);
			}

			.slider-off::-webkit-slider-thumb {
				visibility: hidden;
			}

			.slider-off::-moz-range-thumb {
				visibility: hidden;
			}
		`;
	}
}
