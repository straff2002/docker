#!/bin/bash

mkdir -p -m 0700 /etc/httpd/ssl
cd /etc/httpd/ssl
openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout sintsyncfe1.int.ucid.ch.key -out sintsyncfe1.int.ucid.ch.crt
chmod 0700 /etc/httpd/ssl/*.key