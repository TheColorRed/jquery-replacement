class Dom {

    protected _element: HTMLElement | Document = document;
    protected _elements: NodeListOf<HTMLElement> = null;

    public constructor(selector?: string | HTMLElement | Document) {
        if (typeof selector == 'string') {
            this.find(selector);
        } else if (selector instanceof HTMLElement || selector instanceof Document) {
            this._element = selector;
        } else {
            this._element = document;
        }
    }

    public on(event: string, callback: (event: Event) => void): this {
        if (this._element instanceof Document && event.toLowerCase() == 'ready') {
            document.addEventListener('DOMContentLoaded', callback);
        } else {
            this.each(el => { if (el._element instanceof HTMLElement) { el._element.addEventListener(event, callback); } });
        }
        return this;
    }

    public find(selector: string): this {
        this._elements = this._element.querySelectorAll(selector) as NodeListOf<HTMLElement>;
        return this;
    }

    public each(callback: (element: Dom) => void): this {
        if (this._elements) {
            for (let i = 0, l = this._elements.length; i < l; i++) {
                callback(new Dom(this._elements[i]));
            }
        } else if (this._element) {
            callback(new Dom(this._element));
        }
        return this;
    }

    public css(key: string | any, value?: string): this {
        if (typeof key == 'string') {
            return this.each(el => {
                if (el._element instanceof HTMLElement) {
                    el._element.style[key] = value;
                }
            });
        } else {
            return this.each(el => {
                if (el._element instanceof HTMLElement) {
                    for (let i in key) {
                        el._element.style[i] = key[i];
                    }
                }
            });
        }
    }

    public before(html: string): this {
        return this.each(el => { if (el._element instanceof HTMLElement) { el._element.insertAdjacentHTML('beforebegin', html); } });
    }

    public after(html: string): this {
        return this.each(el => { if (el._element instanceof HTMLElement) { el._element.insertAdjacentHTML('afterend', html); } });
    }

    public prepend(html: string): this {
        return this.each(el => { if (el._element instanceof HTMLElement) { el._element.insertAdjacentHTML('afterbegin', html); } });
    }

    public append(html: string): this {
        return this.each(el => { if (el._element instanceof HTMLElement) { el._element.insertAdjacentHTML('beforeend', html); } });
    }

    public html(html: string): this | string {
        if (arguments.length == 1) {
            return this.each(el => { if (el._element instanceof HTMLElement) { el._element.innerHTML = html; } });
        } else {
            return this._element instanceof HTMLElement ? this._element.innerHTML : '';
        }
    }

    public text(text?: string): this | string {
        if (arguments.length == 1) {
            return this.each(el => { if (el._element instanceof HTMLElement) { el._element.innerText = text; } });
        } else {
            return this._element instanceof HTMLElement ? this._element.innerText : '';
        }
    }

    public addClass(classes: string): this {
        let c = classes.split(' ');
        return this.each(el => { for (let i of c) { if (el._element instanceof HTMLElement) { el._element.classList.add(i); } } });
    }

    public removeClass(classes: string): this {
        let c = classes.split(' ');
        return this.each(el => { for (let i of c) { if (el._element instanceof HTMLElement) { el._element.classList.remove(i); } } });
    }
    public toggleClass(classes: string): this {
        let c = classes.split(' ');
        return this.each(el => { for (let i of c) { if (el._element instanceof HTMLElement) { el._element.classList.toggle(i); } } });
    }

    public hasClass(c: string): boolean {
        let hc: boolean = false;
        this.each(el => {
            if (hc) return;
            if (el._element instanceof HTMLElement && el._element.classList.contains(c)) { hc = true };
        });
        return hc;
    }

    public attr(key: string, value: string = ''): this | string {
        if (arguments.length == 1 && this._element instanceof HTMLElement) {
            return this._element.getAttribute(key);
        }
        return this.each(el => { if (el._element instanceof HTMLElement) { el._element.setAttribute(key, value); } });
    }

    public removeAttr(key: string): this {
        return this.each(el => { if (el._element instanceof HTMLElement) { el._element.removeAttribute(key); } });
    }

    public disable(): this {
        return this.each(el => { if (el._element instanceof HTMLElement) { el._element.setAttribute('disabled', ''); } });
    }

    public remove(): this {
        return this.each(el => { if (el._element instanceof HTMLElement) { el._element.parentNode.removeChild(el._element); } });
    }

    public empty(): this {
        return this.each(el => { if (el._element instanceof HTMLElement) { el._element.innerHTML = ''; } });
    }

    public truncate() {
        return this.each(el => { if (el._element instanceof HTMLElement) { el._element.innerText = ''; } });
    }

    public val(value?: string): this | string {
        if (arguments.length == 1) {
            return this.each(el => { if (el._element instanceof HTMLInputElement) { el._element.value = value; } });
        } else {
            return (this._element instanceof HTMLInputElement) ? this._element.value : '';
        }
    }
}