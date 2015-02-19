/**
* MultiSelect Control (TODO: bitly link to soho xi docs)
*/

(function(factory) {
  'use strict';

  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module depending on jQuery.
    define(['jquery'], factory);
  } else if (typeof module === 'object' && module.exports) {
    //Support for Atom/CommonJS - Not Tested TODO
    module.exports = factory;
  } else {
    // Register with Browser globals
    factory(window.jQuery || window.Zepto);
  }
}(function($) {

  'use strict';

  $.fn.multiselect = function(options) {

    // Settings and Options
    var pluginName = 'multiselect',
        defaults = {
          maxSelected: undefined,
          source: undefined
        },
        settings = $.extend({}, defaults, options);

    // Plugin Constructor
    function MultiSelect(element) {
      this.settings = $.extend({}, settings);
      this.element = $(element);
      this.init();
    }

    // Plugin Methods
    MultiSelect.prototype = {

      init: function() {
        this.build();
        this.handleEvents();
      },

      build: function() {
        var self = this,
          ddOpts = {
            closeOnSelect: false,
            empty: true,
            multiple: true
          };

        if (this.settings.source) {
          ddOpts.source = this.settings.source;
        }
        if (this.settings.maxSelected) {
          ddOpts.maxSelected = this.settings.maxSelected;
        }
        this.element.dropdown(ddOpts);
        this.dropdown = this.element.data('dropdown');
        this.dropdown.input.attr('tabindex', '-1');

        // Insert Textbox after the icon
        this.textbox = $('<div class="multiselect-textbox" tabindex="0"></div>').insertBefore(this.dropdown.input);

        // Add text to the container based on existing selected options
        this.element.find('option:selected').each(function() {
          self.addOptionText($(this));
        });

        this.updateAria();
      },

      // TODO: Localize
      buildAriaLabel: function() {
        var tags = this.textbox.find('span'),
          optionWord = 'options',
          tagString = '';

        tags.each(function() {
          tagString += $(this).text();
        });

        if (tags.length === 1) {
          optionWord = 'option';
        }

        return this.dropdown.label.text() + '. Multiselect with ' + this.textbox.find('.tag').length +
          ' ' + optionWord + ' tagged. ' + tagString + (tags.length > 0 ? '.' : '');
      },

      updateAria: function() {
        this.textbox.attr({'aria-label': this.buildAriaLabel()});
      },

      handleEvents: function() {
        var self = this;

        this.textbox.on('touchend.multiselect touchcancel.multiselect', function(e) {
          e.preventDefault();
          $(e.target).click();
        }).on('click.multiselect', function(e) {
          if ($(this).hasClass('disabled')) {
            return;
          }

          var target = $(e.target);
          if (target.is('.multiselect-textbox')) {
            self.element.trigger('open', [e]);
          }
          if (target.is('.remove') || target.is('use') || target.is('svg')) {
            var option = self.element.find('option[value="' + target.parents('.tag').attr('data-val') + '"]');
            self.dropdown.selectOption(option);
          }
        }).on('keydown.multiselect', function(e) {
          self.element.trigger('simulateKeyDown', [e]);
        }).on('keypress.multiselect', function(e) {
          self.element.trigger('simulateKeyPress', [e]);
        });

        this.element.on('close.multiselect', function() {
          // Triggered by the dropdown's 'close' event.
          self.textbox.focus();
        }).on('selected.multiselect', function(e, option, isAdded) {
          // Triggered by the dropdown's 'selected' event
          self.handleOptionFromDropdown(option, isAdded);
        });
      },

      handleOptionFromDropdown: function(option, isAdded) {
        if (isAdded) {
          this.addOptionText(option);
        } else {
          this.removeOptionText(option);
        }
        this.updateAria();
      },

      addOptionText: function(option) {
        var text = (this.textbox.find('.option-text').length > 0 ? ', ' : '') + option.text(),
          optionSpan = $('<span class="option-text">' + text + '</span>');

        this.textbox.append(optionSpan);
      },

      removeOptionText: function(option) {
        this.textbox.find('.option-text').filter(function() {
          return $(this).text().replace(/, /g, '') === option.text();
        }).remove();
      },

      enable: function() {
        this.dropdown.enable();
        this.textbox.removeClass('disabled');
      },

      disable: function() {
        this.dropdown.disable();
        this.textbox.addClass('disabled');
      },

      // Teardown - Remove added markup and events
      destroy: function() {
        this.textbox.off().remove();
        this.dropdown.destroy();
        this.element.off('close.multiselect selected.multiselect');
        $.removeData(this.element[0], pluginName);
      }
    };

    // Initialize the plugin (Once)
    return this.each(function() {
      var instance = $.data(this, pluginName);
      if (instance) {
        instance.settings = $.extend({}, instance.settings, options);
      } else {
        instance = $.data(this, pluginName, new MultiSelect(this, settings));
      }
    });
  };
}));
