# SQL语法

## SQL SELECT 语句:
SELECT column1, column2....columnN
FROM   table_name;

## SQL DISTINCT 子句:
SELECT DISTINCT column1, column2....columnN
FROM   table_name;

## SQL WHERE 子句:
SELECT column1, column2....columnN
FROM   table_name
WHERE  CONDITION;

## SQL AND/OR 子句:
SELECT column1, column2....columnN
FROM   table_name
WHERE  CONDITION-1 {AND|OR} CONDITION-2;

## SQL IN 子句:
SELECT column1, column2....columnN
FROM   table_name
WHERE  column_name IN (val-1, val-2,...val-N);

## SQL BETWEEN 子句:
SELECT column1, column2....columnN
FROM   table_name
WHERE  column_name BETWEEN val-1 AND val-2;

## SQL LIKE 子句:
SELECT column1, column2....columnN
FROM   table_name
WHERE  column_name LIKE { PATTERN };

## SQL ORDER BY 子句:
SELECT column1, column2....columnN
FROM   table_name
WHERE  CONDITION
ORDER BY column_name {ASC|DESC};

## SQL GROUP BY 子句:
SELECT SUM(column_name)
FROM   table_name
WHERE  CONDITION
GROUP BY column_name;

## SQL COUNT 子句:
SELECT COUNT(column_name)
FROM   table_name
WHERE  CONDITION;

## SQL HAVING 子句:
SELECT SUM(column_name)
FROM   table_name
WHERE  CONDITION
GROUP BY column_name
HAVING (arithematic function condition);

## SQL CREATE TABLE 语句:
CREATE TABLE table_name(
column1 datatype,
column2 datatype,
column3 datatype,
.....
columnN datatype,
PRIMARY KEY( one or more columns )
);

## SQL DROP TABLE 语句:
DROP TABLE table_name;

## SQL CREATE INDEX 语句 :
CREATE UNIQUE INDEX index_name
ON table_name ( column1, column2,...columnN);

## SQL DROP INDEX 语句 :
ALTER TABLE table_name
DROP INDEX index_name;

## SQL DESC 语句 :
DESC table_name;

## SQL TRUNCATE TABLE 语句:
TRUNCATE TABLE table_name;

## SQL ALTER TABLE 语句:
ALTER TABLE table_name {ADD|DROP|MODIFY} column_name {data_ype};

## SQL ALTER TABLE 语句 (重命名) :
ALTER TABLE table_name RENAME TO new_table_name;

## SQL INSERT INTO 语句:
INSERT INTO table_name( column1, column2....columnN)
VALUES ( value1, value2....valueN);

## SQL UPDATE 语句:
UPDATE table_name
SET column1 = value1, column2 = value2....columnN=valueN
[ WHERE  CONDITION ];

## SQL DELETE 语句:
DELETE FROM table_name
WHERE  {CONDITION};

## SQL CREATE DATABASE 语句:
CREATE DATABASE database_name;

## SQL DROP DATABASE 语句:
DROP DATABASE database_name;

## SQL USE 语句:
USE database_name;

## SQL COMMIT 语句:
COMMIT;

## SQL ROLLBACK 语句:
ROLLBACK;