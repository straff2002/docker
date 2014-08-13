FROM ubuntu:14.04
MAINTAINER Felix Böhm <felix@webhippie.de>

# make apt aware that we are running it unattanded
ENV DEBIAN_FRONTEND noninteractive

# install necessary packages
RUN apt-get update
RUN apt-get install -y mysql-server mysql-client

# Docker configuration
RUN sed -i -e"s/^bind-address\s*=\s*127.0.0.1/bind-address = 0.0.0.0/" /etc/mysql/my.cnf

# Copy startup script
ADD ./startup.sh /opt/startup.sh
RUN chmod +x /opt/startup.sh

# forward port to the outside world
EXPOSE 3306

# run mysql server
CMD ["/bin/bash", "/opt/startup.sh"]
