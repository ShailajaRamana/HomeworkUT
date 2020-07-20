-- 1. List the following details of each employee: employee number, last name, first name, gender, and salary
SELECT  emp.emp_no,
        emp.last_name,
        emp.first_name,
        emp.gender,
        sal.salary
FROM employees as emp 
    LEFT JOIN salaries as sal
    ON (emp.emp_no = sal.emp_no);
    
-- 2. List employees who were hired in 1986

SELECT emp_no, first_name, last_name, hire_date
FROM employees
WHERE hire_date BETWEEN '1986-01-01' AND '1986-12-31';

-- 3. List the manager of each department with the following information: 
--department number, department name, the manager's employee number, last name, first name, and start and end employment dates.
SELECT  mgr.dept_no,
        dept.dept_name,
        mgr.emp_no,
        emp.last_name,
        emp.first_name
FROM dept_manager AS mgr
    INNER JOIN departments AS dept
        ON (mgr.dept_no = dept.dept_no)
    INNER JOIN employees AS emp
        ON (mgr.emp_no = emp.emp_no)
ORDER BY dept.dept_no;


-- 4. List the department of each employee with the following information: employee number, last name, first name, and department name.
SELECT  emp.emp_no,
        emp.last_name,
        emp.first_name,
        dept.dept_name
FROM employees AS emp
    INNER JOIN dept_emp AS demp
        ON (emp.emp_no = demp.emp_no)
    INNER JOIN departments AS dept
        ON (demp.dept_no = dept.dept_no)
ORDER BY emp.emp_no;

-- 5. List all employees whose first name is "Hercules" and last names begin with "B."
SELECT *
FROM employees
WHERE first_name = 'Hercules'
AND last_name LIKE 'B%'
ORDER BY emp_no;

-- 6. List all employees in the Sales department, including their employee number, last name, first name, and department name.
-- here were are linking 3 tables from emp we are getting the emp details
-- dept for sales department
-- relationship table dept_emp
SELECT  emp.emp_no,
        emp.last_name,
        emp.first_name,
        depart.dept_name
FROM employees AS emp
    INNER JOIN dept_emp AS demp
        ON (emp.emp_no = demp.emp_no)
    INNER JOIN departments AS depart
        ON (demp.dept_no = depart.dept_no)
--WHERE depart.dept_no = 'd007'
WHERE depart.dept_name = 'Sales';


-- 7. List all employees in the Sales and Development departments, including their employee number, last name, first name, and department name
SELECT  emp.emp_no,
        emp.last_name,
        emp.first_name,
        depart.dept_name
FROM employees AS emp
    INNER JOIN dept_emp AS demp
        ON (emp.emp_no = demp.emp_no)
    INNER JOIN departments AS depart
        ON (demp.dept_no = depart.dept_no)
WHERE depart.dept_name IN ('Sales', 'Development');


-- 8. In descending order, list the frequency count of employee last names, i.e., how many employees share each last name.
SELECT last_name, COUNT(last_name)
FROM employees
GROUP BY last_name
ORDER BY COUNT(last_name) DESC;
