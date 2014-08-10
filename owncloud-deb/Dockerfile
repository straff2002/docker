FROM phusion/baseimage:latest

ENV HOME /root

RUN apt-get -y update
RUN apt-get install -y apache2 php5 php5-gd php-xml-parser php5-intl php5-mysqlnd php5-json php5-mcrypt smbclient curl libcurl3 php5-curl bzip2 wget
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN /etc/my_init.d/00_regen_ssh_host_keys.sh

RUN rm /var/www/html/index.html
RUN curl https://download.owncloud.org/community/owncloud-7.0.1.tar.bz2 | tar jx -C /var/www/html/
RUN chown -R www-data:www-data /var/www/html/owncloud

ADD ./001-owncloud.conf /etc/apache2/sites-available/
RUN ln -s /etc/apache2/sites-available/001-owncloud.conf /etc/apache2/sites-enabled/
RUN service apache2 restart


ADD rc.local /etc/rc.local
RUN chown root:root /etc/rc.local

ADD init_volume.sh /etc/my_init.d/init_volume.sh
RUN chmod +x /etc/my_init.d/init_volume.sh

EXPOSE 80
CMD ["/sbin/my_init"]