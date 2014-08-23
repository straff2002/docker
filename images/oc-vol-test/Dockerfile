FROM phusion/baseimage:latest
MAINTAINER Erik Wittek "erik@webhippie.de"

ENV HOME /root
ENV DEBIAN_FRONTEND noninteractive

RUN apt-get -y update
RUN apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN /etc/my_init.d/00_regen_ssh_host_keys.sh

ADD init_volume.sh /etc/my_init.d/init_volume.sh
RUN chmod +x /etc/my_init.d/init_volume.sh

CMD ["/sbin/my_init"]