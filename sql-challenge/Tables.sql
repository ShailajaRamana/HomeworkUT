CREATE TABLE employees (
    emp_no INT ,
    birth_date DATE,
    first_name VARCHAR,
    last_name VARCHAR,
    gender VARCHAR,
    hire_date DATE,
    PRIMARY KEY (emp_no)
);

CREATE TABLE titles (
    title_id INT,
    emp_no INT REFERENCES employees(emp_no),
    title VARCHAR ,
    from_date date,
    to_date date,
    PRIMARY KEY (title_id)
);

CREATE TABLE departments (
    dept_no VARCHAR,
    dept_name VARCHAR,
    PRIMARY KEY (dept_no)
);

CREATE TABLE dept_manager (
    dept_no VARCHAR REFERENCES departments (dept_no),
    emp_no INT REFERENCES employees(emp_no),
    from_date DATE,
    to_date DATE
);

CREATE TABLE dept_emp (
    emp_no INT REFERENCES employees(emp_no),
    dept_no VARCHAR REFERENCES departments (dept_no),
    from_date DATE,
    to_date DATE
);

CREATE TABLE salaries (
    emp_no INT REFERENCES employees (emp_no),
    salary INT   NOT NULL,
    from_date DATE,
    to_date DATE  
	-- PRIMARY KEY (emp_no)
);
