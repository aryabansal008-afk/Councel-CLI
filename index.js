const mongoose = require('mongoose');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
//Connect to database
mongoose.connect('mongodb://localhost:27017/councelcustomer');

//import model
const Customer = require('./models/Customer');
const customer = require('./models/Customer');

//Add customer
const addcustomer = (customer)=>{
    Customer.create(customer).then(customer =>{
        console.info('New customer added');
        mongoose.connection.close();
    })
}

//Find Customer
const findcustomer = (name)=>{
    const search = new RegExp(name, 'i'); //case search is now invalid
    Customer.find({$or: [{firstname: search}, {lastname:search}]})
    .then(customer =>{
        console.info(customer);
        console.info(`${customer.length} matches`);
        mongoose.connection.close();
    });
}

//Update Customer
const updatecustomer = (_id, customer)=>{
    Customer.findByIdAndUpdate({ _id },customer)
    .then(()=>{
        console.info('Customer Updated');
        mongoose.connection.close();
    });
}

//Remove Customer
const removecustomer = (_id)=>{
    Customer.findByIdAndDelete({ _id })
    .then(customer=>{
        console.info('Customer Removed');
        mongoose.connection.close();
    });
}

//List All Customers
const listcustomer = ()=>{
    Customer.find()
    .then(customer =>{
        console.info(customer);
        console.info(`${customer.length} customer`);
        mongoose.connection.close();
    })
}

//Export Methods
const exportcustomer = async()=>{
    try{
        const customers = await Customer.find().lean();

        const csvWriter = createCsvWriter({
            path: 'students.csv',
            header: [
                {id:'firstname', title:'FIRST_NAME'},
                {id:'lastname', title:'LAST_NAME'},
                {id:'phone', title:'PHONE'},
                {id: 'email', title: 'EMAIL'},
                {id: 'rank', title: 'RANK'},
                {id: 'category', title: 'CATEGORY'},
                {id: 'homestate', title: 'HOME_STATE'},
                {id: 'preferredbranch', title: 'PREFERRED_BRANCH'},
                {id: 'status', title:'STATUS'}
            ]
        });
        await csvWriter.writeRecords(customers);
        console.log(`Exported ${customers.length} students to students.csv`);
        mongoose.connection.close();
    }catch (err) {
        console.error(err);
    }
}


module.exports = {
    addcustomer, findcustomer, updatecustomer, removecustomer,listcustomer, exportcustomer
}