var Dom = (function () {
    function Dom(selector) {
        this._element = document;
        this._elements = null;
        if (typeof selector == 'string') {
            this.find(selector);
        }
        else if (selector instanceof HTMLElement || selector instanceof Document) {
            this._element = selector;
        }
        else {
            this._element = document;
        }
    }
    Dom.prototype.on = function (event, callback) {
        if (this._element instanceof Document && event.toLowerCase() == 'ready') {
            document.addEventListener('DOMContentLoaded', callback);
        }
        else {
            this.each(function (el) { if (el._element instanceof HTMLElement) {
                el._element.addEventListener(event, callback);
            } });
        }
        return this;
    };
    Dom.prototype.find = function (selector) {
        this._elements = this._element.querySelectorAll(selector);
        return this;
    };
    Dom.prototype.each = function (callback) {
        if (this._elements) {
            for (var i = 0, l = this._elements.length; i < l; i++) {
                callback(new Dom(this._elements[i]));
            }
        }
        else if (this._element) {
            callback(new Dom(this._element));
        }
        return this;
    };
    Dom.prototype.css = function (key, value) {
        if (typeof key == 'string') {
            return this.each(function (el) {
                if (el._element instanceof HTMLElement) {
                    el._element.style[key] = value;
                }
            });
        }
        else {
            return this.each(function (el) {
                if (el._element instanceof HTMLElement) {
                    for (var i in key) {
                        el._element.style[i] = key[i];
                    }
                }
            });
        }
    };
    Dom.prototype.before = function (html) {
        return this.each(function (el) { if (el._element instanceof HTMLElement) {
            el._element.insertAdjacentHTML('beforebegin', html);
        } });
    };
    Dom.prototype.after = function (html) {
        return this.each(function (el) { if (el._element instanceof HTMLElement) {
            el._element.insertAdjacentHTML('afterend', html);
        } });
    };
    Dom.prototype.prepend = function (html) {
        return this.each(function (el) { if (el._element instanceof HTMLElement) {
            el._element.insertAdjacentHTML('afterbegin', html);
        } });
    };
    Dom.prototype.append = function (html) {
        return this.each(function (el) { if (el._element instanceof HTMLElement) {
            el._element.insertAdjacentHTML('beforeend', html);
        } });
    };
    Dom.prototype.html = function (html) {
        if (arguments.length == 1) {
            return this.each(function (el) { if (el._element instanceof HTMLElement) {
                el._element.innerHTML = html;
            } });
        }
        else {
            return this._element instanceof HTMLElement ? this._element.innerHTML : '';
        }
    };
    Dom.prototype.text = function (text) {
        if (arguments.length == 1) {
            return this.each(function (el) { if (el._element instanceof HTMLElement) {
                el._element.innerText = text;
            } });
        }
        else {
            return this._element instanceof HTMLElement ? this._element.innerText : '';
        }
    };
    Dom.prototype.addClass = function (classes) {
        var c = classes.split(' ');
        return this.each(function (el) { for (var _i = 0, c_1 = c; _i < c_1.length; _i++) {
            var i = c_1[_i];
            if (el._element instanceof HTMLElement) {
                el._element.classList.add(i);
            }
        } });
    };
    Dom.prototype.removeClass = function (classes) {
        var c = classes.split(' ');
        return this.each(function (el) { for (var _i = 0, c_2 = c; _i < c_2.length; _i++) {
            var i = c_2[_i];
            if (el._element instanceof HTMLElement) {
                el._element.classList.remove(i);
            }
        } });
    };
    Dom.prototype.toggleClass = function (classes) {
        var c = classes.split(' ');
        return this.each(function (el) { for (var _i = 0, c_3 = c; _i < c_3.length; _i++) {
            var i = c_3[_i];
            if (el._element instanceof HTMLElement) {
                el._element.classList.toggle(i);
            }
        } });
    };
    Dom.prototype.hasClass = function (c) {
        var hc = false;
        this.each(function (el) {
            if (hc)
                return;
            if (el._element instanceof HTMLElement && el._element.classList.contains(c)) {
                hc = true;
            }
            ;
        });
        return hc;
    };
    Dom.prototype.attr = function (key, value) {
        if (value === void 0) { value = ''; }
        if (arguments.length == 1 && this._element instanceof HTMLElement) {
            return this._element.getAttribute(key);
        }
        return this.each(function (el) { if (el._element instanceof HTMLElement) {
            el._element.setAttribute(key, value);
        } });
    };
    Dom.prototype.removeAttr = function (key) {
        return this.each(function (el) { if (el._element instanceof HTMLElement) {
            el._element.removeAttribute(key);
        } });
    };
    Dom.prototype.disable = function () {
        return this.each(function (el) { if (el._element instanceof HTMLElement) {
            el._element.setAttribute('disabled', '');
        } });
    };
    Dom.prototype.remove = function () {
        return this.each(function (el) { if (el._element instanceof HTMLElement) {
            el._element.parentNode.removeChild(el._element);
        } });
    };
    Dom.prototype.empty = function () {
        return this.each(function (el) { if (el._element instanceof HTMLElement) {
            el._element.innerHTML = '';
        } });
    };
    Dom.prototype.truncate = function () {
        return this.each(function (el) { if (el._element instanceof HTMLElement) {
            el._element.innerText = '';
        } });
    };
    Dom.prototype.val = function (value) {
        if (arguments.length == 1) {
            return this.each(function (el) { if (el._element instanceof HTMLInputElement) {
                el._element.value = value;
            } });
        }
        else {
            return (this._element instanceof HTMLInputElement) ? this._element.value : '';
        }
    };
    return Dom;
}());
function m(selector) {
    return new Dom(selector);
}
