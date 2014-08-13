#!/bin/bash
cd

# care about repos:

yum --assumeyes install http://nginx.org/packages/centos/6/noarch/RPMS/nginx-release-centos-6-0.el6.ngx.noarch.rpm
wget -q http://dl.fedoraproject.org/pub/epel/6/x86_64/epel-release-6-8.noarch.rpm && yum --assumeyes install epel-release-6-8.noarch.rpm
wget -q http://rpms.famillecollet.com/enterprise/remi-release-6.rpm && yum --assumeyes install remi-release-6.rpm
cat > /etc/yum.repos.d/CentOS-Base.repo << EOF
[base]
name=CentOS-6 - Base
mirrorlist=http://mirrorlist.centos.org/?release=6&arch=x86_64&repo=os
gpgcheck=1
enabled=1
gpgkey=http://mirror.centos.org/centos/RPM-GPG-KEY-CentOS-6
EOF

##########################################################

# install software:
# nginx
yum --enablerepo=nginx --assumeyes install nginx
rm -f /etc/nginx/conf.d/default.conf
rm -f /etc/nginx/conf.d/example_ssl.conf
cp assets/owncloud.conf /etc/nginx/conf.d/

# take care of nginx module
tar xf assets/ninengx-1.2.tar -C assets/

mkdir -p -m 0700 /etc/nginx/certs
cat > /etc/nginx/certs/signer.pem << EOF
-----BEGIN CERTIFICATE-----
MIIDkTCCAnmgAwIBAgIJAO58Ao+U463BMA0GCSqGSIb3DQEBBQUAMEoxCzAJBgNV
BAYTAmNoMR4wHAYDVQQKExVBZG5vdnVtIEluZm9ybWF0aWsgQUcxGzAZBgNVBAMU
EmF1dGhTaWduZXJAc3JudmF1MTAeFw0xMzA1MDEwNzUzNTJaFw0yODA0MjcwNzUz
NTJaMEoxCzAJBgNVBAYTAmNoMR4wHAYDVQQKExVBZG5vdnVtIEluZm9ybWF0aWsg
QUcxGzAZBgNVBAMUEmF1dGhTaWduZXJAc3JudmF1MTCCASIwDQYJKoZIhvcNAQEB
BQADggEPADCCAQoCggEBALghf6Ntt5cjTM5UlmNgpV9MqVoGunUOMDlgdS0X4ko8
lFfOCqvNpgsqEwsw5LJDYGE1bQsdL/Bk/s355MX55W7RaqBGSZbNiGp3eHUVKUh7
dyLI6oM0zAUme8uTEX1kEol+txa79nrXWSCfiU8c5up/BFwtgwo4JzVIsb9MU4Yd
YiHuwdks/5gjbEfvutcg7fnded7EQbjrTX9llO3D8/dxozOx1ZaxCing4ERkU+Bx
x1fjms8Sla/NWaRsLs6X9af/ndxevRJKbbpLDyovbMlUUdCwCJ/XLNmM4OI9glap
6vi385KUaPu01aO0YeeZZdFkj7D5al/W50FNUmKsrksCAwEAAaN6MHgwCQYDVR0T
BAIwADA/BglghkgBhvhCAQ0EMhYwTmV2aXMgS2V5Qm94IEdlbmVyYXRlZCBDZXJ0
aWZpY2F0ZSB1c2luZyBPcGVuU1NMMAsGA1UdDwQEAwIHgDAdBgNVHQ4EFgQUcjym
dyfQs/D0sHT5uHGYqM36CfwwDQYJKoZIhvcNAQEFBQADggEBAAvQdnmoQ1BgfrSR
Xy7tKs7ZW7oL+l3RnL0IvOYqpchWWJQEUeAVSNEvnLEdxb6U35BGTyA1194loTDQ
0WhQuMew6Mz9I/b9m+puJE5334G2Wbf2rgJPUZGcOJFvA2PJcbRcSeJRZKe6OWEf
XvwMVuJdDbV8f4EL1FOqhI3p5r5SI9ry6y2dXcObb5hYoheufEDSsfn5Ao3QOj78
I6FbGPCo18Vln2flSdLDSOKuwXNNbc7T0GR9x1T65xEHHl3V8K/Opk0OenOdToLs
uSmeiwxZcpyuZGU2P1wQkdlZEdJzZRd49M+toc2e4FVFzV/hR8AuhycGQrEl4k/K
/izVBao=
-----END CERTIFICATE-----
EOF
chmod 0400 /etc/nginx/certs/signer.pem

chkconfig nginx on

mkdir nginx
cd nginx
wget http://nginx.org/download/nginx-1.4.7.tar.gz
tar xf nginx-1.4.7.tar.gz
cd nginx-1.4.7
yum install pcre-devel zlib-devel openssl-devel
./configure --add-module=/root/assets/src/ --sbin-path=/usr/sbin --with-http_ssl_module
make 
make install
service nginx start
cd

# PHP
yum --assumeyes --enablerepo=remi,base install php php-cli php-common php-gd php-imap php-ldap php-mbstring php-mcrypt php-mysql php-pdo php-pspell php-xml php-pear-Net-Curl php-fpm
chkconfig php-fpm on
service php-fpm start

# MySQL
yum --assumeyes --enablerepo=remi install mysql

##########################################################

#  download ownCloud:
owncloud_filename="owncloud-6.0.0beta5.tar.bz2"
wget -q -O /var/www/html/$owncloud_filename http://download.owncloud.org/community/testing/$owncloud_filename
tar xf /var/www/html/$owncloud_filename -C /var/www/html/
cp assets/config.php /var/www/html/owncloud/config/
chown -R apache:apache /var/www/html/owncloud/config/
mkdir -p /var/ownclouddata
chown apache:apache /var/ownclouddata