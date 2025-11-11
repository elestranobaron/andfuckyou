<?php
/**
 * Second Coming - Matrix Style FSE Child Theme
 */

function secondcoming_setup() {
    add_theme_support('title-tag');
    add_theme_support('automatic-feed-links');
    add_theme_support('post-thumbnails');
    add_theme_support('wp-block-styles');
    add_theme_support('align-wide');
    add_theme_support('custom-logo', array(
        'height'      => 60,
        'width'       => 200,
        'flex-height' => true,
        'flex-width'  => true
    ));
    add_theme_support('custom-background');
    add_theme_support('html5', array('search-form','comment-form','comment-list','gallery','caption'));
}
add_action('after_setup_theme', 'secondcoming_setup');

$version = wp_get_theme()->get('Version');

function secondcoming_enqueue_scripts() {
    global $version;
    wp_enqueue_style('secondcoming-style', get_stylesheet_uri(), array(), $version);
    wp_enqueue_script('secondcoming-nav', get_stylesheet_directory_uri() . '/js/nav.js', array('jquery'), $version, true);
    wp_enqueue_script('secondcoming-matrix-rain', get_stylesheet_directory_uri() . '/js/matrix-rain.js', array(), $version, true);
}
add_action('wp_enqueue_scripts', 'secondcoming_enqueue_scripts');

function secondcoming_leaflet_assets() {
    global $version;
    wp_enqueue_style('leaflet-css', get_stylesheet_directory_uri() . '/assets/css/leaflet.css', array(), '1.9.4');
    wp_enqueue_script('leaflet-js', get_stylesheet_directory_uri() . '/assets/js/leaflet.js', array(), '1.9.4', true);
    wp_enqueue_script('leaflet-gesture', get_stylesheet_directory_uri() . '/assets/js/leaflet-gesture-handling.min.js', array('leaflet-js'), '1.2.2', true);
    wp_enqueue_script('secondcoming-map', get_stylesheet_directory_uri() . '/js/map.js', array('leaflet-js'), $version, true);

    wp_localize_script('secondcoming-map', 'secondcoming_map_data', array(
        'lat'     => '42.68833',
        'lon'     => '2.92066',
        'title'   => get_bloginfo('name'),
        'siteUrl' => home_url(),
    ));
}
add_action('wp_enqueue_scripts', 'secondcoming_leaflet_assets');

function secondcoming_register_menus() {
    register_nav_menus(array(
        'primary-menu' => __('Primary Menu', 'second-coming'),
        'footer-menu'  => __('Footer Menu', 'second-coming')
    ));
}
add_action('init', 'secondcoming_register_menus');

// Fix preload
add_filter('wp_resource_hints', 'secondcoming_remove_unused_preloads', 10, 2);
function secondcoming_remove_unused_preloads($urls, $relation_type) {
    if ('preload' === $relation_type) {
        $urls = array_filter($urls, function($url) {
            return !str_contains($url, 'dom-ready.min.js') && !str_contains($url, 'a11y.min.js');
        });
    }
    return $urls;
}

// Copyright filter
add_filter('render_block', 'secondcoming_copyright_filter', 10, 2);
function secondcoming_copyright_filter($block_content, $parsed_block) {
    if (!empty($parsed_block['attrs']['className']) && strpos($parsed_block['attrs']['className'], 'footer__copyright') !== false) {
        $year = date('Y');
        $site_title = get_bloginfo('name');
        $block_content = '<p class="has-text-align-center footer__copyright">© ' . $year . ' ' . esc_html($site_title) . '</p>';
    }
    return $block_content;
}
