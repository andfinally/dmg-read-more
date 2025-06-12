<?php

defined( 'WP_CLI' ) || exit;

class DMG_Read_More_CLI {

	/**
	 * Search for posts containing the DMG Read More block
	 * and output their IDs.
	 *
	 * ## OPTIONS
	 *
	 * [--date-after=<date>]
	 * : Search posts published after this date (YYYY-MM-DD format).
	 *
	 * [--date-before=<date>]
	 * : Search posts published before this date (YYYY-MM-DD format).
	 *
	 * [--format=<format>]
	 * : Output format (default or csv). csv outputs a comma-separated list of IDs for easy reuse.
	 *
	 * Where no date after is specified, we default to 30 days ago.
	 * Where no date before is specified, we default to today.
	 *
	 * ## EXAMPLES
	 *
	 *     wp dmg-read-more search
	 *     wp dmg-read-more search --date-after=2023-01-01 --date-before=2023-12-31
	 *     wp dmg-read-more search --format=csv
	 */
	public function search( $args, $assoc_args ) {
		$date_after    = $assoc_args['date-after'] ?? date( 'Y-m-d', strtotime( '-30 days' ) );
		$date_before   = $assoc_args['date-before'] ?? date( 'Y-m-d' );
		$output_format = $assoc_args['format'] ?? 'default';
		$csv_mode      = ( $output_format === 'csv' );

		// Validate date inputs.
		if ( ! $this->validate_date( $date_after ) || ! $this->validate_date( $date_before ) ) {
			WP_CLI::error( 'Invalid date format. Please use YYYY-MM-DD.' );

			return;
		}

		global $wpdb;

		// Clear any previous DB error.
		$wpdb->last_error = '';

		$batch_size  = 1000;
		$total_found = 0;
		$start_time  = microtime( true );

		if ( ! $csv_mode ) {
			WP_CLI::log( "Searching posts from $date_after to $date_before..." );
			WP_CLI::line( '' );
		}

		$last_id      = 0;
		$batch_number = 0;
		$all_post_ids = []; // Only used in CSV mode.

		do {
			$batch_number ++;

			// We batch queries to limit memory usage and avoid DB timeouts.
			// With large datasets, keyset pagination is faster than pagination with LIMIT/OFFSET.
			//
			// Direct DB query with $wpdb avoids the overhead of WP_Query, which
			// triggers hooks and filters and often builds complex queries to get terms etc.
			$query = $wpdb->prepare(
				"SELECT ID FROM $wpdb->posts
			            WHERE post_type = 'post'
			            AND post_status = 'publish'
			            AND post_date BETWEEN %s AND %s
			            AND post_content LIKE %s
			            AND ID > %d
			            ORDER BY ID ASC
			            LIMIT %d",
				$date_after . ' 00:00:00',
				$date_before . ' 23:59:59',
				'%<!-- wp:dmg/read-more%',
				$last_id,
				$batch_size
			);

			$post_ids = $wpdb->get_col( $query );

			// Handle database errors.
			if ( $wpdb->last_error ) {
				WP_CLI::error( 'Database error: ' . $wpdb->last_error );

				return;
			}

			$found       = count( $post_ids );
			$total_found += $found;

			if ( $found > 0 ) {
				if ( $csv_mode ) {
					// In CSV mode, collect all IDs.
					$all_post_ids = array_merge( $all_post_ids, $post_ids );
				} else {
					// Output IDs immediately instead of storing them. Uses less memory.
					foreach ( $post_ids as $post_id ) {
						WP_CLI::log( $post_id );
					}

					WP_CLI::log( sprintf(
						"--- Batch %d: Found %d posts (total found: %d) ---",
						$batch_number,
						$found,
						$total_found
					) );
				}

				$last_id = end( $post_ids );
			}

			// Free memory.
			unset( $post_ids );

		} while ( $found === $batch_size );

		$elapsed = microtime( true ) - $start_time;

		if ( $csv_mode && ! empty( $all_post_ids ) ) {
			// Output all IDs as a comma-separated list.
			WP_CLI::line( implode( ',', $all_post_ids ) );
		}

		WP_CLI::line( '' );

		if ( $total_found === 0 ) {
			WP_CLI::log( 'No posts found containing the DMG Read More block.' );
		} else {
			WP_CLI::success( sprintf(
				'Found %d posts containing the DMG Read More block in %.2f seconds.',
				$total_found,
				$elapsed
			) );
		}
	}

	/**
	 * Validate date format (YYYY-MM-DD)
	 *
	 * @param string $date
	 *
	 * @return bool
	 */
	private function validate_date( $date ) {
		return preg_match( '/^\d{4}-\d{2}-\d{2}$/', $date ) === 1;
	}
}

WP_CLI::add_command( 'dmg-read-more', 'DMG_Read_More_CLI' );
