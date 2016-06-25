<?php
/**
 * DokuWiki Plugin contentassist (Syntax Component)
 *
 * @license GPL 2 http://www.gnu.org/licenses/gpl-2.0.html
 * @author  Vitor Teixeira <vitorF24@gmail.com>
 */

// must be run within Dokuwiki
if(!defined('DOKU_INC')) die();
if(!defined('DOKU_PLUGIN')) define('DOKU_PLUGIN',DOKU_INC.'lib/plugins/');
require_once (DOKU_PLUGIN . 'action.php');
require_once (DOKU_INC . 'inc/html.php');
require_once (DOKU_INC . 'inc/parserutils.php');

class action_plugin_contentassist extends DokuWiki_Action_Plugin {

    /**
     * Registers a callback function for a given event
     *
     * @param Doku_Event_Handler $controller DokuWiki's event controller object
     * @return void
     */
    function register( Doku_Event_Handler $controller) {
        $controller->register_hook('AJAX_CALL_UNKNOWN', 'BEFORE',  $this, '_ajax_call');
    }

    /**
     * [Custom event handler which performs action]
     *
     * @param Doku_Event $event  event object by reference
     * @param mixed      $param  [the parameters passed as fifth argument to register_hook() when this
     *                           handler was registered]
     * @return void
     */

    function _ajax_call(&$event, $param)
    {
        if ($event->data !== 'autocomplete_pageCnt') {
            return;
        }

        //no other ajax handlers needed 
        $event->stopPropagation();
        $event->preventDefault();

        //input parameters  
        global $INPUT;

        $pageid =$INPUT->str('pageid');

        $data = array();
        $out="";

        $out=$this->tpl_include_page($pageid);
        $data["content"]= $out;

        //json library of DokuWiki
        require_once DOKU_INC . 'inc/JSON.php';
        $json = new JSON();
        //set content type
        header('Content-Type: application/json');
        if($_GET["callback"]){
            echo $_GET["callback"]."(".$json->encode($data).")";
        }else {
            echo $json->encode($data);
        }
    }

    function tpl_include_page($pageid, $propagate = false) {
        if (!$pageid) return false;
        if ($propagate) $pageid = page_findnearest($pageid);

        global $TOC;
        $oldtoc = $TOC;
        $html   = p_wiki_xhtml($pageid, '', false);
        $TOC    = $oldtoc;

        return $html;
    }

}

// vim:ts=4:sw=4:et:
