import { useBlockProps } from '@wordpress/block-editor';
import { useCallback } from '@wordpress/element';
import ReadMore from './components/read-more';
import './editor.scss';

function SelectedPost( { id, title, url } ) {
	if ( ! id ) {
		return <p>DMG Read More – find a post using the form in the sidebar.</p>;
	}

	return (
		<p className="dmg-read-more">
			<span>Read More:</span> <a href={ url }>{ title ?? 'Untitled' }</a>
		</p>
	);
}

export default function Edit( { attributes, setAttributes } ) {
	const blockProps = useBlockProps();

	const selectPost = useCallback( ( post ) => {
		setAttributes( {
			postId: post.id,
			postTitle: post.title.rendered,
			postUrl: post.link,
		} );
	}, [ setAttributes ] );

	return (
		<div { ...blockProps }>
			<ReadMore selectPost={ selectPost } selectedPostId={ attributes?.postId } />
			<SelectedPost
				id={ attributes?.postId }
				title={ attributes?.postTitle }
				url={ attributes?.postUrl }
			/>
		</div>
	);
}
