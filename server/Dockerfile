FROM php:8.2-cli

RUN apt-get update && apt-get install -y \
    libpng-dev \
    libzip-dev \
    unzip \
    && docker-php-ext-install pdo pdo_mysql \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app

COPY composer.json composer.lock* ./
RUN composer install --no-dev --no-scripts --no-autoloader 2>/dev/null || true
COPY . .
RUN composer dump-autoload --optimize 2>/dev/null || true

EXPOSE 8000

CMD ["php", "-S", "0.0.0.0:8000", "router.php"]
