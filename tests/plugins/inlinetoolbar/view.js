/* bender-tags: inlinetoolbar */
/* bender-ckeditor-plugins: inlinetoolbar */

( function() {
	'use strict';

	bender.editor = {
		config: {
			extraAllowedContent: 'strong'
		}
	};

	bender.test( {
		'test inlineToolbarView.render': function() {
			var view = new CKEDITOR.ui.inlineToolbarView( this.editor ),
				items = {
					aa: {
						render: function( editor, outputStack ) {
							outputStack.push( 'aa' );
						}
					},
					bb: {
						render: function( editor, outputStack ) {
							outputStack.push( 'bb' );
						}
					}
				};

			view.renderItems( items );

			assert.areSame( '<span class="cke_toolgroup">aabb</span>', view.parts.content.getHtml() );
		},

		'test inlineToolbarView.render empty list': function() {
			var view = new CKEDITOR.ui.inlineToolbarView( this.editor ),
				items = [];

			view.parts.content.setHtml( 'foobar' );

			view.renderItems( items );

			assert.areSame( '', view.parts.content.getHtml() );
		},

		'test inline toolbar doesnt steal the focus': function() {
			var editor = this.editor;

			this.editorBot.setData( '<p>foo <strong>bar</strong> baz</p>', function() {
				editor.focus();

				var view = new CKEDITOR.ui.inlineToolbarView( editor ),
					pointedElement = editor.editable().findOne( 'strong' );

				view.parts.content.setHtml( 'foo' );
				view.attach( pointedElement, { focusElement: false } );

				assert.areSame( this.editor.window.getFrame(), CKEDITOR.document.getActive(), 'Editor frame is focused' );

				view.destroy();
			} );
		},

		'test inline toolbar show and hide methods': function() {
			var editor = this.editor;

			this.editorBot.setData( '<p>foo <strong>bar</strong> baz</p>', function() {
				editor.focus();

				var view = new CKEDITOR.ui.inlineToolbarView( editor ),
					pointedElement = editor.editable().findOne( 'strong' );

				view.attach( pointedElement, { focusElement: false, show: false } );
				assert.isFalse( view.rect.visible, 'Toolbar should not be shown' );
				assert.areEqual( 0, view._listeners.length, 'Listensers should not be attached' );

				view.show();
				assert.isTrue( view.rect.visible, 'Toolbar should be shown after show method' );
				assert.areEqual( 2, view._listeners.length, 'Listensers should be attached after show method' );

				view.hide();
				assert.isFalse( view.rect.visible, 'Toolbar should not be shown after hide method' );
				assert.areEqual( 0, view._listeners.length, 'Listensers should not be attached after hide method' );

				view.destroy();
			} );
		}
	} );
} )();