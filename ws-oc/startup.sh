# Give apache rights on data directory
chown www-data:www-data /data

# Start apache in foreground so that the docker container won't exit
/usr/sbin/apache2ctl -D FOREGROUND
