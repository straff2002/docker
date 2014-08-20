FROM ubuntu:14.04
MAINTAINER Felix Böhm <felix@webhippie.de>

RUN echo "deb http://archive.ubuntu.com/ubuntu precise main universe" >> /etc/apt/sources.list
RUN apt-get -y update

RUN apt-get install -y apache2 php5 php5-gd php-xml-parser php5-intl php5-sqlite smbclient curl libcurl3 php5-curl bzip2 wget mysql-client php5-mysql

RUN wget -O - https://download.owncloud.org/community/owncloud-7.0.1.tar.bz2 | tar jx -C /var/www/html/
RUN chown -R www-data:www-data /var/www/html/owncloud

ADD ./001-owncloud.conf /etc/apache2/sites-available/
RUN ln -s /etc/apache2/sites-available/001-owncloud.conf /etc/apache2/sites-enabled/

RUN a2enmod rewrite

# Copy startup script
ADD ./startup.sh /opt/startup.sh
RUN chmod +x /opt/startup.sh

RUN /usr/sbin/apache2ctl start
# Will be done in startup script

EXPOSE :80

CMD ["/bin/bash", "/opt/startup.sh"]
