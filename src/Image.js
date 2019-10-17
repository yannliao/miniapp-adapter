import * as Mixin from './util/mixin'
import HTMLImageElement from './HTMLImageElement'
import Canvas from './Canvas'

export default function() {
    let canvas = new Canvas();
    if (!canvas) {
      throw new Error('global canvas need!')
    }
    const image = new Canvas().createImage();

    // image.__proto__.__proto__.__proto__ = new HTMLImageElement();

    if (!('tagName' in image)) {
        image.tagName = 'IMG'
    }

    Mixin.parentNode(image);
    Mixin.classList(image);

    return image;
};
