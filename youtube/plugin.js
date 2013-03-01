/*
* Youtube Embed Plugin
*
* @author Jonnas Fonini <contato@fonini.net>
* @version 0.1
*/
( function() {
	CKEDITOR.plugins.add( 'youtube',
	{
		lang: ['en'],
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
									autofocus : 'autofocus'
								},
								{
									type : 'html',
									html : editor.lang.youtube.or
								},
								{
									id : 'txtUrl',
									type : 'text',
									label : editor.lang.youtube.txtUrl,
									validate : function() {
										if ( !this.getValue() )
										{
											alert( editor.lang.youtube.invalidUrl );
											return false;
										}
									}
								}
							]
						}
					],
					onOk: function() {
						var txtEmbed = this.getValueOf( 'youtubePlugin', 'txtEmbed');

						if ( txtEmbed.length === 0 || txtEmbed.indexOf( 'http://' ) === -1 ){
							alert(editor.lang.youtube.invalidEmbed);
							return false;
						}

						var instance = this.getParentEditor();
						instance.insertHtml(txtEmbed);
					}
				};
			});
		}
	});
})();

// <iframe width="640" height="360" src="http://www.youtube.com/embed/QBiyNUa_wAg?feature=player_detailpage" frameborder="0" allowfullscreen></iframe>
