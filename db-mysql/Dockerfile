FROM phusion/baseimage:latest

# Set correct environment variables.
ENV HOME /root

# Exposed ENV
ENV MYSQL_USER admin
ENV MYSQL_PASS **Random**

# make apt aware that we are running it unattanded
ENV DEBIAN_FRONTEND noninteractive

# install necessary packages
RUN apt-get update
RUN apt-get install -y mysql-server pwgen

# Clean up APT when done.
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Remove pre-installed database
RUN rm -rf /var/lib/mysql/*

# Add MySQL configuration
ADD my.cnf /etc/mysql/conf.d/my.cnf
ADD mysqld_charset.cnf /etc/mysql/conf.d/mysqld_charset.cnf

ADD init_db.sh /tmp/init_db.sh
RUN chmod +x /tmp/init_db.sh
RUN /tmp/init_db.sh

# Add MySQL scripts
ADD create_mysql_admin_user.sh /opt/create_mysql_admin_user.sh
ADD import_sql.sh /opt/import_sql.sh
RUN chmod 755 /opt/*.sh

# Add VOLUMEs to allow backup of config and databases
VOLUME  ["/etc/mysql", "/var/lib/mysql"]

EXPOSE 3306

ADD run.sh /etc/service/mysql/run
RUN chmod +x /etc/service/mysql/run

# Use baseimage-docker's init system.
CMD ["/sbin/my_init"]