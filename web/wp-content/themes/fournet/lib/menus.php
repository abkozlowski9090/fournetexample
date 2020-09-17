<?php

/*
 *
 * Custom Menus
 *
 */

// Register your menus here.

	$locations = array(
		'Header Menu' => __( 'Header Menu', 'text_domain' ),
		'Footer Nav 1' => __( 'Footer Nav 1', 'text_domain' ),
		'Footer Nav 2' => __( 'Footer Nav 2', 'text_domain' ),
		'Footer Nav 3' => __( 'Footer Nav 3', 'text_domain' ),
		'Footer Nav 4' => __( 'Footer Nav 4', 'text_domain' ),
		'Footer Nav 5' => __( 'Footer Nav 5', 'text_domain' ),
	);
	register_nav_menus( $locations );
