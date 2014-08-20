FROM phusion/baseimage:latest
MAINTAINER Thomas Boerger <thomas@webhippie.de>

ENV HOME /root
CMD ["/sbin/my_init"]

VOLUME /data

RUN apt-get update
EXPOSE 80


ADD admin_key.pub /tmp/admin_key.pub
RUN cat /tmp/admin_key.pub >> /root/.ssh/authorized_keys && rm -f /tmp/admin_key.pub