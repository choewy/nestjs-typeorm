FROM mysql:8.0

EXPOSE 3306

COPY ./initdb.sql /docker-entrypoint-initdb.d/

CMD ["mysqld"]