<?php
// This file is generated. Do not modify it manually.
return array(
	'dmg-read-more' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'dmg/read-more',
		'version' => '1.0.0',
		'title' => 'DMG Read More',
		'category' => 'widgets',
		'description' => 'Search for a published post and add a link to it in the post content.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false
		),
		'attributes' => array(
			'postId' => array(
				'type' => 'number'
			),
			'postTitle' => array(
				'type' => 'string'
			),
			'postUrl' => array(
				'type' => 'string'
			)
		),
		'textdomain' => 'dmg-read-more',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php'
	)
);
