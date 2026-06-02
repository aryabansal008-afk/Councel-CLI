#!/usr/bin/env node
const {program} = require('commander')
const inquirer = require('inquirer')

const{
    addcustomer, findcustomer, removecustomer, updatecustomer, listcustomer, exportcustomer
} = require('./index');

//Array of questions
const questions = [
    {
        type:'input',
        name:'firstname',
        message:'Student First Name'
    },
    {
        type:'input',
        name:'lastname',
        message:'Student Last Name'
    },
    {
        type:'input',
        name:'phone',
        message:'Student Phone Number'
    },
    {
        type:'input',
        name:'email',
        message:'Student Email Address'
    },
    {
        type:'input',
        name:'rank',
        message:'Student Rank',
        validate: (value) => {
        if (!isNaN(value) && Number(value) > 0) {
            return true;
        }
        return 'Please enter a valid rank';
    }
    },
    {
        type:'input',
        name:'category',
        message:'Student Category',
    },
    {
        type:'input',
        name:'homestate',
        message:'Student Home State',
    },
    {
        type:'input',
        name:'preferredbranch',
        message:'Student Preferred Branch',
    },
    {
        type:'input',
        name:'status',
        message:'Student Counselling Status',
    }
]

program.name('councel')
.version('1.0.0')
.description('Councel Management System')

//Add Command
program
.command('add')
.alias('a')
.description('Add a Student')
.action(async () => {
    const answers = await inquirer.default.prompt(questions);
    addcustomer(answers);
});

//Update Command
program
.command('update <_id>')
.alias('u')
.description('Update a Student')
.action(async (_id) => {
    const answers = await inquirer.default.prompt(questions);
    updatecustomer(_id, answers);
});

//Remove Command
program
.command('remove <_id>')
.alias('r')
.description('Remove a Student')
.action((_id) => {
    removecustomer(_id);
});

//List Command
program
.command('list')
.alias('l')
.description('List all Students')
.action(() => {
    listcustomer();
});

//Find Command
program.command('find <name>')
.alias('f')
.description('Find a customer')
.action(name => findcustomer(name));

//Export Command
program.command('export')
.alias('e')
.description('Export students to csv')
.action(()=>{exportcustomer();
});

program.parse(process.argv);