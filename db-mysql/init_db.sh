#/bin/bash

VOLUME_HOME="/var/lib/mysql"

if [[ ! -d $VOLUME_HOME/mysql ]]; then
    echo "=> An empty or uninitialized MySQL volume is detected in $VOLUME_HOME"
    echo "=> Installing MySQL ..."
    mysql_install_db > /dev/null 2>&1
    echo "=> Done!"  
    /create_mysql_admin_user.sh
else
    echo "=> Using an existing volume of MySQL"
fi

exec mysqld_safe

/usr/bin/mysqld_safe > /dev/null 2>&1 &

echo "=> Creating database owncloud"
RET=1
while [[ RET -ne 0 ]]; do
	sleep 5
	mysql -uroot -e "CREATE DATABASE owncloud"
	RET=$?
done

mysqladmin -uroot shutdown

echo "=> Done!"


/usr/bin/mysqld_safe > /dev/null 2>&1 &

RET=1
while [[ RET -ne 0 ]]; do
    echo "=> Waiting for confirmation of MySQL service startup"
    sleep 5
    mysql -uroot -e "status" > /dev/null 2>&1
    RET=$?
done

mysql -uroot -e "CREATE USER 'owncloud'@'%' IDENTIFIED BY 'owncloud'"
mysql -uroot -e "GRANT ALL PRIVILEGES ON *.* TO 'owncloud'@'%' WITH GRANT OPTION"


echo "=> Done!"

mysqladmin -uroot shutdown