import { Button } from '@wordpress/components';
import Pagination from './pagination';
import type { Post } from '../types';

type ReadMorePostsProps = {
	posts?: Array< Post >;
	totalPages: number;
	handlePaginationClick: ( pageNumber: number ) => void;
	currentPage: number;
	selectPost: ( post: Post ) => void;
	selectedPostId: number;
};

export function ReadMorePosts( {
	posts = [],
	totalPages = 0,
	handlePaginationClick,
	currentPage = 1,
	selectPost,
	selectedPostId = 0,
}: ReadMorePostsProps ) {
	if ( ! posts || posts.length === 0 ) {
		return <p>No posts found.</p>;
	}

	/**
	 * Select a post as the one we show in the block.
	 *
	 * @param post
	 */
	const createPostClickHandler = ( post: Post ) => () => selectPost( post );

	return (
		<>
			<ul>
				{ posts.map( ( post: Post ) => {
					return (
						<li
							key={ post.id }
							className={ `read-more__post ${
								post.id === selectedPostId
									? 'read-more__post--selected'
									: ''
							}` }
						>
							<Button
								onClick={ createPostClickHandler( post ) }
								onKeyDown={ ( e ) => {
									if ( e.key === 'Enter' || e.key === ' ' ) {
										createPostClickHandler( post )();
									}
								} }
								size="compact"
							>
								<span className="read-more__post-title">
									{ post.title.rendered }
								</span>
							</Button>
						</li>
					);
				} ) }
			</ul>
			<Pagination
				totalPages={ totalPages }
				handlePaginationClick={ handlePaginationClick }
				currentPage={ currentPage }
			/>
		</>
	);
}
