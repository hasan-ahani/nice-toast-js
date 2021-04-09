"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
 * nice-toast-js 1.0.0
 * Made with create-jquery-plugin
 *
 * Created by hasan ahani <hasanahani.ir@gmail.com>
 *
 * @license MIT
 */
(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
  } else if ((typeof module === "undefined" ? "undefined" : _typeof(module)) === 'object' && module.exports) {
    // Node/CommonJS
    module.exports = function (root, jQuery) {
      if (jQuery === undefined) {
        // require('jQuery') returns a factory that requires window to
        // build a jQuery instance, we normalize how we use modules
        // that require this pattern but the window provided is a noop
        // if it's defined (how jquery works)
        if (typeof window !== 'undefined') {
          jQuery = require('jquery');
        } else {
          jQuery = require('jquery')(root);
        }
      }

      factory(jQuery);
      return jQuery;
    };
  } else {
    // Browser globals
    factory(jQuery);
  }
})(function ($) {
  "use strict";

  $('body').append($('<div />').append([$('<div />').append($('<div />').addClass('nice-toast-wrapper top-left')), $('<div />').append($('<div />').addClass('nice-toast-wrapper top-center')), $('<div />').append($('<div />').addClass('nice-toast-wrapper top-right')), $('<div />').append($('<div />').addClass('nice-toast-wrapper bottom-left')), $('<div />').append($('<div />').addClass('nice-toast-wrapper bottom-center')), $('<div />').append($('<div />').addClass('nice-toast-wrapper bottom-right'))])); // Default Options

  var defaults = {
    position: "top-center",
    timeout: 5000,
    progressBar: true
  };
  var icon_check = '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-check-circle fa-w-16 nice-toast-icon"><path fill="currentColor" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path></svg>';
  var icon_info = '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="info-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-info-circle fa-w-16 nice-toast-icon"><path fill="currentColor" d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"></path></svg>';
  var icon_danger = '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="exclamation-triangle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-exclamation-triangle fa-w-18 nice-toast-icon"><path fill="currentColor" d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"></path></svg>';

  var NiceToastJs = /*#__PURE__*/function () {
    function NiceToastJs(message, options) {
      var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'default';

      _classCallCheck(this, NiceToastJs);

      // Merge user settings with default
      this.options = $.extend(true, {}, defaults, options); // Main container element

      this.message = message;
      this.type = type;

      this._init()._render();

      this._event();

      if (this.options.timeout) {
        this._timeout(this.options.timeout);
      }

      return this;
    }

    _createClass(NiceToastJs, [{
      key: "change",
      value: function change(content, delay) {
        var t = this;

        if (delay !== undefined && delay !== null) {
          setTimeout(function () {
            $('.nice-toast-content', t.toast).html(content);
          }, delay);
        } else {
          $('.nice-toast-content', t.toast).html(content);
        }
      }
    }, {
      key: "_event",
      value: function _event() {
        var t = this,
            p = $('.nice-toast-progress', this.toast);
        this.toast.bind('mousedown', function (e) {
          var moved,
              t = $(this);
          $(this).bind('mousemove', function (e) {
            moved = e.pageX - this.offsetLeft;
          });
          $(this).bind('mouseup', function () {
            $(this).unbind('mousemove');
          });
        });
        $('.nice-toast-close', this.toast).on('click', function (e) {
          t._close();
        }); // this.toast.mouseover(function () {
        //     p.css('animation-play-state', 'paused');
        //     clearTimeout(t.timeout)
        // }).mouseleave(function () {
        //     p.css('animation-play-state', 'running');
        //     t._timeout(t._getTimeLeft());
        // })
      }
    }, {
      key: "_close",
      value: function _close() {
        var t = this;
        t.toast.addClass('nice-toast-bounce-leave-active');
        setTimeout(function () {
          t.toast.remove();
        }, 650);
      }
    }, {
      key: "_getTimeLeft",
      value: function _getTimeLeft() {
        return this.options.timeout - (performance.now() - this.timeLeft);
      }
    }, {
      key: "_timeout",
      value: function _timeout(delay) {
        var t = this;
        this.timeLeft = performance.now();
        t.timeout = setTimeout(function () {
          t._close();
        }, delay);
      } // Initial Method

    }, {
      key: "_init",
      value: function _init() {
        var toast,
            icon,
            progress,
            base = 'nice-toast';

        switch (this.type) {
          case "default":
          case "info":
          case "warning":
            icon = icon_info;
            break;

          case "error":
            icon = icon_danger;
            break;

          case "success":
            icon = icon_check;
            break;
        }

        if (this.options.timeout) {
          progress = $('<div />').addClass(base + '-progress').css({
            'animation-duration': parseInt(this.options.timeout) + 'ms',
            'opacity': '1'
          });
        }

        toast = $('<div />').addClass(base + ' ' + base + '-' + this.type).append([icon, $('<div />').addClass(base + '-content').attr('role', 'alert').html(this.message), $('<button />').addClass(base + '-close').attr('aria-label', 'close').text(' × '), progress]);
        this.toast = toast;
        return this;
      }
    }, {
      key: "_render",
      value: function _render() {
        var target = $('.nice-toast-wrapper.' + this.options.position),
            toasts = $('.nice-toast', target),
            t = this;

        if (target.length) {
          toasts.addClass('nice-toast-bounce-move');
          target.prepend(this.toast);
          this.toast.addClass('nice-toast-bounce-enter-active');
          setTimeout(function () {
            t.toast.removeClass('nice-toast-bounce-enter-active');
          }, 800);
        }
      }
    }]);

    return NiceToastJs;
  }();

  $.niceToast = function (message, options) {
    var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'default';

    if (options === undefined || _typeof(options) === 'object') {
      return new NiceToastJs(message, options, type);
    } else if (typeof options === 'string' && options[0] !== '_' && options !== 'init') {
      return new NiceToastJs(message, null, type);
    }
  };

  $.niceToast.success = function (message, options) {
    return $.niceToast(message, options, 'success');
  };

  $.niceToast.info = function (message, options) {
    return $.niceToast(message, options, 'info');
  };

  $.niceToast.warning = function (message, options) {
    return $.niceToast(message, options, 'warning');
  };

  $.niceToast.error = function (message, options) {
    return $.niceToast(message, options, 'error');
  };

  $.niceToast.setup = function (options) {
    defaults = $.extend(true, {}, defaults, options);
  };

  $.niceToast.clear = function () {
    var t = $('.nice-toast-wrapper .nice-toast');
    t.addClass('nice-toast-bounce-leave-active');
    setTimeout(function () {
      t.remove();
    }, 650);
  };
});