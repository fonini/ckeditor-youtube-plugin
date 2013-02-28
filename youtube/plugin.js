/*
* Youtube Embed Plugin
*
* @author Jonnas Fonini <contato@fonini.net>
* @version 0.1
*/
( function() {
	CKEDITOR.plugins.add( 'youtube',
	{
		init: function( editor )
		{
			editor.addCommand( 'youtube', new CKEDITOR.dialogCommand( 'youtube' ) );

			editor.ui.addButton( 'youtube',
			{
				label: 'Embed Media',
				command: 'youtube',
				icon: this.path + 'images/icon.png'
			});

			CKEDITOR.dialog.add( 'youtube', function (instance)
			{
				return {
					title : 'Embed Youtube Videos',
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
									label : 'Paste Embed Code Here',
									autofocus: 'autofocus'
								}
							]
						}
					],
					onOk: function() {
						var txtEmbed = this.getValueOf('youtubePlugin', 'txtEmbed');
						console.log(txtEmbed);
					}
				};
			});
		}
	});
})();
