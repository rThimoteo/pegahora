FROM phpdockerio/php80-fpm:latest
WORKDIR "/application"

# Install selected extensions and other stuff
RUN apt-get update \
    && apt-get -y --no-install-recommends install  php8.0-bcmath php8.0-bz2 php8.0-cgi php8.0-decimal php8.0-gd php8.0-gmagick php8.0-http php8.0-intl php8.0-mcrypt php8.0-mongodb php8.0-mysql php8.0-pgsql php8.0-pspell php8.0-psr php8.0-redis php8.0-soap php8.0-sqlite3 php8.0-xdebug php8.0-xmlrpc php8.0-yaml \
    && apt-get clean; rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/doc/*