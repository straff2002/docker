#/bin/bash

set -x

touch /var/lib/mysql/before
if [ ! -f /var/lib/mysql/ibdata1 ]; then	# reinstall the database if necessary
	mysql_install_db					# install data directory
	/usr/bin/mysqld_safe &				# start mysql to make necessary changes

	until $(mysqladmin ping > /dev/null 2>&1)
	do
		: # wait until mysql is up and running
	done

	# set mysql root password and grant privileges
	USER=root
	PASS=somerootpassword
	mysqladmin -u $USER password $PASS
	mysql -u $USER -p$PASS << EOF

CREATE DATABASE owncloud;
GRANT USAGE ON *.* TO 'owncloud'@'%' IDENTIFIED BY 'password';
GRANT ALL PRIVILEGES ON owncloud.* TO 'owncloud'@'%';
FLUSH PRIVILEGES;

EOF

	touch /var/lib/mysql/installed

	# restart mysql to be safe
	mysqladmin -u $USER -p$PASS shutdown
else
	touch /var/lib/mysql/notinstalled
fi

/usr/bin/mysqld_safe

