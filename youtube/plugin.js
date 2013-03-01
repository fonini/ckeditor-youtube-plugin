/*
* Youtube Embed Plugin
*
* @author Jonnas Fonini <contato@fonini.net>
* @version 0.1
*/
( function() {
	CKEDITOR.plugins.add( 'youtube',
	{
		lang: [ 'en' ],
		init: function( editor )
		{
			editor.addCommand( 'youtube', new CKEDITOR.dialogCommand( 'youtube' ) );

			editor.ui.addButton( 'youtube',
			{
				label: editor.lang.youtube.button,
				command: 'youtube',
				icon: this.path + 'images/icon.png'
			});

			CKEDITOR.dialog.add( 'youtube', function (instance)
			{
				return {
					title : editor.lang.youtube.title,
					minWidth : 550,
					minHeight : 200,
					contents :
						[{
							id : 'youtubePlugin',
							expand : true,
							elements :
								[{
									id : 'txtEmbed',
									type : 'textarea',
									label : editor.lang.youtube.txtEmbed,
									autofocus : 'autofocus',
									onChange : function ( api ){
										if ( this.getValue().length > 0 ){
											this.getDialog().getContentElement('youtubePlugin', 'txtUrl').disable();
										}
										else{
											this.getDialog().getContentElement('youtubePlugin', 'txtUrl').enable();
										}
									},
									validate : function() {
										if ( this.isEnabled() ){
											if ( !this.getValue() )
											{
												alert( editor.lang.youtube.noCode );
												return false;
											}
											else
											if ( this.getValue().length === 0 || this.getValue().indexOf( 'http://' ) === -1 ){
												alert( editor.lang.youtube.invalidEmbed );
												return false;
											}
										}
									}
								},
								{
									type : 'html',
									html : editor.lang.youtube.or
								},
								{
									type : 'hbox',
									widths : [ '70%', '15%', '15%' ],
									children :
									[
										{
											id : 'txtUrl',
											type : 'text',
											label : editor.lang.youtube.txtUrl,
											onChange : function ( api ){
												if ( this.getValue().length > 0 ){
													this.getDialog().getContentElement('youtubePlugin', 'txtEmbed').disable();
												}
												else{
													this.getDialog().getContentElement('youtubePlugin', 'txtEmbed').enable();
												}
											},
											validate : function() {
												if ( this.isEnabled() ){
													if ( !this.getValue() )
													{
														alert( editor.lang.youtube.noCode );
														return false;
													}
													else
													if ( this.getValue().length === 0 || this.getValue().indexOf( 'http://' ) === -1 ){
														alert( editor.lang.youtube.invalidEmbed );
														return false;
													}
												}
											}
										},
										{
											type : 'text',
											id : 'txtWidth',
											width : '60px',
											label : editor.lang.youtube.txtWidth
										},
										{
											type : 'text',
											id : 'txtHeight',
											width : '60px',
											label : editor.lang.youtube.txtHeight
										}
									]
								}
							]
						}
					],
					onOk: function() {
						var txtEmbed = this.getValueOf( 'youtubePlugin', 'txtEmbed');

						var instance = this.getParentEditor();
						instance.insertHtml(txtEmbed);
					}
				};
			});
		}
	});
})();
