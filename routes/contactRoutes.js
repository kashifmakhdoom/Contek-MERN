const express = require('express');
const router = express.Router();
const requireAuth = require('../middleware/auth-handler');
const {check, validationResult} = require('express-validator');

const User = require('../models/User');
const Contact = require('../models/Contact');

// @route:  GET api/contacts
// @desc:   Get all user contacts
// @access: Private
router.get('/', requireAuth, async (req, res) => {
  try {
    const contacts = await Contact.find({user: req.user.id}).sort({date: -1});
    res.json(contacts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error!');
  }
});

// @route:  POST api/contacts
// @desc:   Add new contact
// @access: Private
router.post('/', [requireAuth, [
  check('name', 'Please enter a valid name').not().isEmpty()
]], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  } 

  const {name, email, phone, mobile, type} = req.body;

  try {
    let contact = new Contact({
      name,
      email,
      phone,
      mobile,
      type,
      user: req.user.id
    });

    contact = await contact.save();

    res.json(contact);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route:  PUT api/contacts/:id
// @desc:   Update contact
// @access: Private
router.put('/:id', requireAuth, async (req, res) => {
  const {name, email, phone, mobile, type} = req.body;

  const updatedContact = {};
  if(name) updatedContact.name = name;
  if(email) updatedContact.email = email;
  if(phone) updatedContact.phone = phone;
  if(mobile) updatedContact.mobile = mobile;
  if(type) updatedContact.type = type;

  try {
    let contact = await Contact.findById(req.params.id);

    if(!contact) return res.status(404).json({message: 'Contact not found!'});

    if(contact.user.toString() !== req.user.id)
      return res.status(401).json({message: 'Not authorized!'});

    contact = await Contact.findByIdAndUpdate(req.params.id, 
      { $set: updatedContact },
      { new: true }
    );

    res.json(contact);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }

});

// @route:  DELETE api/contacts/:id
// @desc:   Delete contact
// @access: Private
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    let contact = await Contact.findById(req.params.id);

    if(!contact) return res.status(404).json({message: 'Contact not found!'});

    if(contact.user.toString() !== req.user.id)
      return res.status(401).json({message: 'Not authorized!'});

    await Contact.findByIdAndRemove(req.params.id);

    res.json({message: 'Contact successfully removed!'});

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


module.exports = router;