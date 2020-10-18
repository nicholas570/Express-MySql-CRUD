ALTER TABLE employee ADD COLUMN hired_year SMALLINT;
ALTER TABLE employee ADD COLUMN department ENUM(‘Marketing’, ‘HR’, ‘Software’, ‘Hardware’);

UPDATE employee SET hired_year = FLOOR(RAND()*(2019-2014+1)+2014);
UPDATE employee SET department = CASE
  WHEN RAND() < 0.25 THEN ‘Marketing’
  WHEN RAND() < 0.33 THEN ‘HR’
  WHEN RAND() < 0.5 THEN ‘Software’
  ELSE ‘Hardware’
END;

