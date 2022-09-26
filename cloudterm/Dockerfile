#see pom.xml. jib-maven-plugin does the same thing
FROM openjdk:17-jdk-alpine
MAINTAINER Rahman Usta
ARG ssh_pub_key

RUN mkdir -p /root/.ssh \
    && chmod 0700 /root/.ssh \
    && passwd -u root \
    && echo "$ssh_pub_key" > /root/.ssh/authorized_keys \
    && apk add openrc openssh \
    && ssh-keygen -A \
    && echo -e "PasswordAuthentication no" >> /etc/ssh/sshd_config \
    && mkdir -p /run/openrc \
    && touch /run/openrc/softlevel

ENV shell="/bin/sh -i"
COPY target/cloudterm.jar /opt/cloudterm/
CMD ["java","-jar","/opt/cloudterm/cloudterm.jar", "sh", "-c", "rc-status; rc-service sshd start"]
EXPOSE 8080
