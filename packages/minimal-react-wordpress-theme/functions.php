<?php

/**
 * Enable Featured Media
 */

add_theme_support('post-thumbnails');

/**
 * Add theme-specific Menu
 */
add_action('after_setup_theme', 'register_menus');

function register_menus() {
  register_nav_menu('primary', 'Primary Menu — appears in the header');
}

/**
 * Add filter to respond with next and previous post in post response
 */
add_filter('rest_prepare_post', function($response, $post, $request) {
  global $post;

  // Get the so-called next post.
  $next = get_adjacent_post( false, '', false );

  // Get the so-called previous post.
  $previous = get_adjacent_post( false, '', true );

  // Format them a bit and only send id and slug (or null, if there is no next/previous post).
  $response->data['prev'] = (is_a($next, 'WP_Post'))
    ? array("id" => $next->ID, "title" => $next->post_title)
    : null;

  $response->data['next'] = (is_a($previous, 'WP_Post'))
    ? array("id" => $previous->ID, "title" => $previous->post_title)
    : null;

  return $response;
}, 10, 3);
