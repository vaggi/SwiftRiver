<?php defined('SYSPATH') or die('No direct script access');
/**
 * Initializes the SwiftRiver environment
 *
 * PHP version 5
 * LICENSE: This source file is subject to GPLv3 license 
 * that is available through the world-wide-web at the following URI:
 * http://www.gnu.org/copyleft/gpl.html
 * @author     Ushahidi Team <team@ushahidi.com> 
 * @package	   SwiftRiver - http://github.com/ushahidi/Swiftriver_v2
 * @subpackage Cookie config
 * @copyright  Ushahidi - http://www.ushahidi.com
 * @license    http://www.gnu.org/copyleft/gpl.html GNU General Public License v3 (GPLv3) 
 */

class Swiftriver {

	/**
	 * Default salt value to add to the cookies
	 */
	const DEFAULT_COOKIE_SALT = 'cZjO0Lgfv7QrRGiG3XZJZ7fXuPz0vfcL';

	// Cookie name constants
	const COOKIE_SEARCH_TERM = "search_term";
	const COOKIE_SEARCH_SCOPE = "search_scope";
	const COOKIE_PREVIOUS_SEARCH_SCOPE = "previous_search_scope";
	const COOKIE_SEARCH_ITEM_ID = "search_item_id";

	/**
	 * Application initialization
	 *     - Loads the plugins
	 *     - Sets the cookie configuration
	 */
	public static function init()
	{
		// Load the plugins
		Swiftriver_Plugins::load();

		// Add the current default theme to the list of modules
		$theme = ORM::factory('setting')->where('key', '=', 'site_theme')
		    ->find();

		if
		(
			$theme->loaded() AND ! empty($theme->value) AND
			$theme->value != "default"
		)
		{
			Kohana::modules(array_merge(
				array('themes/'.$theme->value => THEMEPATH.$theme->value),
				Kohana::modules()
			));
		}

		// Clean up
		unset ($active_plugins, $theme);

		// Load the cookie configuration
		$cookie_config = Kohana::$config->load('cookie');
		
		Cookie::$httponly = TRUE;
		Cookie::$salt = $cookie_config->get('salt') OR Swiftriver::DEAFULT_COOKIE_SALT;
		Cookie::$domain = $cookie_config->get('domain') OR '';
		Cookie::$secure = $cookie_config->get('secure') OR FALSE;
		Cookie::$expiration = $cookie_config->get('expiration') OR 0;
	}

}