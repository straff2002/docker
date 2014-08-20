FROM mmckeen/opensuse-13-1
MAINTAINER Matthew McKeen <matthew@mmckeen.net>

RUN zypper -n ref
RUN zypper -n up

# add ownCloud repo + PHP extensions repo and install

RUN zypper ar -f -c http://download.opensuse.org/repositories/isv:/ownCloud:/community/openSUSE_13.1/isv:ownCloud:community.repo

RUN zypper ar -f -c http://download.opensuse.org/repositories/server:/php:/extensions/openSUSE_13.1/server:php:extensions.repo

RUN zypper -n --gpg-auto-import-keys ref

RUN zypper -n in owncloud glibc-locale php5-APC

RUN zypper -n in php5-fileinfo

# expose HTTP and HTTPS
EXPOSE 80
EXPOSE 443

# set owncloud permissions
RUN chown -R wwwrun:www /srv/www/htdocs/owncloud

# enable mod_php5
RUN a2enmod php5

# start Apache
CMD /usr/sbin/start_apache2 -D SYSTEMD -DFOREGROUND -k start

# Note that we do not start any database.
# If you want to use a database other than
# sqlite, I would suggest using another
# container and my mmckeen/mariadb image.
