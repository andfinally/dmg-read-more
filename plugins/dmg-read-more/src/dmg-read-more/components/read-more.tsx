import { InspectorControls } from '@wordpress/block-editor';
import {
	Animate,
	Button,
	TextControl,
	PanelBody,
	PanelRow
} from '@wordpress/components';
import { select } from '@wordpress/data';
import { useEntityRecords } from '@wordpress/core-data';
import { useCallback, useState } from '@wordpress/element';
import type { Post, SearchArgs } from '../types';
import { ReadMorePosts } from './read-more-posts';
import { KeyboardEvent } from 'react';

type ReadMoreProps = {
	selectPost: ( post: Post ) => void;
	selectedPostId: number;
}

export default function ReadMore( { selectPost, selectedPostId }: ReadMoreProps ) {

	const baseSearchArgs: SearchArgs = {
		_fields: [ 'id', 'title', 'link' ],
		per_page: 10,
		search: ''
	};
	const currentPostId = select( 'core/editor' ).getCurrentPostId();
	if ( currentPostId ) baseSearchArgs.exclude = currentPostId;

	const [ searchTerm, setSearchTerm ] = useState( '' );
	const [ searchArgs, setSearchArgs ] = useState( baseSearchArgs );

	let postsResult = useEntityRecords(
		'postType',
		'post',
		searchArgs
	);

	function setSearchOrIdArgs( searchTerm: string | number ) {
		if ( searchTerm !== '' && Number.isInteger( Number( searchTerm ) ) ) {
			setSearchArgs( { ...baseSearchArgs, include: Number( searchTerm ) } );
		} else {
			setSearchArgs( { ...baseSearchArgs, search: searchTerm as string } );
		}
	}

	const handleKeyDown = useCallback( ( e: KeyboardEvent<HTMLInputElement> ) => {
		if ( e.key === 'Enter' ) {
			setSearchOrIdArgs( searchTerm );
		} else if ( e.key === 'Escape' ) {
			setSearchTerm( '' );
		}
	}, [ searchTerm, setSearchOrIdArgs ] );

	const handleSearchButtonClick = useCallback(
		() => {
			setSearchOrIdArgs( searchTerm );
		},
		[ searchTerm, setSearchOrIdArgs ] );

	const handlePaginationClick = useCallback(
		( pageNumber: number ) => {
			setSearchArgs( { ...searchArgs, page: pageNumber } );
		},
		[ searchArgs ]
	);

	const renderLoadingList = useCallback( ( { className } ) => (
		<div className={ className }>
			<ul>
				{ [ ...Array( 10 ) ].map( ( _, i ) => (
					<li key={ i } className="read-more__post" />
				) ) }
			</ul>
			<ul className="read-more__pagination" />
		</div>
	), [] );

	return (
		<InspectorControls>
			<PanelBody>
				<PanelRow className="read-more__inputs">
					<TextControl
						onChange={ value => setSearchTerm( value ) }
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
				{
					postsResult?.isResolving ? (
						<PanelRow className="read-more__posts read-more__posts--loading">
							<Animate type="loading">
								{ renderLoadingList }
							</Animate>
						</PanelRow>
					) : postsResult?.hasResolved ? (
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
					) : (
						<PanelRow className="read-more__posts">
							<p>Error finding posts.</p>
						</PanelRow>
					)
				}
			</PanelBody>
		</InspectorControls>
	);

}
