Ember.ContenteditableView = Em.View.extend({
	tagName: 'div',
	attributeBindings: ['contenteditable'],

	// Variables:
	editable: false,
	isUserTyping: false,
	plaintext: false,

	// Properties:
	contenteditable: (function() {
		var editable = this.get('editable');

		return editable ? 'true' : undefined;
	}).property('editable'),

	// Observers:
	valueObserver: (function() {
		if (!this.get('isUserTyping') && this.get('value')) {
			return this.setContent();
		}
	}).observes('value'),

	// Events:
	didInsertElement: function() {
		return this.setContent();
	},

	focusOut: function() {
		return this.set('isUserTyping', false);
	},

	keyDown: function(event) {
		if (!event.metaKey) {
			return this.set('isUserTyping', true);
		}
	},

	keyUp: function(event) {
		if (this.get('plaintext')) {
			var element = this.get('element');
			return this.set('value', element.innerText || element.textContent);
		} else {
			return this.set('value', this.$().html());
		}
	},

	setContent: function() {
		if (this.get('plaintext')) {
			return this.$().html(this.get('value').replace(/\n+/g,'<br>'));
		} else {
			return this.$().html(this.get('value'));
		}
	}
});
