Overview
========

Acceptance tests for ownCloud with protractor.
Run test suites on local ownCloud installation or ownCloud docker container.
Development of docker images for scaleable ownCloud installations.

Run with Docker
===============

build-docker.sh
---------------

Build all docker images in folder ```images```
Images: 

* ```oc-apache``` ownCloud running in apache
* ```oc-nginx``` ownCloud running in nginx
* ```db-mysql``` mysql container
* ```data-vol``` data persistence container

start-docker.sh
---------------

Runs ownCloud in docker container "oc-test" with selected server, db and data volumne.
TODO: make selectable with arguments

octest-docker.sh
----------------

Run the test suites on the ownCloud instance in "oc-test" docker container.

Run without Docker
==================

ocsetup.sh
----------

Setup script for ownCloud in folder ```www``` with a given name.
The downloaded install packages are cached in folder ```source-cache``` for speedup.

octest.sh
---------

Setup new ownCloud instance with ocsetup.sh and run the test suites.

ocspawn.sh
----------

Spawn multiple instances of ownCloud in docker containers.
Simple ownCloud container with a autoconfig for sqlite.
Basic multi tenant and scaling approach.
TODO: Setup loadbalancer

