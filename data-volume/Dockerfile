# Use phusion/baseimage as base image. To make your builds reproducible, make
# sure you lock down to a specific version, not to `latest`!
# See https://github.com/phusion/baseimage-docker/blob/master/Changelog.md for
# a list of version numbers.
FROM phusion/baseimage:latest

# Set correct environment variables.
ENV HOME /root

RUN mkdir -p /data-vol

VOLUME ["/data-vol"]

RUN mkdir -p /etc/my_init.d

# Use baseimage-docker's init system.
CMD ["/sbin/my_init"]