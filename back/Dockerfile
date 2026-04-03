FROM dunglas/frankenphp:1.3-php8.4-alpine

RUN install-php-extensions intl pdo_sqlite opcache

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /app

COPY composer.json composer.lock ./
RUN composer install --no-dev --no-interaction --prefer-dist --no-scripts

COPY . .

RUN mkdir -p var/cache var/log \
    && chown -R www-data:www-data /app \
    && chmod -R 775 /app/var

RUN composer dump-autoload --no-dev --classmap-authoritative

ENV SERVER_NAME=":80"

RUN setcap CAP_NET_BIND_SERVICE=+ep /usr/local/bin/frankenphp

USER www-data
