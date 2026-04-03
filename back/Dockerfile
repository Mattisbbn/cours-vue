FROM php:8.4-apache

# 1. Installation des dépendances système (on garde l'essentiel)
RUN apt-get update && apt-get install -y \
    libicu-dev \
    libsqlite3-dev \
    unzip \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# 2. Extensions PHP
RUN docker-php-ext-install intl pdo pdo_sqlite opcache

# 3. Activation du mode Rewrite d'Apache (indispensable)
RUN a2enmod rewrite

# 4. Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# 5. Optimisation du cache Docker : on installe les dépendances AVANT de copier tout le code
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-interaction --prefer-dist --no-scripts

# 6. Copie du reste du projet
COPY . .

# 7. Config Apache simplifiée (On pointe directement le DocumentRoot)
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf

# 8. Gestion des droits (Crucial pour éviter ton erreur 500)
RUN mkdir -p var/cache var/log \
    && chown -R www-data:www-data /var/www/html \
    && chmod -R 775 /var/www/html/var

# 9. Finalisation composer
RUN composer dump-autoload --no-dev --classmap-authoritative
