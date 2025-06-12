export type Post = {
	id: number;
	link: string;
	title: {
		raw: string;
		rendered: string;
	};
};

export type SearchArgs = {
	_fields?: string[];
	per_page?: number;
	search?: string;
	include?: number;
	exclude?: number;
	page?: number;
	after?: string;
};
