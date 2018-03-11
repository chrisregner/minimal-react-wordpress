<?php

add_theme_support( 'post-thumbnails' );

add_action('after_setup_theme', 'register_menus');

function register_menus() {
  register_nav_menu('primary', 'Primary Menu — appears in the header');
}
