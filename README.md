Netgen Content Browser user interface
=====================================

This repository contains the user interface for Netgen Content Browser.

Requirements
------------

* NodeJS
* NPM
* Grunt CLI (`npm install -g grunt-cli`)

Development build
-----------------

To build development assets and start watching files for changes, just run
Grunt without any arguments:

    ```
    $ npm install
    $ grunt
    ```

This will place all generated assets into `bundle/Resources/public/dev` folder.
Composer will be symlink this folder to `bundles/contentbrowserui/dev` inside
Symfony's webroot.

Production build
----------------

To build the production assets, run Grunt with the following:

    ```
    $ npm install
    $ grunt build
    ```

This will place all generated assets into `bundle/Resources/public` folder.
Composer will be symlink this folder to `bundles/contentbrowserui` inside
Symfony's webroot.
