<?php

// If the Timber plugin isn't activated, print a notice in the admin.
if ( ! class_exists( 'Timber' ) ) {
	add_action( 'admin_notices', function() {
			echo '<div class="error"><p>Timber not activated. Make sure you activate the plugin in <a href="' . esc_url( admin_url( 'plugins.php#timber' ) ) . '">' . esc_url( admin_url( 'plugins.php' ) ) . '</a></p></div>';
		} );
	return;
}


// Create our version of the TimberSite object
class StarterSite extends TimberSite {

	// This function applies some fundamental WordPress setup, as well as our functions to include custom post types and taxonomies.
	function __construct() {
		show_admin_bar( false );
		add_theme_support( 'post-formats' );
		add_theme_support( 'post-thumbnails' );
		add_theme_support( 'menus' );
		add_filter( 'timber_context', array( $this, 'add_to_context' ) );
		add_filter( 'get_twig', array( $this, 'add_to_twig' ) );
		add_image_size('large-square', 1200, 1200, true);
		add_image_size('medium-square', 600, 600, true);
		add_image_size('medium-long', 800, 850, true);
		add_image_size('wide-image', 1200, 800, true);
		add_action( 'init', array( $this, 'register_post_types' ) );
		add_action( 'init', array( $this, 'register_taxonomies' ) );
		add_action( 'init', array( $this, 'register_menus' ) );
		add_action( 'init', array( $this, 'register_widgets' ) );
		parent::__construct();
	}


	// Abstracting long chunks of code.

	// The following included files only need to contain the arguments and register_whatever functions. They are applied to WordPress in these functions that are hooked to init above.

	// The point of having separate files is solely to save space in this file. Think of them as a standard PHP include or require.

	function register_post_types(){
		require('lib/custom-types.php');
	}

	function register_taxonomies(){
		require('lib/taxonomies.php');
	}

	function register_menus(){
		require('lib/menus.php');
	}

	function register_widgets(){
		require('lib/widgets.php');
	}


	// Access data site-wide.

	// This function adds data to the global context of your site. In less-jargon-y terms, any values in this function are available on any view of your website. Anything that occurs on every page should be added here.

	function add_to_context( $context ) {

		// Our menu occurs on every page, so we add it to the global context.
		$context['menu'] = new  Timber\Menu("Header Menu");
		// $context['footer_menu'] = new  Timber\Menu("Footer Menu");

		// Footer navs - split into 4 columns
		$context['footer_nav_i'] = new TimberMenu('Footer Nav 1');
		$context['footer_nav_ii'] = new TimberMenu('Footer Nav 2');
		$context['footer_nav_iii'] = new TimberMenu('Footer Nav 3');
		$context['footer_nav_iv'] = new TimberMenu('Footer Nav 4');
		$context['footer_nav_v'] = new TimberMenu('Footer Nav 5');

		// Add SVG revision hash to context
		if(file_exists(get_stylesheet_directory().'/assets/images/icons.svg')) {
			$context['svg_sprite_version'] = hash_file('crc32', (get_stylesheet_directory().'/assets/images/icons.svg'));
		}

		$context['options'] = get_fields('option');

		// Latest News
			$args = array(
				'post_type' 		=> 'post',
				'posts_per_page'	=> 4,
			);
			$context['latest_news'] = Timber::get_posts($args);

		// This 'site' context below allows you to access main site information like the site title or description.
		$context['site'] = $this;
		return $context;
	}

	// Here you can add your own fuctions to Twig. Don't worry about this section if you don't come across a need for it.
	// See more here: http://twig.sensiolabs.org/doc/advanced.html
	function add_to_twig( $twig ) {
		$twig->addExtension( new Twig_Extension_StringLoader() );
		$twig->addFilter( 'myfoo', new Twig_Filter_Function( 'myfoo' ) );
		return $twig;
	}

}

new StarterSite();


/*
 *
 * My Functions (not from Timber)
 *
 */

// Enqueue scripts
function my_scripts() {

	// Use jQuery from a CDN
	wp_deregister_script('jquery');
	wp_register_script('jquery', '//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js', array(), null, true);

	$cssVers = 1.0;
	if(file_exists(get_stylesheet_directory().'/assets/stylesheets/main.css')) {
		$cssVers = hash_file('crc32', (get_stylesheet_directory().'/assets/stylesheets/main.css'));
	}
	$jsVers = 1.0;
	if(file_exists(get_stylesheet_directory().'/assets/javascripts/app.js')) {
		$jsVers = hash_file('crc32', (get_stylesheet_directory().'/assets/javascripts/app.js'));
	}

	wp_enqueue_style( 'my-styles', get_template_directory_uri() . '/assets/stylesheets/main.css', false, $cssVers );
	wp_enqueue_script( 'polyfill', 'https://cdn.polyfill.io/v2/polyfill.min.js', array(), null, true );
	wp_enqueue_script( 'my-js', get_template_directory_uri() . '/assets/javascripts/app.js', array('polyfill'), $jsVers, true );

}

add_action( 'wp_enqueue_scripts', 'my_scripts' );

// Force Yoast metabox to be low priority
add_filter( 'wpseo_metabox_prio', function() { return 'low'; });
// REmove emoji stuff
remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
remove_action( 'wp_print_styles', 'print_emoji_styles' );
remove_action( 'admin_print_styles', 'print_emoji_styles' );
add_action('admin_init', 'disable_editor_features');

function disable_editor_features() {
	remove_post_type_support( 'page', 'editor' );
	remove_post_type_support( 'page', 'thumbnail' );
	remove_post_type_support( 'post', 'editor' );
}

//-----------------------------------------------------------
// Custom WP Styles
//-----------------------------------------------------------
function custom_acf_repeater_colors() {
     wp_enqueue_style( 'acf-uber-styles', get_template_directory_uri() . '/assets/stylesheets/wpstyles.css' );
}
add_action('admin_head', 'custom_acf_repeater_colors');


//-----------------------------------------------------------
// Options Pages
//-----------------------------------------------------------
if( function_exists('acf_add_options_page') ) {
	acf_add_options_page(array(
		'page_title' 	=> 'Global Content',
		'menu_title'	=> 'Global Content',
		'menu_slug' 	=> 'global_content',
		'capability'	=> 'edit_posts',
		'redirect'		=> false
	));
	acf_add_options_page(array(
		'page_title' 	=> 'Benefits Overview Page',
		'menu_title'	=> 'Benefits Overview Page',
		'menu_slug' 	=> 'benefits_page',
		'capability'	=> 'edit_posts',
		'redirect'		=> false
	));
	acf_add_options_page(array(
		'page_title' 	=> 'Sectors Overview Page',
		'menu_title'	=> 'Sectors Overview Page',
		'menu_slug' 	=> 'sectors_page',
		'capability'	=> 'edit_posts',
		'redirect'		=> false
	));
}

//-----------------------------------------------------------
// Update SVG filepath for ACF - SVG plugin
//-----------------------------------------------------------
add_filter( 'acf_svg_icon_filepath', 'bea_svg_icon_filepath' );
function bea_svg_icon_filepath( $filepath ) {
    if ( is_file( get_stylesheet_directory() . '/assets/images/icons.svg' ) ) {
        $filepath[] = get_stylesheet_directory() . '/assets/images/icons.svg';
    }
    return $filepath;
}
remove_filter('template_redirect', 'redirect_canonical');

// Change "Solutions" relationship field to only show sub-pages
function change_solutions_relationship_field( $args, $field, $post_id ) {
	$args['post_parent'] = get_page_by_path('solutions-and-services')->ID;
	return $args;
}
// filter for a specific field based on it's name
add_filter('acf/fields/relationship/query/key=field_5e7b25d216859', 'change_solutions_relationship_field', 10, 3);


function cc_mime_types($mimes) {
 $mimes['svg'] = 'image/svg+xml';
 return $mimes;
}
add_filter('upload_mimes', 'cc_mime_types');



/**
 * Manually enqueue Contact Form 7 plugin scripts (CSS & JS) for a WordPress website
 *
 * @author   Golden Oak Web Design <info@goldenoakwebdesign.com>
 * @license  https://www.gnu.org/licenses/gpl-2.0.html GPLv2+
 */
if( class_exists( 'WPCF7' ) ) {
  function manually_enqueue_wpcf7_scripts() {
    if( get_post_type() == 'jobs' ) {
      if( function_exists( 'wpcf7_enqueue_scripts' ) ) {
        wpcf7_enqueue_scripts();
      }
      if( function_exists( 'wpcf7_enqueue_styles' ) ) {
        wpcf7_enqueue_styles();
      }
    }
  }
  add_filter( 'wpcf7_load_js', '__return_false' ); // Disable CF7 JavaScript
  add_filter( 'wpcf7_load_css', '__return_false' ); // Disable CF7 CSS
  add_action( 'wp_enqueue_scripts', 'manually_enqueue_wpcf7_scripts' );
}


function youtube_embed_wrapper($html, $url, $attr, $post_id) {

    if (strpos($html, 'youtube') !== false) {
        return '<div class="fluid-width-youtube">' . $html . '</div>';
    }

    return $html;
}

add_filter('embed_oembed_html', 'youtube_embed_wrapper', 10, 4);
