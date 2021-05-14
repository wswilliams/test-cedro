#!/bin/bash

## Description: First installation in server NodeJs e Driver Oracle 
## Date: 03/05/2021
## Author: Wagner Oliveira 

# INSTALL NODEJS AND NPM
echo
echo "INSTALLL NODE AND NPM"
echo "======================"
echo

# install nodeJs
# curl -sL https://deb.nodesource.com/setup_10.x | sudo bash
# yum install -y nodejs
# yum install -y npm

# install pm2
# npm install pm2@latest -g

# DRIVER ORACLE
echo
echo "INSTALLL DRIVER ORACLE"
echo "======================"
echo

# install wget and unzip
yum install -y wget unzip

mkdir -p /opt/oracle/
cd /opt/oracle
wget https://download.oracle.com/otn_software/linux/instantclient/instantclient-basiclite-linuxx64.zip && \
unzip instantclient-basiclite-linuxx64.zip && rm -f instantclient-basiclite-linuxx64.zip && \
cd /opt/oracle/instantclient* && rm -f *jdbc* *occi* *mysql* *mql1* *ipc1* *jar uidrvci genezi adrci && \
echo /opt/oracle/instantclient* > /etc/ld.so.conf.d/oracle-instantclient.conf && ldconfig
yum install -y libaio


echo
echo "[FINISHED]"
echo