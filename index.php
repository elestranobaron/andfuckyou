<?php
/**
 * Index template - FSE fallback
 */
get_header();
?>
<main id="primary" class="site-main">
    <?php
    if ( have_posts() ) :
        while ( have_posts() ) : the_post();
            ?>
            <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
                <h1><?php the_title(); ?></h1>
                <div><?php the_content(); ?></div>
                <?php wp_link_pages(); ?>
            </article>
            <?php
        endwhile;
    else :
        echo '<p>Aucun contenu.</p>';
    endif;
    ?>
</main>
<?php
get_footer();
