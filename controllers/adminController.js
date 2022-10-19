const Category = require('../models/Category');
const Bank = require('../models/Bank');
// const ejsLint = require('ejs-lint');

module.exports = {
    viewDashboard: (req, res) => {
        res.render('admin/dashboard/view_dashboard', {
            title: "Staycation | Dashboard"
        })
    },

    viewCategory: async (req, res) => {
        try {
            const category = await Category.find();
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = {
                message: alertMessage,
                status: alertStatus,
            };
            res.render('admin/category/view_category', {
                category,
                alert,
                title: "Staycation | Category"
            });
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/category', {
                title: "Staycation | Category"
            });
        }
    },

    addCategory: async (req, res) => {
        try {
            const { name } = req.body;
            await Category.create({
                name
            });
            req.flash('alertMessage', 'success add category');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/category');
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/category');
        }

    },

    editCategory: async (req, res) => {
        try {
            const { id, name } = req.body;
            const category = await Category.findOne({ _id: id });
            category.name = name;
            await category.save();
            req.flash('alertMessage', 'success update category');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/category');
            
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/category');
        }
    },
    
    deleteCategory: async (req, res) => {
        try {
            const { id } =req.params;
            const category = await Category.findOne({ _id: id });
            await category.remove();
            req.flash('alertMessage', 'success delete category');
            req.flash('alertStatus', 'success');
            res.redirect('/admin/category');
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/category');
        }
        
    },

    viewBank: async (req, res) => {
        try {
            const alertMessage = req.flash('alertMessage');
            const alertStatus = req.flash('alertStatus');
            const alert = {
                message: alertMessage,
                status: alertStatus,
            };
            res.render('admin/bank/view_bank', {
                alert,
                title: "Staycation | Bank"
            })
            
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            req.redirect('/admin/bank');
        }
    },

    addBank: async (req, res) => {
        try {
            const {
                name,
                nameBank,
                nomorRekening
            } = req.body;
            console.log(req.file);
            // await Bank.create({
            //     name,
            //     nameBank,
            //     nomorRekening
            // });
            // req.flash('alertMessage', 'success add bank');
            // req.flash('alertStatus', 'success');
            // res.redirect('/admin/bank');
        } catch (error) {
            req.flash('alertMessage', `${error.message}`);
            req.flash('alertStatus', 'danger');
            res.redirect('/admin/bank');
        }
    },
    
    viewItem: (req, res) => {
        res.render('admin/item/view_item', {
            title: "Staycation | Item"
        })
    },
    
    viewBooking: (req, res) => {
        res.render('admin/booking/view_booking', {
            title: "Staycation | Booking"
        })
    },
}