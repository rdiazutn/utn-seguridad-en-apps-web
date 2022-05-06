const md5 = require('js-md5')

const scripts = [
    'CREATE TABLE IF NOT EXISTS `test`.`user` ( `username` VARCHAR(30) NOT NULL, `password` VARCHAR(100) NOT NULL,`token` VARCHAR(50) NULL, isAdmin boolean NOT NULL,`id` int(11) NOT NULL AUTO_INCREMENT, Primary Key(id)) ENGINE=innodb;',
    'CREATE TABLE IF NOT EXISTS `test`.`todo` ( `desc` VARCHAR(255) NOT NULL,`id` int(11) NOT NULL AUTO_INCREMENT,`user_id` int(11) NULL, Primary Key(id), FOREIGN KEY (user_id) REFERENCES user(id) ) ENGINE=innodb;',
    `INSERT INTO user (username, password, id, isAdmin) SELECT * FROM (SELECT "GiorgioGiovanni" AS username,"${md5('GG123')}" AS password, 1 AS id, FALSE as isAdmin) AS tmp WHERE NOT EXISTS (SELECT username FROM user WHERE username = "GiorgioGiovanni") LIMIT 1;`,
    `INSERT INTO user (username, password,id, isAdmin) SELECT * FROM (SELECT "JuliusCaesar" AS username,"${md5('promocion')}" AS password, 2 AS id, FALSE as isAdmin) AS tmp WHERE NOT EXISTS (SELECT username FROM user WHERE username = "JuliusCaesar") LIMIT 1;`,
    'INSERT INTO todo (`desc`, user_id) SELECT * FROM (SELECT "Comprar fruta" AS `desc`, 1 AS user_id) AS tmp WHERE NOT EXISTS (SELECT `desc` FROM todo WHERE `desc` = "Comprar fruta") LIMIT 1;',
    'INSERT INTO todo (`desc`, user_id) SELECT * FROM (SELECT "Comprar mas fruta" AS `desc`, 1 AS user_id) AS tmp WHERE NOT EXISTS (SELECT `desc` FROM todo WHERE `desc` = "Comprar mas fruta") LIMIT 1;',
    'INSERT INTO todo (`desc`, user_id) SELECT * FROM (SELECT "Poner mi fruteria y abandonar la verduleria" AS `desc`, 1 AS user_id) AS tmp WHERE NOT EXISTS (SELECT `desc` FROM todo WHERE `desc` = "Poner mi fruteria y abandonar la verduleria") LIMIT 1;',
    'INSERT INTO todo (`desc`, user_id) SELECT * FROM (SELECT "Abandonar la fruteria" AS `desc`, 1 AS user_id) AS tmp WHERE NOT EXISTS (SELECT `desc` FROM todo WHERE `desc` = "Abandonar la fruteria") LIMIT 1;',
    'INSERT INTO todo (`desc`, user_id) SELECT * FROM (SELECT "Vender secretos de estado" AS `desc`, 1 AS user_id) AS tmp WHERE NOT EXISTS (SELECT `desc` FROM todo WHERE `desc` = "Vender secretos de estado") LIMIT 1;',
    'INSERT INTO todo (`desc`, user_id) SELECT * FROM (SELECT "Despertarse del sueño" AS `desc`, 2 AS user_id) AS tmp WHERE NOT EXISTS (SELECT `desc` FROM todo WHERE `desc` = "Despertarse del sueño") LIMIT 1;',
    'INSERT INTO todo (`desc`, user_id) SELECT * FROM (SELECT "Conseguir la ferrari" AS `desc`, 2 AS user_id) AS tmp WHERE NOT EXISTS (SELECT `desc` FROM todo WHERE `desc` = "Conseguir la ferrari") LIMIT 1;',
    'INSERT INTO todo (`desc`, user_id) SELECT * FROM (SELECT "Salvar al planeta" AS `desc`, 2 AS user_id) AS tmp WHERE NOT EXISTS (SELECT `desc` FROM todo WHERE `desc` = "Salvar al planeta") LIMIT 1;',
    'INSERT INTO todo (`desc`, user_id) SELECT * FROM (SELECT "Comprar secretos de estado" AS `desc`, 2 AS user_id) AS tmp WHERE NOT EXISTS (SELECT `desc` FROM todo WHERE `desc` =  "Comprar secretos de estado") LIMIT 1;'


]

module.exports = scripts