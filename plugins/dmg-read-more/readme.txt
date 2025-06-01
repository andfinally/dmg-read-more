=== DMG Read More ===
Contributors:      Andfinally
Tags:              block
Tested up to:      6.8
Stable tag:        1.0.0
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

Adds Gutenberg block allowing authors to search for a published post and add a link to it in the post content.

== Description ==

This plugin adds a Gutenberg block that allows authors to search for a published post in the post edit sidebar. On selecting a post from the results, the block places a link to the selected post in the post content.

The plugin also adds a WP-CLI command `wp dmg-read-more search` which searches published posts for posts that contain the block.

The plugin supports WordPress 6.6 and above.

== Installation ==

1. Upload the [plugin zip file](./dmg-read-more.zip) to your WordPress site.
2. Activate the plugin on the plugins page in WordPress admin.
3. Create or edit a post and search for `dmg/read-more` in the block picker.
4. Insert the block in the post. By default, you'll see a list of the latest published posts in the block settings.
5. Use the input in the block settings to search for another post. You can search by post ID as well as search string. If you uncheck the "Search last two years only" checkbox, you can search for older posts. Use the pagination buttons to page through the results.
6. When you click on a post in the search results, it will be set to be displayed in the parent post with a "Read More" label.
7. A WP-CLI command allows you to find posts which contain this block. You can pass `date-after` and `date-before` parameters. Without these, it will search posts published in the last 30 days. Example command: `wp-env run cli wp dmg-read-more search --date-after=2020-01-01`.

== Changelog ==

= 1.0.0 =
* Release
