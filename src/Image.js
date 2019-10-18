import * as Mixin from './util/mixin'
import HTMLImageElement from './HTMLImageElement'
import { _canvas } from './Canvas'

export default function Image() {
	let canvas = _canvas;
	if (!canvas) {
		throw new Error('please register a canvas')
	}
	const image = canvas.createImage();

	// image.__proto__.__proto__.__proto__ = new HTMLImageElement();

	if (!('tagName' in image)) {
		image.tagName = 'IMG'
	}

	Mixin.parentNode(image);
	Mixin.classList(image);

	return image;
};
