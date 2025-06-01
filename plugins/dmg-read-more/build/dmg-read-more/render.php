<?php

/**
 * We make this a dynamic block to make sure we always show the latest title and URL of the selected post,
 * even if they change after it's selected in the block.
 */

if ( ! empty( $attributes['postId'] ) ) {
	$post = get_post( (int) $attributes['postId'] );

	if ( $post ) {
		$post_title               = $post->post_title;
		$post_url                 = get_permalink( $post );
		$block_wrapper_attributes = get_block_wrapper_attributes( array( 'class' => 'dmg-read-more' ) );

		if ( empty( $post_title ) || empty( $post_url ) ) {
			echo '<!-- dmg/read-more block skipped: missing title or URL from post ' . (int) $post->ID . ' -->';

			return;
		}

		echo '<p ' . $block_wrapper_attributes . ' data-read-more-post-id="' . (int) $post->ID . '">
			<span>Read More:</span> <a href="' . esc_url( $post_url ) . '">' . esc_html( $post_title ) . '</a>
		</p>';
	}
}
