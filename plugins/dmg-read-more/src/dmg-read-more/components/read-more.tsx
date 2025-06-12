import { InspectorControls } from '@wordpress/block-editor';
import {
	Animate,
	Button,
	CheckboxControl,
	TextControl,
	PanelBody,
	PanelRow,
} from '@wordpress/components';
import { select } from '@wordpress/data';
import { useEntityRecords } from '@wordpress/core-data';
import { useState } from '@wordpress/element';
import type { ReactNode, KeyboardEvent } from 'react';
import type { Post, SearchArgs } from '../types';
import { ReadMorePosts } from './read-more-posts';
import LoadingList from './loading-list';

type ReadMoreProps = {
	selectPost: ( post: Post ) => void;
	selectedPostId: number;
};

export default function ReadMore( {
	selectPost,
	selectedPostId,
}: ReadMoreProps ) {
	// Initialise date range we'll use to restrict the default search.
	const twoYearsAgo = new Date();
	twoYearsAgo.setFullYear( twoYearsAgo.getFullYear() - 2 );
	const twoYearsAgoISOPrefix = twoYearsAgo.toISOString().split( 'T' )[ 0 ];
	const twoYearsAgoFormatted = twoYearsAgoISOPrefix + 'T00:00:00Z';

	// Base search args.
	const baseSearchArgs: SearchArgs = {
		_fields: [ 'id', 'title', 'link' ],
		per_page: 10,
		search: '',
		after: twoYearsAgoFormatted,
	};

	// Get ID of current post so we can exclude it.
	const currentPostId = select( 'core/editor' ).getCurrentPostId();
	if ( currentPostId ) {
		baseSearchArgs.exclude = currentPostId;
	}

	const [ searchTerm, setSearchTerm ] = useState( '' );
	const [ searchArgs, setSearchArgs ] = useState( baseSearchArgs );
	const [ searchRecent, setSearchRecent ] = useState( true );

	// We don't need to memoize searchArgs: useEntityRecords changes it into a string
	// internally, to avoid unnecessary repetition of requests because of changed
	// object references.
	const postsResult = useEntityRecords( 'postType', 'post', searchArgs );

	/**
	 * Check if the search term is a number. If so, set the `include` search arg
	 * to find a post by ID. Otherwise, set the `search` arg to search by string.
	 *
	 * @param searchStringOrNumber
	 */
	function setSearchOrIdArgs( searchStringOrNumber: string | number ) {
		const newSearchArgs = { ...baseSearchArgs };

		if ( ! searchRecent ) {
			delete newSearchArgs.after;
		}

		if (
			searchStringOrNumber !== '' &&
			Number.isInteger( Number( searchStringOrNumber ) )
		) {
			setSearchArgs( {
				...newSearchArgs,
				include: Number( searchStringOrNumber ),
			} );
		} else {
			setSearchArgs( {
				...newSearchArgs,
				search: searchStringOrNumber as string,
			} );
		}
	}

	/**
	 * Handle keydown event so user can clear input or initiate search
	 * using keyboard.
	 *
	 * @param e
	 */
	const handleKeyDown = ( e: KeyboardEvent< HTMLInputElement > ) => {
		if ( e.key === 'Enter' ) {
			setSearchOrIdArgs( searchTerm );
		} else if ( e.key === 'Escape' ) {
			setSearchTerm( '' );
		}
	};

	/**
	 * Handle click on the search button.
	 */
	const handleSearchButtonClick = () => {
		setSearchOrIdArgs( searchTerm );
	};

	/**
	 * Handle click on a pagination button. Change search args to request
	 * the specified page.
	 *
	 * @param pageNumber
	 */
	const handlePaginationClick = ( pageNumber: number ) => {
		setSearchArgs( { ...searchArgs, page: pageNumber } );
	};

	/**
	 * Handle click on checkbox that restricts search to the last two years,
	 * or removes that limit.
	 */
	const handleCheckboxChange = () => {
		const newSearchRecent = ! searchRecent;
		setSearchRecent( newSearchRecent );

		const updatedArgs = { ...searchArgs };

		// We always reset to page 1 when the filter is toggled.
		updatedArgs.page = 1;

		if ( newSearchRecent ) {
			updatedArgs.after = twoYearsAgoFormatted;
		} else {
			delete updatedArgs.after;
		}

		setSearchArgs( updatedArgs );
	};

	let postsList: ReactNode;

	if ( postsResult?.isResolving ) {
		postsList = (
			<PanelRow className="read-more__posts read-more__posts--loading">
				<Animate type="loading">
					{ ( { className } ) => (
						<LoadingList className={ className } />
					) }
				</Animate>
			</PanelRow>
		);
	} else if ( postsResult?.hasResolved ) {
		postsList = (
			<PanelRow className="read-more__posts">
				<ReadMorePosts
					posts={ postsResult?.records as Post[] }
					totalPages={ postsResult.totalPages }
					handlePaginationClick={ handlePaginationClick }
					currentPage={ searchArgs?.page || 1 }
					selectPost={ selectPost }
					selectedPostId={ selectedPostId }
				/>
			</PanelRow>
		);
	} else {
		postsList = (
			<PanelRow className="read-more__posts">
				<p>Error finding posts.</p>
			</PanelRow>
		);
	}

	return (
		<InspectorControls>
			<PanelBody>
				<PanelRow className="read-more__inputs">
					<TextControl
						onChange={ ( value ) => setSearchTerm( value ) }
						value={ searchTerm }
						className="read-more__search-input"
						help="Enter term or post ID and click Search button to find posts."
						onKeyDown={ handleKeyDown }
					/>
					<Button
						variant="secondary"
						onClick={ handleSearchButtonClick }
						text="Search"
						isBusy={ postsResult?.isResolving }
					/>
				</PanelRow>
				<PanelRow className="read-more__checkbox">
					<CheckboxControl
						__nextHasNoMarginBottom
						checked={ searchRecent }
						label="Search last two years only"
						onChange={ handleCheckboxChange }
					/>
				</PanelRow>
				{ postsList }
			</PanelBody>
		</InspectorControls>
	);
}
