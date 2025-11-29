import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const roles = [
    'Senior Developer', 'UI/UX Designer', 'Product Manager', 'Backend Engineer',
    'QA Engineer', 'DevOps Engineer', 'Frontend Developer', 'Data Analyst',
    'Full Stack Developer', 'System Architect', 'Mobile Developer', 'Security Specialist'
];

const firstNames = [
    'James', 'Mary', 'Robert', 'Patricia', 'John', 'Jennifer', 'Michael', 'Linda',
    'David', 'Elizabeth', 'William', 'Barbara', 'Richard', 'Susan', 'Joseph', 'Jessica',
    'Thomas', 'Sarah', 'Charles', 'Karen', 'Christopher', 'Nancy', 'Daniel', 'Lisa',
    'Matthew', 'Margaret', 'Anthony', 'Betty', 'Mark', 'Sandra', 'Donald', 'Ashley'
];

const lastNames = [
    'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
    'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
    'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson',
    'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker'
];

const taskTitles = [
    'Fix login bug', 'Update dashboard UI', 'Optimize database queries', 'Write API documentation',
    'Conduct user research', 'Setup CI/CD pipeline', 'Implement dark mode', 'Create unit tests',
    'Review PR #123', 'Design new logo', 'Migrate to TypeScript', 'Update dependencies',
    'Fix memory leak', 'Add payment gateway', 'Create landing page', 'Refactor legacy code',
    'Setup monitoring', 'Configure AWS S3', 'Implement OAuth', 'Create mobile layout'
];

const statuses = ['Pending', 'In Progress', 'Completed'];

const departments = ['Engineering', 'Design', 'Product', 'Marketing', 'Sales', 'HR', 'Operations'];
const genders = ['Male', 'Female', 'Non-binary'];

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function generateEmployees(count) {
    const employees = [];

    for (let i = 1; i <= count; i++) {
        const firstName = getRandomElement(firstNames);
        const lastName = getRandomElement(lastNames);
        const name = `${firstName} ${lastName}`;
        const role = getRandomElement(roles);
        const department = getRandomElement(departments);
        const gender = getRandomElement(genders);
        const age = Math.floor(Math.random() * (55 - 22 + 1)) + 22; // Age 22-55
        const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`;
        const bio = `Experienced ${role} with a passion for building scalable solutions. Enjoys coffee and coding.`;

        // Generate avatar based on gender
        let avatarGender = 'men';
        if (gender === 'Female') avatarGender = 'women';
        else if (gender === 'Non-binary') avatarGender = Math.random() > 0.5 ? 'men' : 'women';

        const avatarId = Math.floor(Math.random() * 99); // 0-99
        const avatar = `https://randomuser.me/api/portraits/${avatarGender}/${avatarId}.jpg`;

        const numTasks = Math.floor(Math.random() * 5) + 1; // 1 to 5 tasks
        const tasks = [];

        for (let j = 0; j < numTasks; j++) {
            tasks.push({
                id: i * 100 + j,
                title: getRandomElement(taskTitles),
                description: `Description for ${getRandomElement(taskTitles).toLowerCase()}`,
                status: getRandomElement(statuses),
                createdAt: new Date(Date.now() - Math.floor(Math.random() * 1000000000)).toISOString(),
                updatedAt: new Date().toISOString()
            });
        }

        employees.push({
            id: i,
            name: name,
            role: role,
            department: department,
            email: email,
            age: age,
            gender: gender,
            bio: bio,
            avatar: avatar,
            tasks: tasks
        });
    }

    return employees;
}

const employees = generateEmployees(30);
const outputPath = path.join(__dirname, '../src/data/employees.json');

fs.writeFileSync(outputPath, JSON.stringify(employees, null, 4));
console.log(`Generated ${employees.length} employees in ${outputPath}`);
