/*
* Youtube Embed Plugin
*
* @author Jonnas Fonini <contato@fonini.net>
* @version 0.5
*/
( function() {
	CKEDITOR.plugins.add( 'youtube',
	{
		lang: [ 'en', 'pt' ],
		init: function( editor )
		{
			editor.addCommand( 'youtube', new CKEDITOR.dialogCommand( 'youtube' ) );

			editor.ui.addButton( 'youtube',
			{
				label : editor.lang.youtube.button,
				toolbar : 'insert',
				command : 'youtube',
				icon : this.path + 'images/icon.png'
			});

			CKEDITOR.dialog.add( 'youtube', function ( instance )
			{
				var video;

				return {
					title : editor.lang.youtube.title,
					minWidth : 500,
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
									onChange : function ( api )
									{
										if ( this.getValue().length > 0 )
										{
											this.getDialog().getContentElement( 'youtubePlugin', 'txtUrl' ).disable();
										}
										else {
											this.getDialog().getContentElement( 'youtubePlugin', 'txtUrl' ).enable();
										}
									},
									validate : function ()
									{
										if ( this.isEnabled() )
										{
											if ( !this.getValue() )
											{
												alert( editor.lang.youtube.noCode );
												return false;
											}
											else
											if ( this.getValue().length === 0 || this.getValue().indexOf( 'http://' ) === -1 )
											{
												alert( editor.lang.youtube.invalidEmbed );
												return false;
											}
										}
									}
								},
								{
									type : 'html',
									html : editor.lang.youtube.or + '<hr>'
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
											onChange : function ( api )
											{
												if ( this.getValue().length > 0 )
												{
													this.getDialog().getContentElement( 'youtubePlugin', 'txtEmbed' ).disable();
												}
												else {
													this.getDialog().getContentElement( 'youtubePlugin', 'txtEmbed' ).enable();
												}
											},
											validate : function ()
											{
												if ( this.isEnabled() )
												{
													if ( !this.getValue() )
													{
														alert( editor.lang.youtube.noCode );
														return false;
													}
													else{
														video = ytVidId(this.getValue());

														if ( this.getValue().length === 0 ||  video === false)
														{
															alert( editor.lang.youtube.invalidUrl );
															return false;
														}
													}
												}
											}
										},
										{
											type : 'text',
											id : 'txtWidth',
											width : '60px',
											label : editor.lang.youtube.txtWidth,
											'default' : '640',
											validate : function ()
											{
												if ( this.getValue() )
												{
													var width = parseInt ( this.getValue() ) || 0;

													if ( width === 0 )
													{
														alert( editor.lang.youtube.invalidWidth );
														return false;	
													}
												}
												else {
													alert( editor.lang.youtube.noWidth );
													return false;
												}
											}
										},
										{
											type : 'text',
											id : 'txtHeight',
											width : '60px',
											label : editor.lang.youtube.txtHeight,
											'default' : '360',
											validate : function ()
											{
												if ( this.getValue() )
												{
													var height = parseInt ( this.getValue() ) || 0;

													if ( height === 0 )
													{
														alert( editor.lang.youtube.invalidHeight );
														return false;	
													}
												}
												else {
													alert( editor.lang.youtube.noHeight );
													return false;
												}
											}
										}
									]
								},
								{
									type : 'hbox',
									widths : [ '55%', '45%' ],
									children :
									[
										{
											id : 'chkRelated',
											type : 'checkbox',
											'default' : 'checked',
											label : editor.lang.youtube.chkRelated
										},
										{
											id : 'chkSecure',
											type : 'checkbox',
											label : editor.lang.youtube.chkSecure
										}
									]
								},
								{
									type : 'hbox',
									widths : [ '55%', '45%' ],
									children :
									[
										{
											id : 'chkPrivacy',
											type : 'checkbox',
											label : editor.lang.youtube.chkPrivacy
										},
										{
											id : 'chkOlderCode',
											type : 'checkbox',
											label : editor.lang.youtube.chkOlderCode
										}
									]
								}
							]
						}
					],
					onOk: function()
					{
						var content = '';

						if ( this.getContentElement( 'youtubePlugin', 'txtEmbed' ).isEnabled() )
						{
							content = this.getValueOf( 'youtubePlugin', 'txtEmbed' );
						}
						else {
							var url;
							var width = this.getValueOf( 'youtubePlugin', 'txtWidth' );
							var height = this.getValueOf( 'youtubePlugin', 'txtHeight' );
							var related = true;

							if ( this.getContentElement( 'youtubePlugin', 'chkSecure' ).getValue() === true )
							{
								url = 'https://';
							}
							else {
								url = 'http://';
							}

							if ( this.getContentElement( 'youtubePlugin', 'chkPrivacy' ).getValue() === true )
							{
								url += 'www.youtube-nocookie.com/';
							}
							else {
								url += 'www.youtube.com/';
							}

							url += 'embed/' + video;

							if ( this.getContentElement( 'youtubePlugin', 'chkRelated' ).getValue() === false )
							{
								url += '?rel=0';
								related = false;

							}

							if ( this.getContentElement( 'youtubePlugin', 'chkOlderCode' ).getValue() === true )
							{
								url = url.replace('embed/', 'v/');
								url = url.replace(/&/g, '&amp;');

								if (related === true)
								{
									url += '?';								
								}

								url += 'hl=pt_BR&amp;version=3';

								content = '<object width="' + width + '" height="' + height + '">';
								content += '<param name="movie" value="' + url + '"></param>';
								content += '<param name="allowFullScreen" value="true"></param>';
								content += '<param name="allowscriptaccess" value="always"></param>';
								content += '<embed src="' + url + '" type="application/x-shockwave-flash" ';
								content += 'width="' + width + '" height="' + height + '" allowscriptaccess="always" ';
								content += 'allowfullscreen="true"></embed>';
								content += '</object>';
							}
							else {
								content = '<iframe width="' + width + '" height="' + height + '" src="' + url + '" ';
								content += 'frameborder="0" allowfullscreen></iframe>';	
							}
						}

						var instance = this.getParentEditor();
						instance.insertHtml( content );
					}
				};
			});
		}
	});
})();


/**
 * JavaScript function to match (and return) the video Id 
 * of any valid Youtube Url, given as input string.
 * @author: Stephan Schmitz <eyecatchup@gmail.com>
 * @url: http://stackoverflow.com/a/10315969/624466
 */
function ytVidId( url )
{
	var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
	return ( url.match( p ) ) ? RegExp.$1 : false;
}
